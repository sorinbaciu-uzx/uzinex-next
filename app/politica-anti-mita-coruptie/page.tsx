import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica anti mită și corupție — Uzinex",
  description:
    "Politica fermă a Uzinex împotriva corupției, mitei, traficului de influență și plăților de facilitare, conform standardelor ISO 37001, UK Bribery Act și FCPA.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica anti mită și corupție"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Declarație de toleranță zero",
          body: "GW LASER TECHNOLOGY S.R.L., denumită în continuare Uzinex, declară în mod categoric și fără rezerve că adoptă o politică de toleranță zero față de orice formă de mită, corupție, trafic de influență, plăți de facilitare, favoritisme ilegale sau obținere de avantaje prin mijloace necorespunzătoare, indiferent de valoarea sau contextul acestora. Această politică se aplică tuturor angajaților, managerilor, directorilor, consultanților, reprezentanților, agenților, furnizorilor, subcontractorilor, partenerilor comerciali și oricăror alte persoane care acționează în numele sau în beneficiul Uzinex, în toate jurisdicțiile în care compania își desfășoară activitatea. Integritatea este un valor fundamental al Uzinex și nu face obiectul compromisurilor, indiferent de presiunile comerciale sau de eventualele pierderi de afaceri.",
        },
        {
          title: "Cadrul legal și standardele aplicabile",
          body: "Politica Uzinex este aliniată cu următoarele instrumente legale și standarde internaționale: (1) Legea nr. 78/2000 privind prevenirea, descoperirea și sancționarea faptelor de corupție din România; (2) Codul Penal Român, în special Art. 289-292 privind infracțiunile de corupție; (3) Legea nr. 161/2003 privind unele măsuri pentru asigurarea transparenței în exercitarea demnităților publice; (4) Legea nr. 571/2004 privind protecția personalului din autoritățile publice care semnalează încălcări ale legii (protecția avertizorilor de integritate); (5) Strategia Națională Anticorupție adoptată periodic de Guvernul României; (6) UK Bribery Act 2010 — una dintre cele mai stricte legislații anti-mită din lume, cu aplicabilitate extrateritorială; (7) US Foreign Corrupt Practices Act (FCPA) — aplicabil companiilor care au legături cu SUA; (8) Convenția OCDE privind combaterea mituirii funcționarilor publici străini în tranzacțiile comerciale internaționale; (9) Convenția ONU împotriva Corupției (UNCAC); (10) Convenția penală a Consiliului Europei privind corupția; (11) Directivele UE privind achizițiile publice (2014/24/UE, 2014/25/UE) care includ prevederi anticorupție; (12) Standardul ISO 37001:2016 privind sistemele de management anti-mită.",
        },
        {
          title: "Definiții esențiale",
          body: [
            "Mită — oferirea, promiterea, darea, solicitarea sau acceptarea, direct sau indirect, a oricărui avantaj necuvenit (bani, bunuri, servicii, favoruri, poziții, oportunități) către sau de la o persoană, în scopul influențării unei decizii oficiale sau comerciale.",
            "Corupție — abuz de putere încredințată pentru obținerea unui câștig personal sau a unui avantaj necuvenit pentru terți.",
            "Trafic de influență — fapta unei persoane care, având influență reală sau pretinsă asupra unui funcționar, pretinde, primește sau acceptă bani/alte foloase pentru a determina acest funcționar să îndeplinească, să nu îndeplinească, să urgenteze ori să întârzie îndeplinirea unui act ce intră în atribuțiile sale.",
            "Plăți de facilitare (speed money, grease payments) — plăți mici către funcționari publici pentru a accelera proceduri administrative de rutină (eliberarea unei autorizații, procesarea unor documente). Chiar dacă sunt acceptate în unele jurisdicții, Uzinex le interzice categoric.",
            "Favoritisme ilegale — oferirea de avantaje nejustificate unor persoane sau entități în baza unor relații personale, politice sau de afaceri, în detrimentul concurenței corecte.",
            "Conflict de interese — situația în care interesele personale ale unui angajat sau reprezentant Uzinex pot influența obiectivitatea deciziilor sale profesionale.",
            "Spălare de bani — procesul prin care fondurile obținute din activități ilegale sunt transformate în aparent legitime prin tranzacții financiare.",
          ],
        },
        {
          title: "Comportamente strict interzise",
          body: [
            "Oferirea sau promiterea de bani, bunuri sau favoruri către funcționari publici români sau străini, pentru a influența o decizie comercială, administrativă sau de achiziție publică.",
            "Oferirea de cadouri sau ospitalitate nejustificate către reprezentanții clienților, furnizorilor sau autorităților, care ar putea crea obligații sau ar putea fi percepute ca mită.",
            "Acceptarea de plăți, comisioane sau beneficii personale de la furnizori, subcontractori sau parteneri, în schimbul acordării contractelor sau al altor decizii.",
            "Plățile de facilitare, indiferent de valoarea lor sau de justificarea aparentă.",
            "Sponsorizările sau donațiile mascate care urmăresc obținerea unui avantaj comercial nejustificat.",
            "Angajarea de intermediari (agenți, consultanți, lobby-iști) fără efectuarea unei diligențe corespunzătoare asupra integrității acestora.",
            "Utilizarea de vehicule corporative (companii offshore, tranzacții opace) pentru a masca beneficiari reali sau pentru a eluda controalele.",
            "Conflictele de interese nedeclarate — angajații sunt obligați să raporteze orice situație care ar putea crea aparența unui conflict.",
            "Finanțarea partidelor politice sau a politicienilor individual, în numele sau din resursele Uzinex, fără aprobare expresă și înregistrare transparentă.",
            "Utilizarea facilităților, resurselor sau informațiilor Uzinex în scopuri personale sau pentru obținerea de avantaje nejustificate.",
          ],
        },
        {
          title: "Cadouri, ospitalitate și evenimente corporative",
          body: "Uzinex recunoaște că oferirea de cadouri simbolice și ospitalitate rezonabilă este o practică normală în relațiile de afaceri. Totuși, pentru a preveni orice confuzie cu mita, se aplică următoarele reguli stricte: (1) Cadourile și ospitalitatea trebuie să fie rezonabile ca valoare (limita orientativă este de 100 EUR per ocazie, per persoană), ocazionale și aliniate cu practicile legitime ale industriei; (2) Trebuie să fie legate de scopuri de afaceri clare — prezentări de produse, evenimente industriale, inaugurări; (3) Trebuie să fie transparente — declarate managerilor direcți și înregistrate în registrul de cadouri atunci când depășesc valoarea simbolică; (4) Nu trebuie oferite cu scopul de a influența o decizie specifică sau în timpul unei proceduri de achiziție publică active; (5) Cadourile către funcționari publici sunt permise doar în cazuri excepționale (suveniruri promoționale cu valoare minimă) și trebuie aprobate în prealabil; (6) Banii în numerar, echivalentele de numerar (carduri cadou necontrolate, cecuri), călătoriile turistice nejustificate sau vouchere de valoare mare sunt strict interzise ca formă de cadou sau ospitalitate.",
        },
        {
          title: "Achizițiile publice, SEAP/SICAP și relațiile cu statul",
          body: "Având în vedere că Uzinex participă frecvent la proceduri de achiziție publică prin SEAP și SICAP și lucrează cu instituții de stat pentru proiecte cu finanțare europeană (PNRR, POIM, POCU) și cu sectorul de apărare, aplicăm cele mai stricte standarde de integritate în această zonă: (1) Respectăm integral Legea nr. 98/2016 privind achizițiile publice și Legea nr. 99/2016 privind achizițiile sectoriale; (2) Nu oferim niciun fel de avantaje nejustificate membrilor comisiilor de evaluare, funcționarilor publici sau reprezentanților autorităților contractante; (3) Nu participăm la înțelegeri de tip cartel cu alți ofertanți pentru a distorsiona concurența; (4) Nu acceptăm cereri de plăți informale, comisioane sau alte forme de retribuire în afara contractului; (5) Documentăm complet toate interacțiunile cu autoritățile contractante și păstrăm trasabilitatea deciziilor; (6) În cazul identificării unor suspiciuni de corupție în cadrul unei proceduri, raportăm la autoritățile competente (ANAP, DNA, ANI, Curtea de Conturi) și colaborăm cu investigațiile; (7) Pentru proiectele cu finanțare europeană, respectăm suplimentar regulile specifice privind conflictele de interese, publicarea datelor beneficiarilor reali și prevenirea fraudei (OLAF).",
        },
        {
          title: "Diligența privind terții (Third-Party Due Diligence)",
          body: "Uzinex efectuează diligențe rezonabile înainte de a iniția relații comerciale cu terți care ar putea reprezenta un risc de corupție: (1) Verificarea identității, istoriei și reputației potențialului partener prin surse deschise (ONRC, ANAF, SEAP, presă, registre publice); (2) Verificarea listelor internaționale de sancțiuni (OFAC, EU Sanctions Map, UN Sanctions); (3) Evaluarea proprietății beneficiare (Ultimate Beneficial Owner) pentru identificarea persoanelor care dețin controlul real; (4) Analiza expunerii politice (Politically Exposed Persons — PEP); (5) Verificarea existenței unor probleme judiciare anterioare legate de corupție sau fraudă; (6) Clauze contractuale stricte privind anti-mită și dreptul Uzinex de a rezilia imediat în caz de încălcare; (7) Monitorizare continuă a partenerilor strategici, cu reevaluare periodică; (8) Evitarea relațiilor cu intermediari care nu oferă servicii reale, substanțiale și verificabile.",
        },
        {
          title: "Mecanism de raportare — linia anticorupție",
          body: "Uzinex a implementat un sistem confidențial de raportare pentru suspiciunile de mită, corupție sau alte abateri etice. Orice angajat, partener, client, furnizor sau terț poate raporta situațiile suspecte prin: (1) Email dedicat — info@uzinex.ro cu subiectul [WHISTLEBLOWER] sau [ANTICORUPTIE]; (2) Telefon — (+40) 769 081 081, cu solicitarea unei discuții confidențiale; (3) În scris, prin poștă la sediul social al companiei; (4) Direct către manageri, responsabili de conformitate sau conducerea companiei. Toate sesizările sunt: tratate cu confidențialitate absolută, investigate profesional și obiectiv, urmate de acțiuni concrete atunci când se confirmă problemele identificate. Uzinex garantează protecția avertizorilor de integritate împotriva oricăror forme de represalii, concediere, retrogradare, discriminare sau alte consecințe negative, conform Legii nr. 571/2004 și Directivei UE 2019/1937 privind protecția persoanelor care raportează încălcări ale dreptului UE.",
        },
        {
          title: "Investigarea sesizărilor și măsuri disciplinare",
          body: [
            "Orice sesizare primită este înregistrată și alocată unei echipe de investigare independente, compusă din persoane fără conflicte de interese în cazul respectiv.",
            "Investigația se desfășoară cu obiectivitate, rapiditate și respectarea drepturilor tuturor părților implicate.",
            "Sunt colectate probe documentare, se efectuează interviuri cu martorii și persoanele vizate, se analizează tranzacțiile financiare relevante.",
            "Concluziile investigației sunt documentate într-un raport confidențial prezentat conducerii.",
            "Măsurile disciplinare pot include: avertisment, suspendare, concediere, rezilierea contractelor comerciale, acțiuni civile pentru recuperarea daunelor, sesizarea autorităților competente (DNA, DIICOT, Parchet, ANI) în cazul faptelor penale.",
            "Rezultatele majore sunt raportate conducerii și, după caz, sunt integrate în rapoartele anuale de conformitate.",
          ],
        },
        {
          title: "Formare și cultură organizațională",
          body: "Uzinex investește continuu în formarea angajaților privind etica și anticorupția: (1) Training obligatoriu în procesul de onboarding pentru toți noii angajați; (2) Sesiuni anuale de actualizare pentru întreg personalul, cu studii de caz și exerciții practice; (3) Training specializat pentru persoanele cu roluri de risc sporit (vânzări, achiziții, relații cu autoritățile); (4) Module e-learning disponibile oricând, cu certificare; (5) Comunicare internă constantă prin newsletter-e, postere, ședințe de echipă; (6) Integrarea principiilor anticorupție în codul de conduită al companiei; (7) Cultivarea unei culturi în care etica este vorbită deschis, iar angajații se simt încurajați să ridice întrebări sau să raporteze îngrijorări fără teamă.",
        },
        {
          title: "Gestiunea financiară transparentă",
          body: [
            "Toate tranzacțiile financiare sunt înregistrate complet, corect și la timp în evidențele contabile, conform legislației.",
            "Nu există conturi bancare paralele, off-the-books, sau fonduri nedeclarate.",
            "Plățile se efectuează numai prin canale bancare oficiale, cu documentație justificativă completă.",
            "Cheltuielile de reprezentare, cadourile și ospitalitatea sunt declarate separat și aprobate conform politicii interne.",
            "Auditul intern și extern verifică periodic conformitatea cu politica anticorupție.",
            "Colaborăm strâns cu contabilii autorizați, auditori financiari și consultanți fiscali pentru asigurarea trasabilității.",
          ],
        },
        {
          title: "Sancțiuni pentru încălcarea politicii",
          body: "Orice încălcare a acestei politici este considerată o abatere gravă și atrage sancțiuni proporționale cu gravitatea faptei: (1) Pentru angajați — măsuri disciplinare conform Codului Muncii, de la avertisment scris până la desfacerea disciplinară a contractului de muncă; (2) Pentru furnizori, subcontractori sau parteneri — rezilierea imediată a contractelor, excluderea din listele de parteneri autorizați, recuperarea prejudiciilor cauzate; (3) Acțiuni civile pentru recuperarea daunelor materiale și morale suferite de Uzinex; (4) Sesizarea autorităților competente (DNA, DIICOT, Parchetul General, ANI, Curtea de Conturi) pentru investigarea penală; (5) Publicarea de informații despre încălcare atunci când transparența este cerută de lege sau de interesul public. Nicio persoană, indiferent de poziția sa în cadrul companiei sau de importanța relațiilor comerciale, nu este exceptată de la aplicarea sancțiunilor.",
        },
        {
          title: "Responsabilități și guvernanță",
          body: "Aplicarea acestei politici este responsabilitatea tuturor angajaților și partenerilor Uzinex, dar responsabilitatea finală revine conducerii executive. Administratorul companiei asigură: (1) Aprobarea și actualizarea politicii anti mită și corupție; (2) Alocarea resurselor necesare pentru implementare (personal, training, sisteme); (3) Monitorizarea aplicării prin rapoarte periodice; (4) Sancționarea fermă a oricăror încălcări; (5) Comunicarea publică a angajamentului companiei către integritate. Un responsabil de conformitate (Compliance Officer) coordonează activitățile zilnice legate de prevenție, training, investigație și raportare.",
        },
      ]}
    />
  );
}
