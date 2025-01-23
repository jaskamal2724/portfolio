import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '', // Leave empty if no specific port is used
        pathname: '/736x/**', // Matches all paths starting with `/736x/`
      },
    ],
  },
};

export default nextConfig;
