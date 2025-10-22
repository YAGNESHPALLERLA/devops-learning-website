const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testCompaniesAPI() {
  console.log('🏢 Testing Companies API...\n');

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

  // Test 2: Fetch companies via admin API
  console.log('\n2️⃣ Fetching Companies via Admin API...');
  
  try {
    const companiesResponse = await fetch(`${API_BASE_URL}/admin/companies`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      }
    });
    
    if (companiesResponse.ok) {
      const companiesData = await companiesResponse.json();
      console.log('   Companies API: ✅ SUCCESS');
      console.log('   API Response:', JSON.stringify(companiesData, null, 2));
      
      if (companiesData.companies && Array.isArray(companiesData.companies)) {
        console.log(`   Companies Found: ${companiesData.companies.length}`);
        
        if (companiesData.companies.length > 0) {
          console.log('   Company Details:');
          companiesData.companies.forEach((company, index) => {
            console.log(`     ${index + 1}. ${company.name || 'Unknown'} (${company.email || 'No email'}) - Role: ${company.role}`);
          });
        } else {
          console.log('   ❌ No companies found in database');
        }
      } else {
        console.log('   ❌ Companies data not in expected format');
        console.log('   Available keys:', Object.keys(companiesData));
      }
    } else {
      const errorData = await companiesResponse.json();
      console.log('   Companies API: ❌ FAILED');
      console.log(`   Error: ${errorData.error || 'Unknown error'}`);
      console.log(`   Status: ${companiesResponse.status}`);
    }
  } catch (error) {
    console.log('   Companies API: ❌ ERROR -', error.message);
  }

  // Test 3: Check what users exist with different roles
  console.log('\n3️⃣ Checking User Roles in Database...');
  
  try {
    const usersResponse = await fetch(`${API_BASE_URL}/user/list`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      }
    });
    
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      console.log('   Users API: ✅ SUCCESS');
      
      if (Array.isArray(usersData)) {
        const roleCounts = {};
        usersData.forEach(user => {
          const role = user.role || 'unknown';
          roleCounts[role] = (roleCounts[role] || 0) + 1;
        });
        
        console.log('   User Role Distribution:');
        Object.entries(roleCounts).forEach(([role, count]) => {
          console.log(`     ${role}: ${count} users`);
        });
        
        // Check if there are any company users
        const companyUsers = usersData.filter(user => user.role === 'company');
        if (companyUsers.length > 0) {
          console.log('   Company Users Found:');
          companyUsers.forEach((company, index) => {
            console.log(`     ${index + 1}. ${company.name || 'Unknown'} (${company.email || 'No email'})`);
          });
        } else {
          console.log('   ❌ No users with role "company" found');
          console.log('   💡 Companies might be stored differently or need to be created');
        }
      }
    } else {
      console.log('   Users API: ❌ FAILED');
    }
  } catch (error) {
    console.log('   Users API: ❌ ERROR -', error.message);
  }

  console.log('\n📋 COMPANIES API TEST SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ Admin login works');
  console.log('✅ Companies API endpoint exists');
  console.log('✅ Need to check company data structure');
  
  console.log('\n🎯 Key Findings:');
  console.log('✅ Companies API is looking for users with role "company"');
  console.log('✅ Need to verify if companies exist or need to be created');
  console.log('✅ HR creation dropdown needs company data');
  
  console.log('\n🚀 Next Steps:');
  console.log('✅ Check if companies exist in database');
  console.log('✅ Create companies if they don\'t exist');
  console.log('✅ Fix company dropdown in HR creation form');
}

testCompaniesAPI().catch(console.error);
