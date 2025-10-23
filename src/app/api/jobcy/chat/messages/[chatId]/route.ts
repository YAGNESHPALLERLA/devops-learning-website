import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const resolvedParams = await params;
    const { chatId } = resolvedParams;
    console.log('Chat messages request:', { chatId });
    
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
    
    // Get chat messages
    const messages = await db.collection('messages').find({ chatId }).sort({ createdAt: 1 }).toArray();
    
    console.log('Found messages:', messages.length);
    
    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Chat messages error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(_request: NextRequest, { params }: { params: Promise<{ chatId: string }> }) {
  try {
    const resolvedParams = await params;
    const { chatId } = resolvedParams;
    const body = await _request.json();
    const { content } = body;
    
    console.log('Send message request:', { chatId, content });
    
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
    
    // Get user details
    const { toObjectId } = await import('@/lib/mongodb');
    const user = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Create message
    const message = {
      chatId,
      content,
      sender: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      isRead: false,
      createdAt: new Date()
    };
    
    // Save message to database
    const result = await db.collection('messages').insertOne(message);
    
    console.log('Message saved:', result.insertedId);
    
    return NextResponse.json({ 
      success: true, 
      message: {
        id: result.insertedId,
        ...message
      }
    });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
