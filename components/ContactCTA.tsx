export type ContactCTAData = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  titleHighlight: string;
  description: string;
  phoneLabel: string;
  phone: string;
  emailLabel: string;
  email: string;
  addressLabel: string;
  addressLine1: string;
  addressLine2: string;
  ctaLabel: string;
  ctaHref: string;
};

export const CONTACT_CTA_DEFAULT: ContactCTAData = {
  eyebrow: "09 / Contact",
  titleLine1: "Construim împreună",
  titleLine2: "următorul tău",
  titleHighlight: "proiect.",
  description:
    "Contactează echipa noastră și primești o ofertă personalizată în maxim 24 de ore lucrătoare.",
  phoneLabel: "Telefon",
  phone: "+40 769 081 081",
  emailLabel: "Email",
  email: "info@uzinex.ro",
  addressLabel: "Sediu",
  addressLine1: "Parc Științific & Tehnologic Tehnopolis",
  addressLine2: "Bd. Poitiers nr. 10, 700671 Iași",
  ctaLabel: "Discută cu un inginer",
  ctaHref: "/contact",
};

export function ContactCTA({ data }: { data?: ContactCTAData | null }) {
  const d = data ?? CONTACT_CTA_DEFAULT;
  return (
    <section id="contact" className="border-b hairline py-10 lg:py-14">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">{CONTACT_CTA_DEFAULT.eyebrow}</div>
          <h2 className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.92]" style={{ letterSpacing: "-0.03em" }}>
            {d.titleLine1}<br />
            {d.titleLine2} <span className="font-light text-uzx-orange">{d.titleHighlight}</span>
          </h2>
          <p className="text-ink-500 text-lg max-w-xl mt-8 leading-relaxed">
            {d.description}
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 space-y-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-3">{d.phoneLabel}</div>
            <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="serif text-2xl text-ink-900 hover:text-ink-600 transition">
              {d.phone}
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-3">{d.emailLabel}</div>
            <a href={`mailto:${d.email}`} className="serif text-2xl text-ink-900 hover:text-ink-600 transition">
              {d.email}
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-3">{d.addressLabel}</div>
            <div className="text-ink-700">
              {d.addressLine1}
              <br />
              {d.addressLine2}
            </div>
          </div>
          <a
            href={d.ctaHref}
            className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-7 py-4 inline-flex items-center gap-3 group transition"
          >
            {d.ctaLabel}
            <span className="group-hover:translate-x-1 transition">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
