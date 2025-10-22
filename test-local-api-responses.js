const fetch = require('node-fetch');

async function testLocalApiResponses() {
  console.log('🔍 Testing Local API Response Formats...');
  
  const baseUrl = 'http://localhost:3000';
  
  // Test Jobs API response format
  console.log('\n1️⃣ Testing Jobs API response format...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/jobs/browse`);
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response type:', typeof data);
    console.log('   Is array:', Array.isArray(data));
    console.log('   Length:', Array.isArray(data) ? data.length : 'N/A');
    console.log('   Keys:', Object.keys(data));
    console.log('   Sample data:', JSON.stringify(data, null, 2).substring(0, 300) + '...');
  } catch (error) {
    console.log('❌ Jobs API: ERROR', error.message);
  }

  // Test Users API response format
  console.log('\n2️⃣ Testing Users API response format...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/list`);
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response type:', typeof data);
    console.log('   Is array:', Array.isArray(data));
    console.log('   Length:', Array.isArray(data) ? data.length : 'N/A');
    console.log('   Keys:', Object.keys(data));
    console.log('   Sample data:', JSON.stringify(data, null, 2).substring(0, 300) + '...');
  } catch (error) {
    console.log('❌ Users API: ERROR', error.message);
  }

  // Test User Applications API
  console.log('\n3️⃣ Testing User Applications API response format...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/applications`);
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response type:', typeof data);
    console.log('   Is array:', Array.isArray(data));
    console.log('   Length:', Array.isArray(data) ? data.length : 'N/A');
    console.log('   Keys:', Object.keys(data));
  } catch (error) {
    console.log('❌ Applications API: ERROR', error.message);
  }

  // Test User Interviews API
  console.log('\n4️⃣ Testing User Interviews API response format...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/interviews`);
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response type:', typeof data);
    console.log('   Is array:', Array.isArray(data));
    console.log('   Length:', Array.isArray(data) ? data.length : 'N/A');
    console.log('   Keys:', Object.keys(data));
  } catch (error) {
    console.log('❌ Interviews API: ERROR', error.message);
  }

  console.log('\n🎯 Local API Response Format Test Complete!');
}

testLocalApiResponses().catch(console.error);
