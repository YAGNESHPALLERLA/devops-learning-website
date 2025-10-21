#!/bin/bash

# 🔗 Integrate with Deployed Jobcy Portal
# This script configures your DevOps website to use the deployed Jobcy portal

echo "🚀 Integrating with Jobcy Portal..."

# Configuration
JOBCY_BACKEND_URL="https://jobcy-job-portal.vercel.app"
JOBCY_FRONTEND_URL="https://jobcy-job-portal.vercel.app"

# Update API endpoints in all Jobcy files
echo "🔧 Updating API endpoints to use deployed Jobcy backend..."

# Find and update all files that reference API endpoints
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | while read file; do
    if [ -f "$file" ]; then
        echo "📝 Updating $file"
        
        # Update API URL references
        sed -i "s|process.env.NEXT_PUBLIC_API_URL|\"$JOBCY_BACKEND_URL/api\"|g" "$file"
        sed -i "s|localhost:5000|$JOBCY_BACKEND_URL|g" "$file"
        sed -i "s|http://localhost:5000|$JOBCY_BACKEND_URL|g" "$file"
        
        # Update any hardcoded localhost references
        sed -i "s|localhost:3002|$JOBCY_FRONTEND_URL|g" "$file"
        sed -i "s|http://localhost:3002|$JOBCY_FRONTEND_URL|g" "$file"
    fi
done

# Update the main Jobcy page to redirect to the deployed portal
cat > src/app/jobcy/page.tsx << 'EOF'
'use client';

import { useEffect } from 'react';

export default function JobcyPortal() {
  useEffect(() => {
    // Redirect to the deployed Jobcy portal
    window.location.href = 'https://jobcy-job-portal.vercel.app';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500 mx-auto mb-8"></div>
        <h2 className="text-2xl font-bold text-white mb-4">Loading Jobcy Portal...</h2>
        <p className="text-gray-400">Redirecting to the job portal...</p>
      </div>
    </div>
  );
}
EOF

echo "✅ Integration completed!"
echo "🌐 Jobcy Backend: $JOBCY_BACKEND_URL"
echo "🌐 Jobcy Frontend: $JOBCY_FRONTEND_URL"
echo "📁 All API endpoints updated to use deployed backend"

# Show updated files
echo "📊 Updated files:"
find src/app/jobcy -name "*.tsx" -o -name "*.ts" | head -10
