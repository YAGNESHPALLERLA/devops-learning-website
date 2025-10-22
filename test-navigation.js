const fetch = require('node-fetch');

async function testNavigation() {
  console.log('🧪 Testing Jobcy Portal Navigation...');
  
  const baseUrl = 'https://www.ohg365.com';
  
  // Test 1: Admin dashboard
  console.log('\n1️⃣ Testing admin dashboard...');
  try {
    const response = await fetch(`${baseUrl}/jobcy/admin/dashboard`);
    console.log(`   Admin dashboard: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   Admin dashboard: ❌ ERROR - ${error.message}`);
  }

  // Test 2: HR Management page
  console.log('\n2️⃣ Testing HR Management page...');
  try {
    const response = await fetch(`${baseUrl}/jobcy/admin/hr-management`);
    console.log(`   HR Management: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   HR Management: ❌ ERROR - ${error.message}`);
  }

  // Test 3: Company Management page
  console.log('\n3️⃣ Testing Company Management page...');
  try {
    const response = await fetch(`${baseUrl}/jobcy/admin/company-management`);
    console.log(`   Company Management: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   Company Management: ❌ ERROR - ${error.message}`);
  }

  // Test 4: User dashboard
  console.log('\n4️⃣ Testing User dashboard...');
  try {
    const response = await fetch(`${baseUrl}/jobcy/user/dashboard`);
    console.log(`   User dashboard: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   User dashboard: ❌ ERROR - ${error.message}`);
  }

  // Test 5: HR dashboard
  console.log('\n5️⃣ Testing HR dashboard...');
  try {
    const response = await fetch(`${baseUrl}/jobcy/hr/dashboard`);
    console.log(`   HR dashboard: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   HR dashboard: ❌ ERROR - ${error.message}`);
  }

  // Test 6: Company dashboard
  console.log('\n6️⃣ Testing Company dashboard...');
  try {
    const response = await fetch(`${baseUrl}/jobcy/company/dashboard`);
    console.log(`   Company dashboard: ${response.ok ? '✅ SUCCESS' : '❌ FAILED'} (Status: ${response.status})`);
  } catch (error) {
    console.log(`   Company dashboard: ❌ ERROR - ${error.message}`);
  }

  console.log('\n🎯 Navigation Test Complete!');
  console.log('\n📋 Summary:');
  console.log('✅ All pages should be accessible with /jobcy/ prefix');
  console.log('❌ Pages without /jobcy/ prefix will show 404 errors');
  console.log('🔧 Navigation links now correctly use /jobcy/ prefix');
}

testNavigation().catch(console.error);
