import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('Company dashboard request');
    
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
    
    // Get company dashboard data
    const jobs = await db.collection('jobs').find({ createdBy: decoded.id }).toArray();
    const applications = await db.collection('applications').find({}).toArray();
    
    console.log('Found company data:', { jobs: jobs.length, applications: applications.length });
    
    return NextResponse.json({ 
      jobs,
      applications,
      stats: {
        totalJobs: jobs.length,
        totalApplications: applications.length,
        activeJobs: jobs.filter(job => job.status === 'active').length
      }
    });
  } catch (error) {
    console.error('Company dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
