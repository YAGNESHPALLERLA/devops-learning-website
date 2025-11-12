import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    const { email, password } = body;
    
    console.log('Login request:', { email });
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Connect to database (same database as Jobcy: jobcy-data)
    const db = await connectDB();
    
    // Find user in database - check both collections for compatibility
    // First check 'users' collection (Jobcy users)
    let user = await db.collection('users').findOne({ email: email.toLowerCase() });
    let userSource = 'users'; // Track which collection the user came from
    
    // If not found in 'users' collection, check 'website-users' collection (separate collection for website users)
    // Both collections are in the same database, allowing shared credentials
    if (!user) {
      user = await db.collection('website-users').findOne({ email: email.toLowerCase() });
      userSource = 'website-users';
    }
    
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
    // CRITICAL: For website users (source: 'website'), ALWAYS use role 'user' regardless of what's stored
    // This ensures tutorial/website registrations are never treated as HR users
    let userRole = user.role || 'user';
    if (user.source === 'website' || userSource === 'website-users') {
      // Force role to 'user' for website registrations - they should NEVER be HR
      userRole = 'user';
      console.log('Website user login - forcing role to "user" (was:', user.role, ')');
    }
    const token = jwt.sign(
      { id: user._id, role: userRole },
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
        role: userRole,
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
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
