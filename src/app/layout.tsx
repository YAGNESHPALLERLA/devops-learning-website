import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SearchBar from "@/components/search-bar";
import ScrollProgress from "@/components/scroll-progress";
import ScrollToTop from "@/components/scroll-to-top";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollProgress />
        {/* Navigation Header */}
        <nav className="bg-[#1a1a1a] border-b border-gray-600 sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center space-x-3 text-white hover:text-gray-300 transition-all duration-300 group">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-rose-500 to-red-600 rounded-lg shadow-lg shadow-rose-500/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    {/* DevOps Infinity Symbol */}
                    <path d="M18.178 8.178a4 4 0 0 0-5.656 0L12 8.7l-.522-.522a4 4 0 1 0-5.656 5.656L12 20.014l6.178-6.18a4 4 0 0 0 0-5.656z"/>
                    <path d="M5.822 15.822a4 4 0 0 0 5.656 0L12 15.3l.522.522a4 4 0 1 0 5.656-5.656L12 3.986 5.822 10.166a4 4 0 0 0 0 5.656z"/>
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">OneHubGlobal</span>
              </Link>
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex space-x-6 mr-4">
                  <Link href="/" className="text-white hover:text-rose-400 transition-all duration-300 font-medium">
                    Home
                  </Link>
                  <Link href="/docs/what-is-devops" className="text-white hover:text-rose-400 transition-all duration-300 font-medium">
                    Docs
                  </Link>
                  <Link href="/terminal" className="text-white hover:text-rose-400 transition-all duration-300 font-medium">
                    Terminal
                  </Link>
                </div>
                <SearchBar />
              </div>
            </div>
          </div>
        </nav>
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}
