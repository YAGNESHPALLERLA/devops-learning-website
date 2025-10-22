// Test Backend Connection
const https = require('https');
const http = require('http');

async function testBackendConnection() {
  console.log('🔍 Testing Jobcy Backend Connection...\n');
  
  // Test local backend first
  console.log('1️⃣ Testing local backend (localhost:5000)...');
  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpassword'
      }),
    });
    
    console.log('✅ Local backend is reachable');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.text();
    console.log('Response:', data.substring(0, 200) + '...');
    
  } catch (error) {
    console.log('❌ Local backend is not reachable');
    console.log('Error:', error.message);
    console.log('💡 Make sure to run: ./start-jobcy-backend.sh');
  }
  
  console.log('\n2️⃣ Testing Vercel backend (fallback)...');
  try {
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
    
    console.log('✅ Vercel backend is reachable');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.text();
    console.log('Response:', data.substring(0, 200) + '...');
    
  } catch (error) {
    console.log('❌ Vercel backend is not reachable');
    console.log('Error:', error.message);
  }
  
  console.log('\n📋 Summary:');
  console.log('- If local backend works: Use local backend');
  console.log('- If Vercel backend works: Update proxy to use Vercel');
  console.log('- If both fail: Check database connection');
}

testBackendConnection();
