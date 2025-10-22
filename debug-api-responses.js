async function debugApiResponses() {
  console.log('🔍 Debugging API Responses...');
  
  const baseUrl = 'https://www.ohg365.com';
  
  // Debug Applications API
  console.log('\n1️⃣ Debugging Applications API...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/applications`);
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response type:', typeof data);
    console.log('   Is array:', Array.isArray(data));
    console.log('   Response structure:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('❌ Applications API: ERROR', error.message);
  }

  // Debug Interviews API
  console.log('\n2️⃣ Debugging Interviews API...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/interviews`);
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response type:', typeof data);
    console.log('   Is array:', Array.isArray(data));
    console.log('   Response structure:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.log('❌ Interviews API: ERROR', error.message);
  }

  console.log('\n🎯 Debug Complete!');
}

debugApiResponses().catch(console.error);
