import { Logo } from "./Logo";

const CATEGORIES = [
  "Intralogistică & manipulare mărfuri",
  "Prelucrare laser & CNC de precizie",
  "Robotică & automatizare fluxuri",
  "Utilaje grele & infrastructură",
  "Piese de schimb & consumabile",
  "Service tehnic & mentenanță",
];

const COMPANY_LINKS = ["Despre noi", "Cazuri de succes", "Cariere", "Resurse", "Contact"];
const LEGAL_LINKS = ["Termeni & condiții", "Confidențialitate", "Cookies", "GDPR"];

export function Footer() {
  return (
    <footer className="bg-ink-50">
      <div className="container-x py-16 lg:py-20">
        {/* TOP — brand + intro */}
        <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b hairline">
          <div className="lg:col-span-5">
            <Logo width={220} height={48} />
            <p className="text-ink-600 text-sm mt-6 max-w-md leading-relaxed">
              Integrator industrial pentru sectorul privat, instituții de stat și apărare.
              Furnizăm tehnologie la cheie, optimizăm achizițiile cu fonduri europene și PNRR
              și asigurăm suport tehnic 100% local.
            </p>
            <div className="flex items-center gap-3 mt-8">
              <a href="#" aria-label="Facebook" className="w-10 h-10 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v12h5V12h3.6l.4-4H14V6.3c0-1 .2-1.3 1.2-1.3H18V0h-3.8C10.6 0 9 1.6 9 4.7V8z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0H5C2.2 0 0 2.2 0 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5V5c0-2.8-2.2-5-5-5zM8 19H5V8h3v11zM6.5 6.7C5.5 6.7 4.7 5.9 4.7 5s.8-1.7 1.8-1.7S8.3 4 8.3 5s-.8 1.7-1.8 1.7zM20 19h-3v-5.6c0-1.4-.5-2.3-1.7-2.3-.9 0-1.5.6-1.7 1.2-.1.2-.1.5-.1.8V19h-3V8h3v1.3c.4-.6 1.1-1.5 2.7-1.5 2 0 3.5 1.3 3.5 4.1V19z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2c-.3-1-1.1-1.8-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6c-1 .3-1.8 1.1-2.1 2.1C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1 1.1 1.8 2.1 2.1 1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5c1-.3 1.8-1.1 2.1-2.1.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
              </a>
              <a href="#" aria-label="TikTok" className="w-10 h-10 border hairline flex items-center justify-center text-ink-700 hover:border-uzx-blue hover:text-uzx-blue transition">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.6 6.8c-1.6-.3-3-1.2-3.9-2.5-.6-.9-.9-1.9-.9-3h-3.5v13.5c0 1.7-1.3 3-3 3s-3-1.3-3-3 1.3-3 3-3c.3 0 .7.1 1 .2V8.4c-.3 0-.7-.1-1-.1-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5V9c1.4.9 3.1 1.5 4.8 1.5V7c-.1 0-.1 0 0-.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Categorii</div>
            <ul className="space-y-3 text-sm text-ink-700">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <a className="hover:text-uzx-blue transition" href="#catalog">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + Legal */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Companie</div>
              <ul className="space-y-3 text-sm text-ink-700">
                {COMPANY_LINKS.map((link) => (
                  <li key={link}>
                    <a className="hover:text-uzx-blue transition" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Legal</div>
              <ul className="space-y-3 text-sm text-ink-700">
                {LEGAL_LINKS.map((link) => (
                  <li key={link}>
                    <a className="hover:text-uzx-blue transition" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* MIDDLE — company data + contact details */}
        <div className="grid lg:grid-cols-12 gap-12 py-12 border-b hairline">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Date companie</div>
            <div className="text-sm text-ink-700 leading-relaxed space-y-1">
              <div className="serif text-base text-ink-900">GW LASER TECHNOLOGY S.R.L.</div>
              <div>CUI: RO 49240731</div>
              <div>Nr. înreg.: J2023003903220</div>
              <div>Sediu social: Sat Rediu, Comuna Rediu, Strada Împăcării, Nr. 2</div>
              <div className="text-ink-500 text-xs mt-2">EUID: ROONRC.J2023003903220</div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Locație</div>
            <div className="text-sm text-ink-700 leading-relaxed">
              Parc Științific & Tehnologic Tehnopolis
              <br />
              Bulevardul Poitiers nr. 10
              <br />
              700671 Iași
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Contact</div>
            <div className="text-sm text-ink-700 space-y-2">
              <div>
                <div className="text-xs text-ink-400 uppercase tracking-wider">Telefon</div>
                <a href="tel:+40769081081" className="serif text-base text-ink-900 hover:text-uzx-blue transition">
                  (+40) 769 081 081
                </a>
              </div>
              <div>
                <div className="text-xs text-ink-400 uppercase tracking-wider mt-3">Email</div>
                <a href="mailto:info@uzinex.ro" className="serif text-base text-ink-900 hover:text-uzx-blue transition">
                  info@uzinex.ro
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM — copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 text-xs text-ink-400">
          <div>© 2026 GW LASER TECHNOLOGY S.R.L. · Toate drepturile rezervate</div>
          <div className="mt-4 md:mt-0">Construit cu Next.js · Tailwind v4 · Motion</div>
        </div>
      </div>
    </footer>
  );
}
