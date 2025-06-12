import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TOOPA_API_URL: process.env.TOOPA_API_URL,
  },
  images: {
    remotePatterns: [{ hostname: "*" }],
  },
};

export default nextConfig;
