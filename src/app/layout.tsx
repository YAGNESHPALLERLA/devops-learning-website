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
  title: "OneHubGlobal",
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
        {/* Blocking script that runs before React - checks auth for tutorial routes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  const path = window.location.pathname;
                  const isTutorialRoute = path.startsWith('/tutorials') || 
                    path === '/java' || path === '/python' || path === '/sql' || 
                    path === '/linux' || path === '/devops' || path === '/web-dev' || 
                    path === '/data-science' || path === '/code-terminal' || 
                    path === '/terminal' || path === '/menu';
                  
                  if (isTutorialRoute) {
                    const token = localStorage.getItem('token');
                    if (!token || token.trim() === '') {
                      window.location.replace('/signup?redirect=' + encodeURIComponent(path));
                    }
                  }
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
