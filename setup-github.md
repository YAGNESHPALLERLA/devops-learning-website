# GitHub Setup Instructions

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `devops-learning-website`
3. Description: `Complete DevOps Learning Platform with Video Tutorials - Learn Docker, Kubernetes, Jenkins, Linux, Cloud Computing and more!`
4. Make it **Public**
5. **Don't** initialize with README, .gitignore, or license (we already have these)
6. Click **"Create repository"**

## Step 2: Get Your Repository URL
After creating the repository, GitHub will show you a page with setup instructions. Copy the repository URL that looks like:
`https://github.com/YOUR_USERNAME/devops-learning-website.git`

## Step 3: Run These Commands
Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
git remote add origin https://github.com/YOUR_USERNAME/devops-learning-website.git
git branch -M main
git push -u origin main
```

## Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **"Settings"** tab
3. Scroll down to **"Pages"** section
4. Under **"Source"**, select **"Deploy from a branch"**
5. Select **"main"** branch and **"/ (root)"** folder
6. Click **"Save"**

## Step 5: Your Live Website
Your website will be available at:
`https://YOUR_USERNAME.github.io/devops-learning-website`

## What's Included in This Repository:
- ✅ Complete DevOps learning platform with 12 topics
- ✅ Interactive video tutorial system
- ✅ Responsive design with modern UI
- ✅ Topics: Docker, Kubernetes, Jenkins, Linux, Cloud, Monitoring, etc.
- ✅ Video integration with YouTube thumbnails
- ✅ Built with Next.js 15, TypeScript, and Tailwind CSS
- ✅ Static export ready for GitHub Pages

## Features:
- 🎥 Video tutorials for each topic
- 📱 Mobile-responsive design
- 🎨 Modern dark theme UI
- ⚡ Fast static site generation
- 🔍 Search and navigation
- 📚 Comprehensive DevOps content
