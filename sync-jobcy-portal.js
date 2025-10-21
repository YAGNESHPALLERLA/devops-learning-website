#!/usr/bin/env node

/**
 * Sync JobCy Portal into OneHubGlobal
 * This script syncs the JobCy portal repository into the OneHubGlobal app
 * so updates to the JobCy repo are automatically reflected
 */

const fs = require('fs');
const path = require('path');

const JOBCY_FRONTEND = path.join(__dirname, 'jobcy-frontend', 'src', 'app');
const JOBCY_SRC = path.join(__dirname, 'jobcy-frontend', 'src');
const TARGET_JOBS_DIR = path.join(__dirname, 'src', 'app', 'jobs');
const TARGET_APP_DIR = path.join(__dirname, 'src', 'app');

// Pages to sync from JobCy portal
const pagesToSync = [
  'page.tsx',
  'admin',
  'company',
  'hr',
  'user'
];

// Shared types to sync to root app directory
const sharedTypes = ['types'];

console.log('🔄 Syncing JobCy Portal into OneHubGlobal...\n');

// Create jobs directory if it doesn't exist
if (!fs.existsSync(TARGET_JOBS_DIR)) {
  fs.mkdirSync(TARGET_JOBS_DIR, { recursive: true });
  console.log('✅ Created /src/app/jobs directory');
}

// Function to copy directory recursively
function copyRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Sync each page/directory
pagesToSync.forEach(item => {
  const sourcePath = path.join(JOBCY_FRONTEND, item);
  const targetPath = path.join(TARGET_JOBS_DIR, item);
  
  if (fs.existsSync(sourcePath)) {
    try {
      const stats = fs.statSync(sourcePath);
      
      if (stats.isDirectory()) {
        console.log(`📁 Syncing directory: ${item}`);
        copyRecursive(sourcePath, targetPath);
      } else {
        console.log(`📄 Syncing file: ${item}`);
        fs.copyFileSync(sourcePath, targetPath);
      }
      
      console.log(`   ✅ ${item} synced successfully`);
    } catch (error) {
      console.error(`   ❌ Error syncing ${item}:`, error.message);
    }
  } else {
    console.log(`   ⚠️  ${item} not found in JobCy portal`);
  }
});

// Sync shared types to app root
console.log('\n📦 Syncing shared types...');
sharedTypes.forEach(item => {
  const sourcePath = path.join(JOBCY_FRONTEND, item);
  const targetPath = path.join(TARGET_APP_DIR, item);
  
  if (fs.existsSync(sourcePath)) {
    try {
      console.log(`📁 Syncing shared: ${item}`);
      copyRecursive(sourcePath, targetPath);
      console.log(`   ✅ ${item} synced to app root`);
    } catch (error) {
      console.error(`   ❌ Error syncing ${item}:`, error.message);
    }
  }
});

console.log('\n✅ JobCy Portal sync complete!');
console.log('📍 Portal available at: /jobs route');
console.log('🔗 Submodule: jobcy-portal tracks the JobCy repository\n');

