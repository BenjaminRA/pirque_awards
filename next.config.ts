import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // allowedDevOrigins: [
  //   'local-origin.dev',
  //   '*.local-origin.dev',
  //   '192.168.1.249',
  // ],
  // experimental: {
  //   browserDebugInfoInTerminal: true,
  // },
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;
