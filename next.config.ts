import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    TOOPA_API_URL: process.env.TOOPA_API_URL,
    TEMP_API_URL: process.env.TEMP_API_URL,
    COOZA_API_URL: process.env.COOZA_API_URL,
    // NAVER_SEARCH_ID: process.env.NAVER_SEARCH_ID,
    // NAVER_SEARCH_SECRET: process.env.NAVER_SEARCH_SECRET,
  },
  images: {
    remotePatterns: [{ hostname: "*" }],
  },
};

export default nextConfig;
