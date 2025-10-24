import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    console.log('HR resume download request for user:', userId);
    
    // Get user ID from JWT token
    const authHeader = _request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const jwt = await import('jsonwebtoken');
    
    let decoded: { id: string; role: string; [key: string]: unknown };
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      decoded = verified as { id: string; role: string; [key: string]: unknown };
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is HR
    if (decoded.role !== 'HR') {
      return NextResponse.json({ error: 'Unauthorized - HR access required' }, { status: 403 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Get the user whose resume we want to download
    const { toObjectId } = await import('@/lib/mongodb');
    let user;
    
    try {
      const userObjectId = toObjectId(userId);
      user = await db.collection('users').findOne({ _id: userObjectId });
    } catch (error) {
      console.log('Error converting userId to ObjectId, trying string format:', userId);
      // Try with string ID as fallback
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user = await db.collection('users').findOne({ _id: userId as any });
      } catch (stringError) {
        console.log('Error finding user with string ID:', userId);
        user = null;
      }
    }
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('Found user:', user.name, 'Resume data:', user.resume);
    
    // Check if user has a resume
    if (!user.resume || !user.resume.data) {
      return NextResponse.json({ error: 'No resume found for this user' }, { status: 404 });
    }
    
    // Get resume data
    const resumeData = user.resume.data;
    const resumeName = user.resume.name || 'resume.pdf';
    const resumeType = user.resume.type || 'application/pdf';
    
    console.log('Resume details:', {
      name: resumeName,
      type: resumeType,
      dataLength: resumeData ? resumeData.length : 0
    });
    
    // Convert base64 to buffer
    let buffer;
    try {
      if (typeof resumeData === 'string') {
        // Remove data URL prefix if present
        const base64Data = resumeData.includes(',') ? resumeData.split(',')[1] : resumeData;
        buffer = Buffer.from(base64Data, 'base64');
      } else {
        buffer = Buffer.from(resumeData);
      }
    } catch (error) {
      console.error('Error converting resume data:', error);
      return NextResponse.json({ error: 'Invalid resume data format' }, { status: 400 });
    }
    
    // Return the resume file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': resumeType,
        'Content-Disposition': `attachment; filename="${resumeName}"`,
        'Content-Length': buffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error('HR resume download error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
