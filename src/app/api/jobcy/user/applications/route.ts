import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('User applications request');
    
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
    
    // Get user applications
    const applications = await db.collection('applications')
      .find({ userId: decoded.id })
      .sort({ appliedAt: -1 })
      .toArray();
    
    console.log('Found applications:', applications.length);
    
    // Populate applications with job details
    const populatedApplications = await Promise.all(
      applications.map(async (app) => {
        const job = await db.collection('jobs').findOne({ _id: app.jobId });
        const user = await db.collection('users').findOne({ _id: app.userId });
        
        return {
          _id: app._id,
          jobId: app.jobId,
          userId: app.userId,
          coverLetter: app.coverLetter,
          status: app.status,
          appliedAt: app.appliedAt,
          createdAt: app.createdAt,
          updatedAt: app.updatedAt,
          job: job ? {
            _id: job._id,
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            type: job.type,
            description: job.description
          } : null,
          user: user ? {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
          } : null
        };
      })
    );
    
    console.log('Populated applications:', populatedApplications.length);
    
    return NextResponse.json(populatedApplications);
  } catch (error) {
    console.error('User applications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
