import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('🧪 Test HR Debug API called');
    
    // Test database connection
    const db = await connectDB();
    console.log('✅ Database connected');
    
    // Test toObjectId function
    const { toObjectId } = await import('@/lib/mongodb');
    const testId = '68e8ded871fb1f9c7780f2bc';
    console.log('Testing toObjectId with:', testId);
    
    let hrObjectId;
    try {
      hrObjectId = toObjectId(testId);
      console.log('✅ toObjectId conversion successful:', hrObjectId);
    } catch (error) {
      console.error('❌ toObjectId conversion failed:', error);
      return NextResponse.json({ 
        error: 'toObjectId conversion failed', 
        details: error instanceof Error ? error.message : 'Unknown error'
      }, { status: 500 });
    }
    
    // Test database query
    try {
      const jobs = await db.collection('jobs').find({ postedBy: hrObjectId }).toArray();
      console.log('✅ Database query successful, found jobs:', jobs.length);
      
      return NextResponse.json({
        success: true,
        hrObjectId: hrObjectId.toString(),
        jobsFound: jobs.length,
        jobs: jobs.slice(0, 3).map(job => ({
          title: job.title,
          company: job.company,
          postedBy: job.postedBy
        }))
      });
    } catch (dbError) {
      console.error('❌ Database query failed:', dbError);
      return NextResponse.json({ 
        error: 'Database query failed', 
        details: dbError instanceof Error ? dbError.message : 'Unknown error'
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('❌ Test API error:', error);
    return NextResponse.json({ 
      error: 'Test API failed', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
