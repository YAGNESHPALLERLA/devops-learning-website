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
    console.log('Admin create company request');
    
    // Get user ID from JWT token
    const authHeader = request.headers.get('authorization');
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

    const body = await request.json();
    const { name, email, password, industry, location, website, description, size, status } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Check if company already exists
    const existingCompany = await db.collection('users').findOne({ email });
    if (existingCompany) {
      return NextResponse.json({ error: 'Company with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new company user
    const newCompany = {
      name,
      email,
      password: hashedPassword,
      role: 'company',
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

    const result = await db.collection('users').insertOne(newCompany);
    
    console.log('Company created:', result.insertedId);
    
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
    console.error('Admin create company error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
