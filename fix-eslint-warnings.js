#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// List of files to fix with their specific issues
const filesToFix = [
  {
    file: 'src/app/api/jobcy/admin/companies/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/admin/create-hr/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/admin/hrs/[id]/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/admin/hrs/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/admin/stats/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/chat/chat/[userId]/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/chat/chats/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/chat/messages/[chatId]/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/company/applications/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/company/dashboard/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/company/jobs/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/connections/[requestId]/accept/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/connections/[requestId]/reject/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/connections/connections/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/connections/received/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/connections/send/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/connections/sent/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/experience/[id]/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/experience/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/hr/applications/[applicationId]/status/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/hr/applications/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/hr/dashboard/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/hr/jobs/[id]/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/hr/jobs/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/jobs/apply/[jobId]/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/jobs/apply/test/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/jobs/apply-job/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/upload/resume/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/user/applications/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/user/interviews/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/user/list/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/user/me/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/user/notifications/[notificationId]/read/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/user/notifications/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  },
  {
    file: 'src/app/api/jobcy/users/applications/route.ts',
    fixes: [
      { from: '} catch (error) {', to: '} catch {' }
    ]
  }
];

function fixFile(filePath, fixes) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    fixes.forEach(fix => {
      if (content.includes(fix.from)) {
        content = content.replace(new RegExp(fix.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), fix.to);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed ${filePath}`);
    } else {
      console.log(`⚠️  No changes needed for ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
  }
}

console.log('🔧 Fixing ESLint warnings...\n');

filesToFix.forEach(({ file, fixes }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    fixFile(filePath, fixes);
  } else {
    console.log(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n✅ ESLint warning fixes completed!');
