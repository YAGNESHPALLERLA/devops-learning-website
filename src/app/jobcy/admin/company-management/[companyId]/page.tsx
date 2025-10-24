'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Users, Briefcase, FileText, Building2, Mail, Phone, MapPin, Globe, Calendar } from 'lucide-react';

interface Company {
  _id: string;
  name: string;
  email: string;
  industry?: string;
  companySize?: string;
  website?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  registeredBy?: {
    name: string;
  };
}

interface HRUser {
  _id: string;
  name: string;
  email: string;
  mobile?: number;
  companyId?: string;
  company?: {
    name: string;
  };
  phone?: string;
  address?: string;
  industry?: string;
  companySize?: string;
  website?: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  type: string;
  status: string;
  postedBy: string;
  createdAt: string;
}

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  status: string;
  appliedAt: string;
  createdAt: string;
}

interface CompanyDetails {
  company: Company;
  hrs: HRUser[];
  jobs: Job[];
  applications: Application[];
}

export default function CompanyDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const companyId = params.companyId as string;
  
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (companyId) {
      fetchCompanyDetails();
    }
  }, [companyId]);

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/jobcy/admin/auth/login');
        return;
      }

      const response = await fetch(`/api/jobcy/admin/companies/${companyId}/details`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch company details: ${response.status}`);
      }

      const data = await response.json();
      setCompanyDetails(data);
    } catch (error) {
      console.error('Error fetching company details:', error);
      setError(error instanceof Error ? error.message : 'Failed to load company details');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading company details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Company</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500 text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Not Found</h2>
          <p className="text-gray-600 mb-4">The requested company could not be found.</p>
          <button
            onClick={() => router.back()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">
                {companyDetails.company.name} - Details
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Company Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{companyDetails.company.name}</h2>
                <p className="text-gray-600">{companyDetails.company.industry || 'Industry not specified'}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Registered</p>
              <p className="font-semibold text-gray-900">{formatDate(companyDetails.company.createdAt)}</p>
            </div>
          </div>

          {/* Company Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyDetails.company.email && (
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{companyDetails.company.email}</p>
                </div>
              </div>
            )}
            
            {companyDetails.company.phone && (
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{companyDetails.company.phone}</p>
                </div>
              </div>
            )}
            
            {companyDetails.company.website && (
              <div className="flex items-center space-x-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <a 
                    href={companyDetails.company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:text-blue-800"
                  >
                    {companyDetails.company.website}
                  </a>
                </div>
              </div>
            )}
            
            {companyDetails.company.address && (
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900">{companyDetails.company.address}</p>
                </div>
              </div>
            )}
            
            {companyDetails.company.companySize && (
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Company Size</p>
                  <p className="font-medium text-gray-900">{companyDetails.company.companySize}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">HR Staff</p>
                <p className="text-3xl font-bold text-gray-900">{companyDetails.hrs.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Jobs Posted</p>
                <p className="text-3xl font-bold text-gray-900">{companyDetails.jobs.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-3xl font-bold text-gray-900">{companyDetails.applications.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* HR Staff Members */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-600" />
                HR Staff Members
              </h3>
            </div>
            <div className="p-6">
              {companyDetails.hrs.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No HR staff members found</p>
              ) : (
                <div className="space-y-4">
                  {companyDetails.hrs.map((hr) => (
                    <div key={hr._id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-semibold">
                          {hr.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{hr.name}</p>
                        <p className="text-sm text-gray-600">{hr.email}</p>
                        {hr.mobile && <p className="text-xs text-gray-500">{hr.mobile}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Posted Jobs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-green-600" />
                Posted Jobs
              </h3>
            </div>
            <div className="p-6">
              {companyDetails.jobs.length === 0 ? (
                <p className="text-gray-600 text-center py-4">No jobs posted yet</p>
              ) : (
                <div className="space-y-4">
                  {companyDetails.jobs.map((job) => (
                    <div key={job._id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{job.title}</h4>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {job.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{job.location}</span>
                        <span>{formatDate(job.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Received Applications */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-purple-600" />
              Received Applications
            </h3>
          </div>
          <div className="p-6">
            {companyDetails.applications.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No applications received yet</p>
            ) : (
              <div className="space-y-4">
                {companyDetails.applications.map((app) => (
                  <div key={app._id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {app.userId?.name || 'Unknown User'}
                        </p>
                        <p className="text-sm text-gray-600">
                          {app.userId?.email || 'No email'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Applied for: {app.jobId?.title || 'Unknown Job'}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === "Accepted"
                            ? "bg-green-100 text-green-700"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : app.status === "Interview"
                            ? "bg-purple-100 text-purple-700"
                            : app.status === "Under Review"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {app.status}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(app.appliedAt || app.createdAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
