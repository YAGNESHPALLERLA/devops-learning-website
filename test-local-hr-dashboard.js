const fetch = require('node-fetch');

const LOCAL_BASE_URL = 'http://localhost:3000';
const API_BASE_URL = `${LOCAL_BASE_URL}/api/jobcy`;

async function testLocalHRDashboard() {
  console.log('🧪 Testing Local HR Dashboard...\n');

  // Test 1: Create HR User and Login
  console.log('1️⃣ Creating HR User and Login...');
  
  const hrEmail = `localhr${Date.now()}@example.com`;
  const hrPassword = 'LocalHRPassword123';
  
  try {
    // Register HR user
    const registerResponse = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Local HR User ${Date.now()}`,
        email: hrEmail,
        phone: '1234567890',
        password: hrPassword,
        confirmPassword: hrPassword,
        role: 'hr',
        careerStatus: 'experienced'
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
        console.log('   HR Login: ✅ SUCCESS (Token received)');
        
        // Test HR Dashboard API
        console.log('\n2️⃣ Testing HR Dashboard API...');
        
        try {
          const dashboardResponse = await fetch(`${API_BASE_URL}/hr/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (dashboardResponse.ok) {
            const dashboardData = await dashboardResponse.json();
            console.log('   HR Dashboard API: ✅ SUCCESS');
            console.log('   Response Structure:', Object.keys(dashboardData));
            console.log(`   HR Name: ${dashboardData.name}`);
            console.log(`   Company: ${dashboardData.company}`);
            console.log(`   Total Jobs: ${dashboardData.totalJobs}`);
            console.log(`   Active Jobs: ${dashboardData.activeJobs}`);
            console.log(`   Total Applications: ${dashboardData.totalApplications}`);
            console.log(`   Pending Reviews: ${dashboardData.pendingReviews}`);
          } else {
            console.log(`   HR Dashboard API: ❌ FAILED (${dashboardResponse.status})`);
            const errorData = await dashboardResponse.json();
            console.log(`   Error: ${errorData.error}`);
          }
        } catch (error) {
          console.log(`   HR Dashboard API: ❌ ERROR - ${error.message}`);
        }

        // Test HR Jobs API
        console.log('\n3️⃣ Testing HR Jobs API...');
        
        try {
          const jobsResponse = await fetch(`${API_BASE_URL}/hr/jobs`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (jobsResponse.ok) {
            const jobsData = await jobsResponse.json();
            console.log('   HR Jobs API: ✅ SUCCESS');
            console.log(`   Jobs Type: ${Array.isArray(jobsData) ? 'Array' : typeof jobsData}`);
            console.log(`   Jobs Count: ${Array.isArray(jobsData) ? jobsData.length : 'Not an array'}`);
            if (Array.isArray(jobsData) && jobsData.length > 0) {
              console.log(`   First Job: ${jobsData[0].title || 'No title'}`);
            }
          } else {
            console.log(`   HR Jobs API: ❌ FAILED (${jobsResponse.status})`);
            const errorData = await jobsResponse.json();
            console.log(`   Error: ${errorData.error}`);
          }
        } catch (error) {
          console.log(`   HR Jobs API: ❌ ERROR - ${error.message}`);
        }

      } else {
        console.log('   HR Login: ❌ FAILED');
        const loginError = await loginResponse.json();
        console.log(`   Error: ${loginError.error}`);
      }
    } else {
      console.log('   HR Registration: ❌ FAILED');
      const registerError = await registerResponse.json();
      console.log(`   Error: ${registerError.error}`);
    }
  } catch (error) {
    console.log('   HR Registration/Login: ❌ ERROR -', error.message);
  }

  console.log('\n📋 LOCAL HR DASHBOARD TEST SUMMARY:');
  console.log('=' .repeat(50));
  console.log('✅ Testing local development server');
  console.log('✅ HR dashboard should show real data');
  console.log('✅ HR jobs should be fetched correctly');
  console.log('✅ All components should work with live data');
}

testLocalHRDashboard().catch(console.error);
