#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of files that need catch block fixes
const filesToFix = [
  'src/app/api/jobcy/admin/companies/route.ts',
  'src/app/api/jobcy/admin/create-hr/route.ts',
  'src/app/api/jobcy/admin/hrs/[id]/route.ts',
  'src/app/api/jobcy/admin/hrs/route.ts',
  'src/app/api/jobcy/admin/stats/route.ts',
  'src/app/api/jobcy/chat/chat/[userId]/route.ts',
  'src/app/api/jobcy/chat/chats/route.ts',
  'src/app/api/jobcy/chat/messages/[chatId]/route.ts',
  'src/app/api/jobcy/company/applications/route.ts',
  'src/app/api/jobcy/company/dashboard/route.ts',
  'src/app/api/jobcy/company/jobs/route.ts',
  'src/app/api/jobcy/connections/[requestId]/accept/route.ts',
  'src/app/api/jobcy/connections/[requestId]/reject/route.ts',
  'src/app/api/jobcy/connections/connections/route.ts',
  'src/app/api/jobcy/connections/received/route.ts',
  'src/app/api/jobcy/connections/send/route.ts',
  'src/app/api/jobcy/connections/sent/route.ts',
  'src/app/api/jobcy/experience/[id]/route.ts',
  'src/app/api/jobcy/experience/route.ts',
  'src/app/api/jobcy/hr/applications/[applicationId]/status/route.ts',
  'src/app/api/jobcy/hr/applications/route.ts',
  'src/app/api/jobcy/hr/dashboard/route.ts',
  'src/app/api/jobcy/hr/jobs/[id]/route.ts',
  'src/app/api/jobcy/hr/jobs/route.ts',
  'src/app/api/jobcy/jobs/apply/[jobId]/route.ts',
  'src/app/api/jobcy/jobs/apply/test/route.ts',
  'src/app/api/jobcy/jobs/apply-job/route.ts',
  'src/app/api/jobcy/upload/resume/route.ts',
  'src/app/api/jobcy/user/applications/route.ts',
  'src/app/api/jobcy/user/interviews/route.ts',
  'src/app/api/jobcy/user/list/route.ts',
  'src/app/api/jobcy/user/me/route.ts',
  'src/app/api/jobcy/user/notifications/[notificationId]/read/route.ts',
  'src/app/api/jobcy/user/notifications/route.ts',
  'src/app/api/jobcy/users/applications/route.ts'
];

function fixCatchBlocks(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Fix catch blocks that don't have error parameter but use error in console.error
    const catchBlockRegex = /} catch \{\s*console\.error\([^,]+,\s*error\);/g;
    const matches = content.match(catchBlockRegex);
    
    if (matches) {
      matches.forEach(match => {
        const fixed = match.replace('} catch {', '} catch (error) {');
        content = content.replace(match, fixed);
        modified = true;
      });
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed catch blocks in ${filePath}`);
    } else {
      console.log(`⚠️  No catch block issues found in ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

console.log('🔧 Fixing catch blocks...\n');

filesToFix.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fixCatchBlocks(filePath);
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n✅ Catch block fixes completed!');
