import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    console.log('Company login request:', { email });
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Find company user in database
    const user = await db.collection('users').findOne({ email, role: 'company' });
    
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Verify password
    const bcrypt = await import('bcryptjs');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Generate JWT token
    const jwt = await import('jsonwebtoken');
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '30d' }
    );

    // Return user data and token
    return NextResponse.json({
      token,
      user: {
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
      }
    });
  } catch (error) {
    console.error('Company login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
