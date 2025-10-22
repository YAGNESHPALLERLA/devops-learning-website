import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join('/');
  
  return NextResponse.json({ 
    message: 'Jobcy API working',
    path: path,
    method: 'GET',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const resolvedParams = await params;
  const path = resolvedParams.path.join('/');
  const body = await request.json();
  
  return NextResponse.json({ 
    message: 'Jobcy API working',
    path: path,
    method: 'POST',
    body: body,
    timestamp: new Date().toISOString()
  });
}
