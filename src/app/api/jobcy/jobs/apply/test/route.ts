import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('Test job application endpoint called');
    
    const body = await request.json();
    console.log('Request body:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Test job application endpoint is working',
      data: body
    });
  } catch (error) {
    console.error('Test job application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Test job application endpoint - GET method working',
    timestamp: new Date().toISOString()
  });
}
