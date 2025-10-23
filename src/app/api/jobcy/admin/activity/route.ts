import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(// request: NextRequest) {
  try {
    console.log('Admin activity request');
    
    // Get user ID from JWT token
    const authHeader = request.headers.get('authorization');
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
    
    // Get recent activity
    const recentUsers = await db.collection('users').find({}).sort({ createdAt: -1 }).limit(5).toArray();
    const recentJobs = await db.collection('jobs').find({}).sort({ createdAt: -1 }).limit(5).toArray();
    const recentApplications = await db.collection('applications').find({}).sort({ createdAt: -1 }).limit(5).toArray();
    
    // Format activity data
    const activities = [
      ...recentUsers.map(user => ({
        id: `user_${user._id}`,
        type: 'hr_joined',
        message: `New HR user joined: ${user.name || 'Unknown'}`,
        time: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'
      })),
      ...recentJobs.map(job => ({
        id: `job_${job._id}`,
        type: 'job_posted',
        message: `New job posted: ${job.title || 'Unknown Job'}`,
        time: job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'Recently'
      })),
      ...recentApplications.map(app => ({
        id: `app_${app._id}`,
        type: 'application',
        message: `New application received`,
        time: app.createdAt ? new Date(app.createdAt).toLocaleDateString() : 'Recently'
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);
    
    console.log('Admin activity:', { 
      activities: activities.length
    });
    
    return NextResponse.json(activities);
  } catch {
    console.error('Admin activity error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
