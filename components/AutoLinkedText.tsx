import Link from "next/link";
import { linkify, type Segment } from "@/lib/internal-links";

type Props = {
  text: string;
  /**
   * Shared across paragraphs of the same page so a target is linked only once
   * per page. Callers must create ONE `Set<string>()` for the whole page and
   * pass the SAME reference into every `<AutoLinkedText>` instance.
   */
  alreadyLinked: Set<string>;
  /** Current page path — matches pointing here are skipped. */
  currentPath?: string;
  /** Applied to the wrapper element. Defaults to nothing. */
  className?: string;
  /** Wrapper element. Defaults to `<p>` since prose paragraphs are the primary use case. */
  as?: "p" | "span" | "div";
};

export function AutoLinkedText({
  text,
  alreadyLinked,
  currentPath,
  className,
  as: As = "p",
}: Props) {
  const segments: Segment[] = linkify(text, alreadyLinked, currentPath);

  return (
    <As className={className}>
      {segments.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <Link
            key={i}
            href={seg.href}
            className="text-uzx-blue hover:text-uzx-orange underline decoration-ink-200 hover:decoration-uzx-orange underline-offset-2 transition-colors"
          >
            {seg.text}
          </Link>
        )
      )}
    </As>
  );
}
