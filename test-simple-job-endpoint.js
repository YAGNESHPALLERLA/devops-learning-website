const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testSimpleJobEndpoint() {
  console.log('🧪 Testing Simple Job Endpoint...\n');

  // Test 1: Test the simple test endpoint
  console.log('1️⃣ Testing Simple Test Endpoint...');
  
  try {
    const testResponse = await fetch(`${API_BASE_URL}/jobs/apply/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        test: 'This is a test application'
      })
    });
    
    console.log(`   Test Endpoint Status: ${testResponse.status}`);
    
    if (testResponse.ok) {
      const testData = await testResponse.json();
      console.log('   ✅ Test Endpoint: SUCCESS');
      console.log('   Response:', JSON.stringify(testData, null, 2));
    } else {
      const errorText = await testResponse.text();
      console.log('   ❌ Test Endpoint: FAILED');
      console.log(`   Error: ${errorText}`);
    }
  } catch (error) {
    console.log('   ❌ Test Endpoint: ERROR -', error.message);
  }

  // Test 2: Test GET method on test endpoint
  console.log('\n2️⃣ Testing GET Method on Test Endpoint...');
  
  try {
    const getResponse = await fetch(`${API_BASE_URL}/jobs/apply/test`);
    
    console.log(`   GET Test Endpoint Status: ${getResponse.status}`);
    
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('   ✅ GET Test Endpoint: SUCCESS');
      console.log('   Response:', JSON.stringify(getData, null, 2));
    } else {
      const errorText = await getResponse.text();
      console.log('   ❌ GET Test Endpoint: FAILED');
      console.log(`   Error: ${errorText}`);
    }
  } catch (error) {
    console.log('   ❌ GET Test Endpoint: ERROR -', error.message);
  }

  // Test 3: Test the original jobId endpoint
  console.log('\n3️⃣ Testing Original JobId Endpoint...');
  
  try {
    const originalResponse = await fetch(`${API_BASE_URL}/jobs/apply/68f93650a9ea34fe10479f88`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        coverLetter: 'Test application for original endpoint'
      })
    });
    
    console.log(`   Original Endpoint Status: ${originalResponse.status}`);
    
    if (originalResponse.ok) {
      const originalData = await originalResponse.json();
      console.log('   ✅ Original Endpoint: SUCCESS');
      console.log('   Response:', JSON.stringify(originalData, null, 2));
    } else {
      const errorText = await originalResponse.text();
      console.log('   ❌ Original Endpoint: FAILED');
      console.log(`   Error: ${errorText}`);
    }
  } catch (error) {
    console.log('   ❌ Original Endpoint: ERROR -', error.message);
  }

  console.log('\n📋 SIMPLE JOB ENDPOINT TEST SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ Testing simple endpoint for route structure');
  console.log('✅ Testing GET and POST methods');
  console.log('✅ Comparing with original jobId endpoint');
  
  console.log('\n🎯 Key Findings:');
  console.log('✅ Simple endpoint will show if route structure works');
  console.log('✅ Original endpoint will show if jobId parameter is the issue');
  console.log('✅ This will help identify the root cause of 405 errors');
  
  console.log('\n🚀 Expected Results:');
  console.log('✅ If simple endpoint works: Route structure is fine');
  console.log('✅ If original endpoint fails: JobId parameter issue');
  console.log('✅ If both fail: Deployment or routing issue');
}

testSimpleJobEndpoint().catch(console.error);
