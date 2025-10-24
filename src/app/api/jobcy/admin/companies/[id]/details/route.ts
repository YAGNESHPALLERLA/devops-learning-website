import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Fetching company details for ID:', id);
    
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

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Access denied. Admin role required.' }, { status: 403 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Convert string ID to ObjectId if needed
    const { ObjectId } = await import('mongodb');
    const companyId = typeof id === 'string' ? new ObjectId(id) : id;
    
    // Get company details
    const company = await db.collection('users').findOne({ 
      _id: companyId,
      $or: [{ role: 'company' }, { role: 'Company' }]
    });
    
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    console.log('Found company:', company.name);

    // Get HR users for this company
    const hrs = await db.collection('users').find({
      $and: [
        { $or: [{ role: 'hr' }, { role: 'HR' }] },
        { $or: [
          { companyId: companyId },
          { 'company._id': companyId }
        ]}
      ]
    }).toArray();

    console.log('Found HR users:', hrs.length);

    // Get jobs posted by HR users of this company
    const hrIds = hrs.map(hr => hr._id);
    const jobs = await db.collection('jobs').find({
      postedBy: { $in: hrIds }
    }).toArray();

    console.log('Found jobs:', jobs.length);

    // Get applications for these jobs
    const jobIds = jobs.map(job => job._id);
    const applications = await db.collection('applications').find({
      jobId: { $in: jobIds }
    }).toArray();

    console.log('Found applications:', applications.length);

    // Populate application data with user and job details
    const populatedApplications = await Promise.all(
      applications.map(async (app) => {
        // Convert string IDs to ObjectId if needed
        const appJobId = typeof app.jobId === 'string' ? new ObjectId(app.jobId) : app.jobId;
        const appUserId = typeof app.userId === 'string' ? new ObjectId(app.userId) : app.userId;
        
        const job = await db.collection('jobs').findOne({ _id: appJobId });
        const user = await db.collection('users').findOne({ _id: appUserId });
        
        console.log('Application job found:', job ? 'Yes' : 'No');
        console.log('Application user found:', user ? 'Yes' : 'No');
        if (user) {
          console.log('User name:', user.name);
          console.log('User email:', user.email);
        }
        
        return {
          _id: app._id,
          jobId: {
            _id: job?._id,
            title: job?.title
          },
          userId: {
            _id: user?._id,
            name: user?.name,
            email: user?.email
          },
          status: app.status || 'applied',
          appliedAt: app.appliedAt || app.createdAt,
          createdAt: app.createdAt
        };
      })
    );

    const companyDetails = {
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        industry: company.industry,
        companySize: company.companySize,
        website: company.website,
        phone: company.phone,
        address: company.address,
        createdAt: company.createdAt,
        registeredBy: company.registeredBy
      },
      hrs: hrs.map(hr => ({
        _id: hr._id,
        name: hr.name,
        email: hr.email,
        mobile: hr.mobile,
        companyId: hr.companyId,
        company: hr.company,
        phone: hr.phone,
        address: hr.address,
        industry: hr.industry,
        companySize: hr.companySize,
        website: hr.website
      })),
      jobs: jobs.map(job => ({
        _id: job._id,
        title: job.title,
        description: job.description,
        location: job.location,
        salary: job.salary,
        type: job.type,
        status: job.status,
        postedBy: job.postedBy,
        createdAt: job.createdAt
      })),
      applications: populatedApplications
    };

    console.log('Returning company details:', {
      company: companyDetails.company.name,
      hrs: companyDetails.hrs.length,
      jobs: companyDetails.jobs.length,
      applications: companyDetails.applications.length
    });

    return NextResponse.json(companyDetails);
  } catch (error) {
    console.error('Company details error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
