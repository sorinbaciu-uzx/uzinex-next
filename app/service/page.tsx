import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ServiceGrid } from "@/components/ServiceGrid";
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

      <ContactCTA />
      <Footer />
    </>
  );
}
