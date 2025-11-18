"use client";

import { useState, Dispatch, SetStateAction } from "react";
import {
  User,
  Briefcase,
  Users,
  Calendar,
  TrendingUp,
  Award,
  ChevronRight,
  ChevronLeft,
  CheckSquare,
  LucideIcon
} from "lucide-react";

type NavItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  disabled?: boolean;
};

type UserProfile = {
  name: string;
  title?: string;
  connections?: number;
  profileCompletion?: number;
};
type SidebarProps = {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  isDark: boolean;
  userProfile: UserProfile;
  interviewsCount: number;
};

export default function Sidebar({
  activeTab,
  setActiveTab,
  isDark,
  userProfile,
  interviewsCount,
}: SidebarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: TrendingUp },
    { id: "profile", label: "My Profile", icon: User },
    { id: "jobs", label: "Find Jobs", icon: Briefcase },
    { id: "applied", label: "Applied Jobs", icon: CheckSquare },
    { id: "connect", label: "Network", icon: Users },
    // { id: "requests", label: "Requests", icon: Bell },
    {
      id: "interviews",
      label: "Interviews",
      icon: Calendar,
      badge: interviewsCount,
      disabled: interviewsCount === 0,
    },
  ];

  const getInitial = (name?: string) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const completionPercentage = userProfile.profileCompletion || 0;

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 50) return "bg-[#0A66C2]";
    return "bg-[#0A66C2]";
  };

  const getCompletionMessage = (percentage: number) => {
    if (percentage >= 80) return "Great profile!";
    if (percentage >= 50) return "Almost there";
    return "Complete your profile";
  };

  return (
    <>
      <aside
        className={`${isExpanded ? "w-72" : "w-20"} bg-[#1a1a1a] border-r border-gray-700 min-h-[calc(100vh-64px)] sticky top-[64px] flex flex-col transition-all duration-300 ease-in-out relative shadow-lg`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-[#1a1a1a] hover:bg-gray-800 border border-gray-700 flex items-center justify-center shadow-lg transition-all z-10 text-gray-300 hover:text-white hover:border-gray-600"
        >
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Profile Card */}
        <div
          className="p-4 border-b border-gray-700 bg-[#0a0a0a]"
        >
          <div
            className={`flex items-center ${
              isExpanded ? "space-x-3" : "justify-center"
            } mb-3`}
          >
            <div
              className={`${
                isExpanded ? "w-12 h-12" : "w-10 h-10"
              } bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 flex-shrink-0 transition-all`}
            >
              <span
                className={`text-white font-bold ${
                  isExpanded ? "text-xl" : "text-lg"
                }`}
              >
                {getInitial(userProfile.name)}
              </span>
            </div>
            {isExpanded && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <h3
                  className="font-semibold truncate text-white"
                >
                  {userProfile.name || "User"}
                </h3>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          {isExpanded && (
            <div className="grid grid-cols-2 gap-3 animate-fade-in">
              <div
                className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <TrendingUp
                    className="w-4 h-4 text-blue-400"
                  />
                  <span
                    className="text-xs text-gray-400"
                  >
                    Views
                  </span>
                </div>
                <p
                  className="text-lg font-bold text-white"
                >
                  1.2K
                </p>
              </div>
              <div
                className="bg-[#1a1a1a] rounded-lg p-3 border border-gray-700 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <Users
                    className="w-4 h-4 text-blue-400"
                  />
                  <span
                    className="text-xs text-gray-400"
                  >
                    Network
                  </span>
                </div>
                <p
                  className="text-lg font-bold text-white"
                >
                  {userProfile.connections || 0}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1">
          {isExpanded && (
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-3 px-3 text-gray-500 animate-fade-in"
            >
              Menu
            </p>
          )}
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => !item.disabled && setActiveTab(item.id)}
                disabled={item.disabled}
                title={!isExpanded ? item.label : ""}
                className={`w-full flex items-center ${
                  isExpanded ? "space-x-3 px-4" : "justify-center px-2"
                } py-3 rounded-lg transition-all group relative ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : item.disabled
                    ? "text-gray-500 cursor-not-allowed opacity-50"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                    {isActive && isExpanded && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-sm"></div>
                )}
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? "scale-110" : "group-hover:scale-105"
                    } transition-transform`}
                  />
                  {(item.badge ?? 0) > 0 && !isExpanded && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full border border-[#1a1a1a]"></span>
                  )}
                </div>
                {isExpanded && (
                  <>
                    <span className="font-medium flex-1 text-left animate-fade-in">
                      {item.label}
                    </span>
                    {(item.badge ?? 0) > 0 && (
                      <span
                        className={`${
                          isActive
                            ? "bg-white text-blue-600"
                            : "bg-blue-500 text-white"
                        } text-xs px-2 py-0.5 rounded-full font-semibold animate-fade-in`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </nav>

        {/* Profile Strength Card */}
        {isExpanded && (
          <div
            className="p-4 border-t border-gray-700 animate-fade-in bg-[#0a0a0a]"
          >
            <div
              className="bg-[#1a1a1a] rounded-lg p-5 shadow-lg border border-gray-700"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Award
                    className={`w-5 h-5 ${
                      completionPercentage >= 80
                        ? "text-green-400"
                        : "text-blue-400"
                    }`}
                  />
                  <p
                    className="text-sm font-semibold text-white"
                  >
                    Profile Strength
                  </p>
                </div>
                <span
                  className="text-xs font-bold text-gray-400"
                >
                  {completionPercentage}%
                </span>
              </div>

              <div
                className="w-full bg-gray-800 rounded-full h-2.5 mb-3 overflow-hidden"
              >
                <div
                  className={`${getCompletionColor(
                    completionPercentage
                  )} h-2.5 rounded-full transition-all duration-500`}
                  style={{ 
                    width: `${completionPercentage}%`,
                    backgroundColor: completionPercentage >= 80 ? '#22c55e' : '#3b82f6'
                  }}
                ></div>
              </div>

              <p
                className="text-xs text-gray-400 mb-3"
              >
                {getCompletionMessage(completionPercentage)}
              </p>

              {completionPercentage < 100 && (
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold py-2 rounded-lg transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-[1.02] active:scale-[0.98]">
                  Complete Profile
                </button>
              )}
            </div>
          </div>
        )}

      </aside>

      {/* Add CSS for fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </>
  );
}
