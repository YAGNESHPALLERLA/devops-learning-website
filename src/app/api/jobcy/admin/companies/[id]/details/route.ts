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

    console.log('✅ Found company:', company.name);
    console.log('🏢 Company ID:', companyId);
    console.log('🏢 Company ObjectId type:', typeof companyId);

    // Get HR users for this company
    console.log('🔍 Searching for HR users...');
    console.log('🔍 Company name for HR search:', company.name);
    
    // Try multiple approaches to find HR users
    const hrs = await db.collection('users').find({
      $and: [
        { $or: [{ role: 'hr' }, { role: 'HR' }] },
        { $or: [
          { companyId: companyId },
          { 'company._id': companyId },
          { 'company.name': company.name },
          { companyId: company._id },
          { 'company._id': company._id }
        ]}
      ]
    }).toArray();
    
    // If no HRs found with the above query, try a broader search
    if (hrs.length === 0) {
      console.log('🔍 No HRs found with company association, trying broader search...');
      const allHrs = await db.collection('users').find({
        $or: [{ role: 'hr' }, { role: 'HR' }]
      }).toArray();
      
      console.log('👥 All HR users in database:', allHrs.map(hr => ({ 
        name: hr.name, 
        companyId: hr.companyId, 
        company: hr.company,
        role: hr.role 
      })));
    }

    console.log('👥 Found HR users:', hrs.length);
    console.log('👥 HR users data:', hrs.map(hr => ({ name: hr.name, companyId: hr.companyId, company: hr.company })));

    // Get jobs posted by HR users of this company
    const hrIds = hrs.map(hr => hr._id);
    console.log('👥 HR IDs for job search:', hrIds);
    
    const jobs = await db.collection('jobs').find({
      postedBy: { $in: hrIds }
    }).toArray();

    console.log('💼 Found jobs:', jobs.length);
    console.log('💼 Jobs data:', jobs.map(job => ({ title: job.title, postedBy: job.postedBy })));

    // If no jobs found, check all jobs in database
    if (jobs.length === 0) {
      console.log('🔍 No jobs found for this company, checking all jobs in database...');
      const allJobs = await db.collection('jobs').find({}).toArray();
      console.log('💼 All jobs in database:', allJobs.map(job => ({ 
        title: job.title, 
        postedBy: job.postedBy,
        company: job.company 
      })));
    }

    // Get applications for these jobs
    const jobIds = jobs.map(job => job._id);
    console.log('📋 Job IDs for application search:', jobIds);
    
    const applications = await db.collection('applications').find({
      jobId: { $in: jobIds }
    }).toArray();

    console.log('📋 Found applications:', applications.length);
    console.log('📋 Applications data:', applications.map(app => ({ jobId: app.jobId, userId: app.userId })));
    
    // If no applications found, check all applications in database
    if (applications.length === 0) {
      console.log('🔍 No applications found for this company, checking all applications in database...');
      const allApplications = await db.collection('applications').find({}).toArray();
      console.log('📋 All applications in database:', allApplications.map(app => ({ 
        jobId: app.jobId, 
        userId: app.userId,
        status: app.status 
      })));
    }

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
