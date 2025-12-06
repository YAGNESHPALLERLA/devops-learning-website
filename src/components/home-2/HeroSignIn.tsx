'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle } from 'lucide-react';

interface Errors {
  email?: string;
  password?: string;
}

export default function HeroSignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (loginError) setLoginError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        router.push('/');
        router.refresh();
      } else {
        setLoginError(data.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div 
        className="glass-dark rounded-xl p-6 backdrop-blur-md"
        style={{
          backgroundColor: 'rgba(8, 61, 119, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <h2 
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: '#EBEBD3' }}
        >
          Sign In
        </h2>
        <p 
          className="text-sm text-center mb-6"
          style={{ color: 'rgba(235, 235, 211, 0.8)' }}
        >
          Welcome back! Please sign in to continue.
        </p>

        {loginError && (
          <div 
            className="mb-4 p-3 rounded-lg flex items-center gap-2"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            }}
          >
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <p className="text-xs text-red-400">{loginError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="hero-email" 
              className="block text-sm font-medium mb-2"
              style={{ color: 'rgba(235, 235, 211, 0.9)' }}
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(235, 235, 211, 0.6)' }} />
              <input
                id="hero-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-4 py-2.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all text-sm ${
                  errors.email 
                    ? 'border-2 border-red-400' 
                    : 'border border-white/20 focus:border-white/40'
                }`}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>

          <div>
            <label 
              htmlFor="hero-password" 
              className="block text-sm font-medium mb-2"
              style={{ color: 'rgba(235, 235, 211, 0.9)' }}
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(235, 235, 211, 0.6)' }} />
              <input
                id="hero-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-2.5 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all text-sm ${
                  errors.password 
                    ? 'border-2 border-red-400' 
                    : 'border border-white/20 focus:border-white/40'
                }`}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                }}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm"
                style={{ color: 'rgba(235, 235, 211, 0.6)' }}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isLoading ? 'rgba(122, 148, 165, 0.5)' : '#7A94A5',
              color: '#EBEBD3',
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs" style={{ color: 'rgba(235, 235, 211, 0.7)' }}>
            Don't have an account?{' '}
            <a 
              href="/register" 
              className="font-semibold hover:underline transition-all"
              style={{ color: '#EBEBD3' }}
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

