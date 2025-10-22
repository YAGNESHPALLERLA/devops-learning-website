# Database Setup Guide for Jobcy Integration

## Issue: Dashboard showing mock data instead of real database data

The dashboard is currently showing mock data because the MongoDB connection is failing. Here's how to fix it:

## Option 1: Local MongoDB Setup (Recommended for Development)

### 1. Install MongoDB locally
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mongodb

# macOS with Homebrew
brew install mongodb-community

# Start MongoDB service
sudo systemctl start mongodb
# or
brew services start mongodb-community
```

### 2. Update environment variables
Update `.env.local` with local MongoDB URI:
```env
MONGO_URI=mongodb://localhost:27017/jobcy-data
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-123456789
```

## Option 2: MongoDB Atlas (Recommended for Production)

### 1. Create MongoDB Atlas account
- Go to https://www.mongodb.com/atlas
- Create a free account
- Create a new cluster

### 2. Get connection string
- Go to "Connect" → "Connect your application"
- Copy the connection string
- Replace `<password>` with your actual password
- Replace `<dbname>` with `jobcy-data`

### 3. Update environment variables
```env
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jobcy-data?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-123456789
```

## Option 3: Use Existing Database

If you have an existing MongoDB database, update the MONGO_URI in `.env.local` with your actual connection string.

## Vercel Deployment

For production deployment on Vercel:

1. Go to your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Add the following variables:
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: A long random string for JWT signing

## Testing the Connection

After setting up the database:

1. Restart the development server:
   ```bash
   npm run dev
   ```

2. Test user registration:
   - Go to `/jobcy/user/auth/signup`
   - Create a new account
   - Check if the user is created in the database

3. Test dashboard data:
   - Login with the created account
   - Check if the dashboard shows real data instead of mock data

## Troubleshooting

### If still showing mock data:
1. Check browser console for API errors
2. Verify MongoDB connection in server logs
3. Ensure environment variables are set correctly
4. Check if users are being created in the database

### Common issues:
- Wrong MongoDB URI format
- Database not accessible from Vercel
- Missing environment variables
- JWT secret not set

## Next Steps

1. Set up MongoDB (local or Atlas)
2. Update environment variables
3. Test user registration
4. Verify dashboard shows real data
5. Deploy to Vercel with proper environment variables
