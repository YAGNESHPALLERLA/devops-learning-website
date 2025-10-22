#!/bin/bash

echo "🔧 Configuring Real Jobcy Backend Integration..."

# Get the correct Jobcy backend URL from user
echo "Please provide the correct Jobcy backend URL:"
echo "Examples:"
echo "  - https://jobcy-portal.vercel.app"
echo "  - https://jobcy-railway.app"
echo "  - https://your-jobcy-domain.com"
echo ""
read -p "Enter the Jobcy backend base URL (without /api): " JOBCY_BASE_URL

if [ -z "$JOBCY_BASE_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

# Add /api to the URL
JOBCY_API_URL="$JOBCY_BASE_URL/api"

echo "✅ Using backend API URL: $JOBCY_API_URL"

# Update the API proxy routes
echo "📝 Updating API proxy routes..."

# Update login route
sed -i "s|https://jobcy-job-portal.vercel.app/api/login|$JOBCY_API_URL/login|g" src/app/api/jobcy/login/route.ts
sed -i "s|http://127.0.0.1:5000/api/login|$JOBCY_API_URL/login|g" src/app/api/jobcy/login/route.ts

# Update register route  
sed -i "s|https://jobcy-job-portal.vercel.app/api/user/register|$JOBCY_API_URL/user/register|g" src/app/api/jobcy/register/route.ts
sed -i "s|http://127.0.0.1:5000/api/user/register|$JOBCY_API_URL/user/register|g" src/app/api/jobcy/register/route.ts

# Update general API proxy
sed -i "s|https://jobcy-job-portal.vercel.app/api/\${path}|$JOBCY_API_URL/\${path}|g" src/app/api/jobcy/[...path]/route.ts
sed -i "s|http://127.0.0.1:5000/api/\${path}|$JOBCY_API_URL/\${path}|g" src/app/api/jobcy/[...path]/route.ts

# Update GitHub auth route
sed -i "s|https://jobcy-job-portal.vercel.app/api/auth/github|$JOBCY_API_URL/auth/github|g" src/app/api/jobcy/auth/github/route.ts
sed -i "s|http://127.0.0.1:5000/api/auth/github|$JOBCY_API_URL/auth/github|g" src/app/api/jobcy/auth/github/route.ts

# Update auth general route
sed -i "s|https://jobcy-job-portal.vercel.app/api/auth/\${path}|$JOBCY_API_URL/auth/\${path}|g" src/app/api/jobcy/auth/[...path]/route.ts
sed -i "s|http://127.0.0.1:5000/api/auth/\${path}|$JOBCY_API_URL/auth/\${path}|g" src/app/api/jobcy/auth/[...path]/route.ts

echo "✅ API proxy routes updated!"

# Update vercel.json
echo "📝 Updating vercel.json..."
sed -i "s|https://jobcy-job-portal.vercel.app|$JOBCY_BASE_URL|g" vercel.json

echo "✅ vercel.json updated!"

# Update next.config.ts
echo "📝 Updating next.config.ts..."
sed -i "s|https://jobcy-job-portal.vercel.app|$JOBCY_BASE_URL|g" next.config.ts

echo "✅ next.config.ts updated!"

echo ""
echo "🎉 Real backend URLs configured successfully!"
echo "📋 Summary:"
echo "  - API proxy routes: Updated to use $JOBCY_API_URL"
echo "  - Vercel config: Updated for production"
echo "  - Next.js config: Updated for development"
echo ""
echo "🚀 Next steps:"
echo "  1. Test the connection: node test-vercel-backend.js"
echo "  2. Commit changes: git add . && git commit -m 'Configure real backend'"
echo "  3. Push to GitHub: git push origin main"
echo "  4. Test on production: https://www.ohg365.com/jobcy"
echo ""
echo "⚠️  IMPORTANT: Make sure the Jobcy backend allows CORS from your domain:"
echo "   - https://www.ohg365.com"
echo "   - https://ohg365.com"
