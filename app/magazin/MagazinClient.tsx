"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AddToQuoteButton } from "./AddToQuoteButton";
import { PRODUCTS as ALL_PRODUCTS, type Product } from "./products";

const PER_PAGE = 12;

type Filter =
  | { type: "all" }
  | { type: "category"; value: string }
  | { type: "subcategory"; value: string; parent: string }
  | { type: "subSubcategory"; value: string; parent: string; grandparent: string };

type CatNode = {
  name: string;
  children: (string | { name: string; children: string[] })[];
};

const CATEGORIES: CatNode[] = [
  {
    name: "Utilaje de construcții",
    children: [
      { name: "Excavatoare", children: ["Miniexcavatoare", "Excavatoare pe șenile"] },
      "Concasoare",
      "Accesorii utilaje de construcții",
    ],
  },
  {
    name: "Echipamente de ambalare",
    children: [
      "Ambalare paleți",
      "Ambalare termocontractabilă",
      "Sigilare și formare cutii",
      "Mașini de legat cu bandă",
      "Fabricare cutii carton",
      "Ambalare diverse",
    ],
  },
  {
    name: "Echipamente de etichetare și dozare",
    children: [
      "Mașini de etichetare",
      "Mașini de umplere și plafonare",
      "Mașini de dezmembrat",
    ],
  },
  {
    name: "Echipamente de reciclare",
    children: [
      "Mașini de balotat și presare",
      "Mașini de tocat și mărunțit",
      "Echipamente de separare",
      "Echipamente auxiliare pentru reciclare",
    ],
  },
  {
    name: "Utilaje CNC",
    children: ["CNC diverse", "CNC metal", "CNC mobilă", "CNC piatră", "Router CNC"],
  },
  {
    name: "Strunguri",
    children: ["Mini strunguri", "Strunguri CNC", "Strunguri heavy duty", "Strunguri universale"],
  },
  {
    name: "Mașini de prelucrare lemn",
    children: [
      "Fierăstraie pentru lemn",
      "Mașini de aplicat cant",
      "Mașini de finisat lemn",
      "Mașini pentru uși",
    ],
  },
  {
    name: "Mașini de tăiere laser",
    children: ["Laser fibră", "Laser cu bobină"],
  },
  {
    name: "Echipamente de inspecție industrială",
    children: [
      "Roboți CCTV pentru inspecția conductelor",
      "Camere push pentru inspecția conductelor",
      "Camere PTZ / periscop pentru cămine și canalizare",
      "Videoscoape industriale",
      "Camere NDT și inspecții speciale",
    ],
  },
  {
    name: "Echipamente energetice",
    children: ["Pompe de căldură"],
  },
];

function isActive(filter: Filter, type: Filter["type"], value?: string): boolean {
  if (filter.type !== type) return false;
  if (type === "all") return true;
  // @ts-expect-error narrow
  return filter.value === value;
}

function matches(p: Product, f: Filter): boolean {
  if (f.type === "all") return true;
  if (f.type === "category") return p.category === f.value;
  if (f.type === "subcategory") return p.subcategory === f.value;
  if (f.type === "subSubcategory") return p.subSubcategory === f.value;
  return true;
}

export function MagazinClient() {
  const [filter, setFilter] = useState<Filter>({ type: "all" });
  const [page, setPage] = useState(1);

  const filtered = useMemo(
    () => ALL_PRODUCTS.filter((p) => matches(p, filter)),
    [filter]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const setF = (f: Filter) => {
    setFilter(f);
    setPage(1);
  };

  // pagination: compact like 1 2 3 4 … 14 15 16
  const pageNumbers = (): (number | "…")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const arr: (number | "…")[] = [];
    arr.push(1, 2, 3, 4);
    if (currentPage > 5 && currentPage < totalPages - 3) {
      arr.push("…", currentPage);
    }
    arr.push("…", totalPages - 2, totalPages - 1, totalPages);
    return arr;
  };

  return (
    <section className="py-12 lg:py-16">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        {/* SIDEBAR FILTRE */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-24 bg-white border border-ink-100 shadow-sm overflow-hidden">
            <div className="px-6 pt-6 pb-4">
              <div className="text-[10px] uppercase tracking-[0.2em] text-uzx-orange mono">
                — Filtrează
              </div>
            </div>
            <div className="h-px bg-ink-100 mx-6" />
            <nav className="flex flex-col p-3 gap-0.5 text-sm">
              {/* Toate produsele */}
              <button
                type="button"
                onClick={() => setF({ type: "all" })}
                className={`group text-left px-4 py-2.5 transition flex items-center gap-2.5 ${
                  isActive(filter, "all")
                    ? "bg-uzx-blue text-white shadow-md shadow-uzx-blue/20"
                    : "text-ink-600 hover:bg-ink-50 hover:text-uzx-blue"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 shrink-0 ${
                    isActive(filter, "all") ? "bg-uzx-orange" : "bg-ink-300"
                  }`}
                />
                <span className="leading-tight font-medium">Toate produsele</span>
              </button>

              {CATEGORIES.map((cat) => {
                const catActive = isActive(filter, "category", cat.name);
                return (
                  <details key={cat.name} className="group/cat" open={
                    filter.type === "category" && filter.value === cat.name ||
                    filter.type === "subcategory" && filter.parent === cat.name ||
                    filter.type === "subSubcategory" && filter.grandparent === cat.name
                  }>
                    <summary className="list-none cursor-pointer">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setF({ type: "category", value: cat.name });
                        }}
                        className={`w-full text-left px-4 py-2 transition flex items-center gap-2.5 ${
                          catActive
                            ? "bg-uzx-blue text-white shadow-md shadow-uzx-blue/20"
                            : "text-ink-600 hover:bg-ink-50 hover:text-uzx-blue"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 shrink-0 transition ${
                            catActive ? "bg-uzx-orange" : "bg-ink-300 group-hover/cat:bg-uzx-orange"
                          }`}
                        />
                        <span className="leading-tight flex-1">{cat.name}</span>
                        <span
                          className={`text-[10px] group-open/cat:rotate-90 transition ${
                            catActive ? "text-white/70" : "text-ink-400"
                          }`}
                        >
                          ▶
                        </span>
                      </button>
                    </summary>
                    <ul className="ml-4 mt-0.5 mb-1 border-l border-ink-100 pl-2 space-y-0.5">
                      {cat.children.map((sub) => {
                        if (typeof sub === "string") {
                          const subActive = isActive(filter, "subcategory", sub);
                          return (
                            <li key={sub}>
                              <button
                                type="button"
                                onClick={() =>
                                  setF({ type: "subcategory", value: sub, parent: cat.name })
                                }
                                className={`w-full text-left px-3 py-1.5 text-[12px] transition flex items-center gap-2 ${
                                  subActive
                                    ? "bg-uzx-blue/10 text-uzx-blue font-medium"
                                    : "text-ink-500 hover:bg-ink-50 hover:text-uzx-blue"
                                }`}
                              >
                                <span
                                  className={`w-1 h-1 ${
                                    subActive ? "bg-uzx-orange" : "bg-ink-300"
                                  }`}
                                />
                                {sub}
                              </button>
                            </li>
                          );
                        }
                        const subActive = isActive(filter, "subcategory", sub.name);
                        return (
                          <li key={sub.name}>
                            <details
                              className="group/sub"
                              open={
                                filter.type === "subcategory" && filter.value === sub.name ||
                                filter.type === "subSubcategory" && filter.parent === sub.name
                              }
                            >
                              <summary className="list-none cursor-pointer">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setF({ type: "subcategory", value: sub.name, parent: cat.name });
                                  }}
                                  className={`w-full text-left px-3 py-1.5 text-[12px] transition flex items-center gap-2 ${
                                    subActive
                                      ? "bg-uzx-blue/10 text-uzx-blue font-medium"
                                      : "text-ink-500 hover:bg-ink-50 hover:text-uzx-blue"
                                  }`}
                                >
                                  <span
                                    className={`w-1 h-1 ${
                                      subActive ? "bg-uzx-orange" : "bg-ink-300"
                                    }`}
                                  />
                                  <span className="flex-1">{sub.name}</span>
                                  <span className="text-[9px] text-ink-400 group-open/sub:rotate-90 transition">
                                    ▶
                                  </span>
                                </button>
                              </summary>
                              <ul className="ml-3 mt-0.5 border-l border-ink-100 pl-2 space-y-0.5">
                                {sub.children.map((leaf) => {
                                  const leafActive = isActive(filter, "subSubcategory", leaf);
                                  return (
                                    <li key={leaf}>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setF({
                                            type: "subSubcategory",
                                            value: leaf,
                                            parent: sub.name,
                                            grandparent: cat.name,
                                          })
                                        }
                                        className={`w-full text-left px-3 py-1 text-[11px] transition flex items-center gap-2 ${
                                          leafActive
                                            ? "bg-uzx-blue/10 text-uzx-blue font-medium"
                                            : "text-ink-400 hover:text-uzx-blue hover:bg-ink-50"
                                        }`}
                                      >
                                        <span
                                          className={`w-1 h-1 ${
                                            leafActive ? "bg-uzx-orange" : "bg-ink-200"
                                          }`}
                                        />
                                        {leaf}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </details>
                          </li>
                        );
                      })}
                    </ul>
                  </details>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* GRID */}
        <div className="lg:col-span-9 flex flex-col">
          {/* result count */}
          <div className="mb-5 flex items-center justify-between text-[11px] mono uppercase tracking-wider text-ink-400">
            <span>
              {filtered.length} {filtered.length === 1 ? "produs" : "produse"} găsite
            </span>
            {filter.type !== "all" && (
              <button
                type="button"
                onClick={() => setF({ type: "all" })}
                className="text-uzx-blue hover:text-uzx-orange transition"
              >
                resetează filtre ×
              </button>
            )}
          </div>

          {pageItems.length === 0 ? (
            <div className="border border-ink-100 bg-white p-12 text-center text-ink-500 text-sm">
              Niciun produs nu corespunde acestei categorii.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {pageItems.map((p) => (
                <article
                  key={p.sku}
                  className="group relative bg-white border border-ink-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition flex flex-col overflow-hidden"
                >
                  <div className="absolute inset-x-0 top-0 h-1.5 bg-uzx-blue" />
                  <div className="absolute top-4 left-0 right-0 flex items-center justify-between px-5 z-10">
                    <span className="text-[10px] mono uppercase tracking-[0.15em] text-ink-400">
                      {p.sku}
                    </span>
                    <span className="text-[9px] mono uppercase tracking-[0.15em] text-uzx-blue border border-uzx-blue/20 bg-uzx-blue/5 px-2 py-0.5">
                      {p.subcategory || p.category}
                    </span>
                  </div>
                  <div className="pt-12 px-6 flex items-center justify-center h-56">
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt={p.name}
                        width={400}
                        height={300}
                        className="object-contain max-h-full w-auto group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-ink-300">
                        <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="9" cy="9" r="2" />
                          <path d="m21 15-5-5L5 21" />
                        </svg>
                        <span className="mt-3 text-[10px] mono uppercase tracking-wider text-ink-300">
                          imagine indisponibilă
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="px-6 pb-6 flex flex-col flex-1">
                    <h3 className="serif text-lg lg:text-xl text-ink-900 leading-snug font-medium">
                      {p.name}
                    </h3>
                    <div className="w-10 h-px bg-uzx-orange mt-2" />
                    <p className="mt-3 text-sm text-ink-500 leading-relaxed flex-1">
                      {p.shortSpec || p.subcategory || p.category}
                    </p>
                    <div className="mt-5 grid grid-cols-2 gap-2">
                      <a
                        href={`/produs/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center text-xs lg:text-sm py-2.5 border border-uzx-blue text-uzx-blue hover:bg-uzx-blue hover:text-white transition"
                      >
                        Detalii
                      </a>
                      <AddToQuoteButton sku={p.sku} name={p.name} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* PAGINATION */}
          {totalPages > 1 && (
            <nav className="mt-12 flex items-center justify-center gap-3 text-base">
              {pageNumbers().map((n, i) =>
                n === "…" ? (
                  <span key={`dots-${i}`} className="text-ink-300 px-1">
                    …
                  </span>
                ) : (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 inline-flex items-center justify-center transition ${
                      n === currentPage
                        ? "text-uzx-blue font-semibold"
                        : "text-ink-300 hover:text-uzx-blue"
                    }`}
                  >
                    {n}
                  </button>
                )
              )}
              <button
                type="button"
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage >= totalPages}
                className="w-9 h-9 inline-flex items-center justify-center text-ink-400 hover:text-uzx-blue transition text-xl disabled:opacity-30 disabled:hover:text-ink-400"
                aria-label="Pagina următoare"
              >
                →
              </button>
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
