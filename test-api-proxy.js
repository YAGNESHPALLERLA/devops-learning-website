// Test API Proxy
const fetch = require('node-fetch');

async function testApiProxy() {
  console.log('🔍 Testing API Proxy...\n');
  
  try {
    const response = await fetch('http://localhost:3001/api/jobcy/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'abcd@gmail.com',
        password: 'Nani@123'
      }),
    });
    
    console.log('✅ API Proxy is reachable');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.status === 200) {
      console.log('\n🎉 API PROXY SUCCESSFUL!');
      console.log('✅ Frontend can connect to backend');
      console.log('✅ Login should work on website');
    } else {
      console.log('\n❌ API Proxy failed');
    }
    
  } catch (error) {
    console.log('❌ API Proxy connection failed');
    console.log('Error:', error.message);
  }
}

testApiProxy();
