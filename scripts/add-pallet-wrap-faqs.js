/* eslint-disable */
// Phase 2 of per-product FAQs: add grounded Q&A for the 5 "masini de ambalat
// paleti" products that don't have a native FAQ section in their description.
// Each Q&A is strictly grounded in description facts (specs, advantages).
// Skips the inline FAQ question to avoid page-level duplication.

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = (n) => path.join(ROOT, 'data', n);

const faqs = JSON.parse(fs.readFileSync(DATA('product-faqs.json'), 'utf8'));

// Grounded Q&A for each of the 5 products. Every fact maps to the description.
const PALLET_WRAP_FAQS = {
  'masina-de-ambalat-paleti': [
    {
      q: 'Ce sarcină maximă poate ambala mașina de ambalat paleți KPW-TP1650F?',
      a: 'Sarcina maximă este de 2.000 kg per palet, adecvată pentru marfă grea din orice industrie — logistică, alimentar, construcții, chimicale. Placa rotativă are diametrul de 1.650 mm și acceptă paleți cu dimensiuni între 500×500×2.000 mm și 1.200×1.200×2.000 mm.',
    },
    {
      q: 'Ce tip de folie folosește și cu ce grosime?',
      a: 'Mașina utilizează folie extensibilă LLDPE cu grosime între 20 și 35 microni și lățime de 500 mm. Folia LLDPE are un cost per palet semnificativ mai mic față de alte metode de ambalare și asigură protecție împotriva prafului, umidității și șocurilor mecanice în transport.',
    },
    {
      q: 'Ce alimentare electrică necesită mașina de ambalat paleți KPW-TP1650F?',
      a: 'Puterea instalată este 1,5 kW cu alimentare monofazată 220V sau 110V, 50Hz sau 60Hz — compatibilă cu orice instalație electrică uzuală de depozit, fără tablouri speciale sau alimentare trifazată. Nu sunt necesare modificări de infrastructură pentru punerea în funcțiune.',
    },
    {
      q: 'Viteza platanului este fixă sau reglabilă?',
      a: 'Viteza platanului este reglabilă între 0 și 12 rotații pe minut, permițând adaptarea la tipul și greutatea mărfii — rotații mai mici pentru marfă instabilă sau sensibilă, rotații mai mari pentru producție continuă cu paleți standardizați.',
    },
    {
      q: 'Cât cântărește și ce dimensiuni are mașina?',
      a: 'Mașina de ambalat paleți KPW-TP1650F are 700 kg, cu dimensiuni de 2.500 × 1.650 × 2.450 mm. Se integrează rapid în orice depozit sau linie de producție fără modificări structurale ale halei.',
    },
  ],
  'masina-de-ambalat-paleti-tip-m': [
    {
      q: 'Ce înseamnă platformă tip „M" și de ce e importantă?',
      a: 'Platforma rotativă cu design în formă de „M" permite accesul direct al motostivuitorului manual pentru încărcarea și descărcarea paleților, fără rampe auxiliare sau lucrări la sol. Este singura opțiune viabilă pentru depozitele de la etajele superioare sau pentru halele cu pardoseală din mozaic, gresie sau materiale care nu permit frezarea.',
    },
    {
      q: 'Poate fi instalată la etajele superioare ale unei clădiri logistice?',
      a: 'Da, mașina de ambalat paleți tip M nu necesită fundații sau lucrări la sol și este operațională imediat după poziționare. Poate fi utilizată la orice etaj al unei clădiri multi-nivel, fără aprobări de construcție sau lucrări civile.',
    },
    {
      q: 'Ce tipuri de paleți acceptă?',
      a: 'Platforma tip M acceptă paleți EUR standard (800×1.200 mm) și paleți industriali, cu sarcină maximă tipică de 2.000 kg. Numărul de rotații per ciclu este programabil, permițând adaptarea la înălțimea și tipul mărfii.',
    },
    {
      q: 'Ce grosimi de folie PE folosește?',
      a: 'Mașina lucrează cu folie extensibilă PE în grosimi de 17–23 microni pentru aplicații ușoare și 25–30 microni pentru mărfuri grele sau cu muchii ascuțite, pe role standard de 500 mm lățime. Costul per palet este redus față de foliile termocontractabile sau fațetele de carton.',
    },
    {
      q: 'Poate fi mutată dintr-o zonă a depozitului în alta?',
      a: 'Da, mașina de ambalat paleți tip M poate fi mutată rapid dintr-o zonă în alta fără costuri de relocare — ideală pentru operatori cu sarcini sezoniere sau variabile care adaptează fluxul de ambalare la punctele de expediere active.',
    },
  ],
  'masina-de-ambalat-paleti-kpw-tp1650f': [
    {
      q: 'Ce e pre-întinderea foliei la 250% și de ce contează?',
      a: 'Mecanismul de pre-întindere alungă folia LLDPE până la 250% din lungimea inițială înainte de aplicare pe palet, ceea ce reduce semnificativ consumul de folie per palet și costul de ambalare. Pre-întinderea este motor AC reglabilă prin conversie de frecvență.',
    },
    {
      q: 'Cum detectează înălțimea mărfii?',
      a: 'Un comutator fotoelectric montat pe căruciorul foliei detectează automat înălțimea mărfurilor, fără reglare manuală între paleți de înălțimi diferite. Sistemul se adaptează la fiecare palet în mod individual și nu necesită setare manuală pentru fiecare ciclu.',
    },
    {
      q: 'Cât de robustă este structura mașinii?',
      a: 'Șasiul are placă de oțel de 10 mm grosime, cu lanț dublu de 10A/12A și tratament anti-rugină prin vopsire electrostatică în pulbere pe întreaga structură. Cutia coloanei are pereții de 1,5 mm, plăcile superioare și inferioare de 6 mm și plăci de armare colț interior de 6 mm.',
    },
    {
      q: 'Ce programe de ambalare permite sistemul PLC?',
      a: 'Sistemul PLC permite programare separată pentru numărul de straturi, turele superioare, turele inferioare și turele alternative — fiecare parametru setabil individual din ecranul de operare. Există funcție de restaurare a setărilor din fabrică cu o singură tastă, pentru resetare rapidă după ajustări greșite.',
    },
    {
      q: 'Ce se întâmplă dacă se rupe folia în timpul ciclului?',
      a: 'Mașina are alarmă automată configurabilă pentru ruperea foliei și lipsa foliei, setabilă direct din ecranul de operare. Funcția de detectare a defecțiunilor are interfață de monitorizare dedicată, pentru a preveni oprirea neplanificată a liniei.',
    },
  ],
  'masina-de-ambalat-robotizata-kpw-z4510': [
    {
      q: 'Cum funcționează o mașină de ambalat autopropulsată?',
      a: 'Mașina KPW-Z4510 se deplasează în jurul paletului cu folie LLDPE, eliminând platoul rotativ fix. Nu are nevoie de infrastructură la sol, rampe sau fundații speciale — poate fi mutată în orice moment în depozit, hală sau șantier și pornește imediat după poziționare.',
    },
    {
      q: 'Are nevoie de cablu de alimentare în timpul operării?',
      a: 'Nu. Mașina folosește baterie internă ca sursă de alimentare, cu putere mare și zgomot redus, fără cablu de alimentare în timpul operării. Încărcarea se face printr-un ștecăr exterior, cu andocare rapidă fără acces în interiorul mașinii.',
    },
    {
      q: 'Ce dimensiune minimă de palet acceptă?',
      a: 'Dimensiunea minimă de obiect este 600×600 mm, iar înălțimea maximă de ambalare este de 2.100 mm sau 2.400 mm în funcție de configurație. Mașina este compatibilă cu orice tip de palet — orice formă, greutate și dimensiune, sarcina minimă fiind de 100 kg.',
    },
    {
      q: 'Ce metode de ambalare oferă?',
      a: 'Mașina suportă metode multiple selectabile manual: mișcare alternativă sus-jos, mișcare simplă sus, mișcare simplă jos și ranforsare centrală fixă. Parametrii reglabili din panoul PLC cu LCD includ numărul de spire superior/inferior/alternativ, viteza de urcare și coborâre a cadrului folie, viteza de deplasare și tensiunea foliei.',
    },
    {
      q: 'Când este alegerea corectă față de o mașină fixă cu platou rotativ?',
      a: 'Mașina robotizată KPW-Z4510 este ideală când spațiul de lucru se schimbă frecvent, când ambalarea se face în mai multe puncte din depozit sau hală, sau când instalarea unei mașini fixe nu este fezabilă din considerente structurale ori logistice. Este utilizată cu succes în logistică, industria alimentară, materiale de construcții și sectoare cu amplasament variabil.',
    },
  ],
  'masina-de-ambalat-paleti-cu-brat-rotativ-kpw-yb1800l': [
    {
      q: 'Care e diferența față de o mașină cu platou rotativ?',
      a: 'La mașina cu braț rotativ KPW-YB1800L paleta rămâne fixă iar brațul se deplasează în jurul ei — elimină stresul mecanic asupra mărfii instabile, grele sau sensibile la rotație. Sarcina maximă este de 1.000 kg per palet, iar viteza brațului este reglabilă între 0 și 15 rotații pe minut.',
    },
    {
      q: 'Ce productivitate are pe oră?',
      a: 'Aproximativ 40–50 paleți pe oră în flux continuu, cu pornire automată la detectarea paletei prin senzori fotoelectrici, cuter automat la finalul ciclului și revenire automată la poziția inițială. Se integrează direct în linii cu transportoare cu role, bandă sau platformă rotativă dublă.',
    },
    {
      q: 'Ce alimentare electrică și pneumatică necesită?',
      a: 'Puterea instalată este 2,5 kW, cu alimentare trifazată 380V la 50 Hz. Consumul de aer comprimat este de 1.500 ml/min, necesar pentru presă pneumatică, cuter automat și alte componente automatizate. Nu funcționează pe alimentare monofazată.',
    },
    {
      q: 'Câte programe de ambalare presetate are?',
      a: 'Mașina include 5–9 programe de ambalare presetate, cu control pentru straturi top, bottom și reinforcement, reglare tensiune folie și toate setările accesibile prin interfață touch-screen. Setările includ numărul de rotații per palet și metoda de aplicare pentru fiecare tip de marfă.',
    },
    {
      q: 'Este potrivită pentru industria alimentară?',
      a: 'Da. Designul fără platou turnant o face ușor de igienizat, adecvată pentru industria alimentară și a băuturilor. Oprirea automată la coliziune cu obstacol și protecția perimetrală asigură siguranța în liniile de producție cu personal operativ.',
    },
  ],
};

// Merge into existing product-faqs.json (don't overwrite extracted ones)
let added = 0;
for (const [slug, entries] of Object.entries(PALLET_WRAP_FAQS)) {
  if (faqs[slug]) {
    console.log('Warning: slug already has FAQs, skipping:', slug);
    continue;
  }
  faqs[slug] = entries;
  added += entries.length;
}

fs.writeFileSync(DATA('product-faqs.json'), JSON.stringify(faqs, null, 2));

console.log('Phase 2 (pallet-wrap grounded FAQs) summary:');
console.log('  Products added:', Object.keys(PALLET_WRAP_FAQS).length);
console.log('  Total Q&A added:', added);
console.log('  Total products with FAQs now:', Object.keys(faqs).length);
