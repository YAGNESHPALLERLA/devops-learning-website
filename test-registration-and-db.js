/**
 * Test script to register a test user and verify it's stored in the database
 */

const testUser = {
  name: 'Test User',
  email: `testuser_${Date.now()}@test.com`, // Unique email using timestamp
  password: 'TestPassword123!'
};

async function testRegistration() {
  console.log('🧪 Testing User Registration and Database Storage\n');
  console.log('Test User Details:');
  console.log('  Name:', testUser.name);
  console.log('  Email:', testUser.email);
  console.log('  Password:', '***hidden***\n');

  try {
    // Step 1: Register the user via API
    console.log('📝 Step 1: Registering user via API...');
    const signupResponse = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    const signupData = await signupResponse.json();
    
    if (!signupResponse.ok) {
      console.error('❌ Registration failed:', signupData);
      return;
    }

    console.log('✅ Registration successful!');
    console.log('   Response:', JSON.stringify(signupData, null, 2));
    console.log('   User ID:', signupData.user?.id || 'N/A');
    console.log('');

    // Step 2: Check database directly
    console.log('🔍 Step 2: Checking database collections...');
    
    // Import MongoDB connection
    const { MongoClient } = require('mongodb');
    const uri = process.env.MONGO_URI || process.env.DATABASE_URL;
    
    if (!uri) {
      console.error('❌ MONGO_URI or DATABASE_URL environment variable is not set');
      console.log('   Please set MONGO_URI in your .env file');
      return;
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('jobcy-data');
    
    console.log('✅ Connected to MongoDB database: jobcy-data\n');

    // Check website-users collection
    console.log('📦 Checking "website-users" collection...');
    const websiteUser = await db.collection('website-users').findOne({ 
      email: testUser.email.toLowerCase() 
    });
    
    if (websiteUser) {
      console.log('✅ User found in "website-users" collection!');
      console.log('   User ID:', websiteUser._id);
      console.log('   Name:', websiteUser.name);
      console.log('   Email:', websiteUser.email);
      console.log('   Role:', websiteUser.role);
      console.log('   Source:', websiteUser.source);
      console.log('   Created At:', websiteUser.createdAt);
      console.log('   Has Password (hashed):', !!websiteUser.password);
      console.log('');
    } else {
      console.log('❌ User NOT found in "website-users" collection');
      console.log('');
    }

    // Check users collection (Jobcy compatibility)
    console.log('📦 Checking "users" collection (Jobcy compatibility)...');
    const jobcyUser = await db.collection('users').findOne({ 
      email: testUser.email.toLowerCase() 
    });
    
    if (jobcyUser) {
      console.log('✅ User found in "users" collection!');
      console.log('   User ID:', jobcyUser._id);
      console.log('   Name:', jobcyUser.name);
      console.log('   Email:', jobcyUser.email);
      console.log('   Role:', jobcyUser.role);
      console.log('   Source:', jobcyUser.source);
      console.log('   Created At:', jobcyUser.createdAt);
      console.log('   Has Password (hashed):', !!jobcyUser.password);
      console.log('');
    } else {
      console.log('❌ User NOT found in "users" collection');
      console.log('');
    }

    // Step 3: Test login with the registered user
    console.log('🔐 Step 3: Testing login with registered credentials...');
    const loginResponse = await fetch('http://localhost:3000/api/jobcy/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: testUser.email,
        password: testUser.password,
      }),
    });

    const loginData = await loginResponse.json();
    
    if (loginResponse.ok && loginData.token) {
      console.log('✅ Login successful!');
      console.log('   Token received:', loginData.token.substring(0, 20) + '...');
      console.log('   User Role:', loginData.user?.role);
      console.log('   User Name:', loginData.user?.name);
      console.log('');
    } else {
      console.log('❌ Login failed:', loginData.error || loginData.message);
      console.log('');
    }

    // Summary
    console.log('📊 Summary:');
    console.log('   Registration:', signupResponse.ok ? '✅ Success' : '❌ Failed');
    console.log('   Database (website-users):', websiteUser ? '✅ Found' : '❌ Not Found');
    console.log('   Database (users):', jobcyUser ? '✅ Found' : '❌ Not Found');
    console.log('   Login Test:', loginResponse.ok ? '✅ Success' : '❌ Failed');
    
    if (websiteUser && jobcyUser && loginResponse.ok) {
      console.log('\n🎉 All tests passed! User registration and database storage working correctly.');
    } else {
      console.log('\n⚠️  Some tests failed. Please check the output above.');
    }

    await client.close();
    
  } catch (error) {
    console.error('❌ Error during test:', error);
    console.error('   Stack:', error.stack);
  }
}

// Run the test
if (require.main === module) {
  // Load environment variables
  require('dotenv').config();
  
  testRegistration()
    .then(() => {
      console.log('\n✅ Test completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Test failed:', error);
      process.exit(1);
    });
}

module.exports = { testRegistration, testUser };

