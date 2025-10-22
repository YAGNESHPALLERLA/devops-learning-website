const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testDynamicRouteDebug() {
  console.log('🔍 Testing Dynamic Route with Debug...\n');

  const testJobId = '68f93650a9ea34fe10479f88';

  // Test 1: Test GET method on dynamic route
  console.log('1️⃣ Testing Dynamic Route GET...');
  
  try {
    const getResponse = await fetch(`${API_BASE_URL}/jobs/apply/${testJobId}`);
    
    console.log(`   Dynamic Route GET Status: ${getResponse.status}`);
    
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('   ✅ Dynamic Route GET: SUCCESS');
      console.log('   Response:', JSON.stringify(getData, null, 2));
    } else {
      const errorText = await getResponse.text();
      console.log('   ❌ Dynamic Route GET: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Dynamic Route GET: ERROR -', error.message);
  }

  // Test 2: Test POST method on dynamic route
  console.log('\n2️⃣ Testing Dynamic Route POST...');
  
  try {
    const postResponse = await fetch(`${API_BASE_URL}/jobs/apply/${testJobId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coverLetter: 'Test application for dynamic route debugging'
      })
    });
    
    console.log(`   Dynamic Route POST Status: ${postResponse.status}`);
    
    if (postResponse.ok) {
      const postData = await postResponse.json();
      console.log('   ✅ Dynamic Route POST: SUCCESS');
      console.log('   Response:', JSON.stringify(postData, null, 2));
    } else {
      const errorText = await postResponse.text();
      console.log('   ❌ Dynamic Route POST: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Dynamic Route POST: ERROR -', error.message);
  }

  // Test 3: Test with a different job ID format
  console.log('\n3️⃣ Testing with Different Job ID Format...');
  
  const testJobId2 = '507f1f77bcf86cd799439011'; // Different format
  
  try {
    const altResponse = await fetch(`${API_BASE_URL}/jobs/apply/${testJobId2}`, {
      method: 'GET'
    });
    
    console.log(`   Alternative Job ID Status: ${altResponse.status}`);
    
    if (altResponse.ok) {
      const altData = await altResponse.json();
      console.log('   ✅ Alternative Job ID: SUCCESS');
      console.log('   Response:', JSON.stringify(altData, null, 2));
    } else {
      const errorText = await altResponse.text();
      console.log('   ❌ Alternative Job ID: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Alternative Job ID: ERROR -', error.message);
  }

  console.log('\n📋 DYNAMIC ROUTE DEBUG TEST SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ Testing dynamic route with debugging');
  console.log('✅ Testing both GET and POST methods');
  console.log('✅ Testing different job ID formats');
  
  console.log('\n🎯 Key Findings:');
  console.log('✅ If GET works: Route is recognized, issue is with POST');
  console.log('✅ If POST works: Route is working, issue was temporary');
  console.log('✅ If both fail: Route structure issue or deployment problem');
  
  console.log('\n🚀 Expected Results:');
  console.log('✅ Debug logs should appear in Vercel logs');
  console.log('✅ This will help identify the exact issue');
  console.log('✅ We can see if the route is being hit at all');
}

testDynamicRouteDebug().catch(console.error);
