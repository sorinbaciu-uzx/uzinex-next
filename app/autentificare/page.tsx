import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Autentificare client — Uzinex",
  description:
    "Intră în contul tău Uzinex pentru a accesa oferte, istoric comenzi, manuale interactive AI, certificate de conformitate și documente tehnice.",
};

export default function AutentificarePage() {
  return (
    <>
      <Header />
      <main className="bg-ink-50 border-b hairline">
        <div className="container-x py-14 lg:py-20">
          <div className="max-w-md mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs mono uppercase tracking-wider text-ink-500 hover:text-uzx-blue transition mb-8"
            >
              <span>←</span> Înapoi la pagina principală
            </Link>
            <div className="bg-white border hairline p-8 lg:p-10">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                Cont client Uzinex
              </div>
              <h1
                className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-3"
                style={{ letterSpacing: "-0.02em" }}
              >
                Autentificare
              </h1>
              <p className="text-ink-500 text-sm leading-relaxed mb-8">
                Accesează oferte personalizate, istoric comenzi, manuale
                interactive AI, certificate de conformitate și documente
                tehnice pentru echipamentele tale.
              </p>

              <form className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[11px] uppercase tracking-wider text-ink-500 mb-2 font-medium"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="nume@companie.ro"
                    className="w-full border hairline px-4 py-3 text-sm text-ink-900 bg-white focus:outline-none focus:border-uzx-blue"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-[11px] uppercase tracking-wider text-ink-500 font-medium"
                    >
                      Parolă
                    </label>
                    <a
                      href="#recuperare"
                      className="text-[11px] text-uzx-blue hover:underline"
                    >
                      Am uitat parola
                    </a>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="w-full border hairline px-4 py-3 text-sm text-ink-900 bg-white focus:outline-none focus:border-uzx-blue"
                  />
                </div>
                <label className="flex items-center gap-2 text-xs text-ink-600">
                  <input
                    type="checkbox"
                    className="border hairline w-4 h-4 accent-uzx-blue"
                  />
                  Ține-mă autentificat 30 de zile
                </label>
                <button
                  type="submit"
                  className="w-full bg-uzx-blue hover:bg-uzx-blue2 text-white py-3.5 text-sm font-medium transition"
                >
                  Intră în cont
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t hairline" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-[10px] uppercase tracking-[0.2em] text-ink-400 mono">
                    sau
                  </span>
                </div>
              </div>

              <div className="text-center space-y-4">
                <p className="text-sm text-ink-600">
                  Nu ai încă un cont Uzinex?
                </p>
                <Link
                  href="/#contact"
                  className="block w-full border-2 border-uzx-blue text-uzx-blue hover:bg-uzx-blue hover:text-white py-3 text-sm font-medium transition"
                >
                  Solicită acces cont client
                </Link>
              </div>
            </div>

            <div className="mt-6 px-4 py-3 border hairline bg-yellow-50 border-yellow-300 text-yellow-900 text-xs leading-relaxed">
              <strong>Info:</strong> Portalul clienților Uzinex este în faza de
              roll-out. Conturile se activează la cerere, după semnarea
              primului contract sau la solicitarea departamentului comercial.
              Pentru acces, contactează echipa la{" "}
              <a
                href="mailto:info@uzinex.ro"
                className="underline hover:text-yellow-700"
              >
                info@uzinex.ro
              </a>
              .
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
