import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(// __request: NextRequest) {
  try {
    console.log('Users request');
    
    // Connect to database
    const db = await connectDB();
    
    // Get all users from database
    const users = await db.collection('users').find({}).toArray();
    
    console.log('Found users:', users.length);
    
    // Remove sensitive data
    const safeUsers = users.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company,
      phone: user.phone,
      location: user.location,
      experience: user.experience,
      about: user.about,
      skills: user.skills,
      education: user.education,
      projects: user.projects,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    }));
    
    return NextResponse.json({ users: safeUsers });
  } catch {
    console.error('Users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
