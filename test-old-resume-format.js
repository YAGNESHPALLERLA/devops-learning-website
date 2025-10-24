const fetch = require('node-fetch');

async function testOldResumeFormat() {
  console.log('🧪 Testing Old Resume Format Handling...\n');

  try {
    // Create HR user for testing
    const hrEmail = `testhr${Date.now()}@company.com`;
    const hrResponse = await fetch('http://localhost:3000/api/jobcy/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test HR User',
        email: hrEmail,
        password: 'password123',
        role: 'HR'
      })
    });

    if (!hrResponse.ok) {
      console.log('❌ HR Registration failed:', hrResponse.status);
      return;
    }

    // Login as HR
    const loginResponse = await fetch('http://localhost:3000/api/jobcy/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: hrEmail,
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      console.log('❌ HR Login failed:', loginResponse.status);
      return;
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;

    // Test the specific user ID that has old format resume
    const oldFormatUserId = '68e8dfd024cf96ebf48aaf05';
    console.log(`Testing resume download for user with old format: ${oldFormatUserId}`);
    
    const resumeResponse = await fetch(`http://localhost:3000/api/jobcy/hr/resume/${oldFormatUserId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    console.log('Resume download status:', resumeResponse.status);
    
    if (resumeResponse.ok) {
      console.log('✅ Resume download: SUCCESS');
      const contentLength = resumeResponse.headers.get('content-length');
      const contentType = resumeResponse.headers.get('content-type');
      console.log('Content-Type:', contentType);
      console.log('Content-Length:', contentLength);
    } else {
      console.log('❌ Resume download failed:', resumeResponse.status);
      const errorText = await resumeResponse.text();
      console.log('Error details:', errorText);
      
      if (resumeResponse.status === 400) {
        console.log('\n🔍 400 Error Analysis:');
        console.log('- This means the user has an old format resume (file path)');
        console.log('- The user needs to re-upload their resume in the new format');
        console.log('- This is expected behavior for old format resumes');
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testOldResumeFormat();
