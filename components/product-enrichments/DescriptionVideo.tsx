/**
 * DescriptionVideo — embed a product demo from YouTube mid-description.
 * Rendered only when the product's gallery/enrichment recipe actually lists
 * a video, so most pages won't have one.
 *
 * Accepts either a YouTube video ID ("dQw4w9WgXcQ") or a full URL — we
 * normalize to an embed URL. Lazy-loaded via iframe loading="lazy" so it
 * doesn't cost first-paint when it's offscreen.
 *
 * Visual intent: 16:9 frame matching the rest of the description column,
 * same hairline treatment as DescriptionImage for consistency.
 */

function toEmbedUrl(videoIdOrUrl: string): string | null {
  if (!videoIdOrUrl) return null;
  if (videoIdOrUrl.length <= 15 && !/[/.]/.test(videoIdOrUrl)) {
    return `https://www.youtube.com/embed/${videoIdOrUrl}`;
  }
  try {
    const u = new URL(videoIdOrUrl);
    if (u.hostname.includes("youtu.be")) {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return `https://www.youtube.com/embed/${v}`;
      // /embed/ID path — already an embed URL
      if (u.pathname.startsWith("/embed/")) return u.toString();
    }
  } catch {
    return null;
  }
  return null;
}

export function DescriptionVideo({
  video,
  caption,
}: {
  video: string;
  caption?: string;
}) {
  const embed = toEmbedUrl(video);
  if (!embed) return null;

  return (
    <figure className="my-10 lg:my-12 -mx-2">
      <div className="relative w-full aspect-video overflow-hidden border border-ink-100 bg-black">
        <iframe
          src={embed}
          title={caption ?? "Video produs"}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[11px] mono text-ink-500 leading-snug text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
