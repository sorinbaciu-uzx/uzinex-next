const KPIS = [
  { value: "+30", label: "Ani expertiză tehnică" },
  { value: "+500", label: "Soluții în portofoliu" },
  { value: "40+", label: "Industrii deservite" },
  { value: "100%", label: "Proiecte conforme UE & PNRR" },
];

export function AuthorityStrip() {
  return (
    <section className="border-b hairline bg-ink-50">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x hairline">
        {KPIS.map((k, i) => (
          <div key={i} className="py-12 px-4 lg:px-8">
            <div className="serif text-5xl text-uzx-blue num">{k.value}</div>
            <div className="text-xs uppercase tracking-wider text-ink-500 mt-3">
              {k.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
