"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { trackLead } from "@/components/Analytics";

type SubmitState = "idle" | "sending" | "success" | "error";

type Props = {
  productName: string;
  productSku: string;
  productSlug: string;
};

/**
 * Header "cine răspunde" — alterneaza determinist intre 3 colegi pe baza
 * slug-ului produsului. Astfel, acelasi produs arata mereu acelasi inginer
 * (consistent UX), dar produse diferite arata persoane diferite (dinamic).
 *
 * Timpul mediu de raspuns are un baseline per persoana + un jitter mic per
 * slug → senzatie de "live" fara hydration mismatch (rezultat 100% determinist
 * pe server si client).
 */
const ENGINEERS = [
  { name: "Sorin Baciu", role: "CEO Uzinex", baseMin: 25 },
  { name: "Cosmin Florea", role: "Inginer mecatronică", baseMin: 14 },
  { name: "Cristian Munthiu", role: "Inginer mecanic senior", baseMin: 19 },
] as const;

/** FNV-1a 32-bit — small, deterministic, no deps. Same string → same hash on server + client. */
function hashSlug(slug: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

function pickEngineer(slug: string) {
  const h = hashSlug(slug || "uzinex");
  const eng = ENGINEERS[h % ENGINEERS.length];
  const jitter = (h >>> 4) % 7; // 0..6 min
  return { name: eng.name, role: eng.role, responseMin: eng.baseMin + jitter };
}

function RobotAvatar() {
  return (
    <svg viewBox="0 0 40 40" className="w-10 h-10" aria-label="Asistent inginer Uzinex" role="img">
      {/* navy circle background */}
      <circle cx="20" cy="20" r="20" fill="#0b2b66" />

      {/* antenna — pulsing tip */}
      <line x1="20" y1="6.5" x2="20" y2="10" stroke="#f5851f" strokeWidth="1.4" strokeLinecap="round" />
      <motion.circle
        cx="20" cy="5.6" r="1.4" fill="#f5851f"
        animate={{ opacity: [1, 0.45, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* white head */}
      <rect x="11" y="11" width="18" height="15" rx="3" fill="#ffffff" />

      {/* eyes with glint */}
      <circle cx="16" cy="18" r="1.6" fill="#0b2b66" />
      <circle cx="24" cy="18" r="1.6" fill="#0b2b66" />
      <circle cx="16.5" cy="17.5" r="0.4" fill="#ffffff" />
      <circle cx="24.5" cy="17.5" r="0.4" fill="#ffffff" />

      {/* subtle smile */}
      <path d="M 17 22 Q 20 24 23 22" stroke="#0b2b66" strokeWidth="1" fill="none" strokeLinecap="round" />

      {/* orange shoulders / collar */}
      <path d="M 13 26 L 13 30 Q 13 31 14 31 L 26 31 Q 27 31 27 30 L 27 26 Z" fill="#f5851f" />
      <line x1="20" y1="26" x2="20" y2="31" stroke="#0b2b66" strokeWidth="0.6" />

      {/* collar status LEDs */}
      <circle cx="16" cy="29" r="0.6" fill="#ffffff" opacity="0.92" />
      <circle cx="24" cy="29" r="0.6" fill="#ffffff" opacity="0.92" />
    </svg>
  );
}

export function ProductLeadForm({ productName, productSku, productSlug }: Props) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const engineer = pickEngineer(productSlug);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = fd.get("name")?.toString().trim() ?? "";
    const phone = fd.get("phone")?.toString().trim() ?? "";
    const email = fd.get("email")?.toString().trim() ?? "";
    const company = fd.get("company")?.toString().trim() ?? "";
    const honeypot = fd.get("website")?.toString() ?? "";

    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "leads",
          name,
          email,
          phone,
          company,
          message: `Cerere ofertă pentru ${productName} (SKU: ${productSku})`,
          subject: `Ofertă produs: ${productName}`,
          sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
          honeypot,
          extra: {
            tipCerere: "Oferta produs",
            products: [{ sku: productSku, name: productName, slug: productSlug, qty: 1 }],
          },
        }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setState("success");
        trackLead("leads");
      } else {
        throw new Error(json.error ?? "Submit failed");
      }
    } catch (err) {
      setState("error");
      const msg = err instanceof Error ? err.message : "Eroare necunoscută";
      setErrorMsg(msg);
      const body = [
        `Nume: ${name}`,
        `Telefon: ${phone}`,
        `Email: ${email}`,
        `Companie / CUI: ${company}`,
        "",
        `Produs: ${productName} (SKU: ${productSku})`,
      ].join("\n");
      const mailto = `mailto:info@uzinex.ro?subject=${encodeURIComponent(
        `Ofertă produs: ${productName}`,
      )}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }
  };

  if (state === "success") {
    return (
      <div className="border border-green-300 bg-green-50/60 px-4 py-6 text-center">
        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 text-lg font-bold">
          ✓
        </div>
        <h3 className="mt-3 text-[15px] font-semibold text-ink-900">Cererea a fost trimisă!</h3>
        <p className="mt-1.5 text-[12px] leading-relaxed text-ink-600">
          Mulțumim! Revenim cu o ofertă personalizată în maxim 24 de ore lucrătoare.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Header "cine raspunde" — robotel + nume + role + raspuns mediu.
          Numele si timpul sunt determinist alese din slug → consistent per
          produs, dar variaza intre produse. Vezi pickEngineer() de mai sus. */}
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-ink-100">
        <div className="relative shrink-0">
          <RobotAvatar />
          <span
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-white"
            aria-label="online"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-ink-900 leading-tight truncate">
            Răspunde {engineer.name}
          </div>
          <div className="text-[10px] text-ink-500 mono leading-tight mt-0.5 truncate">
            {engineer.role}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[10px] text-ink-400 mono uppercase tracking-wider">
            Răspuns med.
          </div>
          <div className="text-[12px] font-bold text-uzx-orange leading-tight mt-0.5">
            ~{engineer.responseMin} min
          </div>
        </div>
      </div>

      <p className="text-[13px] leading-relaxed text-ink-600 mb-4">
        Cere o ofertă completând formularul.
      </p>
      <form className="space-y-3" onSubmit={handleSubmit}>
      <input type="hidden" name="productName" value={productName} />
      <input type="hidden" name="productSku" value={productSku} />

      <div>
        <label className="block text-[12px] font-semibold text-[#111827] mb-1.5">
          Nume și prenume *
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Nume complet"
          className="w-full border border-ink-200 px-3 py-2.5 text-[13px] outline-none focus:border-uzx-orange"
        />
      </div>

      <div>
        <label className="block text-[12px] font-semibold text-[#111827] mb-1.5">
          Telefon *
        </label>
        <input
          type="tel"
          name="phone"
          required
          placeholder="07xx xxx xxx"
          className="w-full border border-ink-200 px-3 py-2.5 text-[13px] outline-none focus:border-uzx-orange"
        />
      </div>

      <div>
        <label className="block text-[12px] font-semibold text-[#111827] mb-1.5">
          Email *
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="email@companie.ro"
          className="w-full border border-ink-200 px-3 py-2.5 text-[13px] outline-none focus:border-uzx-orange"
        />
      </div>

      <div>
        <label className="block text-[12px] font-semibold text-[#111827] mb-1.5">
          CUI / Companie
        </label>
        <input
          type="text"
          name="company"
          placeholder="Ex: Uzinex S.R.L."
          className="w-full border border-ink-200 px-3 py-2.5 text-[13px] outline-none focus:border-uzx-orange"
        />
      </div>

      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label>
          Website (nu completa)
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {state === "error" && errorMsg && (
        <div className="bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
          ⚠ {errorMsg}. Am deschis clientul de email ca fallback.
        </div>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-2 flex w-full items-center justify-center gap-2 bg-uzx-orange px-4 py-3 text-[14px] font-bold text-white hover:bg-[#015CA8] transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state === "sending" ? "Se trimite..." : (
          <>
            Solicită ofertă
            <span>➤</span>
          </>
        )}
      </button>
      </form>
    </>
  );
}
