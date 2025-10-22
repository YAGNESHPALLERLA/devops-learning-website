const fetch = require('node-fetch');

async function testMockAuth() {
  console.log('🧪 Testing Mock Authentication...\n');
  
  try {
    const response = await fetch('http://localhost:3001/api/jobcy/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'abcd@gmail.com',
        password: 'Nani@123'
      }),
    });

    const data = await response.json();
    
    console.log('✅ Mock Authentication Response:');
    console.log(`Status: ${response.status}`);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    if (response.ok && data.token) {
      console.log('🎉 MOCK AUTHENTICATION WORKS!');
      console.log('✅ Login should work on the website now');
      return true;
    } else {
      console.log('❌ Mock authentication failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Mock auth test failed:', error.message);
    return false;
  }
}

async function testAdminMockAuth() {
  console.log('\n👑 Testing Mock Admin Authentication...\n');
  
  try {
    const response = await fetch('http://localhost:3001/api/jobcy/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@ohg365.com',
        password: 'Admin@123'
      }),
    });

    const data = await response.json();
    
    console.log('✅ Mock Admin Authentication Response:');
    console.log(`Status: ${response.status}`);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    if (response.ok && data.token && data.user.role === 'admin') {
      console.log('🎉 MOCK ADMIN AUTHENTICATION WORKS!');
      return true;
    } else {
      console.log('❌ Mock admin authentication failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Mock admin auth test failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Testing Mock Authentication System...\n');
  console.log('=' .repeat(50));
  
  const userAuthWorks = await testMockAuth();
  const adminAuthWorks = await testAdminMockAuth();
  
  console.log('\n' + '=' .repeat(50));
  console.log('📋 SUMMARY:');
  
  if (userAuthWorks) {
    console.log('✅ User authentication: WORKING');
  } else {
    console.log('❌ User authentication: FAILED');
  }
  
  if (adminAuthWorks) {
    console.log('✅ Admin authentication: WORKING');
  } else {
    console.log('❌ Admin authentication: FAILED');
  }
  
  if (userAuthWorks && adminAuthWorks) {
    console.log('\n🎉 ALL AUTHENTICATION TESTS PASSED!');
    console.log('✅ Ready for deployment');
    console.log('✅ Login should work on production');
    console.log('✅ Admin login should work on production');
  } else {
    console.log('\n❌ Some authentication tests failed');
    console.log('🔧 Check the API proxy routes');
  }
}

main().catch(console.error);
