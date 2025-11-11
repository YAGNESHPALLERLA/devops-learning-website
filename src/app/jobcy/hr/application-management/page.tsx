"use client";

import React, { useState, useEffect } from "react";
import {
  // Users,
  FileText,
  Search,
  Filter,
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MoreVertical,
  User,
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

type ApplicationStatus = "applied" | "under_review" | "interview" | "offered" | "rejected";

type StatusAction = {
  label: string;
  target: ApplicationStatus;
  icon: LucideIcon;
  className: string;
};

type Application = {
  id: number;
  jobId: number;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  location: string;
  appliedDate: string;
  status: ApplicationStatus;
  experience: string;
  education: string;
  resumeUrl: string | null;
  coverLetter: string;
  skills: string[];
  rating: number;
  userId: string;
  hasResume: boolean;
};

type Job = {
  id: number;
  title: string;
  department: string;
};

const normalizeStatus = (status: unknown): ApplicationStatus => {
  if (typeof status !== "string" || status.trim().length === 0) {
    return "applied";
  }

  const normalized = status.toLowerCase();

  if (normalized.includes("reject")) {
    return "rejected";
  }

  if (normalized.includes("offer")) {
    return "offered";
  }

  if (normalized.includes("interview")) {
    return "interview";
  }

  if (normalized.includes("review")) {
    return "under_review";
  }

  return "applied";
};

export default function ApplicationsManagement() {
  const STATUS_META: Record<
    ApplicationStatus,
    {
      label: string;
      chipClass: string;
      summaryClass: string;
      icon: LucideIcon;
    }
  > = {
    applied: {
      label: "Applied",
      chipClass: "bg-blue-100 text-blue-800",
      summaryClass: "text-blue-600",
      icon: Clock,
    },
    under_review: {
      label: "Under Review",
      chipClass: "bg-amber-100 text-amber-800",
      summaryClass: "text-amber-600",
      icon: Search,
    },
    interview: {
      label: "Interview",
      chipClass: "bg-indigo-100 text-indigo-800",
      summaryClass: "text-indigo-600",
      icon: Calendar,
    },
    offered: {
      label: "Offered",
      chipClass: "bg-green-100 text-green-800",
      summaryClass: "text-green-600",
      icon: CheckCircle,
    },
    rejected: {
      label: "Rejected",
      chipClass: "bg-red-100 text-red-700",
      summaryClass: "text-red-600",
      icon: XCircle,
    },
  };

  const STATUS_PAYLOAD: Record<ApplicationStatus, string> = {
    applied: "Applied",
    under_review: "Under Review",
    interview: "Interview Scheduled",
    offered: "Offered",
    rejected: "Rejected",
  };

  const STATUS_ACTIONS: Record<ApplicationStatus, StatusAction[]> = {
    applied: [
      {
        label: "Move to Under Review",
        target: "under_review",
        icon: Search,
        className: "bg-amber-600 hover:bg-amber-700",
      },
      {
        label: "Schedule Interview",
        target: "interview",
        icon: Calendar,
        className: "bg-indigo-600 hover:bg-indigo-700",
      },
      {
        label: "Mark Offered",
        target: "offered",
        icon: CheckCircle,
        className: "bg-green-600 hover:bg-green-700",
      },
      {
        label: "Reject",
        target: "rejected",
        icon: XCircle,
        className: "bg-red-600 hover:bg-red-700",
      },
    ],
    under_review: [
      {
        label: "Schedule Interview",
        target: "interview",
        icon: Calendar,
        className: "bg-indigo-600 hover:bg-indigo-700",
      },
      {
        label: "Mark Offered",
        target: "offered",
        icon: CheckCircle,
        className: "bg-green-600 hover:bg-green-700",
      },
      {
        label: "Move Back to Applied",
        target: "applied",
        icon: Clock,
        className: "bg-blue-600 hover:bg-blue-700",
      },
      {
        label: "Reject",
        target: "rejected",
        icon: XCircle,
        className: "bg-red-600 hover:bg-red-700",
      },
    ],
    interview: [
      {
        label: "Mark Offered",
        target: "offered",
        icon: CheckCircle,
        className: "bg-green-600 hover:bg-green-700",
      },
      {
        label: "Move Back to Review",
        target: "under_review",
        icon: Search,
        className: "bg-amber-600 hover:bg-amber-700",
      },
      {
        label: "Reject",
        target: "rejected",
        icon: XCircle,
        className: "bg-red-600 hover:bg-red-700",
      },
    ],
    offered: [
      {
        label: "Move Back to Interview",
        target: "interview",
        icon: Calendar,
        className: "bg-indigo-600 hover:bg-indigo-700",
      },
      {
        label: "Move Back to Review",
        target: "under_review",
        icon: Search,
        className: "bg-amber-600 hover:bg-amber-700",
      },
      {
        label: "Reject",
        target: "rejected",
        icon: XCircle,
        className: "bg-red-600 hover:bg-red-700",
      },
    ],
    rejected: [
      {
        label: "Reopen Application",
        target: "applied",
        icon: Clock,
        className: "bg-blue-600 hover:bg-blue-700",
      },
    ],
  };

  // State for all applications
  const [applications, setApplications] = useState<Application[]>([]);

  // State for all jobs
  const [jobs, setJobs] = useState<Job[]>([]);

  // Currently selected job filter
  const [selectedJob, setSelectedJob] = useState<string>("all");

  // Get job filter from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const jobParam = urlParams.get('job');
    if (jobParam) {
      setSelectedJob(jobParam);
      console.log('Job filter from URL:', jobParam);
    }
  }, []);

  // Currently selected status filter
  const [selectedStatus, setSelectedStatus] = useState<"all" | ApplicationStatus>("all");

  // Search input
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Currently selected applicant for modal
  const [selectedApplicant, setSelectedApplicant] =
    useState<Application | null>(null);

  // Modal visibility
  const [showModal, setShowModal] = useState<boolean>(false);

  // Expanded job groups
  const [expandedJobs, setExpandedJobs] = useState<Set<string>>(new Set(["all"]));

  // Loading state for async actions
  const [isLoading, setIsLoading] = useState<boolean>(false);


  // Load real applications from backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const shouldUseProxy = (() => {
          if (!baseUrl) return true;
          try {
            const parsed = new URL(baseUrl, typeof window !== "undefined" ? window.location.origin : undefined);
            if (typeof window !== "undefined" && parsed.origin !== window.location.origin) {
              return true;
            }
          } catch {
            return true;
          }
          return false;
        })();

        const endpoint = shouldUseProxy
          ? `${"/api/jobcy"}/hr/applications`
          : `${(baseUrl ?? "").replace(/\/$/, "")}/hr/applications`;

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const applicationsData = await response.json();
          console.log('Frontend received applications:', applicationsData);

          // Transform backend data to match frontend interface
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const transformedApplications: Application[] = applicationsData.map((app: any, index: number) => ({
            id: app._id || index + 1,
            jobId: app.jobId?._id || app.jobId,
            jobTitle: app.jobId?.title || 'Unknown Job',
            applicantName: app.userId?.name || 'Unknown User',
            email: app.userId?.email || '',
            phone: app.userId?.mobile || '',
            location: app.userId?.currentLocation || '',
            appliedDate: app.appliedDate || app.createdAt,
            status: normalizeStatus(app.status),
            experience: 'Not specified',
            education: 'Not specified',
            resumeUrl: app.resume?.name || app.userId?.resume?.name || null,
            userId: app.userId?._id || app.userId,
            coverLetter: app.coverLetter || 'No cover letter provided',
            skills: app.userId?.skills || [],
            rating: 4.0,
            hasResume: !!(app.resume && (app.resume.data || app.resume.name)) || !!(app.userId?.resume),
          }));

          console.log('Transformed applications:', transformedApplications);
          setApplications(transformedApplications);

          // Extract unique jobs from applications
          const uniqueJobs = Array.from(
            new Set(transformedApplications.map((app: Application) => app.jobTitle))
          ).map((title, index) => ({
            id: index + 1,
            title: title,
            department: 'General',
          }));

          setJobs(uniqueJobs);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        // Show empty state - no mock data fallback
        setApplications([]);
        setJobs([]);
      }
    };

    fetchApplications();

    // Add auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchApplications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Status helpers
  const getStatusLabel = (status: ApplicationStatus) =>
    STATUS_META[status]?.label ?? STATUS_META.applied.label;

  const getStatusChipClass = (status: ApplicationStatus) =>
    STATUS_META[status]?.chipClass ?? "bg-gray-100 text-gray-800";

  const getStatusIcon = (status: ApplicationStatus) => {
    const Icon = STATUS_META[status]?.icon ?? Clock;
    return <Icon className="w-4 h-4" />;
  };


  // Update application status
  const updateApplicationStatus = async (
    applicationId: number,
    newStatus: ApplicationStatus
  ) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`${"/api/jobcy"}/hr/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: STATUS_PAYLOAD[newStatus] }),
      });

      if (response.ok) {
        setApplications((prev: Application[]) =>
          prev.map((app: Application) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          )
        );
      } else {
        console.error('Failed to update application status');
        alert('Failed to update application status. Please try again.');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Error updating application status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Expand / collapse job group
  const toggleJobExpansion = (jobTitle: string) => {
    setExpandedJobs((prev: Set<string>) => {
      const newSet = new Set(prev);
      if (newSet.has(jobTitle)) {
        newSet.delete(jobTitle);
      } else {
        newSet.add(jobTitle);
      }
      return newSet;
    });
  };

  // Filtered applications based on job, status, and search term
  const filteredApplications = applications.filter((app: Application) => {
    const matchesJob =
      selectedJob === "all" || app.jobId.toString() === selectedJob || app.jobTitle === selectedJob;
    const matchesStatus =
      selectedStatus === "all" || app.status === selectedStatus;
    const matchesSearch =
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase());
    console.log('Filtering app:', app.jobTitle, 'selectedJob:', selectedJob, 'matchesJob:', matchesJob);
    return matchesJob && matchesStatus && matchesSearch;
  });

  // Group applications by job title
  const groupedApplications = filteredApplications.reduce<Record<string,Application[]>>((groups: Record<string, Application[]>, app: Application) => {
    const key = app.jobTitle;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(app);
    return groups;
  }, {});

  // Application card component
  const ApplicationCard = ({ application }: {application: Application}) => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">
                {application.applicantName}
              </h4>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Mail className="w-4 h-4" />
                <span>{application.email}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-3">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>{application.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{application.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>
                Applied {new Date(application.appliedDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-4 h-4" />
              <span>{application.experience} exp</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-3">
            <span
              className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusChipClass(
                application.status
              )}`}
            >
              {getStatusIcon(application.status)}
              <span>{getStatusLabel(application.status)}</span>
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {application.rating}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {application.skills.slice(0, 3).map((skill: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {skill}
              </span>
            ))}
            {application.skills.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{application.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-2 ml-4">
          <button
            onClick={() => {
              setSelectedApplicant(application);
              setShowModal(true);
            }}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
          {application.hasResume && (
            <button
              onClick={async () => {
                try {
                  const token = localStorage.getItem("token");
                  const response = await fetch(`${"/api/jobcy"}/hr/resume/${application.userId}`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
  
                  if (response.ok) {
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = application.resumeUrl || 'resume.pdf';
                    link.click();
                    window.URL.revokeObjectURL(url);
                  } else {
                    console.error('Failed to download resume:', response.status, response.statusText);
                    alert('Failed to download resume. Please try again.');
                  }
                } catch (error) {
                  console.error('Error downloading resume:', error);
                  alert('Error downloading resume. Please try again.');
                }
              }}
              className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
              title="Download Resume"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
          <div className="relative group">
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {STATUS_ACTIONS[application.status]?.map((action: StatusAction) => {
            const Icon = action.icon;
            return (
              <button
                key={`${application.id}-${action.label}`}
                onClick={() => updateApplicationStatus(application.id, action.target)}
                disabled={isLoading}
                className={`flex items-center space-x-1 px-3 py-1 text-white text-sm rounded-lg transition-colors disabled:opacity-50 ${action.className}`}
              >
                <Icon className="w-4 h-4" />
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => {
            setSelectedApplicant(application);
            setShowModal(true);
          }}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );

  // Modal showing full applicant details & actions
  const ApplicantModal = ({
    applicant,
    onClose,
  }: {
  applicant: Application;
  onClose: () => void;
}) => {
    if (!applicant) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {applicant.applicantName}
                  </h2>
                  <p className="text-gray-600">{applicant.jobTitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            {/* Status and Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <span
                className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusChipClass(
                  applicant.status
                )}`}
              >
                {getStatusIcon(applicant.status)}
                <span>{getStatusLabel(applicant.status)}</span>
              </span>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="font-medium">{applicant.rating} / 5.0</span>
              </div>
            </div>
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Contact Information
                </h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{applicant.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{applicant.phone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{applicant.location}</span>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Professional Details
                </h3>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Award className="w-4 h-4" />
                  <span>{applicant.experience} experience</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <GraduationCap className="w-4 h-4" />
                  <span>{applicant.education}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Applied{" "}
                    {new Date(applicant.appliedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            {/* Skills */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {applicant.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            {/* Cover Letter */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Cover Letter</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  {applicant.coverLetter}
                </p>
              </div>
            </div>
            {/* Resume Download */}
            {applicant.hasResume && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Resume</h3>
                <button
                  onClick={async () => {
                    try {
                      const token = localStorage.getItem("token");
                      const response = await fetch(`${"/api/jobcy"}/hr/resume/${applicant.userId}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });

                      if (response.ok) {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = applicant.resumeUrl || 'resume.pdf';
                        link.click();
                        window.URL.revokeObjectURL(url);
                      } else {
                        console.error('Failed to download resume:', response.status, response.statusText);
                        alert('Failed to download resume. Please try again.');
                      }
                    } catch (error) {
                      console.error('Error downloading resume:', error);
                      alert('Error downloading resume. Please try again.');
                    }
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Resume ({applicant.resumeUrl || 'resume.pdf'})</span>
                </button>
              </div>
            )}
            {/* Action Buttons */}
            <div className="flex flex-wrap justify-end gap-3 pt-6 border-t border-gray-200">
              {STATUS_ACTIONS[applicant.status]?.map((action: StatusAction) => {
                const Icon = action.icon;
                return (
                  <button
                    key={`${applicant.id}-${action.label}`}
                    onClick={() => {
                      updateApplicationStatus(applicant.id, action.target);
                      onClose();
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 text-white rounded-lg transition-colors ${action.className}`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{action.label}</span>
                  </button>
                );
              })}
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-100/90 via-indigo-100/90 to-cyan-100/90 backdrop-blur-xl shadow-lg border-b border-slate-200/60">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Applications Management
                </h1>
                <p className="text-sm text-gray-600">
                  Review and manage job applications
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search applicants..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 w-full sm:w-64"
                  aria-label="Search applicants"
                />
              </div>
              <select
                value={selectedJob}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedJob(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                aria-label="Filter by job"
              >
                <option value="all">All Jobs</option>
                {jobs.map((job: Job) => (
                  <option key={job.id} value={job.id.toString()}>
                    {job.title}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setSelectedStatus(e.target.value as "all" | ApplicationStatus)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="applied">Applied</option>
                <option value="under_review">Under Review</option>
                <option value="interview">Interview</option>
                <option value="offered">Offered</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600" aria-live="polite">
                {filteredApplications.length} applications found
              </span>
              <button
                className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                aria-label="More filters"
              >
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Applications grouped by job */}
        {Object.keys(groupedApplications).length > 0 ? (
          <div className="space-y-6">
            {(Object.entries(groupedApplications) as [string, Application[]][]).map(
              ([jobTitle, jobApplications]) => (
                <div
                  key={jobTitle}
                  className="bg-white rounded-lg shadow-sm border border-gray-200"
                >
                  <div
                    className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleJobExpansion(jobTitle)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) =>
                      (e.key === "Enter" || e.key === " ") &&
                      toggleJobExpansion(jobTitle)
                    }
                    aria-expanded={expandedJobs.has(jobTitle)}
                    aria-controls={`group-${jobTitle.replace(/\s+/g, "-")}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-lg">
                          <Briefcase className="w-5 h-5 text-blue-700" />
                        </div>
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900">
                            {jobTitle}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {jobApplications.length} applications
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-wrap gap-3 text-sm">
                          {(["under_review", "interview", "offered", "rejected"] as ApplicationStatus[]).map(
                            (status: ApplicationStatus) => {
                              const count = jobApplications.filter((app: Application) => app.status === status).length;
                              if (count === 0) return null;
                              return (
                                <span
                                  key={`${jobTitle}-${status}`}
                                  className={STATUS_META[status].summaryClass}
                                  aria-label={`${count} ${STATUS_META[status].label.toLowerCase()}`}
                                >
                                  {count} {STATUS_META[status].label.toLowerCase()}
                                </span>
                              );
                            }
                          )}
                        </div>
                        {expandedJobs.has(jobTitle) ? (
                          <ChevronUp
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <ChevronDown
                            className="w-5 h-5 text-gray-400"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {expandedJobs.has(jobTitle) && (
                    <div
                      className="p-4"
                      id={`group-${jobTitle.replace(/\s+/g, "-")}`}
                    >
                      <div className="grid grid-cols-1 gap-4">
                        {jobApplications.map((application: Application) => (
                          <ApplicationCard
                            key={application.id}
                            application={application}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Applications Found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Applicant Details Modal */}
      {showModal && selectedApplicant && (
        <ApplicantModal
          applicant={selectedApplicant}
          onClose={() => {
            setShowModal(false);
            setSelectedApplicant(null);
          }}
        />
      )}
    </div>
  );
}
