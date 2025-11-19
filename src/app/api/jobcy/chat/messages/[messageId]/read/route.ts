import { NextRequest, NextResponse } from 'next/server';
import { connectDB, toObjectId } from '@/lib/mongodb';

export async function PUT(_request: NextRequest, { params }: { params: Promise<{ messageId: string }> }) {
  try {
    const resolvedParams = await params;
    const { messageId } = resolvedParams;
    
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
    
    // Mark message as read
    const result = await db.collection('messages').updateOne(
      { 
        _id: toObjectId(messageId)
      },
      { 
        $set: { 
          isRead: true,
          readAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Message not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mark message as read error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

