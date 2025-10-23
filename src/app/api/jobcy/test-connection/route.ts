import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('Testing database connection...');
    
    // Connect to database
    const db = await connectDB();
    
    // Test basic operations
    const collections = await db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    
    // Test users collection
    const userCount = await db.collection('users').countDocuments();
    console.log('Users in database:', userCount);
    
    // Test inserting a test document
    const testDoc = {
      test: true,
      timestamp: new Date(),
      message: 'Database connection test'
    };
    
    const result = await db.collection('test').insertOne(testDoc);
    console.log('Test document inserted:', result.insertedId);
    
    // Clean up test document
    await db.collection('test').deleteOne({ _id: result.insertedId });
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      collections: collections.map(c => c.name),
      userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection test failed:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
