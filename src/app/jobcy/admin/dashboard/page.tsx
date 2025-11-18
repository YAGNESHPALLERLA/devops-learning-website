"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Users,
  Briefcase,
  FileText,
  TrendingUp,
  // Plus,
  Settings,
  LogOut,
  Search,
  Bell,
  Calendar,
  ArrowUpRight,
  Activity,
  Building2,
  UserCheck,
  Filter,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
interface StatCardProps {
  title: string;
  value: string | number;
  change?: string | number;
  icon: React.ElementType;
  color?: string;
  onClick?: () => void;
}

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color?: string;
  onClick?: () => void;
}

interface ActivityItem {
  id: string | number;
  type: "hr_joined" | "job_posted" | "application";
  message: string;
  time: string;
}

interface RawUser {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
}

interface RawJob {
  id?: string;
  _id?: string;
  title: string;
  company: string;
  location?: string;
}

interface RawApplication {
  _id?: string;
  id?: string;
  jobId?: {
    _id?: string;
    title?: string;
    company?: string;
  };
  userId?: {
    _id?: string;
    name?: string;
    email?: string;
  };
  status?: string;
  appliedDate?: string;
  createdAt?: string;
}

export default function AdminDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>("overview");

  const [stats, setStats] = useState({
    totalHRs: 0,
    totalJobs: 0,
    totalApplications: 0,
    activeJobs: 0,
  });

  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [users, setUsers] = useState<RawUser[]>([]);
  const [jobs, setJobs] = useState<RawJob[]>([]);
  const [applications, setApplications] = useState<RawApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);


  // Refresh dashboard data
  const refreshDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setRefreshing(true);
    try {
      const [statsRes, activityRes, usersRes, jobsRes, applicationsRes] = await Promise.all([
        fetch(`${"/api/jobcy"}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${"/api/jobcy"}/admin/activity`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${"/api/jobcy"}/user/list`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${"/api/jobcy"}/jobs/browse`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${"/api/jobcy"}/admin/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      if (activityRes.ok) {
        const activityData = await activityRes.json();
        setRecentActivity(activityData);
      }
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        // Handle both array response and object with users property
        setUsers(Array.isArray(usersData) ? usersData : (usersData.users || []));
      } else if (usersRes.status === 404) {
        console.warn('Users endpoint not found, trying alternative endpoint');
        // Try alternative endpoint as fallback
        try {
          const altUsersRes = await fetch(`${"/api/jobcy"}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (altUsersRes.ok) {
            const altUsersData = await altUsersRes.json();
            setUsers(Array.isArray(altUsersData) ? altUsersData : (altUsersData.users || []));
          }
        } catch (altErr) {
          console.error('Alternative users endpoint also failed:', altErr);
        }
      }
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      }
      if (applicationsRes.ok) {
        const applicationsData = await applicationsRes.json();
        setApplications(applicationsData);
      }
    } catch (err) {
      console.error("Error refreshing data:", err);
    } finally {
      setRefreshing(false);
    }
  };

  // Simulate loading dashboard data
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/jobcy/admin/auth/login"); // redirect if not logged in
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const [statsRes, activityRes, usersRes, jobsRes, applicationsRes] = await Promise.all([
          fetch(`${"/api/jobcy"}/admin/stats`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${"/api/jobcy"}/admin/activity`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${"/api/jobcy"}/user/list`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${"/api/jobcy"}/jobs/browse`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${"/api/jobcy"}/admin/applications`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        } else {
          console.error("Stats fetch failed:", statsRes.status, statsRes.statusText);
          if (statsRes.status === 403) {
            router.push("/jobcy/admin/auth/login");
            return;
          }
        }
        if (activityRes.ok) {
          const activityData = await activityRes.json();
          setRecentActivity(activityData);
        } else {
          console.error("Activity fetch failed:", activityRes.status, activityRes.statusText);
        }
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        // Handle both array response and object with users property
        setUsers(Array.isArray(usersData) ? usersData : (usersData.users || []));
      } else if (usersRes.status === 404) {
        console.warn('Users endpoint not found, trying alternative endpoint');
        // Try alternative endpoint as fallback
        try {
          const altUsersRes = await fetch(`${"/api/jobcy"}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (altUsersRes.ok) {
            const altUsersData = await altUsersRes.json();
            setUsers(Array.isArray(altUsersData) ? altUsersData : (altUsersData.users || []));
          }
        } catch (altErr) {
          console.error('Alternative users endpoint also failed:', altErr);
        }
      } else {
          console.error("Users fetch failed:", usersRes.status, usersRes.statusText);
        }
        if (jobsRes.ok) {
          const jobsData = await jobsRes.json();
          setJobs(jobsData);
        } else {
          console.error("Jobs fetch failed:", jobsRes.status, jobsRes.statusText);
        }
        if (applicationsRes.ok) {
          const applicationsData = await applicationsRes.json();
          setApplications(applicationsData);
        } else {
          console.error("Applications fetch failed:", applicationsRes.status, applicationsRes.statusText);
        }
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        router.push("/jobcy/admin/auth/login"); // if token expired, go back to login
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  // Auto-refresh applications data every 5 seconds when on applications tab
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token && activeTab === "applications") {
        fetch(`${"/api/jobcy"}/admin/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              console.error("Auto-refresh applications failed:", res.status, res.statusText);
              return [];
            }
          })
          .then(data => setApplications(data))
          .catch(err => console.error("Auto-refresh applications error:", err));
      }
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [activeTab]);

  // Auto-refresh stats data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${"/api/jobcy"}/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              console.error("Auto-refresh stats failed:", res.status, res.statusText);
              return null;
            }
          })
          .then(data => {
            if (data) setStats(data);
          })
          .catch(err => console.error("Auto-refresh stats error:", err));
      }
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto-refresh recent activity data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      if (token) {
        fetch(`${"/api/jobcy"}/admin/activity`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            } else {
              console.error("Auto-refresh activity failed:", res.status, res.statusText);
              return [];
            }
          })
          .then(data => setRecentActivity(data))
          .catch(err => console.error("Auto-refresh activity error:", err));
      }
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    change,
    icon: Icon,
    color,
    onClick,
  }) => (
    <div
      className="bg-[#1a1a1a] border border-gray-700 hover:border-orange-500/50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-400 text-sm font-medium">
            {title}
          </p>
          <p className="text-3xl font-bold text-white mt-2">
            {value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-emerald-400 mr-1" />
              <span className="text-emerald-400 text-sm font-medium">
                +{change}% this month
              </span>
            </div>
          )}
          {onClick && (
            <div className="flex items-center mt-3 text-xs font-semibold text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View Details</span>
              <ArrowUpRight className="w-3 h-3 ml-1" />
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 group-hover:scale-110 transition-transform shadow-lg shadow-orange-500/30`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const QuickActionCard: React.FC<QuickActionCardProps> = ({
    title,
    description,
    icon: Icon,
    color,
    onClick,
  }) => (
    <div
      className="bg-[#1a1a1a] border border-gray-700 hover:border-orange-500/50 rounded-xl p-6 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">
            {description}
          </p>
        </div>
        <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 ml-4 shadow-lg shadow-orange-500/30">
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
      <div className="flex items-center text-orange-400 group-hover:text-orange-300 text-sm font-medium mt-4">
        <span>Manage</span>
        <ArrowUpRight className="w-4 h-4 ml-1" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="bg-[#1a1a1a] shadow-lg border-b border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <Briefcase className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    Job Portal Admin
                  </h1>
                  <p className="text-sm text-gray-400">
                    Dashboard Overview
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search
                  className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-700 bg-[#0a0a0a] text-white placeholder:text-gray-500 focus:bg-[#0f0f0f] focus:ring-orange-500 focus:border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 w-64"
                />
              </div>


              <button className="p-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 hover:border-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-300 hover:text-orange-400 hover:bg-gray-800 rounded-lg transition-colors border border-gray-700 hover:border-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                  <span className="text-white font-semibold text-sm">
                    A
                  </span>
                </div>
                <span className="font-medium">Admin</span>
              </button>
              <button className="p-2 text-gray-300 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors border border-gray-700 hover:border-red-500/50">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="border-b border-gray-700 bg-[#1a1a1a]">
        <div className="px-6">
          <nav className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Activity },
              { id: "users", label: "Users", icon: Users },
              { id: "jobs", label: "Jobs", icon: Briefcase },
              { id: "applications", label: "Applications", icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Refresh data when switching to applications tab
                    if (tab.id === "applications") {
                      refreshDashboardData();
                    }
                  }}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-orange-500 text-orange-400"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {(() => {
          switch (activeTab) {
            case "overview":
              return (
                <div>
                  {/* Welcome Section */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2
                          className={`text-2xl font-bold ${
                            "text-white"
                          }`}
                        >
                          Welcome back, Admin
                        </h2>
                        <p
                          className={`${
                            "text-gray-400"
                          } mt-1`}
                        >
                          Here it is what is happening with your job portal today.
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div
                          className="flex items-center text-gray-300 bg-[#1a1a1a] border-gray-700 px-3 py-2 rounded-lg border"
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          <span className="text-sm">
                            {new Date().toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                      title="Total HRs (Users)"
                      value={stats.totalHRs}
                      change="12"
                      icon={Users}
                      color="bg-blue-500"
                      onClick={() => setActiveTab("users")}
                    />
                    <StatCard
                      title="Jobs Posted by HRs"
                      value={stats.totalJobs}
                      change="8"
                      icon={Briefcase}
                      color="bg-emerald-500"
                      onClick={() => setActiveTab("jobs")}
                    />
                    <StatCard
                      title="Applications Received"
                      value={stats.totalApplications.toLocaleString()}
                      change="23"
                      icon={FileText}
                      color="bg-amber-500"
                      onClick={() => setActiveTab("applications")}
                    />
                    <StatCard
                      title="Active Job Listings"
                      value={stats.activeJobs}
                      change="5"
                      icon={Activity}
                      color="bg-red-500"
                      onClick={() => setActiveTab("jobs")}
                    />
                  </div>

                  {/* Quick Actions & Recent Activity */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
                      <div
                        className={`${
                          "bg-[#1a1a1a] border-gray-700"
                        } rounded-xl shadow-lg border p-6`}
                      >
                        <div className="flex items-center justify-between mb-6">
                          <h3
                            className={`text-lg font-semibold ${
                              "text-white"
                            }`}
                          >
                            Quick Management
                          </h3>
                          <Filter
                            className={`w-5 h-5 ${
                              "text-gray-400"
                            }`}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <QuickActionCard
                            title="HR Management"
                            description="Manage HR users, approvals, and permissions"
                            icon={Users}
                            color="bg-blue-500"
                            onClick={() => router.push("/jobcy/admin/hr-management")}
                          />
                          <QuickActionCard
                            title="Job Listings"
                            description="Review, approve, and manage job posts"
                            icon={Briefcase}
                            color="bg-emerald-500"
                            onClick={() => setActiveTab("jobs")}
                          />
                          <QuickActionCard
                            title="Applications"
                            description="Monitor application flow and analytics"
                            icon={FileText}
                            color="bg-amber-500"
                            onClick={() => setActiveTab("applications")}
                          />
                          <QuickActionCard
                            title="Company Profiles"
                            description="Manage company registrations and profiles"
                            icon={Building2}
                            color="bg-red-500"
                            onClick={() => router.push("/jobcy/admin/company-management")}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    <div
                      className="bg-[#1a1a1a] border-gray-700 rounded-xl shadow-lg border p-6"
                    >
                      <h3
                        className="text-lg font-semibold text-white mb-6"
                      >
                        Recent Activity
                      </h3>

                      <div className="space-y-4">
                        {recentActivity.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                activity.type === "hr_joined"
                                  ? "bg-blue-900/30 border border-blue-500/50"
                                  : activity.type === "job_posted"
                                  ? "bg-emerald-900/30 border border-emerald-500/50"
                                  : "bg-amber-900/30 border border-amber-500/50"
                              }`}
                            >
                              {activity.type === "hr_joined" && (
                                <UserCheck className="w-4 h-4 text-blue-400" />
                              )}
                              {activity.type === "job_posted" && (
                                <Briefcase className="w-4 h-4 text-emerald-400" />
                              )}
                              {activity.type === "application" && (
                                <FileText className="w-4 h-4 text-amber-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p
                                className={`text-sm ${
                                  "text-white"
                                }`}
                              >
                                {activity.message}
                              </p>
                              <p
                                className={`text-xs ${
                                  "text-gray-400"
                                } mt-1`}
                              >
                                {activity.time}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        className={`w-full mt-4 ${
                          "text-orange-400 hover:text-orange-300 border-gray-700 hover:bg-orange-900/20"
                        } text-sm font-medium py-2 border rounded-lg transition-colors`}
                      >
                        View All Activity
                      </button>
                    </div>
                  </div>
                </div>
              );
            case "users":
              return (
                <div className="mb-8">
                  <h2 className={`text-2xl font-bold ${"text-white"} mb-4`}>
                    User Management
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {users.map((user: RawUser) => (
                      <div key={user._id} className={`p-4 rounded-lg border ${"bg-[#1a1a1a] border-gray-700"}`}>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30">
                            <span className="text-white font-bold">{user.name?.[0]?.toUpperCase()}</span>
                          </div>
                          <div>
                            <p className={`font-medium ${"text-white"}`}>{user.name}</p>
                            <p className={`text-sm ${"text-gray-400"}`}>{user.email}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case "jobs":
              return (
                <div className="mb-8">
                  <h2 className={`text-2xl font-bold ${"text-white"} mb-4`}>
                    Job Listings
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {jobs.map((job: RawJob) => (
                      <div key={job.id || job._id} className={`p-4 rounded-lg border ${"bg-[#1a1a1a] border-gray-700"}`}>
                        <h3 className={`font-semibold ${"text-white"}`}>{job.title}</h3>
                        <p className={`text-sm ${"text-gray-400"}`}>{job.company}</p>
                        <p className={`text-sm ${"text-gray-400"}`}>{job.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            case "applications":
              return (
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className={`text-2xl font-bold ${"text-white"}`}>
                      Applications
                    </h2>
                    <button
                      onClick={refreshDashboardData}
                      disabled={refreshing}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                        "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white disabled:from-gray-700 disabled:to-gray-700 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
                      } disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      {refreshing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Refreshing...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>Refresh</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="space-y-4">
                    {applications.length === 0 ? (
                      <div className={`p-8 rounded-lg border text-center ${"bg-[#1a1a1a] border-gray-700"}`}>
                        <p className={`text-lg ${"text-gray-300"}`}>
                          No applications found
                        </p>
                        <p className={`text-sm mt-2 ${"text-gray-400"}`}>
                          Applications will appear here when users apply to jobs
                        </p>
                      </div>
                    ) : (
                      applications.map((app: RawApplication) => (
                        <div key={app._id || app.id} className={`p-4 rounded-lg border ${"bg-[#1a1a1a] border-gray-700"}`}>
                          <p className={`font-medium ${"text-white"}`}>
                            {app.jobId?.title || 'Unknown Job'} - {app.userId?.name || 'Unknown User'}
                          </p>
                          <p className={`text-sm ${"text-gray-400"}`}>
                            Status: {app.status || 'Applied'} | Applied: {new Date(app.appliedDate || app.createdAt || Date.now()).toLocaleDateString()}
                          </p>
                          {app.userId?.email && (
                            <p className={`text-xs mt-1 ${"text-gray-400"}`}>
                              Email: {app.userId.email}
                            </p>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })()}
      </div>
    </div>
  );
}
