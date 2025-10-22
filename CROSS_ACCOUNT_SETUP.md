# 🔗 Cross-Account Jobcy Integration Setup

## 📋 **Current Setup:**
- **Main Site**: `https://www.ohg365.com` (your Vercel account)
- **Jobcy Portal**: Deployed separately (different account)
- **Need**: Connect them securely

## 🚀 **Step-by-Step Configuration:**

### **Step 1: Get the Correct Backend URL**

You need to provide the correct Jobcy backend URL. It could be:

**If on Vercel:**
- `https://jobcy-portal.vercel.app/api`
- `https://your-jobcy-app.vercel.app/api`

**If on Railway:**
- `https://your-app.railway.app/api`
- `https://jobcy-backend.railway.app/api`

**If on other platform:**
- `https://your-domain.com/api`

### **Step 2: Update Backend URLs**

Run this script to update all URLs:

```bash
./update-backend-urls.sh
```

### **Step 3: Configure CORS on Jobcy Backend**

The Jobcy backend needs to allow requests from your main domain. Add this to the Jobcy backend's CORS configuration:

```javascript
// In the Jobcy backend (wherever it's deployed)
const corsOptions = {
  origin: [
    'https://www.ohg365.com',
    'https://ohg365.com',
    'http://localhost:3001', // for development
    'http://localhost:3000'  // for development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

### **Step 4: Update Environment Variables**

In your main site's Vercel dashboard, add:

```bash
JOBCY_BACKEND_URL=https://your-jobcy-backend-url.com
JOBCY_API_URL=https://your-jobcy-backend-url.com/api
```

### **Step 5: Test the Connection**

```bash
# Test if the backend is accessible
node test-vercel-backend.js

# Test the full authentication flow
node test-auth-integration.js
```

## 🔧 **Common Issues & Solutions:**

### **Issue 1: CORS Errors**
**Solution**: Update the Jobcy backend's CORS settings to allow your domain.

### **Issue 2: 404 Not Found**
**Solution**: Check if the API endpoints exist on the Jobcy backend.

### **Issue 3: 500 Internal Server Error**
**Solution**: Check the Jobcy backend logs for database connection issues.

### **Issue 4: Authentication Fails**
**Solution**: Ensure the Jobcy backend has the same JWT secret and database.

## 📝 **Required Information:**

To proceed, I need:

1. **Jobcy Backend URL**: The actual URL where the Jobcy API is running
2. **Authentication Method**: How does the Jobcy backend handle auth?
3. **Database**: Is it using the same MongoDB instance?

## 🎯 **Expected Result:**

After configuration:
- ✅ Login works from `https://www.ohg365.com/jobcy`
- ✅ Registration works
- ✅ All API calls go to the correct backend
- ✅ CORS issues resolved
- ✅ Authentication flows properly

## 🚀 **Quick Start:**

1. **Provide the Jobcy backend URL**
2. **Run**: `./update-backend-urls.sh`
3. **Test**: `node test-vercel-backend.js`
4. **Deploy**: `git push origin main`
5. **Verify**: Test on `https://www.ohg365.com/jobcy`

Let me know the correct Jobcy backend URL and I'll help you configure everything! 🚀
