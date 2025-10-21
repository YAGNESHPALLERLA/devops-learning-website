# 🚀 Jobcy Portal - Complete Integration

## 📁 Repository Structure

```
devops-learning-website/
├── src/app/
│   ├── user/auth/          # User authentication pages
│   ├── user/dashboard/     # User dashboard with all components
│   ├── hr/                 # HR portal pages
│   ├── company/            # Company portal pages
│   ├── admin/              # Admin portal pages
│   └── coming-soon/        # Coming soon page
├── jobcy-backend/          # Complete backend server
├── jobcy-frontend/         # Complete frontend (standalone)
└── docs/                   # All documentation
```

## 🎯 What's Included

### ✅ Complete Jobcy Portal
- **User Portal**: Registration, Login, Dashboard
- **HR Portal**: Management tools, job posting
- **Company Portal**: Company dashboard
- **Admin Portal**: System administration
- **Backend API**: Full Node.js/Express server
- **Database**: MongoDB Atlas integration

### ✅ Integration Status
- **Main Website**: `ohg365.com` ✅
- **User Login**: `ohg365.com/user/auth/login` ✅
- **User Registration**: `ohg365.com/user/auth/signup` ✅
- **User Dashboard**: `ohg365.com/user/dashboard` ✅
- **HR Portal**: `ohg365.com/hr/auth/login` ✅
- **Company Portal**: `ohg365.com/company/auth/login` ✅
- **Admin Portal**: `ohg365.com/admin/auth/login` ✅

## 🚀 Deployment Options

### Option 1: Vercel + Railway (Recommended)
1. **Frontend**: Already deployed on Vercel ✅
2. **Backend**: Deploy `jobcy-backend/` to Railway
3. **Database**: MongoDB Atlas (already configured)

### Option 2: Vercel + Render
1. **Frontend**: Already deployed on Vercel ✅
2. **Backend**: Deploy `jobcy-backend/` to Render
3. **Database**: MongoDB Atlas (already configured)

### Option 3: Full Vercel Deployment
1. **Frontend**: Already deployed ✅
2. **Backend**: Convert to Vercel serverless functions
3. **Database**: MongoDB Atlas (already configured)

## 🔧 Environment Variables

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com/api
NEXT_PUBLIC_SOCKET_URL=https://your-backend-url.com
```

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data
JWT_SECRET=c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846
FRONTEND_URL=https://ohg365.com
```

## 📋 Quick Start

### 1. Deploy Backend
```bash
cd jobcy-backend
npm install
npm start
```

### 2. Update Environment
- Add backend URL to Vercel environment variables
- Update `NEXT_PUBLIC_API_URL` in your deployment

### 3. Test Integration
- Visit `ohg365.com/user/auth/login`
- Test registration and login
- Verify dashboard access

## 🎯 Features

### User Portal
- ✅ Registration with career level selection
- ✅ Login with authentication
- ✅ Dashboard with job listings
- ✅ Profile management
- ✅ Application tracking

### HR Portal
- ✅ Job posting and management
- ✅ Application review
- ✅ Candidate management
- ✅ Interview scheduling

### Company Portal
- ✅ Company profile management
- ✅ Job posting
- ✅ Application tracking
- ✅ Analytics dashboard

### Admin Portal
- ✅ User management
- ✅ System administration
- ✅ Analytics and reporting
- ✅ Platform configuration

## 🔗 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/login` - User login
- `POST /api/hr/register` - HR registration
- `POST /api/company/register` - Company registration

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Applications
- `GET /api/applications` - Get applications
- `POST /api/applications` - Submit application
- `PUT /api/applications/:id` - Update application

## 📊 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  mobile: Number,
  password: String (hashed),
  role: String, // 'user', 'hr', 'admin', 'company'
  careerStatus: String, // 'fresher', 'experienced'
  createdAt: Date,
  updatedAt: Date
}
```

### Jobs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  company: String,
  location: String,
  salary: String,
  type: String, // 'full-time', 'part-time', 'contract'
  requirements: [String],
  postedBy: ObjectId,
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment Commands

### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy backend
cd jobcy-backend
railway deploy
```

### Render Deployment
```bash
# Connect GitHub repository
# Select jobcy-backend folder
# Set build command: npm install
# Set start command: npm start
```

## 📞 Support

If you need help with deployment:
1. Check the deployment logs
2. Verify environment variables
3. Test API endpoints
4. Check MongoDB Atlas connection

## 🎉 Success!

Once deployed, your complete jobcy portal will be available at:
- **Main Website**: `ohg365.com`
- **Job Portal**: `ohg365.com/user/auth/login`
- **All features working** with MongoDB Atlas database
