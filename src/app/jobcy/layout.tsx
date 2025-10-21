import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Jobcy Portal - OHG365",
  description: "Jobcy portal for freshers & experience",
};

export default function JobcyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Jobcy Header */}
      <header className="bg-white/95 backdrop-blur-sm border-slate-200 border-b sticky top-0 z-50 shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-xl animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase w-7 h-7 text-white">
                  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Jobcy</h1>
                <p className="text-sm text-slate-600">Your Career Journey Starts Here</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Link 
                href="/"
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                ← Back to DevOps Learning
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Jobcy Content */}
      <main className="relative overflow-hidden">
        {children}
      </main>
    </div>
  );
}
