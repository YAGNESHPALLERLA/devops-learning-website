"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Briefcase, 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  Menu,
  X,
  Moon,
  Sun
} from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "@/lib/utils";

interface NavbarProps {
  user?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  onMenuToggle?: () => void;
  isDark?: boolean;
  onThemeToggle?: () => void;
}

export function Navbar({ user, onMenuToggle, isDark = false, onThemeToggle }: NavbarProps) {
  const router = useRouter();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/jobcy/user/auth/login");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-[#1a1a1a]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#1a1a1a]/90 shadow-lg shadow-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo & Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
            >
              {showUserMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
            
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => router.push("/jobcy/")}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Jobcy</h1>
                <p className="text-xs text-gray-400">Find Your Dream Job</p>
              </div>
            </div>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search jobs, companies, skills..."
                className="w-full pl-12 pr-4 py-2.5 bg-[#0a0a0a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 text-white placeholder:text-gray-500 transition-all hover:border-gray-600"
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-lg bg-[#0a0a0a] text-gray-300 hover:bg-gray-800 hover:text-white transition-all border border-gray-700 hover:border-gray-600"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a1a1a]"></span>
            </button>

            {/* User Menu */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 p-1.5 pr-3 rounded-xl hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover border border-gray-700"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-blue-500/30">
                      {getInitials(user.name)}
                    </div>
                  )}
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-semibold text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {user.role}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] rounded-lg shadow-xl border border-gray-700 py-1 z-50 animate-scaleIn">
                    <button
                      onClick={() => {
                        router.push("/jobcy/user/dashboard");
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors"
                    >
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">My Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        router.push("/jobcy/user/dashboard");
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-300 hover:bg-gray-800 hover:text-white flex items-center space-x-3 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">Settings</span>
                    </button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-left text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 flex items-center space-x-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

