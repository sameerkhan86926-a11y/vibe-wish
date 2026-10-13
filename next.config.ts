// next.config.ts
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// GitHub repo ka exact case-sensitive naam (e.g. 'vibe-wish')
const repoName = "vibe-wish";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  assetPrefix: isProd ? `/${repoName}` : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
