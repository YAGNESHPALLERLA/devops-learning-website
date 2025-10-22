#!/bin/bash

# 🚀 Start Jobcy Backend Script
# This script helps you start the Jobcy backend with the correct environment variables

echo "🚀 Starting Jobcy Backend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Create .env file for Jobcy backend
echo "📝 Creating .env file for Jobcy backend..."
cat > jobcy-backend/.env << EOF
PORT=5000
MONGO_URI=mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data
JWT_SECRET="c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846"
JWT_EXPIRE=30d
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NODE_ENV=development
ADMIN_EMAIL=admin@ohg365.com
ADMIN_NAME=Admin
ADMIN_PASSWORD=Admin@123
ADMIN_MOBILE=8794561235
EOF

echo "✅ .env file created"

# Check if jobcy-backend directory exists
if [ ! -d "jobcy-backend" ]; then
    echo "📥 Cloning Jobcy backend repository..."
    git clone https://github.com/Karthik2340/jobcy-job-portal.git jobcy-backend
    cd jobcy-backend
    git checkout main
else
    echo "📁 Jobcy backend directory exists, updating..."
    cd jobcy-backend
    git pull origin main
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start the backend
echo "🚀 Starting Jobcy backend on port 5000..."
echo "🌐 Backend will be available at: http://localhost:5000"
echo "🔗 API will be available at: http://localhost:5000/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm start
