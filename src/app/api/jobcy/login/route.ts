import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Proxy login request:', body);
    console.log('Environment:', process.env.NODE_ENV);
    
    // For now, let's create a mock response that works
    // This will allow the frontend to work while we fix the backend
    
    const { email, password } = body;
    
    // Mock authentication logic
    if (email === 'abcd@gmail.com' && password === 'Nani@123') {
      const mockResponse = {
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '68e8dfd024cf96ebf48aaf05',
          name: 'abcd',
          email: 'abcd@gmail.com',
          role: 'user',
          company: {}
        }
      };
      
      console.log('Mock authentication successful:', mockResponse);
      return NextResponse.json(mockResponse, { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    
    if (email === 'admin@ohg365.com' && password === 'Admin@123') {
      const mockResponse = {
        token: 'mock-admin-jwt-token-' + Date.now(),
        user: {
          id: 'admin-123',
          name: 'Admin',
          email: 'admin@ohg365.com',
          role: 'admin',
          company: {}
        }
      };
      
      console.log('Mock admin authentication successful:', mockResponse);
      return NextResponse.json(mockResponse, { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    
    // Invalid credentials
    return NextResponse.json({ 
      error: 'Invalid credentials',
      message: 'Please check your email and password'
    }, { 
      status: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
    
  } catch (error) {
    console.error('Proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Authentication service unavailable', 
      message: 'Please try again later',
      details: errorMessage 
    }, { status: 503 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}