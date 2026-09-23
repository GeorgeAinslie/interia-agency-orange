import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/work", destination: "/testimonials", permanent: true },
    ];
  },
};

export default nextConfig;
