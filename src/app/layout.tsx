import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalNav } from "@/components/conditional-nav";
import AuthGuard from "@/components/auth-guard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OHG365 PVTLTD",
  description: "Learn DevOps from Basics to Intermediate - A comprehensive guide covering Linux, Docker, Kubernetes, CI/CD, and more",
  icons: {
    icon: '/ohg365.png',
    shortcut: '/ohg365.png',
    apple: '/ohg365.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/ohg365.png" type="image/png" />
        <link rel="shortcut icon" href="/ohg365.png" type="image/png" />
        <link rel="apple-touch-icon" href="/ohg365.png" />
        {/* Blocking script that runs before React - checks auth for tutorial routes - MUST BE FIRST */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const path = window.location.pathname;
                  const isTutorialRoute = path.startsWith('/tutorials') || 
                    path === '/java' || path === '/python' || path === '/sql' || 
                    path === '/linux' || path === '/devops' || path === '/web-dev' || 
                    path === '/data-science' || path === '/code-terminal' || 
                    path === '/terminal' || path === '/menu';
                  
                  if (isTutorialRoute) {
                    const token = localStorage.getItem('token');
                    
                    // Check if token exists
                    if (!token || token.trim() === '' || token === 'null' || token === 'undefined') {
                      console.log('[AUTH] No token found, checking for registered email');
                      let registeredEmail = localStorage.getItem('registeredEmail');
                      console.log('[AUTH] registeredEmail from localStorage:', registeredEmail);
                      
                      // Fallback: check stored user object for email
                      if (!registeredEmail) {
                        const userStr = localStorage.getItem('user');
                        console.log('[AUTH] Checking user object, userStr exists:', !!userStr);
                        if (userStr) {
                          try {
                            const user = JSON.parse(userStr);
                            console.log('[AUTH] Parsed user object:', user);
                            if (user && user.email && typeof user.email === 'string') {
                              registeredEmail = user.email;
                              console.log('[AUTH] Found email in user object:', registeredEmail);
                              if (registeredEmail) {
                                localStorage.setItem('registeredEmail', registeredEmail);
                              }
                            }
                          } catch (e) {
                            console.error('[AUTH] Error parsing user:', e);
                          }
                        }
                      }
                      
                      console.log('[AUTH] Final registeredEmail check:', registeredEmail);
                      if (registeredEmail && registeredEmail.trim() !== '') {
                        console.log('[AUTH] ✅ Found registered email, allowing page to load for modal (will show on every visit)');
                        // Don't redirect - let TutorialAuthGuard show the modal instead
                        // The modal will appear on EVERY visit when registered email exists
                        // Just allow the page to continue loading
                        return;
                      } else {
                        console.log('[AUTH] ❌ No registered email, redirecting to registration');
                        window.location.href = '/register?redirect=' + encodeURIComponent(path);
                        window.stop(); // Stop page loading
                        return;
                      }
                    }
                    
                    // Validate JWT token format and expiry
                    try {
                      const parts = token.split('.');
                      if (parts.length !== 3) {
                        // Invalid JWT format
                        console.log('[AUTH] Invalid JWT format, checking for registered email');
                        localStorage.removeItem('token');
                        let registeredEmail = localStorage.getItem('registeredEmail');
                        if (!registeredEmail) {
                          const userStr = localStorage.getItem('user');
                          if (userStr) {
                            try {
                              const user = JSON.parse(userStr);
                              if (user && user.email && typeof user.email === 'string') {
                                registeredEmail = user.email;
                                if (registeredEmail) {
                                  localStorage.setItem('registeredEmail', registeredEmail);
                                }
                              }
                            } catch (e) {
                              // Ignore parse errors
                            }
                          }
                        }
                        if (registeredEmail && registeredEmail.trim() !== '') {
                          console.log('[AUTH] ✅ Found registered email (invalid token), allowing page to load for modal');
                          // Don't redirect - let TutorialAuthGuard show the modal instead
                          return;
                        } else {
                          window.location.href = '/register?redirect=' + encodeURIComponent(path);
                          window.stop(); // Stop page loading
                          return;
                        }
                      }
                      
                      // Check if token is expired
                      const payload = JSON.parse(atob(parts[1]));
                      if (payload.exp && payload.exp * 1000 < Date.now()) {
                        // Token expired
                        console.log('[AUTH] Token expired, checking for registered email');
                        localStorage.removeItem('token');
                        let registeredEmail = localStorage.getItem('registeredEmail');
                        if (!registeredEmail) {
                          const userStr = localStorage.getItem('user');
                          if (userStr) {
                            try {
                              const user = JSON.parse(userStr);
                              if (user && user.email && typeof user.email === 'string') {
                                registeredEmail = user.email;
                                if (registeredEmail) {
                                  localStorage.setItem('registeredEmail', registeredEmail);
                                }
                              }
                            } catch (e) {
                              // Ignore parse errors
                            }
                          }
                        }
                        if (registeredEmail && registeredEmail.trim() !== '') {
                          console.log('[AUTH] ✅ Found registered email (invalid token), allowing page to load for modal');
                          // Don't redirect - let TutorialAuthGuard show the modal instead
                          return;
                        } else {
                          window.location.href = '/register?redirect=' + encodeURIComponent(path);
                          window.stop(); // Stop page loading
                          return;
                        }
                      }
                      
                      // Token is valid - BUT still check for registered email to show modal
                      console.log('[AUTH] Token valid, checking for registered email to show modal');
                      let registeredEmail = localStorage.getItem('registeredEmail');
                      if (!registeredEmail) {
                        const userStr = localStorage.getItem('user');
                        if (userStr) {
                          try {
                            const user = JSON.parse(userStr);
                            if (user && user.email && typeof user.email === 'string') {
                              registeredEmail = user.email;
                              if (registeredEmail) {
                                localStorage.setItem('registeredEmail', registeredEmail);
                              }
                            }
                          } catch (e) {
                            // Ignore parse errors
                          }
                        }
                      }
                      
                      if (registeredEmail && registeredEmail.trim() !== '') {
                        console.log('[AUTH] ✅ Found registered email (valid token), allowing page to load for modal (will show on every visit)');
                        // Don't redirect - let TutorialAuthGuard show the modal instead
                        // The modal will appear on EVERY visit when registered email exists, even with valid token
                        return;
                      }
                      
                      console.log('[AUTH] Token valid, no registered email, allowing access');
                    } catch (e) {
                      // Invalid token format
                      console.log('[AUTH] Token validation error, checking for registered email', e);
                      localStorage.removeItem('token');
                      let registeredEmail = localStorage.getItem('registeredEmail');
                      if (!registeredEmail) {
                        const userStr = localStorage.getItem('user');
                        if (userStr) {
                          try {
                            const user = JSON.parse(userStr);
                            if (user && user.email) {
                              registeredEmail = user.email;
                              localStorage.setItem('registeredEmail', registeredEmail);
                            }
                          } catch (e) {
                            // Ignore parse errors
                          }
                        }
                      }
                      if (registeredEmail) {
                        window.location.href = '/continue?redirect=' + encodeURIComponent(path);
                      } else {
                        window.location.href = '/register?redirect=' + encodeURIComponent(path);
                      }
                      window.stop(); // Stop page loading
                      return;
                    }
                  }
                } catch (e) {
                  console.error('[AUTH] Script error:', e);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthGuard>
          <ConditionalNav />
          {children}
        </AuthGuard>
      </body>
    </html>
  );
}
