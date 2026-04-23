/**
 * Dispatcher for description-enrichment blocks, twin of ProductAnimation.
 * Each entry in `data/product-enrichments.json` is a discriminated union —
 * this wrapper picks the right component and forwards the data payload.
 *
 * Keeping the union small and explicit here (not polymorphic) so a new type
 * is one switch-case extension, not an indirection maze.
 */

import { PullQuote } from "./PullQuote";
import { UseCaseCards } from "./UseCaseCards";
import { InlineFAQ } from "./InlineFAQ";
import { DescriptionImage } from "./DescriptionImage";
import { DescriptionVideo } from "./DescriptionVideo";

export type UseCase = { title: string; body: string };

export type ProductEnrichment =
  | {
      type: "quote";
      insertAfterParagraph: number;
      data: { text: string; attribution?: string };
    }
  | {
      type: "usecases";
      insertAfterParagraph: number;
      data: { heading?: string; cases: UseCase[] };
    }
  | {
      type: "faq";
      insertAfterParagraph: number;
      data: { question: string; answer: string };
    }
  | {
      type: "image";
      insertAfterParagraph: number;
      data: {
        /** Fallback URL used when the gallery hint below doesn't resolve. */
        src: string;
        alt: string;
        caption: string;
        /**
         * Optional hint: 0 = hero image, 1+ = gallery[0], gallery[1]… If the
         * product actually has a gallery entry at that slot, render picks it
         * for variety. If not, the fallback `src` (usually p.image) is used.
         */
        galleryIndex?: number;
      };
    }
  | {
      type: "video";
      insertAfterParagraph: number;
      data: { video: string; caption?: string };
    };

export function ProductEnrichmentBlock({ e }: { e: ProductEnrichment }) {
  switch (e.type) {
    case "quote":
      return <PullQuote text={e.data.text} attribution={e.data.attribution} />;
    case "usecases":
      return (
        <UseCaseCards cases={e.data.cases} heading={e.data.heading} />
      );
    case "faq":
      return <InlineFAQ question={e.data.question} answer={e.data.answer} />;
    case "image":
      return (
        <DescriptionImage
          src={e.data.src}
          alt={e.data.alt}
          caption={e.data.caption}
        />
      );
    case "video":
      return (
        <DescriptionVideo video={e.data.video} caption={e.data.caption} />
      );
  }
}
