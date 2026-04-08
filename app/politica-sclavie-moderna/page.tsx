import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica privind sclavia modernă — Uzinex",
  description:
    "Angajamentul ferm al Uzinex pentru combaterea sclaviei moderne, a traficului de persoane, muncii forțate și a exploatării în lanțul de aprovizionare.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica privind sclavia modernă"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Declarație de principiu",
          body: "GW LASER TECHNOLOGY S.R.L., denumită în continuare Uzinex, declară în mod ferm și fără echivoc că are o poziție de toleranță zero față de orice formă de sclavie modernă, trafic de persoane, muncă forțată, muncă a copiilor, servitudine pentru datorii sau exploatare umană, indiferent dacă aceste practici au loc în cadrul operațiunilor proprii, al angajaților direcți, al filialelor, al furnizorilor, al subcontractorilor sau al oricărei părți terțe cu care Uzinex are relații de afaceri. Această politică reflectă valorile fundamentale ale companiei: respect pentru demnitatea umană, echitate, legalitate, transparență și responsabilitate socială.",
        },
        {
          title: "Cadru legal și standarde internaționale",
          body: "Prezenta politică este aliniată cu următoarele instrumente juridice și standarde internaționale: (1) Convenția OIM nr. 29 privind munca forțată (1930); (2) Protocolul din 2014 la Convenția OIM nr. 29; (3) Convenția OIM nr. 105 privind abolirea muncii forțate (1957); (4) Convenția OIM nr. 138 privind vârsta minimă (1973); (5) Convenția OIM nr. 182 privind cele mai grave forme ale muncii copiilor (1999); (6) Declarația Universală a Drepturilor Omului a ONU (1948); (7) Principiile Directoare ale ONU privind afacerile și drepturile omului (UNGPs); (8) Pactul Global ONU (UN Global Compact); (9) Protocolul ONU privind prevenirea, combaterea și pedepsirea traficului de persoane (Protocolul Palermo, 2000); (10) Directiva UE 2011/36 privind prevenirea și combaterea traficului de persoane; (11) Legea nr. 678/2001 privind prevenirea și combaterea traficului de persoane din România; (12) Legislația națională a muncii, inclusiv Codul Muncii și Legea 53/2003.",
        },
        {
          title: "Definiții esențiale",
          body: [
            "Sclavia modernă — termen umbrelă care cuprinde toate formele de exploatare în care o persoană este controlată de alta prin constrângere, violență, amenințare, abuz de putere sau poziție de vulnerabilitate, în scopul exploatării.",
            "Trafic de persoane — recrutarea, transportul, transferul, adăpostirea sau primirea de persoane prin amenințare cu forța, uz de forță, constrângere, răpire, fraudă sau înșelăciune, în scopul exploatării.",
            "Muncă forțată — orice muncă sau serviciu pretins de la o persoană sub amenințarea oricărei pedepse și pentru care persoana nu s-a oferit voluntar.",
            "Servitudine pentru datorii — când munca unei persoane este prestată ca garanție pentru o datorie, iar valoarea muncii nu este aplicată asupra datoriei.",
            "Munca copiilor — orice muncă care privează copiii de copilărie, potențial și demnitate și care este dăunătoare dezvoltării lor fizice și mentale.",
            "Exploatare — include, dar nu se limitează la: exploatarea prostituției, alte forme de exploatare sexuală, muncă forțată, sclavie, practici similare sclaviei, servitude sau prelevare de organe.",
          ],
        },
        {
          title: "Domeniile de aplicare a politicii",
          body: "Această politică se aplică în toate operațiunile Uzinex, inclusiv: activitățile desfășurate la sediul social și punctele de lucru, relațiile cu angajații și colaboratorii direcți, selecția și gestionarea furnizorilor de echipamente și componente, contractele cu subcontractorii pentru servicii de instalare, mentenanță și service, relațiile cu distribuitorii și partenerii comerciali, proiectele implementate la clienți, inclusiv cele din sectorul privat, public și de apărare, toate lanțurile de aprovizionare globale pe care Uzinex le utilizează.",
        },
        {
          title: "Evaluarea riscurilor",
          body: [
            "Evaluăm riscurile de sclavie modernă în lanțul de aprovizionare pe baza mai multor factori: țara de origine a furnizorilor, sectorul industrial, complexitatea produselor, transparența relațiilor comerciale, istoricul furnizorilor în materie de drepturi ale muncii.",
            "Acordăm o atenție specială regiunilor cu risc cunoscut pentru muncă forțată sau trafic de persoane, conform rapoartelor internaționale precum Global Slavery Index și Trafficking in Persons Report al Departamentului de Stat al SUA.",
            "Monitorizăm actualizările listelor de sancțiuni internaționale care vizează entități implicate în sclavie modernă sau încălcări ale drepturilor omului.",
            "Pentru furnizorii cu risc mediu sau ridicat, solicităm declarații de conformitate, chestionare de due diligence și, la nevoie, audituri independente.",
          ],
        },
        {
          title: "Selecția și monitorizarea furnizorilor",
          body: [
            "Toți furnizorii și partenerii Uzinex trebuie să accepte în mod expres principiile acestei politici ca parte integrantă a relației contractuale.",
            "Solicităm furnizorilor să confirme în scris că respectă legislația muncii aplicabilă, standardele internaționale ale OIM și nu utilizează muncă forțată, muncă a copiilor sau servitudine pentru datorii.",
            "Pentru contractele de valoare mare sau pentru relațiile strategice, efectuăm verificări periodice prin due diligence, audituri și, la nevoie, vizite la fața locului.",
            "Ne rezervăm dreptul de a rezilia imediat orice contract în cazul descoperirii unor practici incompatibile cu această politică, fără obligația de despăgubire a furnizorului.",
            "Preferăm colaborarea cu furnizori certificați în standarde internaționale precum SA8000, ISO 45001, BSCI, SEDEX SMETA.",
          ],
        },
        {
          title: "Protecția angajaților Uzinex",
          body: "Uzinex se angajează să ofere tuturor angajaților săi: (1) contracte de muncă legale, scrise, conforme cu Codul Muncii Român și cu contractele colective de muncă aplicabile; (2) salarii decente, la nivel cel puțin egal cu salariul minim garantat la nivel național, plătite la termen și fără întârzieri; (3) respectarea orelor de lucru legale, cu compensare corectă pentru ore suplimentare; (4) condiții de muncă sigure și sănătoase, conform standardelor SSM și legislației specifice; (5) libertatea de asociere și dreptul la negociere colectivă; (6) interzicerea discriminării pe orice criteriu (rasă, sex, religie, origine, etc.); (7) interzicerea muncii forțate, a muncii copiilor și a oricărei forme de exploatare; (8) proceduri clare de sesizare a abuzurilor, cu protecția sesizatorului (whistleblower); (9) instruire regulată privind drepturile muncii și recunoașterea semnelor de exploatare.",
        },
        {
          title: "Mecanism de raportare a suspiciunilor",
          body: "Orice persoană — angajat Uzinex, furnizor, partener comercial, client, membru al comunității — care observă sau suspectează practici care contravin acestei politici poate raporta confidențial situația la: email dedicat info@uzinex.ro (cu subiectul [WHISTLEBLOWER]), telefon (+40) 769 081 081, în scris la sediul companiei. Toate sesizările sunt: (1) primite și evaluate cu seriozitate, indiferent de sursă; (2) investigate cu obiectivitate și în timp rezonabil; (3) tratate confidențial, cu protecția completă a sesizatorului împotriva oricăror represalii; (4) urmate de acțiuni concrete acolo unde se confirmă problemele identificate; (5) documentate în rapoartele interne de conformitate. Uzinex garantează că niciun sesizator de bună-credință nu va fi sancționat, penalizat sau discriminat ca urmare a raportării.",
        },
        {
          title: "Investigații și remediere",
          body: "În cazul descoperirii unor practici de sclavie modernă în cadrul operațiunilor proprii sau în lanțul de aprovizionare, Uzinex ia următoarele măsuri: (1) investigație internă imediată, condusă de o echipă dedicată; (2) colaborare cu autoritățile competente (Poliția Română, DIICOT, ITM, Direcția Generală de Asistență Socială); (3) măsuri pentru protejarea și asistarea victimelor (contact cu ONG-uri specializate, consiliere, reabilitare); (4) sancțiuni disciplinare sau contractuale pentru persoanele și entitățile responsabile; (5) remedierea condițiilor care au permis abuzul; (6) comunicare publică, dacă este cazul, despre măsurile luate; (7) raportare către autoritățile internaționale și partenerii relevanți, conform obligațiilor legale.",
        },
        {
          title: "Instruire și conștientizare",
          body: "Uzinex organizează periodic sesiuni de instruire pentru angajați, cu accent pe: recunoașterea semnelor de sclavie modernă și trafic de persoane, procedurile de raportare a suspiciunilor, drepturile și obligațiile prevăzute de Codul Muncii, impactul deciziilor comerciale asupra lanțului de aprovizionare. Pentru manageri și personalul responsabil cu achizițiile, instruirea include module avansate despre due diligence, audituri furnizori și evaluarea riscurilor geografice.",
        },
        {
          title: "Transparență și raportare",
          body: "Uzinex se angajează la transparență privind eforturile sale de combatere a sclaviei moderne. Anual, publicăm un raport de conformitate care include: evaluarea riscurilor din lanțul de aprovizionare, măsurile luate pentru prevenție, rezultatele auditurilor efectuate, eventualele incidente raportate și modul în care au fost gestionate, planurile de îmbunătățire pentru anul următor. Raportul este disponibil la cerere la info@uzinex.ro și, pentru proiectele cu fonduri europene, este integrat în documentația de conformitate DNSH și socială.",
        },
      ]}
    />
  );
}
