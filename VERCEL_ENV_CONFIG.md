# 🔧 Vercel Environment Variables Configuration

## 📋 **Required Environment Variables for Vercel Dashboard**

Add these environment variables in Vercel Dashboard → Settings → Environment Variables:

### **🔐 Core Authentication**
```bash
NEXTAUTH_URL=https://www.ohg365.com
NEXTAUTH_SECRET=c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846
JWT_SECRET=c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846
```

### **🗄️ Database Configuration**
```bash
MONGO_URI=mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data
DATABASE_URL=mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data
```

### **🌐 Backend URLs (Integrated)**
```bash
JOBCY_BACKEND_URL=https://www.ohg365.com
JOBCY_API_URL=https://www.ohg365.com/api/jobcy
NEXT_PUBLIC_SOCKET_URL=https://www.ohg365.com
NEXT_PUBLIC_API_URL=https://www.ohg365.com/api/jobcy
```

### **👤 Admin Configuration**
```bash
ADMIN_EMAIL=admin@ohg365.com
ADMIN_NAME=Admin
ADMIN_PASSWORD=Admin@123
ADMIN_MOBILE=8794561235
```

### **🐙 GitHub OAuth (Replace with your values)**
```bash
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

### **🔧 Additional Configuration**
```bash
NODE_ENV=production
PORT=3000
```

## 🚀 **Deployment Steps**

1. **Add Environment Variables**: Copy all variables above to Vercel Dashboard
2. **Configure GitHub OAuth**: 
   - Create GitHub OAuth App with callback URL: `https://www.ohg365.com/api/jobcy/auth/github`
   - Update `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`
3. **Deploy**: Vercel will automatically redeploy with new environment variables
4. **Test**: Visit `https://www.ohg365.com/jobcy/user/dashboard`

## 🧪 **Test Endpoints**

- **Login**: `https://www.ohg365.com/api/jobcy/login`
- **User Profile**: `https://www.ohg365.com/api/jobcy/user/me`
- **Registration**: `https://www.ohg365.com/api/jobcy/user/register`
- **GitHub OAuth**: `https://www.ohg365.com/api/jobcy/auth/github`

## 📊 **Expected Result**

✅ **No More 404 Errors**  
✅ **Real Data from MongoDB**  
✅ **No More Mock Data**  
✅ **Complete Integration Working**  
