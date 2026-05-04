import { getContent } from "@/lib/content";
import type { GallerySlot } from "./interactive";

export const CAMMA_GALLERY_KEY = "case_camma_gallery";

export const CAMMA_GALLERY_DEFAULT: GallerySlot[] = [
  {
    id: "01",
    title: "Vedere generală linie producție",
    hint: "Imagine de ansamblu a fluxului tehnologic la sediul CAMMA Buzău, cu toate utilajele aliniate.",
  },
  {
    id: "02",
    title: "Moara cu ciocane în funcțiune",
    hint: "Detaliu tehnic al primei stații din flux, spargerea argilei uscate în pudră fină.",
  },
  {
    id: "03",
    title: "Malaxorul materie primă",
    hint: "Stația de amestec calibrat argilă + nisip + ciment + apă conform rețetei.",
  },
  {
    id: "04",
    title: "Presa hidraulică",
    hint: "Compactare semi-uscată cu presiune calibrată pe matriță. Inima fluxului.",
  },
  {
    id: "05",
    title: "Cărămizi pe banda de evacuare",
    hint: "Cărămizi crude proaspăt presate ieșind pe banda de transport către paletizare.",
  },
  {
    id: "06",
    title: "Stoc finit · paletizare maturare",
    hint: "Cărămizi modulare paletizate, în maturare la temperatura ambiantă, gata pentru livrare.",
  },
];

type StoredSlot = {
  id?: string;
  title?: string;
  hint?: string;
  url?: string;
  alt?: string;
  caption?: string;
};
type StoredGallery = { slots?: StoredSlot[] };

export async function getCammaGallery(): Promise<GallerySlot[]> {
  const raw = await getContent<StoredGallery>(CAMMA_GALLERY_KEY);
  if (!raw || !Array.isArray(raw.slots)) {
    return CAMMA_GALLERY_DEFAULT;
  }
  const stored = new Map(raw.slots.filter((s) => s.id).map((s) => [s.id as string, s]));
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
