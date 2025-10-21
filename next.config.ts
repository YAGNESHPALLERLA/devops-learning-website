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
  // Configure rewrites for Jobcy portal routes
  async rewrites() {
    return [
      {
        source: '/jobcy/:path*',
        destination: '/jobcy/:path*',
      },
    ];
  },
};

export default nextConfig;
