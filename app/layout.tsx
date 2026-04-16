import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Reduce font-file count to stabilize LCP on slow mobile networks.
// Each font file we preload is a race condition for LCP: when a file arrives
// late, the text re-paints and LCP candidate changes. Lighthouse mobile
// (4G throttled) often fails with NO_LCP when there are many preloaded fonts.
// Only Space Grotesk is preloaded (used for above-the-fold H1/serif titles).
// Inter and IBM Plex Mono use fallback-matching so they swap invisibly.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Uzinex — Echipamente și componente pentru industria grea",
  description:
    "Soluții de intralogistică, prelucrare laser & CNC, robotică, utilaje grele, piese de schimb și service tehnic. Discută cu un inginer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
