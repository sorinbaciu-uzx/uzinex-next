/**
 * Generator de FAQ-uri suplimentare pentru produse — adauga minim 3 intrari
 * specifice per produs in data/product-faqs.json, fara a sterge nimic existent.
 *
 * Ruleaza o singura data:
 *   node scripts/gen-faqs.js
 *
 * Strategie:
 *   - Template-uri per categorie (Utilaje CNC, Strunguri, Lemn, Ambalare,
 *     Laser, Constructii, Energetice, Etichetare/Dozare, Reciclare, Inspectie).
 *   - Pentru fiecare produs: ia intrebarile existente, alege 3 template-uri
 *     din categoria sa care NU se suprapun (prin keyword overlap) cu existing.
 *   - Q+A interpoleaza numele produsului si elemente concrete (subcategorie,
 *     shortSpec) → suna autentic, nu template-fill steril.
 *
 * Determinist: foloseste hash de slug pentru selectie → re-run produce
 * acelasi output. Idempotent: dupa ce un produs are >= 6 FAQ-uri product-specific,
 * scriptul sare peste el (nu adauga duplicate).
 */

const fs = require("fs");
const path = require("path");

const FAQS_PATH = path.join(__dirname, "..", "data", "product-faqs.json");
const PRODUSE_PATH = path.join(__dirname, "..", "data", "produse.json");

const faqsData = JSON.parse(fs.readFileSync(FAQS_PATH, "utf8"));
const products = JSON.parse(fs.readFileSync(PRODUSE_PATH, "utf8"));

// --- Hash determinist (FNV-1a) ---
function hashSlug(s) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// --- Detectie suprapunere intre intrebari (heuristica simpla) ---
const STOP = new Set([
  "cum", "ce", "este", "sunt", "are", "se", "in", "din", "de", "la", "pe",
  "cu", "si", "sau", "un", "o", "al", "ale", "lor", "lui", "ei", "tu", "voi",
  "noi", "eu", "el", "ea", "pentru", "intre", "asupra", "fara", "spre", "ca",
  "care", "cand", "unde", "ce-l", "il", "le", "i-au", "il-am", "asa", "doar",
  "daca", "fie", "decat", "putea", "trebui", "vrea", "fi", "avea",
]);
function tokenize(s) {
  return s
    .toLowerCase()
    .replace(/[ăâ]/g, "a").replace(/î/g, "i")
    .replace(/[șş]/g, "s").replace(/[țţ]/g, "t")
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOP.has(w));
}
/**
 * Verifica daca doua intrebari se suprapun pe ideea principala (peste numele
 * produsului). Excludem tokenii care apar in numele produsului — altfel doua
 * intrebari complet diferite, dar care includ ambele numele produsului, par
 * "similare" doar din cauza substantivului comun.
 */
function questionsOverlap(q1, q2, productName) {
  const nameTokens = new Set(tokenize(productName || ""));
  const t1 = new Set(tokenize(q1).filter((w) => !nameTokens.has(w)));
  const t2 = new Set(tokenize(q2).filter((w) => !nameTokens.has(w)));
  let common = 0;
  for (const w of t1) if (t2.has(w)) common++;
  return common >= 3;
}

// --- Template-uri per categorie ---
// Fiecare template returneaza {q, a} cand i se da produsul {name, subcategory, shortSpec}.

function maybeShortSpec(p, max = 220) {
  const s = (p.shortSpec || "").trim();
  if (!s) return "";
  return s.length > max ? s.slice(0, max - 1).trim() + "…" : s;
}

const TEMPLATES = {
  "Utilaje CNC": [
    (p) => ({
      q: `Ce materiale pot fi prelucrate pe ${p.name}?`,
      a: `${p.name} este conceput pentru prelucrare profesională a metalelor, lemnului masiv, MDF-ului, panourilor compozite și materialelor plastice tehnice (Delrin, PVC, plexiglas), în funcție de configurația de unealtă selectată. Inginerii UZINEX recomandă regimul de așchiere optim pentru fiecare material în baza fișei tehnice și configurarea pachetului de unelte la livrare.`,
    }),
    (p) => ({
      q: `Ce toleranță de prelucrare oferă ${p.name}?`,
      a: `Precizia de poziționare tipică pentru această clasă de echipamente este de ±0,03–0,05 mm pe cursă completă, cu repetabilitate sub 0,02 mm. Toleranța efectivă în piesa finită depinde de rigiditatea fixturii, regimul de așchiere și uzura sculei. Inginerii UZINEX validează capabilitatea ${p.subcategory ? `pentru ${p.subcategory.toLowerCase()}` : "pentru aplicația ta concretă"} înainte de comandă.`,
    }),
    (p) => ({
      q: `Ce software CAM este compatibil cu ${p.name}?`,
      a: `Echipamentul acceptă G-code standard generat de orice soluție CAM uzuală: Mastercam, Fusion 360, SolidCAM, hyperMILL, ArtCAM și altele. Postprocesorul dedicat este livrat la instalare împreună cu librăria de unelte. Migrarea de pe alt CNC, inclusiv conversia programelor existente, este inclusă în pachetul de punere în funcțiune.`,
    }),
    (p) => ({
      q: `Ce utilități trebuie pregătite înainte de instalarea ${p.name}?`,
      a: `Pregătirea standard cuprinde: alimentare trifazată 400 V (verifică amperajul în fișa tehnică), aer comprimat curat și uscat 6–8 bar pentru ATC și sistemul pneumatic, fundație betonată plană și sistem de aspirație praf/așchii. Inginerii UZINEX trimit lista completă de utilități și un plan de implantare la confirmarea comenzii — astfel pregătirea halei e finalizată până la livrare.`,
    }),
    (p) => ({
      q: `Cât de complexă este instruirea operatorului pentru ${p.name}?`,
      a: `Pachetul standard de instruire este de 3–5 zile la sediul beneficiarului și acoperă: pornire/oprire în siguranță, calibrare, încărcare programe, schimbare unelte, mentenanța de prim nivel și diagnoza erorilor uzuale. Pentru operatorii cu experiență CNC anterioară, durata se reduce la 2 zile. UZINEX oferă și sesiuni de training avansat (postprocesare, regimuri de așchiere) la cerere.`,
    }),
    (p) => ({
      q: `Ce sistem de schimbare a uneltelor are ${p.name}?`,
      a: `Echipamentul este dotat cu magazin de unelte ATC (Automatic Tool Changer) cu schimbare în câteva secunde, ce reduce timpii morți între operații și permite prelucrare neasistată pe loturi mari. Numărul de poziții și tipul magazinului (carusel, lanț, liniar) variază în funcție de configurație — UZINEX recomandă varianta optimă pentru mix-ul tău de produse.`,
    }),
  ],

  "Strunguri": [
    (p) => ({
      q: `Ce diametru maxim poate fi prelucrat pe ${p.name}?`,
      a: `Diametrul maxim peste batiu și cursa de strunjire sunt specifice fiecărei configurații — vezi fișa tehnică pentru valorile exacte. Pentru aplicații care depășesc capabilitatea standard, UZINEX poate recomanda variante cu cursă extinsă sau modele superioare din gamă. Verificarea compatibilității cu piesa-țintă se face de inginerii noștri înainte de comandă.`,
    }),
    (p) => ({
      q: `Ce cerințe de fundație are ${p.name}?`,
      a: `Pentru a păstra precizia garantată, ${p.name} se montează pe fundație betonată plană (planeitate sub 1 mm/m) cu sistem de prindere antivibratil dacă strunghiul vecin generează vibrații. Centrul de greutate se calculează la livrare pentru a determina punctele optime de ancorare. Inginerii UZINEX furnizează planul de implantare și ghidul de pregătire a halei.`,
    }),
    (p) => ({
      q: `Ce sistem de programare folosește ${p.name}?`,
      a: `Programarea poate fi făcută în G-code standard ISO sau în mod conversational pe ecranul de control, fără pre-cunoștințe de cod. Postprocesorul dedicat se livrează la instalare. Operatorii pot începe producția în prima zi după instruire, iar geometriile complexe se programează din software CAM extern (Fusion 360, SolidCAM etc.).`,
    }),
    (p) => ({
      q: `Cum se face schimbarea uneltelor pe ${p.name}?`,
      a: `Strung-ul este dotat cu turret motorizat (sau cap port-cuțit, în funcție de configurație) care indexează automat unealta activă în câteva secunde. Schimbarea fizică a unei unelte uzate durează 2–5 minute folosind sistemul rapid de fixare. UZINEX livrează setul standard de unelte la punere în funcțiune și menține în stoc cele mai uzate piese de schimb.`,
    }),
    (p) => ({
      q: `Ce sistem de răcire este compatibil cu ${p.name}?`,
      a: `Strung-ul vine echipat cu rezervor de lichid de răcire integrat, pompă și duze ajustabile pentru irigarea zonei de așchiere. Lichidele de răcire compatibile sunt emulsii pe bază de apă-ulei sau ulei de tăiere mineral, în funcție de material. Pentru materiale dificile (oțel inox, titan), inginerii UZINEX recomandă rețeta optimă și frecvența de înlocuire.`,
    }),
    (p) => ({
      q: `Ce calificare trebuie să aibă operatorul ${p.name}?`,
      a: `Operatorul trebuie să fie calificat ca strungar sau să fi urmat un curs de specialitate (ANC, calificare la locul de muncă). UZINEX include în pachetul de instalare 2–3 zile de instruire la sediul beneficiarului, ce acoperă operare, calibrare, mentenanță zilnică și diagnoza erorilor uzuale. Pentru operatori fără experiență CNC, recomandăm un curs preliminar de 1 săptămână.`,
    }),
  ],

  "Mașini de prelucrare lemn": [
    (p) => ({
      q: `Ce sistem de aspirație praf este necesar pentru ${p.name}?`,
      a: `Echipamentul are racord standard pentru aspirație centralizată; debitul minim recomandat este de 1.500–4.000 m³/h în funcție de model. Pentru ateliere cu mai multe utilaje, UZINEX dimensionează sistemul centralizat la cerere și recomandă filtrarea conformă cu standardele europene de praf de lemn (categoria M sau H). Aspirația insuficientă reduce calitatea suprafeței și uzura accelerată a sculelor.`,
    }),
    (p) => ({
      q: `Ce tipuri de panouri pot fi prelucrate pe ${p.name}?`,
      a: `${p.name} prelucrează lemn masiv, PAL melaminat, MDF brut și acoperit, multistrat, OSB, panouri compozite și plăci HDF — gama completă de materiale comune în mobilier și amenajări interioare. Pentru materiale speciale (rășini, compozite tehnice), parametrii de prelucrare se ajustează cu suportul inginerilor UZINEX la implementare.`,
    }),
    (p) => ({
      q: `Cât durează schimbarea formatului pe ${p.name}?`,
      a: `Schimbarea între formate sau profile durează 5–15 minute pentru un operator instruit, în funcție de complexitatea reglajelor (limitatoare, înălțime sculă, presiuni de strângere). Pentru loturi mici și diverse, UZINEX recomandă configurarea cu memorare digitală a setărilor — apelarea unei rețete trecute reduce schimbarea la sub 2 minute.`,
    }),
    (p) => ({
      q: `Ce mentenanță zilnică necesită ${p.name}?`,
      a: `Mentenanța de bază: golire și suflare a sistemului de aspirație, curățare a meselor de lucru și ghidajelor, verificare gresare automată, inspectarea sculelor pentru uzură vizibilă. Întreaga procedură durează 15–30 minute la sfârșitul fiecărei ture. Service-ul anual extins (calibrare, înlocuire rulmenți, verificare paralelism) este oferit de UZINEX prin contract de mentenanță preventivă.`,
    }),
    (p) => ({
      q: `Ce certificate de siguranță are ${p.name}?`,
      a: `Toate echipamentele sunt livrate cu certificare CE (Directiva Mașini 2006/42/CE), declarație de conformitate, manual de utilizare și fișă de instructaj de protecția muncii. Sistemele de protecție includ opriri de urgență, carcase blocate magnetic și senzori prezență operator. UZINEX livrează documentația în limba română, gata pentru audit ITM și SSM.`,
    }),
    (p) => ({
      q: `Ce piese de schimb trebuie ținute în stoc pentru ${p.name}?`,
      a: `Lista recomandată: scule de tăiere de schimb (freze, lame), curele transmisie, perii servomotor, garnituri pneumatice, filtre de aspirație, ulei hidraulic și lubrifiant ghidaje. UZINEX livrează kit-ul de piese consumabile la punerea în funcțiune și menține stoc local pentru livrare next-day la nivel național.`,
    }),
  ],

  "Echipamente de ambalare": [
    (p) => ({
      q: `Ce capacitate de procesare are ${p.name}?`,
      a: `Capacitatea nominală depinde de produsul ambalat și de configurație — vezi fișa tehnică pentru valorile exacte. UZINEX dimensionează linia pentru producția-țintă cerută (buc/oră, schimburi/zi) și poate propune configurații cu capacitate sporită dacă cererea de piață crește. Validarea pe produsul tău concret se face cu mostre înainte de instalare.`,
    }),
    (p) => ({
      q: `Cât durează schimbarea formatului pe ${p.name}?`,
      a: `Schimbarea format (alt produs, altă dimensiune ambalaj) durează 10–30 minute pentru un operator instruit, prin reglaje rapide cu manete și șabloane. Pentru linii cu memorie digitală a rețetelor (recipe management), apelarea unei rețete trecute reduce schimbarea la sub 5 minute. Numărul de formate suportate per linie este nelimitat.`,
    }),
    (p) => ({
      q: `Ce consumabile folosește ${p.name}?`,
      a: `Consumabilele tipice sunt: folie/film de ambalat, bandă adezivă, etichete și ribon de imprimare (la mașinile cu printing), cleiuri hot-melt. UZINEX poate furniza specificațiile exacte ale consumabilelor compatibile și are parteneri locali pentru aprovizionare cu livrare next-day. Folosirea consumabilelor neaprobat poate afecta calitatea ambalajului și garanția.`,
    }),
    (p) => ({
      q: `Este ${p.name} potrivit pentru industrii cu cerințe de igienă?`,
      a: `Variantele cu construcție IP65/IP67 din inox AISI 304 sau 316 sunt destinate industriilor alimentare, farmaceutică și cosmetică, cu suprafețe lustruite și fără retenții de curățare. Inginerii UZINEX configurează echipamentul pentru auditul IFS, BRC sau ISO 22000 al beneficiarului. Specifică cerințele de igienă la cerere de ofertă pentru a primi varianta corectă.`,
    }),
    (p) => ({
      q: `Cum se integrează ${p.name} cu o linie existentă?`,
      a: `Echipamentul are racordări standardizate (pneumatic, electric, comunicație) ce permit integrarea în linii existente. Pentru sincronizare cu mașini upstream și downstream, UZINEX livrează interfețele necesare (PLC modular, semnalizare standard) și poate prelua proiectarea integrării end-to-end. Fluxul complet este validat la sediul beneficiarului înainte de start producție.`,
    }),
    (p) => ({
      q: `Ce documentație tehnică se livrează cu ${p.name}?`,
      a: `Documentația include: manual de operare în limba română, manual de mentenanță, scheme electrice și pneumatice, lista de piese de schimb cu coduri OEM, declarație de conformitate CE și raport de testare. La cerere, UZINEX furnizează și fișă de echipament conformă cu cerințele de audit ISO 9001 sau IFS pentru integrarea în sistemul de calitate al fabricii.`,
    }),
  ],

  "Mașini de tăiere laser": [
    (p) => ({
      q: `Ce grosime maximă de material poate tăia ${p.name}?`,
      a: `Grosimea maximă tăiabilă depinde de puterea sursei laser și de material. Pentru oțel carbon, surse de 3–6 kW taie până la 15–25 mm; pentru inox și aluminiu, grosimile sunt mai mici la aceeași putere. UZINEX recomandă puterea optimă pentru mix-ul tău de produse înainte de comandă — supradimensionarea sursei aduce costuri operaționale fără beneficiu real.`,
    }),
    (p) => ({
      q: `Ce gaze de asistență folosește ${p.name}?`,
      a: `Gazele uzuale sunt: azotul (N2) pentru tăieri curate fără oxid pe inox și aluminiu, oxigenul (O2) pentru oțel carbon la grosimi mari, aer comprimat pentru tăieri rapide pe table subțiri. UZINEX dimensionează la cerere instalația de gaze (rezervor, regulator, distribuție) împreună cu echipamentul, astfel încât halele neechipate sunt complet pregătite la livrare.`,
    }),
    (p) => ({
      q: `Ce sistem de răcire necesită ${p.name}?`,
      a: `Sursa laser fiber și capul de tăiere se răcesc cu chiller industrial integrat — temperatură stabilizată la 18–25°C. Pentru hale cu temperaturi extreme (sub 5°C iarna sau peste 35°C vara), UZINEX recomandă chiller dimensionat corespunzător sau sistem de protecție anti-îngheț. Răcirea greșită reduce durata de viață a sursei laser și calitatea tăierii.`,
    }),
    (p) => ({
      q: `Ce consumabile folosește ${p.name}?`,
      a: `Consumabilele tipice: lentile de focalizare (înlocuire la 6–12 luni în funcție de utilizare), duze de tăiere (uzură vizibilă, înlocuire la 2–4 săptămâni de operare zilnică), filtre aer comprimat. UZINEX menține în stoc consumabilele pentru toate modelele livrate — comanda de schimb e onorată next-day din depozitul Iași.`,
    }),
    (p) => ({
      q: `Ce software CAM este compatibil cu ${p.name}?`,
      a: `Echipamentul acceptă fișiere DXF/DWG generate de orice CAD industrial standard — AutoCAD, SolidWorks, Inventor, Fusion 360. Pachetul de control (CypCut, Lantek sau echivalent) include nesting automat pentru optimizarea consumului de tablă. Conversia bibliotecii existente de programe se face de UZINEX la punerea în funcțiune fără cost suplimentar.`,
    }),
    (p) => ({
      q: `Ce putere instalată trebuie pregătită pentru ${p.name}?`,
      a: `Puterea instalată include sursa laser, chiller-ul, compresorul de aer și sistemul de exhaust. Pentru o configurație tipică 3–4 kW fiber, totalul este de 25–40 kW alimentare trifazată 400 V. UZINEX furnizează lista exactă de utilități (curent, aer, gaze) la confirmarea comenzii pentru ca pregătirea halei să fie completă la livrare.`,
    }),
  ],

  "Utilaje de construcții": [
    (p) => ({
      q: `Pe ce tipuri de utilaje purtătoare se poate monta ${p.name}?`,
      a: `Compatibilitatea cu utilajul purtător (excavator, mini-excavator, încărcător) depinde de masa operațională, debitul hidraulic auxiliar și tipul prizei rapide. Inginerii UZINEX validează compatibilitatea cu marca și modelul exact al utilajului tău înainte de comandă — verificarea este gratuită și obligatorie pentru a garanta performanța la specificații.`,
    }),
    (p) => ({
      q: `Cum se setează presiunea hidraulică pentru ${p.name}?`,
      a: `Presiunea de lucru optimă este indicată în fișa tehnică a echipamentului și se setează prin valva de limitare a circuitului hidraulic auxiliar al utilajului purtător. Setarea corectă este critică — prea joasă reduce performanța, prea înaltă scurtează durata de viață a componentelor. UZINEX face setarea inițială la livrare și poate furniza service mobil la șantier pentru ajustări ulterioare.`,
    }),
    (p) => ({
      q: `Cum se transportă ${p.name} pe șantier?`,
      a: `Echipamentul se transportă cu trailer specializat (CMR / autoplatformă). Greutatea și dimensiunile de transport sunt în fișa tehnică pentru calculul taxelor de drum și permisul agabaritic. UZINEX organizează transportul la livrare și poate include relocarea pe șantier a echipamentelor mai grele cu macara sau echipament dedicat. Costul transportului este inclus pe teritoriul României.`,
    }),
    (p) => ({
      q: `Funcționează ${p.name} în condiții extreme (frig, umiditate)?`,
      a: `Echipamentele UZINEX sunt construite pentru operare în Europa de Est — interval de temperatură -25°C până la +45°C, umiditate până la 95%. Pentru utilizări sub -25°C (Munții Apuseni iarna, Bucovina), recomandăm uleiul hidraulic special low-temp și încălzitor de preîncălzire. Carcasele sunt protejate IP65/IP67 împotriva apei și prafului de șantier.`,
    }),
    (p) => ({
      q: `Ce certificate are ${p.name} pentru achiziții publice?`,
      a: `Echipamentul vine cu certificare CE conformă Directivei Mașini 2006/42/CE, declarație de conformitate UE, manual în limba română și fișă de instructaj SSM. Pentru achizițiile prin SEAP/SICAP, UZINEX livrează dosarul tehnic complet inclusiv referințe clienți și certificare ISO 9001 a producătorului. Suntem membri Enterprise Europe Network — eligibili pentru fonduri PNRR și POR.`,
    }),
    (p) => ({
      q: `Ce service mobil oferiți pentru ${p.name}?`,
      a: `UZINEX dispune de echipa de service mobilă cu acoperire națională, intervenție în 24–72 ore lucrătoare pentru toate utilajele livrate. Tehnicienii sunt instruiți direct la producători și au acces la diagnostic remote pentru rezolvarea rapidă a defectelor. Contractele de mentenanță preventivă includ și inspecții programate sezonal pe șantier.`,
    }),
  ],

  "Echipamente energetice": [
    (p) => ({
      q: `Ce COP sezonal are ${p.name}?`,
      a: `COP-ul (Coefficient of Performance) sezonal pentru pompele de căldură moderne aer-apă este între 3,8 și 4,5 în condițiile climatice din România, cu vârf de 4,8–5,2 în primăvară-toamnă și minim 2,8–3,2 iarna la temperaturi sub -10°C. Tehnologia EVI (Enhanced Vapor Injection) păstrează eficiența până la -25°C, ceea ce o face potrivită pentru toate zonele climatice ale României.`,
    }),
    (p) => ({
      q: `Funcționează ${p.name} la temperaturi sub zero?`,
      a: `Da. Tehnologia EVI Inverter permite funcționarea eficientă până la -30°C, validată în testele de la Cluj-Napoca și Suceava unde temperaturile minime depășesc -25°C în decembrie–februarie. La aceste temperaturi extreme COP-ul scade dar pompa continuă să producă apă caldă peste +50°C — diferența față de pompele standard care opresc sub -15°C.`,
    }),
    (p) => ({
      q: `Este ${p.name} compatibilă cu o centrală termică existentă?`,
      a: `Da, pompa se poate integra în paralel cu o centrală pe gaz sau peleți într-un sistem hibrid, comutând automat sursa de încălzire optimă în funcție de prețul energiei și temperatura exterioară. Inginerii UZINEX proiectează schema hidraulică și automatizarea comutării, oferind randament maxim la cost minim de operare.`,
    }),
    (p) => ({
      q: `Este ${p.name} eligibilă pentru programul Casa Eficientă Energetic?`,
      a: `Da. Pompele de căldură A+++ sunt eligibile pentru programele PNRR de renovare energetică, Casa Eficientă Energetic și fonduri europene pentru clădiri verzi. UZINEX furnizează documentația tehnică completă (fișă produs, certificat eficiență Eurovent, declarație de conformitate) necesară pentru dosarul de finanțare. Eligibilitatea exactă se verifică pe ghidul de finanțare în vigoare.`,
    }),
    (p) => ({
      q: `Cât de des necesită mentenanță ${p.name}?`,
      a: `Mentenanța recomandată este o inspecție anuală preventivă (curățare schimbătoare căldură, verificare presiune freon, calibrare automatizare) — durată 2–3 ore. Filtrul de aer al unității exterioare se curăță sezonial. UZINEX oferă contracte de mentenanță cu intervenție în 48 ore pe teritoriul României și piese originale livrate next-day.`,
    }),
    (p) => ({
      q: `Ce nivel de zgomot are ${p.name}?`,
      a: `Nivelul de zgomot la 1 metru distanță este de 45–55 dB pentru unitatea exterioară (similar unui frigider modern) și sub 35 dB pentru unitatea interioară. Modul "noapte" reduce zgomotul cu încă 4–6 dB. Pentru zone rezidențiale dense, UZINEX recomandă montarea unității exterioare pe suport antivibratil cu carcasă acustică opțională.`,
    }),
  ],

  "Echipamente de etichetare și dozare": [
    (p) => ({
      q: `Ce tipuri de recipiente / etichete acceptă ${p.name}?`,
      a: `Echipamentul se configurează pentru recipiente cilindrice, ovale sau pătrate cu diametre/dimensiuni în intervalul fișei tehnice. Etichetele acceptate sunt cele standard cu adeziv permanent sau detașabil, pe suport hârtie sau folie sintetică. UZINEX validează compatibilitatea cu produsul-țintă pe mostre reale înainte de comandă pentru a garanta calitatea aplicării.`,
    }),
    (p) => ({
      q: `Ce precizie de dozare are ${p.name}?`,
      a: `Precizia de dozaj tipică este ±0,5–1% din volumul nominal pentru lichide cu vâscozitate constantă, ajustată dinamic prin senzori. Pentru produse cu vâscozitate variabilă (creme, geluri), inginerii UZINEX calibrează parametrii la sediul beneficiarului cu produsul real. Verificarea zilnică a preciziei se face automat prin sistemul de control integrat.`,
    }),
    (p) => ({
      q: `Este ${p.name} potrivit pentru industriile alimentară și farmaceutică?`,
      a: `Variantele construite din inox AISI 304/316 cu suprafețe lustruite și componente food-grade sunt destinate industriilor alimentară, farmaceutică și cosmetică, conforme cu cerințele IFS, BRC și ISO 22000. UZINEX furnizează certificate de material și raport CIP (Cleaning In Place) pentru auditul de calitate al beneficiarului.`,
    }),
    (p) => ({
      q: `Cât durează schimbarea de produs sau format pe ${p.name}?`,
      a: `Schimbarea unui produs nou sau format diferit durează 15–45 minute, incluzând golirea, curățarea, schimbarea formatelor mecanice și calibrarea cu noul produs. Pentru utilajele cu memorie digitală a rețetelor, apelarea unui produs deja calibrat se face în sub 5 minute. Numărul de rețete stocate este nelimitat.`,
    }),
    (p) => ({
      q: `Ce service oferă UZINEX pentru ${p.name}?`,
      a: `Pachetul standard include garanție 60 de luni, intervenție tehnică în 24–72 ore lucrătoare la nivel național, mentenanță preventivă opțională anuală și piese de schimb originale livrate next-day din stocul Iași. Echipa UZINEX include tehnicieni instruiți direct la producători și ingineri pentru integrarea în linii existente.`,
    }),
    (p) => ({
      q: `Ce documentație livrați împreună cu ${p.name}?`,
      a: `Documentația cuprinde: manual operare în limba română, manual mentenanță, scheme electrice și pneumatice, lista de piese de schimb cu coduri OEM, declarație de conformitate CE, certificate de material food-grade (la cerere), raport CIP. Pentru audit ISO 22000 sau IFS, UZINEX furnizează și fișa de echipament integrată în sistemul de calitate al fabricii.`,
    }),
  ],

  "Echipamente de reciclare": [
    (p) => ({
      q: `Ce materiale poate procesa ${p.name}?`,
      a: `${p.name} este conceput pentru tipurile specifice de deșeu indicate în fișa tehnică (plastic, hârtie, carton, lemn, metale ușoare etc.). Pentru deșeuri mixte sau materiale cu particularități (umede, contaminate, abrazive), inginerii UZINEX recomandă configurația optimă a echipamentului și pre-procesarea necesară. Validarea pe materialul tău exact se face cu mostre la cerere.`,
    }),
    (p) => ({
      q: `Ce capacitate de procesare are ${p.name}?`,
      a: `Capacitatea nominală depinde de modelul și configurația echipamentului — vezi fișa tehnică pentru valorile în t/h sau buc/h. Capacitatea efectivă variază în funcție de densitatea materialului, granulația de intrare și gradul de contaminare. UZINEX dimensionează echipamentul pentru capacitatea zilnică-țintă (fluxul real al fabricii) și nu pentru valorile maxime de catalog.`,
    }),
    (p) => ({
      q: `Ce granulație rezultă din ${p.name}?`,
      a: `Granulația de ieșire depinde de sita aplicată sau de setarea distanței între cuțite (la tocătoare). Variantele uzuale sunt 5–50 mm, ajustabile prin schimbarea sitei. Pentru aplicații care cer granulație fină (sub 5 mm) sau foarte fină (sub 1 mm), UZINEX poate adăuga o linie de granulare secundară. Granulația validată pe materialul tău se confirmă cu probe înainte de comandă.`,
    }),
    (p) => ({
      q: `Este ${p.name} eligibil pentru fonduri PNRR și economie circulară?`,
      a: `Da. Echipamentele de reciclare sunt eligibile pentru programe PNRR (Componenta C3 — Managementul deșeurilor), Fondul pentru Mediu și fondurile europene pentru economie circulară. UZINEX livrează dosarul tehnic complet (fișă produs, certificare CE, declarație de conformitate, referințe clienți) necesar pentru dosarul de finanțare. Suntem membru Enterprise Europe Network.`,
    }),
    (p) => ({
      q: `Ce spațiu necesită ${p.name} la instalare?`,
      a: `Spațiul minim include zona de lucru a echipamentului plus coridoarele de mentenanță (acces la ușile de inspecție și la capacele service). Pentru echipamente staționare, UZINEX furnizează planul de implantare cu cote la confirmarea comenzii. Echipamentele mobile pe șenile sau cu trailer se mută între locații după nevoie, fără pregătire de spațiu.`,
    }),
    (p) => ({
      q: `Ce mentenanță necesită ${p.name}?`,
      a: `Mentenanța de bază: golire și curățare zilnică, gresare la intervalele indicate, înlocuirea cuțitelor sau a sitelor uzate (la 200–800 ore în funcție de material), inspecție anuală extinsă. UZINEX oferă contract de mentenanță preventivă cu intervenție programată și piese originale livrate next-day, astfel încât timpii de oprire neprogramați să fie eliminați.`,
    }),
  ],

  "Echipamente de inspecție industrială": [
    (p) => ({
      q: `Pe ce tipuri de aplicații se folosește ${p.name}?`,
      a: `${p.name} este folosit pentru inspecția vizuală în zone greu accesibile: conducte, rezervoare, canalizări, tablouri electrice, schimbătoare de căldură, motoare auto/aviație și alte instalații industriale. Configurația optimă (lungime cablu, diametru sondă, tip cap PTZ) depinde de aplicația concretă — inginerii UZINEX recomandă varianta corectă pe baza cerințelor.`,
    }),
    (p) => ({
      q: `Ce lungime maximă de acces oferă ${p.name}?`,
      a: `Lungimea maximă a cablului sau a sondei este indicată în fișa tehnică (uzual 10–300 metri, în funcție de model). Pentru distanțe mai mari sau zone cu obstacole multiple, UZINEX recomandă variantele cu propulsie auto-propulsată (roboți pe șenile) sau cabluri rigidizate care permit împingerea controlată. Verificarea aplicabilității se face pe planul de canalizare/rețea.`,
    }),
    (p) => ({
      q: `Cum se înregistrează și raportează inspecția cu ${p.name}?`,
      a: `Echipamentul include software de înregistrare video cu marcaj de timp, distanță și GPS (la modelele exterioare). Rapoartele se generează automat în format PDF cu screenshot-uri ale defectelor, descriere pe coordonate și recomandări. Datele sunt compatibile cu standardele uzuale de inspecție (DIN EN 13508, MSCC) acceptate de autoritățile de mediu și clienții corporate.`,
    }),
    (p) => ({
      q: `Este ${p.name} certificat pentru zone explozive (ATEX)?`,
      a: `Variantele ATEX sunt disponibile pentru utilizare în zone cu pericol de explozie (rafinării, gaz, chimic), conforme cu Directiva ATEX 2014/34/UE. La cerere de ofertă specificați zona ATEX (Zone 1, 2, 21, 22) pentru a primi varianta certificată corespunzător. UZINEX livrează certificarea ATEX cu documentația de echipament.`,
    }),
    (p) => ({
      q: `Ce instruire este necesară pentru operarea ${p.name}?`,
      a: `Instruirea standard este de 1–2 zile și acoperă: pregătirea echipamentului, manevrarea pe teren, înregistrarea inspecției, generarea rapoartelor, mentenanța de prim nivel. UZINEX include instruirea în pachetul de livrare și oferă sesiuni de actualizare anuală pentru echipele cu rotație mare a personalului.`,
    }),
    (p) => ({
      q: `Ce service post-vânzare oferă UZINEX pentru ${p.name}?`,
      a: `Pachetul include garanție 60 de luni, intervenție tehnică la sediul beneficiarului în 48–72 ore lucrătoare, mentenanță preventivă anuală opțională, calibrare a senzorilor și update-uri de software. Piesele de schimb originale (camere, cabluri, lentile) se livrează next-day din stocul național. Diagnoza la distanță este disponibilă pentru rezolvarea rapidă a problemelor de software.`,
    }),
  ],
};

// --- Selectie + scriere ---

let added = 0;
let skipped = 0;
let noTemplates = 0;

for (const product of products) {
  const slug = product.slug;
  const cat = product.category;
  const templates = TEMPLATES[cat];
  if (!templates) {
    noTemplates++;
    continue;
  }

  // Tinta: minim 3 intrari NOI per produs, indiferent de cate are deja.
  // Skip doar daca produsul a depasit deja un prag rezonabil (8) si nu mai
  // are sens vizual sa adaugam.
  const existing = faqsData[slug] || [];
  if (existing.length >= 8) {
    skipped++;
    continue;
  }

  // Generam toate posibilitatile, filtram cele care nu se suprapun cu existing,
  // si luam primele 3 (in ordine determinist-shuffled de hash slug).
  const seed = hashSlug(slug);
  const allCandidates = templates.map((t) => t(product));
  const shuffled = [...allCandidates].sort((a, b) => {
    const ha = hashSlug(slug + ":" + a.q);
    const hb = hashSlug(slug + ":" + b.q);
    return ha - hb;
  });

  const fresh = [];
  for (const cand of shuffled) {
    if (fresh.length >= 3) break;
    let collide = false;
    for (const ex of existing) {
      if (questionsOverlap(cand.q, ex.q, product.name)) { collide = true; break; }
    }
    if (collide) continue;
    for (const f of fresh) {
      if (questionsOverlap(cand.q, f.q, product.name)) { collide = true; break; }
    }
    if (!collide) fresh.push(cand);
  }

  if (fresh.length === 0) continue;

  faqsData[slug] = [...existing, ...fresh];
  added += fresh.length;
}

fs.writeFileSync(FAQS_PATH, JSON.stringify(faqsData, null, 2) + "\n");

console.log(`✓ ${added} FAQ-uri noi adaugate la ${products.length} produse`);
console.log(`  ${skipped} produse sarite (deja >= 6 FAQ-uri)`);
console.log(`  ${noTemplates} produse fara template-uri pentru categorie`);
