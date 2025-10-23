#!/usr/bin/env node

const { MongoClient } = require('mongodb');

async function testJobsDisplay() {
  console.log('🔍 Testing Jobs Display...\n');
  
  try {
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017/jobcy');
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    
    // Check jobs collection
    const jobsCount = await db.collection('jobs').countDocuments();
    console.log(`📊 Total jobs in database: ${jobsCount}`);
    
    if (jobsCount === 0) {
      console.log('❌ No jobs found in database!');
      console.log('💡 Creating sample jobs...');
      
      // Create sample jobs
      const sampleJobs = [
        {
          title: "Software Engineer",
          company: "Tech Corp",
          location: "San Francisco, CA",
          salary: "$80,000 - $120,000",
          type: "Full-time",
          description: "We are looking for a talented software engineer to join our team.",
          skills: ["JavaScript", "React", "Node.js"],
          experienceLevel: "experienced",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "Junior Developer",
          company: "StartupXYZ",
          location: "Remote",
          salary: "$50,000 - $70,000",
          type: "Full-time",
          description: "Great opportunity for fresh graduates to start their career.",
          skills: ["Python", "Django", "SQL"],
          experienceLevel: "fresher",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: "DevOps Engineer",
          company: "CloudTech",
          location: "New York, NY",
          salary: "$90,000 - $130,000",
          type: "Full-time",
          description: "Looking for a DevOps engineer with AWS and Docker experience.",
          skills: ["AWS", "Docker", "Kubernetes", "Terraform"],
          experienceLevel: "experienced",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];
      
      const result = await db.collection('jobs').insertMany(sampleJobs);
      console.log(`✅ Created ${result.insertedCount} sample jobs`);
    }
    
    // Get all jobs
    const jobs = await db.collection('jobs').find({}).toArray();
    console.log(`\n📋 Jobs in database:`);
    jobs.forEach((job, index) => {
      console.log(`${index + 1}. ${job.title} at ${job.company} (${job.location})`);
    });
    
    // Test the browse API format
    console.log('\n🔍 Testing browse API format...');
    const browseJobs = await db.collection('jobs')
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray();
    
    console.log(`✅ Browse API would return ${browseJobs.length} jobs`);
    console.log('📄 Sample job structure:', JSON.stringify(browseJobs[0], null, 2));
    
    await client.close();
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Error testing jobs display:', error);
  }
}

testJobsDisplay();
