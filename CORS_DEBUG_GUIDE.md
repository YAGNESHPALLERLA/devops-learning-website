# 🔧 CORS Debugging Guide

## Current Situation

The login works on `jobcy-job-portal.vercel.app` but fails on `ohg365.com` with the same credentials from MongoDB.

## Possible Issues

### 1. Backend CORS Configuration
The Jobcy backend needs to allow requests from `ohg365.com`:

**Check in Jobcy Backend:**
- Look for CORS middleware configuration
- Should include `https://www.ohg365.com` in allowed origins
- Should include `https://ohg365.com` in allowed origins

### 2. API Proxy Issues
The proxy route might be failing due to:
- Network timeout
- Missing headers
- Backend rejecting proxy requests

### 3. Environment Variables
The Jobcy backend might have environment-specific configurations.

## How to Debug

### Step 1: Check Vercel Logs
1. Go to https://vercel.com
2. Select `devops-learning-website` project
3. Click latest deployment
4. Go to "Runtime Logs" or "Functions" tab
5. Try to login on `ohg365.com`
6. Check what error appears

### Step 2: Check Jobcy Backend CORS
The Jobcy backend repository needs to update CORS settings:

```javascript
// In the Jobcy backend (Express.js example)
const cors = require('cors');

app.use(cors({
  origin: [
    'https://www.ohg365.com',
    'https://ohg365.com',
    'https://jobcy-job-portal.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003'
  ],
  credentials: true
}));
```

### Step 3: Alternative Solution - Use Jobcy Backend Directly
Instead of proxying, update CORS on the Jobcy backend to allow your domain.

**In Jobcy Backend Repository:**
1. Find the CORS configuration file
2. Add your domain to allowed origins
3. Redeploy the Jobcy backend
4. Update your frontend to call the Jobcy API directly

### Step 4: Test Endpoint
Visit: `https://www.ohg365.com/api/test-jobcy`

This will test if the proxy can reach the Jobcy backend.

## Next Steps

Please share:
1. The error from Vercel Runtime Logs
2. Access to the Jobcy backend repository settings
3. Whether you can update the Jobcy backend CORS settings

This will help us fix the login issue permanently!

