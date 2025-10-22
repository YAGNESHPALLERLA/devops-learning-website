#!/bin/bash

echo "Setting up local MongoDB for Jobcy development..."

# Update environment for local MongoDB
cat > .env.local << EOF
# Local MongoDB Connection
MONGO_URI=mongodb://localhost:27017/jobcy-data

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-123456789

# GitHub OAuth (if needed)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# NextAuth (if needed)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-123456789
EOF

echo "✅ Environment configured for local MongoDB"
echo "📝 Make sure MongoDB is running locally:"
echo "   - Ubuntu/Debian: sudo systemctl start mongodb"
echo "   - macOS: brew services start mongodb-community"
echo "   - Windows: net start MongoDB"
echo ""
echo "🚀 Now restart your development server: npm run dev"
