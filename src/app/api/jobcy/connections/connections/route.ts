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
    let db;
    try {
      db = await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({ 
        error: 'Database connection failed',
        message: 'Unable to connect to database',
        details: dbError instanceof Error ? dbError.message : String(dbError)
      }, { status: 500 });
    }
    
    const { ObjectId } = await import('mongodb');
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Try to convert userId to ObjectId, but also keep string version
    let userIdObj: typeof ObjectId.prototype | null = null;
    try {
      userIdObj = toObjectId(decoded.id);
    } catch {
      // If conversion fails, we'll use string format
    }
    
    const userIdString = decoded.id;
    
    // Get user connections - query for both ObjectId and string formats
    // Connections may be stored as strings (from send route) or ObjectIds
    const connections = await db.collection('connections').find({ 
      $or: [
        // ObjectId format
        ...(userIdObj ? [
          { fromUserId: userIdObj, status: 'accepted' },
          { toUserId: userIdObj, status: 'accepted' }
        ] : []),
        // String format
        { fromUserId: userIdString, status: 'accepted' },
        { toUserId: userIdString, status: 'accepted' }
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
        // Check if current user is the sender or receiver (handle both string and ObjectId)
        const fromUserIdStr = conn.fromUserId?.toString();
        const toUserIdStr = conn.toUserId?.toString();
        const currentUserIdStr = userIdString;
        
        const isFromUser = fromUserIdStr === currentUserIdStr;
        const otherUserId = isFromUser ? conn.toUserId : conn.fromUserId;
        
        // Try to convert otherUserId to ObjectId for user lookup
        let otherUserObjId: typeof ObjectId.prototype;
        try {
          if (otherUserId instanceof ObjectId) {
            otherUserObjId = otherUserId;
          } else {
            otherUserObjId = toObjectId(otherUserId);
          }
        } catch {
          console.error('Invalid otherUserId:', otherUserId);
          return null;
        }
        
        // Try to find user by ObjectId first, then by string if needed
        let otherUser = await db.collection('users').findOne({ _id: otherUserObjId });
        
        // If not found with ObjectId, try with string format
        if (!otherUser && typeof otherUserId === 'string') {
          otherUser = await db.collection('users').findOne({ _id: otherUserId });
        }
        
        console.log('Looking up user:', { otherUserId: otherUserObjId.toString(), foundUser: !!otherUser, userName: otherUser?.name });
        
        if (!otherUser) {
          return null;
        }
        
        return {
          id: otherUser._id?.toString(),
          name: otherUser.name || 'Unknown User',
          title: otherUser.professionalRole || otherUser.title || 'Professional',
          location: otherUser.location || otherUser.currentLocation || 'Location not specified',
          email: otherUser.email,
          experience: otherUser.experience || 'Not specified',
          skills: otherUser.skills || [],
          status: otherUser.status || 'employed',
          connected: true,
          avatar: otherUser.avatar || null,
          bio: otherUser.about || otherUser.bio || '',
          connectedAt: conn.updatedAt || conn.createdAt
        };
      })
    );
    
    // Filter out null results
    const validConnections = populatedConnections.filter(conn => conn !== null);
    
    return NextResponse.json(validConnections);
  } catch (error) {
    console.error('Connections error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
