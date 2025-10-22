const fetch = require('node-fetch');

async function testVercelBackend() {
  console.log('🔍 Testing Vercel Jobcy Backend...\n');
  
  try {
    const response = await fetch('https://jobcy-job-portal.vercel.app/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'abcd@gmail.com',
        password: 'Nani@123'
      }),
    });

    const data = await response.json();
    
    console.log('✅ Vercel Backend Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('🎉 VERCEL BACKEND IS WORKING!');
      return true;
    } else {
      console.log('❌ VERCEL BACKEND HAS ISSUES!');
      console.log('This explains the 500 error you\'re seeing.');
      return false;
    }
  } catch (error) {
    console.log('❌ Vercel backend connection failed:', error.message);
    return false;
  }
}

async function testLocalBackend() {
  console.log('\n🔍 Testing Local Jobcy Backend...\n');
  
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

    const data = await response.json();
    
    console.log('✅ Local Backend Response:');
    console.log(`Status: ${response.status}`);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('🎉 LOCAL BACKEND IS WORKING!');
      return true;
    } else {
      console.log('❌ LOCAL BACKEND HAS ISSUES!');
      return false;
    }
  } catch (error) {
    console.log('❌ Local backend connection failed:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Testing Jobcy Backend Status...\n');
  console.log('=' .repeat(50));
  
  const vercelWorks = await testVercelBackend();
  const localWorks = await testLocalBackend();
  
  console.log('\n' + '=' .repeat(50));
  console.log('📋 SUMMARY:');
  
  if (vercelWorks) {
    console.log('✅ Vercel backend is working - the issue is elsewhere');
  } else {
    console.log('❌ Vercel backend is NOT working - this is the problem!');
    console.log('🔧 SOLUTION: Update the API proxy to use local backend for now');
  }
  
  if (localWorks) {
    console.log('✅ Local backend is working - we can use this as fallback');
  } else {
    console.log('❌ Local backend is also not working');
  }
  
  if (!vercelWorks && localWorks) {
    console.log('\n🚀 RECOMMENDED FIX:');
    console.log('Update the API proxy to use local backend instead of Vercel backend');
  }
}

main().catch(console.error);
