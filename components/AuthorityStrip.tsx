const KPIS = [
  { value: "+30", label: "Ani expertiză tehnică" },
  { value: "+500", label: "Soluții în portofoliu" },
  { value: "40+", label: "Industrii deservite" },
  { value: "0", label: "Probleme în audituri europene" },
];

export function AuthorityStrip() {
  return (
    <section className="border-b hairline bg-ink-50">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x hairline">
        {KPIS.map((k, i) => (
          <div key={i} className="py-8 lg:py-10 px-4 lg:px-8">
            <div className="serif text-4xl lg:text-5xl text-uzx-blue num">{k.value}</div>
            <div className="text-[11px] uppercase tracking-wider text-ink-500 mt-2">
              {k.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
