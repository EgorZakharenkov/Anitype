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
};

export default nextConfig;
