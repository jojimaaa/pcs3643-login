import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // impede que o ESLint falhe o `next build` na Vercel
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
