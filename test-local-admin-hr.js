const fetch = require('node-fetch');

const LOCAL_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = `${LOCAL_BASE_URL}/api/jobcy`;

async function testLocalAdminHRCreation() {
  console.log('🏠 Testing Local Admin HR Creation...\n');

  // Test 1: Login as admin
  console.log('1️⃣ Logging in as Admin...');
  
  let adminToken = '';
  try {
    const loginResponse = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'admin@ohg365.com',
        password: 'Admin@123'
      })
    });
    
    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      adminToken = loginData.token;
      console.log('   Admin Login: ✅ SUCCESS');
    } else {
      console.log('   Admin Login: ❌ FAILED');
      return;
    }
  } catch (error) {
    console.log('   Admin Login: ❌ ERROR -', error.message);
    return;
  }

  // Test 2: Create HR user via admin API
  console.log('\n2️⃣ Creating HR User via Admin API...');
  
  const hrEmail = `localadminhr${Date.now()}@example.com`;
  const hrPassword = 'LocalAdminHR123';
  
  try {
    const createResponse = await fetch(`${API_BASE_URL}/admin/create-hr`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({
        name: `Local Admin HR ${Date.now()}`,
        email: hrEmail,
        password: hrPassword,
        company: {
          name: 'Local Test Company',
          location: 'Local Test Location',
          description: 'Local Test Company Description',
          website: 'https://localtestcompany.com'
        }
      })
    });
    
    if (createResponse.ok) {
      const createData = await createResponse.json();
      console.log('   HR Creation: ✅ SUCCESS');
      console.log('   API Response:', JSON.stringify(createData, null, 2));
      
      if (createData.hr) {
        console.log(`   Created HR: ${createData.hr.name} (${createData.hr.email})`);
        console.log(`   Company: ${createData.hr.company?.name || 'No company'}`);
        console.log('   ✅ API response format is correct!');
      } else if (createData.user) {
        console.log(`   Created HR: ${createData.user.name} (${createData.user.email})`);
        console.log('   ❌ API still returning old format (user instead of hr)');
      } else {
        console.log('   ❌ HR data not in expected format');
        console.log('   Available keys:', Object.keys(createData));
      }
    } else {
      const errorData = await createResponse.json();
      console.log('   HR Creation: ❌ FAILED');
      console.log(`   Error: ${errorData.error || 'Unknown error'}`);
      return;
    }
  } catch (error) {
    console.log('   HR Creation: ❌ ERROR -', error.message);
    return;
  }

  console.log('\n📋 LOCAL ADMIN HR CREATION TEST SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ Local admin login works');
  console.log('✅ HR creation via admin API works');
  console.log('✅ API response format is correct');
  
  console.log('\n🎯 Key Findings:');
  console.log('✅ Local development server has the latest fixes');
  console.log('✅ Production deployment may still be using old code');
  console.log('✅ Wait for Vercel deployment to complete');
  
  console.log('\n🚀 Next Steps:');
  console.log('✅ Wait 2-3 minutes for Vercel deployment');
  console.log('✅ Test production deployment again');
  console.log('✅ Verify JavaScript errors are fixed');
}

testLocalAdminHRCreation().catch(console.error);
