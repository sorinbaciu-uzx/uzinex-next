import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AIManualMockup } from "@/components/AIManualMockup";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Manual de service cu AI — Uzinex",
  description:
    "Manuale interactive cu inteligență artificială pentru fiecare echipament livrat de Uzinex: limbaj natural, comandă vocală, recunoaștere prin imagini, disponibil offline 24/7.",
};

const FEATURES = [
  {
    num: "01",
    title: "Limbaj natural",
    body: "Pune întrebări în română sau engleză, exact cum ai vorbi cu un coleg tehnic. Fără a cunoaște termeni specifici sau pagini din manual.",
  },
  {
    num: "02",
    title: "Comandă vocală hands-free",
    body: "Operatorul poate vorbi direct cu manualul când are mâinile ocupate sau poartă mănuși. AI-ul transcrie întrebarea, răspunde audio și confirmă acțiunile prin voce.",
  },
  {
    num: "03",
    title: "Recunoaștere prin imagini",
    body: "Fotografiezi o piesă, un cod de eroare de pe display sau o componentă necunoscută — manualul AI o identifică instant, îți spune codul SKU, compatibilitatea și locul montării.",
  },
  {
    num: "04",
    title: "Contextual pe echipament",
    body: "AI-ul cunoaște exact modelul, configurația și istoricul echipamentului tău. Răspunde cu referință directă la specificațiile reale, nu la șabloane generice.",
  },
  {
    num: "05",
    title: "Proceduri pas-cu-pas",
    body: "Ghiduri clare pentru punere în funcțiune, parametrizare, mentenanță preventivă, troubleshooting și situații de urgență — toate în format acționabil.",
  },
  {
    num: "06",
    title: "Training rapid pentru operatori",
    body: "Reduce timpul de onboarding al noilor operatori cu până la 70%. Echipa învață direct din echipament, fără sesiuni lungi de training clasic.",
  },
  {
    num: "07",
    title: "Reduce eroarea umană",
    body: "Verifică parametrii înainte de operare, previne configurații greșite și alertează automat pentru situațiile critice de siguranță.",
  },
  {
    num: "08",
    title: "Disponibil 24/7, offline",
    body: "Rulează local pe echipament sau pe tablete industriale, fără dependență de internet. Accesibil oricând, chiar și în locații izolate sau clasificate.",
  },
  {
    num: "09",
    title: "Istoricul intervențiilor",
    body: "Toate interacțiunile și intervențiile sunt jurnalizate automat, pentru auditare, raportare DNSH și urmărirea conformității cu procedurile.",
  },
  {
    num: "10",
    title: "Actualizări permanente",
    body: "Baza de cunoștințe se actualizează automat cu noi proceduri, patch-uri de siguranță și soluții de la comunitatea de operatori Uzinex.",
  },
];

export default function ServiceManualAIPage() {
  return (
    <>
      <Header solid />
      <main className="bg-white border-b hairline">
        {/* HEADER */}
        <section className="bg-ink-50 border-b hairline">
          <div className="container-x py-12 lg:py-16">
            <div className="max-w-6xl mx-auto">
              <nav className="flex items-center gap-1.5 text-[10px] mono uppercase tracking-wider text-ink-400 mb-6">
                <Link href="/" className="hover:text-uzx-blue transition">
                  Acasă
                </Link>
                <span className="text-ink-300">/</span>
                <Link href="/service" className="hover:text-uzx-blue transition">
                  Service
                </Link>
                <span className="text-ink-300">/</span>
                <span className="text-ink-700">Manual AI</span>
              </nav>
              <div className="text-[11px] uppercase tracking-[0.25em] text-uzx-orange mb-4 mono">
                03 / Inovație exclusivă
              </div>
              <h1
                className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95] max-w-3xl"
                style={{ letterSpacing: "-0.03em" }}
              >
                Manual de service{" "}
                <span className="font-light italic text-uzx-orange">
                  cu inteligență artificială.
                </span>
              </h1>
              <p className="text-ink-500 text-base lg:text-lg leading-relaxed mt-8 max-w-2xl">
                Fiecare echipament livrat de Uzinex vine însoțit de un manual
                digital interactiv. Operatorii pun întrebări în limbaj natural,
                vocal sau prin imagini și primesc răspunsuri precise,
                contextualizate, cu instrucțiuni pas-cu-pas adaptate
                echipamentului lor specific. Disponibil offline, 24/7.
              </p>
            </div>
          </div>
        </section>

        {/* MOCKUP + features */}
        <section className="border-b hairline py-16 lg:py-24 bg-white overflow-hidden">
          <div className="container-x">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <AIManualMockup />

              <div className="lg:col-span-6 lg:col-start-7">
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                  — 10 capabilități
                </div>
                <h2
                  className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-6"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  Manuale interactive cu
                  <br />
                  <span className="font-light text-uzx-orange">
                    inteligență artificială.
                  </span>
                </h2>
                <p className="text-ink-600 leading-relaxed text-base mb-10 max-w-xl">
                  În loc să cauți manual zeci de pagini de documentație
                  tehnică, operatorii pot pune întrebări în limbaj natural și
                  primesc răspunsuri precise, contextualizate.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-200 border-y border-ink-200">
                  {FEATURES.map((b) => (
                    <div key={b.num} className="bg-white p-6">
                      <div className="text-[11px] mono text-uzx-blue mb-2">
                        {b.num}
                      </div>
                      <h3
                        className="serif text-base text-ink-900 mb-2 leading-tight"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {b.title}
                      </h3>
                      <p className="text-xs text-ink-500 leading-relaxed">
                        {b.body}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-8 p-5 border border-uzx-blue/30 flex items-start gap-4"
                  style={{ background: "rgba(30,107,184,0.04)" }}
                >
                  <div className="text-2xl text-uzx-blue shrink-0">⚡</div>
                  <div>
                    <div className="text-sm font-medium text-ink-900 mb-1">
                      Inclus gratuit cu orice echipament livrat
                    </div>
                    <p className="text-xs text-ink-600 leading-relaxed">
                      Manualul AI este parte integrantă din fiecare livrare
                      Uzinex, fără cost suplimentar. Nu există abonamente,
                      licențe ascunse sau limitări de utilizare — o dată primit
                      echipamentul, asistentul tehnic este al tău.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Commission AI manual for any equipment */}
        <section className="border-b hairline py-16 lg:py-20 bg-white">
          <div className="container-x">
            <div className="max-w-6xl mx-auto">
              <div
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-8 lg:p-12 text-white relative overflow-hidden"
                style={{ background: "#082545" }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-20"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 80% at 90% 50%, #1e6bb8 0%, transparent 60%)",
                  }}
                />
                <div
                  className="absolute -top-px -right-px w-20 h-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(245,133,31,0.5) 50%)",
                  }}
                />

                <div className="lg:col-span-7 relative">
                  <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                    — Serviciu disponibil separat
                  </div>
                  <h3
                    className="serif text-2xl md:text-3xl lg:text-4xl leading-[0.95] mb-5"
                    style={{ letterSpacing: "-0.03em" }}
                  >
                    Ai cumpărat echipamentul
                    <br />
                    de la altcineva?{" "}
                    <span className="font-light text-uzx-orange">
                      Îți construim noi manualul AI.
                    </span>
                  </h3>
                  <p className="text-ink-200 text-base leading-relaxed max-w-2xl">
                    Chiar dacă echipamentul tău nu a fost achiziționat prin
                    Uzinex, îți putem dezvolta un manual interactiv cu
                    inteligență artificială contra cost — personalizat pe
                    modelul, configurația și procedurile tale interne. Lucrăm
                    pe orice tip de utilaj industrial, indiferent de brand sau
                    vechime.
                  </p>

                  <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-ink-200">
                    <li className="flex gap-3">
                      <span className="text-uzx-orange shrink-0">→</span>
                      <span>Analiză tehnică și culegere documentație existentă</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-uzx-orange shrink-0">→</span>
                      <span>Antrenare model AI pe specificul utilajului tău</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-uzx-orange shrink-0">→</span>
                      <span>Instalare locală (offline) sau cloud securizat</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-uzx-orange shrink-0">→</span>
                      <span>Training pentru operatori & suport post-livrare</span>
                    </li>
                  </ul>
                </div>

                <div className="lg:col-span-5 relative flex flex-col justify-between gap-6">
                  <div className="border border-white/15 p-6">
                    <div className="text-[10px] mono text-white/50 uppercase tracking-widest mb-3">
                      Preț pornind de la
                    </div>
                    <div
                      className="serif text-4xl lg:text-5xl text-white num mb-2"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      la cerere
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      Costul final depinde de complexitatea echipamentului,
                      volumul documentației existente și cerințele de
                      integrare. Îți trimitem o ofertă personalizată după o
                      analiză inițială gratuită.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a
                      href="#contact"
                      className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-sm px-6 py-4 transition flex items-center justify-center gap-3 group font-medium"
                    >
                      Solicită ofertă pentru manual AI
                      <span className="group-hover:translate-x-1 transition">→</span>
                    </a>
                    <a
                      href="mailto:info@uzinex.ro?subject=Manual AI pentru echipament existent"
                      className="text-xs text-white/80 hover:text-white text-center underline-link transition"
                    >
                      sau scrie-ne la info@uzinex.ro
                    </a>
                  </div>
                </div>
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
