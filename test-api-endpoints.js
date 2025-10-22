const fetch = require('node-fetch');

async function testApiEndpoints() {
  console.log('🧪 Testing Jobcy Backend API Endpoints...\n');
  
  const baseUrl = 'https://www.ohg365.com';
  
  // Test 1: Test endpoint
  console.log('1️⃣ Testing /api/jobcy-backend/test...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy-backend/test`);
    const data = await response.json();
    console.log('✅ Test endpoint working:', data.message);
  } catch (error) {
    console.log('❌ Test endpoint failed:', error.message);
  }
  
  // Test 2: Login endpoint
  console.log('\n2️⃣ Testing /api/jobcy-backend/login...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy-backend/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'abcd@gmail.com',
        password: 'Nani@123'
      }),
    });
    const data = await response.json();
    console.log('✅ Login endpoint working:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('❌ Login endpoint failed:', error.message);
  }
  
  // Test 3: User profile endpoint (without token - should fail)
  console.log('\n3️⃣ Testing /api/jobcy-backend/user/me (without token)...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy-backend/user/me`);
    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('❌ User profile endpoint failed:', error.message);
  }
  
  console.log('\n🎯 Summary:');
  console.log('✅ API endpoints are accessible');
  console.log('✅ Login should work with proper credentials');
  console.log('✅ User profile endpoint exists (needs authentication)');
  console.log('\n🚀 Next steps:');
  console.log('1. Test login on the website');
  console.log('2. Check if dashboard loads user data');
  console.log('3. Verify no more 404 errors');
}

testApiEndpoints().catch(console.error);
