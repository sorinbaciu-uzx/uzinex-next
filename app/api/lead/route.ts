import { NextRequest, NextResponse } from "next/server";
import { createLead, type LeadInput } from "@/lib/monday";
import { fetchAnafData, normalizeCui } from "@/lib/anaf";

/**
 * POST /api/lead — main entry point for ALL website lead forms / CTAs.
 *
 * Accepts JSON body:
 * {
 *   intent: "leads" | "service" | "finantare" | "hr",
 *   name, email, phone?, company?, message, sourceUrl?, subject?,
 *   extra?: { ...board-specific fields }
 * }
 *
 * Returns:
 *   { ok: true, id: "123456789", board: "..." } on success
 *   { ok: false, error: "...", fallback: "mailto:..." } on failure
 *
 * On failure, caller should fall back to mailto (the form's default submit).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_INTENTS = ["leads", "service", "finantare", "hr"] as const;

// Simple in-memory rate limit: 5 submissions per IP per 10 minutes.
// Not perfect (resets on deploy, single-region) but stops casual bots.
const RATE_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function rateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = RATE_MAP.get(ip);
  if (!entry || entry.resetAt < now) {
    RATE_MAP.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { allowed: true };
  }
  if (entry.count >= RATE_LIMIT) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count += 1;
  return { allowed: true };
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const rl = rateLimit(ip);
    if (!rl.allowed) {
      return NextResponse.json(
        { ok: false, error: "Rate limit. Încearcă din nou în câteva minute.", retryAfter: rl.retryAfter },
        { status: 429 }
      );
    }

    const body = (await req.json()) as Partial<LeadInput> & { honeypot?: string };

    // Honeypot — if a hidden field is filled, it's a bot. Accept silently.
    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ ok: true, id: "bot-drop", board: "ignored" });
    }

    // Validate
    if (!body.intent || !ALLOWED_INTENTS.includes(body.intent as (typeof ALLOWED_INTENTS)[number])) {
      return NextResponse.json({ ok: false, error: "Intent invalid" }, { status: 400 });
    }
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ ok: false, error: "Email invalid" }, { status: 400 });
    }
    if (!body.name || body.name.length < 2) {
      return NextResponse.json({ ok: false, error: "Nume invalid" }, { status: 400 });
    }
    if (!body.message || body.message.length < 5) {
      return NextResponse.json({ ok: false, error: "Mesaj prea scurt" }, { status: 400 });
    }

    const input: LeadInput = {
      intent: body.intent as LeadInput["intent"],
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      message: body.message,
      sourceUrl: body.sourceUrl,
      subject: body.subject,
      extra: body.extra,
    };

    // ANAF enrichment — only for `leads` intent when a CUI is present.
    // Failures are non-fatal: the lead is created even if ANAF lookup fails or times out.
    if (input.intent === "leads") {
      const cui = normalizeCui(input.extra?.cui);
      if (cui) {
        try {
          const anaf = await fetchAnafData(cui);
          if (anaf) input.extra = { ...input.extra, anaf };
        } catch (e) {
          console.warn("[/api/lead] ANAF lookup failed:", e instanceof Error ? e.message : String(e));
        }
      }
    }

    const result = await createLead(input);

    return NextResponse.json({ ok: true, id: result.id, board: result.board });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    // Keep the error short in the public response; full error stays in logs.
    console.error("[/api/lead] error:", msg);
    return NextResponse.json(
      { ok: false, error: "Nu am putut trimite cererea acum. Te rugăm să încerci din nou sau să ne scrii direct la info@uzinex.ro.", fallback: "mailto:info@uzinex.ro" },
      { status: 500 }
    );
  }
}

// Health check endpoint (useful to verify Vercel env vars are loaded)
export async function GET() {
  const configured = Boolean(process.env.MONDAY_API_TOKEN);
  const boards = {
    leads: Boolean(process.env.MONDAY_BOARD_LEADS),
    service: Boolean(process.env.MONDAY_BOARD_SERVICE),
    finantare: Boolean(process.env.MONDAY_BOARD_FINANTARE),
    hr: Boolean(process.env.MONDAY_BOARD_HR),
  };
  return NextResponse.json({ ok: configured, boards });
}
