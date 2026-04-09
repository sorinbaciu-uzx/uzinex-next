import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/client-auth";
import { RegisterForm } from "./RegisterForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Creează cont — Uzinex",
  description:
    "Înregistrează-te pentru un cont client Uzinex și obține acces la oferte personalizate, istoric comenzi și manuale interactive AI.",
};

export default async function InregistrarePage() {
  const user = await getCurrentUser();
  if (user) redirect("/cont");

  return (
    <>
      <Header solid />
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
                Cont nou client Uzinex
              </div>
              <h1
                className="serif text-3xl md:text-4xl text-ink-900 leading-[0.95] mb-3"
                style={{ letterSpacing: "-0.02em" }}
              >
                Creează cont
              </h1>
              <p className="text-ink-500 text-sm leading-relaxed mb-8">
                Înregistrarea durează 30 de secunde. Vei avea acces imediat la
                oferte personalizate, istoric comenzi și documente tehnice
                pentru echipamentele tale.
              </p>

              <RegisterForm />

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

              <div className="text-center">
                <p className="text-sm text-ink-600 mb-4">
                  Ai deja un cont Uzinex?
                </p>
                <Link
                  href="/autentificare"
                  className="block w-full border-2 border-uzx-blue text-uzx-blue hover:bg-uzx-blue hover:text-white py-3 text-sm font-medium transition"
                >
                  Intră în cont
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
