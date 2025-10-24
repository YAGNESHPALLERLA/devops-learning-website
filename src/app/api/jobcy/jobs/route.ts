import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('Jobs request');
    
    // Connect to database
    const db = await connectDB();
    
    // Get all jobs from database
    const jobs = await db.collection('jobs').find({}).toArray();
    
    console.log('Found jobs:', jobs.length);
    
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Jobs error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    console.log('Create job request:', body);
    
    // Connect to database
    const db = await connectDB();
    
    // Create new job
    const newJob = {
      ...body,
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
