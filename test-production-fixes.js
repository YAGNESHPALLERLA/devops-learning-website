#!/usr/bin/env node

/**
 * Production Fixes Verification Script
 * Tests all the fixes implemented for the Jobcy portal
 */

const https = require('https');
const http = require('http');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE = `${BASE_URL}/api/jobcy`;

// Test credentials (you'll need to replace these with actual test credentials)
const TEST_CREDENTIALS = {
  user: { email: 'test@example.com', password: 'password123' },
  hr: { email: 'hr@example.com', password: 'password123' },
  admin: { email: 'admin@example.com', password: 'password123' }
};

// Utility function to make HTTP requests
function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;
    
    const requestOptions = {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      timeout: 10000
    };

    const req = client.request(url, requestOptions, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = data ? JSON.parse(data) : {};
          resolve({
            status: res.statusCode,
            statusText: res.statusMessage,
            data: jsonData,
            headers: res.headers
          });
        } catch (error) {
          resolve({
            status: res.statusCode,
            statusText: res.statusMessage,
            data: data,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Request timeout')));
    
    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    
    req.end();
  });
}

// Test functions
async function testHomePage() {
  console.log('🏠 Testing Home Page...');
  try {
    const response = await makeRequest(`${BASE_URL}/jobcy`);
    if (response.status === 200) {
      console.log('✅ Home page loads successfully');
      return true;
    } else {
      console.log('❌ Home page failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Home page error:', error.message);
    return false;
  }
}

async function testLoginFlow(credentials, role) {
  console.log(`🔐 Testing ${role} login flow...`);
  try {
    const response = await makeRequest(`${API_BASE}/login`, {
      method: 'POST',
      body: credentials
    });
    
    if (response.status === 200 && response.data.token) {
      console.log(`✅ ${role} login successful`);
      return response.data.token;
    } else {
      console.log(`❌ ${role} login failed:`, response.data.message || 'Unknown error');
      return null;
    }
  } catch (error) {
    console.log(`❌ ${role} login error:`, error.message);
    return null;
  }
}

async function testUserDashboard(token) {
  console.log('👤 Testing User Dashboard...');
  try {
    const response = await makeRequest(`${API_BASE}/user/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.status === 200) {
      console.log('✅ User profile API works');
      
      // Test jobs API
      const jobsResponse = await makeRequest(`${API_BASE}/jobs/browse`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (jobsResponse.status === 200) {
        console.log('✅ Jobs API works');
        return true;
      } else {
        console.log('❌ Jobs API failed:', jobsResponse.status);
        return false;
      }
    } else {
      console.log('❌ User profile API failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ User dashboard error:', error.message);
    return false;
  }
}

async function testHRDashboard(token) {
  console.log('👔 Testing HR Dashboard...');
  try {
    const response = await makeRequest(`${API_BASE}/hr/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.status === 200) {
      console.log('✅ HR dashboard API works');
      
      // Test HR jobs API
      const jobsResponse = await makeRequest(`${API_BASE}/hr/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (jobsResponse.status === 200) {
        console.log('✅ HR jobs API works');
        return true;
      } else {
        console.log('❌ HR jobs API failed:', jobsResponse.status);
        return false;
      }
    } else {
      console.log('❌ HR dashboard API failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ HR dashboard error:', error.message);
    return false;
  }
}

async function testAdminDashboard(token) {
  console.log('👑 Testing Admin Dashboard...');
  try {
    const response = await makeRequest(`${API_BASE}/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (response.status === 200) {
      console.log('✅ Admin stats API works');
      
      // Test admin activity API
      const activityResponse = await makeRequest(`${API_BASE}/admin/activity`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (activityResponse.status === 200) {
        console.log('✅ Admin activity API works');
        return true;
      } else {
        console.log('❌ Admin activity API failed:', activityResponse.status);
        return false;
      }
    } else {
      console.log('❌ Admin stats API failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Admin dashboard error:', error.message);
    return false;
  }
}

async function testJobApplication(token) {
  console.log('📝 Testing Job Application...');
  try {
    // First get a job ID
    const jobsResponse = await makeRequest(`${API_BASE}/jobs/browse`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    if (jobsResponse.status === 200 && jobsResponse.data.length > 0) {
      const jobId = jobsResponse.data[0]._id || jobsResponse.data[0].id;
      
      // Test job application
      const applyResponse = await makeRequest(`${API_BASE}/jobs/apply/${jobId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: { coverLetter: 'Test application' }
      });
      
      if (applyResponse.status === 200 || applyResponse.status === 201) {
        console.log('✅ Job application API works');
        return true;
      } else {
        console.log('❌ Job application failed:', applyResponse.status);
        return false;
      }
    } else {
      console.log('❌ No jobs available for testing');
      return false;
    }
  } catch (error) {
    console.log('❌ Job application error:', error.message);
    return false;
  }
}

async function testProfileUpdate(token) {
  console.log('👤 Testing Profile Update...');
  try {
    const response = await makeRequest(`${API_BASE}/user/me`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: {
        name: 'Test User Updated',
        bio: 'Updated bio for testing'
      }
    });
    
    if (response.status === 200) {
      console.log('✅ Profile update API works');
      return true;
    } else {
      console.log('❌ Profile update failed:', response.status);
      return false;
    }
  } catch (error) {
    console.log('❌ Profile update error:', error.message);
    return false;
  }
}

async function testRouting() {
  console.log('🛣️ Testing Routing...');
  const routes = [
    '/jobcy',
    '/jobcy/user/auth/login',
    '/jobcy/hr/auth/login',
    '/jobcy/admin/auth/login',
    '/jobcy/company/auth/login'
  ];
  
  let passed = 0;
  for (const route of routes) {
    try {
      const response = await makeRequest(`${BASE_URL}${route}`);
      if (response.status === 200) {
        console.log(`✅ Route ${route} works`);
        passed++;
      } else {
        console.log(`❌ Route ${route} failed:`, response.status);
      }
    } catch (error) {
      console.log(`❌ Route ${route} error:`, error.message);
    }
  }
  
  console.log(`🛣️ Routing test: ${passed}/${routes.length} routes working`);
  return passed === routes.length;
}

// Main test function
async function runTests() {
  console.log('🚀 Starting Production Fixes Verification...\n');
  
  const results = {
    homePage: false,
    routing: false,
    userLogin: false,
    hrLogin: false,
    adminLogin: false,
    userDashboard: false,
    hrDashboard: false,
    adminDashboard: false,
    jobApplication: false,
    profileUpdate: false
  };
  
  // Test 1: Home Page
  results.homePage = await testHomePage();
  console.log('');
  
  // Test 2: Routing
  results.routing = await testRouting();
  console.log('');
  
  // Test 3: Login Flows
  const userToken = await testLoginFlow(TEST_CREDENTIALS.user, 'User');
  results.userLogin = !!userToken;
  
  const hrToken = await testLoginFlow(TEST_CREDENTIALS.hr, 'HR');
  results.hrLogin = !!hrToken;
  
  const adminToken = await testLoginFlow(TEST_CREDENTIALS.admin, 'Admin');
  results.adminLogin = !!adminToken;
  console.log('');
  
  // Test 4: Dashboard APIs
  if (userToken) {
    results.userDashboard = await testUserDashboard(userToken);
    results.jobApplication = await testJobApplication(userToken);
    results.profileUpdate = await testProfileUpdate(userToken);
  }
  
  if (hrToken) {
    results.hrDashboard = await testHRDashboard(hrToken);
  }
  
  if (adminToken) {
    results.adminDashboard = await testAdminDashboard(adminToken);
  }
  console.log('');
  
  // Summary
  console.log('📊 Test Results Summary:');
  console.log('========================');
  
  const totalTests = Object.keys(results).length;
  const passedTests = Object.values(results).filter(Boolean).length;
  
  Object.entries(results).forEach(([test, passed]) => {
    console.log(`${passed ? '✅' : '❌'} ${test}: ${passed ? 'PASS' : 'FAIL'}`);
  });
  
  console.log(`\n🎯 Overall: ${passedTests}/${totalTests} tests passed`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! The Jobcy portal is fully functional.');
  } else {
    console.log('⚠️ Some tests failed. Please check the issues above.');
  }
  
  return results;
}

// Run tests if this script is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, testHomePage, testLoginFlow, testUserDashboard, testHRDashboard, testAdminDashboard };
