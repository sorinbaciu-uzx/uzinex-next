type SpecRow = [string, string];

export function SpecsSection({
  rows,
  ctaTitle,
  ctaSubtitle,
  phone = "+40 769 081 081",
  email = "contact@uzinex.ro",
  productName,
  productSku,
}: {
  rows: SpecRow[];
  ctaTitle: string;
  ctaSubtitle: string;
  phone?: string;
  email?: string;
  productName: string;
  productSku: string;
}) {
  const waMsg = `Salut! Sunt interesat de ${productName} (cod ${productSku}). Puteți să-mi trimiteți mai multe detalii?`;
  const waUrl = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(waMsg)}`;
  const phoneClean = phone.replace(/\s/g, "");

  if (rows.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-ink-50/50 border-b border-ink-100">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-8">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
              — Date tehnice
            </div>
            <h2
              className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
              style={{ letterSpacing: "-0.025em" }}
            >
              Specificații tehnice
            </h2>

            <div className="mt-6 bg-white border border-ink-100 shadow-sm overflow-hidden">
              <table className="w-full text-[13px]">
                <tbody>
                  {rows.map(([k, v], i) => (
                    <tr
                      key={i}
                      className={
                        i === 0
                          ? ""
                          : "border-t border-ink-100 hover:bg-ink-50/40 transition"
                      }
                    >
                      <td className="px-5 py-3 align-top text-ink-500 w-[40%]">
                        {k}
                      </td>
                      <td className="px-5 py-3 align-top text-ink-900 font-medium">
                        {v || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:pt-[90px]">
            <div
              className="text-white p-6 lg:p-7 relative overflow-hidden"
              style={{ background: "#082545" }}
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-uzx-orange" />
              <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
                — Consultanță
              </div>
              <h3
                className="serif text-xl lg:text-2xl text-white leading-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                {ctaTitle}
              </h3>
              <p className="mt-3 text-[12px] text-white/65 leading-relaxed">
                {ctaSubtitle}
              </p>

              <div className="mt-5 space-y-2.5">
                <a
                  href={`tel:${phoneClean}`}
                  className="flex items-center gap-3 px-4 py-2.5 bg-uzx-orange hover:bg-uzx-orange/90 text-white text-[13px] font-medium transition"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  {phone}
                </a>

                <a
                  href="/contact"
                  className="flex items-center gap-3 px-4 py-2.5 border border-white/25 hover:bg-white/5 text-white text-[13px] transition"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                  Contactează-ne
                </a>

                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-2.5 border border-white/25 hover:bg-[#25D366] hover:border-[#25D366] text-white text-[13px] transition"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  WhatsApp inginer
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
