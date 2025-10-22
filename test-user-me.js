const fetch = require('node-fetch');

async function testUserMeEndpoint() {
  console.log('🧪 Testing /api/jobcy-backend/user/me endpoint...\n');
  
  const baseUrl = 'https://www.ohg365.com';
  
  try {
    // Test without token first
    console.log('1️⃣ Testing without token (should return 401)...');
    const response1 = await fetch(`${baseUrl}/api/jobcy-backend/user/me`);
    console.log('Status:', response1.status);
    const data1 = await response1.text();
    console.log('Response:', data1.substring(0, 200));
    
    // Test with a mock token
    console.log('\n2️⃣ Testing with mock token...');
    const response2 = await fetch(`${baseUrl}/api/jobcy-backend/user/me`, {
      headers: {
        'Authorization': 'Bearer mock-token-123'
      }
    });
    console.log('Status:', response2.status);
    const data2 = await response2.text();
    console.log('Response:', data2.substring(0, 200));
    
    // Test the test endpoint
    console.log('\n3️⃣ Testing /api/jobcy-backend/test...');
    const response3 = await fetch(`${baseUrl}/api/jobcy-backend/test`);
    console.log('Status:', response3.status);
    const data3 = await response3.text();
    console.log('Response:', data3.substring(0, 200));
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testUserMeEndpoint();
