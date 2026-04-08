import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Termeni și condiții — Uzinex",
  description: "Termenii și condițiile de utilizare ale site-ului uzinex.ro și ale serviciilor comerciale Uzinex.",
};

export default function Page() {
  return (
    <LegalPage
      title="Termeni și condiții"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Identitate",
          body: "Site-ul uzinex.ro este operat de GW LASER TECHNOLOGY S.R.L., cu sediul în Sat Rediu, Comuna Rediu, Strada Împăcării Nr. 2, înregistrată la Registrul Comerțului J2023003903220, CUI RO 49240731.",
        },
        {
          title: "Obiectul contractului",
          body: "Uzinex furnizează echipamente industriale, componente, soluții tehnologice la cheie și servicii de consultanță, proiectare, implementare și mentenanță către companii private, instituții publice și operatori din sectorul de apărare.",
        },
        {
          title: "Oferte și comenzi",
          body: [
            "Ofertele tehnice și comerciale sunt valabile 30 de zile de la data emiterii, dacă nu se specifică altfel.",
            "Comenzile devin ferme după confirmarea scrisă a ambelor părți și plata avansului stabilit.",
            "Configurațiile tehnice personalizate sunt validate printr-un proces-verbal semnat înainte de punerea în fabricație.",
          ],
        },
        {
          title: "Prețuri și plată",
          body: "Prețurile sunt exprimate în EUR sau RON, fără TVA, dacă nu se specifică altfel. Plata se face prin transfer bancar, leasing sau finanțare aprobată. Termenele și condițiile de plată sunt stabilite individual pentru fiecare contract.",
        },
        {
          title: "Livrare și recepție",
          body: "Livrarea se face conform Incoterms convenit și cu respectarea termenelor stabilite în contract. Clientul are obligația de a verifica starea echipamentelor la recepție și de a semnala eventualele neconformități în termen de 48 ore.",
        },
        {
          title: "Garanție",
          body: "Uzinex oferă o garanție standard de 60 de luni pentru defecte de fabricație la echipamentele din catalog și 24 de luni pentru echipamentele realizate la comandă. Condițiile complete sunt specificate în contractele individuale.",
        },
        {
          title: "Limitarea răspunderii",
          body: "Uzinex nu răspunde pentru daune indirecte, pierderi de producție sau profit rezultate din utilizarea incorectă a echipamentelor, lipsa mentenanței sau modificări neautorizate.",
        },
        {
          title: "Legislație aplicabilă",
          body: "Prezentele termeni și condiții sunt guvernate de legislația română. Litigiile sunt soluționate pe cale amiabilă sau, în caz contrar, de instanțele competente de la sediul Uzinex.",
        },
      ]}
    />
  );
}
