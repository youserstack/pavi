import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TOOPA_API_URL: process.env.TOOPA_API_URL,
    TEMP_API_URL: process.env.TEMP_API_URL,
    COOZA_API_URL: process.env.COOZA_API_URL,
  },
  images: {
    remotePatterns: [
      // { hostname: "shopping-phinf.pstatic.net" },
      { hostname: "*" },
    ],
  },
};

export default nextConfig;
