import Link from "next/link";
import {
  linkify,
  type Segment,
  type LinkTarget,
} from "@/lib/internal-links";

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
  /**
   * Extra link targets beyond the global registry — typically product targets
   * from `buildProductTargets`. Safe to pass the same array to every instance
   * on a page; the shared `alreadyLinked` set enforces per-page uniqueness.
   */
  extraTargets?: readonly LinkTarget[];
  /** Hard cap on /produs/* links per page (via alreadyLinked). */
  maxProductLinksPerPage?: number;
  /** Applied to the wrapper element. Defaults to nothing. */
  className?: string;
  /** Wrapper element. Defaults to `<p>` since prose paragraphs are the primary use case. */
  as?: "p" | "span" | "div";
};

export function AutoLinkedText({
  text,
  alreadyLinked,
  currentPath,
  extraTargets,
  maxProductLinksPerPage,
  className,
  as: As = "p",
}: Props) {
  const segments: Segment[] = linkify(text, alreadyLinked, {
    currentPath,
    extraTargets,
    maxProductLinksPerPage,
  });

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
