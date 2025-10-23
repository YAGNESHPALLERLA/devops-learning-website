import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function PUT(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await _request.json();
    console.log('Update experience request:', { id, body });
    
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
    
    // Get user to find the experience entry
    const user = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Find the experience entry in the user's experienceList
    const experienceList = user.experienceList || [];
    const experienceIndex = experienceList.findIndex((exp: { id: string }) => exp.id === id);
    
    if (experienceIndex === -1) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    
    // Update the experience entry
    const updatedExperience = {
      ...experienceList[experienceIndex],
      ...body,
      updatedAt: new Date()
    };
    
    experienceList[experienceIndex] = updatedExperience;
    
    // Update the user's experienceList
    const result = await db.collection('users').updateOne(
      { _id: toObjectId(decoded.id) },
      { 
        $set: { 
          experienceList: experienceList,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
    }
    
    console.log('Experience updated successfully in user profile');
    
    return NextResponse.json({
      message: 'Experience updated successfully',
      experience: updatedExperience
    });
  } catch (error) {
    console.error('Update experience error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    console.log('Delete experience request:', { id });
    
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
    
    // Get user to find the experience entry
    const user = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Find the experience entry in the user's experienceList
    const experienceList = user.experienceList || [];
    const experienceIndex = experienceList.findIndex((exp: { id: string }) => exp.id === id);
    
    if (experienceIndex === -1) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }
    
    // Remove the experience entry from the array
    experienceList.splice(experienceIndex, 1);
    
    // Update the user's experienceList
    const result = await db.collection('users').updateOne(
      { _id: toObjectId(decoded.id) },
      { 
        $set: { 
          experienceList: experienceList,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
    }
    
    console.log('Experience deleted successfully from user profile');
    
    return NextResponse.json({
      message: 'Experience deleted successfully'
    });
  } catch (error) {
    console.error('Delete experience error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
