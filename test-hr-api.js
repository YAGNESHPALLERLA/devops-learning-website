#!/usr/bin/env node

const jwt = require('jsonwebtoken');

async function testHRApi() {
  console.log('🧪 Testing HR Jobs API Endpoint...\n');
  
  try {
    // Create a test JWT token for an HR user
    const testUserId = '68e8ded871fb1f9c7780f2bc'; // Jane's ID from our debug
    const testToken = jwt.sign(
      { id: testUserId, role: 'hr' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1h' }
    );
    
    console.log(`🔑 Generated test token for user: ${testUserId}`);
    console.log(`🔑 Token: ${testToken.substring(0, 50)}...`);
    
    // Test the API endpoint
    const response = await fetch('http://localhost:3000/api/jobcy/hr/jobs', {
      headers: {
        'Authorization': `Bearer ${testToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`📡 API Response Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ API Response successful`);
      console.log(`📊 Data type: ${typeof data}`);
      console.log(`📊 Is array: ${Array.isArray(data)}`);
      console.log(`📊 Length: ${Array.isArray(data) ? data.length : 'N/A'}`);
      
      if (Array.isArray(data) && data.length > 0) {
        console.log(`\n📋 Jobs returned by API:`);
        data.forEach((job, index) => {
          console.log(`  ${index + 1}. ${job.title} - Company: ${job.company} - Status: ${job.status}`);
        });
      } else {
        console.log(`❌ No jobs returned by API`);
      }
    } else {
      const errorData = await response.text();
      console.log(`❌ API Error: ${errorData}`);
    }
    
  } catch (error) {
    console.error('❌ Error testing HR API:', error.message);
  }
}

testHRApi();
