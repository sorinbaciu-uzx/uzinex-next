import type { Metadata } from "next";
import { Inter, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@/components/Analytics";
import { AllLinksNewTab } from "@/components/AllLinksNewTab";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Uzinex — Echipamente și componente pentru industria grea",
    template: "%s · Uzinex",
  },
  description:
    "Soluții de intralogistică, prelucrare laser & CNC, robotică, utilaje grele, piese de schimb și service tehnic. Discută cu un inginer.",
  applicationName: "Uzinex",
  authors: [{ name: "Uzinex (GW LASER TECHNOLOGY S.R.L.)", url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "utilaje industriale",
    "echipamente grele",
    "CNC",
    "laser fiber",
    "cobots",
    "robotică industrială",
    "Industry 4.0",
    "SEAP",
    "SICAP",
    "licitații publice",
    "fonduri europene",
    "PNRR",
    "mentenanță predictivă",
    "Uzinex",
    "Iași",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Uzinex",
  publisher: "Uzinex",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: "Uzinex",
    title: "Uzinex — Tehnologie industrială performantă și servicii superioare",
    description:
      "Integrator industrial pentru sectorul privat, instituții de stat și apărare. Catalog de 180+ echipamente, integrare Industry 4.0, finanțare europeană și guvernamentală, service 24h.",
    // Next.js va genera automat /opengraph-image când adăugăm app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Uzinex — Echipamente și componente pentru industria grea",
    description:
      "Integrator industrial · 180+ echipamente · Industry 4.0 · Service 24h · Iași Tehnopolis.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "technology",
};

// JSON-LD structured data — Organization + LocalBusiness (merged as one entity)
// Helps Google build a Knowledge Panel and surface the business in local search.
const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "Uzinex",
      legalName: "GW LASER TECHNOLOGY S.R.L.",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.svg`,
        width: 512,
        height: 128,
      },
      image: `${SITE_URL}/logo.svg`,
      description:
        "Integrator industrial specializat în livrarea de echipamente grele și tehnologie industrială la cheie pentru sectorul privat, instituții de stat și apărare.",
      telephone: "+40769081081",
      email: "info@uzinex.ro",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Bulevardul Poitiers nr. 10",
        addressLocality: "Iași",
        postalCode: "700671",
        addressCountry: "RO",
        addressRegion: "IS",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 47.1594,
        longitude: 27.6098,
      },
      areaServed: [
        { "@type": "Country", name: "Romania" },
        { "@type": "Country", name: "Moldova" },
        { "@type": "Place", name: "European Union" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      sameAs: [
        "https://www.youtube.com/@UZINEX",
        "https://www.linkedin.com/company/uzinex",
      ],
      // Aggregate rating from Google Business reviews — update when reviews grow
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        reviewCount: 10,
        bestRating: 5,
        worstRating: 1,
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+40769081081",
          contactType: "sales",
          areaServed: ["RO", "MD", "EU"],
          availableLanguage: ["Romanian", "English"],
          email: "info@uzinex.ro",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Uzinex",
      description:
        "Tehnologie industrială performantă și servicii superioare.",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "ro-RO",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/magazin?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
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
      <head>
        <script
          type="application/ld+json"
          // Pre-serialized — safe string injection for SSR
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
      </head>
      <body className="font-sans">
        <Analytics />
        <AllLinksNewTab />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
