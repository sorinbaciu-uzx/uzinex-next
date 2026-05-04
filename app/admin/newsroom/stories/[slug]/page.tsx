import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StoryCharts } from "@/components/newsroom/StoryCharts";
import { CopyButton } from "@/components/newsroom/CopyButton";
import { renderMarkdown } from "@/lib/newsroom/markdown";
import { loadStory, loadStories } from "@/lib/newsroom/data";

export const revalidate = 3600;

export async function generateStaticParams() {
  return loadStories().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const story = loadStory(slug);
  if (!story) return { title: "Story not found" };
  return {
    title: story.title,
    description: story.subtitle || "Story Newsroom UZINEX cu cifre din surse oficiale.",
    alternates: { canonical: `/newsroom/stories/${story.slug}` },
    openGraph: {
      title: story.title,
      description: story.subtitle || "",
      type: "article",
      publishedTime: new Date(story.createdAt).toISOString(),
    },
  };
}

export default async function StoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const story = loadStory(slug);
  if (!story) notFound();

  const created = new Date(story.createdAt);
  const created_pretty = created.toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
  const wordCount = story.body.split(/\s+/).filter(Boolean).length;
  const readingMin = Math.max(1, Math.round(wordCount / 200));

  const canonicalUrl = `/newsroom/stories/${story.slug}`;
  const fullUrl = `https://uzinex.ro${canonicalUrl}`;
  const citationApa = `UZINEX Newsroom (${created.getFullYear()}). ${story.title}. Newsroom UZINEX. ${fullUrl}`;
  const citationHtml = `<a href="${fullUrl}" target="_blank" rel="noopener">Sursă: UZINEX Newsroom — ${story.title}</a>`;
  const citationMd = `[Sursă: UZINEX Newsroom — ${story.title}](${fullUrl})`;
  const citationShort = `(Sursă: UZINEX Newsroom, ${created_pretty})`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: story.title,
    description: story.subtitle,
    datePublished: created.toISOString(),
    dateModified: created.toISOString(),
    author: { "@type": "Organization", name: "UZINEX Newsroom", url: "https://uzinex.ro/newsroom" },
    publisher: {
      "@type": "Organization",
      name: "UZINEX SC GW LASER TECHNOLOGY SRL",
      url: "https://uzinex.ro",
      logo: { "@type": "ImageObject", url: "https://uzinex.ro/logo.svg" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
  };

  return (
    <>
      <Header solid />
      <main className="container-x py-10 md:py-14">
        <article className="max-w-3xl mx-auto pb-20">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

          <Link href="/newsroom" className="text-sm text-ink-500 hover:text-uzx-orange transition-colors">← Toate story-urile</Link>

          {/* HEADER */}
          <header className="mt-8 mb-10">
            <div className="flex items-center gap-3 mb-5 text-xs uppercase tracking-widest font-medium">
              <span className="px-2 py-1 rounded bg-uzx-orange text-white">Publicat</span>
              <span className="text-ink-400 num">{created_pretty}</span>
              <span className="text-ink-300">·</span>
              <span className="text-ink-400">{readingMin} min citire</span>
            </div>

            <div className="flex items-start gap-3">
              <h1 className="serif text-4xl md:text-5xl leading-[1.05] tracking-tight text-ink-900 flex-1">{story.title}</h1>
              <div className="pt-2"><CopyButton value={story.title} variant="icon" label="Copiază titlul" /></div>
            </div>

            {story.subtitle && <p className="text-xl text-ink-600 leading-relaxed mt-5">{story.subtitle}</p>}
          </header>

          {/* HERO BIG NUMBER */}
          {story.bigNumber && (
            <section className="border-y border-ink-100 py-12 mb-10 text-center">
              <div className="serif text-7xl md:text-9xl text-uzx-orange leading-none num">{story.bigNumber}</div>
              {story.bigNumberLabel && <div className="mt-4 text-ink-500 text-xs uppercase tracking-widest">{story.bigNumberLabel}</div>}
            </section>
          )}

          {/* ACTION BAR */}
          <section className="mb-10 flex flex-wrap gap-2 items-center">
            <a
              href={`/api/newsroom/stories/${story.slug}/press-kit`}
              download
              className="inline-flex items-center gap-2 bg-uzx-orange text-white px-4 py-2 rounded text-sm font-medium hover:bg-uzx-orange2 transition-colors"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Press Kit (ZIP)
            </a>
            <CopyButton value={story.title} label="Copiază titlul" />
            <CopyButton value={citationHtml} label="Copiază HTML citare" />
            <CopyButton value={citationApa} label="Copiază APA" />
          </section>

          {/* TL;DR */}
          {story.tldr.length > 0 && (
            <section className="bg-ink-50 border-l-4 border-uzx-blue rounded-r-lg p-6 mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="serif text-lg tracking-tight text-ink-900">TL;DR pentru jurnaliști</h2>
                <CopyButton value={story.tldr.map((b) => `• ${b}`).join("\n")} label="Copiază bullets" variant="inline" />
              </div>
              <ul className="space-y-2.5 text-[15px] text-ink-800">
                {story.tldr.map((b, i) => (
                  <li key={i} className="flex gap-3"><span className="text-uzx-orange font-bold leading-tight pt-0.5">→</span><span>{b}</span></li>
                ))}
              </ul>
            </section>
          )}

          {/* MAIN CHART */}
          {story.chartData[0] && (
            <section className="mb-12">
              <div className="relative">
                <StoryCharts data={[story.chartData[0]]} />
                <div className="absolute bottom-2 right-3 text-[10px] mono text-ink-300 select-none pointer-events-none">uzinex.ro/newsroom</div>
              </div>
            </section>
          )}

          {/* BODY */}
          <div className="prose-newsroom mb-14" dangerouslySetInnerHTML={{ __html: renderMarkdown(story.body) }} />

          {/* QUOTE */}
          {story.quoteSorin && (
            <section className="mb-14 border-t border-ink-100 pt-10">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-2">Citat citabil</h2>
              <p className="text-sm text-ink-500 mb-6">Atribuire completă inclusă. Click pe „Copiază" pentru text + atribuire gata de paste în articol.</p>
              <QuoteBlock author="Sorin Baciu" role="Director General UZINEX SC GW LASER TECHNOLOGY SRL" quote={story.quoteSorin} />
            </section>
          )}

          {/* SUPPLEMENTARY CHARTS */}
          {story.chartData.length > 1 && (
            <section className="mb-14 border-t border-ink-100 pt-10">
              <h2 className="serif text-2xl tracking-tight text-ink-900 mb-5">Grafice suplimentare</h2>
              <div className="relative">
                <StoryCharts data={story.chartData.slice(1)} />
                <div className="absolute bottom-2 right-3 text-[10px] mono text-ink-300 select-none pointer-events-none">uzinex.ro/newsroom</div>
              </div>
            </section>
          )}

          {/* DATE BRUTE */}
          <section className="mb-14 border-t border-ink-100 pt-10">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Date brute pentru verificare</h2>
            <p className="text-sm text-ink-500 mb-5">Pentru jurnaliștii data-driven (Recorder, PressOne, RISE) — verifică tu însuți cifrele.</p>
            <div className="flex flex-wrap gap-3">
              <a href={`/api/newsroom/stories/${story.slug}/press-kit`} className="inline-flex items-center gap-2 px-4 py-2 border border-ink-200 hover:border-uzx-blue rounded text-sm transition-colors">
                📦 Press Kit complet (.zip)
              </a>
            </div>
          </section>

          {/* CITATIONS */}
          <section className="mb-14 border-t border-ink-100 pt-10">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-5">Citare oficială</h2>
            <div className="space-y-3">
              <CitationRow label="HTML (pentru articol web — cel mai folosit)" value={citationHtml} highlight />
              <CitationRow label="APA Style" value={citationApa} />
              <CitationRow label="Markdown" value={citationMd} />
              <CitationRow label="Text scurt în paranteze" value={citationShort} />
            </div>
          </section>

          {/* METHODOLOGY */}
          <section className="mb-14 border-t border-ink-100 pt-10">
            <h2 className="serif text-2xl tracking-tight text-ink-900 mb-3">Metodologie & surse</h2>
            <div className="text-[15px] text-ink-700 leading-relaxed space-y-3">
              {story.methodology ? (
                <p>{story.methodology}</p>
              ) : (
                <p>
                  Articolul a fost generat din insight-uri produse automat de pipeline-ul Newsroom UZINEX, care colectează date din 90+ surse oficiale. Fiecare cifră citată provine direct din endpoint-urile oficiale ale instituțiilor menționate (BNR, Eurostat, World Bank, ECB, TED Europa, SAM.gov etc.) — nu există valori interpolate sau estimate.
                </p>
              )}
              <p className="mono text-xs text-ink-400">Insight IDs: [{story.insightIds.join(", ")}]</p>
            </div>
          </section>

          {/* CONTACT */}
          <section className="bg-ink-900 text-white rounded-lg p-7 mb-8">
            <h2 className="serif text-2xl tracking-tight mb-2">Contact pentru presă</h2>
            <p className="text-sm text-white/70 mb-6">Disponibil pentru interviu telefonic, TV sau podcast în maxim 24h.</p>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="bg-white/5 border border-white/10 rounded p-4">
                <div className="font-medium text-base">Sorin Baciu</div>
                <div className="text-white/60 text-xs mt-0.5">Director General UZINEX</div>
                <a href="mailto:sorin.baciu@uzinex.ro" className="block mt-3 text-uzx-orange hover:underline">sorin.baciu@uzinex.ro</a>
              </div>
              <div className="bg-white/5 border border-white/10 rounded p-4">
                <div className="font-medium text-base">Birou de presă UZINEX</div>
                <div className="text-white/60 text-xs mt-0.5">Telefon central</div>
                <a href="tel:+40769081081" className="block mt-3 text-uzx-orange hover:underline">+40 769 081 081</a>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="mailto:sorin.baciu@uzinex.ro?subject=Cerere%20interviu%20-%20Newsroom%20UZINEX" className="bg-uzx-orange text-white px-4 py-2 rounded text-sm font-medium hover:bg-uzx-orange2 transition-colors">
                Trimite email pentru interviu
              </a>
              <CopyButton value="sorin.baciu@uzinex.ro" label="Copiază email" className="!bg-white/5 !border-white/15 !text-white hover:!bg-white/10" />
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

function QuoteBlock({ author, role, quote }: { author: string; role: string; quote: string }) {
  const fullCopy = `"${quote}"\n\n— ${author}, ${role}`;
  return (
    <div className="border-l-4 border-uzx-orange pl-6 py-2">
      <p className="serif text-xl italic text-ink-800 mb-3 leading-snug">"{quote}"</p>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <footer className="text-sm text-ink-500">— <strong className="text-ink-900 font-medium">{author}</strong>, {role}</footer>
        <CopyButton value={fullCopy} label="Copiază quote + atribuire" />
      </div>
    </div>
  );
}

function CitationRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`border rounded-md p-4 ${highlight ? "border-uzx-orange/40 bg-uzx-orange/5" : "border-ink-100 bg-white"}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-xs uppercase tracking-widest text-ink-500 font-medium">{label}</div>
        <CopyButton value={value} label="Copiază" />
      </div>
      <code className="mono text-xs break-all whitespace-pre-wrap leading-relaxed text-ink-700">{value}</code>
    </div>
  );
}
