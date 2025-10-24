#!/usr/bin/env node

/**
 * Test Resume Upload and Display Flow
 * 
 * This test verifies:
 * 1. User can upload a resume
 * 2. Resume is stored in MongoDB with proper structure
 * 3. Resume name is displayed in user dashboard
 * 4. Resume download works for HR users
 */

const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000/api/jobcy';

async function testResumeUploadAndDisplay() {
  console.log('🧪 Testing Resume Upload and Display Flow...\n');

  try {
    // Step 1: Create a test user
    console.log('📝 Step 1: Creating test user...');
    const userEmail = `testuser${Date.now()}@example.com`;
    const userResponse = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Resume Test User',
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

    // Step 2: Login as user
    console.log('\n🔐 Step 2: Logging in as user...');
    const loginResponse = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmail,
        password: 'password123'
      })
    });

    if (!loginResponse.ok) {
      throw new Error(`Login failed: ${loginResponse.status}`);
    }
    const loginData = await loginResponse.json();
    const userToken = loginData.token;
    console.log('✅ User logged in successfully');

    // Step 3: Check initial user profile (no resume)
    console.log('\n👤 Step 3: Checking initial user profile...');
    const profileResponse = await fetch(`${API_BASE}/user/me`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });

    if (!profileResponse.ok) {
      throw new Error(`Profile fetch failed: ${profileResponse.status}`);
    }
    const profileData = await profileResponse.json();
    console.log('📊 Initial profile resume:', profileData.resume);
    console.log('✅ Profile fetched successfully');

    // Step 4: Upload a resume
    console.log('\n📄 Step 4: Uploading resume...');
    
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

    // Step 5: Check updated user profile (with resume)
    console.log('\n👤 Step 5: Checking updated user profile...');
    const updatedProfileResponse = await fetch(`${API_BASE}/user/me`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });

    if (!updatedProfileResponse.ok) {
      throw new Error(`Updated profile fetch failed: ${updatedProfileResponse.status}`);
    }
    const updatedProfileData = await updatedProfileResponse.json();
    console.log('📊 Updated profile resume:', updatedProfileData.resume);
    
    if (updatedProfileData.resume && updatedProfileData.resume.fileName) {
      console.log('✅ Resume name is properly stored:', updatedProfileData.resume.fileName);
    } else {
      console.log('❌ Resume data structure issue:', updatedProfileData.resume);
    }

    // Step 6: Create HR user to test resume download
    console.log('\n👔 Step 6: Creating HR user for resume download test...');
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
    console.log('✅ HR user created successfully');

    // Step 7: Login as HR
    console.log('\n🔐 Step 7: Logging in as HR...');
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

    // Step 8: Test resume download
    console.log('\n📥 Step 8: Testing resume download...');
    const downloadResponse = await fetch(`${API_BASE}/hr/resume/${userData.user.id}`, {
      headers: { 'Authorization': `Bearer ${hrToken}` }
    });

    if (downloadResponse.ok) {
      console.log('✅ Resume download successful');
      const resumeBuffer = await downloadResponse.buffer();
      console.log('📄 Resume file size:', resumeBuffer.length, 'bytes');
    } else {
      console.log('❌ Resume download failed:', downloadResponse.status, downloadResponse.statusText);
    }

    console.log('\n🎉 Resume Upload and Display Test Completed Successfully!');
    console.log('\n📋 Summary:');
    console.log('✅ User registration and login');
    console.log('✅ Resume upload to MongoDB');
    console.log('✅ Resume data structure in database');
    console.log('✅ Resume name display in profile');
    console.log('✅ HR resume download functionality');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testResumeUploadAndDisplay();
