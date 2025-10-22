import { NextRequest, NextResponse } from 'next/server';
import { Db } from 'mongodb';

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, params, 'GET');
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, params, 'POST');
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, params, 'PUT');
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return handleRequest(request, params, 'DELETE');
}

async function handleRequest(request: NextRequest, params: Promise<{ path: string[] }>, method: string) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    
    // Get request body for POST/PUT requests
    let body = null;
    if (method === 'POST' || method === 'PUT') {
      try {
        body = await request.json();
      } catch {
        // No body or invalid JSON
      }
    }

    console.log(`Jobcy API: ${method} /${path}`);
    console.log('Full URL:', request.url);
    console.log('Path segments:', resolvedParams.path);
    
    // Handle different API endpoints with direct database connection
    const response = await handleJobcyAPI(path, method, body, request);
    
    return NextResponse.json(response.data, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Jobcy API Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Internal server error', 
      details: errorMessage 
    }, { status: 500 });
  }
}

async function handleJobcyAPI(path: string, method: string, body: unknown, request: NextRequest) {
  try {
    // Import MongoDB connection
    const { connectDB } = await import('../../../../lib/mongodb');
    const db = await connectDB();
    
    console.log('Handling API path:', path);
    console.log('Method:', method);
    console.log('Body:', body);
    
    // Handle different API endpoints
    if (path === 'login') {
      console.log('Handling login request');
      return await handleLogin(body, db);
    } else if (path === 'register') {
      console.log('Handling register request');
      return await handleRegister(body, db);
    } else if (path === 'user/register') {
      console.log('Handling user/register request');
      return await handleRegister(body, db);
    } else if (path === 'user/me') {
      console.log('Handling user/me request');
      return await handleUserProfile(request, db);
    } else if (path === 'auth/github') {
      console.log('Handling auth/github request');
      return await handleGitHubAuth(request, db);
    } else if (path === 'jobs') {
      console.log('Handling jobs request');
      return await handleJobs(method, body, db);
    } else if (path === 'users') {
      console.log('Handling users request');
      return await handleUsers(method, body, db);
    } else if (path.startsWith('user/')) {
      // Handle other user endpoints
      const subPath = path.replace('user/', '');
      console.log('Handling user subpath:', subPath);
      if (subPath === 'me') {
        return await handleUserProfile(request, db);
      }
    } else if (path.startsWith('jobs/')) {
      // Handle job-related endpoints
      console.log('Handling jobs subpath');
      return await handleJobs(method, body, db);
    } else if (path.startsWith('auth/')) {
      // Handle auth endpoints
      console.log('Handling auth subpath');
      return await handleGitHubAuth(request, db);
    } else if (path.startsWith('admin/')) {
      // Handle admin endpoints
      console.log('Handling admin subpath');
      return await handleAdminEndpoints(path, method, body, request, db);
    }
    
    console.log('API endpoint not found:', path);
    return { status: 404, data: { error: 'API endpoint not found', path: path } };
  } catch (error) {
    console.error('Database connection error:', error);
    return { status: 500, data: { error: 'Database connection failed' } };
  }
}

// Authentication handlers
async function handleLogin(body: unknown, db: Db) {
  try {
    const { email, password } = body as { email: string; password: string };
    
    if (!email || !password) {
      return { status: 400, data: { error: 'Email and password are required' } };
    }

    // Find user in database
    const user = await db.collection('users').findOne({ email });
    
    if (!user) {
      return { status: 401, data: { error: 'Invalid credentials' } };
    }

    // Verify password (assuming it's hashed in the database)
    const bcrypt = await import('bcryptjs');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return { status: 401, data: { error: 'Invalid credentials' } };
    }

    // Generate JWT token
    const jwt = await import('jsonwebtoken');
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '30d' }
    );

    // Return the original user data from MongoDB
    return {
      status: 200,
      data: {
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
      }
    };
  } catch (error) {
    console.error('Login error:', error);
    return { status: 500, data: { error: 'Internal server error' } };
  }
}

async function handleRegister(body: unknown, db: Db) {
  try {
    const { name, email, password, role } = body as { name: string; email: string; password: string; role?: string };
    
    if (!name || !email || !password) {
      return { status: 400, data: { error: 'Name, email, and password are required' } };
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return { status: 400, data: { error: 'User already exists' } };
    }

    // Hash password properly
    const bcrypt = await import('bcryptjs');
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user with minimal data
    const newUser = {
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
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
    
    return {
      status: 201,
      data: {
        message: 'User registered successfully',
        user: {
          id: result.insertedId,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role
        }
      }
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { status: 500, data: { error: 'Internal server error' } };
  }
}

async function handleUserProfile(request: NextRequest, db: Db) {
  try {
    console.log('handleUserProfile called');
    
    // Get user ID from JWT token in Authorization header
    const authHeader = request.headers.get('authorization');
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header');
      return { status: 401, data: { error: 'No token provided' } };
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
      return { status: 401, data: { error: 'Invalid token' } };
    }

    // Find user in database
    const { toObjectId } = await import('../../../../lib/mongodb');
    const user = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    
    console.log('User found in database:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found in database');
      return { status: 404, data: { error: 'User not found' } };
    }

    // Return user profile data
    return {
      status: 200,
      data: {
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
      }
    };
  } catch (error) {
    console.error('User profile error:', error);
    return { status: 500, data: { error: 'Internal server error' } };
  }
}

async function handleGitHubAuth(_request: NextRequest, _db: Db) {
  // GitHub OAuth implementation
  return { status: 200, data: { message: 'GitHub auth endpoint' } };
}

async function handleJobs(_method: string, _body: unknown, _db: Db) {
  // Jobs API implementation
  return { status: 200, data: { message: 'Jobs endpoint' } };
}

async function handleUsers(_method: string, _body: unknown, _db: Db) {
  // Users API implementation
  return { status: 200, data: { message: 'Users endpoint' } };
}

async function handleAdminEndpoints(path: string, method: string, body: unknown, request: NextRequest, db: Db) {
  try {
    console.log('Admin endpoint:', path, method);
    
    if (path === 'admin/hrs') {
      // Get all HR users
      const hrs = await db.collection('users').find({ role: 'hr' }).toArray();
      return { status: 200, data: { hrs } };
    } else if (path === 'admin/companies') {
      // Get all companies
      const companies = await db.collection('companies').find({}).toArray();
      return { status: 200, data: { companies } };
    } else if (path === 'admin/create-hr') {
      // Create new HR user
      const { name, email, password, company } = body as { name: string; email: string; password: string; company: string };
      
      if (!name || !email || !password) {
        return { status: 400, data: { error: 'Name, email, and password are required' } };
      }

      const existingUser = await db.collection('users').findOne({ email });
      if (existingUser) {
        return { status: 400, data: { error: 'User already exists' } };
      }

      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash(password, 12);

      const newHR = {
        name,
        email,
        password: hashedPassword,
        role: 'hr',
        company: { name: company || 'Unknown Company' },
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

      const result = await db.collection('users').insertOne(newHR);
      
      return {
        status: 201,
        data: {
          message: 'HR user created successfully',
          hr: {
            id: result.insertedId,
            name: newHR.name,
            email: newHR.email,
            role: newHR.role,
            company: newHR.company
          }
        }
      };
    } else if (path.startsWith('admin/hrs/')) {
      const hrId = path.replace('admin/hrs/', '');
      
      if (method === 'DELETE') {
        // Delete HR user
        const { toObjectId } = await import('../../../../lib/mongodb');
        const result = await db.collection('users').deleteOne({ _id: toObjectId(hrId) });
        
        if (result.deletedCount === 0) {
          return { status: 404, data: { error: 'HR user not found' } };
        }
        
        return { status: 200, data: { message: 'HR user deleted successfully' } };
      }
    }
    
    return { status: 404, data: { error: 'Admin endpoint not found' } };
  } catch (error) {
    console.error('Admin endpoint error:', error);
    return { status: 500, data: { error: 'Internal server error' } };
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}