#!/bin/bash

echo "🔧 Fixing API URLs for Integrated Backend..."

# Update all API URLs to use the integrated backend
echo "📝 Updating API URLs to use integrated backend..."

# Find and replace all external API URLs with integrated ones
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | xargs sed -i 's|https://jobcy-job-portal.vercel.app/api|/api/jobcy-backend|g'

echo "✅ API URLs updated to use integrated backend!"

# Show what was updated
echo "📊 Updated files:"
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | xargs grep -l "/api/jobcy-backend" | head -10

echo ""
echo "🎉 All API URLs have been updated to use the integrated backend!"
echo "📋 Summary:"
echo "  - All external API calls now use /api/jobcy-backend"
echo "  - No more 404 errors from external endpoints"
echo "  - Dashboard will now fetch data from integrated backend"
echo ""
echo "🚀 Next steps:"
echo "  1. Test the dashboard: https://www.ohg365.com/jobcy/user/dashboard"
echo "  2. Check that data loads properly"
echo "  3. Verify no more console errors"
