import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(_request: NextRequest) {
  try {
    console.log('User profile request');
    
    // Get user ID from JWT token in Authorization header
    const authHeader = _request.headers.get('authorization');
    console.log('Auth header:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No valid authorization header');
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    console.log('Token length:', token.length);
    
    const jwt = await import('jsonwebtoken');
    
    let decoded: { id: string; role: string; [key: string]: unknown };
    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
      decoded = verified as { id: string; role: string; [key: string]: unknown };
      console.log('Decoded user ID:', decoded.id);
    } catch (error) {
      console.log('JWT verification failed:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Connect to database
    const db = await connectDB();
    
    // Find user in database
    const { toObjectId } = await import('@/lib/mongodb');
    const user = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    
    console.log('User found in database:', user ? 'Yes' : 'No');
    
    if (!user) {
      console.log('User not found in database');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return user profile data with proper structure
    return NextResponse.json({
      id: user._id,
      _id: user._id,
      name: user.name || "",
      email: user.email,
      role: user.role,
      mobile: user.phone || user.mobile,
      phone: user.phone || user.mobile,
      currentLocation: user.location || user.currentLocation,
      location: user.location || user.currentLocation,
      professionalRole: user.professionalRole || user.title,
      title: user.title || user.professionalRole,
      experience: user.experience,
      currentCTC: user.salary || user.currentCTC,
      salary: user.salary || user.currentCTC,
      bio: user.about || user.bio,
      about: user.about || user.bio,
      skills: user.skills || [],
      education: user.education || [],
      projects: user.projects || [],
      languages: user.languages || [],
      experienceList: user.experienceList || [],
      profileCompletion: user.profileCompletion || 0,
      connections: user.connections || 0,
      personalDetails: user.personalDetails || [],
      // Extract personal details as individual fields for easier access
      dob: user.dob || user.personalDetails?.[0]?.dob,
      gender: user.gender || user.personalDetails?.[0]?.gender,
      category: user.category || user.personalDetails?.[0]?.category,
      maritalStatus: user.maritalStatus || user.personalDetails?.[0]?.maritalStatus,
      nationality: user.nationality || user.personalDetails?.[0]?.nationality,
      resume: user.resume || {},
      githubId: user.githubId,
      githubUsername: user.githubUsername,
      profileViews: user.profileViews || 0,
      applications: user.applications || [],
      profileScore: user.profileScore || 0,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    console.error('User profile error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(_request: NextRequest) {
  try {
    console.log('User profile update request');
    
    // Get user ID from JWT token
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
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get request body
    const body = await _request.json();
    const { 
      name, 
      mobile, 
      phone, 
      currentLocation, 
      location, 
      professionalRole, 
      title, 
      bio, 
      about, 
      skills, 
      experience, 
      currentCTC, 
      salary,
      education,
      projects,
      languages,
      experienceList,
      personalDetails,
      // Individual personal detail fields
      dob,
      gender,
      category,
      maritalStatus,
      nationality
    } = body;

    // Connect to database
    const db = await connectDB();
    
    // Update user profile
    const { toObjectId } = await import('@/lib/mongodb');
    const updateData: Record<string, unknown> = {
      updatedAt: new Date()
    };

    if (name) updateData.name = name;
    if (mobile || phone) updateData.phone = mobile || phone;
    if (currentLocation || location) updateData.location = currentLocation || location;
    if (professionalRole || title) updateData.professionalRole = professionalRole || title;
    if (bio || about) updateData.about = bio || about;
    if (skills) updateData.skills = skills;
    if (experience) updateData.experience = experience;
    if (currentCTC || salary) updateData.salary = currentCTC || salary;
    if (education) updateData.education = education;
    if (projects) updateData.projects = projects;
    if (languages) updateData.languages = languages;
    if (experienceList) updateData.experienceList = experienceList;
    if (personalDetails) updateData.personalDetails = personalDetails;
    
    // Handle individual personal detail fields
    if (dob) updateData.dob = dob;
    if (gender) updateData.gender = gender;
    if (category) updateData.category = category;
    if (maritalStatus) updateData.maritalStatus = maritalStatus;
    if (nationality) updateData.nationality = nationality;

    // Maintain a normalized personalDetails[0] object for backward compatibility
    const hasPersonalFields = Boolean(dob || gender || category || maritalStatus || nationality);
    if (hasPersonalFields) {
      updateData.personalDetails = [
        {
          dob: dob,
          gender: gender,
          category: category,
          maritalStatus: maritalStatus,
          nationality: nationality,
        },
      ];
    }

    const result = await db.collection('users').updateOne(
      { _id: toObjectId(decoded.id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('User profile updated successfully');

    // Return updated user data
    const updatedUser = await db.collection('users').findOne({ _id: toObjectId(decoded.id) });
    
    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found after update' }, { status: 404 });
    }
    
    return NextResponse.json({
      id: updatedUser._id,
      _id: updatedUser._id,
      name: updatedUser.name || "",
      email: updatedUser.email,
      role: updatedUser.role,
      mobile: updatedUser.phone || updatedUser.mobile,
      phone: updatedUser.phone || updatedUser.mobile,
      currentLocation: updatedUser.location || updatedUser.currentLocation,
      location: updatedUser.location || updatedUser.currentLocation,
      professionalRole: updatedUser.professionalRole || updatedUser.title,
      title: updatedUser.title || updatedUser.professionalRole,
      experience: updatedUser.experience,
      currentCTC: updatedUser.salary || updatedUser.currentCTC,
      salary: updatedUser.salary || updatedUser.currentCTC,
      bio: updatedUser.about || updatedUser.bio,
      about: updatedUser.about || updatedUser.bio,
      skills: updatedUser.skills || [],
      education: updatedUser.education || [],
      projects: updatedUser.projects || [],
      languages: updatedUser.languages || [],
      experienceList: updatedUser.experienceList || [],
      profileCompletion: updatedUser.profileCompletion || 0,
      connections: updatedUser.connections || 0,
      personalDetails: updatedUser.personalDetails || [],
      // Include individual personal detail fields
      dob: updatedUser.dob || updatedUser.personalDetails?.[0]?.dob,
      gender: updatedUser.gender || updatedUser.personalDetails?.[0]?.gender,
      category: updatedUser.category || updatedUser.personalDetails?.[0]?.category,
      maritalStatus: updatedUser.maritalStatus || updatedUser.personalDetails?.[0]?.maritalStatus,
      nationality: updatedUser.nationality || updatedUser.personalDetails?.[0]?.nationality,
      resume: updatedUser.resume || {},
      githubId: updatedUser.githubId,
      githubUsername: updatedUser.githubUsername,
      profileViews: updatedUser.profileViews || 0,
      applications: updatedUser.applications || [],
      profileScore: updatedUser.profileScore || 0,
      createdAt: updatedUser.createdAt,
      updatedAt: updatedUser.updatedAt
    });
  } catch (error) {
    console.error('User profile update error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
