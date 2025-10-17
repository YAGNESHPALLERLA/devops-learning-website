# Supabase Authentication Setup Guide

## 🚀 Quick Start

### Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in your project details:
   - **Name**: OneHubGlobal (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
4. Click "Create new project" and wait for setup to complete (~2 minutes)

### Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Project Settings** (gear icon in sidebar)
2. Click on **API** in the settings menu
3. Copy the following values:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys")

### Step 3: Configure Environment Variables

1. Create a file named `.env.local` in the root of your project
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDAwMDAwMCwiZXhwIjoxOTM1NTc2MDAwfQ.abcdefghijklmnopqrstuvwxyz123456789
```

### Step 4: Enable Authentication Providers (Optional)

#### Email/Password (Default - Already Enabled)
- No additional setup required!

#### Google OAuth
1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Find **Google** and click to expand
3. Enable the provider
4. Follow the instructions to create Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `https://your-project-ref.supabase.co/auth/v1/callback`
5. Copy the Client ID and Client Secret to Supabase

#### GitHub OAuth
1. In Supabase Dashboard, go to **Authentication** > **Providers**
2. Find **GitHub** and click to expand
3. Enable the provider
4. Follow the instructions to create GitHub OAuth app:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in application details
   - Set Authorization callback URL: `https://your-project-ref.supabase.co/auth/v1/callback`
5. Copy the Client ID and Client Secret to Supabase

### Step 5: Configure Email Templates (Optional)

1. Go to **Authentication** > **Email Templates** in Supabase
2. Customize the email templates for:
   - Confirm signup
   - Invite user
   - Magic Link
   - Change Email Address
   - Reset Password

### Step 6: Test Your Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the sign-up page: `http://localhost:3000/sign-up`

3. Create a test account and verify it works!

## 🔐 Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use Row Level Security (RLS)** - Enable RLS on your database tables
3. **Set up proper email verification** - Require users to verify their email
4. **Configure password requirements** - In Authentication > Settings
5. **Set up rate limiting** - Prevent abuse of your auth endpoints

## 📚 Additional Configuration

### Email Settings
- Go to **Project Settings** > **Authentication**
- Configure email sender name and from address
- Set site URL and redirect URLs
- Enable email confirmations

### Session Settings
- Configure JWT expiry time
- Set refresh token rotation
- Configure session timeouts

## 🆘 Troubleshooting

### "Invalid API key" Error
- Double-check your `.env.local` file
- Ensure you're using the `anon/public` key, not the `service_role` key
- Restart your development server after adding environment variables

### Email Verification Not Working
- Check your Supabase email settings
- Verify your site URL is set correctly in Supabase settings
- Check spam folder for verification emails

### OAuth Not Working
- Verify redirect URIs are correctly configured
- Check that OAuth apps are properly set up in provider dashboards
- Ensure OAuth is enabled in Supabase dashboard

## 🎉 You're All Set!

Your authentication system is now configured with:
- ✅ Email/Password authentication
- ✅ OAuth providers (Google, GitHub)
- ✅ User session management
- ✅ Protected routes
- ✅ Profile management

For more information, visit the [Supabase Documentation](https://supabase.com/docs/guides/auth)

