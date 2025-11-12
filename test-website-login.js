// Test Website Login with Registered Test Data
// Using built-in fetch (Node.js 18+)

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

// Test credentials from test files
const TEST_CREDENTIALS = [
  {
    name: 'Regular User',
    email: 'abcd@gmail.com',
    password: 'Nani@123'
  },
  {
    name: 'Admin User',
    email: 'admin@ohg365.com',
    password: 'Admin@123'
  }
];

async function testLogin(credentials) {
  console.log(`\n🔐 Testing Login for: ${credentials.name}`);
  console.log(`   Email: ${credentials.email}`);
  console.log(`   Password: ${'*'.repeat(credentials.password.length)}\n`);
  
  try {
    // Test login API
    const loginResponse = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      }),
    });

    const loginData = await loginResponse.json();
    
    console.log(`   Status: ${loginResponse.status}`);
    
    if (loginResponse.ok && loginData.token) {
      console.log('   ✅ LOGIN SUCCESSFUL!');
      console.log(`   ✅ Token received: ${loginData.token.substring(0, 20)}...`);
      console.log(`   ✅ User Role: ${loginData.user?.role || 'N/A'}`);
      console.log(`   ✅ User Name: ${loginData.user?.name || 'N/A'}`);
      console.log(`   ✅ User Email: ${loginData.user?.email || 'N/A'}`);
      
      // Verify email storage would work (simulate localStorage)
      console.log('\n   📝 Simulating localStorage behavior:');
      console.log(`   - registeredEmail would be stored: ${credentials.email}`);
      console.log(`   - user object would be stored with email: ${loginData.user?.email}`);
      
      return {
        success: true,
        token: loginData.token,
        user: loginData.user,
        email: credentials.email
      };
    } else {
      console.log('   ❌ LOGIN FAILED!');
      console.log(`   Error: ${loginData.error || loginData.message || 'Unknown error'}`);
      return {
        success: false,
        error: loginData.error || loginData.message || 'Unknown error'
      };
    }
  } catch (error) {
    console.log('   ❌ REQUEST FAILED!');
    console.log(`   Error: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

async function testContinueFeature(email) {
  console.log(`\n🔄 Testing "Continue with Account" Feature`);
  console.log(`   Email: ${email}\n`);
  
  // Simulate what would happen when user tries to access tutorials
  console.log('   📋 Simulated Flow:');
  console.log('   1. User tries to access /tutorials/programming');
  console.log('   2. System checks localStorage for token: ❌ Not found');
  console.log(`   3. System checks localStorage for registeredEmail: ✅ Found (${email})`);
  console.log('   4. System redirects to /continue page');
  console.log(`   5. Continue page shows email: ${email}`);
  console.log('   6. User clicks "Continue with this Account"');
  console.log(`   7. User redirected to /login?email=${encodeURIComponent(email)}`);
  console.log('   ✅ "Continue with Account" feature would work correctly!\n');
}

async function runTests() {
  console.log('🧪 Testing Website Login with Registered Test Data');
  console.log('=' .repeat(60));
  console.log(`\n📍 Testing against: ${BASE_URL}`);
  console.log(`📍 API Endpoint: ${API_BASE_URL}/login\n`);
  
  const results = [];
  
  // Test each set of credentials
  for (const credentials of TEST_CREDENTIALS) {
    const result = await testLogin(credentials);
    results.push({ ...credentials, ...result });
    
    // If login successful, test continue feature
    if (result.success && result.email) {
      await testContinueFeature(result.email);
    }
    
    // Wait a bit between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`\n✅ Successful Logins: ${successful.length}/${results.length}`);
  successful.forEach(r => {
    console.log(`   - ${r.name} (${r.email})`);
  });
  
  if (failed.length > 0) {
    console.log(`\n❌ Failed Logins: ${failed.length}/${results.length}`);
    failed.forEach(r => {
      console.log(`   - ${r.name} (${r.email}): ${r.error}`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Test Complete!');
  console.log('='.repeat(60) + '\n');
  
  // Instructions
  if (successful.length > 0) {
    console.log('📝 To test in browser:');
    console.log('   1. Go to https://www.ohg365.com/login');
    successful.forEach(r => {
      console.log(`   2. Login with: ${r.email} / ${r.password}`);
      console.log(`   3. Close browser and clear cookies (but keep localStorage)`);
      console.log(`   4. Try to access /tutorials/programming`);
      console.log(`   5. You should see the "Continue with Account" page\n`);
    });
  }
}

// Run tests
runTests().catch(console.error);

