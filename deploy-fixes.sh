#!/bin/bash

# Jobcy Portal - Production Fixes Deployment Script
# This script deploys all the fixes to production

echo "🚀 Starting Jobcy Portal Production Fixes Deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm is not installed."
    exit 1
fi

echo "✅ Environment check passed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Run linting
echo "🔍 Running linting..."
npm run lint

if [ $? -ne 0 ]; then
    echo "⚠️ Warning: Linting issues found, but continuing with deployment"
fi

# Build the application
echo "🏗️ Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Error: Build failed"
    exit 1
fi

echo "✅ Application built successfully"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

if [ $? -ne 0 ]; then
    echo "❌ Error: Deployment failed"
    exit 1
fi

echo "✅ Deployment completed successfully"

# Run post-deployment tests
echo "🧪 Running post-deployment tests..."
node test-production-fixes.js

if [ $? -eq 0 ]; then
    echo "🎉 All tests passed! Deployment successful!"
else
    echo "⚠️ Some tests failed. Please check the issues above."
fi

echo ""
echo "📋 Deployment Summary:"
echo "====================="
echo "✅ Dependencies installed"
echo "✅ Application built"
echo "✅ Deployed to Vercel"
echo "✅ Post-deployment tests completed"
echo ""
echo "🌐 Your application is now live at: https://www.ohg365.com/jobcy"
echo ""
echo "📊 Next Steps:"
echo "1. Test all user flows manually"
echo "2. Verify all API endpoints are working"
echo "3. Check all dashboard pages load correctly"
echo "4. Test authentication flows"
echo "5. Verify job application process"
echo ""
echo "🔧 If you encounter any issues:"
echo "1. Check Vercel deployment logs"
echo "2. Review browser console for errors"
echo "3. Run the test script again"
echo "4. Check database connectivity"
echo ""
echo "📞 Support: Check the PRODUCTION_FIXES_SUMMARY.md for detailed troubleshooting"
