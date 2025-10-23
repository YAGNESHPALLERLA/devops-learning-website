#!/usr/bin/env node

const jwt = require('jsonwebtoken');

async function testSimpleHRApi() {
  console.log('🧪 Testing Simple HR Jobs API...\n');
  
  try {
    // Test with a simple token
    const testToken = jwt.sign(
      { id: '68e8ded871fb1f9c7780f2bc', role: 'hr' },
      'fallback-secret',
      { expiresIn: '1h' }
    );
    
    console.log(`🔑 Testing with simple token`);
    
    // Test the API endpoint
    const response = await fetch('http://localhost:3000/api/jobcy/hr/jobs', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${testToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`📡 Response Status: ${response.status}`);
    console.log(`📡 Response Headers:`, Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log(`📡 Response Body: ${responseText.substring(0, 200)}...`);
    
    if (response.ok) {
      try {
        const data = JSON.parse(responseText);
        console.log(`✅ Success! Found ${Array.isArray(data) ? data.length : 'N/A'} jobs`);
      } catch (parseError) {
        console.log(`❌ JSON Parse Error: ${parseError.message}`);
      }
    } else {
      console.log(`❌ API Error: ${response.status} ${response.statusText}`);
    }
    
  } catch (error) {
    console.error('❌ Network Error:', error.message);
  }
}

testSimpleHRApi();
