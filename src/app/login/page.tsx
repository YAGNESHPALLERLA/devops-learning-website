"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Mail,
  Lock,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import {
  AUTH_STATUS_DETAILS,
  AUTH_STATUS_HEADING,
  AUTH_STATUS_MESSAGE,
  AUTH_SYSTEM_AVAILABLE,
} from "@/config/authStatus";

type Errors = {
  email?: string;
  password?: string;
  general?: string;
};

function AuthPausedNotice() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom right, var(--bg-gradient-start), var(--bg-gradient-mid), var(--bg-gradient-end))' }}>
      <div className="w-full max-w-xl space-y-6 text-center">
        <Link href="/" className="inline-block">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-14 h-14 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">OHG</span>
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white leading-tight">
                OneHubGlobal
              </p>
              <p className="text-sm text-gray-400">OHG365</p>
            </div>
          </div>
        </Link>

        <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl p-8 space-y-5">
          <h1 className="text-3xl font-bold text-white">
            {AUTH_STATUS_HEADING}
          </h1>
          <p className="text-gray-300">{AUTH_STATUS_MESSAGE}</p>
          <p className="text-sm text-gray-400">{AUTH_STATUS_DETAILS}</p>
          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-rose-500 to-red-600 text-white font-semibold shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all duration-300"
            >
              Continue exploring tutorials
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActiveLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Pre-fill email from URL parameter or localStorage
  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: decodeURIComponent(emailParam) }));
    } else {
      // Check localStorage for registered email
      const registeredEmail = localStorage.getItem("registeredEmail");
      if (registeredEmail) {
        setFormData(prev => ({ ...prev, email: registeredEmail }));
      }
    }
  }, [searchParams]);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);

  const validateForm = () => {
    const newErrors: Errors = {};
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    setLoginError("");

    try {
      const response = await fetch(`/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoginError(data.error || data.message || "Invalid credentials");
      } else {
        // Store token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Store email for "continue with account" feature
        localStorage.setItem("registeredEmail", formData.email);

        // Redirect based on role or redirect parameter
        if (redirectTo && redirectTo !== "/" && redirectTo !== "/login" && redirectTo !== "/signup") {
          router.push(redirectTo);
        } else {
          router.push("/");
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
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(to bottom right, var(--bg-gradient-start), var(--bg-gradient-mid), var(--bg-gradient-end))' }}>
      <div className="w-full max-w-md">
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">OHG</span>
                </div>
                <span className="text-2xl font-bold text-white">OneHubGlobal</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to access tutorials and courses</p>
          </div>

          {/* Error Message */}
          {loginError && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-400">{loginError}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 bg-[#252525] border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 bg-[#252525] border ${
                    errors.password ? "border-red-500" : "border-gray-600"
                  } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-transparent transition-all`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="/signup" className="text-rose-400 hover:text-rose-300 font-medium">
                Sign up
              </Link>
            </p>
            <p className="text-xs text-gray-500">
              Your credentials for accessing all features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GlobalLogin() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  if (!AUTH_SYSTEM_AVAILABLE) {
    return <AuthPausedNotice />;
  }
  return <ActiveLoginForm />;
}

