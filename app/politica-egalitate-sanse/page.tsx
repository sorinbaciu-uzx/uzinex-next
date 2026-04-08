import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica privind egalitatea de șanse — Uzinex",
  description: "Angajamentul Uzinex pentru egalitate de șanse, diversitate și incluziune la locul de muncă și în relațiile de afaceri.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica privind egalitatea de șanse"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Principiul fundamental",
          body: "GW LASER TECHNOLOGY S.R.L. (Uzinex) promovează egalitatea de șanse, tratamentul echitabil și nediscriminarea în toate activitățile sale. Credem că diversitatea este un atu strategic care îmbunătățește performanța și inovația.",
        },
        {
          title: "Domenii de aplicare",
          body: [
            "Recrutare, angajare, promovare și remunerare.",
            "Acces la formare profesională și dezvoltare.",
            "Condiții de muncă și beneficii.",
            "Relații cu clienții, furnizorii și partenerii comerciali.",
          ],
        },
        {
          title: "Criterii protejate",
          body: "Nu se admite niciun fel de discriminare bazată pe: sex, vârstă, rasă, etnie, naționalitate, religie, orientare sexuală, dizabilitate, stare civilă, statut socio-economic, opinii politice sau apartenență sindicală.",
        },
        {
          title: "Măsuri concrete",
          body: [
            "Anunțurile de recrutare sunt formulate neutru și evaluează candidații exclusiv pe competențe și experiență.",
            "Sistemul de remunerare este transparent și bazat pe criterii obiective.",
            "Oferim flexibilitate pentru părinți, persoane cu dizabilități și alte categorii vulnerabile.",
            "Instruim periodic angajații cu privire la diversitate și incluziune.",
          ],
        },
        {
          title: "Raportare și remediere",
          body: "Orice persoană care se consideră discriminată sau tratată inechitabil poate depune o sesizare confidențială la info@uzinex.ro. Toate sesizările sunt investigate cu imparțialitate și, după caz, se iau măsuri corective.",
        },
      ]}
    />
  );
}
