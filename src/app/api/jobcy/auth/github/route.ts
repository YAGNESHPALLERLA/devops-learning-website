import { NextRequest, NextResponse } from 'next/server';

export async function GET(// __request: NextRequest) {
  try {
    const { searchParams } = new URL(_request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    // Forward the request to the Jobcy backend
    const backendUrl = process.env.NODE_ENV === 'development' 
      ? 'http://127.0.0.1:5000/api/auth/github'
      : 'https://jobcy-job-portal-production.up.railway.app/api/auth/github';
    
    const url = new URL(backendUrl);
    if (code) url.searchParams.set('code', code);
    if (state) url.searchParams.set('state', state);
    
    console.log('GitHub auth request to:', url.toString());
    
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const data = await response.json();
    console.log('GitHub auth response:', data);
    
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch {
    console.error('GitHub auth proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}

export async function POST(// __request: NextRequest) {
  try {
    const body = await _request.json();
    
    // Forward the request to the Jobcy backend
    const backendUrl = process.env.NODE_ENV === 'development' 
      ? 'http://127.0.0.1:5000/api/auth/github'
      : 'https://jobcy-job-portal-production.up.railway.app/api/auth/github';
    
    console.log('GitHub auth POST request:', body);
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('GitHub auth POST response:', data);
    
    return NextResponse.json(data, { 
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  } catch {
    console.error('GitHub auth POST proxy error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
