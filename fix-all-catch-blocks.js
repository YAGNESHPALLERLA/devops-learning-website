#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixCatchBlocksInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    
    // Pattern 1: } catch { with console.error using error
    const pattern1 = /} catch \{\s*console\.error\([^,]+,\s*error\);/g;
    const matches1 = content.match(pattern1);
    if (matches1) {
      matches1.forEach(match => {
        const fixed = match.replace('} catch {', '} catch (error) {');
        content = content.replace(match, fixed);
        modified = true;
      });
    }
    
    // Pattern 2: } catch { with console.log using error
    const pattern2 = /} catch \{\s*console\.log\([^,]+,\s*error\);/g;
    const matches2 = content.match(pattern2);
    if (matches2) {
      matches2.forEach(match => {
        const fixed = match.replace('} catch {', '} catch (error) {');
        content = content.replace(match, fixed);
        modified = true;
      });
    }
    
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed catch blocks in ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Error fixing ${filePath}:`, error.message);
    return false;
  }
}

function findApiFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item === 'route.ts') {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

console.log('🔧 Fixing all catch blocks in API routes...\n');

const apiDir = path.join(__dirname, 'src/app/api');
const apiFiles = findApiFiles(apiDir);

let fixedCount = 0;
apiFiles.forEach(file => {
  if (fixCatchBlocksInFile(file)) {
    fixedCount++;
  }
});

console.log(`\n✅ Fixed catch blocks in ${fixedCount} files!`);
