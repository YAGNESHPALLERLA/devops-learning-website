import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('Experience request');
    
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
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Connect to database
    const db = await connectDB();
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Get user profile to extract experience data
    const user = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Return experience from user profile
    const experience = user.experienceList || [];
    
    console.log('Found experience from user profile:', experience.length);
    
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Experience error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    console.log('Create experience request:', body);
    
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
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Connect to database
    const db = await connectDB();
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Create new experience with ID
    const newExperience = {
      id: new Date().getTime().toString(), // Generate unique ID
      ...body,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Add experience to user's experienceList
    const result = await db.collection('users').updateOne(
      { _id: toObjectId(decoded.id) },
      { 
        $push: { experienceList: newExperience },
        $set: { updatedAt: new Date() }
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('Experience added to user profile successfully');
    
    return NextResponse.json({
      message: 'Experience created successfully',
      experience: newExperience
    }, { status: 201 });
  } catch (error) {
    console.error('Create experience error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
