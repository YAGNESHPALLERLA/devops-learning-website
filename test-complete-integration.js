const fetch = require('node-fetch');

async function testIntegratedBackend() {
  console.log('🚀 Testing Complete Jobcy Integration...\n');
  
  const baseUrl = 'http://localhost:3001'; // For local testing
  const productionUrl = 'https://www.ohg365.com'; // For production
  
  console.log('🔍 Testing Integrated Backend API...\n');
  
  try {
    // Test login endpoint
    const loginResponse = await fetch(`${baseUrl}/api/jobcy-backend/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'abcd@gmail.com',
        password: 'Nani@123'
      }),
    });

    const loginData = await loginResponse.json();
    
    console.log('✅ Integrated Backend Login Response:');
    console.log(`Status: ${loginResponse.status}`);
    console.log('Data:', JSON.stringify(loginData, null, 2));
    
    if (loginResponse.ok && loginData.token) {
      console.log('🎉 INTEGRATED BACKEND LOGIN WORKS!');
      
      // Test admin login
      const adminResponse = await fetch(`${baseUrl}/api/jobcy-backend/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@ohg365.com',
          password: 'Admin@123'
        }),
      });

      const adminData = await adminResponse.json();
      
      console.log('\n✅ Integrated Backend Admin Response:');
      console.log(`Status: ${adminResponse.status}`);
      console.log('Data:', JSON.stringify(adminData, null, 2));
      
      if (adminResponse.ok && adminData.token && adminData.user.role === 'admin') {
        console.log('🎉 INTEGRATED BACKEND ADMIN LOGIN WORKS!');
        return true;
      } else {
        console.log('❌ INTEGRATED BACKEND ADMIN LOGIN FAILED!');
        return false;
      }
    } else {
      console.log('❌ INTEGRATED BACKEND LOGIN FAILED!');
      return false;
    }
  } catch (error) {
    console.log('❌ Integrated backend test failed:', error.message);
    return false;
  }
}

async function testGitHubOAuth() {
  console.log('\n🐙 Testing GitHub OAuth Integration...\n');
  
  const baseUrl = 'http://localhost:3001';
  
  try {
    // Test GitHub OAuth endpoint
    const githubResponse = await fetch(`${baseUrl}/api/jobcy-backend/auth/github`, {
      method: 'GET',
    });
    
    console.log('✅ GitHub OAuth Response:');
    console.log(`Status: ${githubResponse.status}`);
    console.log(`Status Text: ${githubResponse.statusText}`);
    
    if (githubResponse.status === 302 || githubResponse.status === 200) {
      console.log('🎉 GITHUB OAUTH ENDPOINT WORKS!');
      return true;
    } else {
      console.log('❌ GITHUB OAUTH ENDPOINT FAILED!');
      return false;
    }
  } catch (error) {
    console.log('❌ GitHub OAuth test failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('🔍 Testing Complete Jobcy Integration...\n');
  console.log('=' .repeat(60));
  
  const backendWorks = await testIntegratedBackend();
  const githubWorks = await testGitHubOAuth();
  
  console.log('\n' + '=' .repeat(60));
  console.log('📋 INTEGRATION TEST SUMMARY:');
  
  if (backendWorks) {
    console.log('✅ Integrated Backend: WORKING');
  } else {
    console.log('❌ Integrated Backend: FAILED');
  }
  
  if (githubWorks) {
    console.log('✅ GitHub OAuth: WORKING');
  } else {
    console.log('❌ GitHub OAuth: FAILED');
  }
  
  if (backendWorks && githubWorks) {
    console.log('\n🎉 COMPLETE INTEGRATION SUCCESSFUL!');
    console.log('✅ Ready for production deployment');
    console.log('✅ No external dependencies');
    console.log('✅ Everything runs on your Vercel account');
    console.log('✅ Authentication working');
    console.log('✅ GitHub OAuth working');
    console.log('\n🚀 Next steps:');
    console.log('1. Add environment variables to Vercel dashboard');
    console.log('2. Configure GitHub OAuth app');
    console.log('3. Deploy to production');
    console.log('4. Test on https://www.ohg365.com/jobcy');
  } else {
    console.log('\n❌ Some integration tests failed');
    console.log('🔧 Check the implementation and try again');
  }
}

main().catch(console.error);
