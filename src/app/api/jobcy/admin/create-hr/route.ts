import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function POST(_request: NextRequest) {
  try {
    const body = await _request.json();
    const { name, email, password, company } = body;
    console.log('Create HR request:', { name, email, company });
    
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

    // Hash password using bcrypt
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new HR user
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: 'hr',
      mobile: `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`,
      company: company || { name: 'Unknown Company' },
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
    
    console.log('HR user created successfully:', result.insertedId);
    
    return NextResponse.json({
      message: 'HR user created successfully',
      hr: {
        _id: result.insertedId,
        id: result.insertedId,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        company: newUser.company,
        status: 'Active',
        createdDate: newUser.createdAt
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Create HR error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
