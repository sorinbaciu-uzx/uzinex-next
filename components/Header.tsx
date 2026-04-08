"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";

const NAV_LINKS: { href: string; label: string; external?: boolean }[] = [
  { href: "/magazin", label: "Catalog tehnic", external: true },
  { href: "#solutii", label: "Soluții recomandate" },
  { href: "#testimoniale", label: "Clienți" },
  { href: "#qa", label: "Întrebări frecvente" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
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
          <span className="opacity-80 sm:hidden">
            Iași · Livrare națională
          </span>
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
          background: scrolled || open ? "#082545" : "transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.08)" : "none",
        }}
      >
        <div className="container-x flex items-center justify-between h-16 lg:h-20 gap-3">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <Logo width={140} height={30} />
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-sm text-white/80">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
                className="hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 lg:gap-3">
            <a href="#" className="hidden md:inline text-sm text-white/80 hover:text-white">
              Autentificare
            </a>
            <a
              href="#contact"
              className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-[11px] sm:text-xs lg:text-sm px-2.5 sm:px-3 lg:px-5 py-1.5 lg:py-2.5 transition whitespace-nowrap"
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
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 pt-32"
            style={{ background: "#082545" }}
          >
            <nav className="container-x flex flex-col gap-2 text-white">
              {NAV_LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className="serif text-2xl py-4 border-b border-white/10 hover:text-uzx-orange transition"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="#"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="serif text-2xl py-4 border-b border-white/10 text-white/60"
              >
                Autentificare
              </motion.a>
              <motion.a
                href="tel:+40769081081"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-6 text-uzx-orange serif text-3xl"
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
