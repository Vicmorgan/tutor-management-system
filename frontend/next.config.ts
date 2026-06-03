import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack — @tailwindcss/postcss (Tailwind v4) is not yet
  // fully supported in Turbopack's dev server. Webpack handles it correctly.
  experimental: {},
};

export default nextConfig;
