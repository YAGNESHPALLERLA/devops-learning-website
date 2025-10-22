#!/bin/bash

echo "Setting up complete environment configuration..."

# Create comprehensive .env file with all required variables
cat > .env << EOF
PORT=5000
MONGO_URI=mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data
JWT_SECRET=c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846
JWT_EXPIRE=30d

# Backend Socket.IO URL (without /api path)
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Node Environment
NODE_ENV=development

# Admin Configuration
ADMIN_EMAIL=admin@ohg365.com
ADMIN_NAME=Admin
ADMIN_PASSWORD=Admin@123

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
# NEXT_PUBLIC_API_URL=https://jobcy-backend-1ycs.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NODE_ENV=development
EOF

echo "✅ Complete environment configuration created"
echo "📝 All required variables set:"
echo "   - MongoDB connection"
echo "   - JWT authentication"
echo "   - Admin credentials"
echo "   - API URLs"
echo "   - Socket.IO configuration"
echo ""
echo "🚀 Now restart your development server: npm run dev"
