#!/bin/bash

echo "🚀 Setting up complete production environment configuration..."

# Create comprehensive .env file
cat > .env << EOF
# Database Connection
MONGO_URI=mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data

# JWT Authentication
JWT_SECRET="c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846"
JWT_EXPIRE=30d

# Application Settings
NODE_ENV=production
PORT=3000

# Admin Credentials
ADMIN_EMAIL=admin@ohg365.com
ADMIN_NAME=Admin
ADMIN_PASSWORD=Admin@123

# API Configuration
NEXT_PUBLIC_API_URL=https://www.ohg365.com/api
NEXT_PUBLIC_SOCKET_URL=https://www.ohg365.com

# GitHub OAuth (if needed)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
NEXTAUTH_URL=https://www.ohg365.com/jobcy
NEXTAUTH_SECRET=your_nextauth_secret
EOF

echo "✅ Complete production environment configuration created"
echo ""
echo "📝 Environment Variables Set:"
echo "   ✅ MongoDB connection string"
echo "   ✅ JWT authentication"
echo "   ✅ Admin credentials"
echo "   ✅ API URLs for production"
echo "   ✅ Socket.IO configuration"
echo ""
echo "🔧 For Vercel Deployment:"
echo "1. Copy these variables to Vercel dashboard"
echo "2. Go to Project Settings → Environment Variables"
echo "3. Add each variable with its value"
echo "4. Redeploy your project"
echo ""
echo "🧪 Test the deployment:"
echo "   node test-production-deployment.js"
echo ""
echo "🌐 Production URLs:"
echo "   Main site: https://www.ohg365.com"
echo "   Jobcy portal: https://www.ohg365.com/jobcy/"
echo "   API base: https://www.ohg365.com/api/jobcy/"
