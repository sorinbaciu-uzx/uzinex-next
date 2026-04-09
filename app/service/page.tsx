import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Service tehnic Uzinex — inclus, abonamente și manuale AI",
  description:
    "Trei direcții de service tehnic Uzinex: ce primești gratuit cu fiecare echipament, contractele de abonament pentru mentenanță preventivă și manualele interactive cu inteligență artificială.",
};

const CARDS = [
  {
    num: "01",
    slug: "inclus-la-livrare",
    eyebrow: "Inclus gratuit",
    title: "Service inclus la livrare",
    description:
      "Punerea în funcțiune, trainingul operatorilor, garanția standard, diagnoza colaborativă remote și piesele originale OEM — fiecare echipament livrat de Uzinex vine cu ecosistemul complet de suport tehnic.",
    highlights: [
      "60 luni garanție standard",
      "Intervenție fizică sub 24h",
      "Training inițial operatori",
      "Piese OEM 50.000+",
    ],
    accent: "#1e6bb8",
  },
  {
    num: "02",
    slug: "abonamente",
    eyebrow: "Mentenanță preventivă",
    title: "Abonamente Service",
    description:
      "Contracte de mentenanță preventivă cu costuri previzibile, SLA-uri clare și acoperire totală. Alege dintre trei niveluri — Esențial, Avansat sau Premium — în funcție de criticitatea flotei tale.",
    highlights: [
      "3 tier-uri de abonament",
      "SLA garantat prin contract",
      "Răspuns la tichet 30 min",
      "Rapoarte tehnice lunare",
    ],
    accent: "#f5851f",
  },
  {
    num: "03",
    slug: "manual-ai",
    eyebrow: "Inovație exclusivă",
    title: "Manual de service cu AI",
    description:
      "Manual digital interactiv cu inteligență artificială, disponibil pentru fiecare echipament livrat. Pune întrebări vocal, fotografiezi piese, primești proceduri pas-cu-pas personalizate pe modelul tău. Offline, 24/7.",
    highlights: [
      "Limbaj natural + voce",
      "Recunoaștere prin imagini",
      "Contextual pe echipament",
      "Disponibil offline 24/7",
    ],
    accent: "#082545",
  },
];

export default function ServiceHubPage() {
  return (
    <>
      <Header solid />
      <main className="bg-white border-b hairline">
        {/* HEADER */}
        <section className="bg-ink-50 border-b hairline">
          <div className="container-x py-14 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-6"
              >
                <span>←</span> Înapoi la pagina principală
              </Link>
              <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">
                Service tehnic Uzinex
              </div>
              <h1
                className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95] max-w-3xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Trei direcții pentru{" "}
                <span className="font-light italic text-uzx-orange">
                  zero downtime.
                </span>
              </h1>
              <p className="text-ink-500 text-base lg:text-lg leading-relaxed mt-8 max-w-2xl">
                Ecosistemul Uzinex de service tehnic acoperă întregul ciclu de
                viață al echipamentului: de la punerea în funcțiune gratuită,
                la contractele de mentenanță preventivă, până la manualele
                interactive cu inteligență artificială disponibile 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* 3 CARDS */}
        <section>
          <div className="container-x py-14 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-200 border hairline">
                {CARDS.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/service/${c.slug}`}
                    className="bg-white p-8 lg:p-10 group hover:bg-ink-50 transition flex flex-col"
                  >
                    <div
                      className="text-[11px] uppercase tracking-[0.22em] mono font-bold mb-3"
                      style={{ color: c.accent }}
                    >
                      — {c.num} / {c.eyebrow}
                    </div>
                    <h2
                      className="serif text-2xl lg:text-3xl text-ink-900 leading-[1.05] mb-4 group-hover:text-uzx-blue transition"
                      style={{ letterSpacing: "-0.025em" }}
                    >
                      {c.title}
                    </h2>
                    <p className="text-sm text-ink-500 leading-relaxed mb-6">
                      {c.description}
                    </p>
                    <ul className="space-y-2 mb-8 mt-auto">
                      {c.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-ink-700"
                        >
                          <span
                            className="shrink-0 mt-[5px] w-1.5 h-1.5"
                            style={{ background: c.accent }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div
                      className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                      style={{ color: c.accent }}
                    >
                      Vezi detalii <span>›</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
