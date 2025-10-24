// Simple script to remove test users
// Run this with: node remove-test-users.js

const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://yagneshpallerla:yagneshpallerla@cluster0.mongodb.net/jobcy-data?retryWrites=true&w=majority';

async function removeTestUsers() {
  let client;
  
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = client.db('jobcy-data');
    
    // Find test users by email patterns
    const testUsers = await db.collection('users').find({
      $or: [
        { email: { $regex: /test/i } },
        { email: { $regex: /example\.com$/i } },
        { email: { $regex: /company\.com$/i } },
        { email: { $regex: /fixtest/i } },
        { email: { $regex: /resumetest/i } }
      ]
    }).toArray();
    
    console.log(`\n📊 Found ${testUsers.length} test users:`);
    testUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    if (testUsers.length === 0) {
      console.log('✅ No test users found to remove.');
      return;
    }
    
    // Get user IDs for cleanup
    const userIds = testUsers.map(user => user._id);
    const userIdStrings = testUsers.map(user => user._id.toString());
    
    console.log('\n🧹 Starting cleanup...');
    
    // Remove applications from these users
    const applicationsResult = await db.collection('applications').deleteMany({
      $or: [
        { userId: { $in: userIds } },
        { userId: { $in: userIdStrings } }
      ]
    });
    console.log(`✅ Removed ${applicationsResult.deletedCount} applications`);
    
    // Remove jobs posted by these users
    const jobsResult = await db.collection('jobs').deleteMany({
      $or: [
        { postedBy: { $in: userIds } },
        { postedBy: { $in: userIdStrings } }
      ]
    });
    console.log(`✅ Removed ${jobsResult.deletedCount} jobs`);
    
    // Remove the test users
    const usersResult = await db.collection('users').deleteMany({
      _id: { $in: userIds }
    });
    console.log(`✅ Removed ${usersResult.deletedCount} test users`);
    
    console.log('\n🎉 Database cleanup completed!');
    console.log(`📈 Summary:`);
    console.log(`   - Test users removed: ${usersResult.deletedCount}`);
    console.log(`   - Applications removed: ${applicationsResult.deletedCount}`);
    console.log(`   - Jobs removed: ${jobsResult.deletedCount}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('ENOTFOUND')) {
      console.error('💡 Make sure you have internet connection to access MongoDB Atlas');
    }
  } finally {
    if (client) {
      await client.close();
      console.log('✅ Database connection closed');
    }
  }
}

// Run the cleanup
removeTestUsers();
