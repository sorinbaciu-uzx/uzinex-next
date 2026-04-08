import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de mediu — Uzinex",
  description:
    "Angajamentul Uzinex pentru sustenabilitate, respectarea principiului DNSH, conformitate ISO 14001 și reducerea impactului asupra mediului în toate activitățile.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de mediu"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Viziunea Uzinex privind sustenabilitatea",
          body: "GW LASER TECHNOLOGY S.R.L., denumită în continuare Uzinex, recunoaște că activitățile industriale au un impact semnificativ asupra mediului natural și se angajează să integreze principiile sustenabilității în toate aspectele afacerii sale. Credem că rolul unui integrator industrial modern nu este doar să livreze echipamente performante, ci să contribuie activ la tranziția către o economie circulară, eficientă energetic și cu emisii reduse. Această politică exprimă angajamentul nostru ferm față de protecția mediului, conservarea resurselor naturale, reducerea amprentei de carbon și promovarea tehnologiilor verzi, în beneficiul generațiilor prezente și viitoare.",
        },
        {
          title: "Cadru legal și standarde aplicabile",
          body: "Activitatea Uzinex respectă integral următoarele instrumente legale și standarde de mediu: (1) Regulamentul (UE) 2020/852 privind stabilirea unui cadru de facilitare a investițiilor durabile (Taxonomia UE); (2) Regulamentul (UE) 2021/241 de instituire a Mecanismului de redresare și reziliență (PNRR), inclusiv principiul Do No Significant Harm (DNSH); (3) Pactul Verde European (European Green Deal); (4) Pachetul legislativ Fit for 55 al UE; (5) Directiva UE 2014/94 privind infrastructura pentru combustibili alternativi; (6) Directiva UE 2012/27 privind eficiența energetică; (7) Directiva UE 2008/98 privind deșeurile; (8) Regulamentul REACH (1907/2006) privind produsele chimice; (9) Directiva DEEE (2012/19/UE) privind deșeurile de echipamente electrice și electronice; (10) Standardul ISO 14001 privind sistemele de management de mediu; (11) Legislația națională română, inclusiv OUG 195/2005 privind protecția mediului, Legea 211/2011 privind regimul deșeurilor, Legea 121/2014 privind eficiența energetică; (12) Cadrul de raportare GRI (Global Reporting Initiative) și indicatorii ESG (Environmental, Social, Governance).",
        },
        {
          title: "Principiul DNSH — Do No Significant Harm",
          body: "Uzinex aplică riguros principiul Do No Significant Harm (a nu prejudicia în mod semnificativ), esențial pentru proiectele finanțate din fonduri europene (PNRR, Horizon Europe, InvestEU, Fondurile Structurale). Principiul DNSH impune ca investițiile să nu cauzeze prejudicii semnificative niciunuia dintre următoarele șase obiective de mediu: (1) atenuarea schimbărilor climatice; (2) adaptarea la schimbările climatice; (3) utilizarea durabilă și protecția resurselor de apă și marine; (4) tranziția către o economie circulară; (5) prevenirea și controlul poluării; (6) protecția și restaurarea biodiversității și a ecosistemelor. Pentru fiecare proiect cu finanțare europeană, elaborăm documentația DNSH completă, cu analize detaliate pe fiecare obiectiv, dovezi concrete de conformitate și măsuri de minimizare a impactului.",
        },
        {
          title: "Selecția echipamentelor cu impact redus",
          body: [
            "Propunem clienților exclusiv echipamente cu eficiență energetică ridicată, certificate conform standardelor europene (etichete energetice, Marcaj CE, conformitate ErP — Energy-related Products).",
            "Prioritizăm tehnologiile cu emisii reduse de CO2, consum redus de apă, materiale reciclabile și componente care pot fi recuperate la sfârșitul ciclului de viață.",
            "Pentru echipamentele grele (excavatoare, macarale, generatoare), oferim versiuni hibride, electrice sau cu motoare diesel Stage V conforme cu normele europene de emisii.",
            "Pentru echipamentele CNC și laser, selectăm modele cu sisteme de recuperare a căldurii, iluminat LED și sisteme inteligente de gestionare a consumului.",
            "Pentru robotică și automatizare, promovăm soluții cu recuperare de energie la frânare, motoare cu randament înalt (IE4, IE5) și optimizare algoritmică a traiectoriilor.",
          ],
        },
        {
          title: "Lanțul de aprovizionare sustenabil",
          body: [
            "Colaborăm preferențial cu furnizori care dețin certificări de mediu recunoscute internațional: ISO 14001 (sistem de management de mediu), ISO 50001 (management energetic), EMAS (Eco-Management and Audit Scheme).",
            "Evaluăm periodic furnizorii pe criterii de sustenabilitate: origine materiale, consum de energie în producție, emisii, gestionarea deșeurilor, politici sociale și de guvernanță.",
            "Preferăm furnizorii europeni pentru reducerea amprentei de transport, acolo unde alternative echivalente sunt disponibile.",
            "Solicităm furnizorilor documentația de conformitate REACH și declarații privind absența substanțelor periculoase (RoHS).",
            "Încurajăm furnizorii să adopte practici de economie circulară: reutilizarea materialelor, ambalaje reciclabile, programe de take-back pentru produsele uzate.",
          ],
        },
        {
          title: "Gestionarea deșeurilor și economia circulară",
          body: [
            "Implementăm un sistem intern de colectare selectivă a deșeurilor: hârtie/carton, plastic, sticlă, metal, deșeuri electronice (DEEE), uleiuri uzate, baterii.",
            "Ambalajele utilizate pentru livrarea echipamentelor sunt preponderent reciclabile sau reutilizabile (lemn tratat, carton, folii VCI recuperabile).",
            "Pentru echipamentele ajunse la sfârșitul ciclului de viață, facilităm colectarea și reciclarea prin parteneri autorizați ANPM.",
            "Promovăm recondiționarea și upgrade-ul echipamentelor existente la clienți, ca alternativă la achiziționarea de produse noi, pentru proiectele unde această opțiune este viabilă tehnic.",
            "Pentru componentele înlocuite în service, asigurăm recuperarea și reintroducerea în circuit prin programe de remanufacturare cu partenerii OEM.",
            "Măsurăm și raportăm cantitățile de deșeuri generate anual, cu obiectivul de reducere continuă.",
          ],
        },
        {
          title: "Reducerea amprentei de carbon",
          body: "Uzinex și-a propus o strategie de decarbonizare aliniată cu obiectivele UE pentru 2030 (reducere cu 55% a emisiilor față de 1990) și neutralitate climatică până în 2050. Măsurile concrete includ: (1) monitorizarea și raportarea emisiilor proprii (Scope 1 — directe, Scope 2 — energie electrică, Scope 3 — lanț de aprovizionare); (2) eficientizarea energetică a sediilor prin iluminat LED, izolare termică, sisteme HVAC moderne; (3) achiziționarea de energie electrică din surse regenerabile certificate (garanții de origine); (4) flota de vehicule comerciale tranziționată gradual spre electric sau hibrid; (5) optimizarea rutelor de livrare pentru minimizarea kilometrilor parcurși; (6) promovarea întâlnirilor virtuale pentru reducerea călătoriilor de afaceri; (7) compensarea emisiilor reziduale prin proiecte certificate de absorbție a carbonului (reforestare, tehnologii de captare).",
        },
        {
          title: "Conformitatea REACH și substanțe periculoase",
          body: "Toate echipamentele și componentele furnizate de Uzinex respectă Regulamentul REACH (CE) 1907/2006 privind înregistrarea, evaluarea, autorizarea și restricționarea substanțelor chimice. Verificăm că furnizorii noștri: (1) nu utilizează substanțele din Lista Candidaților SVHC (Substanțe de Îngrijorare Foarte Mare) în concentrații peste 0,1%; (2) respectă restricțiile din Anexa XVII REACH; (3) furnizează fișele de date de siguranță (SDS) pentru toate produsele chimice; (4) respectă Directiva RoHS privind restricționarea anumitor substanțe periculoase în echipamentele electrice și electronice. În cazul identificării unor substanțe problematice, căutăm alternative mai sigure împreună cu producătorul.",
        },
        {
          title: "Eficiență energetică în operațiuni proprii",
          body: [
            "Audit energetic periodic al sediilor și punctelor de lucru pentru identificarea oportunităților de economisire.",
            "Investiții în echipamente de birou și IT cu clasă energetică înaltă.",
            "Sisteme inteligente de gestionare a iluminatului și climatizării, cu senzori de prezență și control automat.",
            "Politică de tipărire responsabilă, cu utilizare preferențială a documentelor digitale.",
            "Recipiente reutilizabile, eliminarea obiectelor de unică folosință (pahare plastic, tacâmuri, farfurii) din spațiile de lucru.",
            "Campanii interne de conștientizare a angajaților privind comportamente eco-responsabile la birou.",
          ],
        },
        {
          title: "Transparență și raportare către clienți",
          body: "Pentru proiectele cu finanțare europeană sau clienții care au cerințe ESG stricte, Uzinex pune la dispoziție: (1) documentația completă de conformitate DNSH, elaborată conform metodologiei Comisiei Europene; (2) certificate de conformitate REACH și RoHS pentru echipamente; (3) fișe de date de siguranță (SDS) pentru substanțele utilizate; (4) calculul amprentei de carbon a echipamentelor livrate (LCA — Life Cycle Assessment) atunci când este disponibil; (5) rapoarte de sustenabilitate anuale; (6) declarații privind sursele de aprovizionare și trasabilitatea lanțului; (7) suport tehnic pentru completarea documentației de proiect pentru fondurile europene sau PNRR.",
        },
        {
          title: "Formare și cultură organizațională",
          body: "Promovăm o cultură organizațională orientată către sustenabilitate prin: instruirea periodică a angajaților privind legislația de mediu și bune practici, integrarea criteriilor de sustenabilitate în procesele de decizie, recunoașterea și recompensarea inițiativelor de mediu ale angajaților, implicarea echipei în activități de voluntariat ecologic (plantări de copaci, curățarea zonelor publice). Conștientizăm că tranziția verde este o responsabilitate colectivă și fiecare angajat contribuie la atingerea obiectivelor de sustenabilitate.",
        },
        {
          title: "Îmbunătățire continuă și obiective",
          body: "Uzinex își stabilește anual obiective măsurabile de mediu, aliniate cu strategia europeană Green Deal și cu cerințele specifice ale clienților și investitorilor. Exemple de obiective: reducerea consumului de energie cu X% față de anul precedent, creșterea ponderii energiei regenerabile în total consum, reducerea deșeurilor trimise la depozit cu X%, creșterea numărului de furnizori certificați ISO 14001, integrarea criteriilor DNSH în 100% din proiectele cu finanțare europeană. Progresul este monitorizat trimestrial și raportat conducerii, iar rezultatele sunt publicate în raportul anual de sustenabilitate.",
        },
      ]}
    />
  );
}
