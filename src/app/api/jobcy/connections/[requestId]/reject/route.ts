import { NextRequest, NextResponse } from 'next/server';
import { connectDB, toObjectId } from '@/lib/mongodb';

async function handleReject(_request: NextRequest, { params }: { params: Promise<{ requestId: string }> }) {
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
    const { ObjectId } = await import('mongodb');
    
    // Try to find and update connection with ObjectId conversion
    let result;
    try {
      // Try with ObjectId conversion for both _id and toUserId
      const requestObjectId = toObjectId(requestId);
      const toUserIdObj = toObjectId(decoded.id);
      
      result = await db.collection('connections').updateOne(
        { 
          _id: requestObjectId, 
          toUserId: toUserIdObj,
          status: 'pending'
        },
        { 
          $set: { 
            status: 'rejected',
            updatedAt: new Date()
          } 
        }
      );
      
      // If no match, try with string toUserId
      if (result.matchedCount === 0) {
        result = await db.collection('connections').updateOne(
          { 
            _id: requestObjectId, 
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
      }
    } catch {
      // Fallback: try with ObjectId constructor and string toUserId
      try {
        result = await db.collection('connections').updateOne(
          { 
            _id: new ObjectId(requestId), 
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
      } catch (error) {
        console.error('Error updating connection:', error);
        return NextResponse.json({ error: 'Failed to update connection' }, { status: 500 });
      }
    }
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Connection request not found' }, { status: 404 });
    }
    
    console.log('Connection request rejected successfully');
    
    return NextResponse.json({
      message: 'Connection request rejected successfully'
    });
  } catch (error) {
    console.error('Reject connection error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function PUT(_request: NextRequest, params: { params: Promise<{ requestId: string }> }) {
  return handleReject(_request, params);
}

export async function POST(_request: NextRequest, params: { params: Promise<{ requestId: string }> }) {
  return handleReject(_request, params);
}
