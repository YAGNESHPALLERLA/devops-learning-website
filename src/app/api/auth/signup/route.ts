import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    const { name, email, password } = body;
    
    console.log('Website signup request:', { name, email });
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    // Connect to database (same database as Jobcy: jobcy-data)
    const db = await connectDB();
    
    // Check if user already exists in either collection
    // We check both 'website-users' (separate collection) and 'users' (Jobcy collection)
    const existingWebsiteUser = await db.collection('website-users').findOne({ email: email.toLowerCase() });
    const existingJobcyUser = await db.collection('users').findOne({ email: email.toLowerCase() });
    
    if (existingWebsiteUser || existingJobcyUser) {
      return NextResponse.json({ error: 'User already exists with this email' }, { status: 400 });
    }

    // Hash password using bcrypt
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user in website-users collection (separate collection in same database)
    // This is the primary storage location for website user credentials
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: 'user', // Default role
      source: 'website', // Mark as website user
      phone: '',
      location: '',
      experience: '',
      about: '',
      skills: [],
      education: [],
      profileViews: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Store in separate 'website-users' collection in the same database (jobcy-data)
    const result = await db.collection('website-users').insertOne(newUser);
    
    console.log('Website user created successfully in website-users collection:', result.insertedId);
    
    // Also create a corresponding entry in the 'users' collection for Jobcy compatibility
    // This allows the same credentials to work for both main website and Jobcy portal
    // Use a unique mobile number to avoid duplicate key errors (mobile field has unique index)
    const uniqueMobile = `web_${result.insertedId.toString()}_${Date.now()}`;
    const jobcyUser = {
      ...newUser,
      source: 'website', // Track origin
      mobile: uniqueMobile, // Use unique mobile to avoid duplicate key error
      company: {},
      companyEmail: '',
      salary: '',
      projects: [],
      applications: 0,
      profileScore: 0,
      resume: null,
      githubId: '',
      githubUsername: '',
    };
    
    // Store in 'users' collection for Jobcy portal compatibility
    try {
      await db.collection('users').insertOne(jobcyUser);
      console.log('Jobcy-compatible user created successfully in users collection');
    } catch (error: unknown) {
      // If duplicate key error, user might already exist - log but don't fail
      if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
        console.log('User already exists in users collection (duplicate key) - continuing...');
      } else {
        // Re-throw if it's a different error
        throw error;
      }
    }
    
    return NextResponse.json({
      message: 'User registered successfully',
      user: {
        id: result.insertedId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Website signup error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

