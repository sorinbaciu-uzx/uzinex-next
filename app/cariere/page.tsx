import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cariere — Uzinex",
  description:
    "Alătură-te echipei Uzinex — integrator industrial. Roluri deschise în inginerie, vânzări tehnice, management de proiect, service și operațiuni.",
};

type LegalData = {
  title: string;
  updated: string;
  sections: { title: string; body: string | string[] }[];
};

export const CARIERE_DEFAULT: LegalData = {
  title: "Cariere la Uzinex",
  updated: "Aprilie 2026",
  sections: [
    {
      title: "Construim împreună viitorul industriei românești",
      body: "GW LASER TECHNOLOGY S.R.L., denumită în continuare Uzinex, este un integrator industrial care livrează echipamente grele și tehnologie la cheie pentru sectorul privat, instituții de stat și sectorul de apărare. Căutăm oameni pasionați de tehnologie industrială, cu spirit inginerești și dorința de a contribui la proiecte complexe finanțate prin fonduri europene, PNRR și achiziții guvernamentale.",
    },
    {
      title: "De ce să lucrezi la Uzinex",
      body: [
        "Proiecte cu impact real — linii complete de producție, soluții de automatizare, echipamente critice pentru industrie și apărare.",
        "Echipă de ingineri experimentați care te vor mentoriza și sprijini în dezvoltarea profesională.",
        "Acces la tehnologii de ultimă generație de la branduri precum Siemens, Mitsubishi, ABB, Schneider, Fanuc, Yaskawa.",
        "Oportunități de training, certificări tehnice și participare la târguri industriale internaționale.",
        "Pachet salarial competitiv, bonusuri legate de performanță și beneficii extra-salariale.",
        "Program flexibil, echilibru sănătos între muncă și viața personală.",
        "Sediu modern în Parcul Științific & Tehnologic Tehnopolis din Iași.",
        "Cultură organizațională bazată pe integritate, meritocrație și respect.",
      ],
    },
    {
      title: "Rolurile pe care le căutăm",
      body: [
        "Inginer vânzări tehnice (B2B / B2G) — pentru proiectare ofertă, relația cu clienții industriali și autoritățile contractante.",
        "Inginer proiectant — pentru configurații tehnice de echipamente, linii de producție și soluții turnkey.",
        "Project Manager industrial — pentru coordonarea implementării proiectelor la cheie, de la contract până la punere în funcțiune.",
        "Tehnician service și mentenanță — pentru instalare, punere în funcțiune și suport post-vânzare la sediile clienților.",
        "Specialist achiziții publice (SEAP/SICAP) — pentru pregătirea dosarelor de participare la licitații și proceduri guvernamentale.",
        "Consultant fonduri europene — pentru sprijinirea clienților în structurarea proiectelor cu finanțare UE/PNRR.",
        "Account Manager — pentru dezvoltarea relațiilor strategice cu clienți industriali majori.",
        "Inginer automatizări și robotică — pentru proiecte de integrare a liniilor automatizate.",
      ],
    },
    {
      title: "Ce căutăm la candidați",
      body: [
        "Studii superioare tehnice (mecanică, electrotehnică, automatizări, inginerie industrială) sau echivalent.",
        "Pasiune pentru tehnologie, curiozitate intelectuală și dorința de a învăța continuu.",
        "Capacitatea de a lucra în echipă multidisciplinară și de a comunica eficient cu clienți și parteneri.",
        "Integritate profesională, responsabilitate și atenție la detalii.",
        "Cunoștințe de limbă engleză (nivel mediu-avansat) pentru documentație tehnică și comunicare cu producători internaționali.",
        "Disponibilitate pentru deplasări ocazionale la clienți sau târguri industriale.",
        "Permis de conducere categoria B reprezintă un avantaj pentru anumite roluri.",
      ],
    },
    {
      title: "Procesul de recrutare",
      body: [
        "Pasul 1 — Aplicație: Trimite CV-ul și o scurtă scrisoare de intenție la adresa cariere@uzinex.ro, menționând postul pentru care aplici.",
        "Pasul 2 — Screening inițial: Echipa de resurse umane analizează aplicația și revine cu răspuns în maxim 7 zile lucrătoare.",
        "Pasul 3 — Interviu HR: Discuție despre experiența profesională, motivație și așteptări reciproce.",
        "Pasul 4 — Interviu tehnic: Evaluare tehnică cu managerul direct al poziției și, după caz, exercițiu practic.",
        "Pasul 5 — Întâlnire finală: Discuție cu conducerea, prezentarea detaliată a pachetului și a rolului.",
        "Pasul 6 — Ofertă și onboarding: Semnarea contractului și program structurat de integrare în echipă.",
      ],
    },
    {
      title: "Egalitate de șanse",
      body: "Uzinex este un angajator care promovează activ egalitatea de șanse, diversitatea și incluziunea. Nu discriminăm pe criterii de sex, vârstă, rasă, etnie, religie, orientare sexuală, dizabilitate sau alte caracteristici protejate de lege. Toate deciziile de angajare se bazează exclusiv pe competențe, experiență și potențial. Pentru detalii complete, te invităm să consulți Politica privind egalitatea de șanse disponibilă în footer-ul site-ului.",
    },
    {
      title: "Aplicații spontane",
      body: "Nu găsești un rol potrivit în lista de mai sus? Nu-i nimic — suntem mereu deschiși să cunoaștem profesioniști talentați din industrie. Trimite CV-ul la cariere@uzinex.ro cu subiectul [APLICATIE SPONTANA] și descrie pe scurt ariile în care crezi că poți contribui. Vom păstra aplicația ta și te vom contacta atunci când apare o oportunitate relevantă.",
    },
    {
      title: "Contact recrutare",
      body: "Pentru orice întrebare legată de cariere la Uzinex, ne poți contacta la: email cariere@uzinex.ro, telefon (+40) 769 081 081, sediu Parc Științific & Tehnologic Tehnopolis, Bulevardul Poitiers nr. 10, 700671 Iași. Datele candidaților sunt prelucrate strict conform Politicii de confidențialitate și respectă cerințele GDPR.",
    },
  ],
};

export default async function Page() {
  const data = (await getContent<LegalData>("cariere")) ?? CARIERE_DEFAULT;
  return <LegalPage title={data.title} updated={data.updated} sections={data.sections} />;
}
