// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Agar custom domain na ho toh GitHub repo ka exact naam daalo:
const repoName = "vibe-wish";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}/` : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
