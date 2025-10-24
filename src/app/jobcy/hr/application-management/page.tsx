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
  AlertCircle,
} from "lucide-react";

export default function ApplicationsManagement() {

  // Application type
  type Application = {
    id: number;
    jobId: number;
    jobTitle: string;
    applicantName: string;
    email: string;
    phone: string;
    location: string;
    appliedDate: string;
    status: "pending" | "shortlisted" | "rejected" | "accepted";
    experience: string;
    education: string;
    resumeUrl: string | null;
    coverLetter: string;
    skills: string[];
    rating: number;
    userId: string;
    hasResume: boolean;
  };

  // Job type
  type Job = {
    id: number;
    title: string;
    department: string;
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
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "pending" | "shortlisted" | "rejected"
  >("all");

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

        const response = await fetch(`${"/api/jobcy"}/hr/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const applicationsData = await response.json();
          console.log('Frontend received applications:', applicationsData);
          console.log('First application structure:', applicationsData[0]);

          // Handle both array and object response formats
          const applicationsArray = Array.isArray(applicationsData) ? applicationsData : applicationsData.applications || [];

          // Transform backend data to match frontend interface
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const transformedApplications: Application[] = applicationsArray.map((app: any, index: number) => ({
            id: app._id || index + 1,
            jobId: app.job?._id || app.jobId,
            jobTitle: app.job?.title || 'Unknown Job',
            applicantName: app.user?.name || 'Unknown User',
            email: app.user?.email || '',
            phone: app.user?.mobile || app.user?.phone || '',
            location: app.user?.currentLocation || '',
            appliedDate: app.appliedAt || app.createdAt,
            status: app.status === 'Applied' ? 'pending' : app.status?.toLowerCase() || 'pending',
            experience: 'Not specified',
            education: 'Not specified',
            resumeUrl: app.resume?.name || app.user?.resume?.fileName || app.user?.resume?.name || (typeof app.user?.resume === 'string' ? app.user.resume.split('/').pop() : null),
            userId: app.user?._id || app.userId,
            coverLetter: app.coverLetter || 'No cover letter provided',
            skills: app.user?.skills || [],
            rating: 4.0,
            hasResume: !!(app.user?.resume && (app.user.resume.data || app.user.resume.fileName || app.user.resume.name || typeof app.user.resume === 'string')),
          }));

          console.log('Transformed applications:', transformedApplications);
          setApplications(transformedApplications);

          // Extract unique jobs from applications
          const uniqueJobs = Array.from(
            new Set(transformedApplications.map(app => app.jobTitle))
          ).map((title, index) => ({
            id: index + 1,
            title: title,
            department: 'General',
          }));

          setJobs(uniqueJobs);
        }
      } catch (error) {
        console.error('Error fetching applications:', error);
        // No mock data fallback - ensure API endpoints work properly
        console.error('Failed to fetch applications from API');
      }
    };

    fetchApplications();

    // Removed mock data - using live API data only

    // Add auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchApplications();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Status badges styling & icons
  const getStatusColor = (status: "pending" | "shortlisted" | "rejected" | "accepted") => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "shortlisted":
      return "bg-blue-100 text-blue-800";
    case "accepted":
      return "bg-green-100 text-green-800";
    case "rejected":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: "pending" | "shortlisted" | "rejected" | "accepted") => {
  switch (status) {
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "shortlisted":
      return <AlertCircle className="w-4 h-4" />;
    case "accepted":
      return <CheckCircle className="w-4 h-4" />;
    case "rejected":
      return <XCircle className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};


  // Update application status
  const updateApplicationStatus = async (
    applicationId: number,
    newStatus: "pending" | "shortlisted" | "rejected" | "accepted"
  ) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Map status to display values
      const statusMap = {
        "pending": "Applied",
        "shortlisted": "Under Review", 
        "rejected": "Rejected",
        "accepted": "Accepted"
      };

      const response = await fetch(`${"/api/jobcy"}/hr/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: statusMap[newStatus] }),
      });

      if (response.ok) {
        setApplications((prev) =>
          prev.map((app) =>
            app.id === applicationId ? { ...app, status: newStatus } : app
          )
        );
        
        // Show appropriate success message
        const successMessages = {
          "pending": "Application moved to pending",
          "shortlisted": "Application accepted for review", 
          "rejected": "Application rejected",
          "accepted": "Application accepted - candidate will be notified"
        };
        
        alert(successMessages[newStatus]);
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
    setExpandedJobs((prev) => {
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
  const filteredApplications = Array.isArray(applications) ? applications.filter((app) => {
    const matchesJob =
      selectedJob === "all" || 
      app.jobId?.toString() === selectedJob || 
      app.jobTitle === selectedJob ||
      app.jobTitle?.toLowerCase() === selectedJob?.toLowerCase();
    const matchesStatus =
      selectedStatus === "all" || app.status === selectedStatus;
    const matchesSearch =
      app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    console.log('Filtering app:', app.jobTitle, 'selectedJob:', selectedJob, 'matchesJob:', matchesJob);
    return matchesJob && matchesStatus && matchesSearch;
  }) : [];

  // Group applications by job title
  const groupedApplications = filteredApplications.reduce<Record<string,Application[]>>((groups, app) => {
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
              className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                application.status
              )}`}
            >
              {getStatusIcon(application.status)}
              <span className="capitalize">{application.status}</span>
            </span>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">
                {application.rating}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mb-3">
            {application.skills.slice(0, 3).map((skill, index) => (
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
                  
                  // Validate token before making request
                  if (!token) {
                    const shouldLogin = confirm('No authentication token found. Would you like to login again?');
                    if (shouldLogin) {
                      window.location.href = '/jobcy/hr/auth/login/';
                    }
                    return;
                  }
                  
                  // Check if token is expired
                  try {
                    const payload = JSON.parse(atob(token.split('.')[1]));
                    const currentTime = Math.floor(Date.now() / 1000);
                    if (payload.exp && payload.exp < currentTime) {
                      const shouldLogin = confirm('Your session has expired. Would you like to login again?');
                      if (shouldLogin) {
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.href = '/jobcy/hr/auth/login/';
                      }
                      return;
                    }
                  } catch (e) {
                    alert('Invalid authentication token. Please login again.');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/jobcy/hr/auth/login/';
                    return;
                  }
                  
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
                    const errorData = await response.json().catch(() => ({}));
                    if (response.status === 404) {
                      if (errorData.details && errorData.details.includes('file was uploaded but is no longer available')) {
                        alert('Resume file not found on server. The user may need to re-upload their resume.');
                      } else {
                        alert('No resume found for this user.');
                      }
                    } else if (response.status === 403) {
                      const errorData = await response.json().catch(() => ({}));
                      if (errorData.details && errorData.details.includes('User role is')) {
                        alert(`Access denied: ${errorData.details}. Please login as HR.`);
                      } else {
                        alert('Access denied. Please make sure you are logged in as HR.');
                      }
                      // Clear invalid token and redirect to login
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                      window.location.href = '/jobcy/hr/auth/login/';
                    } else {
                      alert('Failed to download resume. Please try again.');
                    }
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
        <div className="flex space-x-2">
          {application.status === "pending" && (
            <>
              <button
                onClick={() =>
                  updateApplicationStatus(application.id, "shortlisted")
                }
                disabled={isLoading}
                className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Shortlist</span>
              </button>
              <button
                onClick={() =>
                  updateApplicationStatus(application.id, "rejected")
                }
                disabled={isLoading}
                className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </>
          )}
          {application.status === "shortlisted" && (
            <>
              <button
                onClick={() =>
                  updateApplicationStatus(application.id, "pending")
                }
                disabled={isLoading}
                className="flex items-center space-x-1 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
              >
                <Clock className="w-4 h-4" />
                <span>Move to Pending</span>
              </button>
              <button
                onClick={() =>
                  updateApplicationStatus(application.id, "rejected")
                }
                disabled={isLoading}
                className="flex items-center space-x-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
              >
                <XCircle className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </>
          )}
          {application.status === "rejected" && (
            <button
              onClick={() => updateApplicationStatus(application.id, "pending")}
              disabled={isLoading}
              className="flex items-center space-x-1 px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
            >
              <Clock className="w-4 h-4" />
              <span>Reconsider</span>
            </button>
          )}
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
                className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  applicant.status
                )}`}
              >
                {getStatusIcon(applicant.status)}
                <span className="capitalize">{applicant.status}</span>
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
                      
                      // Validate token before making request
                      if (!token) {
                        const shouldLogin = confirm('No authentication token found. Would you like to login again?');
                        if (shouldLogin) {
                          window.location.href = '/jobcy/hr/auth/login/';
                        }
                        return;
                      }
                      
                      // Check if token is expired
                      try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        const currentTime = Math.floor(Date.now() / 1000);
                        if (payload.exp && payload.exp < currentTime) {
                          const shouldLogin = confirm('Your session has expired. Would you like to login again?');
                          if (shouldLogin) {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            window.location.href = '/jobcy/hr/auth/login/';
                          }
                          return;
                        }
                      } catch (e) {
                        alert('Invalid authentication token. Please login again.');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        window.location.href = '/jobcy/hr/auth/login/';
                        return;
                      }
                      
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
                        const errorData = await response.json().catch(() => ({}));
                        if (response.status === 404) {
                          if (errorData.details && errorData.details.includes('file was uploaded but is no longer available')) {
                            alert('Resume file not found on server. The user may need to re-upload their resume.');
                          } else {
                            alert('No resume found for this user.');
                          }
                        } else if (response.status === 403) {
                          const errorData = await response.json().catch(() => ({}));
                          if (errorData.details && errorData.details.includes('User role is')) {
                            alert(`Access denied: ${errorData.details}. Please login as HR.`);
                          } else {
                            alert('Access denied. Please make sure you are logged in as HR.');
                          }
                          // Clear invalid token and redirect to login
                          localStorage.removeItem('token');
                          localStorage.removeItem('user');
                          window.location.href = '/jobcy/hr/auth/login/';
                        } else {
                          alert('Failed to download resume. Please try again.');
                        }
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
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              {/* Preview Button - Always available */}
              <button
                onClick={() => {
                  // Preview functionality - could open resume in new tab or show more details
                  if (applicant.resumeUrl) {
                    window.open(applicant.resumeUrl, '_blank');
                  } else {
                    alert('No resume available for preview');
                  }
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Eye className="w-4 h-4" />
                <span>Preview</span>
              </button>

              {/* Status-based action buttons */}
              {applicant.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      updateApplicationStatus(applicant.id, "shortlisted");
                      onClose();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => {
                      updateApplicationStatus(applicant.id, "rejected");
                      onClose();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </>
              )}

              {applicant.status === "shortlisted" && (
                <>
                  <button
                    onClick={() => {
                      updateApplicationStatus(applicant.id, "accepted");
                      onClose();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Final Accept</span>
                  </button>
                  <button
                    onClick={() => {
                      updateApplicationStatus(applicant.id, "rejected");
                      onClose();
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </>
              )}

              {applicant.status === "rejected" && (
                <button
                  onClick={() => {
                    updateApplicationStatus(applicant.id, "pending");
                    onClose();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                >
                  <Clock className="w-4 h-4" />
                  <span>Reconsider</span>
                </button>
              )}

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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 w-full sm:w-64"
                  aria-label="Search applicants"
                />
              </div>
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                aria-label="Filter by job"
              >
                <option value="all">All Jobs</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id.toString()}>
                    {job.title}
                  </option>
                ))}
              </select>
              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as "pending" | "shortlisted" | "rejected" | "all")
                }

                className="border border-gray-300 rounded-lg px-3 py-2 bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="shortlisted">Shortlisted</option>
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
            {Object.entries(groupedApplications).map(
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
                    onKeyDown={(e) =>
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
                        <div className="flex space-x-3 text-sm">
                          <span
                            className="text-yellow-600"
                            aria-label={`${
                              Array.isArray(jobApplications) ? jobApplications.filter(
                                (app) => app.status === "pending"
                              ).length : 0
                            } pending`}
                          >
                            {
                              Array.isArray(jobApplications) ? jobApplications.filter(
                                (app) => app.status === "pending"
                              ).length : 0
                            }{" "}
                            pending
                          </span>
                          <span
                            className="text-green-600"
                            aria-label={`${
                              Array.isArray(jobApplications) ? jobApplications.filter(
                                (app) => app.status === "shortlisted"
                              ).length : 0
                            } shortlisted`}
                          >
                            {
                              Array.isArray(jobApplications) ? jobApplications.filter(
                                (app) => app.status === "shortlisted"
                              ).length : 0
                            }{" "}
                            shortlisted
                          </span>
                          <span
                            className="text-red-600"
                            aria-label={`${
                              Array.isArray(jobApplications) ? jobApplications.filter(
                                (app) => app.status === "rejected"
                              ).length : 0
                            } rejected`}
                          >
                            {
                              Array.isArray(jobApplications) ? jobApplications.filter(
                                (app) => app.status === "rejected"
                              ).length : 0
                            }{" "}
                            rejected
                          </span>
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
                        {jobApplications.map((application) => (
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
// Deployment trigger - Fri Oct 24 12:14:49 AM IST 2025
