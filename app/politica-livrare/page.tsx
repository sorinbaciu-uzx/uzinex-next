import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de livrare — Uzinex",
  description:
    "Condițiile detaliate de livrare pentru echipamentele industriale Uzinex: termene, Incoterms, transport agabaritic, recepție, costuri și responsabilități.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de livrare"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Cadrul general al livrărilor Uzinex",
          body: "GW LASER TECHNOLOGY S.R.L., denumită în continuare Uzinex, livrează echipamente industriale, componente tehnice, piese de schimb, linii de producție integrate și soluții la cheie către clienți din România, Uniunea Europeană și, în anumite condiții, către țări terțe. Livrarea este o componentă esențială a relației contractuale, iar Uzinex se angajează să o execute cu profesionalism, punctualitate și transparență, respectând cerințele specifice fiecărui proiect, inclusiv cele dictate de procedurile de achiziție publică (SEAP/SICAP) și de finanțările europene (PNRR, POIM, POCU, Horizon Europe).",
        },
        {
          title: "Zona geografică de livrare",
          body: [
            "România — livrare națională în toate județele, inclusiv zonele de munte și izolate, cu parteneri locali de transport specializat.",
            "Uniunea Europeană — livrare în toate statele membre, cu respectarea reglementărilor vamale intracomunitare și a regulilor de TVA.",
            "Republica Moldova — livrare directă cu documentație vamală completă, având în vedere parteneriatele și proiectele noastre din regiune.",
            "State non-UE — livrare la cerere, cu evaluare preliminară a reglementărilor de export, a sancțiunilor internaționale și a cerințelor vamale specifice.",
          ],
        },
        {
          title: "Termene de livrare detaliate",
          body: [
            "Echipamente standard din catalogul tehnic: termene comunicate individual, de la 2 la 8 săptămâni în funcție de disponibilitatea producătorilor parteneri și de complexitatea configurației.",
            "Configurații personalizate (adaptate cerințelor specifice ale clientului): între 8 și 16 săptămâni, incluzând faza de proiectare, validarea desenelor tehnice și producția propriu-zisă.",
            "Linii complete de producție integrate (turnkey): între 12 și 24 de săptămâni, cuprinzând proiectarea detaliată, fabricarea componentelor, asamblarea, testele FAT (Factory Acceptance Test), transportul, instalarea la destinație și testele SAT (Site Acceptance Test).",
            "Piese de schimb și consumabile: livrare rapidă în 3-10 zile lucrătoare pentru articolele disponibile la partenerii OEM.",
            "Intervenții de urgență pentru service: deplasare la fața locului în maxim 24 de ore pentru situațiile critice din contractele de SLA.",
          ],
        },
        {
          title: "Incoterms 2020 — reguli comerciale internaționale",
          body: "Livrarea se efectuează conform regulilor Incoterms 2020, publicate de Camera Internațională de Comerț (ICC). Cele mai frecvent utilizate de Uzinex sunt: EXW (Ex Works) — Cumpărătorul preia marfa din locația Vânzătorului și își asumă toate costurile și riscurile transportului; FCA (Free Carrier) — Vânzătorul livrează marfa transportatorului desemnat de Cumpărător, la locația agreată; CPT (Carriage Paid To) — Vânzătorul plătește transportul până la destinație, dar riscurile se transferă la predarea către transportator; DAP (Delivered At Place) — Vânzătorul livrează la destinația agreată, suportând toate costurile până la descărcare; DDP (Delivered Duty Paid) — Vânzătorul livrează la destinație, inclusiv vămuirea și plata taxelor. Regula Incoterms aplicabilă este specificată explicit în contract sau în ofertă. Pentru livrările interne, Uzinex recomandă DAP sau FCA, iar pentru livrările internaționale complexe, alegerea se face individual în funcție de complexitatea logistică.",
        },
        {
          title: "Transport agabaritic și gabarit special",
          body: "Pentru echipamentele industriale grele, voluminoase sau cu dimensiuni care depășesc limitele standard de transport rutier, Uzinex organizează servicii de transport agabaritic prin parteneri specializați. Acest tip de transport include: (1) obținerea autorizațiilor speciale de la CNAIR și administrațiile locale; (2) planificarea traseului cu evitarea obstacolelor (tunele joase, poduri slabe, intersecții înguste); (3) escortă rutieră cu vehicule pilot și, în unele cazuri, însoțire de poliție rutieră; (4) platforme și remorci specializate (low-bed, extendable, modular); (5) asigurarea completă a transportului (CARGO All Risks); (6) coordonarea cu autoritățile locale pentru eventuale restricții temporare; (7) macarale pentru încărcare și descărcare la origine și destinație. Pentru livrările intercontinentale, coordonăm și transportul naval (container, RoRo, break-bulk), aerian (pentru componente urgente și de valoare mare) sau feroviar.",
        },
        {
          title: "Ambalare și protecție pentru transport",
          body: [
            "Ambalaje de export conform standardelor ISPM-15 pentru exportul internațional (lemn tratat termic, fumigat sau din lemn prelucrat industrial).",
            "Protecție anticorozivă VCI (Volatile Corrosion Inhibitor) pentru echipamentele sensibile la umiditate.",
            "Folie polietilenă rezistentă și cutii din lemn masiv pentru echipamente delicate.",
            "Marcare adecvată cu etichete de fragilitate, direcție de ridicare, centru de greutate și atenționări specifice.",
            "Documentație de transport completă: lista de colisaj, certificat de conformitate, documente vamale, certificate de origine, manuale tehnice.",
          ],
        },
        {
          title: "Costurile de livrare",
          body: "Costurile de transport sunt calculate individual pentru fiecare proiect, în funcție de: greutatea și volumul echipamentelor, distanța de livrare, regula Incoterms aleasă, tipul transportului (standard, agabaritic, aerian, naval), asigurarea de transport, autorizațiile speciale necesare, descărcarea la destinație și eventualele servicii suplimentare (de exemplu, punere în poziție finală, instalare inițială). Toate costurile sunt comunicate transparent în oferta comercială și defalcate pe categorii. Pentru livrările standard în România, costul poate fi inclus în prețul echipamentului (CIP București sau alt oraș principal), la cerere. Pentru proiectele cu finanțare europeană, livrarea poate fi inclusă integral în bugetul proiectului, conform regulilor de eligibilitate.",
        },
        {
          title: "Recepția cantitativă și calitativă",
          body: [
            "La sosirea echipamentelor la destinație, Clientul are obligația de a verifica integritatea ambalajelor și numărul de colete conform listei de colisaj, în prezența reprezentantului transportatorului.",
            "Orice neconformitate cantitativă sau daună vizibilă trebuie consemnată imediat în documentul de transport (CMR, scrisoare de trăsură) și notificată Uzinex în termen de maximum 48 de ore prin email la info@uzinex.ro.",
            "Recepția calitativă se face după despachetarea completă, prin verificarea conformității echipamentelor cu specificațiile contractuale, inclusiv: serii, coduri, accesorii, documentație tehnică, certificate de conformitate.",
            "Pentru echipamentele complexe, se realizează teste de punere în funcțiune (Commissioning) și, după caz, teste SAT (Site Acceptance Test), în prezența reprezentantului Clientului și a inginerilor Uzinex.",
            "Procesul-verbal de recepție finală se semnează de ambele părți și marchează momentul activării garanției și al transferului responsabilității operaționale către Client.",
          ],
        },
        {
          title: "Întârzieri de livrare și gestionarea acestora",
          body: "Uzinex depune toate eforturile rezonabile pentru respectarea termenelor de livrare comunicate. În situațiile excepționale în care apar întârzieri, fie din cauze interne (disponibilitatea producătorilor, fluxul de producție) fie din cauze externe (perturbări ale lanțului de aprovizionare global, blocaje vamale, condiții meteo extreme, grevă la transportatori), Uzinex se angajează să: (1) comunice proactiv situația Clientului cu minimum 5 zile lucrătoare înainte de termenul inițial, atunci când este posibil; (2) propună soluții alternative (livrare parțială, echipamente echivalente, extinderea garanției); (3) pentru proiectele cu finanțare europeană sau termene contractuale stricte, să colaboreze cu autoritatea contractantă pentru găsirea unei soluții care să evite dezangajarea finanțării sau aplicarea penalităților. Pentru întârzierile imputabile Uzinex care depășesc 30 de zile față de termenul contractual, Clientul are dreptul la penalități conform clauzelor contractuale agreate, sau la rezilierea contractului cu recuperarea sumelor deja plătite.",
        },
        {
          title: "Stocare provizorie la destinație",
          body: "Dacă la data livrării Clientul nu este pregătit să primească echipamentele (șantier neterminat, lipsă acces, spațiu insuficient), Uzinex poate asigura stocarea provizorie în depozite asigurate, la un cost suplimentar calculat pe zi, metru cub și categorie de echipament. Această situație trebuie comunicată în avans, iar eventualele costuri sunt suportate de Client. Stocarea provizorie nu afectează începerea termenului de garanție, care se activează la livrarea efectivă.",
        },
        {
          title: "Proiecte speciale și clasificate",
          body: "Pentru proiectele din sectorul de apărare, securitate sau cele clasificate la nivel național sau NATO, livrarea urmează proceduri specifice, cu măsuri suplimentare de securitate: rute neanunțate public, escortă armată (când este necesar), verificări de securitate pentru personalul implicat, manipulare clasificată a documentației, predare doar către reprezentanți autorizați și verificați. Toate condițiile sunt convenite individual cu autoritatea contractantă sau utilizatorul final, în baza cadrului legal aplicabil.",
        },
        {
          title: "Contact pentru livrări",
          body: "Pentru orice întrebare, urmărire a unei livrări, coordonare logistică sau raportare a unor incidente de transport, ne poți contacta la: email info@uzinex.ro, telefon (+40) 769 081 081. Echipa noastră logistică îți poate furniza informații despre statusul comenzii, numărul AWB al transportului, documentele de livrare și estimarea sosirii.",
        },
      ]}
    />
  );
}
