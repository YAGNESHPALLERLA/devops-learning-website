const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testSimpleApplyRoute() {
  console.log('🚀 Testing Simple Apply Route...\n');

  // Test 1: Test GET method on simple route
  console.log('1️⃣ Testing Simple Apply Route GET...');
  
  try {
    const getResponse = await fetch(`${API_BASE_URL}/jobs/apply-job`);
    
    console.log(`   Simple Apply GET Status: ${getResponse.status}`);
    
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('   ✅ Simple Apply GET: SUCCESS');
      console.log('   Response:', JSON.stringify(getData, null, 2));
    } else {
      const errorText = await getResponse.text();
      console.log('   ❌ Simple Apply GET: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Simple Apply GET: ERROR -', error.message);
  }

  // Test 2: Test POST method on simple route
  console.log('\n2️⃣ Testing Simple Apply Route POST...');
  
  try {
    const postResponse = await fetch(`${API_BASE_URL}/jobs/apply-job`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobId: '68f93650a9ea34fe10479f88',
        coverLetter: 'Test application for simple route'
      })
    });
    
    console.log(`   Simple Apply POST Status: ${postResponse.status}`);
    
    if (postResponse.ok) {
      const postData = await postResponse.json();
      console.log('   ✅ Simple Apply POST: SUCCESS');
      console.log('   Response:', JSON.stringify(postData, null, 2));
    } else {
      const errorText = await postResponse.text();
      console.log('   ❌ Simple Apply POST: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Simple Apply POST: ERROR -', error.message);
  }

  console.log('\n📋 SIMPLE APPLY ROUTE TEST SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ Testing simple route without dynamic parameters');
  console.log('✅ Testing both GET and POST methods');
  console.log('✅ This should work if the issue is with dynamic routes');
  
  console.log('\n🎯 Key Findings:');
  console.log('✅ If this works: Dynamic routes are the problem');
  console.log('✅ If this fails: There is a broader routing issue');
  console.log('✅ This will help identify the root cause');
  
  console.log('\n🚀 Expected Results:');
  console.log('✅ Simple route should work without dynamic parameters');
  console.log('✅ This proves the API infrastructure is working');
  console.log('✅ We can then fix the dynamic route issue');
}

testSimpleApplyRoute().catch(console.error);
