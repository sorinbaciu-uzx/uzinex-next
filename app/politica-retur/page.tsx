import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de retur — Uzinex",
  description: "Politica de retur și procedura de returnare a echipamentelor industriale Uzinex.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de retur"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Context B2B",
          body: "Uzinex operează exclusiv în regim B2B (business-to-business), furnizând echipamente industriale către persoane juridice. Nu se aplică dreptul de retragere rezervat consumatorilor finali din legislația consumatorilor.",
        },
        {
          title: "Retur pentru echipamente standard",
          body: "Echipamentele standard din catalog pot fi returnate în termen de 14 zile calendaristice de la recepție, cu condiția să fie nefolosite, în ambalajul original și însoțite de documentele de livrare. Costurile de transport retur sunt suportate de client.",
        },
        {
          title: "Neconformități",
          body: "În cazul livrării unui echipament cu defecte de fabricație sau neconformități tehnice, clientul are dreptul la înlocuire, reparație sau restituirea prețului plătit, pe baza procesului-verbal de constatare semnat de ambele părți.",
        },
        {
          title: "Excluderi",
          body: [
            "Echipamentele personalizate, configurate sau fabricate la comandă nu pot fi returnate.",
            "Echipamentele puse în funcțiune sau care prezintă urme de utilizare nu pot fi returnate, decât în caz de defecte de fabricație.",
            "Consumabilele și piesele de uzură folosite nu sunt returnabile.",
          ],
        },
        {
          title: "Procedura de retur",
          body: "Cererea de retur se transmite în scris la info@uzinex.ro, menționând numărul facturii și motivul. Echipa noastră răspunde în maxim 3 zile lucrătoare cu instrucțiunile și documentele necesare.",
        },
        {
          title: "Rambursare",
          body: "Rambursarea sumelor se face prin transfer bancar, în termen de maxim 30 de zile de la primirea și verificarea echipamentului returnat.",
        },
      ]}
    />
  );
}
