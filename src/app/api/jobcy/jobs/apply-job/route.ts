import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    const { jobId, coverLetter = '' } = body;
    
    console.log('🚀 SIMPLE: Job application request for job:', jobId);
    
    if (!jobId) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }
    
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
    
    console.log('🚀 SIMPLE: Application created:', result.insertedId);
    
    return NextResponse.json({
      success: true,
      applicationId: result.insertedId,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('🚀 SIMPLE: Job application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(_request: NextRequest) {
  try {
    console.log('🚀 SIMPLE: Job application GET request');
    
    return NextResponse.json({
      message: 'Job application endpoint is working',
      method: 'GET',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('🚀 SIMPLE: Job application GET error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
