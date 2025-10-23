import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    console.log('🚀 NEW: Job application request for job:', jobId);
    
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
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await _request.json();
    const { coverLetter = '' } = body;

    // Connect to database
    const db = await connectDB();
    
    // Check if job exists
    const { toObjectId } = await import('@/lib/mongodb');
    const job = await db.collection('jobs').findOne({ _id: toObjectId(jobId) });
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Check if user already applied
    const existingApplication = await db.collection('applications').findOne({
      userId: decoded.id,
      jobId: toObjectId(jobId)
    });

    if (existingApplication) {
      return NextResponse.json({ error: 'Already applied for this job' }, { status: 400 });
    }

    // Create application
    const application = {
      userId: decoded.id,
      jobId: toObjectId(jobId),
      coverLetter,
      status: 'applied',
      appliedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('applications').insertOne(application);
    
    console.log('🚀 NEW: Application created:', result.insertedId);
    
    return NextResponse.json({
      success: true,
      applicationId: result.insertedId,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('🚀 NEW: Job application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    console.log('🚀 NEW: Job application GET request for job:', jobId);
    
    return NextResponse.json({
      message: 'Job application endpoint is working',
      jobId: jobId,
      method: 'GET',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('🚀 NEW: Job application GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
