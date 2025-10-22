async function testApiResponseFormat() {
  console.log('🔍 Testing API Response Formats...');
  
  const baseUrl = 'https://www.ohg365.com';
  
  // Test Jobs API response format
  console.log('\n1️⃣ Testing Jobs API response format...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/jobs/browse`);
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response type:', typeof data);
    console.log('   Is array:', Array.isArray(data));
    console.log('   Length:', Array.isArray(data) ? data.length : 'N/A');
    console.log('   Keys:', Object.keys(data));
    console.log('   Sample data:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
  } catch (error) {
    console.log('❌ Jobs API: ERROR', error.message);
  }

  // Test Users API response format
  console.log('\n2️⃣ Testing Users API response format...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/list`);
    const data = await response.json();
    console.log('   Status:', response.status);
    console.log('   Response type:', typeof data);
    console.log('   Is array:', Array.isArray(data));
    console.log('   Length:', Array.isArray(data) ? data.length : 'N/A');
    console.log('   Keys:', Object.keys(data));
    console.log('   Sample data:', JSON.stringify(data, null, 2).substring(0, 200) + '...');
  } catch (error) {
    console.log('❌ Users API: ERROR', error.message);
  }

  console.log('\n🎯 API Response Format Test Complete!');
}

testApiResponseFormat().catch(console.error);
