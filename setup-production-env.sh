#!/bin/bash

echo "Setting up production environment variables..."

# Create .env file with the provided credentials
cat > .env << EOF
MONGO_URI=mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data
JWT_SECRET=c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846
EOF

echo "✅ Environment variables created in .env file"
echo "🚀 Now restart your development server: npm run dev"
echo "📝 For production deployment, make sure to set these same variables in Vercel dashboard"
