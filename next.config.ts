import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static-libria.weekstorm.one",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactCompiler: true,
  reactStrictMode: false,
};

export default nextConfig;
