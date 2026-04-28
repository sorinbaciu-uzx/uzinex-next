export type AuthorityData = {
  items: { value: string; label: string }[];
};

const KPIS: { value: string; label: string }[] = [
  { value: "+30", label: "Ani expertiză tehnică" },
  { value: "+500", label: "Soluții în portofoliu" },
  { value: "40+", label: "Industrii deservite" },
  { value: "0", label: "Probleme în audituri europene" },
];

export const AUTHORITY_DEFAULT: AuthorityData = { items: KPIS };

export function AuthorityStrip({ data }: { data?: AuthorityData | null }) {
  const items = data?.items ?? KPIS;
  return (
    <section className="border-b hairline bg-ink-50">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {items.map((k, i) => {
          const isMobileCol2 = i % 2 === 1;
          const isMobileRow2 = i >= 2;
          const needsDesktopLeft = i >= 1;
          const cls = [
            "py-8 lg:py-10 px-4 lg:px-8",
            isMobileCol2
              ? "border-l hairline"
              : needsDesktopLeft
                ? "lg:border-l hairline"
                : "",
            isMobileRow2 ? "border-t hairline lg:border-t-0" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <div key={i} className={cls}>
              <div className="serif text-4xl lg:text-5xl text-uzx-blue num">{k.value}</div>
              <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-2">
                {k.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
