import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: { ignoreBuildErrors: true },
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.0.150"],
  ...(process.env.STATIC_EXPORT
    ? { output: "export" as const, images: { unoptimized: true } }
    : {}),
};

export default nextConfig;
