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

const isDev = process.env.NODE_ENV === "development";
const apiOrigin = `${apiHost.protocol}://${apiHost.hostname}${
  apiHost.port ? ":" + apiHost.port : ""
}`;

// Content-Security-Policy. En dev on assouplit (eval + ws pour le HMR de Next,
// http pour l'API/media locaux). En prod : politique stricte.
// NB : script-src conserve 'unsafe-inline' car Next injecte des scripts inline
// d'hydratation sans nonce ; durcissement futur = CSP à nonce via middleware.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  `img-src 'self' data: blob: https:${isDev ? " http:" : ""}`,
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  `connect-src 'self' ${apiOrigin} https:${isDev ? " ws: http:" : ""}`,
  "frame-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  // HSTS uniquement en prod (jamais sur le HTTP local de dev).
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
];

const nextConfig: NextConfig = {
  // N'expose pas la version de Next dans l'en-tête X-Powered-By.
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
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
