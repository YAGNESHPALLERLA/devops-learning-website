"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Mail,
  Lock,
  UserPlus,
  User as UserIcon,
  CheckCircle,
  ArrowRight,
  BookOpen,
  Users,
  Award,
  Briefcase,
  Code,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
};

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          if (payload.exp && payload.exp * 1000 >= Date.now()) {
            // Valid token, redirect to intended page
            router.push(redirectTo);
          }
        }
      } catch {
        // Invalid token, stay on registration page
      }
    }
  }, [router, redirectTo]);

  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    if (registerError) setRegisterError("");
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setRegisterError("");

    try {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setRegisterError(data.error || data.message || "Registration failed");
      } else {
        setIsSuccess(true);
        
        // Auto login after successful registration
        const loginResponse = await fetch(`/api/jobcy/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email.trim(),
            password: formData.password,
          }),
        });

        const loginData = await loginResponse.json();

        if (loginResponse.ok) {
          localStorage.setItem("token", loginData.token);
          localStorage.setItem("user", JSON.stringify(loginData.user));
          
          // Redirect after 2 seconds to the intended tutorial page
          setTimeout(() => {
            if (redirectTo && redirectTo !== "/" && redirectTo !== "/login" && redirectTo !== "/signup" && redirectTo !== "/register") {
              router.push(redirectTo);
            } else {
              router.push("/");
            }
          }, 2000);
        } else {
          // Registration successful but login failed, redirect to login
          setTimeout(() => {
            router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setRegisterError("Unable to connect to server. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Registration Successful!</h2>
              <p className="text-gray-400 mb-4">Your account has been created.</p>
              {redirectTo && redirectTo.startsWith("/tutorials") && (
                <p className="text-rose-400 text-sm">Redirecting to your selected tutorial...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section: Website Overview */}
        <div className="text-white text-center lg:text-left">
          {/* Logo and Tagline */}
          <div className="mb-8">
            <Link href="/" className="inline-block mb-6">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">OHG</span>
                </div>
                <div>
                  <span className="text-3xl font-bold text-white">OneHubGlobal</span>
                  <p className="text-gray-400 text-sm">OHG365</p>
                </div>
              </div>
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Master All Courses From <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500">Zero to Hero</span>
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Transform your career with comprehensive training in Programming, DevOps, Medical Coding, Government Jobs, and more. Learn from industry experts with hands-on projects and real-world applications.
            </p>
          </div>

          {/* Feature Blocks */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 hover:border-rose-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto lg:mx-0">
                <BookOpen className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Comprehensive Courses</h3>
              <p className="text-gray-400 text-sm">Learn from basics to advanced</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 hover:border-rose-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto lg:mx-0">
                <Users className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Expert Community</h3>
              <p className="text-gray-400 text-sm">Connect with professionals</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 hover:border-rose-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto lg:mx-0">
                <Award className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Certification Ready</h3>
              <p className="text-gray-400 text-sm">Prepare for industry exams</p>
            </div>
            <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-4 hover:border-rose-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-3 mx-auto lg:mx-0">
                <Briefcase className="w-6 h-6 text-rose-400" />
              </div>
              <h3 className="font-semibold text-white mb-1">Job Portal</h3>
              <p className="text-gray-400 text-sm">Find your dream job</p>
            </div>
          </div>

          {/* Course Categories */}
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <GraduationCap className="w-6 h-6 text-rose-400" />
              <span>Explore All Courses</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Code className="w-4 h-4 text-rose-400" />
                <span className="text-sm">Programming (Java, Python, SQL)</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Briefcase className="w-4 h-4 text-rose-400" />
                <span className="text-sm">DevOps & Cloud</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <BookOpen className="w-4 h-4 text-rose-400" />
                <span className="text-sm">Medical Coding</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Award className="w-4 h-4 text-rose-400" />
                <span className="text-sm">Government Jobs (SBI)</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-4 text-center lg:text-left">
              Plus Web Development, Data Science, Linux, and more!
            </p>
          </div>
        </div>

        {/* Right Section: Registration Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
              <p className="text-gray-400">
                {redirectTo && redirectTo.startsWith("/tutorials") 
                  ? "Register to access tutorials and courses" 
                  : "Start your learning journey today"}
              </p>
              {redirectTo && redirectTo.startsWith("/tutorials") && (
                <p className="text-rose-400 text-xs mt-2">
                  After registration, you'll be redirected to your selected tutorial
                </p>
              )}
            </div>

          {/* Error Message */}
          {registerError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{registerError}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-[#252525] border ${
                    errors.name ? "border-red-500" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-[#252525] border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-[#252525] border ${
                    errors.password ? "border-red-500" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-[#252525] border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.confirmPassword}</span>
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold rounded-lg shadow-lg shadow-rose-500/30 hover:shadow-xl hover:shadow-rose-500/50 hover:from-rose-600 hover:to-red-700 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-400">
                Already have an account?{" "}
                <Link href={`/login?redirect=${encodeURIComponent(redirectTo)}`} className="text-rose-400 hover:text-rose-300 font-medium">
                  Sign in
                </Link>
              </p>
              <p className="text-xs text-gray-500">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <RegisterForm />
    </Suspense>
  );
}

