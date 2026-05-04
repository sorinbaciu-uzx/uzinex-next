import Link from "next/link";
import { prisma } from "@/lib/db";
import { CONTENT_KEYS, KEY_LABELS } from "@/lib/content";
import { PRODUCTS } from "@/app/magazin/products";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let existing: { key: string; updatedAt: Date }[] = [];
  let dbError: string | null = null;
  let seoOptimizedCount = 0;
  try {
    existing = await prisma.contentBlock.findMany({
      select: { key: true, updatedAt: true },
    });
    seoOptimizedCount = existing.filter((r) =>
      r.key.startsWith("seo:product:")
    ).length;
  } catch (e) {
    dbError = (e as Error).message;
  }
  const map = new Map(existing.map((r) => [r.key, r.updatedAt]));

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <div className="text-[11px] uppercase tracking-[0.22em] text-uzx-orange font-mono mb-2">
          — Backend UZINEX
        </div>
        <h1 className="serif text-3xl text-ink-900">Administrare site</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">
          Gestionează conținutul, produsele și optimizarea SEO. Toate
          modificările se publică instant pe uzinex.ro.
        </p>
      </div>

      {dbError && (
        <div className="border border-red-300 bg-red-50 text-red-900 p-4 text-sm">
          <b>Eroare DB:</b> {dbError}
          <div className="mt-2 text-xs">
            Verifică <code>DATABASE_URL</code> în Vercel → Project Settings →
            Environment Variables, apoi rulează{" "}
            <code>npx prisma db push</code> și <code>npm run db:seed</code>.
          </div>
        </div>
      )}

      {/* QUICK ACTIONS — mari, vizibile, prioritate 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SEO OPTIMIZATION — FEATURED */}
        <Link
          href="/admin/seo"
          className="relative overflow-hidden bg-gradient-to-br from-uzx-blue to-purple-700 text-white p-6 hover:shadow-xl transition group"
        >
          <div
            className="absolute -top-px -right-px w-24 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(245,133,31,0.5) 50%)",
            }}
          />
          <div className="text-[10px] uppercase tracking-[0.22em] opacity-70 font-mono mb-3">
            ✨ Recomandat · editor complet + AI
          </div>
          <div className="serif text-2xl leading-tight">
            Editor produse
          </div>
          <p className="text-sm text-white/80 mt-2 leading-relaxed">
            Editează tot produsul — imagini (drag & drop), nume, categorii,
            descriere (paragrafe + tabele), fișă tehnică. Plus motor SEO cu
            22 verificări live, Claude Opus rewrite, SERP preview, analiză
            concurent.
          </p>
          <div className="flex items-center gap-4 mt-5 text-xs font-mono">
            <div>
              <div className="opacity-60 text-[10px]">PRODUSE</div>
              <div className="text-xl font-semibold">{PRODUCTS.length}</div>
            </div>
            <div>
              <div className="opacity-60 text-[10px]">OPTIMIZATE</div>
              <div className="text-xl font-semibold">{seoOptimizedCount}</div>
            </div>
            <div>
              <div className="opacity-60 text-[10px]">DE LUCRAT</div>
              <div className="text-xl font-semibold">
                {PRODUCTS.length - seoOptimizedCount}
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 right-5 text-3xl opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition">
            →
          </div>
        </Link>

        {/* NEWSROOM — INTERNAL CONTENT ENGINE */}
        <Link
          href="/admin/newsroom"
          className="relative overflow-hidden bg-gradient-to-br from-ink-900 to-uzx-blue text-white p-6 hover:shadow-xl transition group"
        >
          <div
            className="absolute -top-px -right-px w-24 h-24 pointer-events-none"
            style={{
              background:
                "linear-gradient(135deg, transparent 0%, transparent 50%, rgba(245,133,31,0.5) 50%)",
            }}
          />
          <div className="text-[10px] uppercase tracking-[0.22em] opacity-70 font-mono mb-3">
            Motor intern · știri/bloguri
          </div>
          <div className="serif text-2xl leading-tight">
            Newsroom — date oficiale
          </div>
          <p className="text-sm text-white/80 mt-2 leading-relaxed">
            Pipeline de agregare din 90+ surse oficiale (BNR, IMF, Eurostat,
            World Bank, USASpending, SAM.gov, ANAF, portal.just.ro). Insights
            algoritmice săptămânale + story-uri editoriale, ca tool intern
            de generare conținut.
          </p>
          <div className="absolute bottom-4 right-5 text-3xl opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition">
            →
          </div>
        </Link>

        {/* USERS */}
        <Link
          href="/admin/users"
          className="bg-white border hairline p-6 hover:bg-ink-50 transition group"
        >
          <div className="text-[10px] uppercase tracking-[0.22em] text-uzx-orange font-mono mb-3">
            Administrare · acces
          </div>
          <div className="serif text-2xl text-ink-900 leading-tight">
            Conturi clienți
          </div>
          <p className="text-sm text-ink-600 mt-2 leading-relaxed">
            Creează, modifică și dezactivează conturile care se pot
            autentifica pe site (cont.uzinex.ro).
          </p>
          <div className="text-3xl text-ink-300 mt-6 group-hover:text-uzx-blue group-hover:translate-x-1 transition inline-block">
            →
          </div>
        </Link>
      </div>

      {/* CONȚINUT EDITORIAL */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="serif text-xl text-ink-900">Conținut editorial</h2>
            <p className="text-xs text-ink-500 mt-1">
              Hero, authority strip, studii de caz, certificări, footer etc.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border hairline">
          {CONTENT_KEYS.map((key) => {
            const updated = map.get(key);
            return (
              <Link
                key={key}
                href={`/admin/content/${key}`}
                className="bg-white p-4 hover:bg-ink-50 transition flex items-center justify-between group"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono">
                    {key}
                  </div>
                  <div className="serif text-base text-ink-900 mt-1 truncate">
                    {KEY_LABELS[key] || key}
                  </div>
                  <div className="text-[11px] text-ink-500 mt-1">
                    {updated
                      ? `Actualizat ${new Date(updated).toLocaleDateString("ro-RO")}`
                      : "Valori implicite din cod"}
                  </div>
                </div>
                <span className="text-xl text-ink-300 group-hover:text-uzx-blue transition shrink-0">
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* STUDII DE CAZ · galerii foto */}
      <div>
        <h2 className="serif text-xl text-ink-900 mb-3">Studii de caz · galerii foto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border hairline">
          <Link
            href="/admin/studii-de-caz/camma"
            className="bg-white p-4 hover:bg-ink-50 transition flex items-center justify-between group"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono">
                case_camma_gallery
              </div>
              <div className="serif text-base text-ink-900 mt-1 truncate">
                CAMMA · galerie foto linie cărămidă modulară
              </div>
              <div className="text-[11px] text-ink-500 mt-1">
                6 sloturi · upload Vercel Blob · sedctiunea 06 a paginii publice
              </div>
            </div>
            <span className="text-xl text-ink-300 group-hover:text-uzx-blue transition shrink-0">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* SHORTCUTS */}
      <div>
        <h2 className="serif text-xl text-ink-900 mb-3">Linkuri rapide</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-200 border hairline">
          <ShortcutCard
            href="/"
            label="Website"
            sub="uzinex.ro"
            external
          />
          <ShortcutCard
            href="https://vercel.com/sorinbaciu-3691s-projects/uzinex-next"
            label="Vercel"
            sub="deploys + env vars"
            external
          />
          <ShortcutCard
            href="https://search.google.com/search-console"
            label="Google SC"
            sub="indexare + search"
            external
          />
          <ShortcutCard
            href="https://www.bing.com/webmasters"
            label="Bing WMT"
            sub="indexare Bing"
            external
          />
        </div>
      </div>
    </div>
  );
}

function ShortcutCard({
  href,
  label,
  sub,
  external,
}: {
  href: string;
  label: string;
  sub: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="bg-white p-4 hover:bg-ink-50 transition group"
    >
      <div className="text-[11px] uppercase tracking-wider text-ink-400 font-mono">
        {sub}
      </div>
      <div className="serif text-lg text-ink-900 mt-1 flex items-center gap-2">
        {label}
        {external && <span className="text-xs text-ink-400">↗</span>}
      </div>
    </a>
  );
}
