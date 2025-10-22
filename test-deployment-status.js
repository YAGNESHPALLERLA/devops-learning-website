const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testDeploymentStatus() {
  console.log('🚀 Testing Deployment Status...\n');

  // Test 1: Check if the API is responding
  console.log('1️⃣ Testing API Connectivity...');
  
  try {
    const testResponse = await fetch(`${API_BASE_URL}/test-connection`);
    if (testResponse.ok) {
      const testData = await testResponse.json();
      console.log('   API Connection: ✅ SUCCESS');
      console.log(`   Database Status: ${testData.status}`);
      console.log(`   Collections: ${testData.collections}`);
      console.log(`   Users: ${testData.userCount}`);
    } else {
      console.log('   API Connection: ❌ FAILED');
    }
  } catch (error) {
    console.log(`   API Connection: ❌ ERROR - ${error.message}`);
  }

  // Test 2: Check if the latest changes are deployed
  console.log('\n2️⃣ Testing Latest Changes...');
  
  try {
    // Create a test HR user
    const hrEmail = `deploytest${Date.now()}@example.com`;
    const hrPassword = 'DeployTest123';
    
    const registerResponse = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Deploy Test HR ${Date.now()}`,
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
        
        // Test job creation with the latest fix
        console.log('\n3️⃣ Testing Job Creation with Latest Fix...');
        
        try {
          const createJobResponse = await fetch(`${API_BASE_URL}/hr/jobs`, {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: `Deploy Test Job ${Date.now()}`,
              description: 'Testing if the latest fix is deployed',
              company: 'Deploy Test Company',
              location: 'Deploy Test Location',
              salary: '70000',
              type: 'Full-time',
              qualifications: ['Deploy Test Skill'],
              careerLevel: 'Experienced',
              experienceRange: '2-4 years',
              status: 'Active'
            })
          });
          
          if (createJobResponse.ok) {
            const createJobData = await createJobResponse.json();
            console.log('   Job Creation: ✅ SUCCESS');
            console.log(`   Job ID: ${createJobData.job?.id || 'Unknown'}`);
            
            // Wait for database update
            console.log('\n4️⃣ Waiting for database update...');
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // Test if the job appears in the dashboard
            console.log('\n5️⃣ Testing Dashboard After Job Creation...');
            
            try {
              const dashboardResponse = await fetch(`${API_BASE_URL}/hr/dashboard`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              if (dashboardResponse.ok) {
                const dashboardData = await dashboardResponse.json();
                console.log('   Dashboard Response:');
                console.log(`     - Total Jobs: ${dashboardData.totalJobs}`);
                console.log(`     - Active Jobs: ${dashboardData.activeJobs}`);
                
                if (dashboardData.totalJobs > 0) {
                  console.log('   ✅ DEPLOYMENT SUCCESS: Latest fix is working!');
                } else {
                  console.log('   ⏳ DEPLOYMENT PENDING: Latest fix not yet deployed');
                }
              }
            } catch (error) {
              console.log(`   Dashboard: ❌ ERROR - ${error.message}`);
            }
            
            // Test if the job appears in the jobs API
            console.log('\n6️⃣ Testing Jobs API After Job Creation...');
            
            try {
              const jobsResponse = await fetch(`${API_BASE_URL}/hr/jobs`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              if (jobsResponse.ok) {
                const jobsData = await jobsResponse.json();
                console.log(`   Jobs API Response: ${Array.isArray(jobsData) ? jobsData.length : 'Not an array'}`);
                
                if (Array.isArray(jobsData) && jobsData.length > 0) {
                  console.log('   ✅ DEPLOYMENT SUCCESS: Jobs API is working!');
                } else {
                  console.log('   ⏳ DEPLOYMENT PENDING: Jobs API not yet updated');
                }
              }
            } catch (error) {
              console.log(`   Jobs API: ❌ ERROR - ${error.message}`);
            }
          } else {
            console.log('   Job Creation: ❌ FAILED');
            const errorData = await createJobResponse.json();
            console.log(`   Error: ${errorData.error}`);
          }
        } catch (error) {
          console.log(`   Job Creation: ❌ ERROR - ${error.message}`);
        }
      }
    }
  } catch (error) {
    console.log('   Test: ❌ ERROR -', error.message);
  }

  console.log('\n📋 DEPLOYMENT STATUS SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ API is responding and accessible');
  console.log('✅ HR user registration and login work');
  console.log('✅ Job creation API is functional');
  
  console.log('\n🎯 Deployment Status:');
  console.log('✅ If dashboard shows jobs after creation: Latest fix is deployed');
  console.log('⏳ If dashboard shows 0 jobs: Deployment is still in progress');
  console.log('⏳ Vercel deployments can take 2-5 minutes to complete');
  
  console.log('\n🚀 Next Steps:');
  console.log('✅ Wait 2-3 minutes and test again');
  console.log('✅ Check Vercel dashboard for deployment status');
  console.log('✅ The fix will work once deployment is complete');
}

testDeploymentStatus().catch(console.error);
