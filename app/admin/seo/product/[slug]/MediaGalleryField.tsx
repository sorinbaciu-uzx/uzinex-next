"use client";

import { useRef, useState } from "react";
import {
  mediaThumbnailUrl,
  parseYouTubeUrl,
  type MediaItem,
} from "@/lib/media";

const MAX_ITEMS = 8;

/**
 * Editor galerie media — max 8 items: imagini (upload Vercel Blob) + YouTube (URL paste).
 * Reorder prin săgeți, remove individual, preview live.
 */
export function MediaGalleryField({
  value,
  onChange,
}: {
  value: MediaItem[];
  onChange: (items: MediaItem[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [ytInput, setYtInput] = useState("");
  const [ytError, setYtError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const count = value.length;
  const canAdd = count < MAX_ITEMS;

  async function uploadFiles(files: FileList) {
    if (!canAdd) {
      setError(`Maxim ${MAX_ITEMS} media items.`);
      return;
    }
    setError("");
    const toUpload = Array.from(files).slice(0, MAX_ITEMS - count);
    setUploading(true);
    const newItems: MediaItem[] = [];
    try {
      for (const file of toUpload) {
        if (!file.type.startsWith("image/")) {
          setError(`"${file.name}" nu e imagine — ignorat.`);
          continue;
        }
        if (file.size > 8 * 1024 * 1024) {
          setError(`"${file.name}" prea mare (max 8 MB) — ignorat.`);
          continue;
        }
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: form,
        });
        const data = await res.json();
        if (!res.ok) {
          setError("Upload eșuat: " + (data.error || res.status));
          continue;
        }
        newItems.push({ type: "image", url: data.url });
      }
      if (newItems.length > 0) onChange([...value, ...newItems]);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function addYouTube() {
    setYtError("");
    if (!canAdd) {
      setYtError(`Maxim ${MAX_ITEMS} media items.`);
      return;
    }
    const videoId = parseYouTubeUrl(ytInput.trim());
    if (!videoId) {
      setYtError("URL YouTube invalid. Acceptă: youtube.com/watch?v=..., youtu.be/..., shorts/...");
      return;
    }
    // Check duplicate
    if (value.some((m) => m.type === "youtube" && m.videoId === videoId)) {
      setYtError("Videoul e deja în galerie.");
      return;
    }
    onChange([...value, { type: "youtube", videoId }]);
    setYtInput("");
  }

  function removeItem(i: number) {
    if (!confirm("Elimini acest item din galerie?")) return;
    onChange(value.filter((_, idx) => idx !== i));
  }
  function moveUp(i: number) {
    if (i === 0) return;
    const copy = [...value];
    [copy[i - 1], copy[i]] = [copy[i], copy[i - 1]];
    onChange(copy);
  }
  function moveDown(i: number) {
    if (i === value.length - 1) return;
    const copy = [...value];
    [copy[i], copy[i + 1]] = [copy[i + 1], copy[i]];
    onChange(copy);
  }
  function updateAlt(i: number, alt: string) {
    const copy = [...value];
    copy[i] = { ...copy[i], alt };
    onChange(copy);
  }

  return (
    <div className="bg-white border hairline p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
            Galerie media ({count}/{MAX_ITEMS})
          </label>
          <div className="text-xs text-ink-500 mt-1">
            Imagini adiționale (Vercel Blob) + linkuri YouTube. Apar pe pagina
            produs ca thumbnails + lightbox.
          </div>
        </div>
      </div>

      {/* GRID DE ITEMS */}
      {count > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {value.map((item, i) => (
            <div
              key={i}
              className="relative group border hairline bg-ink-50"
            >
              {/* Thumbnail */}
              <div className="aspect-square flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mediaThumbnailUrl(item)}
                  alt={item.alt || "Media " + (i + 1)}
                  className="w-full h-full object-cover"
                />
                {item.type === "youtube" && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="white"
                      >
                        <path d="M5 3.5v13l11-6.5z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute top-1 left-1 text-[9px] font-mono uppercase tracking-wider bg-black/60 text-white px-1.5 py-0.5">
                  {item.type === "image" ? "IMG" : "YT"} · #{i + 1}
                </div>
              </div>

              {/* Alt text input */}
              <input
                type="text"
                value={item.alt || ""}
                onChange={(e) => updateAlt(i, e.target.value)}
                placeholder="Alt text (SEO)"
                className="w-full text-[11px] border-t hairline px-2 py-1.5 bg-white focus:outline-none focus:border-uzx-blue"
              />

              {/* Controls */}
              <div className="flex items-center justify-between px-1 py-1 bg-white border-t hairline">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => moveUp(i)}
                    disabled={i === 0}
                    className="p-1 text-xs hover:bg-ink-100 disabled:opacity-30"
                    title="Mută înainte"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(i)}
                    disabled={i === value.length - 1}
                    className="p-1 text-xs hover:bg-ink-100 disabled:opacity-30"
                    title="Mută după"
                  >
                    →
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(i)}
                  className="p-1 text-xs text-red-600 hover:bg-red-50"
                  title="Șterge"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* UPLOAD IMAGINE */}
      {canAdd && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-ink-500 font-mono block mb-2">
              + Imagine (upload)
            </label>
            <div
              onClick={() => inputRef.current?.click()}
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files.length > 0) {
                  uploadFiles(e.dataTransfer.files);
                }
              }}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-ink-300 hover:border-uzx-blue hover:bg-ink-50 p-4 text-center cursor-pointer transition"
            >
              {uploading ? (
                <div className="text-xs text-ink-700">Se încarcă...</div>
              ) : (
                <div>
                  <div className="text-2xl text-ink-300 mb-1">📷</div>
                  <div className="text-xs text-ink-700">
                    Click sau drag & drop (selecție multiplă OK)
                  </div>
                  <div className="text-[10px] text-ink-400 mt-1">
                    PNG/JPG/WebP · max 8 MB per fișier
                  </div>
                </div>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
              multiple
              onChange={(e) => {
                if (e.target.files) uploadFiles(e.target.files);
              }}
              className="hidden"
            />
          </div>

          {/* ADD YOUTUBE */}
          <div>
            <label className="text-[10px] uppercase tracking-wider text-ink-500 font-mono block mb-2">
              + Video YouTube (URL)
            </label>
            <div className="border hairline p-4 bg-ink-50">
              <div className="text-2xl mb-2">▶️</div>
              <input
                type="url"
                value={ytInput}
                onChange={(e) => setYtInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addYouTube();
                  }
                }}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full text-xs font-mono border hairline px-2 py-1.5 focus:outline-none focus:border-uzx-blue"
              />
              <button
                type="button"
                onClick={addYouTube}
                disabled={!ytInput.trim()}
                className="mt-2 w-full bg-uzx-blue hover:bg-uzx-blue2 text-white text-xs px-3 py-1.5 transition disabled:opacity-50"
              >
                Adaugă video
              </button>
              {ytError && (
                <div className="mt-2 text-[10px] text-red-600">{ytError}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {!canAdd && (
        <div className="bg-uzx-orange/10 border border-uzx-orange/30 p-3 text-xs text-uzx-orange">
          Ai atins limita de {MAX_ITEMS} media items. Elimină unul ca să
          adaugi altul.
        </div>
      )}

      {error && (
        <div className="border border-red-200 bg-red-50 text-red-700 text-xs p-2">
          {error}
        </div>
      )}

      <div className="text-[11px] text-ink-500 leading-relaxed">
        <b>Sfat SEO:</b> completează câmpul <b>Alt text</b> cu o descriere
        scurtă a imaginii (include keyword-ul principal dacă e relevant).
        Ajută la ranking pentru Google Images + accesibilitate.
      </div>
    </div>
  );
}
