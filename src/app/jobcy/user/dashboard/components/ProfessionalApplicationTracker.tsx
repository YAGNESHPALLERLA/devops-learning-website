/**
 * ProfessionalApplicationTracker - Enhanced job application tracker
 * LinkedIn/Indeed-style with smooth animations and professional UI
 */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { applicationStatus } from "../../../theme";
import { CheckCircle2, Clock, Calendar, XCircle, Briefcase, TrendingUp, MapPin, Building2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: "applied" | "review" | "interview" | "offered" | "rejected";
  appliedDate: string;
  interviewDate?: string;
  location?: string;
  jobId?: string;
}

interface ProfessionalApplicationTrackerProps {
  applications: Application[];
  className?: string;
}

const statusConfig = {
  applied: { icon: Briefcase, step: 1, color: "#0A66C2", bg: "#e3f2fd" },
  review: { icon: Clock, step: 2, color: "#f59e0b", bg: "#fff3cd" },
  interview: { icon: Calendar, step: 3, color: "#0A66C2", bg: "#e3f2fd" },
  offered: { icon: CheckCircle2, step: 4, color: "#22c55e", bg: "#dcfce7" },
  rejected: { icon: XCircle, step: 0, color: "#ef4444", bg: "#fee2e2" },
};

const steps = [
  { key: "applied", label: "Applied", description: "Application submitted" },
  { key: "review", label: "Under Review", description: "Being reviewed by HR" },
  { key: "interview", label: "Interview", description: "Interview scheduled" },
  { key: "offered", label: "Offered", description: "Job offer received" },
];

export function ProfessionalApplicationTracker({ applications, className }: ProfessionalApplicationTrackerProps) {
  const [animatedApps, setAnimatedApps] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Animate cards on mount
    applications.forEach((app, index) => {
      setTimeout(() => {
        setAnimatedApps(prev => new Set(prev).add(app.id));
      }, index * 100);
    });
  }, [applications]);

  const getStatusStep = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig]?.step || 0;
  };

  const getDaysSinceApplied = (dateString: string) => {
    const applied = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - applied.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={cn("space-y-6", className)}>
      <Card variant="elevated" className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-[#0A66C2] to-[#004182] text-white pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-2xl font-bold">
                  Application Tracker
                </CardTitle>
                <p className="text-white/90 text-sm mt-1">
                  Track your job application progress
                </p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white font-bold text-lg">{applications.length}</span>
              <span className="text-white/90 text-sm ml-1">
                {applications.length === 1 ? "Application" : "Applications"}
              </span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {applications.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <Briefcase className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600 mb-6">
                Start applying to jobs to track your progress here
              </p>
              <button className="inline-flex items-center px-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold rounded-lg transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                <Briefcase className="w-5 h-5 mr-2" />
                Browse Jobs
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app, index) => {
                const currentStep = getStatusStep(app.status);
                const normalizedStatus = app.status?.toLowerCase().replace(/\s+/g, '') || 'applied';
                const statusKey = normalizedStatus === 'underreview' || normalizedStatus === 'under_review' 
                  ? 'review' 
                  : normalizedStatus === 'interviewscheduled' || normalizedStatus === 'interview_scheduled'
                  ? 'interview'
                  : normalizedStatus;
                
                const statusInfo = applicationStatus[statusKey as keyof typeof applicationStatus] || applicationStatus.applied;
                const isAnimated = animatedApps.has(app.id);
                const progress = app.status === "rejected" ? 0 : (currentStep / 4) * 100;
                const daysSince = getDaysSinceApplied(app.appliedDate);

                return (
                  <div
                    key={app.id}
                    className={cn(
                      "group relative overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-[#0A66C2] hover:shadow-lg transition-all duration-300",
                      isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}
                    style={{
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    {/* Decorative gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-white to-indigo-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Content */}
                    <div className="relative p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex-1">
                          <div className="flex items-start space-x-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-[#0A66C2] to-[#004182] rounded-xl flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                              <Building2 className="w-7 h-7 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#0A66C2] transition-colors">
                                {app.jobTitle}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                                <div className="flex items-center space-x-1">
                                  <Building2 className="w-4 h-4" />
                                  <span className="font-medium">{app.company}</span>
                                </div>
                                {app.location && (
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="w-4 h-4 text-gray-400" />
                                    <span>{app.location}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-xs text-gray-500">
                                <span>Applied {daysSince} day{daysSince !== 1 ? 's' : ''} ago</span>
                                {app.interviewDate && (
                                  <span className="flex items-center space-x-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>Interview: {new Date(app.interviewDate).toLocaleDateString()}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div
                            className="px-4 py-2 rounded-full text-xs font-bold shadow-sm"
                            style={{
                              backgroundColor: statusInfo?.bg || '#e3f2fd',
                              color: statusInfo?.color || '#0A66C2',
                            }}
                          >
                            {statusInfo?.label || 'Applied'}
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Progress Section */}
                      {app.status !== "rejected" && (
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-semibold text-gray-700">Application Progress</span>
                              <Sparkles className="w-4 h-4 text-[#0A66C2]" />
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-[#0A66C2]">{Math.round(progress)}%</span>
                              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#0A66C2] to-[#004182] rounded-full transition-all duration-1000 ease-out"
                                  style={{ 
                                    width: `${progress}%`,
                                    boxShadow: '0 0 10px rgba(10, 102, 194, 0.3)'
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Professional Timeline */}
                          <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 z-0">
                              <div
                                className="h-full bg-gradient-to-r from-[#0A66C2] to-[#004182] transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                              />
                            </div>

                            {/* Steps */}
                            <div className="relative flex justify-between">
                              {steps.map((step, index) => {
                                const stepNum = index + 1;
                                const Icon = statusConfig[step.key as keyof typeof statusConfig]?.icon || Briefcase;
                                const isActive = currentStep >= stepNum;
                                const isCurrent = currentStep === stepNum;
                                const isPast = currentStep > stepNum;

                                return (
                                  <div
                                    key={step.key}
                                    className="flex flex-col items-center flex-1"
                                  >
                                    <div
                                      className={cn(
                                        "relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-md",
                                        isCurrent
                                          ? "bg-[#0A66C2] text-white scale-110 shadow-lg ring-4 ring-blue-100"
                                          : isPast
                                          ? "bg-green-500 text-white scale-100"
                                          : isActive
                                          ? "bg-blue-100 text-[#0A66C2] scale-100"
                                          : "bg-gray-100 text-gray-400 scale-90"
                                      )}
                                    >
                                      {isPast ? (
                                        <CheckCircle2 className="w-6 h-6" />
                                      ) : (
                                        <Icon className="w-5 h-5" />
                                      )}
                                      {isCurrent && (
                                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white animate-pulse" />
                                      )}
                                    </div>
                                    <div className="mt-3 text-center">
                                      <p
                                        className={cn(
                                          "text-xs font-semibold mb-1",
                                          isActive ? "text-[#0A66C2]" : "text-gray-400"
                                        )}
                                      >
                                        {step.label}
                                      </p>
                                      <p className="text-xs text-gray-500">{step.description}</p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Applied: {new Date(app.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <button className="px-4 py-2 text-sm font-semibold text-[#0A66C2] hover:text-[#004182] hover:bg-blue-50 rounded-lg transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

