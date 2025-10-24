import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    console.log('HR resume download request for user:', userId);
    
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
      console.log('✅ JWT token verified successfully. User ID:', decoded.id, 'Role:', decoded.role);
    } catch (error) {
      console.log('❌ JWT token verification failed:', error);
      return NextResponse.json({ 
        error: 'Invalid token',
        details: 'Token verification failed. Please login again.'
      }, { status: 401 });
    }

    // Check if user is HR
    if (decoded.role !== 'HR') {
      console.log('❌ HR access denied. User role:', decoded.role, 'Expected: HR');
      return NextResponse.json({ 
        error: 'Unauthorized - HR access required',
        details: `User role is '${decoded.role}', but 'HR' is required`
      }, { status: 403 });
    }
    
    console.log('✅ HR authentication successful. User ID:', decoded.id, 'Role:', decoded.role);

    // Connect to database
    const db = await connectDB();
    
    // Get the user whose resume we want to download
    const { toObjectId } = await import('@/lib/mongodb');
    let user;
    
    try {
      const userObjectId = toObjectId(userId);
      user = await db.collection('users').findOne({ _id: userObjectId });
    } catch (error) {
      console.log('Error converting userId to ObjectId, trying string format:', userId);
      // Try with string ID as fallback
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        user = await db.collection('users').findOne({ _id: userId as any });
      } catch (stringError) {
        console.log('Error finding user with string ID:', userId);
        user = null;
      }
    }
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log('Found user:', user.name, 'Resume data:', user.resume);
    
    // Check if user has a resume
    if (!user.resume) {
      return NextResponse.json({ error: 'No resume found for this user' }, { status: 404 });
    }
    
    // Handle different resume storage formats
    let buffer;
    let resumeName = user.resume.name || 'resume.pdf';
    let resumeType = user.resume.type || 'application/pdf';
    
    console.log('Resume details:', {
      name: resumeName,
      type: resumeType,
      data: user.resume.data ? 'has data' : 'no data',
      path: user.resume.path || 'no path',
      resumeType: typeof user.resume,
      resumeValue: user.resume
    });
    
    // Check if resume is stored as a string (file path)
    if (typeof user.resume === 'string' && user.resume.includes('/')) {
      // Old format: resume stored as file path string
      console.log('Using file path string format:', user.resume);
      
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        // Construct the full file path
        const filePath = path.join(process.cwd(), user.resume);
        console.log('Reading file from:', filePath);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
          console.log('File not found at:', filePath);
          return NextResponse.json({ 
            error: 'Resume file not found on server',
            details: 'The resume file was uploaded but is no longer available on the server.'
          }, { status: 404 });
        }
        
        // Read the file
        const fileBuffer = fs.readFileSync(filePath);
        buffer = fileBuffer;
        
        // Extract filename from path
        resumeName = path.basename(filePath);
        
        // Determine content type based on file extension
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.pdf') {
          resumeType = 'application/pdf';
        } else if (ext === '.doc') {
          resumeType = 'application/msword';
        } else if (ext === '.docx') {
          resumeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        } else {
          resumeType = 'application/octet-stream';
        }
        
        console.log('File read successfully:', {
          name: resumeName,
          type: resumeType,
          size: fileBuffer.length
        });
        
      } catch (error) {
        console.error('Error reading resume file:', error);
        return NextResponse.json({ 
          error: 'Failed to read resume file',
          details: 'There was an error reading the resume file from the server.'
        }, { status: 500 });
      }
    } else if (user.resume.data) {
      // New format: base64 data
      console.log('Using base64 data format');
      const resumeData = user.resume.data;
      
      try {
        if (typeof resumeData === 'string') {
          // Remove data URL prefix if present
          const base64Data = resumeData.includes(',') ? resumeData.split(',')[1] : resumeData;
          buffer = Buffer.from(base64Data, 'base64');
        } else {
          buffer = Buffer.from(resumeData);
        }
      } catch (error) {
        console.error('Error converting base64 resume data:', error);
        return NextResponse.json({ error: 'Invalid resume data format' }, { status: 400 });
      }
    } else if (user.resume.path) {
      // Old format: file path - read from filesystem
      console.log('Using file path format:', user.resume.path);
      
      try {
        const fs = await import('fs');
        const path = await import('path');
        
        // Construct the full file path
        const filePath = path.join(process.cwd(), user.resume.path);
        console.log('Reading file from:', filePath);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
          console.log('File not found at:', filePath);
          return NextResponse.json({ 
            error: 'Resume file not found on server',
            details: 'The resume file was uploaded but is no longer available on the server.'
          }, { status: 404 });
        }
        
        // Read the file
        const fileBuffer = fs.readFileSync(filePath);
        buffer = fileBuffer;
        
        // Extract filename from path
        resumeName = path.basename(filePath);
        
        // Determine content type based on file extension
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.pdf') {
          resumeType = 'application/pdf';
        } else if (ext === '.doc') {
          resumeType = 'application/msword';
        } else if (ext === '.docx') {
          resumeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        } else {
          resumeType = 'application/octet-stream';
        }
        
        console.log('File read successfully:', {
          name: resumeName,
          type: resumeType,
          size: fileBuffer.length
        });
        
      } catch (error) {
        console.error('Error reading resume file:', error);
        return NextResponse.json({ 
          error: 'Failed to read resume file',
          details: 'There was an error reading the resume file from the server.'
        }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: 'No resume data found for this user' }, { status: 404 });
    }
    
    // Return the resume file
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': resumeType,
        'Content-Disposition': `attachment; filename="${resumeName}"`,
        'Content-Length': buffer.length.toString(),
      },
    });
    
  } catch (error) {
    console.error('HR resume download error:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
