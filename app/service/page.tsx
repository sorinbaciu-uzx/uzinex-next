import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceGrid } from "@/components/ServiceGrid";
import { ServiceSubscriptions } from "@/components/ServiceSubscriptions";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "Service tehnic & mentenanță — Uzinex",
  description:
    "Centre de service naționale Uzinex — suport 24/7, intervenție la fața locului sub 24 ore, livrare piese de schimb în 5 zile, training complet pentru operatori.",
};

export default function ServicePage() {
  return (
    <>
      <Header />

      {/* Hero simplu */}
      <section
        className="relative overflow-hidden border-b text-white -mt-[140px] pt-[160px] pb-20 lg:pb-24"
        style={{ background: "#082545", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 90% at 80% 45%, #2d7dc9 0%, #1e6bb8 15%, #155290 30%, #0e3866 50%, #082545 75%, #051a33 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,37,69,0.92) 0%, rgba(8,37,69,0.55) 40%, rgba(8,37,69,0.15) 70%, rgba(8,37,69,0) 100%)",
          }}
        />

        <div className="container-x relative z-10">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-white/70 hover:text-white transition mb-10"
          >
            <span>←</span> Înapoi la pagina principală
          </a>
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/70 mb-6 mono">
            <span className="w-8 h-px bg-white/40" />
            <span>Service & mentenanță · Suport 100% local</span>
          </div>
          <h1
            className="serif text-4xl md:text-5xl lg:text-6xl font-medium leading-[0.95] text-white max-w-3xl"
            style={{ letterSpacing: "-0.03em" }}
          >
            Service tehnic și<br />
            <span className="font-light text-uzx-orange">mentenanță preventivă.</span>
          </h1>
          <p className="text-base lg:text-lg text-ink-200 max-w-2xl mt-6 leading-relaxed">
            Indiferent cât de performante sunt echipamentele livrate, succesul unui proiect industrial depinde
            de calitatea service-ului post-vânzare. Uzinex asigură un ecosistem complet de suport tehnic,
            intervenție rapidă, mentenanță preventivă și piese de schimb — totul la standarde europene, 100% local.
          </p>
        </div>
      </section>

      {/* Service grid */}
      <ServiceGrid />

      {/* AI Manuals section */}
      <section className="border-b hairline py-16 lg:py-24 bg-white overflow-hidden">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT — stylized AI assistant mockup */}
          <div className="lg:col-span-5">
            <div
              className="relative border hairline p-8 lg:p-10"
              style={{ background: "linear-gradient(180deg, #0a1a2e 0%, #082545 100%)" }}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-white/10">
                <div className="w-2.5 h-2.5 rounded-full bg-uzx-orange" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/15" />
                <div className="ml-3 text-[10px] mono uppercase tracking-widest text-white/50">
                  UZX Manual Assistant
                </div>
              </div>

              {/* Chat */}
              <div className="space-y-5">
                <div>
                  <div className="text-[10px] mono text-uzx-orange mb-2">OPERATOR</div>
                  <div className="text-sm text-white/90 leading-relaxed">
                    Cum resetez parametrii pentru tăiere inox 5 mm pe UZX-Laser F12?
                  </div>
                </div>

                <div className="border-t border-white/10 pt-5">
                  <div className="text-[10px] mono text-uzx-blue mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-uzx-blue animate-pulse" />
                    UZX AI · MANUAL TEHNIC
                  </div>
                  <div className="text-sm text-white/80 leading-relaxed">
                    Pentru tăiere inox 5 mm, setează puterea laser la 2400 W, presiune azot 18 bar,
                    viteza 2.8 m/min. Urmează acești pași:
                  </div>
                  <div className="mt-3 space-y-1.5 text-[11px] mono text-white/60">
                    <div>→ Meniu → Parametri material → Stainless 5mm</div>
                    <div>→ Încarcă preset UZX-INX-05</div>
                    <div>→ Verifică focus la +1.2 mm</div>
                    <div>→ Test cut pe probă înainte producție</div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className="flex-1 h-9 border border-white/15 px-3 flex items-center text-[11px] mono text-white/30">
                  Pune o întrebare tehnică…
                </div>
                <div className="w-9 h-9 bg-uzx-orange flex items-center justify-center text-white">
                  →
                </div>
              </div>

              {/* Decorative */}
              <div
                className="absolute -top-px -right-px w-16 h-16 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(245,133,31,0.4) 50%)",
                }}
              />
            </div>
            <div className="text-center mt-4 text-[10px] mono uppercase tracking-widest text-ink-400">
              — Mockup interfață assistant AI integrat în manual
            </div>
          </div>

          {/* RIGHT — content */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
              — Inovație exclusivă
            </div>
            <h2
              className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Manuale interactive cu<br />
              <span className="font-light text-uzx-orange">inteligență artificială.</span>
            </h2>
            <p className="text-ink-600 leading-relaxed text-base mb-10 max-w-xl">
              Fiecare echipament livrat de Uzinex vine însoțit de un manual digital interactiv, bazat pe
              inteligență artificială. În loc să cauți manual zeci de pagini de documentație tehnică,
              operatorii pot pune întrebări în limbaj natural și primesc răspunsuri precise, contextualizate,
              cu instrucțiuni pas-cu-pas adaptate echipamentului lor specific.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-ink-200 border-y border-ink-200">
              {[
                {
                  num: "01",
                  title: "Limbaj natural",
                  body: "Pune întrebări în română sau engleză, exact cum ai vorbi cu un coleg tehnic. Fără a cunoaște termeni specifici sau pagini din manual.",
                },
                {
                  num: "02",
                  title: "Contextual pe echipament",
                  body: "AI-ul cunoaște exact modelul, configurația și istoricul echipamentului tău. Răspunde cu referință directă la specificațiile reale, nu la șabloane generice.",
                },
                {
                  num: "03",
                  title: "Proceduri pas-cu-pas",
                  body: "Ghiduri clare pentru punere în funcțiune, parametrizare, mentenanță preventivă, troubleshooting și situații de urgență — toate în format acționabil.",
                },
                {
                  num: "04",
                  title: "Training rapid pentru operatori",
                  body: "Reduce timpul de onboarding al noilor operatori cu până la 70%. Echipa învață direct din echipament, fără sesiuni lungi de training clasic.",
                },
                {
                  num: "05",
                  title: "Reduce eroarea umană",
                  body: "Verifică parametrii înainte de operare, previne configurații greșite și alertează automat pentru situațiile critice de siguranță.",
                },
                {
                  num: "06",
                  title: "Disponibil 24/7, offline",
                  body: "Rulează local pe echipament sau pe tablete industriale, fără dependență de internet. Accesibil oricând, chiar și în locații izolate sau clasificate.",
                },
                {
                  num: "07",
                  title: "Istoricul intervențiilor",
                  body: "Toate interacțiunile și intervențiile sunt jurnalizate automat, pentru auditare, raportare DNSH și urmărirea conformității cu procedurile.",
                },
                {
                  num: "08",
                  title: "Actualizări permanente",
                  body: "Baza de cunoștințe se actualizează automat cu noi proceduri, patch-uri de siguranță și soluții de la comunitatea de operatori Uzinex.",
                },
              ].map((b) => (
                <div key={b.num} className="bg-white p-6">
                  <div className="text-[11px] mono text-uzx-blue mb-2">{b.num}</div>
                  <h3
                    className="serif text-base text-ink-900 mb-2 leading-tight"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {b.title}
                  </h3>
                  <p className="text-xs text-ink-500 leading-relaxed">{b.body}</p>
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
                  Manualul AI este parte integrantă din fiecare livrare Uzinex, fără cost suplimentar. Nu
                  există abonamente, licențe ascunse sau limitări de utilizare — o dată primit echipamentul,
                  asistentul tehnic este al tău.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Commission AI manual for any equipment */}
        <div className="container-x mt-16 lg:mt-20">
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
                Ai cumpărat echipamentul<br />
                de la altcineva?{" "}
                <span className="font-light text-uzx-orange">
                  Îți construim noi manualul AI.
                </span>
              </h3>
              <p className="text-ink-200 text-base leading-relaxed max-w-2xl">
                Chiar dacă echipamentul tău nu a fost achiziționat prin Uzinex, îți putem dezvolta un manual
                interactiv cu inteligență artificială contra cost — personalizat pe modelul, configurația și
                procedurile tale interne. Lucrăm pe orice tip de utilaj industrial, indiferent de brand sau
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
                  Pret pornind de la
                </div>
                <div
                  className="serif text-4xl lg:text-5xl text-white num mb-2"
                  style={{ letterSpacing: "-0.03em" }}
                >
                  la cerere
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  Costul final depinde de complexitatea echipamentului, volumul documentației existente și
                  cerințele de integrare. Îți trimitem o ofertă personalizată după o analiză inițială
                  gratuită.
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
      </section>

      {/* Details section */}
      <section className="border-b hairline py-16 lg:py-20 bg-white">
        <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
              — Abordarea noastră
            </div>
            <h2
              className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95] mb-6"
              style={{ letterSpacing: "-0.03em" }}
            >
              Un singur partener<br />
              <span className="font-light text-uzx-orange">pentru tot ciclul de viață.</span>
            </h2>
            <p className="text-ink-500 leading-relaxed">
              Uzinex nu este doar un furnizor de echipamente — suntem integrator industrial complet. Asta
              înseamnă că îți preluăm proiectul din faza de analiză tehnică și te însoțim până la scoaterea
              din uz a echipamentului, cu aceeași echipă, aceleași standarde și aceeași responsabilitate.
            </p>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border-y border-ink-200">
              {[
                {
                  num: "01",
                  title: "Punere în funcțiune",
                  body: "Instalare, configurare, teste SAT, integrare cu infrastructura existentă și training inițial al operatorilor.",
                },
                {
                  num: "02",
                  title: "Mentenanță preventivă",
                  body: "Planuri personalizate de revizie, verificare periodică, înlocuire componente consumabile și rapoarte tehnice.",
                },
                {
                  num: "03",
                  title: "Intervenții rapide",
                  body: "Diagnoză remote 24/7, deplasare la fața locului sub 24 de ore, reparații în garanție și post-garanție.",
                },
                {
                  num: "04",
                  title: "Upgrade & retrofitting",
                  body: "Modernizarea echipamentelor existente cu componente noi, actualizări software și extinderi de funcționalitate.",
                },
              ].map((s) => (
                <div key={s.num} className="bg-white p-8">
                  <div className="text-[11px] mono text-ink-400 mb-4">{s.num}</div>
                  <h3
                    className="serif text-lg text-ink-900 mb-3 leading-tight"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-sm text-ink-500 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SLA strip */}
      <section className="border-b hairline py-14 bg-ink-50">
        <div className="container-x">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x hairline">
            <div className="py-4 px-4 lg:px-8">
              <div className="serif text-4xl lg:text-5xl text-uzx-blue num">60</div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                Luni garanție standard
              </div>
            </div>
            <div className="py-4 px-4 lg:px-8">
              <div className="serif text-4xl lg:text-5xl text-uzx-blue num">24h</div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                Intervenție fizică națională
              </div>
            </div>
            <div className="py-4 px-4 lg:px-8">
              <div className="serif text-4xl lg:text-5xl text-uzx-blue num">30 min</div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                Răspuns la tichet
              </div>
            </div>
            <div className="py-4 px-4 lg:px-8">
              <div className="serif text-4xl lg:text-5xl text-uzx-blue num">100%</div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-3">
                Piese originale OEM
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceSubscriptions />
      <ContactCTA />
      <Footer />
    </>
  );
}
