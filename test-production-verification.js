const https = require('https');

async function testProductionDeployment() {
  console.log('🧪 Testing Production Deployment...');
  
  const baseUrl = 'https://www.ohg365.com';
  
  // Test 1: Check if the main site loads
  console.log('\n1️⃣ Testing main site accessibility...');
  try {
    const response = await fetch(`${baseUrl}/`);
    if (response.ok) {
      console.log('✅ Main site: SUCCESS (Status:', response.status, ')');
    } else {
      console.log('❌ Main site: FAILED (Status:', response.status, ')');
    }
  } catch (error) {
    console.log('❌ Main site: FAILED', error.message);
  }

  // Test 2: Check Jobcy portal accessibility
  console.log('\n2️⃣ Testing Jobcy portal accessibility...');
  try {
    const response = await fetch(`${baseUrl}/jobcy`);
    if (response.ok) {
      console.log('✅ Jobcy portal: SUCCESS (Status:', response.status, ')');
    } else {
      console.log('❌ Jobcy portal: FAILED (Status:', response.status, ')');
    }
  } catch (error) {
    console.log('❌ Jobcy portal: FAILED', error.message);
  }

  // Test 3: Check API endpoint
  console.log('\n3️⃣ Testing API endpoint...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/test-connection`);
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API endpoint: SUCCESS (Status:', response.status, ')');
      console.log('   Database status:', data.status);
      if (data.userCount) {
        console.log('   Users in database:', data.userCount);
      }
    } else {
      console.log('❌ API endpoint: FAILED (Status:', response.status, ')');
    }
  } catch (error) {
    console.log('❌ API endpoint: FAILED', error.message);
  }

  // Test 4: Check dashboard accessibility
  console.log('\n4️⃣ Testing dashboard accessibility...');
  try {
    const response = await fetch(`${baseUrl}/jobcy/user/dashboard`);
    if (response.ok) {
      console.log('✅ Dashboard: SUCCESS (Status:', response.status, ')');
    } else {
      console.log('❌ Dashboard: FAILED (Status:', response.status, ')');
    }
  } catch (error) {
    console.log('❌ Dashboard: FAILED', error.message);
  }

  console.log('\n🎯 Production Deployment Verification Complete!');
  console.log('📝 If all tests show SUCCESS, your Jobcy portal is working correctly.');
  console.log('🔧 If any tests show FAILED, check Vercel deployment status and environment variables.');
}

testProductionDeployment().catch(console.error);
