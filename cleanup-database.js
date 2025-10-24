const fetch = require('node-fetch');

async function cleanupDatabase() {
  try {
    console.log('🔄 Starting database cleanup...');
    
    // First, let's get all users to see what we have
    console.log('📊 Fetching all users...');
    const usersResponse = await fetch('http://localhost:3001/api/jobcy/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!usersResponse.ok) {
      console.log('❌ Could not fetch users. Make sure the server is running.');
      return;
    }
    
    const users = await usersResponse.json();
    console.log(`Found ${users.length} total users`);
    
    // Identify test users
    const testUsers = users.filter(user => {
      const email = user.email.toLowerCase();
      return email.includes('test') || 
             email.includes('example.com') || 
             email.includes('company.com') ||
             email.includes('fixtest') ||
             email.includes('resumetest');
    });
    
    console.log(`\n📊 Found ${testUsers.length} test users to remove:`);
    testUsers.forEach((user, index) => {
      console.log(`${index + 1}. ${user.name} (${user.email}) - Role: ${user.role}`);
    });
    
    if (testUsers.length === 0) {
      console.log('✅ No test users found to remove.');
      return;
    }
    
    console.log('\n🧹 Starting cleanup process...');
    
    // Remove each test user
    let removedCount = 0;
    for (const user of testUsers) {
      try {
        const deleteResponse = await fetch(`http://localhost:3001/api/jobcy/users/${user.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (deleteResponse.ok) {
          console.log(`✅ Removed: ${user.name} (${user.email})`);
          removedCount++;
        } else {
          console.log(`❌ Failed to remove: ${user.name} (${user.email})`);
        }
      } catch (error) {
        console.log(`❌ Error removing ${user.name}: ${error.message}`);
      }
    }
    
    console.log(`\n🎉 Cleanup completed! Removed ${removedCount} test users.`);
    
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
  }
}

// Run the cleanup
cleanupDatabase().catch(console.error);
