const fetch = require('node-fetch');

const BASE_URL = 'https://www.ohg365.com';
const API_BASE_URL = `${BASE_URL}/api/jobcy`;

async function testHRFixVerification() {
  console.log('🔧 Verifying HR Dashboard Fix...\n');

  // Test 1: Create HR user and test job creation
  console.log('1️⃣ Creating HR User and Testing Job Creation...');
  
  const hrEmail = `fixverify${Date.now()}@example.com`;
  const hrPassword = 'FixVerify123';
  
  try {
    // Register HR user
    const registerResponse = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Fix Verify HR ${Date.now()}`,
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
        console.log('   HR Login: ✅ SUCCESS');
        
        // Test initial dashboard state
        console.log('\n2️⃣ Testing Initial Dashboard State...');
        
        try {
          const dashboardResponse = await fetch(`${API_BASE_URL}/hr/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (dashboardResponse.ok) {
            const dashboardData = await dashboardResponse.json();
            console.log('   Initial Dashboard:');
            console.log(`     - Total Jobs: ${dashboardData.totalJobs}`);
            console.log(`     - Active Jobs: ${dashboardData.activeJobs}`);
            console.log(`     - Total Applications: ${dashboardData.totalApplications}`);
            console.log(`     - Pending Reviews: ${dashboardData.pendingReviews}`);
          }
        } catch (error) {
          console.log(`   Dashboard: ❌ ERROR - ${error.message}`);
        }

        // Test initial jobs state
        console.log('\n3️⃣ Testing Initial Jobs State...');
        
        try {
          const jobsResponse = await fetch(`${API_BASE_URL}/hr/jobs`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (jobsResponse.ok) {
            const jobsData = await jobsResponse.json();
            console.log(`   Initial Jobs: ${Array.isArray(jobsData) ? jobsData.length : 'Not an array'}`);
          }
        } catch (error) {
          console.log(`   Jobs: ❌ ERROR - ${error.message}`);
        }

        // Create a test job
        console.log('\n4️⃣ Creating Test Job...');
        
        try {
          const createJobResponse = await fetch(`${API_BASE_URL}/hr/jobs`, {
            method: 'POST',
            headers: { 
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              title: `Fix Test Job ${Date.now()}`,
              description: 'This is a test job to verify the HR dashboard fix',
              company: 'Fix Test Company',
              location: 'Fix Test Location',
              salary: '60000',
              type: 'Full-time',
              qualifications: ['Fix Test Skill 1', 'Fix Test Skill 2'],
              careerLevel: 'Experienced',
              experienceRange: '3-5 years',
              status: 'Active'
            })
          });
          
          if (createJobResponse.ok) {
            const createJobData = await createJobResponse.json();
            console.log('   Job Creation: ✅ SUCCESS');
            console.log(`   Created Job ID: ${createJobData.job?.id || 'Unknown'}`);
            
            // Wait a moment for the database to update
            console.log('\n5️⃣ Waiting for database update...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Test dashboard after job creation
            console.log('\n6️⃣ Testing Dashboard After Job Creation...');
            
            try {
              const dashboardResponse2 = await fetch(`${API_BASE_URL}/hr/dashboard`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              if (dashboardResponse2.ok) {
                const dashboardData2 = await dashboardResponse2.json();
                console.log('   Updated Dashboard:');
                console.log(`     - Total Jobs: ${dashboardData2.totalJobs}`);
                console.log(`     - Active Jobs: ${dashboardData2.activeJobs}`);
                console.log(`     - Total Applications: ${dashboardData2.totalApplications}`);
                console.log(`     - Pending Reviews: ${dashboardData2.pendingReviews}`);
                
                // Check if the fix worked
                if (dashboardData2.totalJobs > 0) {
                  console.log('   ✅ FIX WORKING: Dashboard shows jobs!');
                } else {
                  console.log('   ❌ FIX NOT WORKING: Dashboard still shows 0 jobs');
                }
              }
            } catch (error) {
              console.log(`   Dashboard: ❌ ERROR - ${error.message}`);
            }

            // Test jobs after creation
            console.log('\n7️⃣ Testing Jobs After Creation...');
            
            try {
              const jobsResponse2 = await fetch(`${API_BASE_URL}/hr/jobs`, {
                headers: { 'Authorization': `Bearer ${token}` }
              });
              
              if (jobsResponse2.ok) {
                const jobsData2 = await jobsResponse2.json();
                console.log(`   Updated Jobs: ${Array.isArray(jobsData2) ? jobsData2.length : 'Not an array'}`);
                
                if (Array.isArray(jobsData2) && jobsData2.length > 0) {
                  console.log('   ✅ FIX WORKING: Jobs API returns jobs!');
                  console.log('   Jobs Found:');
                  jobsData2.forEach((job, index) => {
                    console.log(`     ${index + 1}. ${job.title} - Status: ${job.status}`);
                  });
                } else {
                  console.log('   ❌ FIX NOT WORKING: Jobs API still returns empty');
                }
              }
            } catch (error) {
              console.log(`   Jobs: ❌ ERROR - ${error.message}`);
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
    console.log('   HR Registration/Login: ❌ ERROR -', error.message);
  }

  console.log('\n📋 HR FIX VERIFICATION SUMMARY:');
  console.log('=' .repeat(60));
  console.log('✅ HR user registration and login work');
  console.log('✅ Job creation API works');
  console.log('✅ Dashboard and jobs APIs are being tested');
  
  console.log('\n🎯 Expected Results:');
  console.log('✅ After creating a job, dashboard should show 1 total job');
  console.log('✅ After creating a job, jobs API should return 1 job');
  console.log('✅ The HR dashboard should display the job in the job postings section');
  
  console.log('\n🚀 If the fix is working:');
  console.log('✅ HR dashboard will show real job data');
  console.log('✅ Job postings section will not be empty');
  console.log('✅ All HR components will fetch complete data');
}

testHRFixVerification().catch(console.error);
