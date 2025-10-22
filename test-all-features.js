const fetch = require('node-fetch');

async function testAllFeatures() {
  console.log('🧪 Testing All Jobcy Portal Features...');
  
  const baseUrl = 'https://www.ohg365.com';
  
  // Test 1: Main site accessibility
  console.log('\n1️⃣ Testing main site accessibility...');
  try {
    const response = await fetch(`${baseUrl}/`);
    console.log(`   Main site: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   Main site: ❌ ERROR - ${error.message}`);
  }

  // Test 2: Jobcy portal accessibility
  console.log('\n2️⃣ Testing Jobcy portal accessibility...');
  try {
    const response = await fetch(`${baseUrl}/jobcy`);
    console.log(`   Jobcy portal: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   Jobcy portal: ❌ ERROR - ${error.message}`);
  }

  // Test 3: User registration
  console.log('\n3️⃣ Testing user registration...');
  const testUserEmail = `testuser-${Date.now()}@example.com`;
  const testUserPassword = 'TestPassword123';
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: testUserEmail,
        phone: '1234567890',
        password: testUserPassword,
        confirmPassword: testUserPassword,
        role: 'user',
        careerStatus: 'fresher'
      }),
    });
    const data = await response.json();
    console.log(`   User registration: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
    if (!response.ok) {
      console.log(`   Error: ${data.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.log(`   User registration: ❌ ERROR - ${error.message}`);
  }

  // Test 4: User login
  console.log('\n4️⃣ Testing user login...');
  let userToken = '';
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testUserEmail, password: testUserPassword }),
    });
    const data = await response.json();
    if (response.ok && data.token) {
      userToken = data.token;
      console.log(`   User login: ✅ SUCCESS (Token received)`);
    } else {
      console.log(`   User login: ❌ FAILED (Status: ${response.status})`);
      console.log(`   Error: ${data.error || 'No token received'}`);
    }
  } catch (error) {
    console.log(`   User login: ❌ ERROR - ${error.message}`);
  }

  // Test 5: Dashboard accessibility (if logged in)
  if (userToken) {
    console.log('\n5️⃣ Testing dashboard accessibility...');
    try {
      const response = await fetch(`${baseUrl}/jobcy/user/dashboard`);
      console.log(`   Dashboard: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
    } catch (error) {
      console.log(`   Dashboard: ❌ ERROR - ${error.message}`);
    }
  }

  // Test 6: Jobs API
  console.log('\n6️⃣ Testing Jobs API...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/jobs/browse`);
    const data = await response.json();
    console.log(`   Jobs API: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
    console.log(`   Jobs count: ${Array.isArray(data) ? data.length : 'Not an array'}`);
  } catch (error) {
    console.log(`   Jobs API: ❌ ERROR - ${error.message}`);
  }

  // Test 7: Users API
  console.log('\n7️⃣ Testing Users API...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/list`);
    const data = await response.json();
    console.log(`   Users API: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
    console.log(`   Users count: ${Array.isArray(data) ? data.length : 'Not an array'}`);
  } catch (error) {
    console.log(`   Users API: ❌ ERROR - ${error.message}`);
  }

  // Test 8: Database connection
  console.log('\n8️⃣ Testing database connection...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/test-connection`);
    const data = await response.json();
    console.log(`   Database: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
    if (response.ok) {
      console.log(`   Collections: ${data.collections || 'Unknown'}`);
      console.log(`   Users in DB: ${data.userCount || 'Unknown'}`);
    }
  } catch (error) {
    console.log(`   Database: ❌ ERROR - ${error.message}`);
  }

  // Test 9: Admin login (if credentials available)
  console.log('\n9️⃣ Testing admin login...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email: 'admin@ohg365.com', 
        password: 'Admin@123' 
      }),
    });
    const data = await response.json();
    if (response.ok && data.token) {
      console.log(`   Admin login: ✅ SUCCESS (Token received)`);
      
      // Test admin dashboard
      console.log('\n🔟 Testing admin dashboard...');
      try {
        const adminResponse = await fetch(`${baseUrl}/jobcy/admin/dashboard`);
        console.log(`   Admin dashboard: ${adminResponse.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${adminResponse.status})`);
      } catch (error) {
        console.log(`   Admin dashboard: ❌ ERROR - ${error.message}`);
      }
    } else {
      console.log(`   Admin login: ❌ FAILED (Status: ${response.status})`);
      console.log(`   Error: ${data.error || 'Admin credentials not working'}`);
    }
  } catch (error) {
    console.log(`   Admin login: ❌ ERROR - ${error.message}`);
  }

  console.log('\n🎯 All Features Test Complete!');
  console.log('\n📋 Summary:');
  console.log('✅ If all tests show SUCCESS, your Jobcy portal is working correctly');
  console.log('❌ If any tests show FAILED, check the specific error messages');
  console.log('🔧 Socket.IO errors are expected (disabled for now)');
  console.log('📝 Dashboard should load without "Application error" messages');
}

testAllFeatures().catch(console.error);
