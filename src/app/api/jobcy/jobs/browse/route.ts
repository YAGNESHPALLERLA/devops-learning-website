import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    console.log('Jobs browse request');
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const company = searchParams.get('company') || '';
    
    // Connect to database
    const db = await connectDB();
    
    // Build query
    const query: Record<string, unknown> = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }
    
    // Get total count
    const total = await db.collection('jobs').countDocuments(query);
    
    // Get jobs with pagination
    const jobs = await db.collection('jobs')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    console.log('Found jobs:', jobs.length);
    
    return NextResponse.json(jobs);
  } catch (error) {
    console.error('Jobs browse error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
