const fetch = require('node-fetch');

async function testRailwayBackend() {
  console.log('🚀 Testing Railway Jobcy Backend...\n');
  
  const backendUrl = 'https://jobcy-job-portal-production.up.railway.app/api/login';
  
  try {
    const response = await fetch(backendUrl, {
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
    
    console.log('✅ Railway Backend Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    if (response.ok && data.token) {
      console.log('🎉 RAILWAY BACKEND IS WORKING!');
      console.log('✅ Authentication should work now');
      return true;
    } else {
      console.log('❌ RAILWAY BACKEND HAS ISSUES!');
      console.log('🔧 Check credentials or backend configuration');
      return false;
    }
  } catch (error) {
    console.log('❌ Railway backend connection failed:', error.message);
    return false;
  }
}

async function testAdminRailwayBackend() {
  console.log('\n👑 Testing Railway Admin Backend...\n');
  
  const backendUrl = 'https://jobcy-job-portal-production.up.railway.app/api/login';
  
  try {
    const response = await fetch(backendUrl, {
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
    
    console.log('✅ Railway Admin Backend Response:');
    console.log(`Status: ${response.status}`);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    if (response.ok && data.token && data.user.role === 'admin') {
      console.log('🎉 RAILWAY ADMIN BACKEND IS WORKING!');
      return true;
    } else {
      console.log('❌ RAILWAY ADMIN BACKEND HAS ISSUES!');
      return false;
    }
  } catch (error) {
    console.log('❌ Railway admin backend connection failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('🔍 Testing Railway Jobcy Backend Integration...\n');
  console.log('=' .repeat(60));
  
  const userAuthWorks = await testRailwayBackend();
  const adminAuthWorks = await testAdminRailwayBackend();
  
  console.log('\n' + '=' .repeat(60));
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
    console.log('\n🎉 ALL RAILWAY BACKEND TESTS PASSED!');
    console.log('✅ Ready for deployment');
    console.log('✅ Authentication should work on production');
    console.log('✅ Backend URL: https://jobcy-job-portal-production.up.railway.app');
  } else {
    console.log('\n❌ Some Railway backend tests failed');
    console.log('🔧 Check the Railway backend configuration');
    console.log('🔧 Verify CORS settings allow your domain');
  }
}

main().catch(console.error);
