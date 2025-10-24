import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Admin update company request for ID:', id);
    
    // Get user ID from JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const jwt = await import('jsonwebtoken');
    
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email, password, industry, location, website, description, size, status } = body;

    // Connect to database
    const db = await connectDB();
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Check if company exists
    const company = await db.collection('users').findOne({ 
      _id: toObjectId(id),
      $or: [
        { role: 'company' },
        { role: 'Company' }
      ]
    });
    
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Prepare update data
    const updateData: Record<string, unknown> = {
      name,
      email,
      industry: industry || '',
      location: location || '',
      website: website || '',
      description: description || '',
      size: size || '',
      status: status || 'Active',
      updatedAt: new Date()
    };

    // Only update password if provided
    if (password && password.trim()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    // Update company
    const result = await db.collection('users').updateOne(
      { _id: toObjectId(id) },
      { $set: updateData }
    );
    
    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'No changes made' }, { status: 400 });
    }
    
    console.log('Company updated:', id);
    
    return NextResponse.json({ 
      message: 'Company updated successfully',
      company: {
        _id: id,
        name,
        email,
        industry,
        location,
        website,
        description,
        size,
        status
      }
    });
  } catch (error) {
    console.error('Admin update company error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    console.log('Admin delete company request for ID:', id);
    
    // Get user ID from JWT token
    const authHeader = _request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const jwt = await import('jsonwebtoken');
    
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Connect to database
    const db = await connectDB();
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Check if company exists
    const company = await db.collection('users').findOne({ 
      _id: toObjectId(id),
      $or: [
        { role: 'company' },
        { role: 'Company' }
      ]
    });
    
    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Delete company
    const result = await db.collection('users').deleteOne({ _id: toObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Failed to delete company' }, { status: 400 });
    }
    
    console.log('Company deleted:', id);
    
    return NextResponse.json({ 
      message: 'Company deleted successfully'
    });
  } catch (error) {
    console.error('Admin delete company error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
