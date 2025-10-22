import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    console.log('HR Dashboard request');
    
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

    // Verify user is HR
    if (decoded.role !== 'hr') {
      return NextResponse.json({ error: 'Access denied. HR role required.' }, { status: 403 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Get HR user details
    const { toObjectId } = await import('@/lib/mongodb');
    const hrUser = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    if (!hrUser) {
      return NextResponse.json({ error: 'HR user not found' }, { status: 404 });
    }

    // Get company details for this HR
    let company = null;
    if (hrUser.companyId) {
      company = await db.collection('companies').findOne({ _id: toObjectId(hrUser.companyId) });
    } else if (hrUser.company && typeof hrUser.company === 'object' && hrUser.company.name) {
      // If company is an object with name, use it directly
      company = hrUser.company;
    } else if (hrUser.company && typeof hrUser.company === 'string') {
      // If company is a string, create a company object
      company = { name: hrUser.company };
    } else if (hrUser.company && typeof hrUser.company === 'object' && !hrUser.company.name) {
      // If company is an empty object, try to use companyEmail or default
      company = { name: hrUser.companyEmail || 'Unknown Company' };
    }
    
    // Get jobs posted by this HR
    const jobs = await db.collection('jobs').find({ postedBy: toObjectId(decoded.id) }).toArray();
    
    // Get applications for jobs posted by this HR
    const jobIds = jobs.map(job => job._id);
    const applications = await db.collection('applications').find({ 
      jobId: { $in: jobIds } 
    }).toArray();
    
    // Get recent activity (applications, job posts, etc.)
    const recentActivity = [
      ...applications.map(app => ({
        id: `app_${app._id}`,
        type: 'application',
        message: `New application for ${app.jobId?.title || 'job'}`,
        time: app.appliedAt || app.createdAt,
        user: app.userId
      })),
      ...jobs.map(job => ({
        id: `job_${job._id}`,
        type: 'job_posted',
        message: `Posted job: ${job.title}`,
        time: job.createdAt,
        job: job
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10);

    // Calculate statistics
    const stats = {
      totalJobs: jobs.length,
      totalApplications: applications.length,
      pendingApplications: applications.filter(app => app.status === 'applied').length,
      approvedApplications: applications.filter(app => app.status === 'approved').length,
      rejectedApplications: applications.filter(app => app.status === 'rejected').length
    };

    // Return data in the format expected by the frontend
    const dashboardData = {
      name: hrUser.name || "HR User",
      company: company ? company.name : "Unknown Company",
      totalJobs: stats.totalJobs,
      activeJobs: jobs.filter(job => job.status === 'active' || job.status === 'Active').length,
      totalApplications: stats.totalApplications,
      pendingReviews: stats.pendingApplications
    };

    console.log('HR User company data:', {
      companyId: hrUser.companyId,
      company: hrUser.company,
      companyType: typeof hrUser.company
    });
    console.log('Resolved company:', company);
    console.log('HR Dashboard data:', dashboardData);
    console.log('HR Dashboard data fetched successfully');
    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('HR Dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
