#!/bin/bash

# 🚀 Deployment Script for Option 2: Same Domain with Subdirectories
# This script helps you deploy both applications to the same domain

echo "🚀 Starting Option 2 Deployment Setup..."

# Step 1: Build the DevOps website
echo "📦 Building DevOps Learning Website..."
npm run build

# Step 2: Copy Jobcy portal files to the build directory
echo "📋 Copying Jobcy Portal files..."
cp -r /home/dragon/job-portal/jobcy-frontend-main/dist/* ./out/jobcy/ 2>/dev/null || echo "Note: Jobcy build directory not found. You'll need to build Jobcy separately."

# Step 3: Create deployment structure
echo "📁 Creating deployment structure..."
mkdir -p ./out/jobcy

# Step 4: Create a simple redirect page for /jobcy/
cat > ./out/jobcy/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Jobcy Portal</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .container {
            text-align: center;
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #3498db;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 2s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        h1 { color: #333; margin-bottom: 1rem; }
        p { color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h1>Loading Jobcy Portal...</h1>
        <p>Redirecting to the job portal...</p>
        <script>
            // Redirect to the actual Jobcy portal
            // In production, this would be your deployed Jobcy portal
            window.location.href = 'http://localhost:3002';
        </script>
    </div>
</body>
</html>
EOF

echo "✅ Deployment structure created!"

# Step 5: Instructions
echo ""
echo "🎯 Next Steps for Option 2 Deployment:"
echo ""
echo "1. 📦 Build your Jobcy portal:"
echo "   cd /home/dragon/job-portal/jobcy-frontend-main"
echo "   npm run build"
echo ""
echo "2. 📋 Copy Jobcy build files to your DevOps website:"
echo "   cp -r /home/dragon/job-portal/jobcy-frontend-main/out/* ./out/jobcy/"
echo ""
echo "3. 🌐 Deploy the entire 'out' directory to your domain"
echo ""
echo "4. 🔧 Update the redirect URL in ./out/jobcy/index.html"
echo "   Change 'http://localhost:3002' to your actual Jobcy portal URL"
echo ""
echo "5. ✅ Test your deployment:"
echo "   - Visit yourdomain.com (DevOps website)"
echo "   - Click 'Apply Now' button"
echo "   - Should redirect to yourdomain.com/jobcy/"
echo ""
echo "📝 Alternative: Deploy Jobcy separately and update redirect URL"
echo "   - Deploy Jobcy to a subdomain: jobcy.yourdomain.com"
echo "   - Update redirect URL in the code"
echo ""
echo "🎉 Option 2 setup complete!"
