"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n/I18nProvider";

/* ───────────────────────────── NAV STRUCTURE ───────────────────────────── */

type SubItem = { label: string; href: string };
type CategoryGroup = { name: string; href: string; items: SubItem[] };
type NavItem =
  | { label: string; href: string; labelKey?: string; external?: boolean }
  | { label: string; href: string; labelKey?: string; type: "mega"; groups: CategoryGroup[] }
  | { label: string; href: string; labelKey?: string; type: "dropdown"; items: SubItem[] };

// Helper to build /magazin URLs with encoded query params
const mag = (cat?: string, sub?: string) => {
  if (!cat) return "/magazin";
  const params = new URLSearchParams();
  params.set("cat", cat);
  if (sub) params.set("sub", sub);
  return `/magazin?${params.toString()}`;
};

const CATALOG_GROUPS: CategoryGroup[] = [
  {
    name: "Utilaje de construcții",
    href: mag("Utilaje de construcții"),
    items: [
      { label: "Excavatoare", href: mag("Utilaje de construcții", "Excavatoare") },
      { label: "Concasoare", href: mag("Utilaje de construcții", "Concasoare") },
      { label: "Accesorii utilaje de construcții", href: mag("Utilaje de construcții", "Accesorii utilaje de construcții") },
    ],
  },
  {
    name: "Utilaje CNC",
    href: mag("Utilaje CNC"),
    items: [
      { label: "CNC metal", href: mag("Utilaje CNC", "CNC metal") },
      { label: "CNC mobilă", href: mag("Utilaje CNC", "CNC mobilă") },
      { label: "CNC piatră", href: mag("Utilaje CNC", "CNC piatră") },
      { label: "Router CNC", href: mag("Utilaje CNC", "Router CNC") },
      { label: "CNC diverse", href: mag("Utilaje CNC", "CNC diverse") },
    ],
  },
  {
    name: "Strunguri",
    href: mag("Strunguri"),
    items: [
      { label: "Strunguri CNC", href: mag("Strunguri", "Strunguri CNC") },
      { label: "Strunguri universale", href: mag("Strunguri", "Strunguri universale") },
      { label: "Strunguri heavy duty", href: mag("Strunguri", "Strunguri heavy duty") },
      { label: "Mini strunguri", href: mag("Strunguri", "Mini strunguri") },
    ],
  },
  {
    name: "Mașini de tăiere laser",
    href: mag("Mașini de tăiere laser"),
    items: [
      { label: "Laser fibră", href: mag("Mașini de tăiere laser", "Laser fibră") },
      { label: "Laser cu bobină", href: mag("Mașini de tăiere laser", "Laser cu bobină") },
    ],
  },
  {
    name: "Mașini de prelucrare lemn",
    href: mag("Mașini de prelucrare lemn"),
    items: [
      { label: "Mașini de aplicat cant", href: mag("Mașini de prelucrare lemn", "Mașini de aplicat cant") },
      { label: "Mașini pentru uși", href: mag("Mașini de prelucrare lemn", "Mașini pentru uși") },
      { label: "Fierăstraie pentru lemn", href: mag("Mașini de prelucrare lemn", "Fierăstraie pentru lemn") },
      { label: "Mașini de finisat lemn", href: mag("Mașini de prelucrare lemn", "Mașini de finisat lemn") },
    ],
  },
  {
    name: "Echipamente de ambalare",
    href: mag("Echipamente de ambalare"),
    items: [
      { label: "Fabricare cutii carton", href: mag("Echipamente de ambalare", "Fabricare cutii carton") },
      { label: "Ambalare paleți", href: mag("Echipamente de ambalare", "Ambalare paleți") },
      { label: "Ambalare termocontractabilă", href: mag("Echipamente de ambalare", "Ambalare termocontractabilă") },
      { label: "Sigilare și formare cutii", href: mag("Echipamente de ambalare", "Sigilare și formare cutii") },
      { label: "Mașini de legat cu bandă", href: mag("Echipamente de ambalare", "Mașini de legat cu bandă") },
      { label: "Ambalare diverse", href: mag("Echipamente de ambalare", "Ambalare diverse") },
    ],
  },
  {
    name: "Etichetare & dozare",
    href: mag("Echipamente de etichetare și dozare"),
    items: [
      { label: "Mașini de etichetare", href: mag("Echipamente de etichetare și dozare", "Mașini de etichetare") },
      { label: "Mașini de umplere și plafonare", href: mag("Echipamente de etichetare și dozare", "Mașini de umplere și plafonare") },
      { label: "Mașini de dezmembrat", href: mag("Echipamente de etichetare și dozare", "Mașini de dezmembrat") },
    ],
  },
  {
    name: "Reciclare",
    href: mag("Echipamente de reciclare"),
    items: [
      { label: "Mașini de balotat și presare", href: mag("Echipamente de reciclare", "Mașini de balotat și presare") },
      { label: "Mașini de tocat și mărunțit", href: mag("Echipamente de reciclare", "Mașini de tocat și mărunțit") },
      { label: "Echipamente de separare", href: mag("Echipamente de reciclare", "Echipamente de separare") },
      { label: "Echipamente auxiliare pentru reciclare", href: mag("Echipamente de reciclare", "Echipamente auxiliare pentru reciclare") },
    ],
  },
  {
    name: "Inspecție industrială",
    href: mag("Echipamente de inspecție industrială"),
    items: [
      { label: "Roboți CCTV pentru inspecția conductelor", href: mag("Echipamente de inspecție industrială", "Roboți CCTV pentru inspecția conductelor") },
      { label: "Camere push pentru inspecția conductelor", href: mag("Echipamente de inspecție industrială", "Camere push pentru inspecția conductelor") },
      { label: "Camere PTZ / periscop pentru cămine și canalizare", href: mag("Echipamente de inspecție industrială", "Camere PTZ / periscop pentru cămine și canalizare") },
      { label: "Videoscoape industriale", href: mag("Echipamente de inspecție industrială", "Videoscoape industriale") },
      { label: "Camere NDT și inspecții speciale", href: mag("Echipamente de inspecție industrială", "Camere NDT și inspecții speciale") },
    ],
  },
  {
    name: "Echipamente energetice",
    href: mag("Echipamente energetice"),
    items: [
      { label: "Pompe de căldură", href: mag("Echipamente energetice", "Pompe de căldură") },
    ],
  },
];

const RESURSE_ITEMS: SubItem[] = [
  { label: "Noutăți & comunicări", href: "/noutati" },
  { label: "Newsroom — story-uri", href: "/newsroom" },
  { label: "Anomalii săptămânale", href: "/newsroom/anomalii" },
  { label: "Echipa", href: "/echipa" },
  { label: "Materiale utile", href: "/materiale-utile" },
];

const SERVICE_ITEMS: SubItem[] = [
  { label: "Service inclus la livrare", href: "/service/inclus-la-livrare" },
  { label: "Abonamente Service", href: "/service/abonamente" },
  { label: "Manual de service cu AI", href: "/service/manual-ai" },
];

const FINANTARE_ITEMS: SubItem[] = [
  { label: "Credite & leasing", href: "/finantare/credite-leasing" },
  {
    label: "Finanțare europeană & guvernamentală",
    href: "/finantare/europeana-guvernamentala",
  },
  { label: "Credit furnizor", href: "/finantare/credit-furnizor" },
];

const NAV: NavItem[] = [
  {
    label: "Echipamente",
    labelKey: "nav.echipamente",
    href: "/magazin",
    type: "mega",
    groups: CATALOG_GROUPS,
  },
  {
    label: "Industry 4.0",
    labelKey: "nav.industry",
    href: "/industry-4.0",
    type: "dropdown",
    items: [
      { label: "IIoT & Monitorizare", href: "/industry-4.0/iiot-monitorizare" },
      { label: "Robotică colaborativă", href: "/industry-4.0/robotica-colaborativa" },
      { label: "Mentenanță predictivă", href: "/industry-4.0/mentenanta-predictiva" },
      { label: "Inspecție optică", href: "/industry-4.0/inspectie-optica" },
      { label: "Edge Computing & MES", href: "/industry-4.0/edge-computing-mes" },
      { label: "Software industrial", href: "/industry-4.0/software-industrial" },
    ],
  },
  { label: "Studii de caz", labelKey: "nav.studii", href: "/studii-de-caz" },
  {
    label: "Service",
    labelKey: "nav.service",
    href: "/service",
    type: "dropdown",
    items: SERVICE_ITEMS,
  },
  {
    label: "Finanțare",
    labelKey: "nav.finantare",
    href: "/finantare",
    type: "dropdown",
    items: FINANTARE_ITEMS,
  },
  {
    label: "Resurse",
    labelKey: "nav.resurse",
    href: "#",
    type: "dropdown",
    items: RESURSE_ITEMS,
  },
  { label: "Cariere", labelKey: "nav.cariere", href: "/cariere" },
  { label: "Contact", labelKey: "nav.contact", href: "/contact" },
];

/* ───────────────────────────── COMPONENT ───────────────────────────── */

export function Header({ solid = false }: { solid?: boolean } = {}) {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileGroupExpanded, setMobileGroupExpanded] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const navLabel = (item: NavItem) =>
    item.labelKey ? t(item.labelKey, item.label) : item.label;

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
      <div
        className="text-white/90 text-xs relative z-10"
        style={solid ? { background: "#082545" } : undefined}
      >
        <div className="container-x flex items-center justify-between py-2.5 gap-3">
          <span className="opacity-80 hidden sm:inline">
            {t("header.announcement")}
          </span>
          <span className="opacity-80 sm:hidden">
            {t("header.announcementShort")}
          </span>
          <div className="hidden md:flex items-center gap-5 opacity-80">
            <a href="tel:+40769081081" className="hover:opacity-100">
              +40 769 081 081
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
          background:
            solid || scrolled || open || hovered ? "#082545" : "transparent",
          boxShadow:
            solid || scrolled ? "0 1px 0 rgba(255,255,255,0.08)" : "none",
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
                    {navLabel(item)}
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
              href="/autentificare"
              className="hidden md:inline text-[13px] text-white/80 hover:text-white transition"
            >
              {t("header.login")}
            </a>
            <a
              href="/contact"
              className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-[11px] sm:text-xs lg:text-[13px] px-2.5 sm:px-3 lg:px-5 py-1.5 lg:py-2.5 transition whitespace-nowrap"
            >
              {t("header.cta")}
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t("header.closeMenu") : t("header.openMenu")}
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
                <MegaMenuContent />
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
                const isMega = "type" in item && item.type === "mega";
                const isDropdown = "type" in item && item.type === "dropdown";
                const hasChildren = isMega || isDropdown;
                const expanded = mobileExpanded === item.label;

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
                        {navLabel(item)}
                      </a>
                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => {
                            setMobileExpanded(expanded ? null : item.label);
                            setMobileGroupExpanded(null);
                          }}
                          aria-label={expanded ? t("header.closeSubmenu") : t("header.openSubmenu")}
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

                    {/* Mega menu — 2-level accordion (categories → subcategories) */}
                    {isMega && expanded && (
                      <ul className="pb-3">
                        {(item as Extract<NavItem, { type: "mega" }>).groups.map((g) => {
                          const groupOpen = mobileGroupExpanded === g.name;
                          return (
                            <li key={g.name} className="border-t border-white/5">
                              <div className="flex items-center justify-between pl-4">
                                <a
                                  href={g.href}
                                  onClick={() => setOpen(false)}
                                  className="flex-1 py-3 text-[15px] text-white/85 hover:text-uzx-orange transition"
                                >
                                  {g.name}
                                </a>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setMobileGroupExpanded(groupOpen ? null : g.name)
                                  }
                                  aria-label={
                                    groupOpen ? t("header.closeSubmenu") : t("header.openSubmenu")
                                  }
                                  className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition"
                                >
                                  <span
                                    className="text-lg transition-transform"
                                    style={{ transform: groupOpen ? "rotate(45deg)" : "none" }}
                                  >
                                    +
                                  </span>
                                </button>
                              </div>
                              {groupOpen && (
                                <ul className="pl-8 pr-4 pb-3 space-y-1.5">
                                  {g.items.map((sub) => (
                                    <li key={sub.href}>
                                      <a
                                        href={sub.href}
                                        onClick={() => setOpen(false)}
                                        className="block py-1.5 text-sm text-white/70 hover:text-uzx-orange transition"
                                      >
                                        {sub.label}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {/* Dropdown — single-level list */}
                    {isDropdown && expanded && (
                      <ul className="pl-4 pb-4 space-y-2">
                        {(item as Extract<NavItem, { type: "dropdown" }>).items.map((sub) => (
                          <li key={sub.href}>
                            <a
                              href={sub.href}
                              onClick={() => setOpen(false)}
                              className="block py-1.5 text-sm text-white/75 hover:text-uzx-orange"
                            >
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
                href="/autentificare"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="serif text-xl py-4 border-b border-white/10 text-white/60 hover:text-white transition"
              >
                {t("header.login")}
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

/* ─── MEGA MENU: left rail (categories) + right panel (subcategories) ─── */
function MegaMenuContent() {
  const { t } = useI18n();
  const [activeGroup, setActiveGroup] = useState(CATALOG_GROUPS[0]?.name);
  const group = CATALOG_GROUPS.find((g) => g.name === activeGroup) ?? CATALOG_GROUPS[0];

  return (
    <div className="container-x py-8">
      <div className="grid grid-cols-12 gap-0 min-h-[380px]">
        {/* LEFT RAIL — categories */}
        <aside className="col-span-4 border-r border-white/10 pr-6">
          <div className="text-[10px] uppercase tracking-[0.22em] text-white/60 mono mb-4 px-3">
            {t("mega.categorii")}
          </div>
          <ul className="space-y-0.5">
            {CATALOG_GROUPS.map((g) => {
              const isActive = activeGroup === g.name;
              return (
                <li key={g.name}>
                  <a
                    href={g.href}
                    onMouseEnter={() => setActiveGroup(g.name)}
                    onFocus={() => setActiveGroup(g.name)}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 text-sm transition ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <span>{g.name}</span>
                    <span
                      className={`text-xs transition ${
                        isActive ? "text-uzx-orange" : "text-white/20"
                      }`}
                    >
                      →
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* RIGHT PANEL — subcategories of active category */}
        <div className="col-span-8 pl-8">
          <div className="flex items-baseline justify-between mb-5">
            <div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-uzx-orange mono mb-1">
                {t("mega.subcategorii")}
              </div>
              <a
                href={group.href}
                className="serif text-xl text-white hover:text-uzx-orange transition"
                style={{ letterSpacing: "-0.02em" }}
              >
                {group.name}
              </a>
            </div>
            <a
              href={group.href}
              className="text-[11px] mono uppercase tracking-wider text-white/70 hover:text-white transition"
            >
              {t("mega.vezi")} →
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
            {group.items.map((sub) => (
              <li key={sub.label}>
                <a
                  href={sub.href}
                  className="group flex items-center gap-3 py-2 text-sm text-white/75 hover:text-white transition"
                >
                  <span className="w-1 h-1 bg-uzx-orange/40 group-hover:bg-uzx-orange transition shrink-0" />
                  <span className="group-hover:translate-x-1 transition">
                    {sub.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
