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
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#0A66C2]/20 rounded-full"></div>
            <div className="w-20 h-20 border-4 border-[#0A66C2] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-6 text-lg font-medium text-gray-900">
            Loading your dashboard...
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Please wait while we fetch your data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Modern Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/95 border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
                {/* Left: Logo & Menu */}
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {showMobileMenu ? (
                      <X className="w-5 h-5 text-gray-700" />
                    ) : (
                      <Menu className="w-5 h-5 text-gray-700" />
                    )}
                  </button>
                  
                  <div 
                    className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity group"
                    onClick={() => router.push("/jobcy/")}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div className="hidden sm:block">
                      <h1 className="text-xl font-bold text-gray-900 group-hover:text-[#0A66C2] transition-colors">Jobcy</h1>
                      <p className="text-xs text-gray-600">Find Your Dream Job</p>
                    </div>
                  </div>
                  
                  {/* Home Button */}
                  <Link
                    href="/"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 text-gray-700 hover:text-[#0A66C2]"
                    title="Go to Home"
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden md:inline text-sm font-medium">Home</span>
                  </Link>
                </div>


            {/* Right: Actions */}
            <div className="flex items-center space-x-2">
              {/* Notifications */}
              <button
                onClick={() => setActiveTab("notifications")}
                className="relative p-2.5 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>

              {/* Settings */}
              <button
                className="p-2.5 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors border border-gray-200"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-lg flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                    {getInitial(userProfile.name)}
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {userProfile.name}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 hidden md:block text-gray-600" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-semibold text-gray-900">{userProfile.name}</p>
                      <p className="text-xs text-gray-600">{userProfile.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      View Profile
                    </button>
                    <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      Account Settings
                    </button>
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-2"
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
                  <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveTab("jobs")}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#0A66C2]/30 hover:shadow-md transition-all text-left group"
                    >
                      <div className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Briefcase className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Find Jobs</h3>
                      <p className="text-sm text-gray-600">
                        Browse available positions
                      </p>
                    </button>
                    <button
                      onClick={() => {
                        setProfileModalSection("personal");
                        setShowProfileModal(true);
                      }}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#0A66C2]/30 hover:shadow-md transition-all text-left group"
                    >
                      <div className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <FileCheck className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        Complete Profile
                      </h3>
                      <p className="text-sm text-gray-600">
                        {userProfile.profileCompletion || 0}% complete
                      </p>
                    </button>
                    <button
                      onClick={() => setActiveTab("connect")}
                      className="p-4 rounded-lg bg-gray-50 border border-gray-200 hover:border-[#0A66C2]/30 hover:shadow-md transition-all text-left group"
                    >
                      <div className="w-8 h-8 bg-[#0A66C2] rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Users className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Network</h3>
                      <p className="text-sm text-gray-600">
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
