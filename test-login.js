// Test Login with Actual Credentials
const fetch = require('node-fetch');

async function testLogin() {
  console.log('🔍 Testing Login with Your Credentials...\n');
  
  try {
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
    
    console.log('✅ Backend is reachable');
    console.log('Status:', response.status);
    console.log('Status Text:', response.statusText);
    
    const data = await response.json();
    console.log('Response:', JSON.stringify(data, null, 2));
    
    if (response.status === 200) {
      console.log('\n🎉 LOGIN SUCCESSFUL!');
      console.log('✅ Database connection is working');
      console.log('✅ User credentials are valid');
    } else {
      console.log('\n❌ Login failed');
      console.log('This might be because the user does not exist in the database');
    }
    
  } catch (error) {
    console.log('❌ Backend connection failed');
    console.log('Error:', error.message);
  }
}

testLogin();
