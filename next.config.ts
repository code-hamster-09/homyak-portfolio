import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'xn--80aggavefgemh4bd8j.com', // Punycode for котагымтелеком.com
      'https://котагымтелеком.com', // Also add the original domain for clarity if Next.js parses it
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
