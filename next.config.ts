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

  // ─── Legacy WordPress URL redirects ───
  // Bing/Google crawled the old WordPress site on uzinex.ro before we migrated
  // to Next.js. These 301s preserve link equity from backlinks pointing at old
  // slugs, and let search engines re-index to the new canonical URLs.
  // Permanent (301) is critical for SEO — signals intent to transfer authority.
  async redirects() {
    return [
      // ─── Product slug renames (old WP slug → new Next.js slug) ───
      { source: "/produs/centrul-cnc-5-axe-pentru-prelucrare-complexa", destination: "/produs/centru-de-prelucrare-cnc-5-axe", permanent: true },
      { source: "/produs/strung-cnc-masina-de-strunjit", destination: "/produs/strung-cnc-pentru-strunjit-metal", permanent: true },
      { source: "/produs/strungul-cnc-pentru-strunjit-metal", destination: "/produs/strung-cnc-pentru-strunjit-metal", permanent: true },
      { source: "/produs/masina-cnc-3-sau-4-axe-3", destination: "/produs/masina-cnc-3-sau-4-axe", permanent: true },
      { source: "/produs/routerul-cnc-3-si-4-axe-cu-atc", destination: "/produs/masina-cnc-3-sau-4-axe", permanent: true },
      { source: "/produs/masina-automata-de-taiere-cu-laser-alimentata-cu-bobina-de-tabla", destination: "/produs/masina-automata-de-taiere-laser-cu-bobina-de-tabla", permanent: true },
      { source: "/produs/masina-laser-cu-bobina-de-tabla", destination: "/produs/masina-automata-de-taiere-laser-cu-bobina-de-tabla", permanent: true },
      { source: "/produs/ripper-pentru-excavator-monde", destination: "/produs/ripper-pentru-excavator", permanent: true },
      { source: "/produs/tocator-de-fier-vechi", destination: "/produs/tocator-de-fier-vechi-zy-s-800-3000-kg-h-lame-cr12mov-plc-anti-suprasarcina-uzinex", permanent: true },
      { source: "/produs/masina-de-aplicat-cant-complet-automata-cu-urmarire-profil", destination: "/produs/masina-de-aplicat-cant-complet-automata-cu-urmarire-profil", permanent: true },
      { source: "/produs/masina-de-aplicat-cant-complet-automata-pentru-mobila-din-lemn-cu-urmarire-a-profilului", destination: "/produs/masina-de-aplicat-cant-complet-automata-cu-urmarire-profil", permanent: true },
      { source: "/produs/masina-de-aplicat-cant-automata-echipata-cu-doua-rezervoare-de-adeziv", destination: "/produs/masina-de-aplicat-cant-automata-cu-doua-rezervoare-de-adeziv", permanent: true },
      { source: "/produs/masina-de-aplicat-cant-cu-doua-rezervoare-de-adeziv", destination: "/produs/masina-de-aplicat-cant-automata-cu-doua-rezervoare-de-adeziv", permanent: true },
      { source: "/produs/centrul-cnc-multifunctional-pentru-fabricarea-usilor", destination: "/produs/centru-de-prelucrare-cnc-multifunctional-pentru-fabricarea-usilor", permanent: true },
      { source: "/produs/miniexcavator-1-tona-rippa-r10-eco", destination: "/produs/r10eco-mini-excavator", permanent: true },
      { source: "/produs/miniexcavator-zts-rippa-r13-professional", destination: "/produs/rippa-r13-professional-mini-excavator", permanent: true },
      { source: "/produs/grapa-hidraulica-excavator-monde", destination: "/produs/graifer-hidraulic-pentru-excavator", permanent: true },
      { source: "/produs/buldozer-cu-trei-coade-ripper", destination: "/produs/buldozer-cu-trei-coade-ripper", permanent: true },
      { source: "/produs/ripperul-buldozer-trei-coade-monde", destination: "/produs/buldozer-cu-trei-coade-ripper", permanent: true },
      { source: "/produs/masina-cnc-pentru-realizarea-gaurilor-de-incuietori-si-balamale-pe-usi-din-lemn", destination: "/produs/masina-cnc-frezat-locasuri-balamale-si-incuietori-usi", permanent: true },
      { source: "/produs/masina-cnc-pentru-gauri-incuietori-usi-lemn", destination: "/produs/masina-cnc-frezat-locasuri-balamale-si-incuietori-usi", permanent: true },
      { source: "/produs/centrul-cnc-de-frezat-locasuri-balamale-si-incuietori-usi", destination: "/produs/masina-cnc-frezat-locasuri-balamale-si-incuietori-usi", permanent: true },
      { source: "/produs/masina-de-taiat-fasii-metalice", destination: "/produs/masina-cnc-de-taiere-a-metalului-cu-banda-in-forma-de-t", permanent: true },
      { source: "/produs/invelitoare-de-maneca-industriala-fl7540-pneumatic", destination: "/produs/invelitoare-de-maneca-fl7540-pneumatic", permanent: true },
      { source: "/produs/concasor-orizontal-cu-ciocan-de-fier-vechi", destination: "/produs/concasor-orizontal-cu-ciocan-de-fier-vechi", permanent: true },
      { source: "/produs/concasor-fier-vechi-zy-hc-orizontal", destination: "/produs/concasor-orizontal-cu-ciocan-de-fier-vechi", permanent: true },
      { source: "/produs/masina-cnc-de-gaurire-cu-cap-dublu-si-sase-fete", destination: "/magazin", permanent: true },
      { source: "/produs/centrul-cnc-gaurit-6-fete-cap-dublu", destination: "/magazin", permanent: true },
      { source: "/produs/cupa-excavator-1000mm-rippa-r10-r13-r15", destination: "/produs/cupa-excavator-de-roca", permanent: true },

      // ─── WordPress taxonomy (/categorie-produs/) → new shop ───
      { source: "/categorie-produs/utilaje-cnc/cnc-mobila", destination: "/magazin?cat=Utilaje%20CNC&sub=CNC%20mobil%C4%83", permanent: true },
      { source: "/categorie-produs/masini-industriale/utilaje-cnc/cnc-mobila", destination: "/magazin?cat=Utilaje%20CNC&sub=CNC%20mobil%C4%83", permanent: true },
      { source: "/categorie-produs/utilaje-cnc/router-cnc", destination: "/magazin?cat=Utilaje%20CNC&sub=Router%20CNC", permanent: true },
      { source: "/categorie-produs/utilaje-cnc/cnc-diverse", destination: "/magazin?cat=Utilaje%20CNC&sub=CNC%20diverse", permanent: true },
      { source: "/categorie-produs/masini-industriale/utilaje-cnc/cnc-diverse", destination: "/magazin?cat=Utilaje%20CNC&sub=CNC%20diverse", permanent: true },
      { source: "/categorie-produs/utilaje-cnc", destination: "/magazin?cat=Utilaje%20CNC", permanent: true },
      { source: "/categorie-produs/utilaje-cnc/page/:n*", destination: "/magazin?cat=Utilaje%20CNC", permanent: true },
      { source: "/categorie-produs/masini-taiere-laser", destination: "/magazin?cat=Ma%C8%99ini%20de%20t%C4%83iere%20laser", permanent: true },
      { source: "/categorie-produs/echipamente-si-utilaje-comerciale/masini-taiere-laser", destination: "/magazin?cat=Ma%C8%99ini%20de%20t%C4%83iere%20laser", permanent: true },
      // Catch-all for any other old category URL → /magazin
      { source: "/categorie-produs/:path*", destination: "/magazin", permanent: true },

      // ─── English versions (WordPress /en/) → Romanian equivalents ───
      // Next.js doesn't have English product pages (only /en/ homepage).
      // These redirect EN product/category URLs to the main catalog.
      { source: "/en/product/:slug", destination: "/produs/:slug", permanent: true },
      { source: "/en/produs/:slug", destination: "/produs/:slug", permanent: true },
      { source: "/en/product-category/:path*", destination: "/magazin", permanent: true },
      { source: "/en/categorie-produs/:path*", destination: "/magazin", permanent: true },
      { source: "/en/informatii-utile", destination: "/materiale-utile", permanent: true },
      { source: "/en/informatii-utile/:path*", destination: "/materiale-utile", permanent: true },
      { source: "/en/credite-si-leasing", destination: "/finantare/credite-leasing", permanent: true },

      // ─── Top-level page renames ───
      { source: "/informatii-utile", destination: "/materiale-utile", permanent: true },
      { source: "/informatii-utile/:path*", destination: "/materiale-utile", permanent: true },
      { source: "/informatii-utileold", destination: "/materiale-utile", permanent: true },
      { source: "/credite-si-leasing", destination: "/finantare/credite-leasing", permanent: true },

      // ─── Legacy sitemap URLs (WordPress Yoast SEO convention) ───
      // Bing/GSC still reference these URLs from the old WP site.
      // Redirect them to the new Next.js sitemap so crawlers find the correct one.
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/post-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/product-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/category-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/product_cat-sitemap.xml", destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default nextConfig;
