import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function GET(_request: NextRequest) {
  try {
    console.log('Admin companies request');
    
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
    
    // Get all company users (check for both 'company' and 'Company' roles)
    const companies = await db.collection('users').find({ 
      $or: [
        { role: 'company' },
        { role: 'Company' }
      ]
    }).toArray();
    
    console.log('Found companies:', companies.length);
    
    // Also check what roles exist in the database for debugging
    const allRoles = await db.collection('users').distinct('role');
    console.log('All roles in database:', allRoles);
    
    return NextResponse.json(companies);
  } catch (error) {
    console.error('Admin companies error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Admin create company request');
    
    // Get user ID from JWT token
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ No token provided');
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const jwt = await import('jsonwebtoken');
    
    try {
      jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      console.log('✅ JWT token verified');
    } catch (error) {
      console.log('❌ JWT verification failed:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    console.log('📄 Request body received:', body);
    const { name, email, password, industry, location, website, description, size, status } = body;

    // Validate required fields
    if (!name || !email || !password) {
      console.log('❌ Missing required fields:', { name: !!name, email: !!email, password: !!password });
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    console.log('✅ Required fields validated');

    // Connect to database
    console.log('🔗 Connecting to database...');
    const db = await connectDB();
    console.log('✅ Database connected');
    
    // Test database connection
    try {
      const testResult = await db.collection('users').countDocuments();
      console.log('✅ Database test successful, total users:', testResult);
    } catch (dbError) {
      console.error('❌ Database test failed:', dbError);
      throw dbError;
    }
    
    // Check if company already exists
    console.log('🔍 Checking if company already exists...');
    const existingCompany = await db.collection('users').findOne({ email });
    if (existingCompany) {
      console.log('❌ Company already exists:', email);
      return NextResponse.json({ error: 'Company with this email already exists' }, { status: 400 });
    }
    console.log('✅ Company email is unique');

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('✅ Password hashed');

    // Create new company user
    console.log('📝 Creating new company object...');
    const newCompany = {
      name,
      email,
      password: hashedPassword,
      role: 'company',
      mobile: `company_${Date.now()}`, // Generate unique mobile to avoid duplicate key error
      industry: industry || '',
      location: location || '',
      website: website || '',
      description: description || '',
      size: size || '',
      status: status || 'Active',
      registeredBy: {
        name: 'Admin',
        email: 'admin@system.com'
      },
      createdAt: new Date(),
      updatedAt: new Date()
    };

    console.log('📄 New company object:', { ...newCompany, password: '[HIDDEN]' });

    console.log('💾 Inserting company into database...');
    const result = await db.collection('users').insertOne(newCompany);
    
    console.log('✅ Company created successfully:', result.insertedId);
    
    return NextResponse.json({ 
      message: 'Company registered successfully',
      company: {
        _id: result.insertedId,
        name,
        email,
        role: 'company',
        industry,
        location,
        website,
        description,
        size,
        status
      }
    });
  } catch (error) {
    console.error('❌ Admin create company error:', error);
    console.error('❌ Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
