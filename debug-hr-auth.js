#!/usr/bin/env node

const { MongoClient } = require('mongodb');
const jwt = require('jsonwebtoken');

async function debugHRAuth() {
  console.log('🔍 Debugging HR Authentication and Jobs Fetching...\n');
  
  try {
    // Connect to MongoDB
    const client = new MongoClient(process.env.MONGO_URI || 'mongodb://localhost:27017/jobcy');
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db();
    
    // Get all HR users
    const hrUsers = await db.collection('users').find({ role: 'hr' }).toArray();
    console.log(`👥 HR users found: ${hrUsers.length}`);
    
    if (hrUsers.length === 0) {
      console.log('❌ No HR users found in database');
      return;
    }
    
    // Test with the first HR user
    const hrUser = hrUsers[0];
    console.log(`\n🔍 Testing with HR User: ${hrUser.name} (${hrUser._id})`);
    
    // Create a test JWT token
    const testToken = jwt.sign(
      { id: hrUser._id.toString(), role: 'hr' },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '1h' }
    );
    
    console.log(`🔑 Generated test token for user: ${hrUser._id}`);
    
    // Test the exact query that the API uses
    const { ObjectId } = require('mongodb');
    
    // Test ObjectId query (what the API currently does)
    const objectIdQuery = { postedBy: new ObjectId(hrUser._id) };
    const objectIdJobs = await db.collection('jobs').find(objectIdQuery).toArray();
    console.log(`📋 Jobs with ObjectId query: ${objectIdJobs.length}`);
    
    // Test string query (fallback)
    const stringQuery = { postedBy: hrUser._id.toString() };
    const stringJobs = await db.collection('jobs').find(stringQuery).toArray();
    console.log(`📋 Jobs with string query: ${stringJobs.length}`);
    
    // Test with raw _id (no conversion)
    const rawIdQuery = { postedBy: hrUser._id };
    const rawIdJobs = await db.collection('jobs').find(rawIdQuery).toArray();
    console.log(`📋 Jobs with raw _id query: ${rawIdJobs.length}`);
    
    // Show all jobs and their postedBy values
    const allJobs = await db.collection('jobs').find({}).toArray();
    console.log(`\n📊 All jobs in database: ${allJobs.length}`);
    
    console.log('\n📄 Sample jobs with postedBy values:');
    allJobs.slice(0, 5).forEach((job, index) => {
      console.log(`${index + 1}. ${job.title}`);
      console.log(`   postedBy: ${job.postedBy} (type: ${typeof job.postedBy})`);
      console.log(`   createdBy: ${job.createdBy} (type: ${typeof job.createdBy})`);
      console.log(`   HR User ID: ${hrUser._id} (type: ${typeof hrUser._id})`);
      console.log(`   Match ObjectId: ${job.postedBy?.toString() === hrUser._id.toString()}`);
      console.log(`   Match String: ${job.postedBy === hrUser._id.toString()}`);
      console.log('');
    });
    
    // Test the exact API logic
    console.log('🧪 Testing API Logic:');
    
    // Simulate the API's ObjectId conversion
    const hrObjectId = new ObjectId(hrUser._id);
    console.log(`HR ObjectId: ${hrObjectId}`);
    
    const apiQuery = { postedBy: hrObjectId };
    const apiJobs = await db.collection('jobs').find(apiQuery).toArray();
    console.log(`API ObjectId query result: ${apiJobs.length} jobs`);
    
    if (apiJobs.length === 0) {
      console.log('🔍 No jobs found with ObjectId query, testing string fallback...');
      const fallbackQuery = { postedBy: hrUser._id.toString() };
      const fallbackJobs = await db.collection('jobs').find(fallbackQuery).toArray();
      console.log(`Fallback string query result: ${fallbackJobs.length} jobs`);
      
      if (fallbackJobs.length > 0) {
        console.log('✅ Found jobs with string query - this explains the issue!');
        console.log('📋 Fallback jobs:');
        fallbackJobs.forEach((job, index) => {
          console.log(`  ${index + 1}. ${job.title} - postedBy: ${job.postedBy}`);
        });
      }
    } else {
      console.log('✅ Found jobs with ObjectId query');
      console.log('📋 API jobs:');
      apiJobs.forEach((job, index) => {
        console.log(`  ${index + 1}. ${job.title} - postedBy: ${job.postedBy}`);
      });
    }
    
    await client.close();
    console.log('\n✅ Debug completed successfully!');
    
  } catch (error) {
    console.error('❌ Error debugging HR auth:', error);
  }
}

debugHRAuth();
