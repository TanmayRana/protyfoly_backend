import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.pexels.com", "ik.imagekit.io"], // ✅ Add this line
  },
};

export default nextConfig;
