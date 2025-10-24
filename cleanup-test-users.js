const { MongoClient } = require('mongodb');

async function cleanupTestUsers() {
  const client = new MongoClient(process.env.MONGO_URI || 'mongodb+srv://yagneshpallerla:yagneshpallerla@cluster0.mongodb.net/jobcy-data?retryWrites=true&w=majority');
  
  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('jobcy-data');
    
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
    
    console.log(`Found ${testUsers.length} test users to remove:`);
    testUsers.forEach(user => {
      console.log(`- ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    if (testUsers.length === 0) {
      console.log('No test users found to remove.');
      return;
    }
    
    // Get test user IDs
    const testUserIds = testUsers.map(user => user._id);
    const testUserStringIds = testUsers.map(user => user._id.toString());
    
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
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await client.close();
    console.log('✅ Database connection closed');
  }
}

// Run the cleanup
cleanupTestUsers().catch(console.error);
