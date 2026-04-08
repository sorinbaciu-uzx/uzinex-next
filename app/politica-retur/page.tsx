import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de retur — Uzinex",
  description:
    "Politica detaliată de retur a echipamentelor industriale Uzinex: condițiile de returnare, procedura, excluderile și drepturile clienților B2B.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de retur"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Cadrul general și context B2B",
          body: "GW LASER TECHNOLOGY S.R.L., denumită în continuare Uzinex, operează exclusiv în regim business-to-business (B2B) și business-to-government (B2G). Toate tranzacțiile sunt încheiate cu persoane juridice, instituții publice, autorități contractante și profesioniști. În acest context, prevederile Ordonanței de Guvern 34/2014 privind drepturile consumatorilor, inclusiv dreptul de retragere în 14 zile rezervat persoanelor fizice care cumpără la distanță, nu se aplică relațiilor noastre comerciale. Cu toate acestea, Uzinex adoptă o politică de retur transparentă, profesională și echitabilă, care reflectă bunele practici comerciale internaționale și respectul față de partenerii noștri.",
        },
        {
          title: "Echipamente eligibile pentru retur",
          body: [
            "Produse standard din catalogul tehnic Uzinex, neutilizate, în ambalajul original, cu toate accesoriile și documentația completă.",
            "Echipamente livrate greșit din vina Uzinex (eroare de pregătire a comenzii, confuzie de model, ambalare incorectă).",
            "Echipamente care prezintă defecte de fabricație vizibile la recepție sau descoperite în perioada de garanție.",
            "Piese de schimb și consumabile nedeschise, în stare originală.",
            "Echipamente care nu corespund specificațiilor tehnice agreate contractual, certificatului de conformitate sau fișei tehnice oficiale.",
          ],
        },
        {
          title: "Excluderi — produse care nu pot fi returnate",
          body: [
            "Echipamentele personalizate, configurate sau fabricate special la comanda Clientului (custom, made-to-order, bespoke) nu pot fi returnate, întrucât specificațiile unice le fac nevandabile către alți clienți.",
            "Liniile complete de producție integrate, soluțiile turnkey și proiectele livrate la cheie.",
            "Echipamentele puse în funcțiune, care au trecut prin procesul de commissioning și sunt utilizate în producție.",
            "Consumabilele deschise, utilizate sau parțial consumate (uleiuri, filtre, lame, dinți, vârfuri de freze).",
            "Componentele integrate în sisteme mai mari sau modificate prin adăugiri, adaptări sau intervenții post-livrare.",
            "Echipamentele cu sigilii rupte care indică utilizare sau manipulare neautorizată.",
            "Produsele deteriorate fizic, cu urme evidente de utilizare, șocuri, intemperii sau manipulare neconformă.",
            "Echipamentele din sectorul de apărare și securitate supuse reglementărilor speciale privind traseabilitatea (ITAR, Wassenaar Arrangement, reglementări naționale).",
          ],
        },
        {
          title: "Termenele pentru solicitarea returului",
          body: [
            "Pentru neconformități vizibile la recepție: imediat, prin consemnare în procesul-verbal de livrare și notificare scrisă în maxim 48 de ore.",
            "Pentru vicii ascunse descoperite ulterior: în termen de maxim 14 zile calendaristice de la descoperire, dar nu mai târziu de perioada de garanție.",
            "Pentru echipamente standard nefolosite: termen de solicitare de 14 zile calendaristice de la recepția fizică, cu aprobare prealabilă din partea Uzinex.",
            "Pentru erori de livrare din vina Uzinex: fără termen, Uzinex remediază situația pe cheltuiala proprie.",
          ],
        },
        {
          title: "Procedura detaliată de retur",
          body: [
            "Pasul 1 — Notificare: Clientul trimite o solicitare scrisă la info@uzinex.ro, menționând numărul facturii, numărul contractului, seria echipamentelor, motivul returului și, după caz, documentația justificativă (fotografii, procese-verbale, rapoarte tehnice).",
            "Pasul 2 — Evaluare: Echipa Uzinex evaluează solicitarea în maxim 3 zile lucrătoare și comunică decizia Clientului. În cazul neconformităților tehnice, poate fi necesară o verificare la fața locului sau o expertiză independentă.",
            "Pasul 3 — Autorizare: În cazul acceptării, Uzinex emite un număr RMA (Return Merchandise Authorization) care trebuie obligatoriu menționat în documentele de retur.",
            "Pasul 4 — Ambalare și expediere: Clientul reambalează echipamentele în condiții echivalente celor originale (preferabil în ambalajul original) și le expediază la adresa indicată de Uzinex.",
            "Pasul 5 — Verificare tehnică: La sosire, Uzinex efectuează o verificare tehnică completă pentru a confirma starea și conformitatea echipamentelor cu declarația Clientului.",
            "Pasul 6 — Rezolvare: În funcție de situație, Uzinex procedează la: înlocuirea cu produs echivalent, reparație în garanție, emiterea unei note de credit, rambursarea sumelor plătite, sau combinații ale acestora.",
          ],
        },
        {
          title: "Costurile de retur",
          body: "Costurile de transport și ambalare pentru retur sunt suportate în mod diferit în funcție de motivul returului: (1) Pentru erori de livrare din vina Uzinex (produs greșit, cantitate incorectă, ambalaj deficitar) — toate costurile sunt suportate integral de Uzinex, inclusiv transportul retur și reorganizarea livrării corecte. (2) Pentru defecte de fabricație confirmate în perioada de garanție — Uzinex suportă costurile de transport și manoperă. (3) Pentru returul unui produs standard corect livrat, la cererea Clientului — costurile de transport retur și eventualele costuri de recondiționare sunt suportate de Client, iar Uzinex poate aplica o taxă de restocking de maxim 15% din valoarea facturată, pentru a acoperi costurile administrative și de reintroducere în stoc.",
        },
        {
          title: "Înlocuire sau reparație în garanție",
          body: "În cazul defectelor de fabricație descoperite în perioada de garanție (60 de luni standard, 24 de luni pentru echipamentele la comandă), Uzinex alege, în funcție de situație, una dintre următoarele soluții: (a) reparația echipamentului prin tehnicienii Uzinex sau prin parteneri autorizați de producător, la atelierul propriu sau la fața locului; (b) înlocuirea componentelor defecte cu piese originale noi; (c) înlocuirea întregului echipament cu un produs echivalent, nou sau recondiționat complet; (d) în cazuri excepționale, restituirea prețului plătit prin notă de credit sau rambursare. Durata medie de remediere este de 5 până la 15 zile lucrătoare, în funcție de complexitatea defectului și disponibilitatea pieselor.",
        },
        {
          title: "Rambursarea sumelor plătite",
          body: "Dacă se convine returul cu rambursarea sumelor plătite, Uzinex efectuează plata prin transfer bancar în contul Clientului în termen de maxim 30 de zile calendaristice de la: (1) primirea fizică a echipamentelor returnate și verificarea conformității acestora cu declarația Clientului; (2) emiterea notei de credit aferente; (3) regularizarea documentelor fiscale între părți. În cazul plăților efectuate în valută, rambursarea se face în aceeași valută, iar eventualele diferențe de curs valutar sunt suportate conform contractului. Pentru plățile prin leasing sau finanțare terță, rambursarea urmează procedurile specifice ale instituției financiare implicate.",
        },
        {
          title: "Soluționarea amiabilă a diferendelor",
          body: "Uzinex abordează fiecare cerere de retur cu profesionalism și deschidere către dialog. În cazul unor dezacorduri privind eligibilitatea returului, evaluarea tehnică sau cuantumul despăgubirilor, încurajăm soluționarea amiabilă prin: (1) discuții directe cu echipa comercială și tehnică Uzinex; (2) vizite comune la sediul Clientului sau la atelierul Uzinex; (3) expertize tehnice independente, efectuate de specialiști agreați de ambele părți; (4) mediere profesională prin mediatori autorizați; (5) proceduri SOL (Soluționare Online a Litigiilor) și ANPC-SAL (Soluționarea Alternativă a Litigiilor) acolo unde este aplicabil.",
        },
        {
          title: "Contact pentru cereri de retur",
          body: "Toate cererile de retur se adresează prin email la info@uzinex.ro sau prin telefon la (+40) 769 081 081. Echipa noastră răspunde în maxim 3 zile lucrătoare cu instrucțiuni concrete și, după caz, cu numărul RMA necesar pentru inițierea procedurii. Pentru situațiile urgente (defecțiuni critice care opresc producția), menționează URGENT în subiectul email-ului pentru prioritizare.",
        },
      ]}
    />
  );
}
