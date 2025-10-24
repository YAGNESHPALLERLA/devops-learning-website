const fetch = require('node-fetch');

async function checkSpecificUser() {
  console.log('🔍 Checking Specific User Resume...\n');

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

    // Test the specific user ID that's failing
    const failingUserId = '68e8dfd024cf96ebf48aaf05';
    console.log(`Testing resume download for user: ${failingUserId}`);
    
    const resumeResponse = await fetch(`http://localhost:3000/api/jobcy/hr/resume/${failingUserId}`, {
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
      
      if (resumeResponse.status === 403) {
        console.log('\n🔍 403 Error Analysis:');
        console.log('- This means the user either:');
        console.log('  1. Does not have a resume uploaded');
        console.log('  2. The user does not exist');
        console.log('  3. The user ID is invalid');
        console.log('  4. The user was created without resume data');
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

checkSpecificUser();
