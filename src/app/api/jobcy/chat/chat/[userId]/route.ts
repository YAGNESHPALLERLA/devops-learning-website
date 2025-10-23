import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const resolvedParams = await params;
    const { userId } = resolvedParams;
    console.log('Chat with user request:', { userId });
    
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
    
    // Get or create chat between users
    let chat = await db.collection('chats').findOne({
      $or: [
        { userId1: decoded.id, userId2: userId },
        { userId1: userId, userId2: decoded.id }
      ]
    });
    
    if (!chat) {
      // Create new chat
      const newChat = {
        userId1: decoded.id,
        userId2: userId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const result = await db.collection('chats').insertOne(newChat);
      chat = { _id: result.insertedId, ...newChat };
    }
    
    console.log('Chat found/created:', chat._id);
    
    return NextResponse.json({ chat });
  } catch (error) {
    console.error('Chat with user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
