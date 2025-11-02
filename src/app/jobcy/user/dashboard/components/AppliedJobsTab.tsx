"use client";

import { useState, useEffect } from "react";
import { Briefcase, MapPin, Calendar, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface AppliedJob {
  id: string;
  jobId: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  status: "Applied" | "Under Review" | "Interview" | "Rejected" | "Accepted";
  appliedDate: string;
  type?: string;
}

interface AppliedJobsTabProps {
  isDark?: boolean;
}

export default function AppliedJobsTab({ isDark: _isDark = false }: AppliedJobsTabProps) {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAppliedJobs();

    // Auto-refresh every 30 seconds (reduced from 10s)
    const interval = setInterval(() => {
      fetchAppliedJobs();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your applications");
        setLoading(false);
        return;
      }

      // Correct endpoint: singular 'user'
      const response = await fetch(`${"/api/jobcy"}/user/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Normalize shape to array
        const dataObj = data as Record<string, unknown>;
        const items = Array.isArray(data)
          ? data
          : Array.isArray(dataObj.items)
          ? dataObj.items
          : Array.isArray(dataObj.applications)
          ? dataObj.applications
          : [];
        
        // Safely map applications with error handling
        const mappedApplications = items.map((it: Record<string, unknown>) => {
          try {
            const job = it.job as Record<string, unknown> | undefined;
            const status = typeof it.status === 'string' ? it.status : '';
            
            return {
              id: String(it.id || it._id || Math.random()),
              jobId: String(it.jobId || job?.id || job?._id || ""),
              title: String(it.title || job?.title || "Unknown Position"),
              company: String(it.company || job?.company || "Unknown Company"),
              location: String(it.location || job?.location || "Not specified"),
              salary: it.salary ? String(it.salary) : (job?.salary ? String(job.salary) : undefined),
              status:
                status === "rejected"
                  ? "Rejected" as const
                  : status === "accepted" || status === "offered"
                  ? "Accepted" as const
                  : status.toLowerCase().includes("interview")
                  ? "Interview" as const
                  : status.toLowerCase().includes("review")
                  ? "Under Review" as const
                  : "Applied" as const,
              appliedDate: String(it.appliedAt || it.createdAt || new Date().toISOString()),
              type: it.type ? String(it.type) : (job?.type ? String(job.type) : undefined),
            };
          } catch (mapError) {
            console.error("Error mapping application:", mapError);
            return null;
          }
        }).filter((app): app is AppliedJob => app !== null);
        
        setAppliedJobs(mappedApplications);
        setError(""); // Clear error on success
      } else {
        // Better error handling
        let errorMessage = `Failed to fetch applications`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          errorMessage = `Server error (${response.status})`;
        }
        
        setError(errorMessage);
        
        // If 401, redirect to login
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/jobcy/user/auth/login";
        }
      }
    } catch (err) {
      console.error("Error fetching applied jobs:", err);
      setError("Unable to load applications. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Applied":
        return "bg-blue-50 text-[#0A66C2] border border-blue-200";
      case "Under Review":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Interview":
        return "bg-indigo-50 text-indigo-700 border border-indigo-200";
      case "Accepted":
        return "bg-green-50 text-green-700 border border-green-200";
      case "Rejected":
        return "bg-red-50 text-red-700 border border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Applied":
        return <Clock className="w-4 h-4" />;
      case "Under Review":
        return <AlertCircle className="w-4 h-4" />;
      case "Interview":
        return <Calendar className="w-4 h-4" />;
      case "Accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "Rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#0A66C2]/20 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-[#0A66C2] border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700">
            Loading your applications...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-red-100">
          <XCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          Error Loading Applications
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {error}
        </p>
        <button
          onClick={fetchAppliedJobs}
          className="mt-4 px-6 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-colors font-semibold shadow-sm hover:shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Applied Jobs
          </h2>
          <p className="mt-1 text-gray-600">
            Track your job applications and their status
          </p>
        </div>
        <div className="px-4 py-2 rounded-lg bg-gray-100">
          <span className="text-sm font-medium text-gray-700">
            {appliedJobs.length} Application{appliedJobs.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

      {/* Applications List */}
      {appliedJobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gray-100">
            <Briefcase className="w-8 h-8 text-gray-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900">
            No Applications Yet
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Start applying to jobs to see your applications here
          </p>
          <button
            onClick={() => window.location.href = "/jobcy/user/dashboard"}
            className="px-6 py-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-lg transition-colors font-semibold shadow-sm hover:shadow-md"
          >
            Browse Jobs
          </button>
        </div>
      ) : (
        <div className="grid gap-4">
          {appliedJobs.map((application) => (
            <div
              key={application.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-[#0A66C2] to-[#004182] shadow-sm">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold truncate text-gray-900">
                        {application.title}
                      </h3>
                      <p className="text-sm font-medium mb-2 text-gray-700">
                        {application.company}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{application.location}</span>
                        </div>
                        {application.salary && (
                          <div className="flex items-center space-x-1">
                            <span>₹{application.salary}</span>
                          </div>
                        )}
                        {application.type && (
                          <div className="flex items-center space-x-1">
                            <span>{application.type}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-3">
                  <div className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {getStatusIcon(application.status)}
                    <span>{application.status}</span>
                  </div>

                  <div className="text-xs text-gray-500">
                    Applied {new Date(application.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
