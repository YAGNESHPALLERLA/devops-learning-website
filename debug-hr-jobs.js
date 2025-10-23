#!/usr/bin/env node

const { MongoClient } = require('mongodb');

async function debugHRJobs() {
  console.log('🔍 Debugging HR Jobs Display Issue...\n');
  
  try {
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017/jobcy');
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    
    // Get all jobs
    const allJobs = await db.collection('jobs').find({}).toArray();
    console.log(`📊 Total jobs in database: ${allJobs.length}`);
    
    // Get all users with HR role
    const hrUsers = await db.collection('users').find({ role: 'hr' }).toArray();
    console.log(`👥 HR users in database: ${hrUsers.length}`);
    
    if (hrUsers.length > 0) {
      const hrUser = hrUsers[0];
      console.log(`\n🔍 Analyzing HR User: ${hrUser.name} (${hrUser._id})`);
      
      // Check jobs posted by this HR (string format)
      const stringPostedJobs = await db.collection('jobs').find({ postedBy: hrUser._id.toString() }).toArray();
      console.log(`📋 Jobs with string postedBy: ${stringPostedJobs.length}`);
      
      // Check jobs posted by this HR (ObjectId format)
      const objectIdPostedJobs = await db.collection('jobs').find({ postedBy: hrUser._id }).toArray();
      console.log(`📋 Jobs with ObjectId postedBy: ${objectIdPostedJobs.length}`);
      
      // Check jobs with createdBy field
      const createdByJobs = await db.collection('jobs').find({ createdBy: hrUser._id.toString() }).toArray();
      console.log(`📋 Jobs with string createdBy: ${createdByJobs.length}`);
      
      const objectIdCreatedJobs = await db.collection('jobs').find({ createdBy: hrUser._id }).toArray();
      console.log(`📋 Jobs with ObjectId createdBy: ${objectIdCreatedJobs.length}`);
      
      // Show sample jobs
      if (allJobs.length > 0) {
        console.log('\n📄 Sample jobs in database:');
        allJobs.slice(0, 3).forEach((job, index) => {
          console.log(`${index + 1}. ${job.title} - postedBy: ${job.postedBy} (${typeof job.postedBy}) - createdBy: ${job.createdBy} (${typeof job.createdBy})`);
        });
      }
      
      // Check for any jobs that might belong to this HR
      const possibleHRJobs = await db.collection('jobs').find({
        $or: [
          { postedBy: hrUser._id.toString() },
          { postedBy: hrUser._id },
          { createdBy: hrUser._id.toString() },
          { createdBy: hrUser._id }
        ]
      }).toArray();
      
      console.log(`\n🎯 Total jobs that could belong to this HR: ${possibleHRJobs.length}`);
      
      if (possibleHRJobs.length > 0) {
        console.log('📋 HR Jobs found:');
        possibleHRJobs.forEach((job, index) => {
          console.log(`${index + 1}. ${job.title} - Company: ${job.company} - Status: ${job.status}`);
        });
      }
    }
    
    // Check recent jobs
    const recentJobs = await db.collection('jobs').find({}).sort({ createdAt: -1 }).limit(5).toArray();
    console.log('\n🕒 Recent jobs:');
    recentJobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} - postedBy: ${job.postedBy} - createdBy: ${job.createdBy} - createdAt: ${job.createdAt}`);
    });
    
    await client.close();
    console.log('\n✅ Debug completed successfully!');
    
  } catch (error) {
    console.error('❌ Error debugging HR jobs:', error);
  }
}

debugHRJobs();
