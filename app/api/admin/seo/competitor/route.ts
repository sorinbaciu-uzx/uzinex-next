import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { analyzeSEO } from "@/lib/seo/analyzer";

/**
 * POST /api/admin/seo/competitor
 * Analizează un URL concurent: descarcă HTML-ul, extrage title/meta/content,
 * calculează scor SEO pentru un focus keyword dat.
 * Read-only — zero risc pe site-ul concurentului.
 */

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }
  const { url, focusKeyword } = body as {
    url?: string;
    focusKeyword?: string;
  };
  if (!url || !focusKeyword) {
    return NextResponse.json(
      { error: "Trimite url și focusKeyword" },
      { status: 400 }
    );
  }

  // Basic URL validation
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "URL invalid" }, { status: 400 });
  }
  if (!/^https?:$/.test(parsed.protocol)) {
    return NextResponse.json(
      { error: "Doar http/https" },
      { status: 400 }
    );
  }

  try {
    // Fetch cu timeout 10s
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 10_000);
    const res = await fetch(parsed.toString(), {
      signal: ctrl.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; UzinexSEOAnalyzer/1.0; +https://uzinex.ro)",
        Accept: "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(t);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Fetch eșuat: HTTP " + res.status },
        { status: 502 }
      );
    }
    const html = await res.text();

    // Extract title, meta description, h1, body text
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const descMatch =
      html.match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i
      ) ||
      html.match(
        /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/i
      );
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const canonicalMatch = html.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i
    );

    // Extract body text (remove all tags)
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyHtml = bodyMatch ? bodyMatch[1] : html;
    const content = bodyHtml
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 50_000); // cap at 50k chars

    const slug = parsed.pathname.split("/").filter(Boolean).pop() || "";

    const analysis = analyzeSEO({
      focusKeyword,
      seoTitle: (titleMatch?.[1] || "").replace(/\s+/g, " ").trim(),
      seoDescription: descMatch?.[1] || "",
      slug,
      content,
      hasCanonical: !!canonicalMatch,
      hasSchema: /application\/ld\+json/.test(html),
    });

    return NextResponse.json({
      url: parsed.toString(),
      extracted: {
        title: (titleMatch?.[1] || "").replace(/\s+/g, " ").trim(),
        description: descMatch?.[1] || "",
        h1: (h1Match?.[1] || "").replace(/<[^>]+>/g, "").trim(),
        canonical: canonicalMatch?.[1] || null,
        hasSchema: /application\/ld\+json/.test(html),
        wordCount: content.split(/\s+/).filter(Boolean).length,
      },
      analysis,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Analiză eșuată: " + (err as Error).message },
      { status: 500 }
    );
  }
}
