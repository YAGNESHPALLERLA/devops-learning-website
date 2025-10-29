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
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[var(--primary)] rounded-lg mb-4 shadow-sm">
            <LogIn className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">
            Welcome Back
          </h1>
          <p className="text-[var(--foreground-muted)]">
            Sign in to continue to your dashboard
          </p>
        </div>

        <div className="bg-[var(--surface)] rounded-xl shadow-lg border border-[var(--border)] p-8">
          <div className="space-y-5">
            {loginError && (
              <div className="bg-[var(--surface-secondary)] border border-[var(--danger)] rounded-lg p-4 flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-[var(--danger-light)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-[var(--foreground)] text-sm font-medium">
                    Sign In Failed
                  </p>
                  <p className="text-[var(--danger-light)] text-sm">
                    {loginError}
                  </p>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[var(--foreground)] mb-2"
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
                  className={`w-full pl-11 pr-4 py-2.5 border rounded-lg bg-[var(--surface-secondary)] text-[var(--foreground)] placeholder:text-[var(--foreground-dim)] focus:bg-[var(--surface-tertiary)] focus:outline-none transition-colors ${
                    errors.email
                      ? "border-[var(--danger)] focus:border-[var(--danger-light)] focus:ring-2 focus:ring-[var(--danger)]/20"
                      : "border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  }`}
                  placeholder="john.doe@example.com"
                  disabled={isLoading}
                />
                <Mail className="w-5 h-5 text-[var(--foreground-dim)] absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-sm text-[var(--danger-light)] flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[var(--foreground)] mb-2"
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
                  className={`w-full pl-11 pr-12 py-2.5 border rounded-lg bg-[var(--surface-secondary)] text-[var(--foreground)] placeholder:text-[var(--foreground-dim)] focus:bg-[var(--surface-tertiary)] focus:outline-none transition-colors ${
                    errors.password
                      ? "border-[var(--danger)] focus:border-[var(--danger-light)] focus:ring-2 focus:ring-[var(--danger)]/20"
                      : "border-[var(--border)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  }`}
                  placeholder="Enter your password"
                  disabled={isLoading}
                />
                <Lock className="w-5 h-5 text-[var(--foreground-dim)] absolute left-3 top-1/2 transform -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--foreground-dim)] hover:text-[var(--foreground)] transition-colors"
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
                <p className="mt-1.5 text-sm text-[var(--danger-light)] flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password}</span>
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <a
                href="#"
                className="text-sm text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-[var(--primary)] hover:bg-[var(--primary-dark)] disabled:bg-[var(--foreground-dim)] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/50 disabled:cursor-not-allowed shadow-sm"
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

          <div className="mt-6 pt-6 border-t border-[var(--border)]">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start space-x-2">
                <Briefcase className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">
                    10,000+ Jobs
                  </p>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Active openings
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Building2 className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">
                    500+ Companies
                  </p>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Hiring now
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Users className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">
                    50,000+ Users
                  </p>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Trust our platform
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <TrendingUp className="w-4 h-4 text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-[var(--foreground)]">
                    95% Success
                  </p>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Placement rate
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--foreground-muted)]">
              New to our platform?{" "}
              <a
                href="/jobcy/user/auth/signup"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold transition-colors"
              >
                Create Account
              </a>
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-xs text-[var(--foreground-dim)]">
            © 2024 Job Portal. Connecting talent with opportunity.
          </p>
        </div>
      </div>
    </div>
  );
}
