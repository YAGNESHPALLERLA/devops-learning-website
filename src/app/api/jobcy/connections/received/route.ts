import { NextRequest, NextResponse } from 'next/server';
import { connectDB, toObjectId } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('Received connections request');
    
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
    
    // Get received connection requests - try both ObjectId and string formats
    const { ObjectId } = await import('mongodb');
    let connections;
    
    try {
      // Try with ObjectId conversion
      const toUserIdObj = toObjectId(decoded.id);
      connections = await db.collection('connections').find({ 
        toUserId: toUserIdObj, 
        status: 'pending' 
      }).toArray();
      
      // If no results with ObjectId, try string format
      if (connections.length === 0) {
        connections = await db.collection('connections').find({ 
          toUserId: decoded.id, 
          status: 'pending' 
        }).toArray();
      }
    } catch {
      // Fallback to string format only
      connections = await db.collection('connections').find({ 
        toUserId: decoded.id, 
        status: 'pending' 
      }).toArray();
    }
    
    console.log('Found received connections:', connections.length);
    
    // Populate sender details
    const populatedConnections = await Promise.all(
      connections.map(async (conn) => {
        let sender = null;
        const fromUserId = conn.fromUserId;
        
        // Try to find user with ObjectId conversion
        try {
          const senderObjectId = fromUserId instanceof ObjectId ? fromUserId : toObjectId(fromUserId);
          sender = await db.collection('users').findOne({ _id: senderObjectId });
        } catch {
          // If ObjectId conversion fails, try as string
          try {
            sender = await db.collection('users').findOne({ _id: fromUserId.toString() });
          } catch {
            // If that also fails, try with ObjectId constructor
            try {
              sender = await db.collection('users').findOne({ _id: new ObjectId(fromUserId) });
            } catch (error) {
              console.error('Error finding sender user:', fromUserId, error);
            }
          }
        }
        
        console.log('Sender lookup:', { 
          fromUserId, 
          foundUser: !!sender, 
          userName: sender?.name 
        });
        
        return {
          _id: conn._id,
          sender: {
            _id: sender?._id || fromUserId,
            name: sender?.name || 'Unknown User',
            email: sender?.email,
            professionalRole: sender?.professionalRole || sender?.title || 'Professional',
            currentLocation: sender?.location || sender?.currentLocation || 'Location not specified',
            avatar: sender?.avatar
          },
          receiver: {
            _id: conn.toUserId,
            name: 'Current User' // This is the current user
          },
          message: conn.message || '',
          status: conn.status,
          createdAt: conn.createdAt
        };
      })
    );
    
    return NextResponse.json(populatedConnections);
  } catch (error) {
    console.error('Received connections error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
