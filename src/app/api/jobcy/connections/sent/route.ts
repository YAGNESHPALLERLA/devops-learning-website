import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(// __request: NextRequest) {
  try {
    console.log('Sent connections request');
    
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
    
    // Get sent connection requests
    const connections = await db.collection('connections').find({ 
      fromUserId: decoded.id, 
      status: 'pending' 
    }).toArray();
    
    console.log('Found sent connections:', connections.length);
    
    return NextResponse.json({ connections });
  } catch {
    console.error('Sent connections error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
