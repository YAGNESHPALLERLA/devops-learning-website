const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testWorkingJobApplication() {
  console.log('🚀 Testing Working Job Application...\n');

  // Test 1: Login as user
  console.log('1️⃣ Logging in as User...');
  
  const userEmail = `workingtest${Date.now()}@example.com`;
  const userPassword = 'WorkingTest123';
  let userToken = '';
  
  try {
    // Register user
    const registerResponse = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Working Test User ${Date.now()}`,
        email: userEmail,
        phone: '1234567890',
        password: userPassword,
        confirmPassword: userPassword,
        role: 'user',
        careerStatus: 'fresher'
      })
    });
    
    if (registerResponse.ok) {
      console.log('   User Registration: ✅ SUCCESS');
    } else {
      const errorData = await registerResponse.json();
      if (errorData.error === 'User already exists') {
        console.log('   User Registration: ⚠️ User already exists (continuing with login)');
      } else {
        console.log('   User Registration: ❌ FAILED', errorData.error);
        return;
      }
    }
    
    // Login user
    const loginResponse = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      userToken = loginData.token;
      console.log('   User Login: ✅ SUCCESS');
    } else {
      console.log('   User Login: ❌ FAILED');
      return;
    }
  } catch (error) {
    console.log('   User Registration/Login: ❌ ERROR -', error.message);
    return;
  }

  // Test 2: Test job application using the working route
  console.log('\n2️⃣ Testing Job Application with Working Route...');
  
  try {
    const applicationResponse = await fetch(`${API_BASE_URL}/jobs/apply/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        jobId: '68f93650a9ea34fe10479f88',
        coverLetter: 'Test application using working route'
      })
    });
    
    console.log(`   Application Status: ${applicationResponse.status}`);
    
    if (applicationResponse.ok) {
      const applicationData = await applicationResponse.json();
      console.log('   ✅ Job Application: SUCCESS');
      console.log('   Response:', JSON.stringify(applicationData, null, 2));
    } else {
      const errorText = await applicationResponse.text();
      console.log('   ❌ Job Application: FAILED');
      console.log(`   Error: ${errorText.substring(0, 200)}...`);
    }
  } catch (error) {
    console.log('   ❌ Job Application: ERROR -', error.message);
  }

  // Test 3: Check applied jobs
  console.log('\n3️⃣ Checking Applied Jobs...');
  
  try {
    const appliedResponse = await fetch(`${API_BASE_URL}/user/applications`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    
    if (appliedResponse.ok) {
      const appliedData = await appliedResponse.json();
      console.log('   ✅ Applied Jobs: SUCCESS');
      console.log(`   Applications Count: ${Array.isArray(appliedData) ? appliedData.length : 'Not an array'}`);
    } else {
      console.log('   ❌ Applied Jobs: FAILED');
    }
  } catch (error) {
    console.log('   ❌ Applied Jobs: ERROR -', error.message);
  }

  console.log('\n📋 WORKING JOB APPLICATION TEST SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ Testing job application using working route');
  console.log('✅ Testing with authentication');
  console.log('✅ Checking applied jobs after application');
  
  console.log('\n🎯 Key Findings:');
  console.log('✅ If this works: Job application is now functional');
  console.log('✅ If this fails: There is still an issue to resolve');
  console.log('✅ This uses the working route structure');
  
  console.log('\n🚀 Expected Results:');
  console.log('✅ Job application should work with working route');
  console.log('✅ Applied jobs should show the new application');
  console.log('✅ User dashboard should now be fully functional');
}

testWorkingJobApplication().catch(console.error);
