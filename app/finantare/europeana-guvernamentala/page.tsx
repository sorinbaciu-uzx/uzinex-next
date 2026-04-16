import type { Metadata } from "next";
import EuropeanaGuvernamentalaClient from "./EuropeanaGuvernamentalaClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Finanțare europeană & guvernamentală — Până la 75% nerambursabil",
  description:
    "Consolidăm dosarul tehnic pentru fonduri UE (Horizon, PNRR, PoCIDIF) și scheme guvernamentale (Industria Prelucrătoare 447M€, Fondul Modernizare, E-MOBILITY RO). 12 programe disponibile, intensitate 30-100%.",
  alternates: { canonical: "/finantare/europeana-guvernamentala" },
  openGraph: {
    title: "Fonduri UE & scheme guvernamentale — 12 programe Uzinex",
    description:
      "Horizon Europe, PNRR, PoCIDIF, Industria Prelucrătoare 447M€, Fondul Modernizare. Dosar tehnic + consultanți acreditați.",
    url: "/finantare/europeana-guvernamentala",
    type: "website",
  },
  keywords: [
    "fonduri europene",
    "PNRR",
    "Horizon Europe",
    "PoCIDIF",
    "Industria Prelucrătoare",
    "Fondul Modernizare",
    "E-MOBILITY RO",
    "SEAP",
    "SICAP",
    "schema ajutor stat",
  ],
};

export default function Page() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Finanțare", url: "/finantare/europeana-guvernamentala" },
    { name: "Europeană & guvernamentală", url: "/finantare/europeana-guvernamentala" },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <EuropeanaGuvernamentalaClient />
    </>
  );
}
