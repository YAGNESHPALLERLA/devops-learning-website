import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Jobcy API test endpoint working',
    timestamp: new Date().toISOString()
  });
}

export async function POST(// request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ 
    message: 'Jobcy API test POST working',
    body: body,
    timestamp: new Date().toISOString()
  });
}
