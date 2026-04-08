import { Header } from "./Header";
import { Footer } from "./Footer";

type Section = { title: string; body: string | string[] };

export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <>
      <Header />
      <main className="bg-white border-b hairline">
        <div className="container-x py-16 lg:py-24 max-w-4xl mx-auto">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-10"
          >
            <span>←</span> Înapoi la pagina principală
          </a>
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-4 mono">
            Document legal
          </div>
          <h1
            className="serif text-4xl md:text-5xl lg:text-6xl text-ink-900 leading-[0.95] mb-6"
            style={{ letterSpacing: "-0.03em" }}
          >
            {title}
          </h1>
          <div className="text-xs mono text-ink-500 pb-10 border-b hairline">
            Ultima actualizare: {updated} · GW LASER TECHNOLOGY S.R.L. · CUI RO 49240731
          </div>

          <div className="mt-12 space-y-10">
            {sections.map((s, i) => (
              <section key={i}>
                <div className="text-[11px] mono text-ink-400 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h2
                  className="serif text-2xl lg:text-3xl text-ink-900 mb-4 leading-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {s.title}
                </h2>
                {Array.isArray(s.body) ? (
                  <ul className="space-y-2 text-ink-700 leading-relaxed">
                    {s.body.map((item, j) => (
                      <li key={j} className="flex gap-3">
                        <span className="text-ink-300 num shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-ink-700 leading-relaxed">{s.body}</p>
                )}
              </section>
            ))}
          </div>

          <div className="mt-16 pt-10 border-t hairline text-sm text-ink-500">
            Pentru întrebări sau solicitări referitoare la acest document, ne poți contacta la{" "}
            <a href="mailto:info@uzinex.ro" className="text-uzx-blue hover:text-uzx-blue2 underline-link">
              info@uzinex.ro
            </a>{" "}
            sau la telefon{" "}
            <a href="tel:+40769081081" className="text-uzx-blue hover:text-uzx-blue2 underline-link">
              (+40) 769 081 081
            </a>
            .
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
