const fetch = require('node-fetch');

async function testCompanyManagement() {
  console.log('🧪 Testing Company Management APIs...\n');

  // You'll need to replace this with a real admin token
  const token = 'your-admin-token-here';
  const baseUrl = 'http://localhost:3000';

  try {
    // Test 1: Get companies (should return empty array initially)
    console.log('📡 Testing GET /api/jobcy/admin/companies...');
    const getResponse = await fetch(`${baseUrl}/api/jobcy/admin/companies`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(`   Status: ${getResponse.status} ${getResponse.statusText}`);
    
    if (getResponse.ok) {
      const companies = await getResponse.json();
      console.log(`   ✅ Found ${companies.length} companies`);
      console.log('   Data:', JSON.stringify(companies, null, 2));
    } else {
      const error = await getResponse.text();
      console.log(`   ❌ Error:`, error);
    }

    // Test 2: Create a test company
    console.log('\n📡 Testing POST /api/jobcy/admin/companies...');
    const testCompany = {
      name: 'Test Company Inc.',
      email: 'test@company.com',
      password: 'testpassword123',
      industry: 'Technology',
      location: 'San Francisco, CA',
      website: 'https://testcompany.com',
      description: 'A test company for demonstration',
      size: '11-50',
      status: 'Active'
    };

    const postResponse = await fetch(`${baseUrl}/api/jobcy/admin/companies`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(testCompany)
    });

    console.log(`   Status: ${postResponse.status} ${postResponse.statusText}`);
    
    if (postResponse.ok) {
      const result = await postResponse.json();
      console.log('   ✅ Company created successfully');
      console.log('   Result:', JSON.stringify(result, null, 2));
      
      // Test 3: Get companies again (should now have 1 company)
      console.log('\n📡 Testing GET /api/jobcy/admin/companies (after creation)...');
      const getResponse2 = await fetch(`${baseUrl}/api/jobcy/admin/companies`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (getResponse2.ok) {
        const companies2 = await getResponse2.json();
        console.log(`   ✅ Now found ${companies2.length} companies`);
        console.log('   Companies:', JSON.stringify(companies2, null, 2));
      }
    } else {
      const error = await postResponse.text();
      console.log(`   ❌ Error creating company:`, error);
    }

  } catch (error) {
    console.log(`   ❌ Network Error:`, error.message);
  }
}

// Instructions for the user
console.log(`
🔧 Company Management API Test Script

To use this script:

1. First, get an admin token by logging in to the admin dashboard
2. Open browser dev tools (F12) and go to Application/Storage tab
3. Find the 'token' in localStorage and copy it
4. Replace 'your-admin-token-here' in this script with the actual token
5. Make sure your Next.js server is running on the correct port
6. Run: node test-company-management.js

This will test the company management APIs and show you what data they're returning.
`);

// Uncomment the line below to run the test
// testCompanyManagement();
