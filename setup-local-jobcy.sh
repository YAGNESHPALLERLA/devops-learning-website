#!/bin/bash

# Simple setup script for local Jobcy integration
# This will help you get Jobcy running locally

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🔧 Setting up Jobcy Portal Locally${NC}"
echo "======================================"
echo

# Step 1: Setup Backend
echo -e "${YELLOW}📡 Step 1: Setting up Jobcy Backend...${NC}"
cd /home/dragon/job-portal/jobcy-backend-main

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env file...${NC}"
    cat > .env << EOF
PORT=5000
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/jobcy
JWT_SECRET=your-super-secret-jwt-key-here-replace-with-random-string
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3002
NODE_ENV=development
EOF
    echo -e "${GREEN}✅ Created .env file${NC}"
    echo -e "${YELLOW}⚠️  Please edit .env file with your MongoDB connection string${NC}"
    echo -e "${YELLOW}   File: /home/dragon/job-portal/jobcy-backend-main/.env${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing backend dependencies...${NC}"
    npm install
fi

# Step 2: Setup Frontend
echo -e "${YELLOW}🌐 Step 2: Setting up Jobcy Frontend...${NC}"
cd /home/dragon/job-portal/jobcy-frontend-main

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}Creating .env.local file...${NC}"
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
EOF
    echo -e "${GREEN}✅ Created .env.local file${NC}"
else
    echo -e "${GREEN}✅ .env.local file already exists${NC}"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Installing frontend dependencies...${NC}"
    npm install
fi

echo
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "======================================"
echo
echo -e "${BLUE}🚀 To start everything:${NC}"
echo
echo -e "${YELLOW}Terminal 1 - Start Jobcy Backend:${NC}"
echo "cd /home/dragon/job-portal/jobcy-backend-main"
echo "npm start"
echo
echo -e "${YELLOW}Terminal 2 - Start Jobcy Frontend:${NC}"
echo "cd /home/dragon/job-portal/jobcy-frontend-main"
echo "PORT=3002 npm run dev"
echo
echo -e "${YELLOW}Terminal 3 - Your DevOps Website (already running):${NC}"
echo "http://localhost:3001"
echo
echo -e "${BLUE}📝 After starting Jobcy:${NC}"
echo "1. Jobcy will be available at: http://localhost:3002"
echo "2. Update your DevOps website to link to local Jobcy:"
echo "   ./update-jobcy-url.sh http://localhost:3002"
echo
echo -e "${GREEN}🎉 Then your 'Apply Now' buttons will work with local Jobcy!${NC}"
