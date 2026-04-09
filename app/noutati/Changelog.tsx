import Link from "next/link";
import type { ChangelogData } from "@/components/NewsSection";

export function Changelog({ data }: { data: ChangelogData }) {
  if (!data || !data.entries || data.entries.length === 0) return null;

  return (
    <section className="border-t hairline">
      <div className="container-x py-14 lg:py-20">
        <div className="max-w-6xl mx-auto lg:pr-[340px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* LEFT */}
            <div className="lg:col-span-4">
              <h2
                className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-2"
                style={{ letterSpacing: "-0.025em" }}
              >
                {data.title}
              </h2>
              <div className="text-xs mono text-ink-400 mb-5">{data.date}</div>
              <Link
                href={data.href || "#"}
                className="inline-flex items-center gap-2 text-sm text-uzx-blue font-medium hover:gap-3 transition-all"
              >
                Toate actualizările <span>›</span>
              </Link>
            </div>

            {/* RIGHT */}
            <div className="lg:col-span-8">
              <div className="divide-y divide-ink-200 divide-dashed">
                {data.entries.map((e, i) => (
                  <div
                    key={i}
                    className="py-5 grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 items-start"
                  >
                    <div>
                      <span className="inline-block text-[10px] uppercase tracking-widest mono font-bold text-uzx-blue bg-uzx-blue/10 px-2 py-1">
                        {e.category}
                      </span>
                    </div>
                    <div className="text-sm text-ink-700 leading-relaxed">
                      {e.text}
                      {e.href && (
                        <>
                          {" "}
                          <Link
                            href={e.href}
                            className="text-uzx-blue font-medium hover:underline inline-flex items-center gap-1"
                          >
                            Detalii <span>›</span>
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
