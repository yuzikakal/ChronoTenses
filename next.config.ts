import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // allowedDevOrigins: ["192.168.100.11", "localhost:3000"],
  allowedDevOrigins: ["172.16.34.115", "localhost:3000"],
  reactStrictMode: false, // Mematikan render ganda agar hemat kuota API
};

export default nextConfig;
