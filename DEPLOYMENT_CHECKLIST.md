# ✅ Option 2 Deployment Checklist

## 🎯 **Your Setup: Same Domain with Subdirectories**

**URLs:**
- **DevOps Website**: `yourdomain.com`
- **Jobcy Portal**: `yourdomain.com/jobcy/`

## 📋 **Deployment Steps**

### ✅ **Step 1: Build Applications**

#### Build DevOps Website
```bash
cd /home/dragon/devops-learning-website
npm run build
```

#### Build Jobcy Portal
```bash
cd /home/dragon/job-portal/jobcy-frontend-main
npm run build
```

### ✅ **Step 2: Deploy to Your Domain**

#### Option A: Vercel (Recommended)
1. **Deploy DevOps website** to Vercel
2. **Deploy Jobcy portal** as separate Vercel project
3. **Configure custom domain**
4. **Update redirect URL** in code

#### Option B: Manual Upload
1. **Upload DevOps website** to domain root
2. **Create `/jobcy/` directory**
3. **Upload Jobcy portal** to `/jobcy/` directory
4. **Configure web server**

### ✅ **Step 3: Update Configuration**

The redirect code is already configured in `/src/app/jobcy/page.tsx`:

```javascript
const jobcyUrl = process.env.NODE_ENV === 'production' 
  ? `${window.location.origin}/jobcy/`  // Same domain, subdirectory
  : 'http://localhost:3002';
```

### ✅ **Step 4: Test Deployment**

1. **Visit your domain**: `https://yourdomain.com`
2. **Click "Apply Now" button**
3. **Should redirect to**: `https://yourdomain.com/jobcy/`
4. **Test Jobcy functionality**

## 🚀 **Quick Deployment Commands**

```bash
# Build DevOps website
npm run build

# Build Jobcy portal
cd /home/dragon/job-portal/jobcy-frontend-main
npm run build

# Copy Jobcy files (if using manual deployment)
cp -r /home/dragon/job-portal/jobcy-frontend-main/out/* ./out/jobcy/
```

## 🎉 **Success Indicators**

- [ ] DevOps website loads at your domain
- [ ] "Apply Now" button works
- [ ] Redirects to `/jobcy/` correctly
- [ ] Jobcy portal loads and functions
- [ ] All authentication flows work
- [ ] Mobile responsive

## 🔧 **Troubleshooting**

### Common Issues:
- **404 on Jobcy routes**: Configure web server for SPA routing
- **CORS errors**: Update Jobcy backend CORS settings
- **Redirect loops**: Check URL configuration

### Debug:
1. Check browser console
2. Verify file paths
3. Test API endpoints
4. Check web server logs

## 📞 **Need Help?**

If you encounter issues:
1. Check the browser console for errors
2. Verify your web server configuration
3. Test with different browsers
4. Check your domain DNS settings

**Your Option 2 setup is ready! 🚀**
