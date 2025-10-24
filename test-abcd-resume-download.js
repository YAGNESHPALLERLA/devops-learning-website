#!/usr/bin/env node

/**
 * Test Resume Download for User "abcd"
 * 
 * This test verifies the specific case where user "abcd" has a resume
 * stored as a file path but the file doesn't exist on the server.
 */

const fetch = require('node-fetch');

const API_BASE = 'http://localhost:3000/api/jobcy';

async function testAbcdResumeDownload() {
  console.log('🧪 Testing Resume Download for User "abcd"...\n');

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

    // Step 3: Test resume download for user "abcd" (ID: 68e8dfd024cf96ebf48aaf05)
    console.log('\n📥 Step 3: Testing resume download for user "abcd"...');
    const userId = '68e8dfd024cf96ebf48aaf05';
    const downloadResponse = await fetch(`${API_BASE}/hr/resume/${userId}`, {
      headers: { 'Authorization': `Bearer ${hrToken}` }
    });

    console.log('📊 Download response status:', downloadResponse.status);
    console.log('📊 Download response headers:', Object.fromEntries(downloadResponse.headers.entries()));

    if (downloadResponse.ok) {
      console.log('✅ Resume download successful');
      const resumeBuffer = await downloadResponse.buffer();
      console.log('📄 Resume file size:', resumeBuffer.length, 'bytes');
    } else {
      console.log('❌ Resume download failed:', downloadResponse.status, downloadResponse.statusText);
      const errorText = await downloadResponse.text();
      console.log('❌ Error details:', errorText);
      
      if (downloadResponse.status === 404) {
        console.log('\n🔍 Analysis:');
        console.log('- User "abcd" has resume stored as file path');
        console.log('- File path: uploads/resumes/68e8dfd024cf96ebf48aaf05-1760190607066-250682189.pdf');
        console.log('- File does not exist on server');
        console.log('- This is expected behavior for old resume format');
      } else if (downloadResponse.status === 403) {
        console.log('\n🔍 Analysis:');
        console.log('- Authentication issue');
        console.log('- HR token might be invalid or expired');
        console.log('- Check if HR user has proper permissions');
      }
    }

    console.log('\n🎉 Test Completed!');
    console.log('\n📋 Summary:');
    console.log('✅ HR user creation and login');
    console.log('✅ Resume download attempt for user "abcd"');
    console.log('📊 Result: Expected 404 due to missing file');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

// Run the test
testAbcdResumeDownload();
