import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de mediu — Uzinex",
  description: "Angajamentul Uzinex pentru sustenabilitate, respectarea principiului DNSH și reducerea impactului asupra mediului.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de mediu"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Viziunea noastră",
          body: "GW LASER TECHNOLOGY S.R.L. (Uzinex) integrează sustenabilitatea în toate deciziile operaționale, comerciale și tehnice. Ne asumăm responsabilitatea pentru impactul asupra mediului și promovăm soluții industriale eficiente energetic.",
        },
        {
          title: "Principiul DNSH",
          body: "Toate proiectele livrate respectă principiul european Do No Significant Harm (DNSH) prin selectarea de echipamente cu consum redus, materiale reciclabile și procese tehnologice compatibile cu obiectivele climatice ale UE.",
        },
        {
          title: "Angajamente concrete",
          body: [
            "Propunem clienților soluții cu eficiență energetică ridicată și consum redus de resurse.",
            "Colaborăm cu furnizori care respectă standarde ISO 14001 sau echivalente.",
            "Reducem deșeurile din producția și livrarea echipamentelor prin ambalare sustenabilă.",
            "Promovăm recondiționarea și reutilizarea componentelor, acolo unde este posibil.",
            "Monitorizăm amprenta de carbon a operațiunilor proprii și o reducem anual.",
          ],
        },
        {
          title: "Conformitate legislativă",
          body: "Respectăm integral legislația națională și europeană privind protecția mediului, gestionarea deșeurilor, emisiile și eficiența energetică, inclusiv Directiva DEEE, Regulamentul REACH și Pachetul Fit for 55.",
        },
        {
          title: "Transparență",
          body: "Suntem pregătiți să oferim clienților documentele de conformitate DNSH, rapoarte de sustenabilitate și informații despre ciclul de viață al echipamentelor livrate, pentru proiectele cu finanțare europeană sau PNRR.",
        },
      ]}
    />
  );
}
