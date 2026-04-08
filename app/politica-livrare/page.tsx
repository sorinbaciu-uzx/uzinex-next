import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de livrare — Uzinex",
  description: "Condițiile și termenele de livrare pentru echipamentele industriale Uzinex în România și UE.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de livrare"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Zona de livrare",
          body: "Uzinex livrează echipamente industriale și componente în toată România și în statele membre ale Uniunii Europene. Pentru livrări extra-UE, condițiile sunt stabilite individual.",
        },
        {
          title: "Termene de livrare",
          body: [
            "Pentru echipamente standard: termenele sunt comunicate individual, în funcție de disponibilitate și complexitate.",
            "Pentru configurații personalizate: între 8 și 16 săptămâni, în funcție de specificațiile tehnice.",
            "Pentru linii complete integrate: între 12 și 24 săptămâni, incluzând proiectarea, fabricarea, transportul și punerea în funcțiune.",
          ],
        },
        {
          title: "Incoterms",
          body: "Livrarea se face conform regulilor Incoterms 2020, cel mai frecvent EXW, FCA sau DAP, conform acordului comercial stabilit în contract.",
        },
        {
          title: "Transport agabaritic",
          body: "Pentru echipamente grele sau agabaritice, Uzinex organizează transportul prin parteneri specializați, inclusiv autorizații speciale, escortă rutieră și manipulare la destinație.",
        },
        {
          title: "Recepție",
          body: "Clientul are obligația de a asigura accesul și condițiile necesare recepției la punctul de livrare. Procesul-verbal de recepție se semnează la predare.",
        },
        {
          title: "Întârzieri",
          body: "Uzinex comunică proactiv orice întârziere potențială. Pentru proiecte cu finanțare europeană sau termene contractuale stricte, oferim planuri alternative de livrare pentru a evita penalizările.",
        },
      ]}
    />
  );
}
