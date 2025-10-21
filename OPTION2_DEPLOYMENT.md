# 🚀 Option 2: Same Domain Deployment Guide

## Overview
Deploy both your DevOps learning website and Jobcy portal to the same domain using subdirectories.

**URL Structure:**
- **DevOps Website**: `yourdomain.com`
- **Jobcy Portal**: `yourdomain.com/jobcy/`

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Applications

#### 1.1 Build DevOps Website
```bash
cd /home/dragon/devops-learning-website
npm run build
```

#### 1.2 Build Jobcy Portal
```bash
cd /home/dragon/job-portal/jobcy-frontend-main
npm run build
```

### Step 2: Deploy to Your Domain

#### Option A: Manual Deployment (Static Hosting)

1. **Upload DevOps website** to your domain root
2. **Create `/jobcy/` directory** on your server
3. **Upload Jobcy portal files** to `/jobcy/` directory
4. **Configure web server** (Apache/Nginx) for routing

#### Option B: Vercel Deployment (Recommended)

1. **Deploy DevOps website** to Vercel
2. **Deploy Jobcy portal** as a separate Vercel project
3. **Configure custom domain** for Jobcy
4. **Update redirect URL** in your code

#### Option C: Netlify Deployment

1. **Deploy DevOps website** to Netlify
2. **Deploy Jobcy portal** to Netlify
3. **Configure redirects** in `_redirects` file

### Step 3: Update Configuration

#### 3.1 Update Redirect URL
In `/src/app/jobcy/page.tsx`, the code is already configured to use:
```javascript
const jobcyUrl = process.env.NODE_ENV === 'production' 
  ? `${window.location.origin}/jobcy/`  // Same domain, subdirectory
  : 'http://localhost:3002';
```

#### 3.2 Environment Variables (Optional)
Create `.env.local`:
```bash
NEXT_PUBLIC_JOBCY_URL=https://yourdomain.com/jobcy/
```

### Step 4: Web Server Configuration

#### Apache (.htaccess)
```apache
RewriteEngine On
RewriteRule ^jobcy/(.*)$ /jobcy/$1 [L]
```

#### Nginx
```nginx
location /jobcy/ {
    try_files $uri $uri/ /jobcy/index.html;
}
```

## 🎯 Deployment Platforms

### Vercel (Easiest)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on push
3. Configure custom domain
4. Deploy Jobcy as separate project

### Netlify
1. Connect repository to Netlify
2. Configure build settings
3. Set up redirects for Jobcy routes

### Traditional Hosting
1. Upload files via FTP/SFTP
2. Configure web server
3. Set up SSL certificates

## 🔧 Testing Your Deployment

### Local Testing
```bash
# Test DevOps website
npm run dev
# Visit: http://localhost:3001

# Test Jobcy portal
cd /home/dragon/job-portal/jobcy-frontend-main
PORT=3002 npm run dev
# Visit: http://localhost:3002
```

### Production Testing
1. **Visit your domain**: `https://yourdomain.com`
2. **Click "Apply Now" button**
3. **Should redirect to**: `https://yourdomain.com/jobcy/`
4. **Test all Jobcy functionality**

## 📁 File Structure After Deployment

```
yourdomain.com/
├── index.html (DevOps website)
├── _next/ (Next.js assets)
├── jobcy/
│   ├── index.html (Jobcy portal)
│   ├── _next/ (Jobcy assets)
│   ├── user/
│   ├── hr/
│   ├── company/
│   └── admin/
└── other-pages/
```

## 🚨 Troubleshooting

### Common Issues

#### 1. 404 Errors on Jobcy Routes
**Solution**: Configure web server to handle SPA routing

#### 2. CORS Errors
**Solution**: Configure CORS in Jobcy backend

#### 3. Redirect Loops
**Solution**: Check URL configuration in redirect code

#### 4. Static Export Issues
**Solution**: Use server-side rendering or configure static hosting properly

### Debug Steps
1. Check browser console for errors
2. Verify file paths and URLs
3. Test API endpoints
4. Check web server logs

## 🎉 Success Checklist

- [ ] DevOps website loads at your domain
- [ ] "Apply Now" button redirects to `/jobcy/`
- [ ] Jobcy portal loads correctly
- [ ] All authentication flows work
- [ ] API calls function properly
- [ ] Mobile responsiveness works
- [ ] SSL certificates are configured

## 📞 Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your web server configuration
3. Test with different browsers
4. Check your domain DNS settings

## 🚀 Next Steps

After successful deployment:
1. Set up monitoring and analytics
2. Configure backup strategies
3. Set up CI/CD pipelines
4. Optimize performance
5. Add security headers
