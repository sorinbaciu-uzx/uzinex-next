import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica anti mită și corupție — Uzinex",
  description: "Politica Uzinex de toleranță zero față de mită, corupție, plăți de facilitare și orice formă de conflict de interese.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica anti mită și corupție"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Toleranță zero",
          body: "GW LASER TECHNOLOGY S.R.L. (Uzinex) are o politică de toleranță zero față de mită, corupție, trafic de influență, plăți de facilitare sau orice formă de avantaj necuvenit, indiferent de valoarea sau contextul acestuia.",
        },
        {
          title: "Cadru legal",
          body: "Respectăm Legea 78/2000 privind prevenirea și sancționarea faptelor de corupție, standardele internaționale (UK Bribery Act, FCPA), precum și normele ISO 37001 privind sistemele de management anti-mită.",
        },
        {
          title: "Ce este interzis",
          body: [
            "Oferirea, promiterea, acceptarea sau solicitarea de bani, cadouri sau beneficii pentru a influența o decizie de afaceri.",
            "Plăți de facilitare (speed money) către funcționari publici pentru a accelera proceduri.",
            "Sponsorizări sau donații mascate care urmăresc obținerea unui avantaj comercial.",
            "Angajarea de intermediari fără diligență corespunzătoare asupra integrității acestora.",
            "Conflictele de interese nedeclarate ale angajaților sau partenerilor.",
          ],
        },
        {
          title: "Achiziții publice și B2G",
          body: "În relația cu autoritățile contractante (SEAP/SICAP, PNRR, fonduri europene, contracte guvernamentale), aplicăm cele mai stricte standarde de integritate, transparență și trasabilitate. Nu acceptăm solicitări de plăți informale sau orice alte abateri.",
        },
        {
          title: "Cadouri și ospitalitate",
          body: "Cadourile simbolice și ospitalitatea sunt acceptate doar în limite rezonabile, transparent, fără a crea obligații și în conformitate cu procedura internă. Orice depășire trebuie raportată și aprobată.",
        },
        {
          title: "Raportare",
          body: "Angajații, partenerii și clienții pot raporta orice suspiciune de corupție la info@uzinex.ro, în mod confidențial și fără frica de represalii. Investigăm prompt și transparent fiecare sesizare.",
        },
        {
          title: "Sancțiuni",
          body: "Încălcarea acestei politici atrage măsuri disciplinare (inclusiv concedierea), rezilierea contractelor comerciale și, după caz, sesizarea autorităților competente.",
        },
      ]}
    />
  );
}
