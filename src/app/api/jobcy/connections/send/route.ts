import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { toUserId } = body;
    console.log('Send connection request:', { toUserId });
    
    // Get user ID from JWT token
    const authHeader = request.headers.get('authorization');
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

    if (!toUserId) {
      return NextResponse.json({ error: 'toUserId is required' }, { status: 400 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Check if connection already exists
    const existingConnection = await db.collection('connections').findOne({
      $or: [
        { fromUserId: decoded.id, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: decoded.id }
      ]
    });
    
    if (existingConnection) {
      return NextResponse.json({ error: 'Connection already exists' }, { status: 400 });
    }
    
    // Create new connection request
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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
