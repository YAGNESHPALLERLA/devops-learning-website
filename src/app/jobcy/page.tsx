"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  Users,
  Building2,
  TrendingUp,
  LogIn,
  UserPlus,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      company: "Google",
      content: "Jobcy helped me find my dream job in just 2 weeks. The platform is intuitive and the matching algorithm is spot on!",
      rating: 5,
    },
    {
      name: "Mike Chen",
      role: "HR Manager",
      company: "TechCorp",
      content: "As an HR professional, Jobcy has streamlined our hiring process. We've found amazing talent quickly and efficiently.",
      rating: 5,
    },
    {
      name: "Emily Davis",
      role: "Product Manager",
      company: "StartupXYZ",
      content: "The quality of candidates on Jobcy is exceptional. We've built an incredible team thanks to this platform.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleSignIn = () => {
    router.push("/jobcy/user/auth/login");
  };

  const handleSignUp = () => {
    router.push("/jobcy/user/auth/signup");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">

      {/* Hero Section */}
      <main className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative flex items-center justify-center px-6 py-20">
          <div className="w-full max-w-7xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500/10 to-red-500/10 px-4 py-2 rounded-full mb-6 border border-rose-500/20">
                <Sparkles className="w-4 h-4 text-rose-400" />
                <span className="text-sm font-medium text-rose-300">Trusted by 50,000+ Professionals</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white leading-tight">
                Find Your
                <span className="bg-gradient-to-r from-rose-400 via-red-500 to-pink-600 bg-clip-text text-transparent"> Dream Job</span>
                <br />Today
              </h1>

              <p className="text-xl md:text-2xl mb-10 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Connect with top companies, discover opportunities that match your skills, and accelerate your career growth with our intelligent job matching platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
                <button
                  onClick={handleSignIn}
                  className="group flex items-center justify-center space-x-3 px-10 py-5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl hover:shadow-rose-500/25 hover:scale-105"
                >
                  <LogIn className="w-6 h-6" />
                  <span>Sign In to Explore</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleSignUp}
                  className="group flex items-center justify-center space-x-3 px-10 py-5 border-2 border-gray-600 text-gray-300 hover:bg-gray-800 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <UserPlus className="w-6 h-6" />
                  <span>Join Free</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
                <Briefcase className="w-10 h-10 mx-auto mb-4 text-rose-400" />
                <div className="text-3xl font-bold mb-2 text-white">10,000+</div>
                <div className="text-sm font-medium text-gray-400">Active Jobs</div>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
                <Building2 className="w-10 h-10 mx-auto mb-4 text-red-400" />
                <div className="text-3xl font-bold mb-2 text-white">500+</div>
                <div className="text-sm font-medium text-gray-400">Companies</div>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
                <Users className="w-10 h-10 mx-auto mb-4 text-pink-400" />
                <div className="text-3xl font-bold mb-2 text-white">50,000+</div>
                <div className="text-sm font-medium text-gray-400">Job Seekers</div>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300">
                <TrendingUp className="w-10 h-10 mx-auto mb-4 text-rose-500" />
                <div className="text-3xl font-bold mb-2 text-white">95%</div>
                <div className="text-sm font-medium text-gray-400">Success Rate</div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-rose-900/50 shadow-lg">
                  <Briefcase className="w-8 h-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">For Job Seekers</h3>
                <p className="text-base leading-relaxed text-gray-400">
                  Browse thousands of job opportunities, apply with ease, and track your applications all in one place. Our AI-powered matching helps you find the perfect role.
                </p>
                <div className="flex justify-center space-x-2 mt-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-red-900/50 shadow-lg">
                  <Building2 className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">For HR Professionals</h3>
                <p className="text-base leading-relaxed text-gray-400">
                  Post jobs, manage applications, schedule interviews, and find the perfect candidates for your team. Streamline your entire hiring process.
                </p>
                <div className="flex justify-center space-x-2 mt-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>

              <div className="text-center p-8 rounded-2xl bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-700 hover:scale-105 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-pink-900/50 shadow-lg">
                  <Users className="w-8 h-8 text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">For Administrators</h3>
                <p className="text-base leading-relaxed text-gray-400">
                  Oversee platform operations, manage users, and ensure a smooth experience for all stakeholders. Comprehensive admin tools at your fingertips.
                </p>
                <div className="flex justify-center space-x-2 mt-4">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="text-center p-12 rounded-3xl bg-gray-800/30 backdrop-blur-sm shadow-2xl border border-gray-700">
              <h2 className="text-3xl font-bold mb-8 text-white">
                What Our Users Say
              </h2>

              <div className="max-w-4xl mx-auto">
                <div className="p-8 rounded-2xl bg-gray-800 shadow-lg">
                  <div className="flex items-center justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-lg italic mb-6 text-gray-300">
                    &quot;{testimonials[currentTestimonial].content}&quot;
                  </blockquote>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center font-bold text-white">
                      {testimonials[currentTestimonial].name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">
                        {testimonials[currentTestimonial].name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-2 mt-6">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentTestimonial
                          ? "bg-rose-600 scale-125"
                          : "bg-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/95 backdrop-blur-sm border-gray-700 border-t mt-20">
        <div className="px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-600 to-red-600 rounded-xl flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">Jobcy</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Connecting talent with opportunity. Your career journey starts here.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white">For Job Seekers</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Browse Jobs</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Career Advice</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Resume Builder</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white">For Employers</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Post a Job</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Find Candidates</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Recruiting Solutions</a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4 text-white">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-rose-400 transition-colors">Privacy Policy</a></li>
                </ul>
              </div>
            </div>

            {/* Portal Links */}
            <div className="mt-8 p-6 bg-gray-700/50 rounded-xl">
              <h4 className="font-semibold mb-4 text-center text-white">Access Portals</h4>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => router.push("/jobcy/user/auth/login")}
                  className="px-4 py-2 rounded-lg font-medium transition-all bg-gray-600 text-gray-200 hover:bg-gray-500 shadow-sm hover:shadow-md"
                >
                  Job Seeker Portal
                </button>
                <button
                  onClick={() => router.push("/jobcy/hr/auth/login")}
                  className="px-4 py-2 rounded-lg font-medium transition-all bg-gray-600 text-gray-200 hover:bg-gray-500 shadow-sm hover:shadow-md"
                >
                  HR Portal
                </button>
                <button
                  onClick={() => router.push("/jobcy/company/auth/login")}
                  className="px-4 py-2 rounded-lg font-medium transition-all bg-gray-600 text-gray-200 hover:bg-gray-500 shadow-sm hover:shadow-md"
                >
                  Company Portal
                </button>
                <button
                  onClick={() => router.push("/jobcy/admin/auth/login")}
                  className="px-4 py-2 rounded-lg font-medium transition-all bg-gray-600 text-gray-200 hover:bg-gray-500 shadow-sm hover:shadow-md"
                >
                  Admin Portal
                </button>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-8 text-center">
              <p className="text-sm text-gray-400">
                © 2024 Jobcy. All rights reserved. Connecting talent with opportunity worldwide.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
