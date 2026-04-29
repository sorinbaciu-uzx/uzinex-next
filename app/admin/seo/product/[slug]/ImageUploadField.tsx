"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MediaLibraryPicker } from "./MediaLibraryPicker";

/**
 * Drag & drop + click to select + preview + remove.
 * Upload prin /api/admin/upload → Vercel Blob.
 * Include și câmp alt text pentru SEO + accesibilitate.
 */
export function ImageUploadField({
  value,
  onChange,
  label = "Imagine produs",
  altValue,
  onAltChange,
  altPlaceholder,
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  altValue?: string;
  onAltChange?: (alt: string) => void;
  altPlaceholder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function uploadFile(file: File) {
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Fișierul nu e o imagine.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError("Imagine prea mare (max 8 MB).");
      return;
    }
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "HTTP " + res.status);
      onChange(data.url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) await uploadFile(file);
  }

  async function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) await uploadFile(file);
    // Reset input so same file can be re-selected
    if (inputRef.current) inputRef.current.value = "";
  }

  const isExternal = value && !value.startsWith("/");

  return (
    <div className="bg-white border hairline p-5">
      <div className="flex items-center justify-between mb-3">
        <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
          {label}
        </label>
        {value && (
          <button
            onClick={() => {
              if (confirm("Elimini imaginea?")) onChange("");
            }}
            className="text-xs text-red-600 hover:text-red-800 transition"
          >
            Elimină
          </button>
        )}
      </div>

      {value ? (
        <div className="space-y-3">
          <div className="border hairline bg-ink-50 p-4 flex items-center justify-center min-h-[220px]">
            {/* Use standard img tag for flexibility with any remote source */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Preview"
              className="max-h-[280px] max-w-full object-contain"
              onError={() => setError("Eroare la încărcarea imaginii.")}
            />
          </div>
          <div className="text-[11px] font-mono text-ink-500 break-all">
            {value}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              className="text-xs border hairline bg-white px-3 py-1.5 hover:bg-ink-50 transition"
            >
              {uploading ? "Se încarcă..." : "Înlocuiește (upload)"}
            </button>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="text-xs border hairline bg-white px-3 py-1.5 hover:bg-ink-50 transition"
            >
              Alege din bibliotecă
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div
            onDrop={onDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => inputRef.current?.click()}
            className={
              "border-2 border-dashed p-8 text-center cursor-pointer transition " +
              (dragOver
                ? "border-uzx-blue bg-uzx-blue/5"
                : "border-ink-300 hover:border-uzx-blue hover:bg-ink-50")
            }
          >
            {uploading ? (
              <div>
                <div className="w-10 h-10 mx-auto border-4 border-uzx-blue border-t-transparent rounded-full animate-spin mb-3" />
                <div className="text-sm text-ink-700">Se încarcă...</div>
              </div>
            ) : (
              <>
                <div className="text-4xl text-ink-300 mb-2">📷</div>
                <div className="text-sm text-ink-700 font-medium">
                  Trage o imagine aici sau click
                </div>
                <div className="text-xs text-ink-500 mt-1">
                  PNG, JPG, WebP, SVG · max 8 MB
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-ink-200" />
            <span className="text-[10px] uppercase tracking-wider text-ink-400 font-mono">
              sau
            </span>
            <div className="flex-1 h-px bg-ink-200" />
          </div>
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            className="w-full text-sm border hairline bg-white px-3 py-2.5 hover:bg-ink-50 transition"
          >
            📁 Alege din bibliotecă (public/images/produse)
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,image/avif"
        onChange={onPickFile}
        className="hidden"
      />

      {error && (
        <div className="mt-3 text-xs text-red-600 border border-red-200 bg-red-50 p-2">
          {error}
        </div>
      )}

      {/* ALT TEXT */}
      {onAltChange && (
        <div className="mt-4 border-t hairline pt-4">
          <label className="text-[10px] uppercase tracking-wider text-uzx-orange font-mono block mb-2 font-semibold">
            Alt text (SEO + accesibilitate)
          </label>
          <input
            type="text"
            value={altValue || ""}
            onChange={(e) => onAltChange(e.target.value)}
            placeholder={altPlaceholder || "Ex: Presă de balotat industrială 500kg — Uzinex"}
            className="w-full border hairline px-3 py-2 text-sm focus:outline-none focus:border-uzx-blue"
          />
          <div className="text-[11px] text-ink-500 mt-2 leading-relaxed">
            Descrie imaginea într-o frază. Include keyword-ul principal dacă e
            natural. Google folosește asta pentru Google Images ranking și
            screen reader-ele pentru a descrie imaginea utilizatorilor cu
            dizabilități vizuale.
          </div>
        </div>
      )}

      <div className="text-xs text-ink-500 mt-3">
        Imaginea se încarcă pe Vercel Blob (CDN global, rapid). Dacă ai o adresă
        URL externă, o poți lipi direct manual:
      </div>
      <input
        type="url"
        value={isExternal ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="w-full mt-2 border hairline px-3 py-1.5 text-xs font-mono focus:outline-none focus:border-uzx-blue"
      />

      <MediaLibraryPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPick={(url) => onChange(url)}
      />
    </div>
  );
}
