#!/bin/bash

echo "Setting up environment variables for Jobcy integration..."

# Create .env.local file
cat > .env.local << EOF
# MongoDB Connection
MONGO_URI=mongodb+srv://yagneshpallerla:yagneshpallerla@cluster0.mongodb.net/jobcy-data?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-123456789

# GitHub OAuth (if needed)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# NextAuth (if needed)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-123456789
EOF

echo "✅ Environment variables created in .env.local"
echo "⚠️  Please update the MongoDB URI and JWT secret with your actual values"
echo "📝 For production deployment, set these environment variables in Vercel dashboard"
