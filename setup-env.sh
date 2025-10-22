#!/bin/bash

echo "🔧 Setting up Environment Variables for Jobcy Integration..."

# Create .env.local file with the provided values
cat > .env.local << EOF
# Next.js Environment Variables for Integrated Jobcy Portal
NODE_ENV=development

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846

# JWT Configuration
JWT_SECRET=c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846
JWT_EXPIRE=30d

# MongoDB Configuration
MONGO_URI=mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data

# Backend URLs
JOBCY_BACKEND_URL=http://127.0.0.1:5000
JOBCY_API_URL=http://127.0.0.1:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Admin Configuration
ADMIN_EMAIL=admin@ohg365.com
ADMIN_NAME=Admin
ADMIN_PASSWORD=Admin@123
ADMIN_MOBILE=8794561235

# GitHub OAuth (if using)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
EOF

echo "✅ Environment variables created in .env.local"
echo ""
echo "📋 Environment Variables Summary:"
echo "  - NEXTAUTH_URL: http://localhost:3001"
echo "  - JWT_SECRET: [configured]"
echo "  - MONGO_URI: [configured]"
echo "  - BACKEND_URL: http://127.0.0.1:5000"
echo "  - ADMIN_EMAIL: admin@ohg365.com"
echo ""
echo "🚀 Next steps:"
echo "  1. Start the Jobcy backend: ./start-jobcy-backend.sh"
echo "  2. Start Next.js: npm run dev"
echo "  3. Test authentication: node test-auth-integration.js"
echo ""
echo "🔒 For production, set these same values in Vercel dashboard"
