import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      // Prod : ajouter le domaine reel ici quand deploye
      // { protocol: "https", hostname: "api.idamarketplace.com", pathname: "/media/**" }
    ],
  },
};

export default nextConfig;
