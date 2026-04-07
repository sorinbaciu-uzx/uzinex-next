import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCurrentUser } from "@/lib/client-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contul meu — Uzinex",
  robots: { index: false, follow: false },
};

export default async function ContPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/autentificare");

  return (
    <>
      <Header />
      <main className="bg-ink-50 border-b hairline">
        <div className="container-x py-14 lg:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between gap-6 mb-10">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3 mono">
                  Contul meu
                </div>
                <h1
                  className="serif text-4xl md:text-5xl text-ink-900 leading-[0.95]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Bine ai venit,
                  <br />
                  <span className="text-uzx-blue">{user.name}</span>
                </h1>
                {user.company && (
                  <p className="text-ink-500 mt-3">{user.company}</p>
                )}
              </div>
              <form action="/api/auth/logout" method="post">
                <button
                  type="submit"
                  className="text-xs uppercase tracking-wider text-ink-500 hover:text-red-600 border hairline px-4 py-2 bg-white hover:border-red-300 transition"
                >
                  Deconectare →
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-200 border hairline">
              <Link
                href="/magazin"
                className="bg-white p-6 hover:bg-ink-50 transition group"
              >
                <div className="text-[11px] uppercase tracking-wider text-uzx-orange mono mb-2">
                  01 / Catalog
                </div>
                <div className="serif text-xl text-ink-900">
                  Catalog tehnic
                </div>
                <div className="text-sm text-ink-500 mt-2">
                  Răsfoiește portofoliul complet de echipamente industriale.
                </div>
                <div className="text-xs text-uzx-blue mt-4 group-hover:translate-x-1 transition inline-block">
                  Deschide catalogul →
                </div>
              </Link>
              <Link
                href="/studii-de-caz"
                className="bg-white p-6 hover:bg-ink-50 transition group"
              >
                <div className="text-[11px] uppercase tracking-wider text-uzx-orange mono mb-2">
                  02 / Referințe
                </div>
                <div className="serif text-xl text-ink-900">
                  Studii de caz
                </div>
                <div className="text-sm text-ink-500 mt-2">
                  Proiecte livrate pentru clienți din producție, logistică și
                  energie.
                </div>
                <div className="text-xs text-uzx-blue mt-4 group-hover:translate-x-1 transition inline-block">
                  Vezi studiile →
                </div>
              </Link>
              <Link
                href="/#contact"
                className="bg-white p-6 hover:bg-ink-50 transition group"
              >
                <div className="text-[11px] uppercase tracking-wider text-uzx-orange mono mb-2">
                  03 / Contact
                </div>
                <div className="serif text-xl text-ink-900">
                  Solicită ofertă
                </div>
                <div className="text-sm text-ink-500 mt-2">
                  Discută cu un inginer Uzinex pentru o ofertă personalizată.
                </div>
                <div className="text-xs text-uzx-blue mt-4 group-hover:translate-x-1 transition inline-block">
                  Contactează echipa →
                </div>
              </Link>
              <Link
                href="/service"
                className="bg-white p-6 hover:bg-ink-50 transition group"
              >
                <div className="text-[11px] uppercase tracking-wider text-uzx-orange mono mb-2">
                  04 / Service
                </div>
                <div className="serif text-xl text-ink-900">
                  Service tehnic
                </div>
                <div className="text-sm text-ink-500 mt-2">
                  Intervenție la sediu sub 24 ore, piese de schimb originale.
                </div>
                <div className="text-xs text-uzx-blue mt-4 group-hover:translate-x-1 transition inline-block">
                  Vezi contracte →
                </div>
              </Link>
            </div>

            <div className="mt-12 bg-white border hairline p-6">
              <div className="text-[11px] uppercase tracking-[0.2em] text-ink-500 mono mb-4">
                Datele contului
              </div>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <dt className="text-xs text-ink-400 uppercase tracking-wider">
                    Nume
                  </dt>
                  <dd className="text-ink-900 mt-1">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-400 uppercase tracking-wider">
                    Email
                  </dt>
                  <dd className="text-ink-900 mt-1">{user.email}</dd>
                </div>
                {user.company && (
                  <div>
                    <dt className="text-xs text-ink-400 uppercase tracking-wider">
                      Companie
                    </dt>
                    <dd className="text-ink-900 mt-1">{user.company}</dd>
                  </div>
                )}
                {user.phone && (
                  <div>
                    <dt className="text-xs text-ink-400 uppercase tracking-wider">
                      Telefon
                    </dt>
                    <dd className="text-ink-900 mt-1">{user.phone}</dd>
                  </div>
                )}
              </dl>
              <p className="mt-6 text-xs text-ink-400">
                Pentru a actualiza datele contului, contactează echipa la{" "}
                <a
                  href="mailto:info@uzinex.ro"
                  className="underline hover:text-uzx-blue"
                >
                  info@uzinex.ro
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
