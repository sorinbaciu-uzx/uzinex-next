import type { Metadata } from "next";
import CrediteLeasingClient from "./CrediteLeasingClient";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Credite & leasing — 10 parteneri pentru echipamente industriale",
  description:
    "Finanțează echipamentele Uzinex cu avans de la 0%. 10 parteneri financiari (GRENKE, BT Leasing, BRD, Garanti, UniCredit, BCR, OTP, Impuls, Autonom). Aprobare în 48h, rate fixe, documentație simplă.",
  alternates: { canonical: "/finantare/credite-leasing" },
  openGraph: {
    title: "Credite & leasing echipamente — 10 parteneri",
    description:
      "Avans 0%, aprobare 48h, 10 parteneri financiari. GRENKE, BT Leasing, BRD, UniCredit, BCR, OTP, Autonom + alții.",
    url: "/finantare/credite-leasing",
    type: "website",
  },
};

export default function Page() {
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Finanțare", url: "/finantare/credite-leasing" },
    { name: "Credite & leasing", url: "/finantare/credite-leasing" },
  ]);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      <CrediteLeasingClient />
    </>
  );
}
