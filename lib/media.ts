/**
 * Media types pentru galeria produselor.
 * - Imagini: uploadate pe Vercel Blob
 * - Video: doar link-uri YouTube (embed, fără upload)
 */

export type MediaItem =
  | { type: "image"; url: string; alt?: string }
  | { type: "youtube"; videoId: string; alt?: string };

/**
 * Extrage ID-ul video dintr-un URL YouTube.
 * Acceptă:
 * - https://www.youtube.com/watch?v=XXXXXXXXXXX
 * - https://youtu.be/XXXXXXXXXXX
 * - https://youtube.com/shorts/XXXXXXXXXXX
 * - https://www.youtube.com/embed/XXXXXXXXXXX
 * - Or raw ID: XXXXXXXXXXX (11 chars)
 */
export function parseYouTubeUrl(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // Raw ID (11 chars, alphanumeric + - _)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed);
    // youtube.com/watch?v=ID
    if (
      /(?:^|\.)youtube\.com$/.test(url.hostname) &&
      url.pathname === "/watch"
    ) {
      const v = url.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
    }
    // youtu.be/ID
    if (/(?:^|\.)youtu\.be$/.test(url.hostname)) {
      const id = url.pathname.replace(/^\//, "").split("/")[0];
      if (/^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
    // youtube.com/shorts/ID sau /embed/ID sau /v/ID
    if (/(?:^|\.)youtube\.com$/.test(url.hostname)) {
      const m = url.pathname.match(/\/(?:shorts|embed|v)\/([a-zA-Z0-9_-]{11})/);
      if (m) return m[1];
    }
  } catch {
    // invalid URL
  }
  return null;
}

/**
 * URL pentru thumbnail-ul HD al unui video YouTube.
 * hqdefault = 480×360, maxresdefault = 1280×720 (când există).
 */
export function youtubeThumbnailUrl(
  videoId: string,
  quality: "default" | "mq" | "hq" | "sd" | "maxres" = "hq"
): string {
  const qualityMap = {
    default: "default",
    mq: "mqdefault",
    hq: "hqdefault",
    sd: "sddefault",
    maxres: "maxresdefault",
  };
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * URL embed YouTube (pentru iframe în lightbox).
 */
export function youtubeEmbedUrl(videoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });
  if (autoplay) params.set("autoplay", "1");
  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * URL watch YouTube (pentru click-through).
 */
export function youtubeWatchUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Obține URL-ul afișabil pentru un MediaItem (pentru thumbnail / preview).
 */
export function mediaThumbnailUrl(item: MediaItem): string {
  if (item.type === "image") return item.url;
  if (item.type === "youtube") return youtubeThumbnailUrl(item.videoId, "hq");
  return "";
}

/**
 * Pretty label pentru UI.
 */
export function mediaTypeLabel(item: MediaItem): string {
  if (item.type === "image") return "Imagine";
  if (item.type === "youtube") return "YouTube";
  return "Media";
}
