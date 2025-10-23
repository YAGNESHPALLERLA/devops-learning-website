import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(// request: NextRequest) {
  try {
    console.log('HR jobs request');
    
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
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Get jobs posted by this HR
    const { toObjectId } = await import('@/lib/mongodb');
    const jobs = await db.collection('jobs').find({ postedBy: toObjectId(decoded.id) }).toArray();
    
    console.log('Found jobs:', jobs.length);
    console.log('Jobs data:', jobs);
    
    // Return jobs array directly (not wrapped in object)
    return NextResponse.json(jobs);
  } catch {
    console.error('HR jobs error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(// request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Create job request:', body);
    
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
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Create new job
    const newJob = {
      ...body,
      postedBy: decoded.id,
      createdBy: decoded.id,
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
  } catch {
    console.error('Create job error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
