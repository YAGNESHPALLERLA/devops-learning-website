import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('Chat chats request');
    
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
    
    // Get user chats
    const chats = await db.collection('chats').find({ 
      $or: [
        { userId1: decoded.id },
        { userId2: decoded.id }
      ]
    }).toArray();
    
    console.log('Found chats:', chats.length);
    
    return NextResponse.json({ chats });
  } catch (error) {
    console.error('Chat chats error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
