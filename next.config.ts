import path from "node:path";
import type { NextConfig } from "next";

/** One year, immutable — safe because these files are content-stable assets. */
const STATIC_ASSET_CACHE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  // Lets you open the dev server from another device on the LAN (phone testing).
  // Scoped to the last octet so a new DHCP lease does not break it; Next rejects
  // a bare "*", and this stays dev-only — it has no effect on a production build.
  allowedDevOrigins: ["10.79.32.*"],
  // The parent karx_client project has its own lockfile; without this, Turbopack
  // infers that directory as the workspace root and resolves files from there.
  turbopack: {
    root: path.dirname(new URL(import.meta.url).pathname),
  },
  images: {
    // AVIF first, WebP as the fallback for browsers that do not take it.
    formats: ["image/avif", "image/webp"],
    localPatterns: [
      {
        pathname: "/assets/**",
      },
      {
        pathname: "/images/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "me7aitdbxq.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    // Files under public/ are served with no caching by default; photography and
    // video are the bulk of this site's weight, so cache them hard.
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_ASSET_CACHE }],
      },
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: STATIC_ASSET_CACHE }],
      },
    ];
  },
};

export default nextConfig;
