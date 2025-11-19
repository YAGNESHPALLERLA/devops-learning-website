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
    const { ObjectId } = await import('mongodb');
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Convert chatId to ObjectId for querying (handle both string and ObjectId formats)
    let chatIdObj: typeof ObjectId.prototype;
    try {
      chatIdObj = toObjectId(chatId);
    } catch {
      // If conversion fails, try querying with string
      chatIdObj = chatId as unknown as typeof ObjectId.prototype;
    }
    
    // Query messages with both ObjectId and string formats
    const messages = await db.collection('messages').find({ 
      $or: [
        { chatId: chatIdObj },
        { chatId: chatId }
      ]
    }).sort({ createdAt: 1 }).toArray();
    
    console.log('Found messages:', messages.length);
    
    // Format messages with string IDs for frontend
    const formattedMessages = messages
      .filter(msg => !msg.deletedForEveryone) // Filter out messages deleted for everyone
      .map(msg => ({
        id: msg._id?.toString() || msg.id?.toString(),
        _id: msg._id?.toString() || msg.id?.toString(),
        chatId: msg.chatId?.toString() || msg.chatId,
        content: msg.content,
        sender: {
          id: msg.sender?.id?.toString() || msg.sender?._id?.toString() || msg.sender?.id,
          _id: msg.sender?.id?.toString() || msg.sender?._id?.toString() || msg.sender?.id,
          name: msg.sender?.name || 'Unknown',
          email: msg.sender?.email || ''
        },
        isRead: msg.isRead || false,
        readAt: msg.readAt,
        deletedForSender: msg.deletedForSender || false,
        deletedForEveryone: msg.deletedForEveryone || false,
        createdAt: msg.createdAt
      }));
    
    return NextResponse.json({ messages: formattedMessages });
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
    const { ObjectId } = await import('mongodb');
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Get user details
    const user = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Convert chatId to ObjectId for consistent storage
    let chatIdObj: typeof ObjectId.prototype;
    try {
      chatIdObj = toObjectId(chatId);
    } catch {
      // If conversion fails, use string format
      chatIdObj = chatId as unknown as typeof ObjectId.prototype;
    }
    
    // Create message - store chatId as ObjectId for consistency
    const message = {
      chatId: chatIdObj,
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
    
    // Format response message with string IDs for frontend
    return NextResponse.json({ 
      success: true, 
      message: {
        id: result.insertedId.toString(),
        _id: result.insertedId.toString(),
        chatId: chatIdObj.toString(),
        content: message.content,
        sender: {
          id: message.sender.id?.toString() || message.sender.id,
          _id: message.sender.id?.toString() || message.sender.id,
          name: message.sender.name,
          email: message.sender.email
        },
        isRead: message.isRead,
        createdAt: message.createdAt
      }
    });
  } catch (error) {
    console.error('Send message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
