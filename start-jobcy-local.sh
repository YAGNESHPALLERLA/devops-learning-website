#!/bin/bash

# Script to start Jobcy portal locally alongside DevOps Learning Website
# This will run Jobcy on different ports so both can work together

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Jobcy Portal Locally${NC}"
echo "======================================"
echo

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: Please run this script from the devops-learning-website directory${NC}"
    exit 1
fi

# Create a new terminal session for Jobcy backend
echo -e "${YELLOW}📡 Starting Jobcy Backend (Port 5000)...${NC}"
cd /home/dragon/job-portal/jobcy-backend-main

# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from example...${NC}"
    if [ -f "env.example.txt" ]; then
        cp env.example.txt .env
        echo -e "${YELLOW}📝 Please edit .env file with your MongoDB connection string${NC}"
        echo -e "${YELLOW}   File: /home/dragon/job-portal/jobcy-backend-main/.env${NC}"
    else
        echo -e "${RED}❌ env.example.txt not found${NC}"
        exit 1
    fi
fi

# Start backend in background
echo -e "${GREEN}🔄 Starting Jobcy Backend...${NC}"
gnome-terminal --title="Jobcy Backend" -- bash -c "cd /home/dragon/job-portal/jobcy-backend-main && npm start; exec bash" 2>/dev/null || \
xterm -title "Jobcy Backend" -e "cd /home/dragon/job-portal/jobcy-backend-main && npm start" 2>/dev/null || \
echo -e "${YELLOW}⚠️  Could not open new terminal. Please run manually:${NC}"
echo -e "${YELLOW}   cd /home/dragon/job-portal/jobcy-backend-main && npm start${NC}"

sleep 3

# Start Jobcy frontend
echo -e "${YELLOW}🌐 Starting Jobcy Frontend (Port 3002)...${NC}"
cd /home/dragon/job-portal/jobcy-frontend-main

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local file not found. Creating...${NC}"
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
EOF
    echo -e "${GREEN}✅ Created .env.local with local backend URLs${NC}"
fi

# Start frontend in background
echo -e "${GREEN}🔄 Starting Jobcy Frontend...${NC}"
gnome-terminal --title="Jobcy Frontend" -- bash -c "cd /home/dragon/job-portal/jobcy-frontend-main && PORT=3002 npm run dev; exec bash" 2>/dev/null || \
xterm -title "Jobcy Frontend" -e "cd /home/dragon/job-portal/jobcy-frontend-main && PORT=3002 npm run dev" 2>/dev/null || \
echo -e "${YELLOW}⚠️  Could not open new terminal. Please run manually:${NC}"
echo -e "${YELLOW}   cd /home/dragon/job-portal/jobcy-frontend-main && PORT=3002 npm run dev${NC}"

sleep 3

echo
echo -e "${GREEN}✅ Jobcy Portal Setup Complete!${NC}"
echo "======================================"
echo
echo -e "${BLUE}🌐 Your Applications:${NC}"
echo -e "   • DevOps Learning Website: ${YELLOW}http://localhost:3001${NC}"
echo -e "   • Jobcy Job Portal:         ${YELLOW}http://localhost:3002${NC}"
echo -e "   • Jobcy Backend API:       ${YELLOW}http://localhost:5000${NC}"
echo
echo -e "${BLUE}📝 Next Steps:${NC}"
echo "1. Wait for both servers to start (check terminals)"
echo "2. Update your DevOps website to link to local Jobcy"
echo "3. Test the integration"
echo
echo -e "${YELLOW}💡 To update DevOps website URLs:${NC}"
echo "   ./update-jobcy-url.sh http://localhost:3002"
echo
echo -e "${GREEN}🎉 Both applications are now running locally!${NC}"
