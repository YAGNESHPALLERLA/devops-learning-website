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
    
    // Get HR user details
    const { toObjectId } = await import('@/lib/mongodb');
    const hrUser = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    if (!hrUser) {
      return NextResponse.json({ error: 'HR user not found' }, { status: 404 });
    }
    
    // Get jobs posted by this HR user (handle both ObjectId and string formats)
    const { ObjectId } = await import('mongodb');
    const hrObjectId = new ObjectId(decoded.id);
    
    // Query for both ObjectId and string formats
    const objectIdJobs = await db.collection('jobs').find({ postedBy: hrObjectId }).toArray();
    const stringJobs = await db.collection('jobs').find({ postedBy: decoded.id }).toArray();
    
    console.log('HR Applications - Found jobs with ObjectId postedBy:', objectIdJobs.length);
    console.log('HR Applications - Found jobs with string postedBy:', stringJobs.length);
    
    // Combine both results and remove duplicates
    const allJobs = [...objectIdJobs, ...stringJobs];
    const uniqueJobs = allJobs.filter((job, index, self) => 
      index === self.findIndex(j => j._id.toString() === job._id.toString())
    );
    
    console.log('HR Applications - Total unique jobs found:', uniqueJobs.length);
    
    // Get job IDs for applications query
    const jobIds = uniqueJobs.map(job => job._id);
    
    if (jobIds.length === 0) {
      return NextResponse.json({ applications: [] });
    }
    
    // Get applications for jobs posted by this HR
    const applications = await db.collection('applications').find({ 
      jobId: { $in: jobIds } 
    }).toArray();
    
    console.log('HR Applications - Found applications:', applications.length);
    
    // Populate applications with job and user details
    const populatedApplications = await Promise.all(
      applications.map(async (app) => {
        const job = uniqueJobs.find(j => j._id.toString() === app.jobId.toString());
        
        // Try to find user with simplified approach
        let user = null;
        
        try {
          // First try with ObjectId conversion
          const { ObjectId } = await import('mongodb');
          const userObjectId = new ObjectId(app.userId);
          user = await db.collection('users').findOne({ _id: userObjectId });
        } catch (objectIdError) {
          console.log('Error converting to ObjectId, trying string format:', app.userId);
          // If ObjectId conversion fails, try as string
          try {
            user = await db.collection('users').findOne({ _id: app.userId.toString() });
          } catch (stringError) {
            console.log('Error finding user with string ID:', app.userId);
          }
        }
        
        console.log('Application user lookup:', { 
          userId: app.userId, 
          foundUser: !!user, 
          userName: user?.name 
        });
        
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
            phone: user.phone,
            mobile: user.mobile,
            currentLocation: user.currentLocation,
            skills: user.skills,
            resume: user.resume
          } : {
            _id: app.userId,
            name: 'Unknown User',
            email: '',
            phone: '',
            mobile: '',
            currentLocation: '',
            skills: [],
            resume: null
          }
        };
      })
    );
    
    console.log('HR Applications - Populated applications:', populatedApplications.length);
    
    console.log('HR Applications - Final populated applications:', populatedApplications.length);
    
    return NextResponse.json(populatedApplications);
  } catch (error) {
    console.error('HR applications error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'Unknown'
    });
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
