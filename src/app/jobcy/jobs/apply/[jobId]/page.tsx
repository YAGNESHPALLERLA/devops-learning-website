"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, MapPin, Briefcase, Clock, Building, DollarSign, Send, Loader2 } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  posted: string;
  applicants: number;
  experienceLevel?: string;
  applicationDeadline?: string;
  qualifications?: string[];
}

export default function ApplyJobPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.jobId as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/jobcy/user/auth/login');
        return;
      }

      const response = await fetch(`/api/jobcy/jobs/browse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const jobsData = await response.json();
        let jobsArray = [];
        
        if (Array.isArray(jobsData)) {
          jobsArray = jobsData;
        } else if (jobsData && Array.isArray(jobsData.jobs)) {
          jobsArray = jobsData.jobs;
        } else if (jobsData && Array.isArray(jobsData.data)) {
          jobsArray = jobsData.data;
        }

        const foundJob = jobsArray.find((j: { id?: string; _id?: string }) => (j.id || j._id) === jobId);
        
        if (foundJob) {
          setJob({
            id: foundJob.id || foundJob._id,
            title: foundJob.title || "Untitled Job",
            company: foundJob.company || "Unknown Company",
            location: foundJob.location || "Location not specified",
            salary: typeof foundJob.salary === "number" 
              ? `$${foundJob.salary.toLocaleString()}` 
              : foundJob.salary || "Salary not disclosed",
            type: foundJob.type || "Full-time",
            posted: foundJob.postedDate 
              ? new Date(foundJob.postedDate).toLocaleDateString()
              : foundJob.createdAt 
              ? new Date(foundJob.createdAt).toLocaleDateString()
              : "Recently posted",
            applicants: foundJob.applicants || 0,
            description: foundJob.description || "No description available",
            experienceLevel: foundJob.careerLevel || foundJob.experienceLevel,
            applicationDeadline: foundJob.applicationDeadline,
            qualifications: foundJob.qualifications || [],
          });
        } else {
          setError('Job not found');
        }
      } else {
        setError('Failed to load job details');
      }
    } catch (err) {
      console.error('Error fetching job:', err);
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    if (!job) return;

    setApplying(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/jobcy/user/auth/login');
        return;
      }

      const response = await fetch(`/api/jobcy/jobs/apply/${jobId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ coverLetter }),
      });

      if (response.ok) {
        setSuccess(true);
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/jobcy/user/dashboard');
        }, 2000);
      } else {
        const errorData = await response.json();
        setError(errorData.error || errorData.message || 'Application failed');
      }
    } catch (err) {
      console.error('Error applying for job:', err);
      setError('Failed to apply for job. Please try again.');
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (error && !job) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg p-6 max-w-md">
            <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Error</h2>
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => router.push('/jobcy/user/dashboard')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-800 rounded-lg p-6 max-w-md">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">Application Submitted!</h2>
            <p className="text-green-600 dark:text-green-400 mb-4">
              Your application for <strong>{job?.title}</strong> at <strong>{job?.company}</strong> has been submitted successfully.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Apply for Job</h1>
          <p className="text-gray-600 dark:text-gray-400">Review the job details and submit your application</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{job?.title}</h2>
                  <p className="text-xl text-blue-600 dark:text-blue-400 font-semibold">{job?.company}</p>
                </div>
                {job?.experienceLevel && (
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    job.experienceLevel.toLowerCase() === 'fresher'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {job.experienceLevel}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{job?.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Briefcase className="w-5 h-5 mr-2" />
                  <span>{job?.type}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <DollarSign className="w-5 h-5 mr-2" />
                  <span>{job?.salary}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Building className="w-5 h-5 mr-2" />
                  <span>{job?.applicants} applicants</span>
                </div>
              </div>

              {job?.applicationDeadline && (
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 mr-2" />
                    <div>
                      <p className="text-sm font-semibold text-orange-800 dark:text-orange-200">Application Deadline</p>
                      <p className="text-orange-700 dark:text-orange-300">
                        {new Date(job.applicationDeadline).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Job Description</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{job?.description}</p>
              </div>

              {job?.qualifications && job.qualifications.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                    {job.qualifications.map((qual, index) => (
                      <li key={index}>{qual}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Application Details</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  placeholder="Write a cover letter explaining why you're interested in this position..."
                  className="w-full h-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleApply}
                disabled={applying}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                {applying ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Applying...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Application
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                By applying, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
