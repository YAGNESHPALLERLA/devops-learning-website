const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3001';
const TEST_CREDENTIALS = {
  email: 'abcd@gmail.com',
  password: 'Nani@123'
};

const ADMIN_CREDENTIALS = {
  email: 'admin@ohg365.com',
  password: 'Admin@123'
};

async function testLogin() {
  console.log('🔐 Testing Login Authentication...\n');
  
  try {
    const response = await fetch(`${BASE_URL}/api/jobcy/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TEST_CREDENTIALS),
    });

    const data = await response.json();
    
    console.log('✅ Login API Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Data:`, JSON.stringify(data, null, 2));
    
    if (response.ok && data.token) {
      console.log('🎉 LOGIN SUCCESS!');
      return data.token;
    } else {
      console.log('❌ LOGIN FAILED!');
      return null;
    }
  } catch (error) {
    console.log('❌ Login request failed:', error.message);
    return null;
  }
}

async function testRegistration() {
  console.log('\n📝 Testing User Registration...\n');
  
  try {
    const response = await fetch(`${BASE_URL}/api/jobcy/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'TestPassword123',
        role: 'user'
      }),
    });

    const data = await response.json();
    
    console.log('✅ Registration API Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Data:`, JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('🎉 REGISTRATION SUCCESS!');
    } else {
      console.log('❌ REGISTRATION FAILED!');
    }
  } catch (error) {
    console.log('❌ Registration request failed:', error.message);
  }
}

async function testAdminLogin() {
  console.log('\n👑 Testing Admin Login...\n');
  
  try {
    const response = await fetch(`${BASE_URL}/api/jobcy/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ADMIN_CREDENTIALS),
    });

    const data = await response.json();
    
    console.log('✅ Admin Login API Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Data:`, JSON.stringify(data, null, 2));
    
    if (response.ok && data.token) {
      console.log('🎉 ADMIN LOGIN SUCCESS!');
      console.log(`Role: ${data.user.role}`);
      return data.token;
    } else {
      console.log('❌ ADMIN LOGIN FAILED!');
      return null;
    }
  } catch (error) {
    console.log('❌ Admin login request failed:', error.message);
    return null;
  }
}

async function testGitHubAuth() {
  console.log('\n🐙 Testing GitHub Authentication...\n');
  
  try {
    const response = await fetch(`${BASE_URL}/api/jobcy/auth/github`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    console.log('✅ GitHub Auth API Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Data:`, JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('🎉 GITHUB AUTH SUCCESS!');
    } else {
      console.log('❌ GITHUB AUTH FAILED!');
    }
  } catch (error) {
    console.log('❌ GitHub auth request failed:', error.message);
  }
}

async function testBackendConnection() {
  console.log('🔗 Testing Backend Connection...\n');
  
  try {
    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(TEST_CREDENTIALS),
    });

    const data = await response.json();
    
    console.log('✅ Direct Backend Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Data:`, JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('🎉 BACKEND CONNECTION SUCCESS!');
      return true;
    } else {
      console.log('❌ BACKEND CONNECTION FAILED!');
      return false;
    }
  } catch (error) {
    console.log('❌ Backend connection failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Testing Integrated Jobcy Authentication...\n');
  console.log('=' .repeat(50));
  
  // Test backend connection first
  const backendWorks = await testBackendConnection();
  
  if (!backendWorks) {
    console.log('\n❌ Backend is not running. Please start the Jobcy backend first.');
    console.log('Run: ./start-jobcy-backend.sh');
    return;
  }
  
  // Test authentication flows
  await testLogin();
  await testAdminLogin();
  await testRegistration();
  await testGitHubAuth();
  
  console.log('\n' + '=' .repeat(50));
  console.log('✅ Authentication integration test completed!');
}

main().catch(console.error);
