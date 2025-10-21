'use client';

import Link from 'next/link';
import { 
  Briefcase, 
  User,
  Shield,
  UserCheck,
  ArrowRight,
  Search,
  FileText,
  MessageSquare,
  Bell,
  Building2,
  Users,
  TrendingUp
} from 'lucide-react';

export default function JobcyPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Jobcy Portal</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                ← Back to DevOps Learning
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Welcome to Jobcy Portal
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Your gateway to career opportunities and professional growth
          </p>
        </div>

        {/* User Type Selection */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Job Seeker */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Job Seeker
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Find your dream job, track applications, and grow your career
              </p>
              <div className="space-y-3">
                <Link 
                  href="/jobcy/user/auth/login"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
                >
                  Sign In
                </Link>
                <Link 
                  href="/jobcy/user/auth/signup"
                  className="block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:text-blue-400 dark:border-blue-400 font-semibold py-3 px-4 rounded-lg transition-colors text-center"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>

          {/* HR Professional */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                HR Professional
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Manage job postings, review applications, and find the right talent
              </p>
              <Link 
                href="/jobcy/hr/auth/login"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
              >
                HR Login
              </Link>
            </div>
          </div>

          {/* Company Admin */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Company Admin
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Manage your company profile, HR team, and recruitment process
              </p>
              <Link 
                href="/jobcy/company/auth/login"
                className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
              >
                Company Login
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">
            Platform Features
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Smart Search</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Find jobs that match your skills</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Easy Applications</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Apply with one click</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Real-time Chat</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Connect with employers</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Bell className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">Smart Notifications</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Never miss an opportunity</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Active Jobs</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}