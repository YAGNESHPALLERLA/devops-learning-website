import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('User list request');
    
    const { searchParams } = new URL(_request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const location = searchParams.get('location') || '';
    const skills = searchParams.get('skills') || '';
    
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
