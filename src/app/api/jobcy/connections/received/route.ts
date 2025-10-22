import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    console.log('Received connections request');
    
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
    
    // Get received connection requests
    const connections = await db.collection('connections').find({ 
      toUserId: decoded.id, 
      status: 'pending' 
    }).toArray();
    
    console.log('Found received connections:', connections.length);
    
    return NextResponse.json({ connections });
  } catch (error) {
    console.error('Received connections error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
