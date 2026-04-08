import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica privind sclavia modernă — Uzinex",
  description: "Angajamentul Uzinex pentru combaterea sclaviei moderne, a traficului de persoane și a muncii forțate în lanțul de aprovizionare.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica privind sclavia modernă"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Angajamentul nostru",
          body: "GW LASER TECHNOLOGY S.R.L. (Uzinex) are toleranță zero față de orice formă de sclavie modernă, trafic de persoane, muncă forțată sau exploatare în cadrul activităților proprii și al lanțului de aprovizionare.",
        },
        {
          title: "Cadrul legal",
          body: "Această politică respectă standardele internaționale: Convențiile OIM, Declarația universală a drepturilor omului, Principiile directoare ONU privind afacerile și drepturile omului și legislația românească și europeană aplicabilă.",
        },
        {
          title: "Lanțul de aprovizionare",
          body: [
            "Selectăm furnizori și parteneri care respectă standardele internaționale ale drepturilor muncii.",
            "Solicităm furnizorilor declarații de conformitate și efectuăm audituri atunci când este necesar.",
            "Evaluăm riscurile geografice și sectoriale înainte de inițierea oricărei relații comerciale.",
            "Rezervăm dreptul de a încheia imediat orice contract în cazul identificării unor practici incompatibile.",
          ],
        },
        {
          title: "Angajații Uzinex",
          body: "Toți angajații Uzinex beneficiază de contracte de muncă legale, salarii decente, condiții de lucru sigure și dreptul la asociere. Nu acceptăm discriminare, hărțuire sau presiuni care ar putea conduce la situații de exploatare.",
        },
        {
          title: "Raportare",
          body: "Orice suspiciune legată de încălcarea acestei politici poate fi raportată confidențial la info@uzinex.ro. Toate sesizările sunt investigate serios și fără represalii asupra persoanei care raportează.",
        },
      ]}
    />
  );
}
