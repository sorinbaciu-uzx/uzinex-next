"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

/* ───────────────────────────── NAV STRUCTURE ───────────────────────────── */

type SubItem = { label: string; href: string };
type CategoryGroup = { name: string; href: string; items: SubItem[] };
type NavItem =
  | { label: string; href: string }
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
  { label: "Credite & leasing", href: "/credite-leasing" },
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
  { label: "Consultanță fonduri europene", href: "/consultanta-fonduri-europene" },
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
          <nav className="hidden xl:flex items-center gap-7 text-sm text-white/85">
            {NAV.map((item) => {
              const isMega = "type" in item && item.type === "mega";
              const isDropdown = "type" in item && item.type === "dropdown";
              const hasDropdown = isMega || isDropdown;
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => hasDropdown && setHovered(item.label)}
                >
                  <a
                    href={item.href}
                    className="hover:text-white transition flex items-center gap-1.5 whitespace-nowrap"
                  >
                    {item.label}
                    {hasDropdown && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className="opacity-60"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    )}
                  </a>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            <a href="#" className="hidden md:inline text-sm text-white/80 hover:text-white">
              Autentificare
            </a>
            <a
              href="/#contact"
              className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-[11px] sm:text-xs lg:text-sm px-2.5 sm:px-3 lg:px-5 py-1.5 lg:py-2.5 transition whitespace-nowrap"
            >
              Discută cu un inginer
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              aria-expanded={open}
              className="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white shrink-0"
            >
              <span
                className="block w-5 h-px bg-white transition-transform"
                style={{ transform: open ? "rotate(45deg) translate(4px, 4px)" : "none" }}
              />
              <span
                className="block w-5 h-px bg-white transition-opacity"
                style={{ opacity: open ? 0 : 1 }}
              />
              <span
                className="block w-5 h-px bg-white transition-transform"
                style={{ transform: open ? "rotate(-45deg) translate(4px, -4px)" : "none" }}
              />
            </button>
          </div>
        </div>

        {/* Desktop mega/dropdown panels */}
        <AnimatePresence>
          {hovered &&
            (() => {
              const item = NAV.find((i) => i.label === hovered);
              if (!item || !("type" in item)) return null;
              if (item.type === "mega") {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 top-full border-t border-white/10"
                    style={{ background: "#082545" }}
                  >
                    <div className="container-x py-10">
                      <div className="grid grid-cols-4 gap-10">
                        {item.groups.map((g) => (
                          <div key={g.name}>
                            <a
                              href={g.href}
                              className="serif text-sm text-uzx-orange mb-4 block hover:text-white transition"
                            >
                              {g.name}
                            </a>
                            <ul className="space-y-2">
                              {g.items.map((s) => (
                                <li key={s.label}>
                                  <a
                                    href={s.href}
                                    className="text-xs text-white/70 hover:text-white transition"
                                  >
                                    {s.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              }
              if (item.type === "dropdown") {
                return (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 top-full border-t border-white/10"
                    style={{ background: "#082545" }}
                  >
                    <div className="container-x py-6">
                      <ul className="flex gap-10">
                        {item.items.map((s) => (
                          <li key={s.label}>
                            <a
                              href={s.href}
                              className="text-sm text-white/80 hover:text-white transition"
                            >
                              {s.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              }
              return null;
            })()}
        </AnimatePresence>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="xl:hidden fixed inset-0 z-40 pt-28 overflow-y-auto"
            style={{ background: "#082545" }}
          >
            <nav className="container-x pb-20 flex flex-col text-white">
              {NAV.map((item, idx) => {
                const isMega = "type" in item && item.type === "mega";
                const isDropdown = "type" in item && item.type === "dropdown";
                const hasChildren = isMega || isDropdown;
                const isExpanded = mobileExpanded === item.label;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04, duration: 0.3 }}
                    className="border-b border-white/10"
                  >
                    {hasChildren ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(isExpanded ? null : item.label)
                          }
                          className="w-full flex items-center justify-between py-4 text-left serif text-xl"
                        >
                          <span>{item.label}</span>
                          <span
                            className="text-uzx-orange text-2xl font-light transition-transform"
                            style={{ transform: isExpanded ? "rotate(45deg)" : "none" }}
                          >
                            +
                          </span>
                        </button>
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="pb-5 pl-4 space-y-4">
                                {isMega &&
                                  item.groups.map((g) => (
                                    <div key={g.name}>
                                      <div className="text-xs uppercase tracking-widest text-uzx-orange mb-2 mono">
                                        {g.name}
                                      </div>
                                      <ul className="space-y-1.5 pl-2">
                                        {g.items.map((s) => (
                                          <li key={s.label}>
                                            <a
                                              href={s.href}
                                              onClick={() => setOpen(false)}
                                              className="text-sm text-white/70 hover:text-white"
                                            >
                                              {s.label}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                {isDropdown &&
                                  item.items.map((s) => (
                                    <a
                                      key={s.label}
                                      href={s.href}
                                      onClick={() => setOpen(false)}
                                      className="block text-base text-white/80 hover:text-white py-1"
                                    >
                                      {s.label}
                                    </a>
                                  ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block py-4 serif text-xl hover:text-uzx-orange transition"
                      >
                        {item.label}
                      </a>
                    )}
                  </motion.div>
                );
              })}

              <motion.a
                href="#"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="py-4 serif text-xl text-white/60 border-b border-white/10"
              >
                Autentificare
              </motion.a>
              <motion.a
                href="tel:+40769081081"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
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
