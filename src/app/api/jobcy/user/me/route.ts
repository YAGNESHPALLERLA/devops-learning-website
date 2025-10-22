import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    console.log('User profile request');
    
    // Get user ID from JWT token in Authorization header
    const authHeader = request.headers.get('authorization');
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header');
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    console.log('Token length:', token.length);
    
    const jwt = await import('jsonwebtoken');
    
    let decoded: { id: string; role: string; [key: string]: unknown };
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      decoded = verified as { id: string; role: string; [key: string]: unknown };
      console.log('Decoded user ID:', decoded.id);
    } catch (error) {
      console.log('JWT verification failed:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Find user in database
    const { toObjectId } = await import('@/lib/mongodb');
    const user = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    
    console.log('User found in database:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return user profile data directly
    return NextResponse.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company || {},
      phone: user.phone,
      location: user.location,
      salary: user.salary,
      experience: user.experience,
      about: user.about,
      skills: user.skills,
      education: user.education,
      projects: user.projects,
      profileViews: user.profileViews,
      applications: user.applications,
      profileScore: user.profileScore,
      resume: user.resume,
      githubId: user.githubId,
      githubUsername: user.githubUsername,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    console.error('User profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    console.log('User profile update request');
    
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

    // Get request body
    const body = await request.json();
    const { name, phone, location, about, skills, experience, salary } = body;

    // Connect to database
    const db = await connectDB();
    
    // Update user profile
    const { toObjectId } = await import('@/lib/mongodb');
    const updateData: Record<string, unknown> = {
      updatedAt: new Date()
    };

    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (location) updateData.location = location;
    if (about) updateData.about = about;
    if (skills) updateData.skills = skills;
    if (experience) updateData.experience = experience;
    if (salary) updateData.salary = salary;

    const result = await db.collection('users').updateOne(
      { _id: toObjectId(decoded.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User profile updated successfully');

    // Return updated user data
    const updatedUser = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found after update' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      company: updatedUser.company || {},
      phone: updatedUser.phone,
      location: updatedUser.location,
      salary: updatedUser.salary,
      experience: updatedUser.experience,
      about: updatedUser.about,
      skills: updatedUser.skills,
      education: updatedUser.education,
      projects: updatedUser.projects,
      profileViews: updatedUser.profileViews,
      applications: updatedUser.applications,
      profileScore: updatedUser.profileScore,
      resume: updatedUser.resume,
      githubId: updatedUser.githubId,
      githubUsername: updatedUser.githubUsername,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    });
  } catch (error) {
    console.error('User profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
