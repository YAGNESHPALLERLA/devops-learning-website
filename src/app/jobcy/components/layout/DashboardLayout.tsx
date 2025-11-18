/**
 * DashboardLayout - Shared layout component for all authenticated Jobcy pages
 * LinkedIn/Indeed/Internshala-inspired clean design
 */
"use client";

import { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  sidebar?: ReactNode;
  onMenuToggle?: () => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

export function DashboardLayout({
  children,
  user,
  sidebar,
  onMenuToggle,
  isDark = false,
  onThemeToggle,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] transition-colors duration-300">
      {/* Fixed Top Navigation */}
      <Navbar
        user={user}
        onMenuToggle={onMenuToggle}
        isDark={isDark}
        onThemeToggle={onThemeToggle}
      />

      {/* Main Layout with Sidebar */}
      <div className="flex">
        {/* Sidebar */}
        {sidebar && (
          <aside className="hidden lg:block">
            {sidebar}
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-fadeInUp">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

