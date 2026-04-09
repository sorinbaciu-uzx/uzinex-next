import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { getContent } from "@/lib/content";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Echipa Uzinex — integratori industriali",
  description:
    "Cunoaște echipa Uzinex — ingineri, consultanți tehnici și specialiști în integrare industrială pentru sectorul privat, instituții publice și apărare.",
};

type LegalData = {
  title: string;
  updated: string;
  sections: { title: string; body: string | string[] }[];
};

export const TEAM_DEFAULT: LegalData = {
  title: "Echipa Uzinex",
  updated: "Aprilie 2026",
  sections: [
    {
      title: "Cine suntem",
      body: "Uzinex este, înainte de toate, o echipă de oameni pasionați de tehnologie industrială. Ingineri, consultanți tehnici, project manageri, specialiști în achiziții publice și tehnicieni de service — fiecare aduce expertiza și energia sa pentru ca proiectele clienților noștri să devină realitate. Suntem un integrator industrial cu rădăcini românești, dar cu o viziune internațională asupra calității și inovării.",
    },
    {
      title: "Conducere",
      body: "Echipa de management Uzinex este formată din profesioniști cu experiență acumulată în industrie, vânzări tehnice și implementare de proiecte cu finanțare europeană. Conducerea companiei coordonează direct strategia, relațiile cu partenerii internaționali și calitatea livrabilelor către clienți.",
    },
    {
      title: "Departamentul tehnic",
      body: [
        "Ingineri vânzări tehnice — interfața cu clienții, dimensionarea soluțiilor și emiterea ofertelor.",
        "Ingineri proiectanți — configurații tehnice complexe, validare 3D, integrare cu fluxurile clienților.",
        "Project Manageri — coordonarea proiectelor de la contract până la punere în funcțiune.",
        "Tehnicieni service — instalare, commissioning, mentenanță și intervenții la fața locului.",
        "Specialiști achiziții publice — pregătirea dosarelor SEAP/SICAP și asistență pe proceduri guvernamentale.",
      ],
    },
    {
      title: "Echipa comercială",
      body: "Account managerii noștri lucrează strâns cu fiecare client pentru a înțelege contextul, obiectivele și constrângerile proiectului. Nu vindem echipamente — construim parteneriate pe termen lung, în care clientul beneficiază de consultanță continuă, suport tehnic și soluții adaptate evoluției afacerii sale.",
    },
    {
      title: "Cultura Uzinex",
      body: [
        "Integritate — onorăm angajamentele, fără excepție.",
        "Excelență tehnică — investim continuu în formare și certificări.",
        "Orientare către client — succesul clientului este propriul nostru succes.",
        "Responsabilitate — față de mediu, comunitate și echipă.",
        "Inovație — căutăm mereu soluții mai bune, mai eficiente, mai sustenabile.",
      ],
    },
    {
      title: "Vino în echipa noastră",
      body: "Suntem mereu deschiși să cunoaștem profesioniști pasionați de tehnologie industrială. Dacă vrei să faci parte din echipa Uzinex sau să afli mai multe despre rolurile deschise, vizitează pagina de Cariere sau scrie-ne direct la cariere@uzinex.ro.",
    },
  ],
};

export default async function Page() {
  const data = (await getContent<LegalData>("team")) ?? TEAM_DEFAULT;
  return <LegalPage title={data.title} updated={data.updated} sections={data.sections} />;
}
