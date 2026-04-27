"use client";

import { useState } from "react";
import { trackLead } from "@/components/Analytics";

type SubmitState = "idle" | "sending" | "success" | "error";

type Props = {
  productName: string;
  productSku: string;
  productSlug: string;
};

export function ProductLeadForm({ productName, productSku, productSlug }: Props) {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

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
  );
}
