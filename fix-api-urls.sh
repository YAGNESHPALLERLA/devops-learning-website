#!/bin/bash

echo "🔧 Fixing API URLs to use local endpoints..."

# Find all files with external API calls and replace them
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | while read file; do
    if grep -q "jobcy-job-portal.vercel.app" "$file"; then
        echo "Fixing: $file"
        
        # Replace external API URLs with local ones
        sed -i 's|https://jobcy-job-portal\.vercel\.app/api|/api/jobcy|g' "$file"
        
        # Fix specific API endpoints
        sed -i 's|/api/jobcy/login|/api/jobcy/login|g' "$file"
        sed -i 's|/api/jobcy/register|/api/jobcy/register|g' "$file"
        sed -i 's|/api/jobcy/user|/api/jobcy/user|g' "$file"
        sed -i 's|/api/jobcy/hr|/api/jobcy/hr|g' "$file"
        sed -i 's|/api/jobcy/company|/api/jobcy/company|g' "$file"
        sed -i 's|/api/jobcy/admin|/api/jobcy/admin|g' "$file"
        sed -i 's|/api/jobcy/jobs|/api/jobcy/jobs|g' "$file"
        sed -i 's|/api/jobcy/chat|/api/jobcy/chat|g' "$file"
        sed -i 's|/api/jobcy/connections|/api/jobcy/connections|g' "$file"
        sed -i 's|/api/jobcy/upload|/api/jobcy/upload|g' "$file"
    fi
done

echo "✅ API URLs fixed!"
echo ""
echo "📋 Changes made:"
echo "  - Replaced external Vercel API URLs with local /api/jobcy endpoints"
echo "  - All authentication calls now use local API routes"
echo "  - All dashboard data calls now use local API routes"
echo ""
echo "🚀 The Jobcy portal should now work with local APIs!"