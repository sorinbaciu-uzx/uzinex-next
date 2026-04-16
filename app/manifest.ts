import type { MetadataRoute } from "next";

/**
 * Web App Manifest for uzinex.ro
 *
 * Allows PWA install (desktop, Android), provides theme color for mobile
 * browser chrome, and registers app icons. Served at /manifest.webmanifest.
 */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Uzinex — Echipamente industriale",
    short_name: "Uzinex",
    description:
      "Integrator industrial · 180+ echipamente · Industry 4.0 · Service 24h.",
    start_url: "/",
    display: "standalone",
    background_color: "#082545",
    theme_color: "#082545",
    lang: "ro-RO",
    categories: ["business", "shopping", "technology"],
    icons: [
      {
        src: "/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
