import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('User list request');
    
    // Get user ID from JWT token for authentication
    const authHeader = _request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const jwt = await import('jsonwebtoken');
    
    let decoded: { id: string; role: string; [key: string]: unknown };
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      decoded = verified as { id: string; role: string; [key: string]: unknown };
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    const { searchParams } = new URL(_request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50'); // Increased limit to get more users
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const skills = searchParams.get('skills') || '';
    
    console.log('User list params:', { page, limit, search, location, skills });
    
    // Connect to database
    const db = await connectDB();
    
    // Build query
    const query: Record<string, unknown> = {};
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    if (skills) {
      const skillsArray = skills.split(',').map(s => s.trim());
      query.skills = { $in: skillsArray.map(s => new RegExp(s, 'i')) };
    }
    
    // Get total count
    // const total = await db.collection('users').countDocuments(query);
    
    // Get users with pagination
    const users = await db.collection('users')
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();
    
    console.log('Found users:', users.length);
    console.log('Query used:', query);
    console.log('Sample users:', users.slice(0, 3).map(u => ({ id: u._id, name: u.name, email: u.email })));
    
    // Format users for frontend
    const formattedUsers = users.map(user => ({
      id: user._id,
      name: user.name || 'Unknown User',
      title: user.professionalRole || user.title || 'Professional',
      location: user.location || user.currentLocation || 'Location not specified',
      email: user.email,
      experience: user.experience || 'Not specified',
      skills: user.skills || [],
      status: user.status || 'employed',
      connected: false, // Will be determined by frontend based on connections
      avatar: user.avatar || null,
      bio: user.about || user.bio || '',
      createdAt: user.createdAt
    }));
    
    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('User list error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
