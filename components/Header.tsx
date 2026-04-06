import { Logo } from "./Logo";

export function Header() {
  return (
    <>
      <div className="bg-ink-900 text-ink-100 text-xs">
        <div className="container-x flex items-center justify-between py-2.5">
          <span className="opacity-70">
            Sediu central: București · Punct de lucru Otopeni · Livrare națională
          </span>
          <div className="hidden md:flex items-center gap-5 opacity-70">
            <a href="tel:+40000000000" className="hover:opacity-100">
              +40 21 000 0000
            </a>
            <span className="text-ink-500">|</span>
            <a href="#">RO</a>
            <span className="text-ink-500">/</span>
            <a href="#" className="opacity-50">
              EN
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur border-b hairline">
        <div className="container-x flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <Logo />
          </a>
          <nav className="hidden lg:flex items-center gap-9 text-sm text-ink-700">
            <a href="#catalog" className="hover:text-ink-900">Catalog tehnic</a>
            <a href="#solutii" className="hover:text-ink-900">Soluții recomandate</a>
            <a href="#testimoniale" className="hover:text-ink-900">Clienți</a>
            <a href="#qa" className="hover:text-ink-900">Întrebări frecvente</a>
            <a href="#contact" className="hover:text-ink-900">Contact</a>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#" className="hidden md:inline text-sm text-ink-700 hover:text-ink-900">
              Autentificare
            </a>
            <a
              href="#contact"
              className="bg-uzx-orange hover:bg-uzx-orange2 text-white text-sm px-5 py-2.5 transition"
            >
              Discută cu un inginer
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
