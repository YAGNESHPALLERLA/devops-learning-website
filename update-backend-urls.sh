#!/bin/bash

echo "🔧 Updating Backend URLs for Separate Jobcy Deployment..."

# Get the correct Jobcy backend URL from user
echo "Please provide the correct Jobcy backend URL:"
echo "Examples:"
echo "  - https://jobcy-portal.vercel.app/api"
echo "  - https://jobcy-railway.app/api"
echo "  - https://your-jobcy-domain.com/api"
echo ""
read -p "Enter the Jobcy backend API URL: " JOBCY_BACKEND_URL

if [ -z "$JOBCY_BACKEND_URL" ]; then
    echo "❌ No URL provided. Exiting."
    exit 1
fi

echo "✅ Using backend URL: $JOBCY_BACKEND_URL"

# Update the API proxy routes
echo "📝 Updating API proxy routes..."

# Update login route
sed -i "s|https://jobcy-job-portal.vercel.app/api/login|$JOBCY_BACKEND_URL/login|g" src/app/api/jobcy/login/route.ts
sed -i "s|http://127.0.0.1:5000/api/login|$JOBCY_BACKEND_URL/login|g" src/app/api/jobcy/login/route.ts

# Update register route  
sed -i "s|https://jobcy-job-portal.vercel.app/api/user/register|$JOBCY_BACKEND_URL/user/register|g" src/app/api/jobcy/register/route.ts
sed -i "s|http://127.0.0.1:5000/api/user/register|$JOBCY_BACKEND_URL/user/register|g" src/app/api/jobcy/register/route.ts

# Update general API proxy
sed -i "s|https://jobcy-job-portal.vercel.app/api/\${path}|$JOBCY_BACKEND_URL/\${path}|g" src/app/api/jobcy/[...path]/route.ts
sed -i "s|http://127.0.0.1:5000/api/\${path}|$JOBCY_BACKEND_URL/\${path}|g" src/app/api/jobcy/[...path]/route.ts

# Update GitHub auth route
sed -i "s|https://jobcy-job-portal.vercel.app/api/auth/github|$JOBCY_BACKEND_URL/auth/github|g" src/app/api/jobcy/auth/github/route.ts
sed -i "s|http://127.0.0.1:5000/api/auth/github|$JOBCY_BACKEND_URL/auth/github|g" src/app/api/jobcy/auth/github/route.ts

# Update auth general route
sed -i "s|https://jobcy-job-portal.vercel.app/api/auth/\${path}|$JOBCY_BACKEND_URL/auth/\${path}|g" src/app/api/jobcy/auth/[...path]/route.ts
sed -i "s|http://127.0.0.1:5000/api/auth/\${path}|$JOBCY_BACKEND_URL/auth/\${path}|g" src/app/api/jobcy/auth/[...path]/route.ts

echo "✅ API proxy routes updated!"

# Update vercel.json
echo "📝 Updating vercel.json..."
sed -i "s|https://jobcy-job-portal.vercel.app|$JOBCY_BACKEND_URL|g" vercel.json

echo "✅ vercel.json updated!"

# Update next.config.ts
echo "📝 Updating next.config.ts..."
sed -i "s|https://jobcy-job-portal.vercel.app|$JOBCY_BACKEND_URL|g" next.config.ts

echo "✅ next.config.ts updated!"

echo ""
echo "🎉 Backend URLs updated successfully!"
echo "📋 Summary:"
echo "  - API proxy routes: Updated to use $JOBCY_BACKEND_URL"
echo "  - Vercel config: Updated for production"
echo "  - Next.js config: Updated for development"
echo ""
echo "🚀 Next steps:"
echo "  1. Test the connection: node test-vercel-backend.js"
echo "  2. Commit changes: git add . && git commit -m 'Update backend URLs'"
echo "  3. Push to GitHub: git push origin main"
echo "  4. Test on production: https://www.ohg365.com/jobcy"
