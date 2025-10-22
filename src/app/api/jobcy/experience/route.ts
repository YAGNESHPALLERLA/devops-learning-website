import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    console.log('Experience request');
    
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

    // Connect to database
    const db = await connectDB();
    
    // Get user experience
    const experience = await db.collection('experience').find({ userId: decoded.id }).toArray();
    
    console.log('Found experience:', experience.length);
    
    return NextResponse.json({ experience });
  } catch (error) {
    console.error('Experience error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Create experience request:', body);
    
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

    // Connect to database
    const db = await connectDB();
    
    // Create new experience
    const newExperience = {
      ...body,
      userId: decoded.id,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('experience').insertOne(newExperience);
    
    console.log('Experience created successfully:', result.insertedId);
    
    return NextResponse.json({
      message: 'Experience created successfully',
      experience: {
        id: result.insertedId,
        ...newExperience
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Create experience error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
