"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Mail,
  Lock,
  LogIn,
  Briefcase,
  Users,
  TrendingUp,
  Building2,
} from "lucide-react";
type Errors = {
  email?: string;
  password?: string;
  general?: string;
};

export default function UserLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const validateForm = () => {
    const newErrors:Errors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData((prev) => ({ ...prev, [name]: value }));
  if (name in errors) setErrors((prev) => ({ ...prev, [name]: "" }));
  if (loginError) setLoginError("");
};


  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    setLoginError("");

    try {
      console.log("Login URL:", `/api/jobcy/login`);

      const response = await fetch(`/api/jobcy/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Login response:", data); // Debug log

      if (!response.ok) {
        setLoginError(data.message || "Invalid credentials");
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Store email for "continue with account" feature
        localStorage.setItem("registeredEmail", formData.email);

        console.log("User role:", data.user.role); // Debug log

        // Redirect based on role
        if (data.user.role === "admin") {
          window.location.href = "/jobcy/admin/dashboard";
        } else if (data.user.role === "hr") {
          window.location.href = "/jobcy/hr/dashboard";
        } else {
          window.location.href = "/jobcy/user/dashboard";
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Unable to connect to server. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fadeInUp">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mb-4 shadow-lg shadow-blue-500/30">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-400">
            Sign in to continue to your dashboard
          </p>
        </div>

        <div className="bg-[#1a1a1a] rounded-xl shadow-xl border border-gray-700 p-8 transition-all hover:border-gray-600">
          <div className="space-y-5">
            {loginError && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 flex items-start space-x-3 animate-fadeIn">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white text-sm font-medium">
                    Sign In Failed
                  </p>
                  <p className="text-red-400 text-sm">
                    {loginError}
                  </p>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-white mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-lg bg-[#0a0a0a] text-white placeholder:text-gray-500 focus:bg-[#0f0f0f] focus:outline-none transition-all ${
                    errors.email
                      ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  placeholder="john.doe@example.com"
                  disabled={isLoading}
                />
                <Mail className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-white mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-11 pr-12 py-2.5 border rounded-lg bg-[#0a0a0a] text-white placeholder:text-gray-500 focus:bg-[#0f0f0f] focus:outline-none transition-all ${
                    errors.password
                      ? "border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-500/20"
                      : "border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <Lock className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-sm text-red-400 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <a
                href="#"
                className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-700">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Briefcase className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">
                    10,000+ Jobs
                  </p>
                  <p className="text-xs text-gray-400">
                    Active openings
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Building2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">
                    500+ Companies
                  </p>
                  <p className="text-xs text-gray-400">
                    Hiring now
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <Users className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">
                    50,000+ Users
                  </p>
                  <p className="text-xs text-gray-400">
                    Trust our platform
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <TrendingUp className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-white">
                    95% Success
                  </p>
                  <p className="text-xs text-gray-400">
                    Placement rate
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              New to our platform?{" "}
              <a
                href="/jobcy/user/auth/signup"
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2024 Job Portal. Connecting talent with opportunity.
          </p>
        </div>
      </div>
    </div>
  );
}
