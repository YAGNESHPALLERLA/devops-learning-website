# 🔐 Authentication System - OneHubGlobal

## Overview

Your OneHubGlobal website now has a complete, production-ready authentication system powered by **Supabase**. This implementation includes:

- ✅ Email/Password authentication
- ✅ OAuth providers (Google & GitHub)
- ✅ Email verification
- ✅ Password reset functionality
- ✅ User profile management
- ✅ Protected routes with middleware
- ✅ Session management
- ✅ Beautiful, responsive UI

---

## 🚀 Quick Start

### Step 1: Set Up Supabase

1. **Create a Supabase Account**
   - Go to [https://supabase.com](https://supabase.com)
   - Sign up for a free account

2. **Create a New Project**
   - Click "New Project"
   - Fill in your project details
   - Wait for setup to complete (~2 minutes)

3. **Get Your API Keys**
   - Go to Project Settings → API
   - Copy your `Project URL` and `anon/public key`

### Step 2: Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. Replace the values with your actual Supabase credentials

### Step 3: Start Your Application

```bash
npm run dev
```

Your authentication system is now ready! 🎉

---

## 📁 Project Structure

```
src/
├── app/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts          # OAuth callback handler
│   ├── sign-in/
│   │   └── page.tsx               # Sign-in page
│   ├── sign-up/
│   │   └── page.tsx               # Sign-up page
│   ├── profile/
│   │   └── page.tsx               # User profile page
│   └── layout.tsx                 # Root layout with AuthProvider
├── components/
│   └── navigation.tsx             # Navigation with user menu
├── contexts/
│   └── AuthContext.tsx            # Authentication context & hooks
├── lib/
│   └── supabase/
│       ├── client.ts              # Browser Supabase client
│       ├── server.ts              # Server Supabase client
│       └── middleware.ts          # Middleware utilities
└── middleware.ts                  # Route protection middleware
```

---

## 🎯 Features

### 1. Sign Up
- Email/password registration
- OAuth sign-up (Google, GitHub)
- Email verification
- Form validation
- Success/error handling

**Route:** `/sign-up`

### 2. Sign In
- Email/password login
- OAuth login (Google, GitHub)
- Remember me functionality
- Password visibility toggle
- Forgot password link

**Route:** `/sign-in`

### 3. User Profile
- View user information
- Update profile details
- Account status display
- Quick links to courses and jobs
- Sign out functionality

**Route:** `/profile`

### 4. Navigation Integration
- **When signed out:** Shows "Sign In" and "Sign Up" buttons
- **When signed in:** Shows user avatar with dropdown menu
  - User info display
  - My Profile link
  - Settings link

### 5. Session Management
- Automatic session refresh
- Persistent login state
- Secure cookie handling
- Cross-tab synchronization

---

## 🔧 Configuration

### Enable OAuth Providers

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
6. Copy Client ID and Client Secret
7. In Supabase:
   - Go to Authentication → Providers
   - Find Google and enable it
   - Paste your credentials

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in application details
4. Set Authorization callback URL:
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
5. Copy Client ID and Client Secret
6. In Supabase:
   - Go to Authentication → Providers
   - Find GitHub and enable it
   - Paste your credentials

---

## 🛠️ Usage Examples

### Using Auth in Components

```tsx
'use client'

import { useAuth } from '@/contexts/AuthContext'

export default function MyComponent() {
  const { user, loading, signOut } = useAuth()

  if (loading) return <div>Loading...</div>

  if (!user) return <div>Please sign in</div>

  return (
    <div>
      <h1>Welcome, {user.email}!</h1>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

### Protecting Routes (Server Side)

```tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProtectedPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/sign-in')
  }

  return <div>Protected content for {user.email}</div>
}
```

### Sign Up Programmatically

```tsx
const { signUp } = useAuth()

const handleSignUp = async () => {
  const { data, error } = await signUp(
    'user@example.com',
    'password123',
    { full_name: 'John Doe' }
  )

  if (error) {
    console.error('Sign up error:', error)
  } else {
    console.log('Check your email for verification!')
  }
}
```

---

## 🎨 Customization

### Styling
All authentication pages use your existing design system:
- Dark theme (`bg-[#0f0f0f]`, `bg-[#1a1a1a]`)
- Rose/Red gradient accents
- Consistent typography
- Professional shadows and borders

### Email Templates
Customize email templates in Supabase:
1. Go to Authentication → Email Templates
2. Customize for:
   - Confirm signup
   - Reset password
   - Invite user
   - Magic link

### Add Custom Fields
To add more user fields:

1. Update sign-up form in `src/app/sign-up/page.tsx`
2. Pass additional data in metadata:
   ```tsx
   await signUp(email, password, {
     full_name: fullName,
     phone: phoneNumber,
     // ... more fields
   })
   ```

---

## 🔒 Security Best Practices

✅ **Implemented in Your System:**
- Environment variables for sensitive keys
- HTTPS-only cookies
- JWT-based authentication
- Secure password hashing (handled by Supabase)
- CSRF protection
- Session refresh on route changes

⚠️ **Additional Recommendations:**
1. Enable Row Level Security (RLS) in Supabase
2. Set up email verification requirements
3. Configure rate limiting in Supabase settings
4. Regular security audits
5. Monitor authentication logs

---

## 📚 API Reference

### `useAuth()` Hook

Returns an object with:

| Property | Type | Description |
|----------|------|-------------|
| `user` | `User \| null` | Current authenticated user |
| `session` | `Session \| null` | Current session |
| `loading` | `boolean` | Loading state |
| `signUp` | `function` | Sign up with email/password |
| `signIn` | `function` | Sign in with email/password |
| `signInWithOAuth` | `function` | Sign in with OAuth provider |
| `signOut` | `function` | Sign out current user |
| `resetPassword` | `function` | Send password reset email |
| `updateProfile` | `function` | Update user profile |

---

## 🐛 Troubleshooting

### "Invalid API key" Error
- Verify your `.env.local` file exists
- Check that environment variables are correct
- Restart your development server

### Email Verification Not Working
- Check Supabase email settings
- Verify site URL is set correctly
- Check spam folder

### OAuth Not Working
- Verify redirect URIs in provider dashboards
- Ensure OAuth is enabled in Supabase
- Check client ID and secret are correct

### Session Not Persisting
- Clear browser cookies
- Check middleware configuration
- Verify Supabase URL is correct

---

## 📖 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js App Router](https://nextjs.org/docs/app)
- [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) - Detailed setup guide

---

## 🎉 What's Next?

Now that you have authentication set up, you can:

1. **Add Protected Content**
   - Create course enrollment tracking
   - User progress tracking
   - Personalized recommendations

2. **Build User Features**
   - Bookmarks/favorites
   - Learning history
   - Certificates earned
   - Course completion tracking

3. **Enhance Profile**
   - Avatar upload
   - Bio and social links
   - Skills and interests
   - Achievement badges

4. **Add Database Tables**
   - User courses (many-to-many)
   - User progress
   - Certifications
   - Test results

---

## 💡 Tips

- **Development:** Use test accounts during development
- **Testing:** Test both email and OAuth flows
- **Production:** Configure production URLs in Supabase
- **Monitoring:** Check Supabase dashboard for auth logs
- **Backups:** Enable database backups in Supabase

---

## 🤝 Support

If you need help:
1. Check the [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) guide
2. Visit [Supabase Discord](https://discord.supabase.com)
3. Read [Supabase Documentation](https://supabase.com/docs)

---

**Your authentication system is ready! Start building amazing features! 🚀**

