import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('HR jobs request');
    
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
    
    // Get jobs posted by this HR
    const { toObjectId } = await import('@/lib/mongodb');
    let hrObjectId;
    try {
      hrObjectId = toObjectId(decoded.id);
    } catch (error) {
      console.error('Error converting HR ID to ObjectId:', error);
      return NextResponse.json({ 
        error: 'Invalid user ID format', 
        message: 'Failed to convert user ID to ObjectId' 
      }, { status: 400 });
    }
    console.log('HR ID:', decoded.id, 'HR ObjectId:', hrObjectId);
    
    let jobs;
    try {
      jobs = await db.collection('jobs').find({ postedBy: hrObjectId }).toArray();
      console.log('Found jobs with ObjectId postedBy:', jobs.length);
      
      // If no jobs found with ObjectId, check for string postedBy (fallback for existing data)
      if (jobs.length === 0) {
        const stringPostedByJobs = await db.collection('jobs').find({ postedBy: decoded.id }).toArray();
        console.log('Jobs with string postedBy:', stringPostedByJobs.length);
        jobs = stringPostedByJobs;
      }
    } catch (dbError) {
      console.error('Database error fetching jobs:', dbError);
      return NextResponse.json({ 
        error: 'Database error', 
        message: 'Failed to fetch jobs from database' 
      }, { status: 500 });
    }
    
    console.log('Final jobs count:', jobs.length);
    console.log('Jobs data:', jobs);
    
    // Log each job for debugging
    jobs.forEach((job, index) => {
      console.log(`Job ${index + 1}: ${job.title} - Company: ${job.company} - Status: ${job.status} - postedBy: ${job.postedBy}`);
    });
    
    // Return jobs array directly (not wrapped in object)
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('HR jobs error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    console.log('Create job request:', body);
    
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
    
    // Create new job
    const { toObjectId } = await import('@/lib/mongodb');
    const newJob = {
      ...body,
      postedBy: toObjectId(decoded.id),
      createdBy: toObjectId(decoded.id),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('jobs').insertOne(newJob);
    
    console.log('Job created successfully:', result.insertedId);
    
    return NextResponse.json({
      message: 'Job created successfully',
      job: {
        id: result.insertedId,
        ...newJob
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Create job error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
