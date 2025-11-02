"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/Card";
import { applicationStatus } from "../../../theme";
import { CheckCircle2, Clock, Calendar, XCircle, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  status: "applied" | "review" | "interview" | "offered" | "rejected";
  appliedDate: string;
  interviewDate?: string;
  location?: string;
}

interface ApplicationTrackerProps {
  applications: Application[];
  className?: string;
}

const statusConfig = {
  applied: { icon: Briefcase, step: 1 },
  review: { icon: Clock, step: 2 },
  interview: { icon: Calendar, step: 3 },
  offered: { icon: CheckCircle2, step: 4 },
  rejected: { icon: XCircle, step: 0 },
};

const steps = [
  { key: "applied", label: "Applied" },
  { key: "review", label: "Under Review" },
  { key: "interview", label: "Interview" },
  { key: "offered", label: "Offered" },
];

export function ApplicationTracker({ applications, className }: ApplicationTrackerProps) {
  const getStatusStep = (status: string) => {
    return statusConfig[status as keyof typeof statusConfig]?.step || 0;
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-2xl font-bold text-[#0A66C2]">
              Application Tracker
            </span>
            <span className="text-sm font-medium text-gray-600">
              {applications.length} {applications.length === 1 ? "Application" : "Applications"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {applications.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600 mb-2 font-medium">No applications yet</p>
              <p className="text-sm text-gray-500">
                Start applying to jobs to track your progress here
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => {
                const currentStep = getStatusStep(app.status);
                // Normalize status: map variations to standard keys
                const normalizedStatus = app.status?.toLowerCase().replace(/\s+/g, '') || 'applied';
                const statusKey = normalizedStatus === 'underreview' || normalizedStatus === 'under_review' 
                  ? 'review' 
                  : normalizedStatus === 'interviewscheduled' || normalizedStatus === 'interview_scheduled'
                  ? 'interview'
                  : normalizedStatus;
                
                // Get status info with fallback
                const statusInfo = applicationStatus[statusKey as keyof typeof applicationStatus] || applicationStatus.applied;

                return (
                  <div
                    key={app.id}
                    className="p-6 rounded-xl border border-gray-200 bg-white hover:shadow-md transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {app.jobTitle}
                        </h3>
                        <p className="text-sm text-gray-600">{app.company}</p>
                        {app.location && (
                          <p className="text-xs text-gray-500 mt-1">
                            📍 {app.location}
                          </p>
                        )}
                      </div>
                      <div
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: statusInfo?.bg || '#dbeafe',
                          color: statusInfo?.color || '#3b82f6',
                        }}
                      >
                        {statusInfo?.label || 'Applied'}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {app.status !== "rejected" && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-600">
                            Progress
                          </span>
                          <span className="text-xs font-semibold text-[#0A66C2]">
                            {Math.round((currentStep / 4) * 100)}%
                          </span>
                        </div>
                        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="absolute top-0 left-0 h-full bg-[#0A66C2] transition-all duration-500 rounded-full"
                            style={{ width: `${(currentStep / 4) * 100}%` }}
                          />
                        </div>

                        {/* Steps */}
                        <div className="grid grid-cols-4 gap-2 mt-4">
                          {steps.map((step, index) => {
                            const stepNum = index + 1;
                            const Icon = statusConfig[step.key as keyof typeof statusConfig]?.icon || Briefcase;
                            const isActive = currentStep >= stepNum;
                            const isCurrent = currentStep === stepNum;

                            return (
                              <div
                                key={step.key}
                                className={cn(
                                  "flex flex-col items-center space-y-1",
                                  isActive && "text-[#0A66C2]",
                                  !isActive && "text-gray-400"
                                )}
                              >
                                <div
                                  className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                                    isCurrent
                                      ? "bg-[#0A66C2] text-white scale-110 shadow-md"
                                      : isActive
                                      ? "bg-blue-50 text-[#0A66C2]"
                                      : "bg-gray-100 text-gray-400"
                                  )}
                                >
                                  <Icon className="w-4 h-4" />
                                </div>
                                <span className="text-xs font-medium text-center text-gray-600">{step.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Dates */}
                    <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-200">
                      <span>Applied: {new Date(app.appliedDate).toLocaleDateString()}</span>
                      {app.interviewDate && (
                        <span>Interview: {new Date(app.interviewDate).toLocaleDateString()}</span>
                      )}
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

