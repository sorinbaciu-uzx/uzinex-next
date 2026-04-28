import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createLead, type LeadInput } from "@/lib/monday";
import { fetchAnafData, normalizeCui } from "@/lib/anaf";
import { SITE_URL } from "@/lib/site";

type ProductRef = { sku?: string; name?: string; slug?: string; qty?: number };

const NOTIFY_TO = process.env.LEAD_NOTIFY_TO || process.env.CONTACT_TO || "sorin.baciu@uzinex.ro";
const NOTIFY_FROM = process.env.CONTACT_FROM || "Uzinex Site <onboarding@resend.dev>";

function productLink(slug?: string): string | null {
  if (!slug) return null;
  return `${SITE_URL}/produs/${slug}`;
}

const INTENT_LABEL: Record<LeadInput["intent"], string> = {
  leads: "Ofertă / Lead produs",
  service: "Service & mentenanță",
  finantare: "Cerere finanțare",
  hr: "Cerere HR / Cariere",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendLeadEmail(input: LeadInput, mondayId: string): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[lead] RESEND_API_KEY not set — email notification skipped");
    return;
  }

  const isContactForm = input.extra?.formSource === "contact";
  const intentLabel = isContactForm
    ? "Formular Contact"
    : INTENT_LABEL[input.intent] ?? input.intent;
  const subject = input.subject?.trim() || `${intentLabel} de pe site`;

  const products: ProductRef[] = Array.isArray(input.extra?.products)
    ? (input.extra!.products as ProductRef[])
    : [];
  const firstProductName = products[0]?.name?.trim();

  const extraRows: string[] = [];
  if (input.extra && typeof input.extra === "object") {
    for (const [k, v] of Object.entries(input.extra)) {
      if (v == null || v === "") continue;
      if (k === "products" && Array.isArray(v)) {
        const rows = (v as ProductRef[])
          .map((p) => {
            const sku = p.sku ? escapeHtml(p.sku) : "—";
            const name = p.name ? escapeHtml(p.name) : "(fără nume)";
            const qty = p.qty && p.qty > 1 ? ` × ${p.qty}` : "";
            const link = productLink(p.slug);
            const namePart = link
              ? `<a href="${escapeHtml(link)}" style="color:#1e6bb8;">${name}</a>`
              : name;
            return `<div style="padding:4px 0;"><span style="font-family:monospace;color:#555;">${sku}</span> — ${namePart}${qty}</div>`;
          })
          .join("");
        extraRows.push(
          `<tr><td style="padding:6px 0;color:#888;vertical-align:top;">Produse</td><td style="padding:6px 0;font-size:13px;">${rows}</td></tr>`
        );
        continue;
      }
      const value = typeof v === "object" ? JSON.stringify(v) : String(v);
      extraRows.push(
        `<tr><td style="padding:6px 0;color:#888;">${escapeHtml(k)}</td><td style="padding:6px 0;font-size:12px;">${escapeHtml(value)}</td></tr>`
      );
    }
  }

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:#082545;color:#fff;padding:20px 24px;">
        <h1 style="margin:0;font-size:18px;font-weight:700;">Lead nou — ${escapeHtml(intentLabel)}</h1>
        <p style="margin:4px 0 0;opacity:0.7;font-size:13px;">${escapeHtml(subject)}</p>
      </div>
      <div style="padding:24px;background:#fff;border:1px solid #eee;border-top:none;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:6px 0;color:#888;width:130px;">Nume</td><td style="padding:6px 0;font-weight:600;">${escapeHtml(input.name)}</td></tr>
          <tr><td style="padding:6px 0;color:#888;">Email</td><td style="padding:6px 0;"><a href="mailto:${escapeHtml(input.email)}" style="color:#1e6bb8;">${escapeHtml(input.email)}</a></td></tr>
          ${input.phone ? `<tr><td style="padding:6px 0;color:#888;">Telefon</td><td style="padding:6px 0;"><a href="tel:${escapeHtml(input.phone)}" style="color:#1e6bb8;">${escapeHtml(input.phone)}</a></td></tr>` : ""}
          ${input.company ? `<tr><td style="padding:6px 0;color:#888;">Companie</td><td style="padding:6px 0;">${escapeHtml(input.company)}</td></tr>` : ""}
          ${input.sourceUrl ? `<tr><td style="padding:6px 0;color:#888;">Sursă</td><td style="padding:6px 0;font-size:12px;"><a href="${escapeHtml(input.sourceUrl)}" style="color:#1e6bb8;">${escapeHtml(input.sourceUrl)}</a></td></tr>` : ""}
          <tr><td style="padding:6px 0;color:#888;">Monday ID</td><td style="padding:6px 0;font-family:monospace;font-size:12px;">${escapeHtml(mondayId)}</td></tr>
          ${extraRows.join("")}
        </table>
        <div style="margin-top:20px;padding:16px;background:#f5f5f7;border-left:3px solid #f5851f;">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:8px;">Mesaj</div>
          <div style="white-space:pre-wrap;font-size:14px;line-height:1.6;">${escapeHtml(input.message)}</div>
        </div>
      </div>
      <div style="padding:12px 24px;background:#f5f5f7;font-size:11px;color:#888;border:1px solid #eee;border-top:none;">
        Trimis automat de uzinex.ro · răspunde direct la acest email pentru a contacta clientul · item Monday: ${escapeHtml(mondayId)}
      </div>
    </div>
  `;

  const plain = [
    `Lead nou — ${intentLabel}`,
    `Subiect: ${subject}`,
    `─────────────────`,
    `Nume: ${input.name}`,
    `Email: ${input.email}`,
    input.phone ? `Telefon: ${input.phone}` : "",
    input.company ? `Companie: ${input.company}` : "",
    input.sourceUrl ? `Sursă: ${input.sourceUrl}` : "",
    `Monday ID: ${mondayId}`,
    ``,
    `Mesaj:`,
    input.message,
  ].filter(Boolean).join("\n");

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      replyTo: input.email,
      subject: `[${intentLabel}] ${input.name} — ${firstProductName ?? subject}`,
      html,
      text: plain,
    });
    if (result.error) {
      console.error("[lead] resend error:", result.error);
    }
  } catch (err) {
    console.error("[lead] email send failed:", err);
  }
}

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

    // Email notification — non-fatal: lead is already in Monday.
    await sendLeadEmail(input, result.id);

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
