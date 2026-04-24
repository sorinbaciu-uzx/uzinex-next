import Image from "next/image";

type Application = {
  title: string;
  caption?: string;
  image: string;
};

const icons = [
  function FurnitureIcon() {
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 20h32v20H8z" />
        <path d="M12 20V10h24v10" />
        <path d="M15 40v-7M33 40v-7" />
        <path d="M18 15h12" />
      </svg>
    );
  },
  function MoldIcon() {
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 10h22v24H13z" />
        <path d="M9 38h30" />
        <path d="M18 15h12v8H18z" />
        <path d="M18 28h12" />
        <path d="M14 6h20" />
      </svg>
    );
  },
  function NavalIcon() {
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 31h32l-5 8H13z" />
        <path d="M15 31l4-10h10l4 10" />
        <path d="M22 21V12h8" />
        <path d="M11 39c3 2 6 2 9 0 3 2 6 2 9 0 3 2 6 2 9 0" />
      </svg>
    );
  },
  function WorkshopIcon() {
    return (
      <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 34h32" />
        <path d="M13 34l4-18h14l4 18" />
        <path d="M20 16V8h8v8" />
        <path d="M17 24h18" />
        <path d="M24 24v10" />
      </svg>
    );
  },
];

export function ApplicationsGrid({ items }: { items: Application[] }) {
  if (items.length === 0) return null;

  return (
    <section className="py-8 lg:py-10 bg-white border-b border-ink-100">
      <div className="container-x">
        <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-2">
          — Industrii deservite
        </div>

        <div className="mb-5 flex items-center gap-4">
          <h2 className="text-[24px] lg:text-[26px] leading-tight font-bold text-[#0b2b66]">
            Aplicații recomandate
          </h2>
          <span className="h-[3px] w-14 bg-uzx-orange" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.slice(0, 4).map((app, index) => {
            const Icon = icons[index % icons.length];

            return (
              <article
                key={app.title}
                className="group border border-ink-200 bg-white overflow-hidden transition hover:border-uzx-orange hover:shadow-lg"
              >
                <div className="relative h-[145px] bg-ink-50 overflow-hidden">
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="grid grid-cols-[72px_1fr] gap-3 px-4 py-4 min-h-[125px]">
                  <div className="flex items-start justify-center pt-1 text-uzx-orange">
                    <Icon />
                  </div>

                  <div>
                    <h3 className="text-[17px] leading-snug font-bold text-[#0b2b66]">
                      {app.title}
                    </h3>

                    {app.caption && (
                      <p className="mt-2 text-[14px] leading-relaxed text-ink-600">
                        {app.caption}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}