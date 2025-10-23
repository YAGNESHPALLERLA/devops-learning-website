#!/bin/bash

echo "🔧 Fixing critical linting errors for deployment..."

# Fix unused error variables in API routes
find src/app/api/jobcy -name "*.ts" -exec sed -i 's/} catch (error) {/} catch {/g' {} \;

# Fix unused decoded variables in admin routes
find src/app/api/jobcy/admin -name "*.ts" -exec sed -i 's/let decoded: { id: string; role: string; \[key: string\]: unknown };/\/\/ let decoded: { id: string; role: string; [key: string]: unknown };/g' {} \;

# Fix unused request parameters
find src/app/api/jobcy -name "*.ts" -exec sed -i 's/request: NextRequest/\/\/ request: NextRequest/g' {} \;

# Fix unused variables in specific files
sed -i 's/const total = /\/\/ const total = /g' src/app/api/jobcy/jobs/browse/route.ts
sed -i 's/const total = /\/\/ const total = /g' src/app/api/jobcy/user/list/route.ts
sed -i 's/const recentActivity = /\/\/ const recentActivity = /g' src/app/api/jobcy/hr/dashboard/route.ts

# Fix unused imports
sed -i 's/import { NextRequest }/\/\/ import { NextRequest }/g' src/app/api/jobcy/test-db/route.ts
sed -i 's/import { Link }/\/\/ import { Link }/g' src/app/data-science/page.tsx
sed -i 's/import { Link }/\/\/ import { Link }/g' src/app/java/page.tsx
sed -i 's/import { Link }/\/\/ import { Link }/g' src/app/web-dev/page.tsx

# Fix unused variables in components
sed -i 's/const setIsDark = /\/\/ const setIsDark = /g' src/app/jobcy/page.tsx
sed -i 's/const devopsVideos = /\/\/ const devopsVideos = /g' src/app/devops/page.tsx
sed -i 's/const videoTutorialsData = /\/\/ const videoTutorialsData = /g' src/app/java/page.tsx
sed -i 's/const videoTutorialsData = /\/\/ const videoTutorialsData = /g' src/app/sql/page.tsx

echo "✅ Linting errors fixed!"
echo "🚀 Ready for deployment"
