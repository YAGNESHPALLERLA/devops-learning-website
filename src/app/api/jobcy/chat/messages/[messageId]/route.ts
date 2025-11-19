import { NextRequest, NextResponse } from 'next/server';
import { connectDB, toObjectId } from '@/lib/mongodb';

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ messageId: string }> }) {
  try {
    const resolvedParams = await params;
    const { messageId } = resolvedParams;
    let body: { deleteForEveryone?: boolean } = {};
    try {
      body = await _request.json();
    } catch {
      // Body might be empty
    }
    const { deleteForEveryone } = body;
    
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
    
    // Get message to check ownership
    const message = await db.collection('messages').findOne({ _id: toObjectId(messageId) });
    
    if (!message) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    
    // Check if user is the sender
    const isSender = message.sender?.id?.toString() === decoded.id || 
                     message.sender?._id?.toString() === decoded.id;
    
    if (!isSender) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }
    
    if (deleteForEveryone) {
      // Delete message completely
      await db.collection('messages').deleteOne({ _id: toObjectId(messageId) });
    } else {
      // Mark as deleted for sender only
      await db.collection('messages').updateOne(
        { _id: toObjectId(messageId) },
        { 
          $set: { 
            deletedForSender: true,
            deletedAt: new Date()
          } 
        }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete message error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

