# 🚀 Jobcy Job Portal Integration

## Overview

The OneHubGlobal DevOps Learning Website is now integrated with the Jobcy Job Portal to provide job opportunities, internships, and career services to learners.

## Current Configuration

**Current Jobcy URL:** `https://github.com/Karthik2340/jobcy-job-portal`

This URL is currently pointing to the GitHub repository. Once you deploy the Jobcy portal to a production URL (Vercel, Netlify, etc.), you'll need to update all the links.

## Integration Points

The following buttons/links on the homepage now redirect to the Jobcy portal:

### 1. **Jobs & Careers Section** (New Section Added)
   - **Location:** After "Quick Access Section" and before "Bank Coaching Section"
   - **Main CTA Button:** "Apply Now - Browse Jobs"
   - **Purpose:** Primary call-to-action for job seekers

### 2. **Professional Certifications**
   - **Location:** "Certifications & Internships" section
   - **Button:** "Explore Certifications"

### 3. **Internship Opportunities**
   - **Location:** "Certifications & Internships" section
   - **Button:** "Apply for Internships"

### 4. **Bank Coaching CTAs**
   - **Location:** "Bank Coaching" section
   - **Buttons:**
     - "Start Bank Coaching"
     - "Get Free Consultation"

## How to Update URLs After Deployment

### Option 1: Using Find & Replace (Recommended for Production Deployment)

When you deploy Jobcy to production (e.g., `https://jobcy.vercel.app`), update all URLs:

```bash
# In the project root
cd /home/dragon/devops-learning-website

# Use find and replace (Linux/Mac)
find src/app/page.tsx -type f -exec sed -i 's|https://github.com/Karthik2340/jobcy-job-portal|https://your-deployed-url.com|g' {} +

# Or manually search and replace in your editor:
# Find: https://github.com/Karthik2340/jobcy-job-portal
# Replace with: https://your-deployed-url.com
```

### Option 2: Environment Variable (Best Practice)

For a more maintainable approach, create an environment variable:

1. **Create `.env.local` file:**

```bash
cd /home/dragon/devops-learning-website
touch .env.local
```

2. **Add the Jobcy URL:**

```env
NEXT_PUBLIC_JOBCY_URL=https://your-deployed-url.com
```

3. **Update `src/app/page.tsx` to use the environment variable:**

Replace all instances of:
```tsx
href="https://github.com/Karthik2340/jobcy-job-portal"
```

With:
```tsx
href={process.env.NEXT_PUBLIC_JOBCY_URL || 'https://github.com/Karthik2340/jobcy-job-portal'}
```

4. **Restart the dev server:**
```bash
npm run dev
```

## Deployment Checklist

### For Development (Current State)
- ✅ All "Apply Now" buttons link to Jobcy GitHub repo
- ✅ Links open in new tab (`target="_blank"`)
- ✅ Security attributes added (`rel="noopener noreferrer"`)
- ✅ No linter errors

### For Production Deployment

1. **Deploy Jobcy Portal to Vercel/Netlify**
   - Follow the guides in `/home/dragon/job-portal/VERCEL_DEPLOYMENT_STEPS.md`
   - Get your production URL (e.g., `https://jobcy-portal.vercel.app`)

2. **Update Links in DevOps Website**
   - Option A: Find & Replace all URLs
   - Option B: Use environment variables (recommended)

3. **Test All Links**
   - [ ] Jobs & Careers "Apply Now" button
   - [ ] Professional Certifications button
   - [ ] Internship Opportunities button
   - [ ] Bank Coaching buttons

4. **Deploy DevOps Website**
   ```bash
   cd /home/dragon/devops-learning-website
   npm run build
   # Deploy to your hosting platform
   ```

## Jobcy Portal Routes

When users click "Apply Now", they can navigate to these routes on the Jobcy portal:

- **Homepage:** `/`
- **Job Seeker Signup:** `/user/auth/signup`
- **Job Seeker Login:** `/user/auth/login`
- **Browse Jobs:** `/user/dashboard` (after login)
- **HR Login:** `/hr/auth/login`
- **Company Login:** `/company/auth/login`
- **Admin Login:** `/admin/auth/login`

## Optional: Deep Linking

You can also link directly to specific pages:

```tsx
// Link directly to signup page
href="https://your-jobcy-url.com/user/auth/signup"

// Link directly to login page
href="https://your-jobcy-url.com/user/auth/login"
```

## Features Highlighted in Integration

The integration promotes these Jobcy features:

1. **Job Listings**
   - Fresher & Experienced positions
   - Multiple industries & domains
   - Regular job updates

2. **Easy Applications**
   - One-click applications
   - Application tracking
   - Status notifications

3. **Connect & Network**
   - Connect with professionals
   - Real-time chat
   - Interview scheduling

## Support

For issues with:
- **Jobcy Portal:** Check `/home/dragon/job-portal/README.md`
- **DevOps Website:** Check `/home/dragon/devops-learning-website/package.json`
- **Integration:** Refer to this document

## Repository Links

- **Jobcy Portal:** https://github.com/Karthik2340/jobcy-job-portal
- **DevOps Website:** (Your GitHub repo)

---

**Last Updated:** October 21, 2025
**Integration Status:** ✅ Complete
**Next Step:** Deploy Jobcy to production and update URLs

