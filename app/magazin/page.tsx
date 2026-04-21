import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MagazinClient } from "./MagazinClient";
import { PRODUCTS } from "./products";
import { itemListSchema, collectionPageSchema, breadcrumbSchema } from "@/lib/seo";
import {
  getAllProductOverrides,
  mergeProductWithOverride,
} from "@/lib/seo/product-seo";

export const metadata: Metadata = {
  title: "Catalog tehnic — 180+ utilaje industriale",
  description:
    "Catalog tehnic Uzinex cu 180+ utilaje CNC, laser fiber, roboți, echipamente de ambalare, reciclare, energie, inspecție. Filtrare pe categorii, fișe tehnice descărcabile, eligibil SEAP/SICAP.",
  alternates: { canonical: "/magazin" },
  openGraph: {
    title: "Catalog tehnic Uzinex — 180+ utilaje industriale",
    description:
      "Utilaje CNC, laser, roboți, echipamente pentru fabrică. Catalog complet cu filtrare categorică și fișe tehnice.",
    url: "/magazin",
  },
};

export default async function Page() {
  // Merge product overrides from DB (image, name, category, etc.)
  // Graceful fallback: if DB unavailable, use static PRODUCTS.
  let products = PRODUCTS;
  try {
    const overrides = await getAllProductOverrides();
    products = PRODUCTS.map((p) => mergeProductWithOverride(p, overrides[p.slug]));
  } catch {
    // DB unavailable — use baseline
  }

  const collection = collectionPageSchema({
    title: "Catalog tehnic Uzinex — 180+ utilaje industriale",
    description:
      "Utilaje CNC, laser fiber, roboți industriali, echipamente ambalare, reciclare, energie, inspecție. Catalog filtrabil pe categorii și subcategorii.",
    url: "/magazin",
    numItems: products.length,
  });

  // ItemList cu primele 100 produse (limita schema.org pentru rich results).
  const list = itemListSchema(
    products.slice(0, 100).map((p) => ({
      name: p.name,
      url: `/produs/${p.slug}`,
    })),
    "Catalog produse Uzinex"
  );

  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Catalog tehnic", url: "/magazin" },
  ]);

  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(list) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <div style={{ background: "#082545" }}>
        <Header />
      </div>

      {/* PAGE HERO */}
      <section className="relative border-b hairline overflow-hidden" style={{ background: "#082545" }}>
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 22px)",
          }}
        />
        <div
          className="absolute -right-32 -top-32 w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(245,133,31,0.18) 0%, rgba(245,133,31,0) 70%)",
          }}
        />
        <div className="container-x relative py-10 lg:py-14 text-white">
          <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mono">
            — Catalog tehnic
          </div>
        </div>
      </section>

      <MagazinClient products={products} />

      <Footer />
    </div>
  );
}
