import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OHG 365 by Yagnesh",
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
        {/* Navigation Header */}
        <nav className="bg-gray-900 shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="flex items-center space-x-3 text-white hover:text-blue-400 transition">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    {/* DevOps Infinity Symbol */}
                    <path d="M18.178 8.178a4 4 0 0 0-5.656 0L12 8.7l-.522-.522a4 4 0 1 0-5.656 5.656L12 20.014l6.178-6.18a4 4 0 0 0 0-5.656z"/>
                    <path d="M5.822 15.822a4 4 0 0 0 5.656 0L12 15.3l.522.522a4 4 0 1 0 5.656-5.656L12 3.986 5.822 10.166a4 4 0 0 0 0 5.656z"/>
                    <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
                  </svg>
                </div>
                <span className="text-2xl font-bold">OHG 365</span>
              </Link>
              <div className="hidden md:flex space-x-6">
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
                <Link href="/docs/what-is-devops" className="text-gray-300 hover:text-white transition">
                  Docs
                </Link>
                <Link href="/terminal" className="text-gray-300 hover:text-white transition">
                  Terminal
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
