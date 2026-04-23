/**
 * PullQuote — breaks the long description rhythm with a single highlighted
 * sentence pulled from the surrounding text. No new information is introduced
 * (the data generator selects the quote from the description itself), so this
 * stays SEO-neutral while giving the reader a visual beat to catch their
 * breath on.
 *
 * Visual intent: premium editorial — large serif, tight letter-spacing, generous
 * vertical space, a single orange hairline as the decorative element.
 */

export function PullQuote({
  text,
  attribution,
}: {
  text: string;
  /** Optional — e.g. "— ing. Popescu, UZINEX" or a source spec line. */
  attribution?: string;
}) {
  return (
    <figure className="my-10 lg:my-14 max-w-xl mx-auto text-center">
      {/* Top ornament: thin orange line + dot */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="w-10 h-px bg-uzx-orange" />
        <span className="w-1 h-1 rounded-full bg-uzx-orange" />
        <span className="w-10 h-px bg-uzx-orange" />
      </div>

      <blockquote
        className="serif text-[22px] lg:text-[26px] text-ink-900 leading-[1.3] font-light"
        style={{ letterSpacing: "-0.02em" }}
      >
        <span className="text-uzx-orange serif font-medium">“</span>
        {text}
        <span className="text-uzx-orange serif font-medium">”</span>
      </blockquote>

      {attribution && (
        <figcaption className="mt-5 text-[10px] mono uppercase tracking-[0.2em] text-ink-400">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
