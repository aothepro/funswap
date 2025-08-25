import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://raw.githubusercontent.com/spothq/cryptocurrency-icons/refs/heads/master/[0-9]+/icon/**.png')],
  },
};

export default nextConfig;
