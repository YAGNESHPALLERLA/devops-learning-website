const fetch = require('node-fetch');

async function testHRDashboard() {
  console.log('🧪 Testing HR Dashboard API...');
  
  const baseUrl = 'https://www.ohg365.com';
  
  // Test 1: HR Dashboard page accessibility
  console.log('\n1️⃣ Testing HR Dashboard page...');
  try {
    const response = await fetch(`${baseUrl}/jobcy/hr/dashboard`);
    console.log(`   HR Dashboard page: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   HR Dashboard page: ❌ ERROR - ${error.message}`);
  }

  // Test 2: HR Dashboard API endpoint
  console.log('\n2️⃣ Testing HR Dashboard API endpoint...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/hr/dashboard`);
    console.log(`   HR Dashboard API: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(`   Error: ${errorData.error || 'Unknown error'}`);
    }
  } catch (error) {
    console.log(`   HR Dashboard API: ❌ ERROR - ${error.message}`);
  }

  // Test 3: Test with mock token (should fail gracefully)
  console.log('\n3️⃣ Testing HR Dashboard API with mock token...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/hr/dashboard`, {
      headers: {
        'Authorization': 'Bearer mock-token',
        'Content-Type': 'application/json'
      }
    });
    console.log(`   HR Dashboard API (mock token): ${response.status === 401 ? '✅ SUCCESS (Expected 401)' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   HR Dashboard API (mock token): ❌ ERROR - ${error.message}`);
  }

  console.log('\n🎯 HR Dashboard Test Complete!');
  console.log('\n📋 Summary:');
  console.log('✅ HR Dashboard page should be accessible');
  console.log('✅ HR Dashboard API endpoint should exist');
  console.log('✅ API should return 401 for invalid tokens');
  console.log('🔧 HR login should now work without 404 errors');
}

testHRDashboard().catch(console.error);
