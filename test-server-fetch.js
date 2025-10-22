// Test Server-Side Fetch to Backend
const fetch = require('node-fetch');

async function testServerFetch() {
  console.log('🔍 Testing Server-Side Fetch to Backend...\n');
  
  try {
    console.log('Testing direct backend connection...');
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'abcd@gmail.com',
        password: 'Nani@123'
      }),
    });
    
    console.log('✅ Direct backend connection works');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.log('❌ Direct backend connection failed');
    console.log('Error:', error.message);
  }
  
  console.log('\n🔍 Testing with 127.0.0.1 instead of localhost...');
  
  try {
    const response = await fetch('http://127.0.0.1:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'abcd@gmail.com',
        password: 'Nani@123'
      }),
    });
    
    console.log('✅ 127.0.0.1 backend connection works');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    
  } catch (error) {
    console.log('❌ 127.0.0.1 backend connection failed');
    console.log('Error:', error.message);
  }
}

testServerFetch();

