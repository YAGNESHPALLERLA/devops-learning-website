async function testDashboardDeployment() {
  console.log('🔍 Testing Dashboard Deployment...');
  
  const baseUrl = 'https://www.ohg365.com';
  
  // Test if the dashboard loads without errors
  console.log('\n1️⃣ Testing dashboard page load...');
  try {
    const response = await fetch(`${baseUrl}/jobcy/user/dashboard`);
    console.log('   Dashboard status:', response.status);
    if (response.ok) {
      const html = await response.text();
      console.log('   Page loads successfully');
      console.log('   Contains "Application error":', html.includes('Application error'));
      console.log('   Contains "client-side exception":', html.includes('client-side exception'));
    } else {
      console.log('❌ Dashboard failed to load');
    }
  } catch (error) {
    console.log('❌ Dashboard test failed:', error.message);
  }

  // Test the specific API endpoints that are causing issues
  console.log('\n2️⃣ Testing API endpoints for array format...');
  
  // Test Jobs API
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/jobs/browse`);
    const data = await response.json();
    console.log('   Jobs API - Is array:', Array.isArray(data));
    console.log('   Jobs API - Type:', typeof data);
    console.log('   Jobs API - Length:', Array.isArray(data) ? data.length : 'N/A');
    
    // Test if we can map over it
    if (Array.isArray(data)) {
      console.log('   Jobs API - Map test: SUCCESS');
    } else {
      console.log('   Jobs API - Map test: FAILED (not array)');
    }
  } catch (error) {
    console.log('❌ Jobs API test failed:', error.message);
  }

  // Test Users API
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/list`);
    const data = await response.json();
    console.log('   Users API - Is array:', Array.isArray(data));
    console.log('   Users API - Type:', typeof data);
    console.log('   Users API - Length:', Array.isArray(data) ? data.length : 'N/A');
    
    // Test if we can map over it
    if (Array.isArray(data)) {
      console.log('   Users API - Map test: SUCCESS');
    } else {
      console.log('   Users API - Map test: FAILED (not array)');
    }
  } catch (error) {
    console.log('❌ Users API test failed:', error.message);
  }

  console.log('\n🎯 Dashboard Deployment Test Complete!');
}

testDashboardDeployment().catch(console.error);
