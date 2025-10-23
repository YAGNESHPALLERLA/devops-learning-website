import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    console.log('Delete HR request:', { id });
    
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
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Delete HR user
    const result = await db.collection('users').deleteOne(
      { _id: toObjectId(id), role: 'hr' }
    );
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'HR user not found' }, { status: 404 });
    }
    
    console.log('HR user deleted successfully');
    
    return NextResponse.json({
      message: 'HR user deleted successfully'
    });
  } catch (error) {
    console.error('Delete HR error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
