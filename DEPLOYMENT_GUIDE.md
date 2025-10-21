# 🚀 Deployment Guide for Jobcy Integration

## Overview
When deploying your DevOps learning website with integrated Jobcy portal, you have two main options.

## Option 1: Separate Domains (Recommended)

### Setup:
1. **DevOps Website**: `yourdomain.com`
2. **Jobcy Portal**: `jobcy.yourdomain.com` or `jobs.yourdomain.com`

### Steps:
1. Deploy your DevOps website to your main domain
2. Deploy Jobcy portal to a subdomain
3. Update the redirect URL in `/src/app/jobcy/page.tsx`:

```javascript
const jobcyUrl = process.env.NODE_ENV === 'production' 
  ? 'https://jobcy.yourdomain.com'  // Your actual Jobcy subdomain
  : 'http://localhost:3002';
```

## Option 2: Same Domain with Subdirectories

### Setup:
1. **DevOps Website**: `yourdomain.com`
2. **Jobcy Portal**: `yourdomain.com/jobcy/`

### Steps:
1. Deploy your DevOps website to domain root
2. Deploy Jobcy portal to `/jobcy/` subdirectory
3. Update the redirect URL in `/src/app/jobcy/page.tsx`:

```javascript
const jobcyUrl = process.env.NODE_ENV === 'production' 
  ? 'https://yourdomain.com/jobcy/'  // Same domain, subdirectory
  : 'http://localhost:3002';
```

## Environment Variables

Create `.env.local` for production:

```bash
# For separate domain
NEXT_PUBLIC_JOBCY_URL=https://jobcy.yourdomain.com

# OR for same domain
NEXT_PUBLIC_JOBCY_URL=https://yourdomain.com/jobcy/
```

Then update the redirect code:

```javascript
const jobcyUrl = process.env.NEXT_PUBLIC_JOBCY_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com/jobcy/' 
    : 'http://localhost:3002');
```

## Deployment Platforms

### Vercel (Recommended for Next.js)
- Deploy DevOps website to Vercel
- Deploy Jobcy portal to separate Vercel project
- Configure custom domains

### Netlify
- Deploy both applications
- Configure redirects and custom domains

### Traditional Hosting
- Upload both applications to your server
- Configure web server (Apache/Nginx) for routing

## Testing Production Setup

1. Deploy both applications
2. Test the "Apply Now" button flow
3. Verify redirects work correctly
4. Test all Jobcy functionality

## Troubleshooting

### Common Issues:
- **CORS errors**: Configure CORS in Jobcy backend
- **Redirect loops**: Check URL configuration
- **404 errors**: Verify deployment paths

### Solutions:
- Update API endpoints in Jobcy
- Configure proper redirects
- Check domain/DNS settings

## Security Considerations

- Use HTTPS for all domains
- Configure proper CORS policies
- Set up proper authentication
- Use environment variables for sensitive data

## Next Steps

1. Choose your deployment option
2. Deploy both applications
3. Update redirect URLs
4. Test thoroughly
5. Configure monitoring and analytics
