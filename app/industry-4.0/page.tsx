import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactCTA } from "@/components/ContactCTA";
import { IIoTExploded } from "@/components/solution-anims/IIoTExploded";
import { CobotsPriceCompare } from "@/components/solution-anims/CobotsPriceCompare";
import { PredictiveGraph } from "@/components/solution-anims/PredictiveGraph";
import { VisionCameraPOV } from "@/components/solution-anims/VisionCameraPOV";
import { EdgeWaterfall } from "@/components/solution-anims/EdgeWaterfall";
import { SoftwareIDE } from "@/components/solution-anims/SoftwareIDE";

const ANIM_MAP: Record<string, React.FC> = {
  "iiot-monitorizare": IIoTExploded,
  "robotica-colaborativa": CobotsPriceCompare,
  "mentenanta-predictiva": PredictiveGraph,
  "inspectie-optica": VisionCameraPOV,
  "edge-computing-mes": EdgeWaterfall,
  "software-industrial": SoftwareIDE,
};

export const metadata: Metadata = {
  title: "Industry 4.0 — Soluții integrate pentru fabrica viitorului",
  description:
    "Șase direcții tehnologice integrate la cheie: IIoT, robotică colaborativă, mentenanță predictivă, inspecție optică, Edge Computing și software industrial pe comandă.",
  alternates: { canonical: "/industry-4.0" },
  openGraph: {
    title: "Industry 4.0 Uzinex — 6 direcții tehnologice la cheie",
    description:
      "IIoT, cobots, mentenanță predictivă, inspecție optică, Edge/MES, software industrial. Fabrica viitorului, integrată de Uzinex.",
    url: "/industry-4.0",
  },
};

const DIRECTIONS = [
  {
    num: "01",
    slug: "iiot-monitorizare",
    title: "IIoT & Monitorizare Plug & Play",
    subtitle: "Digitalizare rapidă cu ROI din prima lună",
    description:
      "Montăm senzori pe orice utilaj — nou sau vechi — și în câteva ore ai dashboard-ul OEE pe telefon. Primul pas concret spre fabrica inteligentă, fără cablaje complicate și fără oprirea producției.",
    highlights: ["Dashboard OEE pe telefon", "Montare fără oprirea producției", "ROI în 3-6 luni"],
    accent: "#1e6bb8",
  },
  {
    num: "02",
    slug: "robotica-colaborativa",
    title: "Robotică colaborativă",
    subtitle: "Rezolvă lipsa de personal, nu triplezi costurile",
    description:
      "Cobotul lucrează în siguranță lângă oamenii tăi — paletizează, alimentează CNC-ul, sudează. Prețuri cu 30-40% sub distribuitorii europeni, cu instalare și programare de la noi.",
    highlights: ["ROI în 12-18 luni", "Instalare + programare incluse", "30-40% sub prețul pieței"],
    accent: "#f5851f",
  },
  {
    num: "03",
    slug: "mentenanta-predictiva",
    title: "Mentenanță predictivă",
    subtitle: "Zero opriri neplanificate, liniște totală",
    description:
      "Algoritmii noștri analizează datele de la senzori și îți spun exact ce piesă va ceda și când — noi o aducem pe linia ta de producție înainte de defecțiune.",
    highlights: ["Predicție defecțiuni pe bază de AI", "Piesa ajunge preventiv", "Critic pentru contracte publice"],
    accent: "#155290",
  },
  {
    num: "04",
    slug: "inspectie-optica",
    title: "Inspecție optică",
    subtitle: "Elimină rebuturile înainte să ajungă la client",
    description:
      "Camerele noastre inspectează fiecare piesă la viteze imposibil de atins manual, detectând defecte sub-milimetrice. Se montează pe banda existentă.",
    highlights: ["Defecte sub 1mm detectate live", "Montare pe bandă existentă", "90%+ reducere rebuturi"],
    accent: "#082545",
  },
  {
    num: "05",
    slug: "edge-computing-mes",
    title: "Edge Computing & Conectivitate MES",
    subtitle: "Conectează orice utilaj la biroul tău",
    description:
      "Gateway-ul nostru traduce automat datele din orice mașină în formatul ERP-ului tău. Managerul vede producția live, operatorul primește instrucțiuni digitale.",
    highlights: ["Compatibil orice brand", "Date live în ERP/MES", "Implementare sub 2 săptămâni"],
    accent: "#0a4d96",
  },
  {
    num: "06",
    slug: "software-industrial",
    title: "Software industrial pe comandă",
    subtitle: "Codul e al tău, fără licențe recurente",
    description:
      "De la panouri SCADA personalizate și interfețe HMI, la trasabilitate lot și raportare automată. Rulează pe serverele tale, fără abonamente sau dependență de vendor.",
    highlights: ["SCADA & HMI personalizate", "Trasabilitate lot-by-lot", "Cod proprietar, zero licențe"],
    accent: "#f5851f",
  },
];

export default function Industry40HubPage() {
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
                Industry 4.0
              </div>
              <h1
                className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95] max-w-3xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Soluții integrate{" "}
                <span className="font-light italic text-uzx-orange">
                  pentru fabrica viitorului.
                </span>
              </h1>
              <p className="text-ink-500 text-base lg:text-lg leading-relaxed mt-8 max-w-2xl">
                Șase direcții tehnologice pe care le integrăm la cheie.
                Fiecare poate fi implementată individual sau combinate
                într-un ecosistem complet Industry 4.0, cu un singur
                partener, un singur contract și un singur punct de contact.
              </p>
            </div>
          </div>
        </section>

        {/* 6 DIRECTION CARDS */}
        <section>
          <div className="container-x py-14 lg:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-200 border hairline">
                {DIRECTIONS.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/industry-4.0/${d.slug}`}
                    className="bg-white p-8 lg:p-10 group hover:bg-ink-50 transition flex flex-col"
                  >
                    {/* Animation */}
                    {ANIM_MAP[d.slug] && (() => {
                      const Anim = ANIM_MAP[d.slug];
                      return (
                        <div className="mb-6 border hairline overflow-hidden">
                          <Anim />
                        </div>
                      );
                    })()}
                    <div
                      className="text-[11px] uppercase tracking-[0.22em] mono font-bold mb-4"
                      style={{ color: d.accent }}
                    >
                      — {d.num}
                    </div>
                    <h2
                      className="serif text-2xl lg:text-[26px] text-ink-900 leading-[1.08] mb-2 group-hover:text-uzx-blue transition"
                      style={{ letterSpacing: "-0.025em" }}
                    >
                      {d.title}
                    </h2>
                    <p className="text-xs text-ink-500 italic mb-4">
                      {d.subtitle}
                    </p>
                    <p className="text-sm text-ink-600 leading-relaxed mb-6">
                      {d.description}
                    </p>
                    <ul className="space-y-2 mb-8 mt-auto">
                      {d.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-ink-700"
                        >
                          <span
                            className="shrink-0 mt-[5px] w-1.5 h-1.5"
                            style={{ background: d.accent }}
                          />
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div
                      className="inline-flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all"
                      style={{ color: d.accent }}
                    >
                      Află mai mult <span>›</span>
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
