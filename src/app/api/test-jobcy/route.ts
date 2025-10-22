import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Test if we can reach the Jobcy backend
    const response = await fetch('https://jobcy-job-portal.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword'
      }),
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      url: response.url
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to reach Jobcy backend',
      details: errorMessage 
    }, { status: 500 });
  }
}
