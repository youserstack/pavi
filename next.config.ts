import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    API_URL: process.env.API_URL,
    TEMP_API_URL: process.env.TEMP_API_URL,
  },
  images: {
    remotePatterns: [
      // { hostname: "shopping-phinf.pstatic.net" },
      { hostname: "*" },
    ],
  },
};

export default nextConfig;
