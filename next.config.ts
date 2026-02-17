import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wedding-backend.songbooksofpraise.com',
      },
    ],
  },
};

export default nextConfig;
