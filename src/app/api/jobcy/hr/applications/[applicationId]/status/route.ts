import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function PUT(// __request: NextRequest, { params }: { params: Promise<{ applicationId: string }> }) {
  try {
    const resolvedParams = await params;
    const { applicationId } = resolvedParams;
    const body = await _request.json();
    const { status } = body;
    console.log('Update application status:', { applicationId, status });
    
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

    if (!status) {
      return NextResponse.json({ error: 'Status is required' }, { status: 400 });
    }

    // Connect to database
    const db = await connectDB();
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Update application status
    const result = await db.collection('applications').updateOne(
      { _id: toObjectId(applicationId) },
      { 
        $set: { 
          status: status,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }
    
    console.log('Application status updated successfully');
    
    return NextResponse.json({
      message: 'Application status updated successfully'
    });
  } catch {
    console.error('Update application status error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
