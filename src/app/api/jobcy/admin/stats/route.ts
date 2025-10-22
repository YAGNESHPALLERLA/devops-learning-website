import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    console.log('Admin stats request');
    
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
    
    // Get admin stats
    const totalUsers = await db.collection('users').countDocuments();
    const totalJobs = await db.collection('jobs').countDocuments();
    const totalApplications = await db.collection('applications').countDocuments();
    const totalCompanies = await db.collection('users').countDocuments({ role: 'company' });
    
    console.log('Admin stats:', { totalUsers, totalJobs, totalApplications, totalCompanies });
    
    return NextResponse.json({ 
      totalUsers,
      totalJobs,
      totalApplications,
      totalCompanies,
      activeUsers: totalUsers,
      activeJobs: totalJobs
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
