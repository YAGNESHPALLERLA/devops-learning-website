# JobCy Portal Integration Guide

## 🔗 How It Works

The JobCy Job Portal is integrated into OneHubGlobal using **Git Submodules** and an **automatic sync system**.

### Architecture

```
OneHubGlobal Repository
├── jobcy-portal/              (Git Submodule → JobCy Repository)
│   └── jobcy-frontend-main/
│       └── src/app/           (Source of truth)
├── sync-jobcy-portal.js       (Sync script)
└── src/app/jobs/              (Synced content from JobCy)
    ├── page.tsx               (Main landing page)
    ├── admin/                 (Admin portal)
    ├── company/               (Company portal)
    ├── hr/                    (HR portal)
    └── user/                  (User/Job seeker portal)
```

## 📦 What Gets Synced

The following are automatically synced from the JobCy repository:
- ✅ Main landing page (`page.tsx`)
- ✅ Admin portal (`/admin`)
- ✅ Company portal (`/company`)
- ✅ HR portal (`/hr`)
- ✅ User/Job seeker portal (`/user`)
- ✅ Type definitions (`/types`)

## 🚀 Deployment Process

### Automatic Sync on Build

The sync happens **automatically** during build:

```bash
npm run build
```

This runs:
1. `prebuild` hook → Syncs JobCy portal
2. `build` → Builds the complete OneHubGlobal app with integrated JobCy portal

### Manual Sync

To manually sync the JobCy portal:

```bash
npm run sync-jobcy
```

### Update from JobCy Repository

To pull the latest changes from the JobCy repository and sync:

```bash
npm run update-jobcy
```

This will:
1. Pull latest changes from JobCy repository
2. Sync the updated content into OneHubGlobal

## 🌐 Live Deployment

### On Vercel/Production

When you deploy to Vercel or any other platform:

1. **Git submodules are automatically initialized** during deployment
2. **`prebuild` script runs** before building, syncing the latest JobCy portal
3. **Your live site includes the JobCy portal** at `/jobs` route
4. **No external redirects** - everything is on your domain

### Example URLs

- Main site: `https://yourdomain.com`
- Jobs portal: `https://yourdomain.com/jobs`
- Job seeker portal: `https://yourdomain.com/jobs/user/dashboard`
- HR portal: `https://yourdomain.com/jobs/hr/dashboard`
- Admin portal: `https://yourdomain.com/jobs/admin/dashboard`

## 🔄 Keeping Updated

### When JobCy Repository Updates

To get the latest changes from the JobCy repository:

```bash
# Option 1: Use the update script
npm run update-jobcy

# Option 2: Manual update
cd jobcy-portal
git pull origin master
cd ..
npm run sync-jobcy
```

Then commit and push:

```bash
git add .
git commit -m "Update JobCy portal to latest version"
git push origin main
```

### Automatic Updates (CI/CD)

You can set up GitHub Actions to automatically pull JobCy updates:

```yaml
# .github/workflows/update-jobcy.yml
name: Update JobCy Portal
on:
  schedule:
    - cron: '0 0 * * *' # Daily at midnight
  workflow_dispatch: # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: recursive
      - name: Update JobCy submodule
        run: |
          cd jobcy-portal
          git pull origin master
          cd ..
      - name: Sync JobCy portal
        run: npm run sync-jobcy
      - name: Commit changes
        run: |
          git config --global user.name 'GitHub Actions'
          git config --global user.email 'actions@github.com'
          git add .
          git commit -m "Auto-update JobCy portal" || echo "No changes"
          git push
```

## ✅ Benefits

1. **Single Domain**: Everything is on your domain (no external redirects)
2. **Always Updated**: JobCy updates automatically sync to your site
3. **No Code Duplication**: Using git submodules (single source of truth)
4. **Automatic Builds**: Sync happens automatically during deployment
5. **Easy Maintenance**: Simple commands to update

## 🛠️ Troubleshooting

### Submodule not initialized

```bash
git submodule update --init --recursive
```

### Sync not working

```bash
# Re-run the sync script
node sync-jobcy-portal.js
```

### Vercel deployment issues

Make sure to configure Vercel:
- **Build Command**: `npm run build` (prebuild will run automatically)
- **Install Command**: `npm install`
- **Git Submodules**: Enabled (in project settings)

## 📝 Notes

- The `jobcy-portal/` directory is a **git submodule** tracking the JobCy repository
- The `src/app/jobs/` directory contains **synced content** (not tracked by git directly)
- Changes to JobCy should be made in the JobCy repository, then synced
- The sync script runs automatically before every build

