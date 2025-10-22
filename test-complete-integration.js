const http = require('http');
require('dotenv').config();

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: result });
        } catch (error) {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

async function testCompleteIntegration() {
  console.log('🧪 Testing Complete Jobcy Integration...\n');

  try {
    // Test 1: Database Connection
    console.log('1️⃣ Testing database connection...');
    const dbTest = await makeRequest('/api/jobcy/test-connection');
    if (dbTest.status === 200 && dbTest.data.success) {
      console.log('✅ Database connection: SUCCESS');
      console.log(`   Collections: ${dbTest.data.collections.length}`);
      console.log(`   Users: ${dbTest.data.userCount}`);
    } else {
      console.log('❌ Database connection: FAILED');
      return;
    }

    // Test 2: User Registration
    console.log('\n2️⃣ Testing user registration...');
    const testUser = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'TestPassword123',
      role: 'user'
    };
    
    const registerTest = await makeRequest('/api/jobcy/register', 'POST', testUser);
    if (registerTest.status === 201) {
      console.log('✅ User registration: SUCCESS');
    } else {
      console.log('❌ User registration: FAILED');
      console.log('   Error:', registerTest.data.error);
    }

    // Test 3: User Login
    console.log('\n3️⃣ Testing user login...');
    const loginTest = await makeRequest('/api/jobcy/login', 'POST', {
      email: 'test@example.com',
      password: 'TestPassword123'
    });
    
    if (loginTest.status === 200 && loginTest.data.token) {
      console.log('✅ User login: SUCCESS');
      console.log('   Token received:', loginTest.data.token ? 'Yes' : 'No');
      
      // Test 4: User Profile
      console.log('\n4️⃣ Testing user profile fetch...');
      const profileTest = await makeRequest('/api/jobcy/user/me', 'GET', null, {
        'Authorization': `Bearer ${loginTest.data.token}`
      });
      
      if (profileTest.status === 200) {
        console.log('✅ User profile: SUCCESS');
        console.log('   User name:', profileTest.data.name);
      } else {
        console.log('❌ User profile: FAILED');
      }
    } else {
      console.log('❌ User login: FAILED');
      console.log('   Error:', loginTest.data.error);
    }

    // Test 5: Jobs API
    console.log('\n5️⃣ Testing jobs API...');
    const jobsTest = await makeRequest('/api/jobcy/jobs');
    if (jobsTest.status === 200) {
      console.log('✅ Jobs API: SUCCESS');
    } else {
      console.log('❌ Jobs API: FAILED');
    }

    console.log('\n🎉 Integration test completed!');
    console.log('📝 If all tests passed, the dashboard should now show real data instead of mock data.');

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

// Wait for server to start, then run tests
setTimeout(testCompleteIntegration, 3000);