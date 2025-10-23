import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    message: 'Simple jobcy route working',
    timestamp: new Date().toISOString()
  });
}

export async function POST(// request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ 
    message: 'Simple jobcy POST working',
    body: body,
    timestamp: new Date().toISOString()
  });
}
