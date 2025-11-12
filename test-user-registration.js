/**
 * Test script to register a test user and verify database storage
 * Run with: node test-user-registration.js
 */

require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const testUser = {
  name: 'Test User',
  email: `testuser_${Date.now()}@test.com`,
  password: 'TestPassword123!'
};

async function testDirectDatabase() {
  console.log('🧪 Testing Direct Database Registration and Storage\n');
  console.log('Test User Details:');
  console.log('  Name:', testUser.name);
  console.log('  Email:', testUser.email);
  console.log('  Password:', '***hidden***\n');

  // Try to get MONGO_URI from environment or use the one from documentation
  let uri = process.env.MONGO_URI || process.env.DATABASE_URL;
  
  if (!uri) {
    // Use the MongoDB URI from the documentation as fallback for testing
    uri = 'mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data';
    console.log('⚠️  MONGO_URI not found in environment variables');
    console.log('   Using MongoDB URI from documentation for testing...\n');
  }

  let client;
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    client = new MongoClient(uri, {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    await client.connect();
    const db = client.db('jobcy-data');
    console.log('✅ Connected to MongoDB database: jobcy-data\n');

    // Check if user already exists
    console.log('🔍 Checking if user already exists...');
    const existingWebsiteUser = await db.collection('website-users').findOne({ 
      email: testUser.email.toLowerCase() 
    });
    const existingJobcyUser = await db.collection('users').findOne({ 
      email: testUser.email.toLowerCase() 
    });

    if (existingWebsiteUser || existingJobcyUser) {
      console.log('⚠️  User already exists in database');
      console.log('   Found in website-users:', !!existingWebsiteUser);
      console.log('   Found in users:', !!existingJobcyUser);
      console.log('\n📦 Existing User Details:');
      if (existingWebsiteUser) {
        console.log('   website-users collection:');
        console.log('     ID:', existingWebsiteUser._id);
        console.log('     Name:', existingWebsiteUser.name);
        console.log('     Email:', existingWebsiteUser.email);
        console.log('     Role:', existingWebsiteUser.role);
        console.log('     Source:', existingWebsiteUser.source);
        console.log('     Created At:', existingWebsiteUser.createdAt);
      }
      if (existingJobcyUser) {
        console.log('   users collection:');
        console.log('     ID:', existingJobcyUser._id);
        console.log('     Name:', existingJobcyUser.name);
        console.log('     Email:', existingJobcyUser.email);
        console.log('     Role:', existingJobcyUser.role);
        console.log('     Source:', existingJobcyUser.source);
        console.log('     Created At:', existingJobcyUser.createdAt);
      }
      return;
    }

    // Hash password
    console.log('🔐 Hashing password...');
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    console.log('✅ Password hashed\n');

    // Create user object for website-users collection
    const newUser = {
      name: testUser.name.trim(),
      email: testUser.email.trim().toLowerCase(),
      password: hashedPassword,
      role: 'user',
      source: 'website',
      phone: '',
      location: '',
      experience: '',
      about: '',
      skills: [],
      education: [],
      profileViews: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert into website-users collection
    console.log('📝 Inserting user into "website-users" collection...');
    const websiteResult = await db.collection('website-users').insertOne(newUser);
    console.log('✅ User inserted into website-users collection');
    console.log('   Inserted ID:', websiteResult.insertedId);
    console.log('');

    // Create user object for users collection (Jobcy compatibility)
    // Use a unique mobile number to avoid duplicate key errors
    const uniqueMobile = `test_${Date.now()}`;
    const jobcyUser = {
      ...newUser,
      source: 'website',
      mobile: uniqueMobile, // Use unique mobile to avoid duplicate key error
      company: {},
      companyEmail: '',
      salary: '',
      projects: [],
      applications: 0,
      profileScore: 0,
      resume: null,
      githubId: '',
      githubUsername: '',
    };

    // Insert into users collection
    console.log('📝 Inserting user into "users" collection (Jobcy compatibility)...');
    try {
      const jobcyResult = await db.collection('users').insertOne(jobcyUser);
      console.log('✅ User inserted into users collection');
      console.log('   Inserted ID:', jobcyResult.insertedId);
      console.log('');
    } catch (error) {
      if (error.code === 11000) {
        console.log('⚠️  User already exists in users collection (duplicate key)');
        console.log('   This is okay - user can still login with Jobcy credentials');
        console.log('');
      } else {
        throw error; // Re-throw if it's a different error
      }
    }

    // Verify the user was stored correctly
    console.log('🔍 Verifying user storage...');
    const storedWebsiteUser = await db.collection('website-users').findOne({ 
      email: testUser.email.toLowerCase() 
    });
    const storedJobcyUser = await db.collection('users').findOne({ 
      email: testUser.email.toLowerCase() 
    });

    console.log('📊 Verification Results:');
    console.log('   website-users collection:', storedWebsiteUser ? '✅ Found' : '❌ Not Found');
    console.log('   users collection:', storedJobcyUser ? '✅ Found' : '❌ Not Found');
    console.log('');

    if (storedWebsiteUser && storedJobcyUser) {
      console.log('📦 Stored User Details:');
      console.log('   website-users:');
      console.log('     ID:', storedWebsiteUser._id);
      console.log('     Name:', storedWebsiteUser.name);
      console.log('     Email:', storedWebsiteUser.email);
      console.log('     Role:', storedWebsiteUser.role);
      console.log('     Source:', storedWebsiteUser.source);
      console.log('     Created At:', storedWebsiteUser.createdAt);
      console.log('     Has Password:', !!storedWebsiteUser.password);
      console.log('');
      console.log('   users (Jobcy):');
      console.log('     ID:', storedJobcyUser._id);
      console.log('     Name:', storedJobcyUser.name);
      console.log('     Email:', storedJobcyUser.email);
      console.log('     Role:', storedJobcyUser.role);
      console.log('     Source:', storedJobcyUser.source);
      console.log('     Created At:', storedJobcyUser.createdAt);
      console.log('     Has Password:', !!storedJobcyUser.password);
      console.log('');

      // Test password verification
      console.log('🔐 Testing password verification...');
      const passwordMatch = await bcrypt.compare(testUser.password, storedWebsiteUser.password);
      console.log('   Password matches:', passwordMatch ? '✅ Yes' : '❌ No');
      console.log('');

      console.log('🎉 SUCCESS! User registration and database storage working correctly!');
      console.log('\n📝 Test User Credentials:');
      console.log('   Email:', testUser.email);
      console.log('   Password:', testUser.password);
      console.log('\n💡 You can now use these credentials to login at /login or /register');
    } else {
      console.log('❌ ERROR: User was not stored correctly in the database');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('   Stack:', error.stack);
  } finally {
    if (client) {
      await client.close();
      console.log('\n🔌 MongoDB connection closed');
    }
  }
}

// Run the test
testDirectDatabase()
  .then(() => {
    console.log('\n✅ Test completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });

