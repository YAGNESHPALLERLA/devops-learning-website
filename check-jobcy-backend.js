// Check Jobcy Backend Status
const https = require('https');

async function checkJobcyBackend() {
  console.log('🔍 Checking Jobcy Backend Status...\n');
  
  try {
    // Test the main API endpoint
    const response = await fetch('https://jobcy-job-portal.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword'
      }),
    });
    
    console.log('✅ Backend is reachable');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.text();
    console.log('Response:', data.substring(0, 200) + '...');
    
  } catch (error) {
    console.log('❌ Backend is not reachable');
    console.log('Error:', error.message);
  }
  
  console.log('\n🔍 Testing Registration Endpoint...');
  
  try {
    const response = await fetch('https://jobcy-job-portal.vercel.app/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'testpassword',
        role: 'user'
      }),
    });
    
    console.log('✅ Registration endpoint is reachable');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.text();
    console.log('Response:', data.substring(0, 200) + '...');
    
  } catch (error) {
    console.log('❌ Registration endpoint failed');
    console.log('Error:', error.message);
  }
}

checkJobcyBackend();
