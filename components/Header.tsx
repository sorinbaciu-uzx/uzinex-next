"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="text-white/90 text-xs relative z-10">
        <div className="container-x flex items-center justify-between py-2.5">
          <span className="opacity-80">
            Sediu central: Parc Științific Tehnopolis, Bd. Poitiers nr. 10, Iași · Livrare națională
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
        </div>
      </div>

      <header
        className="sticky top-0 z-50 text-white transition-colors duration-300"
        style={{
          background: scrolled ? "#082545" : "transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.08)" : "none",
        }}
      >
        <div className="container-x flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <Logo />
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-sm text-white/80">
            <a href="#catalog" className="hover:text-white">Catalog tehnic</a>
            <a href="#solutii" className="hover:text-white">Soluții recomandate</a>
            <a href="#testimoniale" className="hover:text-white">Clienți</a>
            <a href="#qa" className="hover:text-white">Întrebări frecvente</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden md:inline text-sm text-white/80 hover:text-white">
              Autentificare
            </a>
            <a
              href="#contact"
              className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-sm px-5 py-2.5 transition"
            >
              Discută cu un inginer
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
