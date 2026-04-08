import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Termeni și condiții — Uzinex",
  description:
    "Termenii și condițiile generale de utilizare ale site-ului uzinex.ro și de furnizare a echipamentelor industriale, componentelor și serviciilor Uzinex către clienții B2B și instituționali.",
};

export default function Page() {
  return (
    <LegalPage
      title="Termeni și condiții"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Părțile și identificarea operatorului",
          body: "Site-ul web uzinex.ro este operat de GW LASER TECHNOLOGY S.R.L., persoană juridică română, cu sediul social în Sat Rediu, Comuna Rediu, Strada Împăcării Nr. 2, județul Iași, cu punct de lucru principal în Parcul Științific & Tehnologic Tehnopolis, Bulevardul Poitiers nr. 10, 700671 Iași, înregistrată la Oficiul Registrului Comerțului sub numărul J2023003903220, având Codul Unic de Înregistrare RO 49240731 și Identificatorul Unic European ROONRC.J2023003903220, denumită în continuare Uzinex, Furnizor sau Vânzător. Utilizarea site-ului și orice relație comercială cu Uzinex sunt guvernate de prezenții Termeni și Condiții, care constituie un acord legal între tine (Utilizator, Client sau Cumpărător) și Uzinex.",
        },
        {
          title: "Obiectul activității Uzinex",
          body: "Uzinex este un integrator industrial specializat în furnizarea de echipamente grele, tehnologie industrială la cheie, componente cheie, piese de schimb și servicii tehnice pentru sectorul privat (producție, manufactură, logistică, energie, reciclare), instituții de stat (administrații centrale și locale) și sectorul de apărare și securitate (MApN, IGSU, instituții de forță). Portofoliul include: echipamente de intralogistică și manipulare mărfuri, utilaje de prelucrare laser și CNC de precizie, sisteme de robotică și automatizare a fluxurilor, utilaje grele pentru infrastructură, piese de schimb și consumabile, servicii tehnice și de mentenanță, precum și soluții dedicate pentru apărare și securitate. Toate categoriile sunt disponibile prin SEAP și SICAP.",
        },
        {
          title: "Acceptarea termenilor",
          body: "Prin accesarea, navigarea sau utilizarea site-ului uzinex.ro, prin completarea unui formular de contact, prin solicitarea unei oferte sau prin încheierea unui contract cu Uzinex, confirmi că ai citit, ai înțeles și ești de acord cu prezenții Termeni și Condiții, precum și cu Politica de Confidențialitate și cu Politica de Cookies. Dacă nu ești de acord cu oricare dintre clauze, te rugăm să nu utilizezi site-ul și să nu inițiezi relații comerciale cu Uzinex.",
        },
        {
          title: "Relație B2B — context comercial",
          body: "Uzinex operează exclusiv în regim business-to-business (B2B) și business-to-government (B2G). Serviciile și produsele noastre sunt destinate persoanelor juridice, instituțiilor publice, autorităților contractante, operatorilor economici și profesioniștilor. Nu vindem către consumatori finali (persoane fizice care acționează în afara activității lor profesionale) în sensul Ordonanței de Guvern 34/2014 sau al Directivei 2011/83/UE. Prin urmare, dispozițiile privind dreptul de retragere în 14 zile rezervate consumatorilor nu se aplică.",
        },
        {
          title: "Procesul de solicitare și emitere a ofertelor",
          body: [
            "Solicitarea unei oferte se poate face prin formularul de contact de pe site, prin email la info@uzinex.ro, prin telefon la (+40) 769 081 081 sau prin întâlniri directe cu echipa noastră comercială.",
            "Pentru a putea elabora o ofertă tehnică corectă, Clientul trebuie să furnizeze informații complete despre aplicație, specificații tehnice, capacitate, condiții de utilizare, termene dorite și bugetul aproximativ.",
            "Ofertele sunt personalizate și elaborate de inginerii noștri, pe baza cerințelor specifice ale fiecărui proiect. Pentru configurații complexe, procesul poate include vizite tehnice la fața locului, audit preliminar, propuneri alternative și etape de validare.",
            "Ofertele tehnice și comerciale sunt valabile 30 de zile calendaristice de la data emiterii, dacă nu se specifică altfel în document.",
            "Prețurile comunicate în ofertă pot varia în funcție de fluctuațiile cursului valutar (EUR/RON), evoluțiile pieței de materii prime, costurile de transport internațional și modificările de specificații solicitate ulterior de Client.",
          ],
        },
        {
          title: "Încheierea și executarea contractelor",
          body: [
            "Contractul de furnizare se consideră încheiat în momentul semnării de către ambele părți a unui document scris (contract propriu-zis, comandă fermă confirmată sau alt instrument contractual echivalent) și, după caz, a achitării avansului stabilit.",
            "Comenzile verbale sau solicitările neformale nu angajează Uzinex până la confirmarea scrisă.",
            "Configurațiile personalizate, echipamentele la comandă și soluțiile turnkey sunt validate printr-un proces-verbal de aprobare semnat înainte de punerea în fabricație. Odată aprobată configurația și achitat avansul, eventuale modificări pot genera costuri suplimentare și prelungirea termenelor.",
            "Clientul se obligă să ofere acces, colaborare și informațiile tehnice necesare pentru executarea contractului în bune condiții.",
            "Uzinex se obligă să respecte calitatea, specificațiile și termenele agreate, să asigure documentația tehnică completă și să ofere suport post-vânzare conform condițiilor contractuale.",
          ],
        },
        {
          title: "Prețuri, facturare și modalități de plată",
          body: "Prețurile echipamentelor și serviciilor Uzinex sunt exprimate, după caz, în Euro (EUR) sau în Lei (RON), fără TVA, dacă nu se specifică altfel în mod expres. La acestea se adaugă TVA-ul aplicabil (19% standard în România sau cotele reduse corespunzătoare). Facturarea se face conform legislației fiscale românești, electronic prin sistemul e-Factura al ANAF atunci când este obligatoriu. Modalitățile acceptate de plată includ: transfer bancar în baza facturii emise, avans și rate conform graficelor agreate, finanțare prin parteneri de leasing (cu aprobare separată), acreditive documentare pentru tranzacții internaționale. Termenele de plată standard sunt de 30 de zile de la emiterea facturii, dar pot fi negociate individual. Pentru comenzile cu valoare mare sau pentru clienți noi fără istoric, Uzinex poate solicita un avans între 30% și 50% la confirmarea comenzii. Întârzierile de plată atrag penalități de 0,1% pe zi de întârziere, conform legislației în vigoare.",
        },
        {
          title: "Livrare, recepție și transfer al riscurilor",
          body: [
            "Livrarea se efectuează conform regulilor Incoterms 2020 agreate în contract, cel mai frecvent EXW (Ex Works — din fabrică), FCA (Free Carrier), DAP (Delivered At Place) sau DDP (Delivered Duty Paid), în funcție de complexitate și destinație.",
            "Termenele de livrare sunt indicative pentru echipamentele standard și se confirmă ferm la momentul aprobării comenzii. Pentru echipamentele personalizate, termenele tipice sunt între 8 și 16 săptămâni, iar pentru liniile complete integrate pot ajunge la 24 de săptămâni.",
            "Transportul echipamentelor grele sau agabaritice este organizat de Uzinex prin parteneri specializați, cu autorizații speciale, asigurare de transport și, unde este cazul, escortă rutieră.",
            "La livrare, Clientul are obligația de a verifica integritatea ambalajelor, conformitatea cantităților și starea aparentă a echipamentelor. Eventualele neconformități trebuie consemnate în procesul-verbal de recepție în termen de maxim 48 de ore de la livrare.",
            "Riscurile privind echipamentele se transferă către Client conform regulilor Incoterms specificate, de obicei în momentul predării către transportator sau la destinație.",
            "Uzinex nu răspunde pentru întârzieri cauzate de evenimente de forță majoră, întreruperi în lanțul de aprovizionare, perturbări ale comerțului internațional sau alte situații excepționale dincolo de controlul său rezonabil.",
          ],
        },
        {
          title: "Garanție și service post-vânzare",
          body: [
            "Garanția standard Uzinex este de 60 (șaizeci) de luni pentru echipamentele din catalogul standard, una dintre cele mai generoase din industrie. Pentru echipamentele realizate la comandă sau adaptate, garanția este de 24 (douăzeci și patru) de luni.",
            "Garanția acoperă defectele de fabricație, viciile ascunse și defecțiunile rezultate din calitatea componentelor originale. Nu acoperă uzura normală, deteriorările cauzate de utilizarea incorectă, lipsa mentenanței, modificările neautorizate sau intervențiile unor persoane neacreditate.",
            "În perioada de garanție, Uzinex asigură gratuit piesele de schimb originale, manopera de reparație și, după caz, transportul echipamentului la atelierul de service sau deplasarea unui tehnician la fața locului.",
            "Intervenția fizică la fața locului pentru urgențe este asigurată în termen de maxim 24 de ore de la sesizarea Clientului, în funcție de disponibilitate și locație.",
            "Garanția se activează automat la data punerii în funcțiune documentate și rămâne valabilă pe toată durata prevăzută, dacă sunt respectate condițiile de utilizare și mentenanță prevăzute în manualele furnizate.",
            "Pentru proiectele cu fonduri europene sau PNRR, Uzinex poate extinde sau adapta condițiile de garanție conform cerințelor contractuale specifice ale autorității contractante.",
          ],
        },
        {
          title: "Proprietate intelectuală",
          body: "Toate conținuturile de pe site-ul uzinex.ro — texte, imagini, logo-ul Uzinex, grafică, design, cod sursă, baze de date, documentație tehnică, videoclipuri, manuale și materiale de marketing — sunt protejate prin drepturi de autor și alte drepturi de proprietate intelectuală și aparțin GW LASER TECHNOLOGY S.R.L. sau sunt utilizate cu licența titularilor. Este interzisă reproducerea, distribuirea, modificarea, publicarea sau exploatarea comercială a oricărui element fără acordul scris prealabil al Uzinex. Manualele tehnice, schemele, desenele constructive și documentația confidențială transmise Clientului în cadrul relației contractuale rămân proprietatea Uzinex și pot fi utilizate exclusiv pentru operarea și mentenanța echipamentelor livrate.",
        },
        {
          title: "Confidențialitate și protecția informațiilor",
          body: "Ambele părți se obligă să păstreze confidențialitatea informațiilor tehnice, comerciale, financiare și strategice schimbate în cursul relației contractuale, pe toată durata contractului și pentru o perioadă de minimum 5 ani după încetarea acestuia. Această obligație nu se aplică informațiilor devenite publice fără culpa părții receptoare, celor obținute legitim din alte surse sau celor a căror divulgare este cerută de lege sau de o autoritate competentă. Pentru proiectele din sectorul de apărare sau cele clasificate, se aplică suplimentar prevederile legislației specifice privind informațiile clasificate naționale și NATO.",
        },
        {
          title: "Limitarea răspunderii",
          body: "Uzinex răspunde pentru daunele directe cauzate de neîndeplinirea sau îndeplinirea defectuoasă a obligațiilor contractuale, în limita valorii contractului respectiv. Uzinex nu răspunde pentru: daune indirecte sau consecvențiale, pierderi de profit, pierderi de producție, pierderea oportunităților comerciale, daune reputaționale, costurile înlocuirii cu echipamente de substituție. De asemenea, Uzinex nu răspunde pentru prejudicii rezultate din utilizarea incorectă a echipamentelor, nerespectarea manualelor tehnice, lipsa mentenanței preventive, intervenții neautorizate sau cauze de forță majoră. Pentru situațiile excepționale în care răspunderea Uzinex este angajată, valoarea totală a daunelor nu poate depăși valoarea facturată pentru produsul sau serviciul în cauză.",
        },
        {
          title: "Forța majoră",
          body: "Părțile nu răspund pentru neexecutarea totală sau parțială a obligațiilor contractuale atunci când aceasta este cauzată de un eveniment de forță majoră, definit conform Articolului 1351 din Codul Civil Român. Evenimentele de forță majoră includ, dar nu se limitează la: calamități naturale (cutremure, inundații, incendii majore), războaie, conflicte armate, acte de terorism, epidemii sau pandemii, restricții guvernamentale severe, blocaje ale lanțurilor de aprovizionare globale, embargouri comerciale, sancțiuni internaționale. Partea afectată de forță majoră va notifica cealaltă parte în termen de maxim 7 zile de la apariția evenimentului și va depune toate eforturile rezonabile pentru a reduce impactul asupra contractului.",
        },
        {
          title: "Încetarea contractelor",
          body: "Contractele pot înceta prin: (1) îndeplinirea obligațiilor reciproce; (2) acordul scris al ambelor părți; (3) reziliere unilaterală pentru neîndeplinirea culpabilă de către cealaltă parte, cu notificare scrisă prealabilă de 30 de zile pentru remediere; (4) imposibilitate de executare definitivă din cauze de forță majoră; (5) insolvența sau falimentul uneia dintre părți; (6) orice alte cauze prevăzute de lege sau contract. În caz de reziliere din culpa Clientului, Uzinex își păstrează dreptul la despăgubiri pentru costurile și lucrările deja efectuate, precum și la daune-interese.",
        },
        {
          title: "Legislație aplicabilă și soluționarea litigiilor",
          body: "Prezenții Termeni și Condiții, precum și orice contract încheiat cu Uzinex, sunt guvernate de legislația română, în special Codul Civil, Codul de Procedură Civilă, Legea comerțului electronic 365/2002, Legea 296/2004 privind protecția consumatorilor (unde este aplicabilă), precum și de reglementările europene relevante. Orice litigiu rezultat din interpretarea sau executarea contractelor va fi soluționat, în primul rând, pe cale amiabilă, prin negocieri directe între părți, în termen de 30 de zile de la notificarea scrisă. În caz de eșec al negocierilor, litigiile vor fi soluționate de instanțele judecătorești competente de la sediul Uzinex, dacă nu s-a convenit altfel în mod expres. Clienții persoane juridice pot apela, alternativ, la procedurile de soluționare alternativă a litigiilor (ANPC-SAL) sau la platforma europeană de soluționare online a litigiilor (SOL).",
        },
        {
          title: "Dispoziții finale",
          body: "Prezenții Termeni și Condiții pot fi modificați unilateral de Uzinex în orice moment, pentru a reflecta schimbările legislative, practicile comerciale sau cerințele operaționale. Modificările semnificative vor fi anunțate pe site-ul uzinex.ro și/sau comunicate prin email clienților activi cu minimum 30 de zile înainte de intrarea lor în vigoare. Dacă vreo prevedere a prezentului document este declarată nulă sau inaplicabilă, celelalte prevederi rămân în vigoare și produc efecte juridice depline. Prezenții Termeni și Condiții reprezintă acordul complet dintre părți cu privire la utilizarea site-ului uzinex.ro, fără a se substitui contractelor comerciale specifice, care au prioritate în caz de conflict.",
        },
      ]}
    />
  );
}
