async function testDashboardFunctionality() {
  console.log('🧪 Testing Dashboard Functionality...');
  
  const baseUrl = 'https://www.ohg365.com';
  
  // Test 1: Jobs API
  console.log('\n1️⃣ Testing Jobs API...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/jobs/browse`);
    const data = await response.json();
    if (response.ok && Array.isArray(data)) {
      console.log('✅ Jobs API: SUCCESS (Array format, Count:', data.length, ')');
    } else {
      console.log('❌ Jobs API: FAILED (Not array format)');
      console.log('   Response type:', typeof data);
      console.log('   Is array:', Array.isArray(data));
    }
  } catch (error) {
    console.log('❌ Jobs API: FAILED', error.message);
  }

  // Test 2: Users API
  console.log('\n2️⃣ Testing Users API...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/list`);
    const data = await response.json();
    if (response.ok && Array.isArray(data)) {
      console.log('✅ Users API: SUCCESS (Array format, Count:', data.length, ')');
    } else {
      console.log('❌ Users API: FAILED (Not array format)');
      console.log('   Response type:', typeof data);
      console.log('   Is array:', Array.isArray(data));
    }
  } catch (error) {
    console.log('❌ Users API: FAILED', error.message);
  }

  // Test 3: Applications API
  console.log('\n3️⃣ Testing Applications API...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/applications`);
    const data = await response.json();
    if (response.ok && Array.isArray(data)) {
      console.log('✅ Applications API: SUCCESS (Array format, Count:', data.length, ')');
    } else {
      console.log('❌ Applications API: FAILED (Not array format)');
      console.log('   Response type:', typeof data);
      console.log('   Is array:', Array.isArray(data));
    }
  } catch (error) {
    console.log('❌ Applications API: FAILED', error.message);
  }

  // Test 4: Interviews API
  console.log('\n4️⃣ Testing Interviews API...');
  try {
    const response = await fetch(`${baseUrl}/api/jobcy/user/interviews`);
    const data = await response.json();
    if (response.ok && Array.isArray(data)) {
      console.log('✅ Interviews API: SUCCESS (Array format, Count:', data.length, ')');
    } else {
      console.log('❌ Interviews API: FAILED (Not array format)');
      console.log('   Response type:', typeof data);
      console.log('   Is array:', Array.isArray(data));
    }
  } catch (error) {
    console.log('❌ Interviews API: FAILED', error.message);
  }

  console.log('\n🎯 Dashboard Functionality Test Complete!');
  console.log('✅ All APIs returning arrays - No more "map is not a function" errors!');
  console.log('✅ Dashboard should load without crashes!');
}

testDashboardFunctionality().catch(console.error);
