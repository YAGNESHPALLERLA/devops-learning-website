// Test Simple API
const fetch = require('node-fetch');

async function testSimpleApi() {
  console.log('🔍 Testing Simple API...\n');
  
  try {
    const response = await fetch('http://localhost:3003/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        test: 'data'
      }),
    });
    
    console.log('✅ Simple API is reachable');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.log('❌ Simple API connection failed');
    console.log('Error:', error.message);
  }
}

testSimpleApi();

