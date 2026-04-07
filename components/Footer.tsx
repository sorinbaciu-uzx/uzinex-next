import { Logo } from "./Logo";

const MENU = [
  { label: "Acasă", href: "#" },
  { label: "Studii de caz", href: "#" },
  { label: "Catalog tehnic", href: "#catalog" },
  { label: "Soluții recomandate", href: "#solutii" },
  { label: "Informații utile", href: "#qa" },
  { label: "Contact", href: "#contact" },
];

const CATEGORIES = [
  "Utilaje de construcții",
  "Echipamente de ambalare",
  "Echipamente de etichetare & dozare",
  "Echipamente de reciclare",
  "Utilaje CNC",
  "Strunguri",
  "Mașini de prelucrare lemn",
  "Mașini de tăiere laser",
  "Echipamente energetice",
  "Echipamente de inspecție industrială",
];

const GDPR_LINKS = [
  "Politica de confidențialitate",
  "Termeni și condiții",
  "Politica de livrare",
  "Politica de retur",
  "Politica de cookies",
];

const COMPANY_POLICIES = [
  "Politica privind sclavia modernă",
  "Politica privind egalitatea de șanse",
  "Politica de mediu",
  "Politica de calitate",
  "Politica anti mită și corupție",
];

export function Footer() {
  return (
    <footer className="bg-ink-50">
      <div className="container-x py-16 lg:py-20">
        {/* TOP — 4 columns */}
        <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b hairline">
          {/* Brand + tagline + compliance */}
          <div className="lg:col-span-3">
            <Logo width={200} height={43} />
            <p className="text-ink-600 text-sm mt-6 leading-relaxed">
              Alege să lucrezi cu o echipă de profesioniști. Integrator industrial pentru sectorul privat,
              instituții de stat și apărare.
            </p>

            {/* Compliance badges */}
            <div className="mt-8 space-y-3">
              <a
                href="https://anpc.ro/ce-este-sal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border hairline hover:border-uzx-blue transition group"
              >
                <div className="w-10 h-10 bg-uzx-blue text-white flex items-center justify-center text-[10px] font-bold mono shrink-0">
                  ANPC
                </div>
                <div className="text-[11px] text-ink-700 leading-tight">
                  Soluționarea alternativă
                  <br />
                  a litigiilor
                </div>
              </a>
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 border hairline hover:border-uzx-blue transition group"
              >
                <div className="w-10 h-10 bg-uzx-orange text-white flex items-center justify-center text-[10px] font-bold mono shrink-0">
                  SOL
                </div>
                <div className="text-[11px] text-ink-700 leading-tight">
                  Soluționarea online
                  <br />
                  a litigiilor
                </div>
              </a>
            </div>

            {/* Payment methods */}
            <div className="mt-6">
              <div className="text-[10px] uppercase tracking-wider text-ink-400 mono mb-3">Plăți securizate</div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 border hairline text-[10px] mono text-ink-700">NETOPIA</div>
                <div className="px-3 py-1.5 border hairline text-[10px] mono text-ink-700">VISA</div>
                <div className="px-3 py-1.5 border hairline text-[10px] mono text-ink-700">MASTERCARD</div>
              </div>
            </div>
          </div>

          {/* Meniu + GDPR + Politici companie */}
          <div className="lg:col-span-3 space-y-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Meniu</div>
              <ul className="space-y-2.5 text-sm text-ink-700">
                {MENU.map((m) => (
                  <li key={m.label}>
                    <a className="hover:text-uzx-blue transition" href={m.href}>
                      {m.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">GDPR</div>
              <ul className="space-y-2.5 text-sm text-ink-700">
                {GDPR_LINKS.map((link) => (
                  <li key={link}>
                    <a className="hover:text-uzx-blue transition" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Politicile companiei</div>
              <ul className="space-y-2.5 text-sm text-ink-700">
                {COMPANY_POLICIES.map((link) => (
                  <li key={link}>
                    <a className="hover:text-uzx-blue transition" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Categorii */}
          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Categorii</div>
            <ul className="space-y-2.5 text-sm text-ink-700">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <a className="hover:text-uzx-blue transition" href="#catalog">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Date de contact */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Date de contact</div>

              <div className="space-y-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-uzx-blue text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="text-sm text-ink-700 leading-tight">
                    <div className="serif text-ink-900">Locație</div>
                    <div className="text-xs mt-1 text-ink-600">
                      Parc Științific Tehnopolis
                      <br />
                      Bd. Poitiers nr. 10, Iași
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-uzx-orange text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div className="text-sm leading-tight">
                    <div className="serif text-ink-900">Telefon</div>
                    <a href="tel:+40769081081" className="text-xs mt-1 block text-ink-600 hover:text-uzx-blue">
                      (+40) 769 081 081
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-uzx-blue text-white flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="text-sm leading-tight">
                    <div className="serif text-ink-900">Email</div>
                    <a href="mailto:info@uzinex.ro" className="text-xs mt-1 block text-ink-600 hover:text-uzx-blue">
                      info@uzinex.ro
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-400 mono mb-3">Social</div>
              <div className="flex items-center gap-2">
                <a href="#" aria-label="Facebook" className="w-9 h-9 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 8H6v4h3v12h5V12h3.6l.4-4H14V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.8C10.6 0 9 1.6 9 4.7V8z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8 19H5V8h3v11zM6.5 6.7C5.5 6.7 4.7 5.9 4.7 5s.8-1.7 1.8-1.7S8.3 4 8.3 5s-.8 1.7-1.8 1.7zM20 19h-3v-5.6c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V19h-3V8h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V19z" />
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="w-9 h-9 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6c-1 .3-1.8 1.1-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
                  </svg>
                </a>
                <a href="#" aria-label="TikTok" className="w-9 h-9 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.6 6.8c-1.6-.3-3-1.2-3.9-2.5-.6-.9-.9-1.9-.9-3h-3.5v13.5c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3c.3 0 .7.1 1 .2V8.4c-.3 0-.7-.1-1-.1-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5V9c1.4.9 3.1 1.5 4.8 1.5V7c-.1 0-.1 0 0-.2z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* MIDDLE — date companie */}
        <div className="py-10 border-b hairline">
          <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Date companie</div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 text-sm text-ink-700">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-400 mono mb-1">Denumire</div>
              <div className="serif text-ink-900">GW LASER TECHNOLOGY S.R.L.</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-400 mono mb-1">CUI</div>
              <div className="num">RO 49240731</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-400 mono mb-1">Nr. înreg.</div>
              <div className="num">J2023003903220</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-400 mono mb-1">Sediu social</div>
              <div className="text-xs">Sat Rediu, Comuna Rediu, Strada Împăcării, Nr. 2</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-ink-400 mono mb-1">EUID</div>
              <div className="text-xs num">ROONRC.J2023003903220</div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-ink-400">
          <div>© 2026 GW LASER TECHNOLOGY S.R.L. · Toate drepturile rezervate</div>
          <div className="mt-4 md:mt-0">Construit cu Next.js · Tailwind v4 · Motion</div>
        </div>
      </div>
    </footer>
  );
}
