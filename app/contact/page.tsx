import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact, Vorbește direct cu un inginer Uzinex",
  description:
    "Telefon +40 769 081 081 · Email info@uzinex.ro · WhatsApp · Sediu Parc Tehnopolis Iași. Formular cu routing automat pe departament (vânzări, service, finanțare, cariere). Răspuns în 24h.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Uzinex, 4 canale, răspuns în 24h",
    description:
      "Telefon, email, WhatsApp sau vizită la sediu Iași. Formular cu routing pe departament. Fără call center, fără filtre.",
    url: "/contact",
    type: "website",
  },
  keywords: [
    "contact Uzinex",
    "telefon Uzinex",
    "sediu Uzinex Iași",
    "Parc Tehnopolis",
    "Bd Poitiers",
    "email info@uzinex.ro",
  ],
};

export default function Page() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Contact", url: "/contact" },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <ContactClient />
    </>
  );
}
