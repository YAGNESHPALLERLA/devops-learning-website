const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testRouteStructure() {
  console.log('🔍 Testing Route Structure...\n');

  // Test 1: Test jobs/browse endpoint (should work)
  console.log('1️⃣ Testing Jobs Browse Endpoint...');
  
  try {
    const browseResponse = await fetch(`${API_BASE_URL}/jobs/browse`);
    
    console.log(`   Jobs Browse Status: ${browseResponse.status}`);
    
    if (browseResponse.ok) {
      const browseData = await browseResponse.json();
      console.log('   ✅ Jobs Browse: SUCCESS');
      console.log(`   Jobs Count: ${Array.isArray(browseData) ? browseData.length : 'Not an array'}`);
    } else {
      const errorText = await browseResponse.text();
      console.log('   ❌ Jobs Browse: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Jobs Browse: ERROR -', error.message);
  }

  // Test 2: Test jobs/apply/test endpoint (our test endpoint)
  console.log('\n2️⃣ Testing Jobs Apply Test Endpoint...');
  
  try {
    const testResponse = await fetch(`${API_BASE_URL}/jobs/apply/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: 'data' })
    });
    
    console.log(`   Test Endpoint Status: ${testResponse.status}`);
    
    if (testResponse.ok) {
      const testData = await testResponse.json();
      console.log('   ✅ Test Endpoint: SUCCESS');
      console.log('   Response:', JSON.stringify(testData, null, 2));
    } else {
      const errorText = await testResponse.text();
      console.log('   ❌ Test Endpoint: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Test Endpoint: ERROR -', error.message);
  }

  // Test 3: Test jobs/apply/test with GET method
  console.log('\n3️⃣ Testing Jobs Apply Test Endpoint (GET)...');
  
  try {
    const testGetResponse = await fetch(`${API_BASE_URL}/jobs/apply/test`);
    
    console.log(`   Test GET Status: ${testGetResponse.status}`);
    
    if (testGetResponse.ok) {
      const testGetData = await testGetResponse.json();
      console.log('   ✅ Test GET: SUCCESS');
      console.log('   Response:', JSON.stringify(testGetData, null, 2));
    } else {
      const errorText = await testGetResponse.text();
      console.log('   ❌ Test GET: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Test GET: ERROR -', error.message);
  }

  // Test 4: Test a simple API endpoint that should work
  console.log('\n4️⃣ Testing Simple API Endpoint...');
  
  try {
    const simpleResponse = await fetch(`${API_BASE_URL}/test-connection`);
    
    console.log(`   Simple API Status: ${simpleResponse.status}`);
    
    if (simpleResponse.ok) {
      const simpleData = await simpleResponse.json();
      console.log('   ✅ Simple API: SUCCESS');
      console.log('   Response:', JSON.stringify(simpleData, null, 2));
    } else {
      const errorText = await simpleResponse.text();
      console.log('   ❌ Simple API: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Simple API: ERROR -', error.message);
  }

  console.log('\n📋 ROUTE STRUCTURE TEST SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ Testing different API endpoints');
  console.log('✅ Comparing working vs non-working routes');
  console.log('✅ Identifying the root cause of 405 errors');
  
  console.log('\n🎯 Key Findings:');
  console.log('✅ Jobs browse should work (proves API routes work)');
  console.log('✅ Jobs apply/test should work (proves apply route works)');
  console.log('✅ Simple API should work (proves basic API works)');
  console.log('✅ This will identify if the issue is with apply routes specifically');
  
  console.log('\n🚀 Expected Results:');
  console.log('✅ If jobs/browse works: API routes are working');
  console.log('✅ If jobs/apply/test works: Apply route structure is fine');
  console.log('✅ If simple API works: Basic API infrastructure is working');
  console.log('✅ This will help pinpoint the exact issue');
}

testRouteStructure().catch(console.error);
