// src/app/jobcy/user/dashboard/page.tsx - MODERN REDESIGN
"use client";

import { SetStateAction, useState, useEffect } from "react";
import {
  Briefcase,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  TrendingUp,
  Calendar,
  Users,
  FileCheck,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { useDashboardData } from "./hooks/useDashboardData";
import Sidebar from "./components/Sidebar";
import ProfileTab from "./components/ProfileTab";
import JobsTab from "./components/JobsTab";
import AppliedJobsTab from "./components/AppliedJobsTab";
import ConnectTab from "./components/ConnectTab";
import ConnectionRequestsTab from "./components/ConnectionRequestsTab";
import InterviewsTab from "./components/InterviewsTab";
import ProfileEditModal from "./components/ProfileEditModal";
import NotificationsTab from "./components/NotificationsTab";
import { ProfessionalApplicationTracker } from "./components/ProfessionalApplicationTracker";
import { StatsCard } from "../../components/ui/StatsCard";
import { Card } from "../../components/ui/Card";
import { UserProfile } from "@/app/jobcy/types/dashboard";

export default function JobSeekerDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDark, setIsDark] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileModalSection, setProfileModalSection] = useState<string>("personal");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Check if user has correct role
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.role !== "user") {
          console.log("⚠️ Unauthorized access to user dashboard. Redirecting...");
          if (user.role === "hr") {
            window.location.href = "/jobcy/hr/dashboard";
          } else if (user.role === "admin") {
            window.location.href = "/jobcy/admin/dashboard";
          } else {
            window.location.href = "/jobcy/user/auth/login";
          }
        }
      } catch (error) {
        console.error("Error checking user role:", error);
      }
    }
  }, []);

  // Theme detection
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(prefersDark);
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }, []);

  const {
    isLoading,
    userProfile,
    education,
    experience,
    allJobs,
    appliedJobs,
    connections,
    interviews,
    updateProfile,
    refetch,
  } = useDashboardData();

  // Helper: get first letter of name
  const getInitial = (name: string) => (name ? name.charAt(0).toUpperCase() : "U");

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/jobcy/user/auth/login");
    }
  };

  // Calculate stats
  const stats = {
    applications: appliedJobs?.length || 0,
    interviews: interviews?.length || 0,
    connections: connections?.length || 0,
    savedJobs: 0, // TODO: Add saved jobs feature
  };

  // Transform applied jobs for Application Tracker
  const normalizeStatus = (status: string | undefined): "applied" | "review" | "interview" | "offered" | "rejected" => {
    if (!status) return "applied";
    const normalized = status.toLowerCase().replace(/\s+/g, '').replace(/_/g, '');
    if (normalized.includes('reject')) return "rejected";
    if (normalized.includes('offer') || normalized.includes('accept')) return "offered";
    if (normalized.includes('interview')) return "interview";
    if (normalized.includes('review')) return "review";
    return "applied";
  };

  interface AppliedJobData {
    id?: string;
    _id?: string;
    status?: string;
    appliedAt?: string;
    createdAt?: string;
    interviewDate?: string;
    job?: {
      title?: string;
      company?: string;
      location?: string;
    };
    title?: string;
    company?: string;
    location?: string;
  }

  const trackerApplications = (appliedJobs || []).map((app: AppliedJobData) => ({
    id: String(app.id || app._id || Math.random()),
    jobTitle: app.job?.title || app.title || "Unknown Position",
    company: app.job?.company || app.company || "Unknown Company",
    status: normalizeStatus(app.status),
    appliedDate: app.appliedAt || app.createdAt || new Date().toISOString(),
    interviewDate: app.interviewDate,
    location: app.job?.location || app.location,
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-500/20 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-white">
            Loading your dashboard...
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-[#1a1a1a]/95 backdrop-blur-md supports-[backdrop-filter]:bg-[#1a1a1a]/90 shadow-lg shadow-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
                {/* Left: Logo & Menu */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
                  >
                    {showMobileMenu ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}
                  </button>
                  
                  {/* Navigation Arrows */}
                  <div className="flex items-center space-x-1 border-r border-gray-700 pr-4">
                    <button
                      onClick={() => router.back()}
                      className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                      title="Go back"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => router.forward()}
                      className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-white"
                      title="Go forward"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div 
                    className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity group"
                    onClick={() => router.push("/jobcy/")}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all group-hover:scale-105">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div className="hidden sm:block">
                      <h1 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">Jobcy</h1>
                      <p className="text-xs text-gray-400">Find Your Dream Job</p>
                    </div>
                  </div>
                </div>


            {/* Right: Actions */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <button
                onClick={() => setActiveTab("notifications")}
                className="relative p-2.5 rounded-lg bg-[#0a0a0a] text-gray-300 hover:bg-gray-800 hover:text-white transition-all border border-gray-700 hover:border-gray-600"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a1a1a]"></span>
              </button>

              {/* Settings */}
              <button
                className="p-2.5 rounded-lg bg-[#0a0a0a] text-gray-300 hover:bg-gray-800 hover:text-white transition-all border border-gray-700 hover:border-gray-600"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors border border-gray-700 hover:border-gray-600"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold shadow-lg shadow-blue-500/30">
                    {getInitial(userProfile.name)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-white">
                      {userProfile.name}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 hidden md:block text-gray-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-xl py-1 z-50 animate-scaleIn">
                    <div className="px-4 py-3 border-b border-gray-700">
                      <p className="font-semibold text-white">{userProfile.name}</p>
                      <p className="text-xs text-gray-400">{userProfile.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      View Profile
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                      Account Settings
                    </button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-900/20 hover:text-red-300 transition-colors flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`${showMobileMenu ? "block" : "hidden"} lg:block`}>
          <Sidebar
            activeTab={activeTab}
            setActiveTab={(tab: SetStateAction<string>) => {
              setActiveTab(tab);
              setShowMobileMenu(false);
            }}
            isDark={isDark}
            userProfile={userProfile}
            interviewsCount={interviews.length}
          />
        </div>

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden max-w-7xl mx-auto w-full">

          {/* Dashboard Overview Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fadeIn">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                  title="Applications Sent"
                  value={stats.applications}
                  icon={<Briefcase className="w-6 h-6" />}
                  trend={{ value: 12, label: "this month", positive: true }}
                />
                <StatsCard
                  title="Interviews Scheduled"
                  value={stats.interviews}
                  icon={<Calendar className="w-6 h-6" />}
                  trend={{ value: 8, label: "upcoming", positive: true }}
                />
                <StatsCard
                  title="Connections"
                  value={stats.connections}
                  icon={<Users className="w-6 h-6" />}
                  trend={{ value: 15, label: "new", positive: true }}
                />
                <StatsCard
                  title="Profile Views"
                  value={userProfile.profileCompletion || 0}
                  icon={<TrendingUp className="w-6 h-6" />}
                  trend={{ value: 23, label: "this week", positive: true }}
                />
              </div>

              {/* Professional Application Tracker */}
              <ProfessionalApplicationTracker applications={trackerApplications} />

              {/* Quick Actions */}
              <Card variant="elevated">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveTab("jobs")}
                      className="p-4 rounded-lg bg-[#0a0a0a] border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all text-left group transform hover:scale-[1.02]"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">Find Jobs</h3>
                      <p className="text-sm text-gray-400">
                        Browse available positions
                      </p>
                    </button>
                    <button
                      onClick={() => {
                        setProfileModalSection("personal");
                        setShowProfileModal(true);
                      }}
                      className="p-4 rounded-lg bg-[#0a0a0a] border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all text-left group transform hover:scale-[1.02]"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                        <FileCheck className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">
                        Complete Profile
                      </h3>
                      <p className="text-sm text-gray-400">
                        {userProfile.profileCompletion || 0}% complete
                      </p>
                    </button>
                    <button
                      onClick={() => setActiveTab("connect")}
                      className="p-4 rounded-lg bg-[#0a0a0a] border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all text-left group transform hover:scale-[1.02]"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/30">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-white mb-1">Network</h3>
                      <p className="text-sm text-gray-400">
                        Connect with professionals
                      </p>
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Other Tabs */}
          {activeTab === "profile" && (
            <ProfileTab
              userProfile={userProfile}
              education={education}
              experience={experience}
              isDark={isDark}
              onEditProfile={(section = "personal") => {
                setProfileModalSection(section);
                setShowProfileModal(true);
              }}
              updateProfile={updateProfile}
            />
          )}

          {activeTab === "jobs" && (
            <JobsTab
              allJobs={allJobs.map((j) => ({ ...j, id: String(j.id) }))}
              isDark={isDark}
            />
          )}

          {activeTab === "applied" && (
            <AppliedJobsTab isDark={isDark} />
          )}

          {activeTab === "connect" && <ConnectTab connections={connections} isDark={isDark} />}

          {activeTab === "requests" && <ConnectionRequestsTab isDark={isDark} />}

          {activeTab === "notifications" && <NotificationsTab isDark={isDark} />}

          {activeTab === "interviews" && interviews.length > 0 && (
            <InterviewsTab
              interviews={interviews.map((i) => ({
                ...i,
                id: String(i.id),
                jobId: i.jobId !== undefined ? String(i.jobId) : undefined,
              }))}
              isDark={isDark}
            />
          )}
          {activeTab === "interviews" && interviews.length === 0 && (
            <div className="text-center mt-16 text-gray-500">
              No interviews scheduled yet.
            </div>
          )}
        </main>
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <ProfileEditModal
          userProfile={userProfile}
          experience={experience}
          isDark={isDark}
          initialSection={profileModalSection}
          onClose={() => setShowProfileModal(false)}
          onRefetch={refetch}
          onSave={async (data: Partial<UserProfile>) => {
            const normalizedData: Partial<UserProfile> = {
              ...data,
              education: data.education?.map((e) => ({ ...e, endDate: e.endDate || "" })),
              experienceList: data.experienceList?.map((e) => ({ ...e, endDate: e.endDate || "" })),
            };
            const result = await updateProfile(normalizedData);
            if (result.success) {
              refetch();
            }
            return result;
          }}
        />
      )}

      {/* Overlays */}
      {showMobileMenu && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setShowMobileMenu(false)}
        ></div>
      )}
      {showUserMenu && (
        <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)}></div>
      )}
    </div>
  );
}
