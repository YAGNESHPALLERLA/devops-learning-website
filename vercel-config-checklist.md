# 🔧 Vercel Configuration Checklist

## ✅ **Required Environment Variables**

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://www.ohg365.com
NEXTAUTH_SECRET=c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846

# JWT Configuration
JWT_SECRET=c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846

# Database Configuration
MONGO_URI=mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data

# Backend URLs
JOBCY_BACKEND_URL=https://jobcy-job-portal-production.up.railway.app
JOBCY_API_URL=https://jobcy-job-portal-production.up.railway.app/api
NEXT_PUBLIC_SOCKET_URL=https://jobcy-job-portal-production.up.railway.app

# Admin Configuration
ADMIN_EMAIL=admin@ohg365.com
ADMIN_NAME=Admin
ADMIN_PASSWORD=Admin@123
ADMIN_MOBILE=8794561235

# GitHub OAuth (if using)
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

## 🔧 **Railway Backend CORS Configuration**

Update your Railway backend to allow requests from your domain:

```javascript
// In your Railway backend (wherever it's deployed)
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

// Apply CORS middleware
app.use(cors(corsOptions));
```

## 🐙 **GitHub OAuth Configuration (Optional)**

If using GitHub OAuth, update your GitHub OAuth app:

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Find your OAuth app and update:
   - **Authorization callback URL**: `https://www.ohg365.com/api/jobcy/auth/github`
   - **Homepage URL**: `https://www.ohg365.com/jobcy`

## 🧪 **Testing Steps**

After configuration:

1. **Test User Login**: `https://www.ohg365.com/jobcy/user/auth/login`
   - Email: `abcd@gmail.com`
   - Password: `Nani@123`

2. **Test Admin Login**: `https://www.ohg365.com/jobcy/admin/auth/login`
   - Email: `admin@ohg365.com`
   - Password: `Admin@123`

3. **Test Registration**: `https://www.ohg365.com/jobcy/user/auth/signup`

## 🚨 **Common Issues & Solutions**

### Issue 1: CORS Errors
**Solution**: Update Railway backend CORS settings to include your domain

### Issue 2: 500 Internal Server Error
**Solution**: Check Vercel environment variables are set correctly

### Issue 3: Authentication Fails
**Solution**: Verify JWT_SECRET matches between frontend and backend

### Issue 4: GitHub OAuth Not Working
**Solution**: Update GitHub OAuth app callback URL

## 📋 **Verification Checklist**

- [ ] Environment variables added to Vercel
- [ ] Railway backend CORS configured
- [ ] GitHub OAuth app updated (if using)
- [ ] Test user login works
- [ ] Test admin login works
- [ ] Test registration works
- [ ] No CORS errors in browser console
- [ ] No 500 errors in browser console

## 🚀 **Quick Commands**

```bash
# Test Railway backend connection
node test-railway-backend.js

# Test authentication integration
node test-auth-integration.js

# Check current configuration
grep -r "jobcy-job-portal-production.up.railway.app" src/app/api/jobcy/
```

## 📞 **Support**

If you encounter issues:
1. Check Vercel function logs
2. Check Railway backend logs
3. Verify environment variables
4. Test CORS configuration
