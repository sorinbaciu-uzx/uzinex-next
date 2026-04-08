import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de calitate — Uzinex",
  description: "Angajamentul Uzinex pentru calitate certificată, standarde ISO 9001 și îmbunătățire continuă a serviciilor.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de calitate"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Declarație de angajament",
          body: "GW LASER TECHNOLOGY S.R.L. (Uzinex) se angajează să furnizeze echipamente și servicii care respectă sau depășesc cerințele clienților, standardele internaționale aplicabile și reglementările europene.",
        },
        {
          title: "Sistem de management al calității",
          body: "Activitatea noastră este conformă cu standardul ISO 9001 și cu cerințele specifice sectoriale (EN 1090 pentru construcții metalice, Marcaj CE pentru conformitate europeană, DNSH pentru proiecte finanțate UE).",
        },
        {
          title: "Principii de calitate",
          body: [
            "Orientarea către client — înțelegem cerințele reale și livrăm soluții adaptate.",
            "Implicarea echipei — toți angajații contribuie la asigurarea calității.",
            "Abordare bazată pe procese — standardizăm și măsurăm fiecare etapă.",
            "Îmbunătățire continuă — învățăm din feedback și optimizăm constant.",
            "Decizii bazate pe date — audităm, măsurăm, raportăm.",
            "Relații de parteneriat — colaborăm strâns cu furnizorii de încredere.",
          ],
        },
        {
          title: "Control calitate",
          body: "Fiecare echipament este verificat înainte de livrare conform fișei tehnice și specificațiilor clientului. Pentru proiectele custom, realizăm inspecții intermediare și procese-verbale de recepție la fiecare etapă critică.",
        },
        {
          title: "Feedback și îmbunătățire",
          body: "Colectăm sistematic feedback de la clienți prin sondaje post-implementare și analiza reclamațiilor. Toate observațiile alimentează ciclul PDCA (Plan-Do-Check-Act) al sistemului nostru de management.",
        },
      ]}
    />
  );
}
