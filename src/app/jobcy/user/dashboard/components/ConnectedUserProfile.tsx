"use client";

import React, { useState } from 'react';
import { X, MessageCircle, MapPin, Briefcase, GraduationCap, Star, Calendar, Mail, Users } from 'lucide-react';

interface ConnectedUser {
  id: string | number;
  name: string;
  title?: string;
  location?: string;
  email?: string;
  experience?: string;
  education?: string;
  skills?: string[];
  status?: 'employed' | 'seeking' | 'open';
  avatar?: string | null;
  bio?: string;
  connectedAt?: string;
  connected?: boolean;
}

interface ConnectedUserProfileProps {
  user: ConnectedUser;
  isDark: boolean;
  onClose: () => void;
  onMessage: (user: ConnectedUser) => void;
}

export default function ConnectedUserProfile({ user, isDark, onClose, onMessage }: ConnectedUserProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'experience' | 'education' | 'skills'>('overview');

  const getGradientColors = (name: string) => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-pink-600',
      'from-cyan-500 to-blue-600'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl ${
        isDark ? "bg-slate-900" : "bg-white"
      } shadow-2xl`}>
        {/* Header */}
        <div className={`sticky top-0 z-10 p-6 border-b ${
          isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${getGradientColors(user.name)} rounded-2xl flex items-center justify-center shadow-lg`}>
                <span className="text-white font-bold text-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {user.name}
                </h2>
                <p className={`text-lg ${isDark ? "text-slate-400" : "text-slate-600"}`}>
                  {user.title || "Professional"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => onMessage(user)}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                  isDark 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                } flex items-center gap-2`}
              >
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
              <button
                onClick={onClose}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  isDark 
                    ? "hover:bg-slate-800 text-slate-400" 
                    : "hover:bg-slate-100 text-slate-600"
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className={`p-4 rounded-xl ${
              isDark ? "bg-slate-800" : "bg-slate-50"
            }`}>
              <div className="flex items-center gap-3">
                <MapPin className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`} />
                <div>
                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Location</p>
                  <p className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {user.location || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${
              isDark ? "bg-slate-800" : "bg-slate-50"
            }`}>
              <div className="flex items-center gap-3">
                <Briefcase className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`} />
                <div>
                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Experience</p>
                  <p className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {user.experience || "Not specified"}
                  </p>
                </div>
              </div>
            </div>
            
            <div className={`p-4 rounded-xl ${
              isDark ? "bg-slate-800" : "bg-slate-50"
            }`}>
              <div className="flex items-center gap-3">
                <Calendar className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`} />
                <div>
                  <p className={`text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Connected</p>
                  <p className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                    {user.connectedAt ? new Date(user.connectedAt).toLocaleDateString() : "Recently"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'overview', label: 'Overview', icon: Users },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'skills', label: 'Skills', icon: Star }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'experience' | 'education' | 'skills')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${
                  activeTab === tab.id
                    ? isDark
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-blue-500 text-white shadow-lg"
                    : isDark
                      ? "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50"
                      : "bg-white/50 text-slate-600 hover:bg-white"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Bio */}
                {user.bio && (
                  <div className={`p-6 rounded-xl ${
                    isDark ? "bg-slate-800" : "bg-slate-50"
                  }`}>
                    <h3 className={`text-lg font-semibold mb-3 ${isDark ? "text-white" : "text-slate-900"}`}>
                      About
                    </h3>
                    <p className={`${isDark ? "text-slate-300" : "text-slate-700"} leading-relaxed`}>
                      {user.bio}
                    </p>
                  </div>
                )}

                {/* Contact Info */}
                <div className={`p-6 rounded-xl ${
                  isDark ? "bg-slate-800" : "bg-slate-50"
                }`}>
                  <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                    Contact Information
                  </h3>
                    <div className="space-y-3">
                    {user.email && (
                      <div className="flex items-center gap-3">
                        <Mail className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`} />
                        <span className={`${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          {user.email}
                        </span>
                      </div>
                    )}
                    {user.location && (
                      <div className="flex items-center gap-3">
                        <MapPin className={`w-5 h-5 ${isDark ? "text-slate-400" : "text-slate-600"}`} />
                        <span className={`${isDark ? "text-slate-300" : "text-slate-700"}`}>
                          {user.location}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'experience' && (
              <div className={`p-6 rounded-xl ${
                isDark ? "bg-slate-800" : "bg-slate-50"
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Professional Experience
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      isDark ? "bg-blue-500" : "bg-blue-600"
                    }`}></div>
                    <div>
                      <h4 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                        {user.title}
                      </h4>
                      <p className={`${isDark ? "text-slate-400" : "text-slate-600"}`}>
                        {user.experience}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className={`p-6 rounded-xl ${
                isDark ? "bg-slate-800" : "bg-slate-50"
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Education
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      isDark ? "bg-green-500" : "bg-green-600"
                    }`}></div>
                    <div>
                      <h4 className={`font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                        {user.education}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className={`p-6 rounded-xl ${
                isDark ? "bg-slate-800" : "bg-slate-50"
              }`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? "text-white" : "text-slate-900"}`}>
                  Skills & Expertise
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(user.skills || []).map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isDark 
                          ? "bg-blue-600/20 text-blue-300 border border-blue-600/30" 
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
