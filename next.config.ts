import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pino", "pino-pretty", "@prisma/client", "prisma"],
};

export default nextConfig;
