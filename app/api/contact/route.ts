import { NextResponse } from "next/server";
import { Resend } from "resend";

/**
 * Contact form endpoint — sends email to sorin.baciu@uzinex.ro.
 * Body: { name, email, phone?, company?, subject?, message, sourceUrl?, honeypot? }
 *
 * NU trimite la Monday — formularul de contact merge DOAR pe email.
 * Pentru lead-uri cu Monday integration, vezi /api/lead.
 *
 * Configurare necesară (Vercel Environment Variables):
 *   RESEND_API_KEY  — obține de la https://resend.com (free tier: 100 mail/zi)
 *   CONTACT_TO      — opțional; default: "sorin.baciu@uzinex.ro"
 *   CONTACT_FROM    — opțional; default: "onboarding@resend.dev"
 *                     (pentru producție recomandat: "no-reply@uzinex.ro" cu DNS verificat în Resend)
 */

export const runtime = "nodejs";

const TO = process.env.CONTACT_TO || "sorin.baciu@uzinex.ro";
const FROM = process.env.CONTACT_FROM || "Uzinex Site <onboarding@resend.dev>";

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  subject?: string;
  message?: string;
  sourceUrl?: string;
  honeypot?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
  }

  // Anti-bot honeypot — silent reject if filled
  if (body.honeypot && body.honeypot.trim()) {
    return NextResponse.json({ ok: true, skipped: "honeypot" }, { status: 200 });
  }

  // Validation
  if (!body.name?.trim() || body.name.length < 2) {
    return NextResponse.json({ ok: false, error: "Numele este obligatoriu." }, { status: 400 });
  }
  if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: "Email invalid." }, { status: 400 });
  }
  if (!body.message?.trim() || body.message.length < 5) {
    return NextResponse.json({ ok: false, error: "Mesajul este obligatoriu." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY not configured");
    return NextResponse.json(
      {
        ok: false,
        error: "Trimiterea email este temporar indisponibilă. Te rugăm să ne scrii direct la " + TO,
        fallback: `mailto:${TO}`,
      },
      { status: 503 }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const subject = body.subject?.trim() || "Contact de pe site";

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 640px; margin: 0 auto;">
      <div style="background: #082545; color: #fff; padding: 20px 24px;">
        <h1 style="margin: 0; font-size: 18px; font-weight: 700;">Lead nou de pe formularul de contact</h1>
        <p style="margin: 4px 0 0; opacity: 0.7; font-size: 13px;">${escapeHtml(subject)}</p>
      </div>

      <div style="padding: 24px; background: #fff; border: 1px solid #eee; border-top: none;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #888; width: 130px;">Nume</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(body.name)}</td></tr>
          <tr><td style="padding: 6px 0; color: #888;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(body.email)}" style="color: #1e6bb8;">${escapeHtml(body.email)}</a></td></tr>
          ${body.phone ? `<tr><td style="padding: 6px 0; color: #888;">Telefon</td><td style="padding: 6px 0;"><a href="tel:${escapeHtml(body.phone)}" style="color: #1e6bb8;">${escapeHtml(body.phone)}</a></td></tr>` : ""}
          ${body.company ? `<tr><td style="padding: 6px 0; color: #888;">Companie</td><td style="padding: 6px 0;">${escapeHtml(body.company)}</td></tr>` : ""}
          ${body.sourceUrl ? `<tr><td style="padding: 6px 0; color: #888;">Sursă</td><td style="padding: 6px 0; font-size: 12px;"><a href="${escapeHtml(body.sourceUrl)}" style="color: #1e6bb8;">${escapeHtml(body.sourceUrl)}</a></td></tr>` : ""}
        </table>

        <div style="margin-top: 20px; padding: 16px; background: #f5f5f7; border-left: 3px solid #f5851f;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 8px;">Mesaj</div>
          <div style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${escapeHtml(body.message)}</div>
        </div>
      </div>

      <div style="padding: 12px 24px; background: #f5f5f7; font-size: 11px; color: #888; border: 1px solid #eee; border-top: none;">
        Trimis automat de uzinex.ro · răspunde direct la acest email pentru a contacta clientul
      </div>
    </div>
  `;

  const plain = [
    `Lead nou — ${subject}`,
    `─────────────────`,
    `Nume: ${body.name}`,
    `Email: ${body.email}`,
    body.phone ? `Telefon: ${body.phone}` : "",
    body.company ? `Companie: ${body.company}` : "",
    body.sourceUrl ? `Sursă: ${body.sourceUrl}` : "",
    ``,
    `Mesaj:`,
    body.message,
  ].filter(Boolean).join("\n");

  try {
    const result = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: body.email,
      subject: `[Contact] ${subject} — ${body.name}`,
      html,
      text: plain,
    });

    if (result.error) {
      console.error("[contact] resend error:", result.error);
      return NextResponse.json(
        { ok: false, error: "Eroare la trimiterea email-ului. Încearcă din nou.", fallback: `mailto:${TO}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, id: result.data?.id }, { status: 200 });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Eroare neașteptată. Te rugăm să încerci din nou.", fallback: `mailto:${TO}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "/api/contact",
    configured: !!process.env.RESEND_API_KEY,
    to: TO,
    from: FROM,
  });
}
