import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log('Mock registration request:', body);
    
    // Mock registration logic
    const { name, email, password, role } = body;
    
    if (!name || !email || !password) {
      return NextResponse.json({ 
        error: 'Missing required fields',
        message: 'Name, email, and password are required'
      }, { status: 400 });
    }
    
    // Mock successful registration
    const mockResponse = {
      message: 'User registered successfully',
      user: {
        id: 'user-' + Date.now(),
        name: name,
        email: email,
        role: role || 'user',
        company: {}
      }
    };
    
    console.log('Mock registration successful:', mockResponse);
    return NextResponse.json(mockResponse, {
      status: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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
