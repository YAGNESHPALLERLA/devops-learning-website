import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('Connections request');
    
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
    
    // Get user connections
    const connections = await db.collection('connections').find({ 
      $or: [
        { fromUserId: decoded.id, status: 'accepted' },
        { toUserId: decoded.id, status: 'accepted' }
      ]
    }).toArray();
    
    console.log('Found connections:', connections.length);
    console.log('Connection details:', connections.map(c => ({ 
      fromUserId: c.fromUserId, 
      toUserId: c.toUserId, 
      status: c.status 
    })));
    
    // Populate user details for each connection
    const populatedConnections = await Promise.all(
      connections.map(async (conn) => {
        const isFromUser = conn.fromUserId === decoded.id;
        const otherUserId = isFromUser ? conn.toUserId : conn.fromUserId;
        
        const { toObjectId } = await import('@/lib/mongodb');
        const otherUser = await db.collection('users').findOne({ _id: toObjectId(otherUserId) });
        
        console.log('Looking up user:', { otherUserId, foundUser: !!otherUser, userName: otherUser?.name });
        
        return {
          id: otherUser?._id,
          name: otherUser?.name || 'Unknown User',
          title: otherUser?.professionalRole || otherUser?.title || 'Professional',
          location: otherUser?.location || otherUser?.currentLocation || 'Location not specified',
          email: otherUser?.email,
          experience: otherUser?.experience || 'Not specified',
          skills: otherUser?.skills || [],
          status: otherUser?.status || 'employed',
          connected: true,
          avatar: otherUser?.avatar || null,
          bio: otherUser?.about || otherUser?.bio || '',
          connectedAt: conn.updatedAt || conn.createdAt
        };
      })
    );
    
    return NextResponse.json(populatedConnections);
  } catch (error) {
    console.error('Connections error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
