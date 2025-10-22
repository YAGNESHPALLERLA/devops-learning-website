import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
        pathname: '/vi/**',
      },
    ],
  },
  // Environment variables for the integrated setup
  env: {
    NEXTAUTH_URL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3001' 
      : 'https://www.ohg365.com',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846',
    JWT_SECRET: 'c93f0cead3003f6272befd592eb735f893d41a97bf7e7cfac9a06fa13fdd4f24056dc4f1ca421084d11872c50141c005df415fd3834354eeacf29678e51e1846',
    MONGO_URI: 'mongodb+srv://onehubglobal365_db_user:yEmIiGaAWTXABoYV@jobcy-cluster.pxbj6n1.mongodb.net/jobcy-data',
    NEXT_PUBLIC_SOCKET_URL: process.env.NODE_ENV === 'development' 
      ? 'http://localhost:5000' 
      : 'https://jobcy-job-portal-production.up.railway.app',
  },
  // Rewrites for API routes
  async rewrites() {
    return [
      {
        source: '/api/jobcy/:path*',
        destination: '/api/jobcy/:path*',
      },
    ];
  },
};

export default nextConfig;
