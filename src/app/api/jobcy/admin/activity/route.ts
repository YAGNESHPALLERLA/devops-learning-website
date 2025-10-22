import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    console.log('Admin activity request');
    
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

    // Connect to database
    const db = await connectDB();
    
    // Get recent activity
    const recentUsers = await db.collection('users').find({}).sort({ createdAt: -1 }).limit(10).toArray();
    const recentJobs = await db.collection('jobs').find({}).sort({ createdAt: -1 }).limit(10).toArray();
    const recentApplications = await db.collection('applications').find({}).sort({ createdAt: -1 }).limit(10).toArray();
    
    console.log('Admin activity:', { 
      recentUsers: recentUsers.length, 
      recentJobs: recentJobs.length, 
      recentApplications: recentApplications.length 
    });
    
    return NextResponse.json({ 
      recentUsers,
      recentJobs,
      recentApplications
    });
  } catch (error) {
    console.error('Admin activity error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
