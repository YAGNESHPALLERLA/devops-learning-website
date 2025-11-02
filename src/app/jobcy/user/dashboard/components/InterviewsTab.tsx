// src/app/user/dashboard/components/InterviewsTab.tsx
"use client";

import React from "react";
import { Interview } from "@/app/jobcy/types/dashboard";
import { Calendar, Clock, MapPin, Building2, User, CheckCircle2 } from "lucide-react";

interface InterviewsTabProps {
  interviews: Interview[];
  isDark?: boolean;
}

const InterviewsTab: React.FC<InterviewsTabProps> = ({ interviews, isDark: _isDark = false }) => {
  if (interviews.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gray-100">
          <Calendar className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2 text-gray-900">
          No Interviews Scheduled
        </h3>
        <p className="text-sm text-gray-600">
          You don't have any interviews scheduled yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <div
          key={interview.id}
          className="p-6 bg-white border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-start space-x-4 flex-1">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {interview.position || interview.title || "Interview"}
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">{interview.company}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{interview.date}</span>
                    {interview.time && (
                      <>
                        <Clock className="w-4 h-4 text-gray-500 ml-2" />
                        <span>{interview.time}</span>
                      </>
                    )}
                  </div>
                  {interview.interviewer && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <User className="w-4 h-4 text-gray-500" />
                      <span>Interviewer: {interview.interviewer}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="ml-4">
              <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                interview.status?.toLowerCase() === 'completed'
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : interview.status?.toLowerCase() === 'scheduled'
                  ? "bg-blue-50 text-[#0A66C2] border border-blue-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}>
                {interview.status || 'Scheduled'}
              </span>
            </div>
          </div>
          {interview.type && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <span className="text-xs text-gray-500">Type: {interview.type}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default InterviewsTab;
