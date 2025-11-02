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
        className={`${isExpanded ? "w-72" : "w-20"} bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] sticky top-[64px] flex flex-col transition-all duration-300 ease-in-out relative shadow-sm`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-white hover:bg-gray-50 border border-gray-300 flex items-center justify-center shadow-md transition-all z-10 text-gray-700 hover:shadow-lg"
        >
          {isExpanded ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Profile Card */}
        <div
          className="p-4 border-b border-gray-200 bg-white"
        >
          <div
            className={`flex items-center ${
              isExpanded ? "space-x-3" : "justify-center"
            } mb-3`}
          >
            <div
              className={`${
                isExpanded ? "w-12 h-12" : "w-10 h-10"
              } bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center shadow-md flex-shrink-0 transition-all`}
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
                  className="font-semibold truncate text-gray-900"
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
                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <TrendingUp
                    className="w-4 h-4 text-[#0A66C2]"
                  />
                  <span
                    className="text-xs text-gray-600"
                  >
                    Views
                  </span>
                </div>
                <p
                  className="text-lg font-bold text-gray-900"
                >
                  1.2K
                </p>
              </div>
              <div
                className="bg-gray-50 rounded-lg p-3 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-1">
                  <Users
                    className="w-4 h-4 text-[#0A66C2]"
                  />
                  <span
                    className="text-xs text-gray-600"
                  >
                    Network
                  </span>
                </div>
                <p
                  className="text-lg font-bold text-gray-900"
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
                    ? "bg-[#0A66C2] text-white shadow-md"
                    : item.disabled
                    ? "text-gray-400 cursor-not-allowed opacity-50"
                    : "text-gray-700 hover:bg-gray-50 hover:text-[#0A66C2]"
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
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--primary)] rounded-full"></span>
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
                            ? "bg-white text-[#0A66C2]"
                            : "bg-[#0A66C2] text-white"
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
            className="p-4 border-t border-gray-200 animate-fade-in bg-gray-50"
          >
            <div
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Award
                    className={`w-5 h-5 ${
                      completionPercentage >= 80
                        ? "text-green-500"
                        : "text-[#0A66C2]"
                    }`}
                  />
                  <p
                    className="text-sm font-semibold text-gray-900"
                  >
                    Profile Strength
                  </p>
                </div>
                <span
                  className="text-xs font-bold text-gray-600"
                >
                  {completionPercentage}%
                </span>
              </div>

              <div
                className="w-full bg-gray-200 rounded-full h-2.5 mb-3 overflow-hidden"
              >
                <div
                  className={`${getCompletionColor(
                    completionPercentage
                  )} h-2.5 rounded-full transition-all duration-500`}
                  style={{ 
                    width: `${completionPercentage}%`,
                    backgroundColor: completionPercentage >= 80 ? '#22c55e' : '#0A66C2'
                  }}
                ></div>
              </div>

              <p
                className="text-xs text-gray-600 mb-3"
              >
                {getCompletionMessage(completionPercentage)}
              </p>

              {completionPercentage < 100 && (
                <button className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white text-sm font-semibold py-2 rounded-lg transition-colors shadow-sm hover:shadow-md">
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
