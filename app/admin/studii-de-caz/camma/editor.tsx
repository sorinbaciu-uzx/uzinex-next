"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { GallerySlot } from "@/app/studii-de-caz/caramida-modulara-camma/interactive";
import { CAMMA_GALLERY_KEY } from "@/app/studii-de-caz/caramida-modulara-camma/gallery";

type Status = "idle" | "uploading" | "saving" | "saved" | "error";

export function CammaGalleryEditor({ initial }: { initial: GallerySlot[] }) {
  const router = useRouter();
  const [slots, setSlots] = useState<GallerySlot[]>(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [busySlot, setBusySlot] = useState<string | null>(null);

  function update(id: string, patch: Partial<GallerySlot>) {
    setSlots((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  }

  async function uploadFor(id: string, file: File) {
    setError("");
    setBusySlot(id);
    setStatus("uploading");
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `upload ${res.status}`);
      }
      const j = (await res.json()) as { url?: string };
      if (!j.url) throw new Error("upload returned no url");
      update(id, { url: j.url, alt: slots.find((s) => s.id === id)?.title });
      setStatus("idle");
    } catch (e) {
      setError("Eroare upload: " + (e as Error).message);
      setStatus("error");
    } finally {
      setBusySlot(null);
    }
  }

  function clearImage(id: string) {
    if (!confirm("Resetezi acest slot la placeholder?")) return;
    update(id, { url: undefined, alt: undefined, caption: undefined });
  }

  async function save() {
    setError("");
    setStatus("saving");
    try {
      const res = await fetch(`/api/admin/content/${CAMMA_GALLERY_KEY}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slots }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `save ${res.status}`);
      }
      setStatus("saved");
      router.refresh();
      setTimeout(() => setStatus("idle"), 2200);
    } catch (e) {
      setError("Eroare salvare: " + (e as Error).message);
      setStatus("error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 sticky top-14 z-10 py-3 bg-ink-50 -mx-6 px-6 border-b hairline">
        <button
          type="button"
          onClick={save}
          disabled={status === "saving" || status === "uploading"}
          className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-6 py-2.5 text-sm font-medium transition disabled:opacity-50"
        >
          {status === "saving" ? "Se salvează…" : "Salvează tot"}
        </button>
        <Link href="/studii-de-caz/caramida-modulara-camma" target="_blank" />
        <a
          href="/studii-de-caz/caramida-modulara-camma"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ink-600 hover:text-uzx-blue underline-link"
        >
          Vezi pagina publică ↗
        </a>
        {status === "saved" && (
          <span className="text-sm text-green-700 mono">✓ Salvat</span>
        )}
        {status === "uploading" && (
          <span className="text-sm text-ink-600 mono">↑ Upload…</span>
        )}
        {error && (
          <span className="text-sm text-red-700 mono">{error}</span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {slots.map((s) => (
          <div key={s.id} className="bg-white border hairline">
            <div className="flex items-center gap-3 px-4 py-3 border-b hairline bg-ink-50">
              <div className="text-[10px] uppercase tracking-widest text-uzx-orange font-mono">
                Slot {s.id}
              </div>
              <div className="text-[11px] text-ink-500 font-mono">
                {s.url ? "imagine setată" : "placeholder"}
              </div>
            </div>

            <div className="aspect-[4/3] bg-ink-100 relative overflow-hidden">
              {s.url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={s.url}
                  alt={s.alt || s.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 text-ink-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className="mb-2">
                    <rect x="3" y="3" width="18" height="18" rx="1" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M21 15l-5-5L5 21" />
                  </svg>
                  <div className="text-[11px] mono">fără imagine</div>
                </div>
              )}
            </div>

            <div className="p-4 space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink-400 font-mono block mb-1">
                  Titlu slot
                </label>
                <input
                  type="text"
                  value={s.title}
                  onChange={(e) => update(s.id, { title: e.target.value })}
                  className="w-full px-3 py-2 border hairline text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink-400 font-mono block mb-1">
                  Hint placeholder
                </label>
                <input
                  type="text"
                  value={s.hint}
                  onChange={(e) => update(s.id, { hint: e.target.value })}
                  className="w-full px-3 py-2 border hairline text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink-400 font-mono block mb-1">
                  Alt text (accesibilitate)
                </label>
                <input
                  type="text"
                  value={s.alt || ""}
                  onChange={(e) => update(s.id, { alt: e.target.value })}
                  placeholder={s.title}
                  className="w-full px-3 py-2 border hairline text-sm"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-widest text-ink-400 font-mono block mb-1">
                  Caption (opțional · apare sub poză)
                </label>
                <input
                  type="text"
                  value={s.caption || ""}
                  onChange={(e) => update(s.id, { caption: e.target.value })}
                  className="w-full px-3 py-2 border hairline text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <label className="bg-uzx-blue hover:bg-uzx-blue2 text-white px-4 py-2 text-xs font-medium cursor-pointer transition">
                  {s.url ? "Înlocuiește" : "Încarcă imagine"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/avif"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) uploadFor(s.id, f);
                      e.target.value = "";
                    }}
                    disabled={busySlot === s.id}
                  />
                </label>
                {s.url && (
                  <button
                    type="button"
                    onClick={() => clearImage(s.id)}
                    className="border hairline px-3 py-2 text-xs hover:bg-red-50 hover:border-red-300 transition"
                  >
                    Șterge imagine
                  </button>
                )}
                {busySlot === s.id && (
                  <span className="text-[11px] text-ink-500 mono">
                    Upload în curs…
                  </span>
                )}
              </div>
              {s.url && (
                <div className="text-[10px] text-ink-400 font-mono break-all border-t hairline pt-2">
                  {s.url}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
