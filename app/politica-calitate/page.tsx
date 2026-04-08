import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de calitate — Uzinex",
  description:
    "Angajamentul Uzinex pentru calitate certificată ISO 9001, excelență operațională, îmbunătățire continuă și satisfacția clienților industriali.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de calitate"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Declarație de angajament",
          body: "GW LASER TECHNOLOGY S.R.L., denumită în continuare Uzinex, declară în mod solemn angajamentul său ferm față de furnizarea de echipamente, componente și servicii de cea mai înaltă calitate, care respectă sau depășesc cerințele clienților, standardele internaționale aplicabile, reglementările europene și cele mai bune practici din industria integrării industriale. Calitatea nu este pentru noi un obiectiv abstract, ci o cultură organizațională care ghidează fiecare decizie, fiecare proces și fiecare interacțiune cu clienții, furnizorii și partenerii noștri. Această politică stabilește cadrul sistemului nostru de management al calității și reflectă promisiunea noastră de excelență operațională.",
        },
        {
          title: "Cadrul standardelor aplicate",
          body: "Sistemul de management al calității Uzinex se bazează pe următoarele standarde și cadre de referință: (1) ISO 9001:2015 — Sisteme de management al calității. Cerințe; (2) ISO 9000:2015 — Sisteme de management al calității. Principii fundamentale și vocabular; (3) ISO 9004:2018 — Gestionarea calității. Calitatea unei organizații. Ghid pentru obținerea succesului sustenabil; (4) EN 1090-1 și EN 1090-2 — Execuția structurilor de oțel și aluminiu pentru construcții metalice; (5) ISO/IEC 17025 — Cerințe generale pentru competența laboratoarelor de încercare și etalonare; (6) ISO 19011 — Linii directoare pentru auditarea sistemelor de management; (7) Marcajul CE — Declarația de conformitate cu directivele europene aplicabile (Directiva Mașini 2006/42/CE, Directiva Joasă Tensiune 2014/35/UE, Directiva de Compatibilitate Electromagnetică 2014/30/UE, Directiva de Presiune 2014/68/UE, Directiva ATEX 2014/34/UE); (8) Cerințele specifice sectoriale pentru apărare (STANAG NATO), energie, aviație, medical, acolo unde sunt aplicabile.",
        },
        {
          title: "Principii fundamentale de calitate",
          body: [
            "Orientarea către client — înțelegem profund nevoile și așteptările clienților noștri, oferim soluții adaptate specific cerințelor lor și depunem eforturi continue pentru depășirea acestora.",
            "Leadership — conducerea Uzinex stabilește o viziune clară a calității, un mediu de muncă în care angajații se pot implica activ și obiective strategice aliniate cu așteptările clienților.",
            "Implicarea personalului — toți angajații, la toate nivelurile, sunt esențiali pentru succesul organizației. Fiecare contribuie la calitate prin competențele, motivația și responsabilitatea asumată.",
            "Abordarea bazată pe proces — gestionăm activitățile ca procese interconectate, cu intrări, ieșiri, resurse, indicatori de performanță și responsabilități clare.",
            "Îmbunătățirea continuă — succesul pe termen lung depinde de capacitatea noastră de a învăța, a inova și a ne adapta permanent.",
            "Luarea deciziilor bazate pe dovezi — deciziile se fundamentează pe date, analize obiective și indicatori măsurabili, nu pe intuiție sau preferințe personale.",
            "Managementul relațiilor cu părțile interesate — colaborăm strâns cu furnizorii, partenerii și clienții pentru a crea valoare reciprocă și a optimiza întregul ecosistem de livrare.",
          ],
        },
        {
          title: "Sistemul de management al calității",
          body: "Sistemul de management al calității (SMC) Uzinex este documentat, implementat și menținut conform cerințelor ISO 9001:2015. Componentele principale ale SMC includ: (1) Manualul Calității — document de referință care descrie politica, obiectivele, structura organizatorică și procesele principale; (2) Proceduri documentate pentru procesele-cheie: controlul documentelor, controlul înregistrărilor, auditul intern, controlul produselor neconforme, acțiuni corective, acțiuni preventive; (3) Instrucțiuni de lucru pentru activitățile operaționale specifice; (4) Fișe de post și matrice de responsabilități pentru toate funcțiile; (5) Indicatori de performanță (KPI) monitorizați sistematic; (6) Planuri de calitate pentru proiecte specifice; (7) Înregistrări care demonstrează funcționarea eficace a sistemului.",
        },
        {
          title: "Obiective de calitate",
          body: [
            "Asigurarea unei rate de conformitate de minim 98% la recepția echipamentelor livrate la clienți.",
            "Menținerea unui nivel de satisfacție a clienților de peste 90%, măsurat prin sondaje periodice (NPS, CSAT).",
            "Reducerea anuală a numărului de reclamații și neconformități raportate, prin îmbunătățire continuă.",
            "Respectarea integrală a termenelor de livrare agreate cu clienții, cu o rată de punctualitate de minim 95%.",
            "Asigurarea unei rate de rezolvare în garanție sub pragul de 2% din volumul total livrat.",
            "Creșterea numărului de certificări și recunoașteri externe (ISO, sectoriale, parteneriate cu producători OEM).",
            "Dezvoltarea competențelor angajaților prin minim 40 de ore anuale de training tehnic și managerial per persoană.",
          ],
        },
        {
          title: "Controlul calității în procese",
          body: [
            "Recepția mărfii de la furnizori — verificări cantitative și calitative, validare conformitate cu specificațiile, testare la recepție pentru echipamente critice.",
            "Proiectare și inginerie — validarea desenelor tehnice, calcule de rezistență, simulări CAD, revizuiri de proiect cu echipa multi-disciplinară.",
            "Producție și asamblare (pentru echipamentele configurate intern) — control în procesul de fabricație, trasabilitatea componentelor, teste intermediare.",
            "Teste funcționale înainte de livrare (FAT — Factory Acceptance Test) — validarea funcționării conform specificațiilor, în prezența Clientului atunci când este solicitat.",
            "Ambalare și expediere — verificarea calității ambalajului, a documentației de livrare și a etichetelor.",
            "Instalare și punere în funcțiune (Commissioning) — teste la locația Clientului, integrare cu infrastructura existentă, instruirea operatorilor.",
            "Teste la locația Clientului (SAT — Site Acceptance Test) — validarea performanței reale în condițiile de utilizare, semnarea procesului-verbal de recepție finală.",
            "Servicii post-vânzare — mentenanță preventivă, diagnoză, reparații, gestionarea garanției.",
          ],
        },
        {
          title: "Managementul furnizorilor",
          body: "Uzinex selectează și evaluează furnizorii pe baza unor criterii obiective de calitate, fiabilitate și performanță: (1) Certificări și acreditări relevante (ISO 9001, ISO 14001, ISO 45001, certificări sectoriale); (2) Experiența și referințele în domeniu; (3) Capacitatea de producție și livrare; (4) Calitatea produselor (istoricul defectelor, rata de conformitate); (5) Respectarea termenelor; (6) Stabilitatea financiară; (7) Angajamentele în materie de sustenabilitate și drepturi umane; (8) Comunicarea și suportul tehnic oferit. Furnizorii sunt evaluați periodic, iar relațiile strategice sunt consolidate prin planuri comune de îmbunătățire.",
        },
        {
          title: "Gestionarea neconformităților și acțiuni corective",
          body: "Orice neconformitate identificată — indiferent dacă provine de la recepția mărfii, în procesul intern, la livrare sau la feedback-ul clientului — este tratată sistematic conform următoarei proceduri: (1) Identificarea și documentarea neconformității; (2) Izolarea produsului neconform pentru a preveni utilizarea accidentală; (3) Analiza cauzelor rădăcină (root cause analysis) prin metode precum 5 Whys, diagrama Ishikawa, FMEA; (4) Definirea și implementarea acțiunilor corective imediate pentru rezolvarea problemei punctuale; (5) Definirea acțiunilor preventive pentru evitarea recurenței; (6) Verificarea eficacității acțiunilor luate; (7) Comunicarea cu clientul afectat și ofertarea de soluții adecvate; (8) Înregistrarea întregului proces în baza de date de neconformități pentru analiză statistică și îmbunătățire continuă.",
        },
        {
          title: "Ciclul PDCA și îmbunătățirea continuă",
          body: "Uzinex aplică sistematic ciclul Plan-Do-Check-Act (PDCA), metodologie dezvoltată de W. Edwards Deming și fundamentală în managementul calității: (1) Plan — planificăm îmbunătățirile, stabilim obiective, identificăm resursele necesare și elaborăm planul de acțiune; (2) Do — implementăm planul, executăm acțiunile stabilite și colectăm date; (3) Check — verificăm rezultatele obținute față de obiectivele stabilite, analizăm performanța și identificăm abaterile; (4) Act — standardizăm îmbunătățirile care au funcționat, corectăm cele care nu au funcționat și începem un nou ciclu. Complementar ciclului PDCA, utilizăm metodologii precum Lean, Six Sigma, Kaizen și 5S pentru optimizarea proceselor interne și eliminarea pierderilor.",
        },
        {
          title: "Audituri interne și externe",
          body: [
            "Audituri interne — programate anual, efectuate de echipa internă de audit sau de auditori externi calificați, pentru verificarea conformității cu cerințele ISO 9001 și identificarea oportunităților de îmbunătățire.",
            "Audituri de certificare — efectuate periodic de organismele de certificare acreditate, pentru menținerea certificărilor externe.",
            "Audituri la furnizori — pentru verificarea capacității și conformității partenerilor strategici.",
            "Audituri la clienți — când sunt solicitate, participăm deschis la auditurile efectuate de clienți pentru verificarea sistemului nostru de management.",
            "Audituri în cadrul proiectelor cu fonduri europene — conform cerințelor autorităților contractante și ale organismelor de audit ale UE.",
          ],
        },
        {
          title: "Feedback-ul clienților și satisfacția",
          body: "Ascultăm activ feedback-ul clienților prin multiple canale: (1) sondaje de satisfacție trimise după finalizarea fiecărui proiect important; (2) formulare de feedback disponibile pe site și la email-ul info@uzinex.ro; (3) întâlniri de evaluare periodice cu clienții strategici; (4) analiza reclamațiilor și rezolvarea lor transparentă; (5) sondaje tematice (ex. calitatea service-ului, claritatea documentației); (6) monitorizarea indicatorului NPS (Net Promoter Score). Feedback-ul primit alimentează direct planurile de îmbunătățire și este discutat în ședințele de analiză efectuate de conducere. Credem că fiecare reclamație este o oportunitate de a învăța și de a crește.",
        },
        {
          title: "Competența și formarea personalului",
          body: "Calitatea depinde direct de competența angajaților. Uzinex investește continuu în dezvoltarea echipei prin: (1) programe de onboarding structurate pentru noii angajați; (2) training tehnic periodic pe produsele și tehnologiile din portofoliu; (3) certificări profesionale în management, calitate, proiect și tehnic; (4) participarea la târguri, conferințe și evenimente industriale; (5) schimburi de experiență cu parteneri producători OEM; (6) mentorat intern și transfer de cunoștințe între generații; (7) evaluări anuale de competențe și planuri individuale de dezvoltare. Fișele de post definesc clar competențele necesare pentru fiecare rol, iar angajații sunt încurajați să își extindă aria de expertiză.",
        },
      ]}
    />
  );
}
