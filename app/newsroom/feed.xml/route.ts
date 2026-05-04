// RSS 2.0 feed for Newsroom UZINEX — used by journalists, news aggregators,
// Google News, and feed readers. Includes published stories + algorithmic
// insights with score >= 0.6 (verified-editorial OR strong signal only).

import { NextResponse } from "next/server";
import { loadStories, loadInsights } from "@/lib/newsroom/data";
import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function cdata(s: string): string {
  // CDATA cannot contain "]]>" — split if it does
  return `<![CDATA[${s.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function rfc822(d: string | Date): string {
  const date = typeof d === "string" ? new Date(d) : d;
  return date.toUTCString();
}

export async function GET() {
  const stories = loadStories()
    .filter((s) => s.status === "published")
    .sort((a, b) => new Date(b.publishedAt || b.createdAt).getTime() - new Date(a.publishedAt || a.createdAt).getTime());

  const insights = loadInsights()
    .filter((i) => (i.score ?? 0) >= 0.6)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 30);

  const buildDate = rfc822(new Date());

  const storyItems = stories.map((s) => {
    const link = `${SITE_URL}/newsroom/stories/${s.slug}`;
    const desc = s.tldr.length > 0 ? s.tldr.join(" • ") : (s.subtitle || "");
    return `    <item>
      <title>${escape(s.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${rfc822(s.publishedAt || s.createdAt)}</pubDate>
      <category>Story editorial</category>
      <description>${cdata(desc)}</description>
      <author>sorin.baciu@uzinex.ro (Sorin Baciu, Director General UZINEX)</author>
    </item>`;
  });

  const insightItems = insights.map((i) => {
    const link = `${SITE_URL}/newsroom/anomalii#insight-${i.id}`;
    const verified = stories.some((s) => s.insightIds.includes(i.id));
    const badge = verified ? "[Verificat editorial]" : "[Algoritmic]";
    return `    <item>
      <title>${escape(`${badge} ${i.title}`)}</title>
      <link>${link}</link>
      <guid isPermaLink="false">uzinex-insight-${i.id}</guid>
      <pubDate>${rfc822(i.createdAt)}</pubDate>
      <category>${escape(i.type)}</category>
      <description>${cdata(`${i.summary}\n\nSurse: ${i.sources.join(", ")}\nScore: ${i.score.toFixed(2)}`)}</description>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Newsroom UZINEX — date oficiale despre industria românească</title>
    <link>${SITE_URL}/newsroom</link>
    <atom:link href="${SITE_URL}/newsroom/feed.xml" rel="self" type="application/rss+xml" />
    <description>Story-uri editoriale și insights algoritmice săptămânale. Date din 90+ surse oficiale (BNR, Eurostat, ANAF, IMF, World Bank, USASpending, NSPA, UN Comtrade, TED Europa). Pentru jurnaliști — cifre verificabile, gata de citare.</description>
    <language>ro-RO</language>
    <copyright>UZINEX — date publice agregate, citarea liberă cu link spre sursa originală.</copyright>
    <managingEditor>sorin.baciu@uzinex.ro (Sorin Baciu)</managingEditor>
    <webMaster>sorin.baciu@uzinex.ro (Sorin Baciu)</webMaster>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <pubDate>${buildDate}</pubDate>
    <ttl>360</ttl>
    <category>Industrie</category>
    <category>Date publice</category>
    <category>România</category>
    <generator>Newsroom UZINEX pipeline</generator>
${storyItems.join("\n")}
${insightItems.join("\n")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
