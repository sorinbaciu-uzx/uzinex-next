import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink-50">
      <div className="container-x py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-4">
            <Logo width={220} height={48} />
            <p className="text-ink-500 text-sm mt-6 max-w-xs leading-relaxed">
              Echipamente industriale, cupe de excavator și soluții de leasing pentru profesioniștii din construcții. Din 2003.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Catalog</div>
            <ul className="space-y-3 text-sm text-ink-700">
              <li><a className="hover:text-ink-900" href="#">Cupe excavator</a></li>
              <li><a className="hover:text-ink-900" href="#">Atașamente</a></li>
              <li><a className="hover:text-ink-900" href="#">Piese uzură</a></li>
              <li><a className="hover:text-ink-900" href="#">Cuple rapide</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Companie</div>
            <ul className="space-y-3 text-sm text-ink-700">
              <li><a className="hover:text-ink-900" href="#">Despre noi</a></li>
              <li><a className="hover:text-ink-900" href="#">Cariere</a></li>
              <li><a className="hover:text-ink-900" href="#">Resurse</a></li>
              <li><a className="hover:text-ink-900" href="#">Contact</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">Legal</div>
            <ul className="space-y-3 text-sm text-ink-700">
              <li><a className="hover:text-ink-900" href="#">Termeni</a></li>
              <li><a className="hover:text-ink-900" href="#">Confidențialitate</a></li>
              <li><a className="hover:text-ink-900" href="#">Cookies</a></li>
              <li><a className="hover:text-ink-900" href="#">GDPR</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <label htmlFor="footer-newsletter" className="block text-xs uppercase tracking-[0.2em] text-uzx-orange mb-5">
              Newsletter
            </label>
            <p className="text-sm text-ink-600 mb-4">Noutăți și oferte lunare.</p>
            <form className="flex border-b border-ink-400">
              <input
                id="footer-newsletter"
                type="email"
                placeholder="Email"
                aria-label="Adresa ta de email"
                className="bg-transparent text-sm py-2 flex-1 focus:outline-none placeholder:text-ink-500 text-ink-900"
              />
              <button type="submit" aria-label="Abonează-te la newsletter" className="text-ink-900 px-2">
                →
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t hairline text-xs text-ink-400">
          <div>© 2026 Uzinex SRL · CUI RO 12345678</div>
          <div className="mt-4 md:mt-0">Sediu social: București · Depozit: Otopeni</div>
        </div>
      </div>
    </footer>
  );
}
