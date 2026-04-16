import type { Metadata } from "next";
import MaterialeUtileClient from "./MaterialeUtileClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Materiale utile — 48 episoade gratuite Lean Manufacturing",
  description:
    "Bibliotecă video cu 48 de episoade gratuite: Lean Manufacturing, optimizare producție, logistică, mentenanță preventivă, podcast industrial cu experți. Fără paywall, acces liber pe YouTube @UZINEX.",
  alternates: { canonical: "/materiale-utile" },
  openGraph: {
    title: "Materiale utile Uzinex — 48 episoade gratuite",
    description:
      "Lean Manufacturing, logistică, mentenanță, podcast industrial. Bibliotecă video gratuită pentru manageri și ingineri.",
    url: "/materiale-utile",
    type: "website",
  },
  keywords: [
    "Lean Manufacturing",
    "optimizare producție",
    "logistică",
    "mentenanță preventivă",
    "Toyota Kata",
    "Six Sigma",
    "FIFO",
    "VMI",
    "Heijunka",
    "Kaizen",
    "podcast industrial",
  ],
};

export default function Page() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Resurse", url: "/materiale-utile" },
    { name: "Materiale utile", url: "/materiale-utile" },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <MaterialeUtileClient />
    </>
  );
}
