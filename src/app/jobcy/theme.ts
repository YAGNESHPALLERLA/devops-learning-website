/**
 * Jobcy Portal - Modern Design System
 * Professional theme matching ohg365.com with LinkedIn-inspired aesthetics
 */

export const jobcyTheme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9', // Main primary
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7', // Main secondary
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    background: {
      light: '#ffffff',
      dark: '#0f172a',
      gray: '#f8fafc',
    },
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['JetBrains Mono', 'monospace'],
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
  borderRadius: {
    none: '0',
    sm: '0.375rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    glow: '0 0 20px rgba(14, 165, 233, 0.3)',
  },
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

export const gradients = {
  primary: 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
  secondary: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
  success: 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)',
  warm: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  cool: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
  sunset: 'linear-gradient(135deg, #ec4899 0%, #f59e0b 100%)',
  ocean: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
  purple: 'linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)',
  background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
  darkBackground: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
};

export const applicationStatus = {
  applied: {
    label: 'Applied',
    color: '#e11d48', // Ruby Red
    bg: '#fce7f3', // Light red background
    darkBg: '#7f1d1d',
  },
  review: {
    label: 'Under Review',
    color: '#f59e0b', // Keep warning orange for review
    bg: '#fef3c7',
    darkBg: '#78350f',
  },
  interview: {
    label: 'Interview Scheduled',
    color: '#e11d48', // Ruby Red
    bg: '#fce7f3',
    darkBg: '#7f1d1d',
  },
  offered: {
    label: 'Offered',
    color: '#22c55e', // Keep green for success (offered)
    bg: '#dcfce7',
    darkBg: '#14532d',
  },
  rejected: {
    label: 'Rejected',
    color: '#dc2626', // Darker red for rejection
    bg: '#fee2e2',
    darkBg: '#7f1d1d',
  },
};

