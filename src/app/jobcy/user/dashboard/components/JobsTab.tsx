// src/app/user/dashboard/components/JobsTab.tsx
"use client";

import React, { useState } from "react";
import { Job } from "@/app/jobcy/types/dashboard";
import { Briefcase, GraduationCap, Users, Calendar, Clock } from "lucide-react";

interface JobsTabProps {
  allJobs: Job[];
  isDark?: boolean; // Optional, defaults to false
}

type FilterType = 'all' | 'fresher' | 'experienced';

const JobsTab: React.FC<JobsTabProps> = ({ allJobs, isDark = false }) => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const handleApplyJob = (jobId: string) => {
    window.open(`/jobcy/jobs/apply/${jobId}`, '_blank');
  };

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJob(null);
  };

  // Filter jobs based on active filter
  const filteredJobs = allJobs.filter(job => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'fresher') return job.experienceLevel?.toLowerCase() === 'fresher';
    if (activeFilter === 'experienced') return job.experienceLevel?.toLowerCase() === 'experienced';
    return true;
  });

  // Count jobs by category
  const fresherCount = allJobs.filter(job => job.experienceLevel?.toLowerCase() === 'fresher').length;
  const experiencedCount = allJobs.filter(job => job.experienceLevel?.toLowerCase() === 'experienced').length;

  return (
    <div>
      {/* Filter Tabs */}
      <div className="mb-6 p-4 rounded-xl bg-white border border-gray-200 shadow-md">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Available Jobs
        </h2>
        <div className="flex gap-3">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeFilter === 'all'
                ? "bg-[#0A66C2] text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>All Jobs</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeFilter === 'all'
                ? "bg-white/20"
                : "bg-gray-200"
            }`}>
              {allJobs.length}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('fresher')}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeFilter === 'fresher'
                ? "bg-green-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Fresher</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeFilter === 'fresher'
                ? "bg-white/20"
                : "bg-gray-200"
            }`}>
              {fresherCount}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('experienced')}
            className={`flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeFilter === 'experienced'
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Experienced</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeFilter === 'experienced'
                ? "bg-white/20"
                : "bg-gray-200"
            }`}>
              {experiencedCount}
            </span>
          </button>
        </div>
      </div>

      {/* Jobs List */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="p-5 rounded-xl border bg-white border-gray-200 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-900">{job.title}</h3>
                    {job.experienceLevel && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        job.experienceLevel.toLowerCase() === 'fresher'
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-indigo-100 text-indigo-700 border border-indigo-200"
                      }`}>
                        {job.experienceLevel.toLowerCase() === 'fresher' ? (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" />
                            Fresher
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            Experienced
                          </span>
                        )}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">
                    <span className="font-medium">{job.company}</span> • {job.location}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
              
              {/* Application Deadline Badge */}
              {job.applicationDeadline && (
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${
                  (() => {
                    const deadline = new Date(job.applicationDeadline);
                    const today = new Date();
                    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                    
                    if (daysLeft < 0) {
                      return "bg-red-50 border border-red-200";
                    } else if (daysLeft <= 3) {
                      return "bg-orange-50 border border-orange-200";
                    } else {
                      return "bg-blue-50 border border-blue-200";
                    }
                  })()
                }`}>
                  <Clock className={`w-4 h-4 ${
                    (() => {
                      const deadline = new Date(job.applicationDeadline);
                      const today = new Date();
                      const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      if (daysLeft < 0) {
                        return "text-red-600";
                      } else if (daysLeft <= 3) {
                        return "text-orange-600";
                      } else {
                        return "text-blue-600";
                      }
                    })()
                  }`} />
                  <span className={`text-xs font-semibold ${
                    (() => {
                      const deadline = new Date(job.applicationDeadline);
                      const today = new Date();
                      const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      if (daysLeft < 0) {
                        return "text-red-600";
                      } else if (daysLeft <= 3) {
                        return "text-orange-600";
                      } else {
                        return "text-blue-600";
                      }
                    })()
                  }`}>
                    {(() => {
                      const deadline = new Date(job.applicationDeadline);
                      const today = new Date();
                      const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                      
                      if (daysLeft < 0) {
                        return "Deadline passed";
                      } else if (daysLeft === 0) {
                        return "Last day to apply!";
                      } else if (daysLeft === 1) {
                        return "Apply today - 1 day left";
                      } else if (daysLeft <= 3) {
                        return `Hurry! ${daysLeft} days left`;
                      } else if (daysLeft <= 7) {
                        return `Deadline: ${daysLeft} days left`;
                      } else {
                        return `Apply by ${new Date(job.applicationDeadline).toLocaleDateString()}`;
                      }
                    })()}
                  </span>
                </div>
              )}
              
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleViewDetails(job)}
                  className="px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 font-semibold transition-colors shadow-sm hover:shadow-md"
                >
                  View Details
                </button>
                <button
                  disabled={job.hasApplied}
                  onClick={() => handleApplyJob(job.id)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    job.hasApplied
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-[#0A66C2] text-white hover:bg-[#004182] shadow-sm hover:shadow-md"
                  }`}
                >
                  {job.hasApplied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white border border-gray-200 rounded-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            {activeFilter === 'fresher' ? (
              <GraduationCap className="w-8 h-8 text-gray-400" />
            ) : activeFilter === 'experienced' ? (
              <Briefcase className="w-8 h-8 text-gray-400" />
            ) : (
              <Users className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <p className="text-lg font-semibold mb-2 text-gray-900">
            No {activeFilter === 'all' ? '' : activeFilter === 'fresher' ? 'Fresher' : 'Experienced'} Jobs Available
          </p>
          <p className="text-gray-500">
            {activeFilter === 'all' 
              ? 'Check back later for new opportunities.' 
              : `Try filtering by "${activeFilter === 'fresher' ? 'All Jobs' : 'All Jobs'}" to see more options.`
            }
          </p>
        </div>
      )}

      {/* Job Details Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="p-6 rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto bg-white text-gray-900 shadow-xl">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{selectedJob.title}</h2>
                {selectedJob.experienceLevel && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                    selectedJob.experienceLevel.toLowerCase() === 'fresher'
                      ? "bg-green-100 text-green-700 border border-green-200"
                      : "bg-indigo-100 text-indigo-700 border border-indigo-200"
                  }`}>
                    {selectedJob.experienceLevel.toLowerCase() === 'fresher' ? (
                      <>
                        <GraduationCap className="w-3.5 h-3.5" />
                        Fresher Position
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-3.5 h-3.5" />
                        Experienced Position
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#0A66C2] font-semibold text-lg">{selectedJob.company}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="flex items-center space-x-1 text-sm text-gray-600">
                      📍 {selectedJob.location}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-green-600 font-bold text-lg">
                    {selectedJob.salary}
                  </span>
                  <p className="text-sm mt-1 text-gray-600">
                    💼 {selectedJob.type}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Job Description</h3>
                <p className="text-gray-700">{selectedJob.description}</p>
              </div>

              {/* Application Deadline - Prominent Display */}
              {selectedJob.applicationDeadline && (
                <div className="p-4 rounded-xl border-2 bg-orange-50 border-orange-200">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-orange-200">
                      <Clock className="w-5 h-5 text-orange-700" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                        Application Deadline
                      </p>
                      <p className="text-lg font-bold text-orange-800">
                        {new Date(selectedJob.applicationDeadline).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {(() => {
                          const deadline = new Date(selectedJob.applicationDeadline);
                          const today = new Date();
                          const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                          
                          if (daysLeft < 0) {
                            return "⚠️ Deadline has passed";
                          } else if (daysLeft === 0) {
                            return "⏰ Last day to apply!";
                          } else if (daysLeft === 1) {
                            return "⏰ 1 day left to apply";
                          } else if (daysLeft <= 7) {
                            return `⏰ ${daysLeft} days left to apply`;
                          } else {
                            return `📅 ${daysLeft} days left to apply`;
                          }
                        })()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center flex-wrap gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Posted: {selectedJob.posted}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedJob.applicants} applicants
                </span>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  disabled={selectedJob.hasApplied}
                  onClick={() => {
                    handleApplyJob(selectedJob.id);
                    closeModal();
                  }}
                  className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                    selectedJob.hasApplied
                      ? "bg-gray-400 cursor-not-allowed text-white"
                      : "bg-[#0A66C2] text-white hover:bg-[#004182] shadow-sm hover:shadow-md"
                  }`}
                >
                  {selectedJob.hasApplied ? "Already Applied" : "Apply Now"}
                </button>
                <button
                  onClick={closeModal}
                  className="px-6 py-2 rounded-lg font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsTab;
