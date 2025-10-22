const fetch = require('node-fetch');

async function testCurrentBackend() {
  console.log('🔍 Testing Current Backend Configuration...\n');
  
  const currentUrl = 'https://jobcy-job-portal.vercel.app/api/login';
  
  try {
    const response = await fetch(currentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123'
      }),
    });

    const data = await response.json();
    
    console.log('✅ Current Backend Response:');
    console.log(`Status: ${response.status}`);
    console.log(`Status Text: ${response.statusText}`);
    console.log('Data:', JSON.stringify(data, null, 2));
    
    if (response.ok) {
      console.log('🎉 CURRENT BACKEND IS WORKING!');
      console.log('✅ You can use: https://jobcy-job-portal.vercel.app');
      return true;
    } else {
      console.log('❌ CURRENT BACKEND HAS ISSUES!');
      console.log('🔧 You need to provide the correct backend URL');
      return false;
    }
  } catch (error) {
    console.log('❌ Current backend connection failed:', error.message);
    console.log('🔧 You need to provide the correct backend URL');
    return false;
  }
}

async function main() {
  console.log('🚀 Testing Current Jobcy Backend...\n');
  console.log('=' .repeat(50));
  
  const backendWorks = await testCurrentBackend();
  
  console.log('\n' + '=' .repeat(50));
  
  if (backendWorks) {
    console.log('✅ Current backend is working!');
    console.log('📋 You can use: https://jobcy-job-portal.vercel.app');
    console.log('🚀 No changes needed - authentication should work');
  } else {
    console.log('❌ Current backend is not working');
    console.log('🔧 Please provide the correct Jobcy backend URL');
    console.log('');
    console.log('📝 Examples of what you might have:');
    console.log('  - https://your-jobcy-app.vercel.app');
    console.log('  - https://jobcy-railway.app');
    console.log('  - https://your-domain.com');
    console.log('');
    console.log('💡 To configure the correct URL, run:');
    console.log('   ./configure-real-backend.sh');
  }
}

main().catch(console.error);
