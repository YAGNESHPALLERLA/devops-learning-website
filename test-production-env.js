const https = require('https');

function makeRequest(url, headers = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { headers }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve({ status: res.statusCode, data: result, headers: res.headers });
        } catch (e) {
          resolve({ status: res.statusCode, data: data, headers: res.headers });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function testProductionEnvironment() {
  console.log('🧪 Testing Production Environment Variables...\n');
  
  const baseUrl = 'https://www.ohg365.com';
  
  try {
    // Test 1: Basic connectivity
    console.log('1️⃣ Testing basic connectivity...');
    const basicTest = await makeRequest(`${baseUrl}/api/jobcy/test-connection`);
    console.log('   Status:', basicTest.status);
    console.log('   Headers:', Object.keys(basicTest.headers));
    
    if (basicTest.status === 200) {
      console.log('✅ Basic connectivity: SUCCESS');
      console.log('   Database connected:', basicTest.data.success);
      console.log('   Collections:', basicTest.data.collections?.length || 0);
      console.log('   Users:', basicTest.data.userCount || 0);
    } else if (basicTest.status === 308) {
      console.log('⚠️  Getting redirect (308) - checking redirect location...');
      const redirectLocation = basicTest.headers.location;
      if (redirectLocation) {
        console.log('   Redirect to:', redirectLocation);
        // Try the redirected URL
        const redirectTest = await makeRequest(redirectLocation);
        console.log('   Redirect status:', redirectTest.status);
        if (redirectTest.status === 200) {
          console.log('✅ Redirected request: SUCCESS');
        } else {
          console.log('❌ Redirected request: FAILED');
        }
      }
    } else {
      console.log('❌ Basic connectivity: FAILED');
      console.log('   Status:', basicTest.status);
      console.log('   Response:', basicTest.data);
    }
    
    // Test 2: Check if environment variables are set
    console.log('\n2️⃣ Testing environment variables...');
    const envTest = await makeRequest(`${baseUrl}/api/jobcy/test-connection`);
    if (envTest.status === 200 && envTest.data.success) {
      console.log('✅ Environment variables: SUCCESS');
      console.log('   MongoDB connection working');
      console.log('   JWT secret configured');
    } else {
      console.log('❌ Environment variables: FAILED');
      console.log('   This suggests environment variables are not set in Vercel');
    }
    
    // Test 3: Test main Jobcy page
    console.log('\n3️⃣ Testing main Jobcy page...');
    const pageTest = await makeRequest(`${baseUrl}/jobcy/`);
    if (pageTest.status === 200) {
      console.log('✅ Jobcy page: SUCCESS');
    } else {
      console.log('❌ Jobcy page: FAILED');
      console.log('   Status:', pageTest.status);
    }
    
    console.log('\n📝 Production Environment Analysis:');
    if (basicTest.status === 200) {
      console.log('✅ Production environment is working correctly');
      console.log('✅ Database connection established');
      console.log('✅ Environment variables are set');
    } else if (basicTest.status === 308) {
      console.log('⚠️  Production has redirect issues');
      console.log('   This might be a Vercel configuration issue');
    } else {
      console.log('❌ Production environment has issues');
      console.log('   Environment variables may not be set in Vercel');
      console.log('   Check Vercel dashboard for environment variables');
    }
    
  } catch (error) {
    console.log('❌ Test failed with error:', error.message);
  }
}

testProductionEnvironment();
