#!/usr/bin/env node

const fetch = require('node-fetch');

async function testJobsAPI() {
  console.log('🔍 Testing Jobs API...\n');
  
  try {
    // Test the jobs browse API
    const response = await fetch('http://localhost:3000/api/jobcy/jobs/browse', {
      headers: {
        'Authorization': 'Bearer test-token' // This will fail auth but we can see the response
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('Jobs data:', {
        isArray: Array.isArray(data),
        type: typeof data,
        length: Array.isArray(data) ? data.length : 'N/A'
      });
      
      if (Array.isArray(data) && data.length > 0) {
        console.log('Sample job:', JSON.stringify(data[0], null, 2));
      }
    } else {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Error testing jobs API:', error.message);
  }
}

testJobsAPI();
