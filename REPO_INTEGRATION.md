# 🔗 Repository Integration Setup

## Overview
This setup allows your DevOps website to automatically sync with the Jobcy portal repository (https://jobcy-job-portal.vercel.app/).

## 🎯 Integration Architecture

```
Jobcy Portal Repo (https://github.com/YAGNESHPALLERLA/job-portal)
    ↓ (Auto-sync)
DevOps Website Repo (https://github.com/YAGNESHPALLERLA/devops-learning-website)
    ↓ (Deploy)
Your Live Website (yourdomain.com/jobcy/)
```

## 🔧 Setup Instructions

### 1. Configure GitHub Webhook

1. Go to your Jobcy portal repository: https://github.com/YAGNESHPALLERLA/job-portal
2. Navigate to **Settings** → **Webhooks** → **Add webhook**
3. Set the webhook URL to: `https://your-devops-website.vercel.app/api/webhook-sync`
4. Set content type to: `application/json`
5. Select events: **Just the push event**
6. Add webhook secret (optional but recommended)

### 2. Environment Variables

Add these to your Vercel deployment:

```bash
# Webhook secret for security
WEBHOOK_SECRET=your-secret-key

# Jobcy backend URL
JOBCY_BACKEND_URL=https://jobcy-job-portal.vercel.app
```

### 3. Manual Sync

Run the sync script manually:

```bash
./sync-jobcy-repo.sh
```

## 🚀 How It Works

### Automatic Sync
1. **Jobcy repo changes** → GitHub webhook triggers
2. **Webhook calls** your DevOps website API
3. **Sync script runs** → Updates Jobcy files
4. **Vercel redeploys** → Changes go live

### Manual Sync
1. Run `./sync-jobcy-repo.sh`
2. Script clones Jobcy repo
3. Copies latest files to `/src/app/jobcy/`
4. Updates API endpoints to use Jobcy backend
5. Commits and pushes changes

## 📁 File Structure After Sync

```
devops-learning-website/
├── src/app/jobcy/          # Synced from Jobcy repo
│   ├── user/               # Job seeker pages
│   ├── hr/                 # HR professional pages
│   ├── company/            # Company admin pages
│   └── admin/              # System admin pages
├── .github/workflows/      # Auto-sync workflow
├── sync-jobcy-repo.sh      # Manual sync script
└── webhook-sync.js         # Webhook handler
```

## 🔄 API Endpoint Configuration

The sync script automatically updates API endpoints:

**Before Sync:**
```javascript
const API_URL = process.env.NEXT_PUBLIC_API_URL;
// Points to localhost:5000
```

**After Sync:**
```javascript
const API_URL = "https://jobcy-job-portal.vercel.app/api";
// Points to deployed Jobcy backend
```

## 🎯 Benefits

- ✅ **Real-time sync** - Changes appear automatically
- ✅ **Single backend** - Uses Jobcy's deployed API
- ✅ **No manual work** - Everything automated
- ✅ **Version control** - All changes tracked
- ✅ **Rollback support** - Can revert if needed

## 🚨 Troubleshooting

### Sync Not Working?
1. Check webhook URL is correct
2. Verify webhook secret matches
3. Check Vercel function logs
4. Run manual sync: `./sync-jobcy-repo.sh`

### API Errors?
1. Verify Jobcy backend is running
2. Check API endpoints are updated
3. Test API calls manually

### Build Failures?
1. Check file permissions
2. Verify all dependencies
3. Review error logs

## 📞 Support

If you encounter issues:
1. Check the sync script logs
2. Verify webhook configuration
3. Test manual sync first
4. Check Vercel deployment logs

## 🎉 Success Indicators

- ✅ Webhook receives Jobcy repo updates
- ✅ Sync script runs automatically
- ✅ Files update in your repo
- ✅ Vercel redeploys successfully
- ✅ Changes appear on your live site
