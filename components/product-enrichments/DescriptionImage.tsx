/**
 * DescriptionImage — a product photo placed mid-description with a contextual
 * caption that connects it to the nearby paragraph. The caption is the
 * real value here: without it, this is just another hero shot; with it, the
 * reader understands why they're looking at the image at THIS moment.
 *
 * Visual intent: full column width, subtle hairline frame, caption in small
 * mono underneath for a technical-journal feel. No zoom / no lightbox — we
 * already have a full gallery elsewhere on the page.
 */

import Image from "next/image";

export function DescriptionImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  /** Short caption that ties the image to the surrounding paragraph. */
  caption: string;
}) {
  return (
    <figure className="my-10 lg:my-12 -mx-2">
      <div className="relative w-full aspect-[16/10] overflow-hidden border border-ink-100 bg-ink-50">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 768px, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mt-3 text-[11px] mono text-ink-500 leading-snug text-center">
        {caption}
      </figcaption>
    </figure>
  );
}
