import { NextRequest, NextResponse } from 'next/server';
import { connectDB, toObjectId } from '@/lib/mongodb';

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    const { toUserId } = body;
    console.log('Send connection request:', { toUserId });
    
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

    if (!toUserId) {
      return NextResponse.json({ error: 'toUserId is required' }, { status: 400 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Convert IDs to ObjectId for consistent querying
    let fromUserId: unknown;
    let toUserIdObj: unknown;
    
    try {
      fromUserId = toObjectId(decoded.id);
    } catch {
      fromUserId = decoded.id; // Fallback to string if conversion fails
    }
    
    try {
      toUserIdObj = toObjectId(toUserId);
    } catch {
      toUserIdObj = toUserId; // Fallback to string if conversion fails
    }
    
    // Check if connection already exists (try both ObjectId and string formats)
    const existingConnection = await db.collection('connections').findOne({
      $or: [
        { fromUserId: fromUserId, toUserId: toUserIdObj },
        { fromUserId: toUserIdObj, toUserId: fromUserId },
        { fromUserId: decoded.id, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: decoded.id }
      ]
    });
    
    if (existingConnection) {
      return NextResponse.json({ error: 'Connection already exists' }, { status: 400 });
    }
    
    // Create new connection request (store as strings for consistency)
    const newConnection = {
      fromUserId: decoded.id,
      toUserId: toUserId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('connections').insertOne(newConnection);
    
    console.log('Connection request sent successfully:', result.insertedId);
    
    return NextResponse.json({
      message: 'Connection request sent successfully',
      connection: {
        id: result.insertedId,
        ...newConnection
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Send connection error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
