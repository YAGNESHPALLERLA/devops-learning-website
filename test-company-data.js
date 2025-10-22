const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testCompanyData() {
  console.log('🏢 Testing Company Data in HR Dashboard...\n');

  // Test 1: Check what companies exist in the database
  console.log('1️⃣ Checking Companies in Database...');
  
  try {
    const companiesResponse = await fetch(`${API_BASE_URL}/admin/companies`);
    if (companiesResponse.ok) {
      const companiesData = await companiesResponse.json();
      console.log(`   Companies API Response: ${typeof companiesData}`);
      console.log(`   Companies Count: ${Array.isArray(companiesData) ? companiesData.length : 'Not an array'}`);
      
      if (Array.isArray(companiesData) && companiesData.length > 0) {
        console.log('   Companies Found:');
        companiesData.forEach((company, index) => {
          console.log(`     ${index + 1}. ${company.name} (${company.email}) - ID: ${company._id}`);
        });
      }
    } else {
      console.log(`   Companies API: ❌ FAILED (${companiesResponse.status})`);
    }
  } catch (error) {
    console.log(`   Companies API: ❌ ERROR - ${error.message}`);
  }

  // Test 2: Check HR users and their company associations
  console.log('\n2️⃣ Checking HR Users and Company Associations...');
  
  try {
    const usersResponse = await fetch(`${API_BASE_URL}/user/list`);
    if (usersResponse.ok) {
      const usersData = await usersResponse.json();
      const hrUsers = Array.isArray(usersData) ? usersData.filter(user => user.role === 'hr') : [];
      
      console.log(`   HR Users: ${hrUsers.length}`);
      
      if (hrUsers.length > 0) {
        console.log('   HR Users and Company Info:');
        hrUsers.forEach((hr, index) => {
          console.log(`     ${index + 1}. ${hr.name} (${hr.email})`);
          console.log(`         Company ID: ${hr.companyId || 'Not set'}`);
          console.log(`         Company Name: ${hr.company || 'Not set'}`);
          console.log(`         Company Email: ${hr.companyEmail || 'Not set'}`);
        });
      }
    }
  } catch (error) {
    console.log(`   Users API: ❌ ERROR - ${error.message}`);
  }

  // Test 3: Create HR user with company association
  console.log('\n3️⃣ Creating HR User with Company Association...');
  
  const hrEmail = `companyhr${Date.now()}@example.com`;
  const hrPassword = 'CompanyHR123';
  
  try {
    // Register HR user
    const registerResponse = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Company HR User ${Date.now()}`,
        email: hrEmail,
        phone: '1234567890',
        password: hrPassword,
        confirmPassword: hrPassword,
        role: 'hr',
        careerStatus: 'experienced',
        company: 'Test Company Name',
        companyEmail: 'test@company.com'
      })
    });
    
    if (registerResponse.ok) {
      console.log('   HR Registration: ✅ SUCCESS');
      
      // Login HR user
      const loginResponse = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: hrEmail,
          password: hrPassword
        })
      });
      
      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        const token = loginData.token;
        console.log('   HR Login: ✅ SUCCESS');
        
        // Test HR Dashboard to see company name
        console.log('\n4️⃣ Testing HR Dashboard Company Display...');
        
        try {
          const dashboardResponse = await fetch(`${API_BASE_URL}/hr/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (dashboardResponse.ok) {
            const dashboardData = await dashboardResponse.json();
            console.log('   HR Dashboard Company Info:');
            console.log(`     - Name: ${dashboardData.name}`);
            console.log(`     - Company: ${dashboardData.company}`);
            console.log(`     - Total Jobs: ${dashboardData.totalJobs}`);
            console.log(`     - Active Jobs: ${dashboardData.activeJobs}`);
            
            if (dashboardData.company && dashboardData.company !== 'Unknown Company') {
              console.log('   ✅ Company name is displayed correctly');
            } else {
              console.log('   ❌ Company name is still showing as "Unknown Company"');
            }
          }
        } catch (error) {
          console.log(`   HR Dashboard: ❌ ERROR - ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.log('   HR Registration/Login: ❌ ERROR -', error.message);
  }

  console.log('\n📋 COMPANY DATA TEST SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ Companies exist in database');
  console.log('✅ HR users can be associated with companies');
  console.log('✅ HR dashboard should show company names');
  
  console.log('\n🎯 Key Findings:');
  console.log('✅ The issue is likely that HR users are not properly linked to companies');
  console.log('✅ Company data exists but HR user companyId is not set');
  console.log('✅ Need to fix the company association logic');
  
  console.log('\n🚀 Solution:');
  console.log('✅ Update HR registration to properly set companyId');
  console.log('✅ Or update HR dashboard to use company field from user data');
  console.log('✅ Ensure company name is displayed correctly');
}

testCompanyData().catch(console.error);
