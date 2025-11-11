import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

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
    let db;
    try {
      db = await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({ 
        error: 'Database connection failed',
        message: 'Unable to connect to database',
        details: dbError instanceof Error ? dbError.message : String(dbError)
      }, { status: 500 });
    }
    
    // Convert userId to ObjectId
    const userIdVariants: (ObjectId | string)[] = [];
    try {
      const objectId = new ObjectId(decoded.id);
      userIdVariants.push(objectId);
    } catch {
      console.log('User applications: decoded id is not a valid ObjectId, continuing with string match');
    }
    userIdVariants.push(decoded.id);
    
    // Get user applications
    let applications;
    try {
      applications = await db.collection('applications')
        .find({ userId: { $in: userIdVariants } })
        .sort({ appliedAt: -1 })
        .toArray();
    } catch (dbError) {
      console.error('Database error fetching applications:', dbError);
      return NextResponse.json({ 
        error: 'Database error', 
        message: 'Failed to fetch applications from database',
        details: dbError instanceof Error ? dbError.message : String(dbError)
      }, { status: 500 });
    }
    
    console.log('Found applications:', applications.length);
    
    // If no applications, return empty array
    if (!applications || applications.length === 0) {
      return NextResponse.json([]);
    }
    
    // Populate applications with job details
    const populatedApplications = await Promise.all(
      applications.map(async (app) => {
        let job = null;
        if (app.jobId) {
          try {
            const jobId = app.jobId instanceof ObjectId ? app.jobId : new ObjectId(app.jobId);
            job = await db.collection('jobs').findOne({ _id: jobId });
          } catch (e) {
            console.error('Error fetching job for application:', e);
          }
        }
        
        return {
          id: app._id?.toString(),
          _id: app._id?.toString(),
          jobId: app.jobId?.toString(),
          userId: app.userId?.toString(),
          coverLetter: app.coverLetter,
          status: app.status || 'applied',
          appliedAt: app.appliedAt || app.createdAt,
          createdAt: app.createdAt,
          updatedAt: app.updatedAt,
          job: job ? {
            id: job._id?.toString(),
            _id: job._id?.toString(),
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            type: job.type,
            description: job.description
          } : null
        };
      })
    );
    
    console.log('Populated applications:', populatedApplications.length);
    
    return NextResponse.json(populatedApplications);
  } catch (error) {
    console.error('User applications error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ 
      error: 'Internal server error', 
      message: errorMessage,
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
