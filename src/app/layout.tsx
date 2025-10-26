import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import SearchBar from "@/components/search-bar";
import Navigation from "@/components/navigation";

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
  openGraph: {
    title: "OneHubGlobal",
    description: "Learn DevOps from Basics to Intermediate - A comprehensive guide covering Linux, Docker, Kubernetes, CI/CD, and more",
    images: ['/ohg365.png'],
  },
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
        <nav className="bg-[#1a1a1a] border-b border-gray-600 sticky top-0 z-40 backdrop-blur-sm bg-opacity-95">
                <div className="container mx-auto px-4">
                  <div className="flex justify-between items-center py-4">
                    <Link href="/" className="flex items-center space-x-3 text-white hover:text-gray-300 transition-all duration-300 group">
                      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-lg shadow-lg overflow-hidden">
                        <Image 
                          src="/ohg365.png" 
                          alt="OHG365 Logo" 
                          width={48} 
                          height={48}
                          className="w-full h-full object-contain"
                          priority
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-red-500 bg-clip-text text-transparent">OneHubGlobal</span>
                        <span className="text-sm font-semibold text-gray-400">OHG365</span>
                      </div>
                    </Link>
              <div className="flex items-center space-x-4">
                <Navigation />
                <SearchBar />
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
