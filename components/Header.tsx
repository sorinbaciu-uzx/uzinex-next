"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

/* ───────────────────────────── NAV STRUCTURE ───────────────────────────── */

type SubItem = { label: string; href: string };
type CategoryGroup = { name: string; href: string; items: SubItem[] };
type NavItem =
  | { label: string; href: string; external?: boolean }
  | { label: string; href: string; type: "mega"; groups: CategoryGroup[] }
  | { label: string; href: string; type: "dropdown"; items: SubItem[] };

const CATALOG_GROUPS: CategoryGroup[] = [
  {
    name: "Intralogistică",
    href: "/#catalog",
    items: [
      { label: "Motostivuitoare diesel", href: "/#catalog" },
      { label: "Electrostivuitoare", href: "/#catalog" },
      { label: "Transpaleți electrici", href: "/#catalog" },
      { label: "Sisteme de rafturi", href: "/#catalog" },
    ],
  },
  {
    name: "Laser & CNC",
    href: "/#catalog",
    items: [
      { label: "Tăiere laser fibră", href: "/#catalog" },
      { label: "Centre CNC verticale", href: "/#catalog" },
      { label: "Strunguri CNC", href: "/#catalog" },
      { label: "Mașini de sudură", href: "/#catalog" },
    ],
  },
  {
    name: "Robotică & automatizare",
    href: "/#catalog",
    items: [
      { label: "Brațe robotice 6 axe", href: "/#catalog" },
      { label: "Celule de paletizare", href: "/#catalog" },
      { label: "Cobots colaborativi", href: "/#catalog" },
      { label: "Sisteme de viziune AI", href: "/#catalog" },
    ],
  },
  {
    name: "Utilaje grele",
    href: "/#catalog",
    items: [
      { label: "Excavatoare", href: "/#catalog" },
      { label: "Macarale & ridicare", href: "/#catalog" },
      { label: "Echipamente energetice", href: "/#catalog" },
      { label: "Cupe & atașamente", href: "/#catalog" },
    ],
  },
  {
    name: "Piese de schimb",
    href: "/#catalog",
    items: [
      { label: "Piese OEM", href: "/#catalog" },
      { label: "Filtre & lubrifianți", href: "/#catalog" },
      { label: "Kituri uzură", href: "/#catalog" },
      { label: "Componente hidraulice", href: "/#catalog" },
    ],
  },
  {
    name: "Service tehnic",
    href: "/#catalog",
    items: [
      { label: "Punere în funcțiune", href: "/#catalog" },
      { label: "Mentenanță preventivă", href: "/#catalog" },
      { label: "Reparații în garanție", href: "/#catalog" },
      { label: "Intervenție rapidă", href: "/#catalog" },
    ],
  },
  {
    name: "Apărare & securitate",
    href: "/#catalog",
    items: [
      { label: "Sisteme de supraveghere", href: "/#catalog" },
      { label: "Generatoare autonome", href: "/#catalog" },
      { label: "Adăposturi modulare", href: "/#catalog" },
      { label: "Simulatoare training", href: "/#catalog" },
    ],
  },
];

const RESURSE_ITEMS: SubItem[] = [
  { label: "Noutăți & comunicări", href: "/#noutati" },
  { label: "Galerie video", href: "/#galerie" },
  { label: "Întrebări frecvente", href: "/#qa" },
  { label: "Materiale utile", href: "/materiale-utile" },
];

const NAV: NavItem[] = [
  { label: "Acasă", href: "/" },
  { label: "Studii de caz", href: "/studii-de-caz" },
  {
    label: "Catalog tehnic",
    href: "/magazin",
    type: "mega",
    groups: CATALOG_GROUPS,
  },
  {
    label: "Resurse",
    href: "#",
    type: "dropdown",
    items: RESURSE_ITEMS,
  },
  { label: "Consultanță fonduri UE", href: "/consultanta-fonduri-europene" },
  { label: "Service", href: "/service" },
  { label: "Cariere", href: "/cariere" },
  { label: "Contact", href: "/#contact" },
];

/* ───────────────────────────── COMPONENT ───────────────────────────── */

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* ───── ANNOUNCEMENT BAR ───── */}
      <div className="text-white/90 text-xs relative z-10">
        <div className="container-x flex items-center justify-between py-2.5">
          <span className="opacity-80 hidden sm:inline">
            Sediu central: Parc Științific Tehnopolis, Bd. Poitiers nr. 10, Iași · Livrare națională
          </span>
          <span className="opacity-80 sm:hidden">Iași · Livrare națională</span>
          <div className="hidden md:flex items-center gap-5 opacity-80">
            <a href="tel:+40769081081" className="hover:opacity-100">
              +40 769 081 081
            </a>
            <span className="text-white/30">|</span>
            <a href="#">RO</a>
            <span className="text-white/30">/</span>
            <a href="#" className="opacity-50">
              EN
            </a>
          </div>
          <a href="tel:+40769081081" className="md:hidden opacity-80 hover:opacity-100">
            +40 769 081 081
          </a>
        </div>
      </div>

      {/* ───── STICKY HEADER ───── */}
      <header
        className="sticky top-0 z-50 text-white transition-colors duration-300"
        style={{
          background: scrolled || open || hovered ? "#082545" : "transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.08)" : "none",
        }}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="container-x flex items-center justify-between h-16 lg:h-20 gap-3">
          <a href="/" className="flex items-center gap-3 shrink-0">
            <Logo width={140} height={30} />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] text-white/85">
            {NAV.map((item) => {
              const isMega = "type" in item && item.type === "mega";
              const isDropdown = "type" in item && item.type === "dropdown";
              const hasChildren = isMega || isDropdown;

              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasChildren && setHovered(item.label)}
                >
                  <a
                    href={item.href}
                    target={"external" in item && item.external ? "_blank" : undefined}
                    rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                    className="hover:text-white transition flex items-center gap-1 py-1"
                  >
                    {item.label}
                    {hasChildren && (
                      <span className="text-[10px] mt-0.5 opacity-70">▾</span>
                    )}
                  </a>

                  {/* Dropdown panel */}
                  {isDropdown && hovered === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 min-w-[260px] mt-2 border border-white/10"
                      style={{ background: "#082545" }}
                    >
                      <ul className="py-2">
                        {(item as Extract<NavItem, { type: "dropdown" }>).items.map((sub) => (
                          <li key={sub.href}>
                            <a
                              href={sub.href}
                              className="block px-5 py-2.5 text-sm text-white/80 hover:text-uzx-orange hover:bg-white/5 transition"
                            >
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 lg:gap-3">
            <a
              href="#"
              className="hidden md:inline text-[13px] text-white/80 hover:text-white transition"
            >
              Autentificare
            </a>
            <a
              href="/#contact"
              className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-[11px] sm:text-xs lg:text-[13px] px-2.5 sm:px-3 lg:px-5 py-1.5 lg:py-2.5 transition whitespace-nowrap"
            >
              Discută cu un inginer
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={open}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white shrink-0"
            >
              <span
                className="block w-5 h-px bg-white transition-transform"
                style={{
                  transform: open ? "rotate(45deg) translate(4px, 4px)" : "none",
                }}
              />
              <span
                className="block w-5 h-px bg-white transition-opacity"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px bg-white transition-transform"
                style={{
                  transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none",
                }}
              />
            </button>
          </div>
        </div>

        {/* ───── MEGA MENU PANEL (desktop, below header) ───── */}
        <AnimatePresence>
          {hovered &&
            NAV.find((n) => n.label === hovered && "type" in n && n.type === "mega") && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:block absolute left-0 right-0 border-t border-white/10"
                style={{ background: "#082545" }}
              >
                <div className="container-x py-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
                    {CATALOG_GROUPS.map((group) => (
                      <div key={group.name}>
                        <a
                          href={group.href}
                          className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-4 block hover:text-white transition"
                        >
                          {group.name}
                        </a>
                        <ul className="space-y-2">
                          {group.items.map((sub) => (
                            <li key={sub.label}>
                              <a
                                href={sub.href}
                                className="text-sm text-white/75 hover:text-white hover:translate-x-1 inline-block transition"
                              >
                                {sub.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </header>

      {/* ───── MOBILE OVERLAY ───── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 pt-28 overflow-y-auto"
            style={{ background: "#082545" }}
          >
            <nav className="container-x flex flex-col gap-1 text-white pb-12">
              {NAV.map((item, i) => {
                const hasChildren = "type" in item && (item.type === "mega" || item.type === "dropdown");
                const expanded = mobileExpanded === item.label;
                const subItems =
                  "type" in item && item.type === "mega"
                    ? item.groups.flatMap((g) =>
                        g.items.map((it) => ({ ...it, group: g.name }))
                      )
                    : "type" in item && item.type === "dropdown"
                    ? item.items.map((it) => ({ ...it, group: "" }))
                    : [];

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="border-b border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <a
                        href={item.href}
                        target={"external" in item && item.external ? "_blank" : undefined}
                        rel={"external" in item && item.external ? "noopener noreferrer" : undefined}
                        onClick={() => !hasChildren && setOpen(false)}
                        className="serif text-xl py-4 flex-1 hover:text-uzx-orange transition"
                      >
                        {item.label}
                      </a>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(expanded ? null : item.label)
                          }
                          aria-label={expanded ? "Ascunde submeniu" : "Arată submeniu"}
                          className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition"
                        >
                          <span
                            className="text-xl transition-transform"
                            style={{ transform: expanded ? "rotate(45deg)" : "none" }}
                          >
                            +
                          </span>
                        </button>
                      )}
                    </div>
                    {hasChildren && expanded && (
                      <ul className="pl-4 pb-4 space-y-2">
                        {subItems.map((sub, idx) => (
                          <li key={`${item.label}-${sub.label}-${idx}`}>
                            <a
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="block py-1.5 text-sm text-white/75 hover:text-uzx-orange"
                            >
                              {"group" in sub && sub.group && (
                                <span className="text-[10px] uppercase tracking-widest text-white/40 mr-2 mono">
                                  {sub.group} ·
                                </span>
                              )}
                              {sub.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                );
              })}

              <motion.a
                href="#"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="serif text-xl py-4 border-b border-white/10 text-white/60 hover:text-white transition"
              >
                Autentificare
              </motion.a>
              <motion.a
                href="tel:+40769081081"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="mt-6 text-uzx-orange serif text-2xl"
              >
                (+40) 769 081 081
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
