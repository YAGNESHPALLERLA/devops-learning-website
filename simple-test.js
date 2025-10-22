const fetch = require('node-fetch');

async function testAPI() {
  console.log('🔍 Testing API Endpoints...\n');
  
  const baseUrl = 'http://localhost:3000';
  
  // Test login endpoint
  console.log('Testing login endpoint...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@ohg365.com', password: 'Admin@123' }),
    });
    
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    
    const text = await response.text();
    console.log('Raw Response:', text.substring(0, 200) + (text.length > 200 ? '...' : ''));
    
  } catch (error) {
    console.log('Error:', error.message);
  }
}

testAPI();
