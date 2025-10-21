#!/bin/bash

# 🔄 Sync Jobcy Portal Repository Script
# This script syncs changes from the Jobcy portal repo to your DevOps website

echo "🚀 Starting Jobcy Portal Sync..."

# Configuration
JOBCY_REPO_URL="https://github.com/YAGNESHPALLERLA/job-portal.git"
JOBCY_BACKEND_URL="https://jobcy-job-portal.vercel.app"
TEMP_DIR="jobcy-temp"

# Clean up previous temp directory
if [ -d "$TEMP_DIR" ]; then
    rm -rf "$TEMP_DIR"
fi

# Clone the Jobcy portal repository
echo "📥 Cloning Jobcy portal repository..."
git clone "$JOBCY_REPO_URL" "$TEMP_DIR"

# Navigate to temp directory
cd "$TEMP_DIR"

# Get latest changes
echo "🔄 Pulling latest changes..."
git checkout main
git pull origin main

# Go back to DevOps website directory
cd ..

# Copy Jobcy frontend files
echo "📋 Copying Jobcy frontend files..."
if [ -d "$TEMP_DIR/jobcy-frontend-main/src/app" ]; then
    cp -r "$TEMP_DIR/jobcy-frontend-main/src/app"/* src/app/jobcy/
    echo "✅ Frontend files copied successfully"
else
    echo "❌ Jobcy frontend directory not found"
    exit 1
fi

# Update API endpoints to use the deployed Jobcy backend
echo "🔧 Updating API endpoints..."
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | xargs sed -i "s|process.env.NEXT_PUBLIC_API_URL|\"$JOBCY_BACKEND_URL/api\"|g"
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | xargs sed -i "s|localhost:5000|$JOBCY_BACKEND_URL|g"

# Clean up temp directory
rm -rf "$TEMP_DIR"

echo "✅ Jobcy portal sync completed!"
echo "🌐 Backend API: $JOBCY_BACKEND_URL"
echo "📁 Frontend files updated in src/app/jobcy/"

# Show what was updated
echo "📊 Updated files:"
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | head -10
