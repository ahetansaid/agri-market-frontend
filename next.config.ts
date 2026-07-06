import type { NextConfig } from "next";

// L'hôte des images (media Django) = l'hôte de l'API. On le dérive de
// NEXT_PUBLIC_API_URL pour autoriser automatiquement le backend (local,
// Render, etc.) sans éditer la config à chaque changement d'URL.
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
let apiHost = { protocol: "http" as "http" | "https", hostname: "127.0.0.1", port: "8000" };
try {
  const u = new URL(apiUrl);
  apiHost = {
    protocol: u.protocol.replace(":", "") as "http" | "https",
    hostname: u.hostname,
    port: u.port,
  };
} catch {
  // URL invalide -> on garde le défaut local
}

const nextConfig: NextConfig = {
  images: {
    // En dev : images servies en direct (pas de proxy next/image qui saturait
    // le Django de dev). En prod (Vercel) : optimisation active + hôte autorisé.
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      {
        protocol: apiHost.protocol,
        hostname: apiHost.hostname,
        port: apiHost.port,
        pathname: "/media/**",
      },
      { protocol: "http", hostname: "127.0.0.1", port: "8000", pathname: "/media/**" },
      { protocol: "http", hostname: "localhost", port: "8000", pathname: "/media/**" },
    ],
  },
};

export default nextConfig;
