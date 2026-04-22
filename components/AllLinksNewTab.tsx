"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Setează target="_blank" pe toate link-urile DOAR pe desktop.
 * Pe mobil (< 1024px) linkurile păstrează comportamentul default (same tab),
 * pentru că tab-urile de browser mobile sunt o experiență mai slabă și
 * utilizatorul trebuie să revină la tab-ul anterior prin gesturi manuale.
 *
 * Detecție desktop: `matchMedia('(min-width: 1024px) and (hover: hover)')`
 * → ecran minim 1024px ȘI are capabilitate de hover (mouse precise).
 *
 * Excluderi: href="#...", javascript:, a[data-same-tab].
 * Marchează link-urile pe care LE-am modificat cu data-uzx-blank="1",
 * ca să le putem reverti corect când viewport se schimbă.
 */
export function AllLinksNewTab() {
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");

    const applyOrRevert = () => {
      const isDesktop = mq.matches;
      document.querySelectorAll<HTMLAnchorElement>("a").forEach((a) => {
        const href = a.getAttribute("href");
        if (!href) return;
        if (href.startsWith("#")) return;
        if (href.startsWith("javascript:")) return;
        if (a.hasAttribute("data-same-tab")) return;

        const weAddedIt = a.getAttribute("data-uzx-blank") === "1";
        const hasTarget = a.hasAttribute("target");

        if (isDesktop) {
          // Desktop: add target=_blank if not already set
          if (!hasTarget) {
            a.setAttribute("target", "_blank");
            a.setAttribute("rel", "noopener noreferrer");
            a.setAttribute("data-uzx-blank", "1");
          }
        } else {
          // Mobile: revert only what WE added
          if (weAddedIt) {
            a.removeAttribute("target");
            a.removeAttribute("rel");
            a.removeAttribute("data-uzx-blank");
          }
        }
      });
    };

    // Initial + on every route change
    const raf = requestAnimationFrame(applyOrRevert);
    const t = setTimeout(applyOrRevert, 300);

    // React to viewport changes (resize, orientation)
    const handleChange = () => applyOrRevert();
    mq.addEventListener("change", handleChange);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      mq.removeEventListener("change", handleChange);
    };
  }, [pathname]);

  return null;
}
