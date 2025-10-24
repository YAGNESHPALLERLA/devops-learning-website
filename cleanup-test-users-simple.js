const { connectDB } = require('./src/lib/mongodb');

async function cleanupTestUsers() {
  try {
    console.log('🔄 Connecting to database...');
    const db = await connectDB();
    console.log('✅ Connected to MongoDB');
    
    // Identify test users by email patterns
    const testEmailPatterns = [
      /test.*@.*\.com$/i,
      /.*test.*@.*\.com$/i,
      /.*testhr.*@.*\.com$/i,
      /.*testuser.*@.*\.com$/i,
      /.*fixtest.*@.*\.com$/i,
      /.*resumetest.*@.*\.com$/i,
      /.*@example\.com$/i,
      /.*@company\.com$/i
    ];
    
    // Find all test users
    const testUsers = await db.collection('users').find({
      $or: testEmailPatterns.map(pattern => ({ email: { $regex: pattern } }))
    }).toArray();
    
    console.log(`\n📊 Found ${testUsers.length} test users to remove:`);
    testUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    if (testUsers.length === 0) {
      console.log('✅ No test users found to remove.');
      return;
    }
    
    // Get test user IDs
    const testUserIds = testUsers.map(user => user._id);
    const testUserStringIds = testUsers.map(user => user._id.toString());
    
    console.log('\n🧹 Starting cleanup process...');
    
    // Remove applications from test users
    const applicationsResult = await db.collection('applications').deleteMany({
      $or: [
        { userId: { $in: testUserIds } },
        { userId: { $in: testUserStringIds } }
      ]
    });
    console.log(`✅ Removed ${applicationsResult.deletedCount} applications from test users`);
    
    // Remove jobs posted by test users
    const jobsResult = await db.collection('jobs').deleteMany({
      $or: [
        { postedBy: { $in: testUserIds } },
        { postedBy: { $in: testUserStringIds } }
      ]
    });
    console.log(`✅ Removed ${jobsResult.deletedCount} jobs posted by test users`);
    
    // Remove test users
    const usersResult = await db.collection('users').deleteMany({
      _id: { $in: testUserIds }
    });
    console.log(`✅ Removed ${usersResult.deletedCount} test users`);
    
    console.log('\n🎉 Database cleanup completed successfully!');
    console.log('📈 Summary:');
    console.log(`   - Test users removed: ${usersResult.deletedCount}`);
    console.log(`   - Applications removed: ${applicationsResult.deletedCount}`);
    console.log(`   - Jobs removed: ${jobsResult.deletedCount}`);
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    console.error('Full error:', error);
  }
}

// Run the cleanup
cleanupTestUsers().catch(console.error);
