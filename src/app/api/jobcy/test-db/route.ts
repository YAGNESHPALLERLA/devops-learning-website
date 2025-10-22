import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../../../lib/mongodb';

export async function GET() {
  try {
    console.log('Testing database connection...');
    
    // Connect to database
    const db = await connectDB();
    console.log('Database connected successfully');
    
    // Test a simple query
    const userCount = await db.collection('users').countDocuments();
    console.log('User count:', userCount);
    
    return NextResponse.json({ 
      message: 'Database connection successful',
      userCount: userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json({ 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
