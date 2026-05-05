import type { Metadata } from "next";
import CreditFurnizorClient from "./CreditFurnizorClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Credit furnizor, Finanțare cu 7 tipuri de garanții",
  description:
    "Cumpără echipamente Uzinex cu plată amânată, garantată prin 7 tipuri de instrumente: bilet la ordin avalizat, gaj, CEC, cesiune, fidejusiune, ipotecă mobiliară, SGB. Termen 12-60 luni.",
  alternates: { canonical: "/finantare/credit-furnizor" },
  openGraph: {
    title: "Credit furnizor Uzinex, Plată amânată cu garanții",
    description:
      "Plătești echipamentul la 12-60 luni. 7 tipuri de garanții acceptate. Eligibilitate riguroasă.",
    url: "/finantare/credit-furnizor",
    type: "website",
  },
};

export default function Page() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Finanțare", url: "/finantare/credit-furnizor" },
    { name: "Credit furnizor", url: "/finantare/credit-furnizor" },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <CreditFurnizorClient />
    </>
  );
}
