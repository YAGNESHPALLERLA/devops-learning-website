import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/mongodb';

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
    const { toObjectId } = await import('../../../../../lib/mongodb');
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
