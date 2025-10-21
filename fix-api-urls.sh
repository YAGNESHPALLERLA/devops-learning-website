#!/bin/bash

# 🔧 Fix Corrupted API URLs
echo "🔧 Fixing corrupted API URLs..."

# Fix all corrupted URLs in Jobcy files
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | while read file; do
    if [ -f "$file" ]; then
        echo "📝 Fixing $file"
        
        # Fix corrupted URLs
        sed -i 's|http://https://jobcy-job-portal.vercel.app|https://jobcy-job-portal.vercel.app|g' "$file"
        sed -i 's|"https://jobcy-job-portal.vercel.app/api" || "http://https://jobcy-job-portal.vercel.app"|"https://jobcy-job-portal.vercel.app/api"|g' "$file"
        sed -i 's|"https://jobcy-job-portal.vercel.app/api" || "http://https://jobcy-job-portal.vercel.app/api"|"https://jobcy-job-portal.vercel.app/api"|g' "$file"
        
        # Fix any remaining corrupted patterns
        sed -i 's|http://https://|https://|g' "$file"
        sed -i 's|https://https://|https://|g' "$file"
    fi
done

echo "✅ API URLs fixed!"
echo "📊 Fixed files:"
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | head -10
