import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(// __request: NextRequest) {
  try {
    console.log('Admin applications request');
    
    // Get user ID from JWT token
    const authHeader = _request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const jwt = await import('jsonwebtoken');
    
    // let decoded: { id: string; role: string; [key: string]: unknown };
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      decoded = verified as { id: string; role: string; [key: string]: unknown };
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Get all applications with populated data
    const applications = await db.collection('applications').find({}).toArray();
    
    // Populate job and user data for each application
    const populatedApplications = await Promise.all(
      applications.map(async (app) => {
        const job = await db.collection('jobs').findOne({ _id: app.jobId });
        const user = await db.collection('users').findOne({ _id: app.userId });
        
        return {
          _id: app._id,
          id: app._id,
          jobId: {
            _id: job?._id,
            title: job?.title,
            company: job?.company
          },
          userId: {
            _id: user?._id,
            name: user?.name,
            email: user?.email
          },
          status: app.status || 'applied',
          appliedDate: app.appliedAt || app.createdAt,
          createdAt: app.createdAt
        };
      })
    );
    
    console.log('Found admin applications:', populatedApplications.length);
    
    return NextResponse.json(populatedApplications);
  } catch {
    console.error('Admin applications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
