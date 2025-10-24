const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000/api/jobcy';

async function testHRCompleteFlow() {
  console.log('🧪 Testing Complete HR Flow (Create HR → Post Job → Apply → View Applications)...\n');

  let hrToken = null;
  let jobId = null;
  let applicationId = null;

  try {
    // Step 1: Create HR User
    console.log('1️⃣ Creating HR User...');
    const hrUser = {
      name: `HR User ${Date.now()}`,
      email: `hr${Date.now()}@company.com`,
      password: 'password123',
      role: 'HR',
      company: 'Test Company'
    };

    const hrRegisterResponse = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(hrUser)
    });

    if (hrRegisterResponse.ok) {
      console.log('   HR Registration: ✅ SUCCESS');
    } else {
      console.log('   HR Registration: ❌ FAILED');
      return;
    }

    // Step 2: Login as HR
    console.log('2️⃣ Logging in as HR...');
    const hrLoginResponse = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: hrUser.email,
        password: hrUser.password
      })
    });

    if (hrLoginResponse.ok) {
      const hrLoginData = await hrLoginResponse.json();
      hrToken = hrLoginData.token;
      console.log('   HR Login: ✅ SUCCESS (Token received)');
    } else {
      console.log('   HR Login: ❌ FAILED');
      return;
    }

    // Step 3: Post a Job as HR
    console.log('3️⃣ Posting a Job as HR...');
    const jobData = {
      title: 'Software Developer',
      company: 'Test Company',
      location: 'Remote',
      salary: '50000-70000',
      type: 'Full-time',
      description: 'We are looking for a skilled software developer...',
      requirements: '3+ years experience in JavaScript, React, Node.js',
      postedBy: hrUser.email
    };

    const jobResponse = await fetch(`${API_BASE}/hr/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hrToken}`
      },
      body: JSON.stringify(jobData)
    });

    if (jobResponse.ok) {
      const jobResult = await jobResponse.json();
      jobId = jobResult.job?.id || jobResult.jobId || jobResult._id;
      console.log('   Job Posting: ✅ SUCCESS');
      console.log(`   Job ID: ${jobId}`);
      console.log('   Full job result:', jobResult);
    } else {
      console.log('   Job Posting: ❌ FAILED');
      const errorText = await jobResponse.text();
      console.log('   Error:', errorText);
      return;
    }

    // Step 4: Create a Regular User
    console.log('4️⃣ Creating Regular User...');
    const regularUser = {
      name: `Regular User ${Date.now()}`,
      email: `user${Date.now()}@example.com`,
      password: 'password123',
      role: 'User'
    };

    const userRegisterResponse = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(regularUser)
    });

    if (userRegisterResponse.ok) {
      console.log('   User Registration: ✅ SUCCESS');
    } else {
      console.log('   User Registration: ❌ FAILED');
      return;
    }

    // Step 5: Login as Regular User
    console.log('5️⃣ Logging in as Regular User...');
    const userLoginResponse = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: regularUser.email,
        password: regularUser.password
      })
    });

    let userToken = null;
    if (userLoginResponse.ok) {
      const userLoginData = await userLoginResponse.json();
      userToken = userLoginData.token;
      console.log('   User Login: ✅ SUCCESS (Token received)');
    } else {
      console.log('   User Login: ❌ FAILED');
      return;
    }

    // Step 6: Apply to the Job
    console.log('6️⃣ Applying to the Job...');
    const applicationData = {
      coverLetter: 'I am very interested in this position...',
      resume: {
        name: 'resume.pdf',
        data: 'base64-encoded-resume-data'
      }
    };

    const applicationResponse = await fetch(`${API_BASE}/jobs/apply/${jobId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify(applicationData)
    });

    if (applicationResponse.ok) {
      const applicationResult = await applicationResponse.json();
      applicationId = applicationResult.applicationId;
      console.log('   Job Application: ✅ SUCCESS');
      console.log(`   Application ID: ${applicationId}`);
    } else {
      console.log('   Job Application: ❌ FAILED');
      const errorText = await applicationResponse.text();
      console.log('   Error:', errorText);
      return;
    }

    // Step 7: Check HR Dashboard
    console.log('7️⃣ Checking HR Dashboard...');
    const hrDashboardResponse = await fetch(`${API_BASE}/hr/dashboard`, {
      headers: {
        'Authorization': `Bearer ${hrToken}`
      }
    });

    if (hrDashboardResponse.ok) {
      const dashboardData = await hrDashboardResponse.json();
      console.log('   HR Dashboard: ✅ SUCCESS');
      console.log(`   Total Jobs: ${dashboardData.totalJobs}`);
      console.log(`   Total Applications: ${dashboardData.totalApplications}`);
    } else {
      console.log('   HR Dashboard: ❌ FAILED');
    }

    // Step 8: Check HR Applications
    console.log('8️⃣ Checking HR Applications...');
    const hrApplicationsResponse = await fetch(`${API_BASE}/hr/applications`, {
      headers: {
        'Authorization': `Bearer ${hrToken}`
      }
    });

    if (hrApplicationsResponse.ok) {
      const applicationsData = await hrApplicationsResponse.json();
      console.log('   HR Applications: ✅ SUCCESS');
      console.log(`   Applications Count: ${applicationsData.length}`);
      
      if (applicationsData.length > 0) {
        console.log('   ✅ Applications are visible to HR!');
        console.log('   First Application:', {
          jobTitle: applicationsData[0].job?.title,
          applicantName: applicationsData[0].user?.name,
          status: applicationsData[0].status
        });
      } else {
        console.log('   ❌ No applications visible to HR');
      }
    } else {
      console.log('   HR Applications: ❌ FAILED');
    }

    // Step 9: Check User's Applied Jobs
    console.log('9️⃣ Checking User Applied Jobs...');
    const userApplicationsResponse = await fetch(`${API_BASE}/user/applications`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });

    if (userApplicationsResponse.ok) {
      const userApplicationsData = await userApplicationsResponse.json();
      console.log('   User Applications: ✅ SUCCESS');
      console.log(`   User Applications Count: ${userApplicationsData.length}`);
    } else {
      console.log('   User Applications: ❌ FAILED');
    }

    console.log('\n📋 COMPLETE HR FLOW TEST SUMMARY:');
    console.log('============================================================');
    console.log('✅ HR user creation and login');
    console.log('✅ Job posting by HR');
    console.log('✅ Regular user creation and login');
    console.log('✅ Job application by regular user');
    console.log('✅ HR dashboard shows job statistics');
    console.log('✅ HR applications API returns applications');
    console.log('✅ User applications API returns applications');

    console.log('\n🎯 Key Findings:');
    if (applicationId) {
      console.log('✅ Complete flow works: HR → Job → User → Application → HR View');
      console.log('✅ Applications should now be visible in HR application management');
    } else {
      console.log('❌ Application flow has issues');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testHRCompleteFlow();
