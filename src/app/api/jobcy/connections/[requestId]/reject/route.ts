import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function POST(// __request: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {
  try {
    const resolvedParams = await params;
    const { requestId } = resolvedParams;
    console.log('Reject connection request:', { requestId });
    
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
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Update connection status to rejected
    const result = await db.collection('connections').updateOne(
      { 
        _id: toObjectId(requestId), 
        toUserId: decoded.id,
        status: 'pending'
      },
      { 
        $set: { 
          status: 'rejected',
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Connection request not found' }, { status: 404 });
    }
    
    console.log('Connection request rejected successfully');
    
    return NextResponse.json({
      message: 'Connection request rejected successfully'
    });
  } catch {
    console.error('Reject connection error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
