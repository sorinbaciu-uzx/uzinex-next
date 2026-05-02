import Link from "next/link";
import { getContent } from "@/lib/content";
import {
  CAMMA_GALLERY_DEFAULT,
  CAMMA_GALLERY_KEY,
} from "@/app/studii-de-caz/caramida-modulara-camma/gallery";
import type { GallerySlot } from "@/app/studii-de-caz/caramida-modulara-camma/interactive";
import { CammaGalleryEditor } from "./editor";

export const dynamic = "force-dynamic";

type StoredSlot = {
  id?: string;
  title?: string;
  hint?: string;
  url?: string;
  alt?: string;
  caption?: string;
};
type StoredGallery = { slots?: StoredSlot[] };

async function loadCurrent(): Promise<GallerySlot[]> {
  const raw = await getContent<StoredGallery>(CAMMA_GALLERY_KEY);
  if (!raw || !Array.isArray(raw.slots)) return CAMMA_GALLERY_DEFAULT;
  const stored = new Map(
    raw.slots.filter((s) => s.id).map((s) => [s.id as string, s])
  );
  return CAMMA_GALLERY_DEFAULT.map((d) => {
    const s = stored.get(d.id);
    if (!s) return d;
    return {
      id: d.id,
      title: s.title || d.title,
      hint: s.hint || d.hint,
      url: s.url || undefined,
      alt: s.alt || d.title,
      caption: s.caption || undefined,
    };
  });
}

export default async function CammaGalleryAdminPage() {
  const initial = await loadCurrent();

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin"
          className="text-[11px] uppercase tracking-[0.22em] text-ink-500 font-mono hover:text-uzx-orange transition"
        >
          ← Înapoi la admin
        </Link>
        <div className="text-[11px] uppercase tracking-[0.22em] text-uzx-orange font-mono mt-3 mb-2">
          — Studii de caz · CAMMA
        </div>
        <h1 className="serif text-3xl text-ink-900">Galerie foto · linie cărămidă modulară</h1>
        <p className="text-ink-500 mt-2 max-w-2xl">
          Încarcă fotografiile reale din fabrica CAMMA pentru fiecare slot.
          Pozele apar în secțiunea 06 a paginii publice de studiu de caz.
          Imaginile se urcă automat în Vercel Blob, iar metadata se salvează în
          baza de date.
        </p>
      </div>

      <div className="border-l-2 border-uzx-orange bg-amber-50 px-5 py-4">
        <div className="text-[10px] uppercase tracking-widest text-uzx-orange font-mono mb-1">
          Cum funcționează
        </div>
        <ul className="text-sm text-ink-700 space-y-1 list-disc pl-4">
          <li>Fiecare slot are titlu și hint preconfigurate, dar pot fi suprascrise.</li>
          <li>Click pe „Încarcă imagine" → fișier max 8 MB · JPG/PNG/WebP.</li>
          <li>După încărcare apare URL-ul Blob; salvează ca să persiste pe pagina publică.</li>
          <li>Click „Șterge imagine" pentru a reseta un slot la placeholder.</li>
        </ul>
      </div>

      <CammaGalleryEditor initial={initial} />
    </div>
  );
}
