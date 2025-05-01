
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/736x/**',
      },
      {
        protocol: 'https',
        hostname: 'imgs.search.brave.com',
        pathname: '/**',
      },
      
    ],
  },
};

export default nextConfig;
