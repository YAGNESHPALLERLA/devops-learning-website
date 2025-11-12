import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function PUT(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    console.log('Update HR request:', { id });
    
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

    // Only admin can update HR users
    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await _request.json();
    const { name, email, password, company, companyId, companySize, industry, website, phone, address } = body;

    // Connect to database
    const db = await connectDB();
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Check if HR user exists
    const existingHR = await db.collection('users').findOne({
      _id: toObjectId(id),
      $or: [
        { role: 'hr' },
        { role: 'HR' }
      ]
    });
    
    if (!existingHR) {
      return NextResponse.json({ error: 'HR user not found' }, { status: 404 });
    }

    // Check if email is already taken by another user
    if (email && email !== existingHR.email) {
      const emailExists = await db.collection('users').findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: toObjectId(id) }
      });
      if (emailExists) {
        return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
      }
    }

    // Prepare update object
    const updateData: Record<string, unknown> = {
      name: name || existingHR.name,
      email: email ? email.toLowerCase() : existingHR.email,
      company: company || existingHR.company || {},
      companySize: companySize || existingHR.companySize || '',
      industry: industry || existingHR.industry || '',
      website: website || existingHR.website || '',
      phone: phone || existingHR.phone || '',
      address: address || existingHR.address || '',
      updatedAt: new Date(),
    };

    // Add companyId if provided
    if (companyId) {
      updateData.companyId = toObjectId(companyId);
    }

    // Update password if provided
    if (password && password.trim().length > 0) {
      if (password.length < 6) {
        return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    // Update HR user
    const result = await db.collection('users').updateOne(
      { _id: toObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'HR user not found' }, { status: 404 });
    }
    
    // Fetch updated HR user
    const updatedHR = await db.collection('users').findOne({ _id: toObjectId(id) });
    
    console.log('HR user updated successfully');
    
    return NextResponse.json({
      message: 'HR user updated successfully',
      hr: {
        _id: updatedHR?._id,
        name: updatedHR?.name,
        email: updatedHR?.email,
        company: updatedHR?.company,
        companyId: updatedHR?.companyId,
        companySize: updatedHR?.companySize,
        industry: updatedHR?.industry,
        website: updatedHR?.website,
        phone: updatedHR?.phone,
        address: updatedHR?.address,
        status: updatedHR?.status || 'Active',
        createdDate: updatedHR?.createdAt || updatedHR?.createdDate,
      }
    });
  } catch (error) {
    console.error('Update HR error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

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
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Connect to database
    const db = await connectDB();
    const { toObjectId } = await import('@/lib/mongodb');
    
    // Delete HR user (handle both lowercase and uppercase roles)
    const result = await db.collection('users').deleteOne({
      _id: toObjectId(id),
      $or: [
        { role: 'hr' },
        { role: 'HR' }
      ]
    });
    
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
