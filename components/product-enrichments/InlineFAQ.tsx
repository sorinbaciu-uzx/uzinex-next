/**
 * InlineFAQ — a single question + answer block placed near the paragraph that
 * surfaces the objection. Unlike the page-level FAQ section at the bottom,
 * this is contextual — the reader sees the answer *as they encounter the
 * doubt*, not after they've already scrolled past it.
 *
 * Visual intent: subtle dark-on-light Q/A typographic contrast, orange Q
 * bullet, generous left indent on the answer — feels like a thoughtful aside,
 * not another UI section.
 */

export function InlineFAQ({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <aside className="my-10 lg:my-12 max-w-2xl mx-auto border-l-2 border-uzx-orange/80 pl-5 lg:pl-6 py-2">
      <div className="flex items-start gap-3 mb-3">
        <span className="shrink-0 w-5 h-5 rounded-full bg-uzx-orange/10 border border-uzx-orange/40 flex items-center justify-center text-[10px] mono font-bold text-uzx-orange mt-0.5">
          Q
        </span>
        <h4
          className="serif text-[17px] text-ink-900 leading-[1.3] font-medium"
          style={{ letterSpacing: "-0.015em" }}
        >
          {question}
        </h4>
      </div>
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-5 h-5 flex items-center justify-center text-[10px] mono font-bold text-ink-400 mt-1">
          A
        </span>
        <p className="text-[14px] text-ink-700 leading-[1.7] font-light">
          {answer}
        </p>
      </div>
    </aside>
  );
}
