import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    
    const backendUrl = process.env.NODE_ENV === 'development' 
      ? `http://127.0.0.1:5000/api/auth/${path}`
      : `https://jobcy-job-portal-production.up.railway.app/api/auth/${path}`;
    
    const url = new URL(backendUrl);
    // Copy all search params from the original request
    const { searchParams } = new URL(_request.url);
    searchParams.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    
    console.log('Auth GET request to:', url.toString());
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Auth GET response:', data);
    
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Auth GET proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}

export async function POST(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const body = await _request.json();
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    
    const backendUrl = process.env.NODE_ENV === 'development' 
      ? `http://127.0.0.1:5000/api/auth/${path}`
      : `https://jobcy-job-portal-production.up.railway.app/api/auth/${path}`;
    
    console.log('Auth POST request to:', backendUrl);
    console.log('Auth POST body:', body);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('Auth POST response:', data);
    
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Auth POST proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}

export async function PUT(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const body = await _request.json();
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    
    const backendUrl = process.env.NODE_ENV === 'development' 
      ? `http://127.0.0.1:5000/api/auth/${path}`
      : `https://jobcy-job-portal-production.up.railway.app/api/auth/${path}`;
    
    console.log('Auth PUT request to:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('Auth PUT response:', data);
    
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Auth PUT proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  try {
    const resolvedParams = await params;
    const path = resolvedParams.path.join('/');
    
    const backendUrl = process.env.NODE_ENV === 'development' 
      ? `http://127.0.0.1:5000/api/auth/${path}`
      : `https://jobcy-job-portal-production.up.railway.app/api/auth/${path}`;
    
    console.log('Auth DELETE request to:', backendUrl);
    
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Auth DELETE response:', data);
    
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    });
  } catch (error) {
    console.error('Auth DELETE proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
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
