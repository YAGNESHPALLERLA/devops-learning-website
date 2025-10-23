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
    } catch (error) {
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
