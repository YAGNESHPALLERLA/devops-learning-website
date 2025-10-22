# 🚀 Vercel Environment Variables Setup Guide

## ❌ **Current Issue**
The production deployment is showing "Application error" because environment variables are not set in Vercel.

## ✅ **Solution: Set Environment Variables in Vercel**

### **Step 1: Access Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Sign in to your account
3. Find your project: `devops-learning-website`
4. Click on the project

### **Step 2: Navigate to Environment Variables**
1. Click on **"Settings"** tab
2. Click on **"Environment Variables"** in the left sidebar
3. Click **"Add New"** for each variable

### **Step 3: Add Required Environment Variables**

Add these variables one by one:

#### **Database Connection:**
```
Name: MONGO_URI
Value: mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data
Environment: Production, Preview, Development
```

#### **JWT Authentication:**
```
Name: JWT_SECRET
Value: c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846
Environment: Production, Preview, Development
```

#### **JWT Expiration:**
```
Name: JWT_EXPIRE
Value: 30d
Environment: Production, Preview, Development
```

#### **Application Settings:**
```
Name: NODE_ENV
Value: production
Environment: Production, Preview, Development
```

```
Name: PORT
Value: 3000
Environment: Production, Preview, Development
```

#### **Admin Credentials:**
```
Name: ADMIN_EMAIL
Value: admin@ohg365.com
Environment: Production, Preview, Development
```

```
Name: ADMIN_NAME
Value: Admin
Environment: Production, Preview, Development
```

```
Name: ADMIN_PASSWORD
Value: Admin@123
Environment: Production, Preview, Development
```

#### **API Configuration:**
```
Name: NEXT_PUBLIC_API_URL
Value: https://www.ohg365.com/api
Environment: Production, Preview, Development
```

```
Name: NEXT_PUBLIC_SOCKET_URL
Value: https://www.ohg365.com
Environment: Production, Preview, Development
```

### **Step 4: Redeploy**
After adding all environment variables:
1. Go to **"Deployments"** tab
2. Click **"Redeploy"** on the latest deployment
3. Or push a new commit to trigger automatic redeploy

## 🧪 **Testing After Setup**

### **Test 1: Database Connection**
Visit: `https://www.ohg365.com/api/jobcy/test-connection`

**Expected Response:**
```json
{
  "success": true,
  "collections": ["users", "jobs", "applications", ...],
  "userCount": 27
}
```

### **Test 2: Main Jobcy Page**
Visit: `https://www.ohg365.com/jobcy/`

**Expected Result:**
- Page loads without "Application error"
- Dashboard shows real data instead of mock data

### **Test 3: User Registration**
1. Visit: `https://www.ohg365.com/jobcy/user/auth/signup`
2. Create a new account
3. Verify it redirects to dashboard with real data

## 🔍 **Troubleshooting**

### **If Still Getting "Application Error":**

1. **Check Environment Variables:**
   - Verify all variables are set in Vercel
   - Check that they're enabled for "Production" environment
   - Ensure no extra spaces or characters

2. **Check Vercel Logs:**
   - Go to Vercel dashboard → Functions tab
   - Check for any error logs
   - Look for database connection errors

3. **Test API Endpoints:**
   ```bash
   # Test database connection
   curl https://www.ohg365.com/api/jobcy/test-connection
   
   # Test jobs API
   curl https://www.ohg365.com/api/jobcy/jobs/browse
   ```

### **Common Issues:**

1. **Environment Variables Not Set:**
   - Solution: Add all variables in Vercel dashboard

2. **Database Connection Failed:**
   - Solution: Check MONGO_URI is correct
   - Verify MongoDB Atlas cluster is running

3. **JWT Token Issues:**
   - Solution: Check JWT_SECRET is set correctly

## ✅ **Success Criteria**

After setting environment variables:
- ✅ No more "Application error"
- ✅ Dashboard loads with real data
- ✅ User registration works
- ✅ API endpoints return correct data
- ✅ Database connection successful

## 📞 **Need Help?**

If you're still having issues:
1. Check Vercel dashboard for deployment logs
2. Verify all environment variables are set
3. Test the API endpoints individually
4. Check MongoDB Atlas cluster status

The Jobcy portal should work perfectly once environment variables are set! 🚀
