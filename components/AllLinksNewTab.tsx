"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Setează target="_blank" + rel="noopener noreferrer" pe TOATE link-urile
 * externe și interne din pagină, după fiecare navigare.
 *
 * Excluderi explicite:
 * - href="#..."       — anchori interni (scroll on-page), nu deschid tab nou
 * - href="javascript:" — link-uri cu acțiuni JS
 * - a[data-same-tab]  — escape hatch pentru viitor (link-uri forțate same-tab)
 *
 * Notă: formularele (contact, oferta, admin login) NU sunt afectate — ele
 * folosesc tag-uri <form>, nu <a>.
 */
export function AllLinksNewTab() {
  const pathname = usePathname();

  useEffect(() => {
    const apply = () => {
      document.querySelectorAll<HTMLAnchorElement>("a").forEach((a) => {
        const href = a.getAttribute("href");
        if (!href) return;
        if (href.startsWith("#")) return;
        if (href.startsWith("javascript:")) return;
        if (a.hasAttribute("data-same-tab")) return;
        if (a.hasAttribute("target")) return; // respect existing target
        a.setAttribute("target", "_blank");
        a.setAttribute("rel", "noopener noreferrer");
      });
    };

    // Run after paint to catch just-rendered elements
    const raf = requestAnimationFrame(apply);
    // Run again after a short delay for late-hydrating client components
    const t = setTimeout(apply, 300);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
