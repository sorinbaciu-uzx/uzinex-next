"use client";

import { useEffect, useState } from "react";

type LibItem = { name: string; url: string; size: number };

export function MediaLibraryPicker({
  open,
  onClose,
  onPick,
}: {
  open: boolean;
  onClose: () => void;
  onPick: (url: string) => void;
}) {
  const [items, setItems] = useState<LibItem[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(60);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setPage(1);
  }, [q]);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError("");
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    params.set("page", String(page));
    fetch(`/api/admin/media?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          return;
        }
        setItems(data.items || []);
        setTotal(data.total || 0);
        setPageSize(data.pageSize || 60);
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [open, q, page]);

  if (!open) return null;

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-5xl w-full max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b hairline p-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono mb-1">
              Bibliotecă media
            </div>
            <div className="serif text-xl text-ink-900">
              Alege o imagine din folderul produse ({total})
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-2xl text-ink-400 hover:text-ink-700 px-2"
            aria-label="Închide"
          >
            ×
          </button>
        </div>

        <div className="p-4 border-b hairline">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Caută după nume fișier..."
            className="w-full border hairline px-3 py-2 text-sm bg-ink-50 focus:bg-white focus:outline-none focus:border-uzx-blue"
            autoFocus
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {loading && (
            <div className="text-center text-sm text-ink-500 py-8">
              Se încarcă...
            </div>
          )}
          {error && (
            <div className="border border-red-200 bg-red-50 text-red-700 text-xs p-2 mb-3">
              {error}
            </div>
          )}
          {!loading && !error && items.length === 0 && (
            <div className="text-center text-sm text-ink-500 py-8">
              Niciun fișier găsit.
            </div>
          )}
          {items.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {items.map((it) => (
                <button
                  key={it.name}
                  type="button"
                  onClick={() => {
                    onPick(it.url);
                    onClose();
                  }}
                  className="border hairline bg-ink-50 hover:border-uzx-blue hover:shadow-md transition text-left group overflow-hidden"
                  title={it.name}
                >
                  <div className="aspect-square overflow-hidden flex items-center justify-center bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.url}
                      alt={it.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  </div>
                  <div className="text-[10px] font-mono text-ink-600 px-1.5 py-1 truncate">
                    {it.name}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t hairline p-3 bg-ink-50">
            <div className="text-xs text-ink-500">
              Pagina {page} / {totalPages} · {total} imagini
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
                className="text-xs border hairline px-3 py-1.5 bg-white hover:bg-ink-100 disabled:opacity-40"
              >
                ← Anterior
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages || loading}
                className="text-xs border hairline px-3 py-1.5 bg-white hover:bg-ink-100 disabled:opacity-40"
              >
                Următor →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
