import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('HR applications request');
    
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
    
    // Get HR user details to find their company
    const { toObjectId } = await import('@/lib/mongodb');
    const hrUser = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    if (!hrUser) {
      return NextResponse.json({ error: 'HR user not found' }, { status: 404 });
    }
    
    // Get company ID from HR user
    const companyId = hrUser.company || hrUser.companyId;
    if (!companyId) {
      return NextResponse.json({ error: 'HR user has no associated company' }, { status: 400 });
    }
    
    // Get applications for jobs posted by this company
    const applications = await db.collection('applications').find({}).toArray();
    
    // Filter applications for jobs posted by this company
    const companyApplications = await Promise.all(
      applications.map(async (app) => {
        const job = await db.collection('jobs').findOne({ _id: app.jobId });
        if (!job || job.companyId !== companyId) {
          return null;
        }
        
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
          job: {
            _id: job._id,
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            type: job.type,
            description: job.description
          },
          user: user ? {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
          } : null
        };
      })
    );
    
    // Filter out null applications
    const filteredApplications = companyApplications.filter(app => app !== null);
    
    console.log('Found company applications:', filteredApplications.length);
    
    return NextResponse.json({ applications: filteredApplications });
  } catch (error) {
    console.error('HR applications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
