/**
 * Bandă cu cele 4 beneficii Uzinex, afișată sub hero-ul fiecărui produs.
 * Rolul: reîntărirea propunerii de valoare a companiei, fără a polua
 * hero-ul cu info generale (acolo afișăm specs tehnice dinamice).
 */
export function BenefitsStrip() {
  const items = [
    {
      title: "60 luni garanție",
      sub: "Producător + service inclus",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2l9 4v6c0 5.5-3.8 9.8-9 11-5.2-1.2-9-5.5-9-11V6l9-4z" />
          <path d="M8.5 12l2.5 2.5L16 9" />
        </svg>
      ),
    },
    {
      title: "Transport & montaj",
      sub: "Gratuit în toată România",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M1 13h13V5H1zM14 8h4l4 5v5h-8" />
          <circle cx="6" cy="18" r="2.5" />
          <circle cx="17" cy="18" r="2.5" />
        </svg>
      ),
    },
    {
      title: "SEAP / SICAP",
      sub: "Eligibil achiziții publice",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 21h18M5 21V10l7-5 7 5v11M10 21v-6h4v6" />
        </svg>
      ),
    },
    {
      title: "Fonduri europene",
      sub: "PNRR · POR · Tranziție Justă",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.8 2.8 4.5 6 4.5 9S14.8 21 12 21s-4.5-3-4.5-6S9.2 5.8 12 3z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="border-b border-ink-100 bg-ink-50/70">
      <div className="container-x">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-ink-200 border-l border-r border-ink-200">
          {items.map((it) => (
            <div
              key={it.title}
              className="flex items-center gap-3 px-4 py-4 lg:px-6 lg:py-5 border-b border-ink-200 lg:border-b-0 last:border-b-0"
            >
              <div className="shrink-0 text-uzx-blue">{it.icon}</div>
              <div className="min-w-0">
                <div className="text-xs lg:text-sm font-medium text-ink-900 leading-tight">
                  {it.title}
                </div>
                <div className="text-[11px] text-ink-500 leading-tight mt-0.5 truncate">
                  {it.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
