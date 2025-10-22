import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../../../lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeUrl } = body;
    console.log('Upload resume request:', { resumeUrl });
    
    // Get user ID from JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const jwt = await import('jsonwebtoken');
    
    let decoded: { id: string; role: string; [key: string]: unknown };
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      decoded = verified as { id: string; role: string; [key: string]: unknown };
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    if (!resumeUrl) {
      return NextResponse.json({ error: 'Resume URL is required' }, { status: 400 });
    }

    // Connect to database
    const db = await connectDB();
    const { toObjectId } = await import('../../../../lib/mongodb');
    
    // Update user resume
    const result = await db.collection('users').updateOne(
      { _id: toObjectId(decoded.id) },
      { 
        $set: { 
          resume: resumeUrl,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('Resume uploaded successfully');
    
    return NextResponse.json({
      message: 'Resume uploaded successfully',
      resumeUrl
    });
  } catch (error) {
    console.error('Upload resume error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
