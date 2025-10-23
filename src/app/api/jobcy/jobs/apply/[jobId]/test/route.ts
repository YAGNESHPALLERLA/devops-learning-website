import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  // request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    console.log('Dynamic route test - jobId:', jobId);
    
    const body = await request.json();
    console.log('Request body:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Dynamic route test is working',
      jobId: jobId,
      data: body
    });
  } catch {
    console.error('Dynamic route test error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  // request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    console.log('Dynamic route GET test - jobId:', jobId);
    
    return NextResponse.json({
      message: 'Dynamic route GET test is working',
      jobId: jobId,
      timestamp: new Date().toISOString()
    });
  } catch {
    console.error('Dynamic route GET test error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
