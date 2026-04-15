import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  // Long cache for static assets (Vercel serves these from edge anyway).
  // Lighthouse's "Use efficient cache lifetimes" looks for max-age >= 1 year
  // on immutable assets. Next.js handles _next/static/* automatically; this
  // covers files in /public/ that don't get content-hashed.
  async headers() {
    return [
      {
        source: "/globe.html",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/products/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:all(.+\\.(?:webp|png|jpg|jpeg|svg|gif|ico|woff|woff2|ttf|otf))",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
