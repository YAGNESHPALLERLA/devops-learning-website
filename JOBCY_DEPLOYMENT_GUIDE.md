# 🚀 Jobcy Portal Deployment Guide

## Current Issue
Your live website `ohg365.com` is trying to connect to `localhost:5000` which doesn't exist in production.

## 🔧 Solutions

### Option 1: Deploy Backend to Railway (Recommended)

1. **Go to Railway.app**
   - Sign up with GitHub
   - Connect your repository

2. **Deploy Backend**
   ```bash
   # In your jobcy-portal/jobcy-backend-main directory
   git add .
   git commit -m "Deploy backend to Railway"
   git push origin main
   ```

3. **Configure Environment Variables in Railway:**
   ```
   PORT=5000
   MONGO_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-jwt-secret
   FRONTEND_URL=https://ohg365.com
   ```

4. **Get Railway URL and Update Frontend:**
   - Railway will give you a URL like: `https://your-app.railway.app`
   - Update your main website's environment:
   ```
   NEXT_PUBLIC_API_URL=https://your-app.railway.app/api
   NEXT_PUBLIC_SOCKET_URL=https://your-app.railway.app
   ```

### Option 2: Deploy Backend to Render

1. **Go to Render.com**
   - Sign up and connect GitHub
   - Create new Web Service

2. **Configure Service:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node

3. **Add Environment Variables:**
   ```
   MONGO_URI=your-mongodb-atlas-connection-string
   JWT_SECRET=your-jwt-secret
   FRONTEND_URL=https://ohg365.com
   ```

### Option 3: Quick Fix - Disable Jobcy Portal Temporarily

If you want to disable the jobcy portal temporarily:

1. **Update Navigation:**
   ```tsx
   // In src/components/navigation.tsx
   <Link 
     href="/coming-soon"  // Change this
     className="relative px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold rounded-lg shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50 hover:bg-gradient-to-r hover:from-red-600 hover:to-rose-700 hover:text-white transform hover:-translate-y-1 transition-all duration-300 animate-pulse hover:animate-none overflow-hidden whitespace-nowrap"
   >
     💼 Apply Jobs (Coming Soon)
   </Link>
   ```

2. **Create Coming Soon Page:**
   ```tsx
   // Create src/app/coming-soon/page.tsx
   export default function ComingSoon() {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-900">
         <div className="text-center">
           <h1 className="text-4xl font-bold text-white mb-4">Job Portal</h1>
           <p className="text-gray-400 mb-8">Coming Soon!</p>
           <p className="text-gray-500">We're working on bringing you the best job portal experience.</p>
         </div>
       </div>
     );
   }
   ```

## 🎯 Recommended Action

**I recommend Option 1 (Railway)** as it's the fastest and most reliable:

1. Deploy your backend to Railway
2. Get the Railway URL
3. Update your environment variables
4. Redeploy your main website

This will make your jobcy portal fully functional on your live website!

## 📞 Need Help?

If you need help with deployment, I can guide you through the Railway deployment process step by step.
