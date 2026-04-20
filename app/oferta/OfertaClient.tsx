"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { trackLead } from "@/components/Analytics";
import { PRODUCTS } from "@/app/magazin/products";

type Item = { sku: string; name: string; qty: number };
type SubmitState = "idle" | "sending" | "success" | "error";

const BENEFITS: { icon: string; title: string; body: string }[] = [
  {
    icon: "★",
    title: "Consultanță expertă",
    body: "Echipa noastră de ingineri îți recomandă soluția potrivită.",
  },
  {
    icon: "$",
    title: "Prețuri personalizate",
    body: "Oferte adaptate volumului și configurației tale.",
  },
  {
    icon: "⚡",
    title: "Răspuns rapid",
    body: "Ofertă detaliată în maxim 24 de ore lucrătoare.",
  },
  {
    icon: "✓",
    title: "Suport post-vânzare",
    body: "Garanție 60 luni, mentenanță și service incluse.",
  },
];

export function OfertaClient() {
  const [items, setItems] = useState<Item[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("uzinex_quote_cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const persist = (next: Item[]) => {
    try {
      localStorage.setItem("uzinex_quote_cart", JSON.stringify(next));
    } catch {}
  };

  const updateQty = (sku: string, delta: number) => {
    setItems((curr) => {
      const next = curr
        .map((i) => (i.sku === sku ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);
      persist(next);
      return next;
    });
  };

  const remove = (sku: string) => {
    setItems((curr) => {
      const next = curr.filter((i) => i.sku !== sku);
      persist(next);
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const nume = fd.get("nume")?.toString().trim() ?? "";
    const prenume = fd.get("prenume")?.toString().trim() ?? "";
    const firma = fd.get("firma")?.toString().trim() ?? "";
    const cui = fd.get("cui")?.toString().trim() ?? "";
    const telefon = fd.get("telefon")?.toString().trim() ?? "";
    const email = fd.get("email")?.toString().trim() ?? "";
    const mesaj = fd.get("mesaj")?.toString().trim() ?? "";
    const seap = fd.get("seap") === "on";
    const honeypot = fd.get("website")?.toString() ?? "";

    if (items.length === 0) {
      setErrorMsg("Adaugă cel puțin un produs din catalog înainte de a trimite cererea.");
      setState("error");
      return;
    }

    // Build message: products list + user notes + SEAP flag
    const productLines = items.map((it, i) => `${i + 1}. ${it.sku} — ${it.name} × ${it.qty} buc`).join("\n");
    const fullMessage = [
      "═══ PRODUSE SOLICITATE ═══",
      productLines,
      "",
      `═══ TOTAL: ${items.reduce((s, i) => s + i.qty, 0)} buc · ${items.length} articole ═══`,
      "",
      seap ? "★ Solicitare publicare în SEAP / SICAP: DA" : "",
      "",
      mesaj ? "═══ DETALII SUPLIMENTARE ═══" : "",
      mesaj,
    ]
      .filter(Boolean)
      .join("\n");

    setState("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: "leads",
          name: `${nume} ${prenume}`.trim() || nume || prenume,
          email,
          phone: telefon,
          company: firma,
          message: fullMessage,
          subject: seap ? "Oferta echipament + SEAP/SICAP" : "Oferta echipament",
          sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
          honeypot,
          extra: {
            tipCerere: seap ? "Licitatie SEAP/SICAP" : "Oferta echipament",
            cui,
            products: items.map((it) => {
              const p = PRODUCTS.find((x) => x.sku === it.sku);
              return { sku: it.sku, name: it.name, slug: p?.slug ?? "", qty: it.qty };
            }),
          },
        }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setState("success");
        // Fire conversion events (GA4, Meta Pixel, LinkedIn)
        trackLead("leads");
        // Golesc cart-ul după trimitere reușită
        setItems([]);
        try {
          localStorage.removeItem("uzinex_quote_cart");
        } catch {}
      } else {
        throw new Error(json.error ?? "Submit failed");
      }
    } catch (err) {
      setState("error");
      const msg = err instanceof Error ? err.message : "Eroare necunoscută";
      setErrorMsg(msg);
      // Fallback mailto
      const body = [
        `Nume: ${nume} ${prenume}`,
        `Companie: ${firma}`,
        `CUI: ${cui}`,
        `Email: ${email}`,
        `Telefon: ${telefon}`,
        "",
        fullMessage,
      ].join("\n");
      const mailto = `mailto:info@uzinex.ro?subject=${encodeURIComponent("Oferta echipament")}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
    }
  };

  return (
    <section className="bg-ink-50/40 py-6 lg:py-8 border-b border-ink-100">
      <div className="container-x">
        {/* STEPPER — chevron style */}
        <div className="mb-4 flex items-stretch h-11 lg:h-12 overflow-hidden">
          {[
            { num: "1.", label: "Selectează produsele", state: "done" },
            { num: "2.", label: "Completează datele", state: "active" },
            { num: "3.", label: "Confirmare", state: "todo" },
          ].map((s, i) => {
            const isFirst = i === 0;
            const isLast = i === 2;
            const bg =
              s.state === "done"
                ? "#1e6bb8"
                : s.state === "active"
                ? "#f5851f"
                : "#e5e7eb";
            const text =
              s.state === "todo" ? "text-ink-700" : "text-white";
            const clip = isLast
              ? "polygon(0 0, 100% 0, 100% 100%, 0 100%, 18px 50%)"
              : isFirst
              ? "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%)"
              : "polygon(0 0, calc(100% - 18px) 0, 100% 50%, calc(100% - 18px) 100%, 0 100%, 18px 50%)";
            return (
              <div
                key={s.num}
                className={`flex-1 flex items-center justify-center gap-2.5 ${text} ${
                  isFirst ? "" : "-ml-3"
                }`}
                style={{
                  background: bg,
                  clipPath: clip,
                  paddingLeft: isFirst ? "1rem" : "1.75rem",
                  paddingRight: isLast ? "1rem" : "1.75rem",
                }}
              >
                <span className="text-[12px] lg:text-[13px] font-semibold whitespace-nowrap">
                  {s.num} {s.label}
                </span>
                {s.state === "done" && (
                  <span className="w-4 h-4 rounded-full bg-white text-uzx-blue text-[10px] flex items-center justify-center font-bold shrink-0">
                    ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* 3 COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* LEFT — QUOTE LIST */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-ink-100 shadow-sm overflow-hidden h-full flex flex-col">
              <div className="px-5 py-3 border-b border-ink-100 flex items-center justify-between">
                <h2 className="serif text-base text-ink-900">Lista produse</h2>
                <a
                  href="/magazin"
                  className="text-[10px] mono uppercase tracking-wider text-uzx-blue hover:text-uzx-orange transition"
                >
                  ← catalog
                </a>
              </div>

              {/* table header */}
              <div className="px-5 py-2 grid grid-cols-12 gap-3 border-b border-ink-100 bg-ink-50/50">
                <div className="col-span-7 text-[9px] mono uppercase tracking-wider text-ink-400">
                  Produs
                </div>
                <div className="col-span-5 text-[9px] mono uppercase tracking-wider text-ink-400 text-right">
                  Cantitate
                </div>
              </div>

              {!loaded ? (
                <div className="p-6 text-center text-[12px] text-ink-400 flex-1">
                  Se încarcă…
                </div>
              ) : items.length === 0 ? (
                <div className="px-5 py-6 text-center flex-1 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 bg-ink-50 border border-ink-100 flex items-center justify-center text-ink-300 text-lg">
                    ⊘
                  </div>
                  <p className="mt-3 text-[11px] text-ink-500 leading-relaxed max-w-[200px]">
                    Lista ta este goală. Adaugă produse din catalog apăsând
                    <span className="text-uzx-orange font-medium"> Ofertă</span>.
                  </p>
                  <a
                    href="/magazin"
                    className="mt-4 inline-flex items-center gap-2 text-[11px] py-2 px-4 bg-uzx-blue hover:bg-uzx-blue2 text-white transition shadow-md shadow-uzx-blue/20"
                  >
                    Răsfoiește catalogul
                  </a>
                </div>
              ) : (
                <ul className="divide-y divide-ink-100 flex-1">
                  {items.map((it) => (
                    <li key={it.sku} className="px-5 py-4 grid grid-cols-12 gap-3 items-center">
                      <div className="col-span-7 flex items-center gap-3 min-w-0">
                        <div className="w-16 h-16 shrink-0 border border-ink-300 flex items-center justify-center">
                          <Image
                            src="/products/plastic-crusher.webp"
                            alt={it.name}
                            width={90}
                            height={90}
                            className="object-contain max-h-full max-w-full"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] mono uppercase tracking-wider text-ink-400 leading-tight">
                            {it.sku}
                          </div>
                          <div className="text-[13px] text-ink-900 leading-tight font-semibold mt-0.5">
                            {it.name}
                          </div>
                        </div>
                      </div>
                      <div className="col-span-5 flex items-center justify-end gap-1.5">
                        <div className="flex items-center border border-ink-200 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQty(it.sku, -1)}
                            className="w-7 h-7 flex items-center justify-center text-ink-500 hover:bg-ink-50 hover:text-uzx-orange transition text-xs"
                            aria-label="Scade"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-[11px] mono text-ink-900">
                            {it.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(it.sku, +1)}
                            className="w-7 h-7 flex items-center justify-center text-ink-500 hover:bg-ink-50 hover:text-uzx-orange transition text-xs"
                            aria-label="Crește"
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(it.sku)}
                          className="w-7 h-7 flex items-center justify-center text-ink-400 hover:text-uzx-orange transition text-sm"
                          aria-label="Elimină"
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              {items.length > 0 && (
                <div className="px-5 py-3 border-t border-ink-100 bg-ink-50/40 flex items-center justify-between">
                  <span className="text-[10px] mono uppercase tracking-wider text-ink-500">
                    Total
                  </span>
                  <span className="text-[11px] mono text-ink-900 font-semibold">
                    {items.reduce((s, i) => s + i.qty, 0)} buc · {items.length} articole
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* MIDDLE — FORM */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-ink-100 shadow-sm overflow-hidden h-full">
              <div className="px-5 lg:px-6 py-3 border-b border-ink-100">
                <h2 className="serif text-base text-ink-900">Solicită oferta personalizată</h2>
              </div>

              {state === "success" ? (
                <div className="px-5 lg:px-6 py-8 text-center">
                  <div className="w-12 h-12 mx-auto bg-green-100 border border-green-300 flex items-center justify-center text-green-700 text-xl">
                    ✓
                  </div>
                  <h3 className="serif text-lg text-ink-900 mt-4">Cererea a fost trimisă!</h3>
                  <p className="text-[12px] text-ink-600 leading-relaxed mt-2 max-w-sm mx-auto">
                    Mulțumim! Echipa noastră va analiza solicitarea și revine cu o ofertă personalizată în maxim
                    24 de ore lucrătoare.
                  </p>
                  <a
                    href="/magazin"
                    className="inline-block mt-5 text-[11px] py-2 px-4 bg-uzx-blue hover:bg-uzx-blue2 text-white transition shadow-md shadow-uzx-blue/20"
                  >
                    Înapoi la catalog
                  </a>
                </div>
              ) : (
                <form
                  className="px-5 lg:px-6 py-3 grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5"
                  onSubmit={handleSubmit}
                >
                  <Field label="Nume" name="nume" required />
                  <Field label="Prenume" name="prenume" />
                  <div className="sm:col-span-2">
                    <Field label="Nume firmă" name="firma" />
                  </div>
                  <div className="sm:col-span-2">
                    <Field label="CUI" name="cui" />
                  </div>
                  <Field label="Telefon" name="telefon" type="tel" />
                  <Field label="Email" name="email" type="email" required />

                  <div className="sm:col-span-2">
                    <label className="text-[10px] mono uppercase tracking-wider text-ink-500">
                      Mesaj
                    </label>
                    <textarea
                      name="mesaj"
                      rows={1}
                      placeholder="Detalii suplimentare despre cerere…"
                      className="mt-0.5 w-full text-[12px] px-3 py-1.5 border border-ink-200 focus:outline-none focus:border-uzx-blue focus:ring-2 focus:ring-uzx-blue/10 transition resize-y min-h-[36px]"
                    />
                  </div>

                  {/* Honeypot — câmp ascuns pentru boți */}
                  <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
                    <label>
                      Website (nu completa)
                      <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>

                  <div className="sm:col-span-2 bg-uzx-blue/5 border border-uzx-blue/15 px-3 py-1.5">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="seap"
                        className="w-3.5 h-3.5 accent-uzx-orange cursor-pointer"
                      />
                      <span className="text-[11px] text-ink-700 leading-tight">
                        Vrei să publici acest produs și în{" "}
                        <span className="text-uzx-blue font-semibold">SEAP / SICAP</span>?
                      </span>
                    </label>
                  </div>

                  {state === "error" && errorMsg && (
                    <div className="sm:col-span-2 bg-red-50 border border-red-200 px-3 py-2 text-[11px] text-red-700">
                      ⚠ {errorMsg}. Am deschis clientul de email ca fallback.
                    </div>
                  )}

                  <div className="sm:col-span-2 mt-0.5">
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="w-full inline-flex items-center justify-center gap-2 text-[12px] py-2.5 bg-uzx-orange hover:bg-uzx-orange2 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium transition shadow-md shadow-uzx-orange/20"
                    >
                      {state === "sending" ? "Se trimite..." : "Trimite cererea"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT — WHY */}
          <div className="lg:col-span-3">
            <div className="bg-white border border-ink-100 shadow-sm overflow-hidden h-full">
              <div className="px-5 py-3 border-b border-ink-100">
                <h2 className="serif text-[15px] text-ink-900">De ce să ceri o ofertă?</h2>
              </div>
              <ul className="px-5 py-3 space-y-3">
                {BENEFITS.map((b) => (
                  <li key={b.title} className="flex gap-2.5">
                    <div className="w-8 h-8 shrink-0 bg-uzx-orange/10 border border-uzx-orange/30 flex items-center justify-center text-uzx-orange text-sm font-semibold">
                      {b.icon}
                    </div>
                    <div>
                      <div className="text-[12px] text-ink-900 font-semibold leading-tight">
                        {b.title}
                      </div>
                      <div className="text-[10px] text-ink-500 leading-snug mt-0.5">
                        {b.body}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-2.5 bg-ink-50/40 border-t border-ink-100">
                <div className="flex items-center gap-2 text-[9px] mono uppercase tracking-wider text-ink-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-uzx-orange animate-pulse" />
                  Răspuns &lt; 24h
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-[10px] mono uppercase tracking-wider text-ink-500">
        {label} {required && <span className="text-uzx-orange">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-0.5 w-full text-[12px] px-3 py-1 border border-ink-200 focus:outline-none focus:border-uzx-blue focus:ring-2 focus:ring-uzx-blue/10 transition"
      />
    </div>
  );
}
