/**
 * UseCaseCards — 3 concrete scenarios where this product fits. Helps the B2B
 * reader project themselves into a use case rather than staying abstract.
 *
 * Visual intent: white cards on the description's light bg, left orange
 * accent, serif titles, subtle hairline. No hover/animation (server component).
 * Grid stacks on mobile, 3-across on desktop.
 */

type UseCase = {
  /** Short scenario title, 3–5 words, sentence case. Example: "Pentru mobilier de lux". */
  title: string;
  /** 1–2 line explanation of the fit. */
  body: string;
};

export function UseCaseCards({
  cases,
  heading = "Unde se potrivește",
}: {
  cases: UseCase[];
  heading?: string;
}) {
  if (!cases || cases.length === 0) return null;

  return (
    <div className="my-10 lg:my-12">
      <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-5 text-center">
        — {heading}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-5">
        {cases.slice(0, 3).map((uc, i) => (
          <div
            key={i}
            className="relative bg-white border border-ink-100 p-5 lg:p-6 overflow-hidden"
          >
            {/* Left accent bar */}
            <div className="absolute inset-y-0 left-0 w-[3px] bg-uzx-orange" />
            <div className="text-[10px] mono uppercase tracking-widest text-ink-400 mb-3">
              {String(i + 1).padStart(2, "0")}
            </div>
            <h4
              className="serif text-[17px] text-ink-900 leading-[1.2] mb-2.5"
              style={{ letterSpacing: "-0.015em" }}
            >
              {uc.title}
            </h4>
            <p className="text-[12.5px] text-ink-600 leading-relaxed font-light">
              {uc.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
