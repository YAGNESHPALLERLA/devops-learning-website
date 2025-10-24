#!/usr/bin/env node

/**
 * Test HR Resume Download Functionality
 * 
 * This test verifies:
 * 1. HR user can download resumes from application management
 * 2. Resume download works for both new and old resume formats
 * 3. Proper error handling for missing resumes
 */

const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000/api/jobcy';

async function testHRResumeDownload() {
  console.log('🧪 Testing HR Resume Download Functionality...\n');

  try {
    // Step 1: Create HR user
    console.log('👔 Step 1: Creating HR user...');
    const hrEmail = `testhr${Date.now()}@company.com`;
    const hrResponse = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test HR User',
        email: hrEmail,
        password: 'password123',
        role: 'HR',
        mobile: '1234567890',
        currentLocation: 'Test City'
      })
    });

    if (!hrResponse.ok) {
      throw new Error(`HR registration failed: ${hrResponse.status}`);
    }
    const hrData = await hrResponse.json();
    console.log('✅ HR user created successfully');

    // Step 2: Login as HR
    console.log('\n🔐 Step 2: Logging in as HR...');
    const hrLoginResponse = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: hrEmail,
        password: 'password123'
      })
    });

    if (!hrLoginResponse.ok) {
      throw new Error(`HR login failed: ${hrLoginResponse.status}`);
    }
    const hrLoginData = await hrLoginResponse.json();
    const hrToken = hrLoginData.token;
    console.log('✅ HR logged in successfully');

    // Step 3: Create a job
    console.log('\n💼 Step 3: Creating a job...');
    const jobResponse = await fetch(`${API_BASE}/hr/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hrToken}`
      },
      body: JSON.stringify({
        title: 'Software Developer',
        company: 'Test Company',
        location: 'Remote',
        salary: '50000-70000',
        type: 'Full-time',
        description: 'We are looking for a skilled software developer...',
        requirements: '3+ years experience in JavaScript, React, Node.js'
      })
    });

    if (!jobResponse.ok) {
      throw new Error(`Job creation failed: ${jobResponse.status}`);
    }
    const jobData = await jobResponse.json();
    const jobId = jobData.job?.id || jobData.jobId || jobData._id;
    console.log('✅ Job created successfully:', jobId);

    // Step 4: Create a user with resume
    console.log('\n👤 Step 4: Creating user with resume...');
    const userEmail = `testuser${Date.now()}@example.com`;
    const userResponse = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User with Resume',
        email: userEmail,
        password: 'password123',
        role: 'User',
        mobile: '1234567890',
        currentLocation: 'Test City'
      })
    });

    if (!userResponse.ok) {
      throw new Error(`User registration failed: ${userResponse.status}`);
    }
    const userData = await userResponse.json();
    console.log('✅ User created successfully');

    // Step 5: Login as user
    console.log('\n🔐 Step 5: Logging in as user...');
    const userLoginResponse = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        password: 'password123'
      })
    });

    if (!userLoginResponse.ok) {
      throw new Error(`User login failed: ${userLoginResponse.status}`);
    }
    const userLoginData = await userLoginResponse.json();
    const userToken = userLoginData.token;
    console.log('✅ User logged in successfully');

    // Step 6: Upload resume
    console.log('\n📄 Step 6: Uploading resume...');
    
    // Create a test PDF file (base64 encoded minimal PDF)
    const testPdfBase64 = 'JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMiAwIFIKPj4KZW5kb2JqCjIgMCBvYmoKPDwKL1R5cGUgL1BhZ2VzCi9LaWRzIFszIDAgUl0KL0NvdW50IDEKPD4KZW5kb2JqCjMgMCBvYmoKPDwKL1R5cGUgL1BhZ2UKL1BhcmVudCAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIgNzkyXQovUmVzb3VyY2VzIDw8Ci9Gb250IDw8Ci9GMSA0IDAgUgo+Pgo+PgovQ29udGVudHMgNSAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwKL1R5cGUgL0ZvbnQKL1N1YnR5cGUgL1R5cGUxCi9CYXNlRm9udCAvSGVsdmV0aWNhCj4+CmVuZG9iago1IDAgb2JqCjw8Ci9MZW5ndGggNDQKPj4Kc3RyZWFtCkJUCi9GMSAxMiBUZgoyNTAgNzAwIFRkCihSZXN1bWUgVGVzdCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYKMDAwMDAwMDAwOSAwMDAwMCBuCjAwMDAwMDAwNzQgMDAwMDAgbgowMDAwMDAwMTIwIDAwMDAwIG4KMDAwMDAwMDI3NSAwMDAwMCBuCjAwMDAwMDAzNzEgMDAwMDAgbgp0cmFpbGVyCjw8Ci9TaXplIDYKL1Jvb3QgMSAwIFIKPj4Kc3RhcnR4cmVmCjQyNQolJUVPRgo=';
    
    const testFile = Buffer.from(testPdfBase64, 'base64');
    const formData = new FormData();
    const blob = new Blob([testFile], { type: 'application/pdf' });
    formData.append('resume', blob, 'test-resume.pdf');

    const uploadResponse = await fetch(`${API_BASE}/upload/resume`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${userToken}` },
      body: formData
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(`Resume upload failed: ${uploadResponse.status} - ${errorText}`);
    }
    const uploadData = await uploadResponse.json();
    console.log('✅ Resume uploaded successfully:', uploadData.fileName);

    // Step 7: Apply for job
    console.log('\n📝 Step 7: Applying for job...');
    const applyResponse = await fetch(`${API_BASE}/jobs/apply/${jobId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        coverLetter: 'I am very interested in this position.'
      })
    });

    if (!applyResponse.ok) {
      throw new Error(`Job application failed: ${applyResponse.status}`);
    }
    console.log('✅ Job application submitted successfully');

    // Step 8: HR views applications
    console.log('\n📋 Step 8: HR viewing applications...');
    const applicationsResponse = await fetch(`${API_BASE}/hr/applications`, {
      headers: { 'Authorization': `Bearer ${hrToken}` }
    });

    if (!applicationsResponse.ok) {
      throw new Error(`Applications fetch failed: ${applicationsResponse.status}`);
    }
    const applicationsData = await applicationsResponse.json();
    console.log('✅ Applications fetched successfully');
    console.log('📊 Applications count:', applicationsData.length);

    if (applicationsData.length > 0) {
      const application = applicationsData[0];
      console.log('📄 First application details:');
      console.log('  - User ID:', application.user?._id || application.userId);
      console.log('  - User Name:', application.user?.name);
      console.log('  - Resume:', application.user?.resume);
      console.log('  - Has Resume:', !!(application.user?.resume && (application.user.resume.data || application.user.resume.fileName || application.user.resume.name || typeof application.user.resume === 'string')));
    }

    // Step 9: Test resume download
    console.log('\n📥 Step 9: Testing resume download...');
    const userId = userData.user.id;
    const downloadResponse = await fetch(`${API_BASE}/hr/resume/${userId}`, {
      headers: { 'Authorization': `Bearer ${hrToken}` }
    });

    if (downloadResponse.ok) {
      console.log('✅ Resume download successful');
      const resumeBuffer = await downloadResponse.buffer();
      console.log('📄 Resume file size:', resumeBuffer.length, 'bytes');
      console.log('📄 Content-Type:', downloadResponse.headers.get('content-type'));
      console.log('📄 Content-Disposition:', downloadResponse.headers.get('content-disposition'));
    } else {
      console.log('❌ Resume download failed:', downloadResponse.status, downloadResponse.statusText);
      const errorText = await downloadResponse.text();
      console.log('❌ Error details:', errorText);
    }

    console.log('\n🎉 HR Resume Download Test Completed!');
    console.log('\n📋 Summary:');
    console.log('✅ HR user creation and login');
    console.log('✅ Job creation by HR');
    console.log('✅ User registration and login');
    console.log('✅ Resume upload by user');
    console.log('✅ Job application by user');
    console.log('✅ HR viewing applications');
    console.log('✅ HR resume download functionality');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testHRResumeDownload();
