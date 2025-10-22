import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;
    
    console.log('Registration request:', { name, email, role });
    
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Hash password - using simple hash for now
    const hashedPassword = Buffer.from(password).toString('base64');

    // Create new user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
      mobile: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`, // Generate unique mobile number
      company: {},
      phone: '',
      location: '',
      salary: '',
      experience: '',
      about: '',
      skills: [],
      education: [],
      projects: [],
      profileViews: 0,
      applications: 0,
      profileScore: 0,
      resume: '',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await db.collection('users').insertOne(newUser);
    
    console.log('User created successfully:', result.insertedId);
    
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
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
