/* eslint-disable */
// Build enrichment recipes for 184 products.
// Reads: data/produse.json, data/product-benefits.json, data/product-animations.json
// Writes: data/product-enrichments.json

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = (name) => path.join(ROOT, 'data', name);

const produse = JSON.parse(fs.readFileSync(DATA('produse.json'), 'utf8'));
const benefits = JSON.parse(fs.readFileSync(DATA('product-benefits.json'), 'utf8'));
const animations = JSON.parse(fs.readFileSync(DATA('product-animations.json'), 'utf8'));

// ============= utilities =============

function cleanSentence(s) {
  if (!s) return s;
  let t = s.trim();
  t = t.replace(/^[\u2022\u00b7\-•]+\s*/, '');
  t = t.replace(/\s+/g, ' ').trim();
  t = t.replace(/\s*—\s*/g, ' — ');
  return t;
}

function wordCount(s) {
  if (!s) return 0;
  return s.split(/\s+/).filter(Boolean).length;
}

function getParagraphs(p) {
  return p.descriptionBlocks
    .filter((b) => b.type === 'paragraph' && b.text && b.text.trim())
    .map((b) => b.text.trim());
}

function endsWithPeriod(s) {
  return /[.!?]\s*$/.test(s);
}

function ensurePeriod(s) {
  return endsWithPeriod(s) ? s : s.replace(/\s+$/, '') + '.';
}

// Detect heading-like sentences (short, no natural verb, start with keyword)
function looksLikeHeading(s) {
  const trimmed = s.trim();
  const words = wordCount(trimmed);
  const hasComma = /,/.test(trimmed);
  const lower = trimmed.toLowerCase();
  if (/^(avantaj|specific|caracter|aplicatii|aplicații|flux de lucru|intrebari|întrebări|de ce uzinex|detaliile care|introducere|materiale (compatibile|procesate)|dotari|dotări|accesorii|optiuni|opțiuni|tipuri de|capacit[aă][tț]i de|variante de|configura[tț]ii|exemple de|gama de)/i.test(trimmed)) return true;
  if (/^(produs|produsele|varianta|variante|model|modele|echipament|echipamente)\s+[a-z]/.test(lower) && words < 10) return true;
  // Section labels with em-dash and no explainer
  if (/ — [A-ZĂÎÂȘȚ][^.!?]{0,30}$/.test(trimmed) && !/\. /.test(trimmed) && words < 12) return true;
  // Ends with em-dash marker or similar
  if (/—\s*$/.test(trimmed)) return true;
  // No verb-like structure: starts with noun+em-dash only
  if (words < 6 && !hasComma) return true;
  // Short label-style with only one clause
  if (words <= 8 && !/\b(este|sunt|are|au|permite|asigura|asigură|produce|utilizeaza|utilizează|ofera|oferă|accepta|acceptă|executa|execută|poate|pot|livreaza|livrează|reduce|creste|crește|elimina|elimină|genereaza|generează|lucreaza|lucrează|combina|combină|compatibil|echipat)/i.test(trimmed)) return true;
  return false;
}

// Pick a clean, grounded sentence from mid-description paragraphs
function pickSentence(paragraphs, productName) {
  const candidates = [];
  const stripDia = (s) => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
  const productNameL = stripDia((productName || '').toLowerCase());
  const productTokens = productNameL.split(/[\s\-]+/).filter((w) => w.length > 3);
  // Consider paragraphs 2..10 (index 1..9)
  paragraphs.slice(1, 11).forEach((para, idx) => {
    const clean = para.replace(/\s*\n+\s*/g, ' ');
    // Split into sentences
    const parts = clean.split(/(?<=[.!?])\s+(?=[A-ZĂÎÂȘȚ])/);
    parts.forEach((raw) => {
      let s = cleanSentence(raw);
      const emSplit = s.split(/ — /);
      let chosen = s;
      if (emSplit.length >= 2) {
        const lastChunk = emSplit[emSplit.length - 1].trim();
        if (wordCount(lastChunk) >= 10) chosen = lastChunk;
      }
      chosen = cleanSentence(chosen);
      const words = wordCount(chosen);
      if (words < 8 || words > 25) return;
      if (looksLikeHeading(chosen)) return;

      const lower = chosen.toLowerCase();
      // Skip meta / brand / bureaucratic sentences
      if (/uzinex|ofertare|garan[tț]ie|24[-\s]*48|transport|seap|sicap|pnrr|enterprise europe|fonduri europene|credit|leasing|iasi|consulta[nt][țt]a|pagina de/.test(lower)) return;
      // Skip generic section headers that made it past
      if (/^(aplica[tț]ii|specifica[tț]ii|avantaj|caracteristic|variante|configura[tț]ii|flux de|intreb[aă]ri|exemp)/.test(lower)) return;
      // Skip sentences comparing with/versus
      if (/ vs\.?\s|versus/.test(lower)) return;
      // Skip chained notices that are really lists (contain multiple ";")
      if (/;.*;.*;/.test(chosen)) return;
      // Skip very long bullets with no punctuation
      const punctRatio = (chosen.match(/[.,;:]/g) || []).length;
      if (words > 18 && punctRatio === 0) return;
      // Skip sentences about scule listings (too jargon)
      if (/freza de|burghiu de|cele 8 scule/.test(lower)) return;
      // Skip lone product-name restatements
      if (productTokens.length) {
        const lowerNoDia = stripDia(lower);
        const tokenMatches = productTokens.filter((t) => lowerNoDia.includes(t)).length;
        const ratio = tokenMatches / productTokens.length;
        // Very high ratio — almost certainly the product name being restated
        if (ratio >= 0.65 && productTokens.length >= 3) return;
        if (words <= 18 && ratio >= 0.5) return;
      }
      // Skip sentences that are just "introducere..." / "detaliile care..." / generic
      if (/^(introducere|detaliile|acestea|rezultatul|echipamentul nostru)/.test(lower)) return;

      candidates.push({ s: chosen, idx, words });
    });
  });

  if (!candidates.length) return null;

  candidates.sort((a, b) => {
    // Prefer paragraphs 2,3 (index 1,2)
    const preferA = (a.idx <= 2) ? 0 : (a.idx <= 4 ? 1 : 2);
    const preferB = (b.idx <= 2) ? 0 : (b.idx <= 4 ? 1 : 2);
    if (preferA !== preferB) return preferA - preferB;
    // prefer sentences that start with capital letter (full sentences)
    const capA = /^[A-ZĂÎÂȘȚ]/.test(a.s) ? 0 : 1;
    const capB = /^[A-ZĂÎÂȘȚ]/.test(b.s) ? 0 : 1;
    if (capA !== capB) return capA - capB;
    // prefer length 12–18
    const diffA = Math.abs(a.words - 15);
    const diffB = Math.abs(b.words - 15);
    return diffA - diffB;
  });
  let result = ensurePeriod(cleanSentence(candidates[0].s));
  // Ensure first letter is uppercase (preserving rest)
  if (result && /^[a-zăîâșț]/.test(result)) {
    result = result[0].toUpperCase() + result.slice(1);
  }
  return result;
}

// ============= category / product-type detection =============

// Derive a primary product "type" from name + category + subcategory.
// This takes precedence over description keyword hits for use case / FAQ routing.
function productType(p) {
  const cat = p.category || '';
  const sub = (p.subcategory || '').toLowerCase();
  const name = (p.name || '').toLowerCase();
  const all = `${name} ${sub}`;

  // Utilaje CNC
  if (cat === 'Utilaje CNC') {
    if (/piatr|granit|quartz|marmur/.test(all)) return 'cnc-stone';
    if (/5[\s-]?axe|cinci axe/.test(all)) return 'cnc-5axe';
    if (/lemn|router|mobilier/.test(all)) return 'cnc-wood';
    if (/laser/.test(all)) return 'cnc-laser';
    if (/metal|aluminiu/.test(all)) return 'cnc-metal';
    if (/3 sau 4|3 axe|4 axe/.test(all)) return 'cnc-wood';
    return 'cnc-general';
  }

  if (cat === 'Strunguri') {
    if (/mini|bancu|hobby/.test(all)) return 'strung-mini';
    if (/cnc/.test(all)) return 'strung-cnc';
    if (/universal|su\b|conventional|convențional/.test(all)) return 'strung-universal';
    return 'strung-general';
  }

  if (cat === 'Mașini de prelucrare lemn') {
    if (/slef|calibr|șlefu|slefu/.test(all)) return 'lemn-slefuire';
    if (/formatizar|circular|panou|debitare|ferastrau|fierastrau/.test(all)) return 'lemn-debitare';
    if (/cant|edgeband/.test(all)) return 'lemn-canturi';
    if (/gaurit|gaurire|bormasin|burghiere/.test(all)) return 'lemn-gaurit';
    if (/freza|frezat|frezare/.test(all)) return 'lemn-freza';
    if (/presa|prese/.test(all)) return 'lemn-presa';
    if (/rindelu|rindea/.test(all)) return 'lemn-rindea';
    if (/aspir|colectare praf|extractor/.test(all)) return 'lemn-aspirator';
    return 'lemn-general';
  }

  if (cat === 'Echipamente de ambalare') {
    if (/vacuum|vid\b|vida/.test(all)) return 'amb-vacuum';
    if (/stretch|streci|banderol|paleti|paleți|palet\b/.test(all)) return 'amb-stretch';
    if (/blister/.test(all)) return 'amb-blister';
    if (/flow wrap|flowpack|perne|tunel|termoretract|shrink|retract/.test(all)) return 'amb-flow';
    if (/legat|banda|banding/.test(all)) return 'amb-banding';
    if (/bagaje/.test(all)) return 'amb-bagaje';
    if (/cutii|carton|box|erector/.test(all)) return 'amb-cutii';
    if (/sigila|sudare|lipit|lipir/.test(all)) return 'amb-sigilare';
    if (/termoform/.test(all)) return 'amb-termoform';
    return 'amb-general';
  }

  if (cat === 'Mașini de tăiere laser') return 'laser';

  if (cat === 'Utilaje de construcții') {
    if (/mini[\s-]?excavator|excavator/.test(all)) return 'constr-excavator';
    if (/concasor|zdrobir|zdrobire|crusher/.test(all)) return 'constr-concasor';
    if (/sortare|ciur|screen/.test(all)) return 'constr-sortare';
    if (/incarc|încărc|bulldozer|buldo/.test(all)) return 'constr-incarcator';
    if (/stivuit|forklift/.test(all)) return 'constr-stivuitor';
    if (/generator/.test(all)) return 'constr-generator';
    if (/compresor/.test(all)) return 'constr-compresor';
    if (/malaxor|betonier|mortar|concrete/.test(all)) return 'constr-malaxor';
    if (/macara|ridicare|crane/.test(all)) return 'constr-macara';
    if (/foraj|foreza|puț|put\b|drill/.test(all)) return 'constr-foraj';
    if (/grader|autogreder|nivelator/.test(all)) return 'constr-grader';
    if (/cilindr|compact|rulo/.test(all)) return 'constr-compact';
    if (/foarfec|shear|cleste|cleșt/.test(all)) return 'constr-foarfeca';
    if (/ciocan|breaker|picon/.test(all)) return 'constr-ciocan';
    if (/cupa|cupă|bucket/.test(all)) return 'constr-atasament-cupa';
    if (/placa|plăc[aă] compact|tamper/.test(all)) return 'constr-placa';
    if (/pompa beton|pompă beton|concrete pump/.test(all)) return 'constr-pompa-beton';
    if (/statie|stație/.test(all)) return 'constr-statie';
    if (/transport|dumper|basculant/.test(all)) return 'constr-transport';
    return 'constr-general';
  }

  if (cat === 'Echipamente energetice') {
    if (/pompa de caldura|pompă de căldură|heat pump|r32|evi/.test(all)) return 'energy-heatpump';
    if (/panou solar|fotovoltaic|photovoltaic/.test(all)) return 'energy-solar';
    return 'energy-generator';
  }

  if (cat === 'Echipamente de etichetare și dozare') {
    if (/etichet/.test(all)) return 'et-etichetare';
    if (/dozare|umplere|capac|filler/.test(all)) return 'et-dozare';
    return 'et-general';
  }

  if (cat === 'Echipamente de reciclare') {
    if (/plastic|pet\b|polimer/.test(all)) return 'rec-plastic';
    if (/metal|fier|aluminiu|cablu/.test(all)) return 'rec-metal';
    if (/lemn|biomas|peleti|peleți|pellets/.test(all)) return 'rec-lemn';
    if (/hartie|hârtie|carton|paper/.test(all)) return 'rec-hartie';
    if (/cauciuc|anvelop|tire/.test(all)) return 'rec-cauciuc';
    if (/balot|baloti|baloti|baler/.test(all)) return 'rec-balotare';
    if (/tocat|tocator|maruntire|mărunțire|shred/.test(all)) return 'rec-tocator';
    if (/pres[aă]/.test(all)) return 'rec-presa';
    if (/separator|sortare|sita\b|sortator/.test(all)) return 'rec-separator';
    if (/colector|praf|cyclone|ciclon|aspirator/.test(all)) return 'rec-colector-praf';
    if (/spal|spăl|wash/.test(all)) return 'rec-spalare';
    return 'rec-general';
  }

  if (cat === 'Echipamente de inspecție industrială') {
    if (/raze x|x-?ray|x\s?ray/.test(all)) return 'insp-xray';
    if (/metal detect|detector metal/.test(all)) return 'insp-metal';
    if (/cant[aă]rir|checkweigh/.test(all)) return 'insp-cantarire';
    if (/borescop|endoscop|inspec[tț]i[ea] conduct|robot inspec[tț]ie|camer[ea] push|pipe inspection|conduct[ae]/.test(all)) return 'insp-endoscop';
    if (/termoviziune|termogr|thermal/.test(all)) return 'insp-termo';
    if (/grosime|ultrasonic|ultrasunet/.test(all)) return 'insp-ultrasonic';
    if (/duritate|hardness/.test(all)) return 'insp-duritate';
    if (/vizu|camera|viziune|vision|camere/.test(all)) return 'insp-vision';
    return 'insp-general';
  }

  return 'generic';
}

// ============= use cases library keyed by product type =============

const USECASES = {
  'cnc-stone': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Blaturi piatră naturală', body: 'Prelucrare blaturi de bucătărie din granit, quartz și marmură.' },
      { title: 'Monumente funerare', body: 'Gravură și profile decorative pe plăci de granit pentru ateliere funerare.' },
      { title: 'Placări arhitecturale', body: 'Tăiere și frezare plăci pentru fațade, pervazuri și trepte de scară.' },
    ],
  },
  'cnc-5axe': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Matrițe 3D complexe', body: 'Prelucrare matrițe cu geometrie dublă curbură pentru industria auto.' },
      { title: 'Componente aeronautice', body: 'Piese structurale cu profil tridimensional și toleranțe strânse.' },
      { title: 'Prototipuri industriale', body: 'Validare rapidă a formelor complexe direct din CAD.' },
    ],
  },
  'cnc-wood': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Mobilier masiv premium', body: 'Grinzi de lemn masiv și panouri groase pentru mobilier Heritage.' },
      { title: 'Sculptură ornamentală', body: 'Gravură decorativă, reliefuri și profile curbe complexe.' },
      { title: 'Matrițe din lemn', body: 'Modele și matrițe din lemn pentru industria de turnare.' },
    ],
  },
  'cnc-laser': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere metalice', body: 'Debitare tablă pentru confecții și tablouri electrice.' },
      { title: 'Prelucrări de serie', body: 'Tăiere repetabilă pe loturi mijlocii cu calitate uniformă.' },
      { title: 'Prototipare rapidă', body: 'Realizare piese de tablă pornind direct din desenul tehnic.' },
    ],
  },
  'cnc-metal': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere mecanice', body: 'Prelucrare piese metalice cu precizie și repetabilitate.' },
      { title: 'Subfurnizori auto', body: 'Componente cu toleranțe strânse pentru clienți OEM.' },
      { title: 'Prototipare industrială', body: 'Execuție rapidă a pieselor de serie mică și medie.' },
    ],
  },
  'cnc-general': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție industrială CNC', body: 'Prelucrare piese cu toleranțe strânse și repetabilitate înaltă.' },
      { title: 'Ateliere de prototipare', body: 'Trecere rapidă de la CAD la piese finite fără scule dedicate.' },
      { title: 'Producție de serie mică', body: 'Flexibilitate pentru loturi mici și diversitate de piese.' },
    ],
  },

  'strung-mini': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere mici de prototipare', body: 'Piese mici de precizie pentru modelare și reparații punctuale.' },
      { title: 'Școli și laboratoare', body: 'Instruire practică în prelucrarea prin strunjire la scară redusă.' },
      { title: 'Reparații mecanice', body: 'Ajustare bucșe, știfturi și piese scurte pentru service local.' },
    ],
  },
  'strung-cnc': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție de serie mijlocie', body: 'Arbori, bucșe și flanșe repetitive cu geometrie circulară.' },
      { title: 'Prelucrare piese complexe', body: 'Profile cilindrice, filetări și găuriri automate pe strung CNC.' },
      { title: 'Subfurnizori industriali', body: 'Execuție conform desenelor tehnice pentru clienți OEM.' },
    ],
  },
  'strung-universal': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere universale', body: 'Piese diverse cilindrice și conice pentru reparații și producție.' },
      { title: 'Service utilaje grele', body: 'Refacere arbori, bucșe și piese uzate pentru flotă locală.' },
      { title: 'Mentenanță industrială', body: 'Piese de schimb pentru echipamente în regim continuu.' },
    ],
  },
  'strung-general': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere de strunjire', body: 'Piese cilindrice standard și execuție după desen tehnic.' },
      { title: 'Reparații mecanice', body: 'Refacere bucșe, arbori uzați și piese de schimb pentru utilaje.' },
      { title: 'Producție mică și medie', body: 'Serii limitate de piese de revoluție pentru industria mecanică.' },
    ],
  },

  'lemn-slefuire': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Fabrici de mobilier', body: 'Calibrare și șlefuire panouri pentru corpuri de mobilier modular.' },
      { title: 'Producție uși și parchet', body: 'Finisare uniformă pe loturi mari de piese plane din lemn.' },
      { title: 'Ateliere de tâmplărie', body: 'Pregătire semifabricate înainte de vopsire și lăcuire.' },
    ],
  },
  'lemn-debitare': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Debitare plăci PAL/MDF', body: 'Secționare panouri la cotă pentru mobilier și amenajări.' },
      { title: 'Ateliere de tâmplărie', body: 'Pregătire repere din plăci pentru producția zilnică.' },
      { title: 'Producție pe comandă', body: 'Tăiere pe dimensiuni variabile pentru proiecte personalizate.' },
    ],
  },
  'lemn-canturi': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere de mobilier', body: 'Aplicare canturi ABS și PVC pe muchiile panourilor finite.' },
      { title: 'Producție pe serie', body: 'Finisaj curat pe loturi mari de corpuri de mobilier.' },
      { title: 'Comenzi personalizate', body: 'Canturi în diverse grosimi pentru proiecte de amenajare.' },
    ],
  },
  'lemn-gaurit': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție mobilier modular', body: 'Găurire repetitivă pentru corpuri de bucătărie și dulapuri.' },
      { title: 'Ateliere tâmplărie', body: 'Execuție rapidă a găurilor de balamale și știfturi.' },
      { title: 'Producție uși interioare', body: 'Găurire standardizată pentru toc, broască și balamale.' },
    ],
  },
  'lemn-freza': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere de tâmplărie', body: 'Frezare profile decorative și muchii pentru mobilier.' },
      { title: 'Producție uși și ferestre', body: 'Profilare semifabricate din lemn masiv pentru tâmplărie.' },
      { title: 'Decorațiuni interioare', body: 'Prelucrare ornamente și profile clasice din lemn.' },
    ],
  },
  'lemn-presa': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție panouri stratificate', body: 'Presare plăci cu furnire și fațete decorative.' },
      { title: 'Fabrici de mobilier', body: 'Asamblare prin presare a subansamblurilor din lemn.' },
      { title: 'Producție uși și blaturi', body: 'Lipire straturi pentru blaturi masive și uși stratificate.' },
    ],
  },
  'lemn-rindea': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere tâmplărie', body: 'Rindeluire scânduri și grinzi pentru mobilier și construcții.' },
      { title: 'Producție pardoseli', body: 'Calibrare grosime și uniformizare suprafețe pentru parchet.' },
      { title: 'Fabrici mobilier masiv', body: 'Pregătire cherestea pentru producția de blaturi și piese.' },
    ],
  },
  'lemn-aspirator': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere de tâmplărie', body: 'Colectare rumeguș de la mașini de debitat și șlefuit.' },
      { title: 'Fabrici mobilier', body: 'Extracție centralizată pe mai multe puncte de lucru.' },
      { title: 'Spații cu normă de curățenie', body: 'Menținerea atmosferei curate pentru siguranța operatorilor.' },
    ],
  },
  'lemn-general': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere tâmplărie', body: 'Prelucrare zilnică a panourilor din lemn masiv și compozite.' },
      { title: 'Fabrici de mobilier', body: 'Producție uniformă pentru serii mari de piese finite.' },
      { title: 'Producție personalizată', body: 'Flexibilitate pentru proiecte unicat și loturi mici.' },
    ],
  },

  'amb-vacuum': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Industria cărnii', body: 'Ambalare vidată pentru conservare și livrare HoReCa.' },
      { title: 'Brânzeturi și delicatese', body: 'Menținerea prospețimii pentru produse premium.' },
      { title: 'Piese metalice sensibile', body: 'Protecție anti-coroziune la transport pe distanțe lungi.' },
    ],
  },
  'amb-stretch': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Depozite și distribuție', body: 'Înfoliere paleți pentru transport stabil în depozite mari.' },
      { title: 'Producție FMCG', body: 'Grupare paleți pentru lanțuri de retail.' },
      { title: 'Logistica e-commerce', body: 'Fixare colete pe paleți pentru expediții frecvente.' },
    ],
  },
  'amb-blister': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție farmaceutică', body: 'Blistere pentru comprimate, capsule și dispozitive medicale.' },
      { title: 'Electronice mici', body: 'Ambalare componente și accesorii pentru retail.' },
      { title: 'Jucării și cosmetice', body: 'Prezentare atractivă pentru raft cu protecție la manipulare.' },
    ],
  },
  'amb-flow': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Panificație industrială', body: 'Ambalare pâine, cornuri, biscuiți și produse de patiserie.' },
      { title: 'Igienă și hârtie', body: 'Ambalare role, șervețele, perne de hârtie și scutece.' },
      { title: 'Produse consumer mici', body: 'Sigilare rapidă în folie flexibilă pentru retail.' },
    ],
  },
  'amb-banding': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție cutii și cartoane', body: 'Legare manșon pachet pentru transport sigur și tipărire lot.' },
      { title: 'Linii alimentare', body: 'Grupare pachete mici în bax-uri cu bandă PP.' },
      { title: 'Depozite distribuție', body: 'Banding pentru pregătire comenzi pe linia de picking.' },
    ],
  },
  'amb-bagaje': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Aeroporturi', body: 'Ambalare bagaje pentru protecție la manipulare pe calea aeriană.' },
      { title: 'Gări și hub-uri transport', body: 'Stațiuni self-service pentru pasageri cu bagaje fragile.' },
      { title: 'Servicii curierat', body: 'Ambalare colete pentru expediții pe distanțe lungi.' },
    ],
  },
  'amb-cutii': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'E-commerce și fulfillment', body: 'Formare cutii pentru comenzi online în volum mare.' },
      { title: 'Producție FMCG', body: 'Ambalare la capăt de linie pentru expediții retail.' },
      { title: 'Depozite logistice', body: 'Înlocuire proces manual de asamblare cutii.' },
    ],
  },
  'amb-sigilare': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție alimentară', body: 'Sigilare caserole, borcane și flacoane pentru retail.' },
      { title: 'Industrie farmaceutică', body: 'Sigilare sterilă pentru dispozitive și consumabile medicale.' },
      { title: 'Cosmetice și chimie', body: 'Sigilare de siguranță pentru produse reglementate.' },
    ],
  },
  'amb-termoform': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Industria cărnii', body: 'Termoformare caserole pentru produse proaspete cu vid.' },
      { title: 'Brânzeturi și delicatese', body: 'Ambalare cu barieră pentru conservare extinsă.' },
      { title: 'Produse medicale', body: 'Blistere termoformate pentru dispozitive sterile.' },
    ],
  },
  'amb-general': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Linii de producție FMCG', body: 'Ambalare pe serii mari pentru retail și distribuție.' },
      { title: 'Depozite logistice', body: 'Pregătire comenzi și grupare paleți pentru expediție.' },
      { title: 'Producători alimentari', body: 'Ambalare standardizată pentru trasabilitate și siguranță.' },
    ],
  },

  laser: {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Confecții metalice', body: 'Debitare tablă pentru structuri, grilaje și carcase.' },
      { title: 'Subansamble auto', body: 'Piese de tablă cu toleranțe strânse pentru echipări industriale.' },
      { title: 'Prototipare rapidă', body: 'Validare geometrii și serii mici direct din desen tehnic.' },
    ],
  },

  'constr-excavator': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Șantiere infrastructură', body: 'Excavări pentru drumuri, poduri și terasamente majore.' },
      { title: 'Lucrări de fundații', body: 'Săpături pentru subsoluri, beciuri și clădiri industriale.' },
      { title: 'Carieră și balastieră', body: 'Extragere agregate, manipulare piatră spartă și pietriș.' },
    ],
  },
  'constr-concasor': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Cariere de agregate', body: 'Producție piatră spartă și balast direct la locul extracției.' },
      { title: 'Reciclare deșeuri inerte', body: 'Mărunțire beton și moloz din demolări pentru refolosire.' },
      { title: 'Șantiere infrastructură', body: 'Procesare agregat pe șantier pentru drumuri și ziduri.' },
    ],
  },
  'constr-sortare': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Balastiere și cariere', body: 'Separare agregate pe fracțiuni calibrate pentru livrare.' },
      { title: 'Stații de reciclare', body: 'Sortare materiale inerte după demolări pentru reutilizare.' },
      { title: 'Exploatări forestiere', body: 'Sortare biomasă și agregat lemnos pentru valorificare.' },
    ],
  },
  'constr-incarcator': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Șantiere construcții', body: 'Manipulare agregate, mortar și materiale voluminoase.' },
      { title: 'Ferme și depozite', body: 'Transport baloți, îngrășăminte și încărcare bene.' },
      { title: 'Drumuri și comunal', body: 'Întreținere drumuri, deszăpezire și lucrări edilitare.' },
    ],
  },
  'constr-stivuitor': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Depozite logistice', body: 'Stivuire paleți și manipulare mărfuri la raft înalt.' },
      { title: 'Hale de producție', body: 'Transport intern între linii și zona de expediții.' },
      { title: 'Platforme de încărcare', body: 'Încărcare camioane și TIR-uri pentru distribuție.' },
    ],
  },
  'constr-generator': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Șantiere fără rețea', body: 'Alimentare echipamente pe locații fără racord electric.' },
      { title: 'Evenimente și scene', body: 'Backup pentru concerte, târguri și cortegii tehnice.' },
      { title: 'Hale și ferme', body: 'Sursă de rezervă la întreruperea rețelei.' },
    ],
  },
  'constr-compresor': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Ateliere auto', body: 'Alimentare scule pneumatice și linii de vopsit.' },
      { title: 'Producție industrială', body: 'Aer comprimat pentru roboți, cilindri și instalații.' },
      { title: 'Șantiere mari', body: 'Alimentare ciocane pneumatice și echipamente de forare.' },
    ],
  },
  'constr-malaxor': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Șantiere construcții', body: 'Preparare mortar și beton pentru structuri și finisaje.' },
      { title: 'Stații de betoane', body: 'Producție continuă pentru livrări locale și regionale.' },
      { title: 'Ateliere prefabricate', body: 'Mortar pentru borduri, boltari și elemente precast.' },
    ],
  },
  'constr-macara': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Construcții clădiri înalte', body: 'Ridicare materiale pe structuri cu mai multe etaje.' },
      { title: 'Montaj hale industriale', body: 'Manipulare grinzi și panouri pentru structuri metalice.' },
      { title: 'Lucrări infrastructură', body: 'Ridicare elemente prefabricate pentru poduri și viaducte.' },
    ],
  },
  'constr-foraj': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Foraj puțuri apă', body: 'Realizare puțuri pentru ferme și proprietăți rezidențiale.' },
      { title: 'Studii geotehnice', body: 'Sondaje pentru caracterizarea solului pe șantiere mari.' },
      { title: 'Fundații speciale', body: 'Piloți de susținere pentru clădiri și infrastructură.' },
    ],
  },
  'constr-grader': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Șantiere drumuri', body: 'Nivelare terasamente și finisare strat de bază pentru asfalt.' },
      { title: 'Cariere și balastiere', body: 'Organizare căi de acces pentru utilaje grele.' },
      { title: 'Amenajări teritoriale', body: 'Nivelare terenuri pentru parcuri industriale și rezidențiale.' },
    ],
  },
  'constr-compact': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Construcție drumuri', body: 'Compactare strat de bază și asfalt pentru drumuri noi.' },
      { title: 'Amenajări urbane', body: 'Consolidare alei, piețe și platforme logistice.' },
      { title: 'Infrastructură sportivă', body: 'Compactare piste de atletism și terenuri de sport.' },
    ],
  },
  'constr-foarfeca': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Demolări structuri beton', body: 'Tăiere armături și corpuri din beton armat rapid.' },
      { title: 'Reciclare metale grele', body: 'Mărunțire grinzi și tablă groasă din demolări industriale.' },
      { title: 'Șantiere demolare', body: 'Separare materiale pentru selectare și transport.' },
    ],
  },
  'constr-ciocan': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Demolări de beton', body: 'Spargere platforme, fundații și ziduri din beton armat.' },
      { title: 'Lucrări infrastructură', body: 'Spargere stratul rutier pentru lucrări de consolidare.' },
      { title: 'Cariere și balastiere', body: 'Fragmentare blocuri mari pentru alimentarea concasoarelor.' },
    ],
  },
  'constr-atasament-cupa': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Șantiere de excavație', body: 'Atașament dedicat pentru excavatoare de diferite capacități.' },
      { title: 'Cariere și balastiere', body: 'Manipulare agregate grele cu durabilitate ridicată.' },
      { title: 'Stații de reciclare', body: 'Separare materiale și procesare moloz din demolări.' },
    ],
  },
  'constr-placa': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Pavaje și alei', body: 'Compactare pavaj pentru accese pietonale și auto.' },
      { title: 'Șanțuri și umpluturi', body: 'Tasarea stratului de umplutură lângă conducte subterane.' },
      { title: 'Lucrări mici de drumuri', body: 'Compactare locală pentru peticiri și intervenții urbane.' },
    ],
  },
  'constr-pompa-beton': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Turnări beton înalte', body: 'Alimentare planșee și structuri cu acces dificil.' },
      { title: 'Șantiere rezidențiale', body: 'Turnări rapide pentru blocuri și ansambluri de locuințe.' },
      { title: 'Tuneluri și poduri', body: 'Pompare beton în locații inaccesibile pentru camionul cu jgheab.' },
    ],
  },
  'constr-statie': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție agregate', body: 'Flux complet de zdrobire, sortare și stocare pe o singură platformă.' },
      { title: 'Reciclare moloz inert', body: 'Valorificare materiale din demolări pentru refolosire pe șantier.' },
      { title: 'Cariere mijlocii', body: 'Producție constantă de piatră calibrată pentru beton și asfalt.' },
    ],
  },
  'constr-transport': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Șantiere mari', body: 'Transport intern pentru agregate, moloz și pământ excavat.' },
      { title: 'Cariere și balastiere', body: 'Evacuare material procesat către zona de stocare.' },
      { title: 'Lucrări infrastructură', body: 'Alimentare benzi și silozuri cu volum mare.' },
    ],
  },
  'constr-general': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Șantiere construcții', body: 'Lucrări infrastructură, drumuri și clădiri rezidențiale.' },
      { title: 'Cariere și balastiere', body: 'Exploatare agregate și procesare pentru livrare.' },
      { title: 'Antreprenori generali', body: 'Utilaj de flotă pentru firme cu proiecte diverse.' },
    ],
  },

  'energy-generator': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Clădiri comerciale', body: 'Sursă de rezervă la întreruperi de curent pentru servere și birouri.' },
      { title: 'Spitale și clinici', body: 'Alimentare critică pentru ATI, laboratoare și echipamente vitale.' },
      { title: 'Producție continuă', body: 'Backup pentru linii care nu suportă opriri neplanificate.' },
    ],
  },
  'energy-heatpump': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Clădiri rezidențiale', body: 'Încălzire eficientă și apă caldă menajeră pentru case și vile.' },
      { title: 'Clădiri comerciale', body: 'Climatizare integrată pentru birouri, hoteluri și spații comerciale.' },
      { title: 'Proiecte PNRR eficiență', body: 'Soluție eligibilă pentru eficientizarea energetică finanțată.' },
    ],
  },
  'energy-solar': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Acoperișuri comerciale', body: 'Autoconsum pentru depozite, fabrici și magazine.' },
      { title: 'Parcuri fotovoltaice', body: 'Producție energie verde pentru vânzare în rețea.' },
      { title: 'Sisteme rezidențiale', body: 'Reducerea facturilor pentru case și proprietăți individuale.' },
    ],
  },

  'et-etichetare': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție alimentară', body: 'Aplicare etichete pe borcane, sticle și caserole în linie.' },
      { title: 'Cosmetice și farma', body: 'Etichete cu trasabilitate și lot pentru produse reglementate.' },
      { title: 'Distribuție și logistică', body: 'Codificare colete cu SKU și coduri de bare pentru raft.' },
    ],
  },
  'et-dozare': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Industria cosmetică', body: 'Dozare precisă pentru creme, loțiuni și geluri în flacoane.' },
      { title: 'Chimie fină și vopsele', body: 'Umplere fluide vâscoase fără scurgeri sau risipă.' },
      { title: 'Produse alimentare lichide', body: 'Dozare siropuri, sosuri și uleiuri în recipiente standard.' },
    ],
  },
  'et-general': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Industria alimentară', body: 'Dozare precisă lichide, paste și pulberi în recipiente.' },
      { title: 'Chimie și cosmetice', body: 'Umplere produse vâscoase fără pierderi și contaminare.' },
      { title: 'Producție farmaceutică', body: 'Dozare cu trasabilitate și igienă pentru loturi reglementate.' },
    ],
  },

  'rec-plastic': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Stații reciclare plastic', body: 'Procesare PET, HDPE și PP din colectare selectivă.' },
      { title: 'Producători mase plastice', body: 'Valorificare rebuturi interne și retur de la clienți.' },
      { title: 'Centre colectare PET', body: 'Mărunțire și balotare pentru transport către fabrici.' },
    ],
  },
  'rec-metal': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Centre colectare fier', body: 'Procesare metale feroase și neferoase pentru topitorii.' },
      { title: 'DEEE și cabluri', body: 'Separare metale din cabluri și echipamente electronice.' },
      { title: 'Șantiere demolare', body: 'Recuperare oțel și aluminiu din structuri dezafectate.' },
    ],
  },
  'rec-lemn': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Exploatări forestiere', body: 'Valorificare resturi de tăiere și arbori mărunți.' },
      { title: 'Fabrici de mobilier', body: 'Reciclare rumeguș și resturi de lemn pentru peleți.' },
      { title: 'Stații de biomasă', body: 'Producție combustibil vegetal pentru centrale termice.' },
    ],
  },
  'rec-hartie': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Stații colectare hârtie', body: 'Balotare carton și hârtie pentru fabrici de celuloză.' },
      { title: 'Retail și distribuție', body: 'Compactare ambalaje folosite din logistica zilnică.' },
      { title: 'Centre reciclare urbane', body: 'Procesare deșeuri municipale pentru valorificare.' },
    ],
  },
  'rec-cauciuc': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Reciclare anvelope uzate', body: 'Mărunțire pentru granule cauciuc și combustibil alternativ.' },
      { title: 'Service auto mari', body: 'Valorificare stocuri mari de anvelope scoase din uz.' },
      { title: 'Producători granule', body: 'Materie primă pentru terenuri sportive și asfalt modificat.' },
    ],
  },
  'rec-balotare': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Centre colectare deșeuri', body: 'Compactare carton, plastic și folie în baloți transportabili.' },
      { title: 'Retail și distribuție', body: 'Procesare ambalaje provenite din logistica zilnică.' },
      { title: 'Stații reciclare urbane', body: 'Reducerea volumului pentru transport eficient la reciclatori.' },
    ],
  },
  'rec-tocator': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Reciclare deșeuri mixte', body: 'Mărunțire primă pentru fluxuri de reciclare variate.' },
      { title: 'Producție peleți și RDF', body: 'Pregătire materie primă pentru combustibili alternativi.' },
      { title: 'Centre valorificare', body: 'Reducerea volumului pentru transport și procesare ulterioară.' },
    ],
  },
  'rec-presa': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Centre colectare', body: 'Compactare deșeuri pentru transport economic la fabrici.' },
      { title: 'Retail și hypermarket', body: 'Gestiune internă a ambalajelor din logistica zilnică.' },
      { title: 'Fabrici cu deșeuri proprii', body: 'Procesare rebuturi în baloți transportabili cu camionul.' },
    ],
  },
  'rec-separator': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Stații reciclare mixtă', body: 'Separare fracții din flux municipal și industrial.' },
      { title: 'Fabrici de peleți', body: 'Sortare materie primă după granulație și densitate.' },
      { title: 'Reciclare DEEE', body: 'Separare metale, plastic și componente electronice.' },
    ],
  },
  'rec-colector-praf': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Linii de reciclare', body: 'Captare praf fin din procesele de mărunțire și sortare.' },
      { title: 'Ateliere de prelucrare', body: 'Reducerea emisiilor la ștanțare, sudură și șlefuire.' },
      { title: 'Conformitate ESG', body: 'Recuperare pulberi pentru respectarea normelor de mediu.' },
    ],
  },
  'rec-spalare': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Reciclare PET și HDPE', body: 'Spălare fulgi de plastic pentru reutilizare în extrudere.' },
      { title: 'Valorificare folie', body: 'Pregătire folie LDPE pentru reciclare peletizată.' },
      { title: 'Reciclare industrială', body: 'Pregătire materie primă curată pentru producători peleți.' },
    ],
  },
  'rec-general': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Centre de colectare', body: 'Procesare deșeuri mixte pentru reintroducere în fluxuri.' },
      { title: 'Fabrici cu deșeuri proprii', body: 'Valorificare internă a rebuturilor din producție.' },
      { title: 'Stații reciclare urbane', body: 'Tratare selectivă pentru economie circulară locală.' },
    ],
  },

  'insp-xray': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Industria alimentară', body: 'Detectare corpuri străine în produse ambalate și la vrac.' },
      { title: 'Farmaceutice și medicale', body: 'Verificare integritate blistere și flacoane sigilate.' },
      { title: 'Control securitate', body: 'Inspecție bagaje și colete în puncte sensibile.' },
    ],
  },
  'insp-metal': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Industria cărnii', body: 'Detectare fragmente metalice în produse de carne și mezeluri.' },
      { title: 'Panificație și patiserie', body: 'Control final înainte de ambalare și livrare retail.' },
      { title: 'Producție cereale', body: 'Verificare făinuri, granule și produse vrac la export.' },
    ],
  },
  'insp-cantarire': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție FMCG', body: 'Control gramaj pentru conformitate cu eticheta și legea.' },
      { title: 'Linii automatizate', body: 'Rejectare pachete neconforme din flux continuu.' },
      { title: 'Farmaceutice', body: 'Verificare gramaj strict pentru loturi reglementate.' },
    ],
  },
  'insp-vision': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Linii ambalare alimente', body: 'Verificare prezență capac, nivel și etichetă pe flacon.' },
      { title: 'Producție farmaceutică', body: 'Control optic blistere, nivel lichid și corpuri străine.' },
      { title: 'Electronică și PCB', body: 'Inspecție automată componente și defecte vizuale.' },
    ],
  },
  'insp-endoscop': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Inspecții canalizări', body: 'Verificare conducte de scurgere și rețele urbane de canalizare.' },
      { title: 'Inspecții industriale', body: 'Verificări interne țevi, rezervoare și echipamente complexe.' },
      { title: 'Utilități apă și gaz', body: 'Diagnostic rețele subterane pentru lucrări de mentenanță.' },
    ],
  },
  'insp-termo': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Instalații electrice', body: 'Detectare puncte calde în tablouri și conexiuni.' },
      { title: 'Clădiri industriale', body: 'Identificare pierderi termice și defecte de izolație.' },
      { title: 'Mentenanță predictivă', body: 'Monitorizare temperatură la rulmenți și motoare critice.' },
    ],
  },
  'insp-ultrasonic': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Verificare conducte', body: 'Măsurare grosime perete și control coroziune internă.' },
      { title: 'Structuri metalice', body: 'Detecție fisuri interne și neomogenități în materialele sudate.' },
      { title: 'Piese turnate', body: 'Control calitate la recepție pentru piese cu risc intern.' },
    ],
  },
  'insp-duritate': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Controlul calității metalurgice', body: 'Verificare duritate piese tratate termic și călite.' },
      { title: 'Laboratoare mecanice', body: 'Teste pe materialele recepționate din producție.' },
      { title: 'Furnizori industriali', body: 'Documentare rapoarte conform specificațiilor clientului.' },
    ],
  },
  'insp-general': {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Linii producție alimentară', body: 'Control calitate la ambalare pentru conformitate HACCP.' },
      { title: 'Producție farmaceutică', body: 'Trasabilitate și conformitate pentru loturi reglementate.' },
      { title: 'Industrie metalică', body: 'Detectare contaminanți și defecte în produsele finite.' },
    ],
  },

  generic: {
    heading: 'Unde se potrivește',
    cases: [
      { title: 'Producție industrială', body: 'Utilizare în ateliere și linii de producție zilnice.' },
      { title: 'Ateliere specializate', body: 'Soluție pentru firme cu volum mediu și variabil.' },
      { title: 'Servicii și mentenanță', body: 'Sprijin pentru activități de întreținere și reparații.' },
    ],
  },
};

// ============= FAQ library keyed by product type =============

const FAQS = {
  'cnc-stone': {
    question: 'Ce scule se folosesc pentru granit și quartz?',
    answer: 'Se utilizează scule diamantate dedicate — freze, discuri și biți pentru tehnologii de tăiere cu răcire continuă cu apă, pentru viață lungă și calitate constantă a suprafețelor.',
  },
  'cnc-5axe': {
    question: 'Este nevoie de software CAM special pentru cinci axe?',
    answer: 'Controlerul acceptă G Code standard generat de pachete CAM profesionale precum PowerMill, hyperMILL sau Fusion 360. Postprocesorul se validează la punerea în funcțiune.',
  },
  'cnc-wood': {
    question: 'Pot prelucra și metale neferoase pe acest router CNC?',
    answer: 'Da, mașina acceptă aluminiu, alamă și aliaje neferoase cu freze dedicate și parametri corespunzători. Productivitatea optimă rămâne pe lemn masiv și compozite.',
  },
  'cnc-laser': {
    question: 'Ce grosimi de material pot fi tăiate cu acest laser?',
    answer: 'Grosimea maximă depinde de puterea sursei laser și de materialul tăiat. Fișa tehnică indică tabelele pentru oțel, inox și aluminiu la calitățile standard.',
  },
  'cnc-metal': {
    question: 'Ce software CAM este compatibil cu această mașină CNC?',
    answer: 'Controlerul acceptă G Code standard generat de PowerMill, hyperMILL, Fusion 360 sau Mastercam. Postprocesorul se validează la punerea în funcțiune.',
  },
  'cnc-general': {
    question: 'Ce software CAM este compatibil cu această mașină CNC?',
    answer: 'Controlerul acceptă G Code standard compatibil cu Alphacam, Artcam, PowerMill, Aspire și Fusion 360. Postprocesorul se validează la punerea în funcțiune.',
  },

  'strung-mini': {
    question: 'Cât de precis este strungul mini pentru piese mici?',
    answer: 'Precizia este suficientă pentru prototipare și piese hobby, cu toleranțe uzuale în ordinul sutimilor de milimetru în funcție de sculă și rigiditate.',
  },
  'strung-cnc': {
    question: 'Ce tip de mandrină poate fi montată pe acest strung CNC?',
    answer: 'Strungul acceptă mandrine cu trei bacuri, hidraulice sau pneumatice, conform fișei tehnice. Configurația se stabilește la ofertare în funcție de tipul de piese.',
  },
  'strung-universal': {
    question: 'Pot strunji și filete metrice și inch pe această mașină?',
    answer: 'Da, strungul universal permite filetare metrică, whitworth și inch cu setul de roți dințate din pachet. Tabelele de filete se află pe carcasa strungului.',
  },
  'strung-general': {
    question: 'Pot strunji piese filetate pe această mașină?',
    answer: 'Da, strungul permite strunjire cilindrică, conică și filetare metrică sau whitworth cu setul de roți dințate corespunzător. Consultați tabelele de filete pentru detalii.',
  },

  'lemn-slefuire': {
    question: 'Ce lățimi de piese pot fi calibrate pe această mașină?',
    answer: 'Lățimea utilă este definită în fișa tehnică și poate varia între modele. Pentru panouri mai late decât standardul, verificați varianta extinsă sau treceri multiple.',
  },
  'lemn-debitare': {
    question: 'Ce grosime maximă de panou poate fi debitată pe această mașină?',
    answer: 'Grosimea maximă depinde de modelul de pânză și configurația fierăstrăului. Valorile exacte sunt specificate în fișa tehnică pentru fiecare variantă.',
  },
  'lemn-canturi': {
    question: 'Ce grosimi de canturi pot fi aplicate pe această mașină?',
    answer: 'Mașina procesează canturi ABS și PVC în grosimi uzuale de 0,4 – 3 mm. Configurația se adaptează tipului de finisaj și adezivului termoplastic folosit.',
  },
  'lemn-gaurit': {
    question: 'Poate găuri simultan pentru balamale și știfturi?',
    answer: 'Da, capetele multiple permit executarea în paralel a găurilor pentru balamale, dibluri și conectori, cu reducere semnificativă a timpului de producție.',
  },
  'lemn-freza': {
    question: 'Ce tipuri de freze pot fi folosite pe această mașină?',
    answer: 'Mașina acceptă freze standard pentru tâmplărie — profile, canale și contur — cu coadă cilindrică sau con Morse, în funcție de configurația arborilor portscule.',
  },
  'lemn-presa': {
    question: 'Ce adezivi sunt compatibili cu această presă?',
    answer: 'Presa este compatibilă cu adezivi PU, PVA și urea-formaldehidă, cu timpi de priză reglabili. Parametrii se ajustează în funcție de grosimea și structura stratificatului.',
  },
  'lemn-rindea': {
    question: 'Ce grosimi minime poate rindeluii această mașină?',
    answer: 'Grosimea minimă și maximă este specificată în fișa tehnică. Uzura cuțitelor și reglajele de adâncime influențează direct rezultatul final al suprafeței.',
  },
  'lemn-aspirator': {
    question: 'Ce debit de aer asigură acest sistem de aspirație?',
    answer: 'Debitul variază în funcție de model și numărul de puncte deservite. Fișa tehnică indică debitul nominal și depresiunea maximă la operare continuă.',
  },
  'lemn-general': {
    question: 'Ce materiale pot fi prelucrate pe această mașină?',
    answer: 'Mașina este dedicată lemnului masiv, PAL-ului și MDF-ului, cu tehnologie adaptată producției de mobilier. Configurațiile suplimentare se stabilesc la ofertare.',
  },

  'amb-vacuum': {
    question: 'Ce tipuri de pungi sunt compatibile cu această mașină de vidat?',
    answer: 'Compatibilă cu pungi netede și gofrate PA/PE, cu grosimi uzuale 70–150 microni. Dimensiunea pungii se alege în funcție de produsul ambalat.',
  },
  'amb-stretch': {
    question: 'Ce greutate maximă de palet poate banderola această mașină?',
    answer: 'Capacitatea standard este pentru paleți de până la 2 tone, cu variante pentru dimensiuni mai mari. Nivelul de preîntindere al foliei se reglează din panou.',
  },
  'amb-blister': {
    question: 'Ce tipuri de folii sunt compatibile cu această mașină de blisterat?',
    answer: 'Sunt compatibile folii PVC, PET și PE în grosimi standard. Folia de aluminiu pentru sigilare se alege în funcție de produsul ambalat.',
  },
  'amb-flow': {
    question: 'Ce filme sunt compatibile cu această mașină de ambalat?',
    answer: 'Mașina acceptă filme OPP/CPP, PE, PET/PE, laminate multistrat și hârtie termosudabilă, cu reglaje de temperatură și tensiune pentru fiecare tip.',
  },
  'amb-banding': {
    question: 'Ce lățimi de bandă pot fi folosite pe această mașină?',
    answer: 'Mașina este compatibilă cu benzi PP și OPP în lățimi standard de 5–30 mm. Benzile cu tipar personalizat pot fi folosite pentru branding pachet.',
  },
  'amb-bagaje': {
    question: 'Ce tip de folie folosește mașina de ambalat bagaje?',
    answer: 'Se folosește folie LDPE stretch transparentă, cu rezistență mare la tracțiune. Lungimea de film consumată per bagaj se reglează conform gabaritului.',
  },
  'amb-cutii': {
    question: 'Ce dimensiuni de cutii poate forma această mașină?',
    answer: 'Dimensiunile acoperă gama uzuală pentru FMCG și e-commerce. Schimbul formatelor se face prin reglaje mecanice rapide, fără scule speciale.',
  },
  'amb-sigilare': {
    question: 'Ce temperatură de lucru recomandă fabricantul?',
    answer: 'Temperatura depinde de tipul foliei folosite — uzual 130–190°C pentru filme termosudabile. Sensor de temperatură și afișaj digital pentru control precis.',
  },
  'amb-termoform': {
    question: 'Ce materiale sunt compatibile cu termoformarea?',
    answer: 'Se pot folosi filme rigide PVC, PET, PP sau multistrat EVOH pentru aplicații cu barieră. Seturile de matrițe sunt configurabile pentru diverse caserole.',
  },
  'amb-general': {
    question: 'Poate fi integrată această mașină în linia existentă de producție?',
    answer: 'Da, echipamentul acceptă integrare cu transportoare, printare de date lot și sisteme de control superior. Configurația se adaptează fluxului existent la ofertare.',
  },

  laser: {
    question: 'Ce grosimi de material pot fi tăiate cu acest laser?',
    answer: 'Grosimea maximă depinde de puterea sursei laser și de tipul materialului. Fișa tehnică indică tabelele de tăiere pentru oțel, inox și aluminiu.',
  },

  'constr-excavator': {
    question: 'Excavatorul poate fi echipat cu atașamente specializate?',
    answer: 'Da, utilajul acceptă cupe dedicate, ciocane hidraulice, freze și foreze pe cuplaj standard. Circuite hidraulice suplimentare pot fi adăugate la cerere.',
  },
  'constr-concasor': {
    question: 'Ce dimensiune maximă de material poate zdrobi concasorul?',
    answer: 'Dimensiunea maximă de intrare este specificată în fișa tehnică și diferă între modele. Fracțiile de ieșire se reglează prin distanța dintre fălci.',
  },
  'constr-sortare': {
    question: 'Câte fracțiuni distincte poate separa această stație de sortare?',
    answer: 'Numărul de fracțiuni depinde de configurația ciurelor. Stațiile standard produc 3–4 granulometrii simultan, suficient pentru livrările de agregate.',
  },
  'constr-incarcator': {
    question: 'Ce atașamente sunt compatibile cu acest încărcător?',
    answer: 'Se pot monta cupe, furci paleți, cârlige de macara și foarfeci cu cuplaj rapid. Schimbul se face din cabină, fără intervenție manuală.',
  },
  'constr-stivuitor': {
    question: 'Pentru ce medii de lucru este potrivit acest stivuitor?',
    answer: 'Modelul este adaptat lucrului în interior sau exterior conform motorizării — electric pentru hale și diesel sau GPL pentru platforme deschise.',
  },
  'constr-generator': {
    question: 'Generatorul funcționează și în regim continuu 24/7?',
    answer: 'Da, generatoarele industriale sunt concepute pentru regim continuu cu mentenanță planificată. Rezervorul și filtrul susțin durate extinse fără oprire.',
  },
  'constr-compresor': {
    question: 'Ce capacitate de aer produce acest compresor?',
    answer: 'Debitul nominal este indicat în fișa tehnică, ajustat pentru alimentarea sculelor pneumatice tipice. Variantele cu rezervor mai mare susțin consumuri vârf.',
  },
  'constr-malaxor': {
    question: 'Ce capacitate are malaxorul pe ciclu?',
    answer: 'Capacitatea pe ciclu este indicată în fișa tehnică și variază între modele. Timpii de amestec se reglează în funcție de rețeta de beton sau mortar.',
  },
  'constr-macara': {
    question: 'Ce sarcină maximă poate ridica macaraua?',
    answer: 'Sarcina maximă și diagramele de operare sunt precizate în fișa tehnică. Raza de lucru influențează sarcina utilă conform tabelelor fabricantului.',
  },
  'constr-foraj': {
    question: 'Ce diametru maxim de foraj suportă acest utilaj?',
    answer: 'Diametrul depinde de model și de tipul de sol. Fișa tehnică indică limite pentru sol dur, sedimentar și pentru adâncimi variabile.',
  },
  'constr-grader': {
    question: 'Ce lățime de lamă are acest utilaj?',
    answer: 'Lățimea lamei este precizată în fișa tehnică și se corelează cu masa utilajului și puterea motorului. Variantele lungi sunt dedicate drumurilor mari.',
  },
  'constr-compact': {
    question: 'Ce tipuri de suprafețe poate compacta acest cilindru?',
    answer: 'Cilindrul compactează umplutură, strat de bază și asfalt conform tipului de tambur — neted sau picior de oaie, în funcție de aplicație.',
  },
  'constr-foarfeca': {
    question: 'Pe ce capacități de excavator se montează foarfeca?',
    answer: 'Fiecare variantă are o gamă recomandată de excavatoare, specificată în fișa tehnică prin greutatea purtătorului. Montajul folosește cuplaj rapid standard.',
  },
  'constr-ciocan': {
    question: 'Ce tipuri de vârfuri pot fi montate pe ciocan?',
    answer: 'Se pot monta dalte, vârfuri conice și picoane în funcție de aplicație. Alegerea depinde de materialul spart și durabilitatea dorită.',
  },
  'constr-atasament-cupa': {
    question: 'Cu ce capacități de excavator este compatibilă această cupă?',
    answer: 'Cupa se fabrică pe clase de tonaj excavator, conform fișei tehnice. Cuplajul rapid universal permite montajul pe majoritatea excavatoarelor compatibile.',
  },
  'constr-placa': {
    question: 'Ce grosime de strat poate compacta această placă?',
    answer: 'Grosimea efectivă depinde de masa plăcii și materialul compactat. Standardul acoperă straturi de 15–30 cm pentru balast, nisip și pietriș.',
  },
  'constr-pompa-beton': {
    question: 'Până la ce distanță poate pompa beton acest utilaj?',
    answer: 'Raza de lucru și debitul sunt specificate în fișa tehnică. Pompa este configurabilă pentru turnări verticale și orizontale de mari distanțe.',
  },
  'constr-statie': {
    question: 'Care este debitul orar nominal al stației?',
    answer: 'Debitul se calculează în funcție de materialul alimentat și dimensiunea maximă. Fișa tehnică indică productivitatea nominală pentru agregate standard.',
  },
  'constr-transport': {
    question: 'Ce sarcină utilă are acest utilaj de transport?',
    answer: 'Sarcina utilă este specificată în fișa tehnică. Utilajele sunt dimensionate pentru regimul continuu pe drumuri neamenajate din șantier.',
  },
  'constr-general': {
    question: 'Ce service și piese de schimb sunt disponibile în România?',
    answer: 'UZINEX asigură piese de schimb în stoc la Iași și suport tehnic național cu intervenții în 24–48 ore. Mentenanța preventivă este inclusă.',
  },

  'energy-generator': {
    question: 'Cât timp poate funcționa generatorul cu un rezervor plin?',
    answer: 'Autonomia depinde de sarcină și capacitatea rezervorului. Fișa tehnică indică autonomia la 75% sarcină, tipică pentru regim industrial continuu.',
  },
  'energy-heatpump': {
    question: 'Ce COP oferă pompa de căldură la temperaturi scăzute?',
    answer: 'COP-ul variază cu temperatura exterioară. Tehnologia EVI DC Inverter menține performanțele și la temperaturi negative, conform curbei din fișa tehnică.',
  },
  'energy-solar': {
    question: 'Ce randament au panourile în condiții de lumină difuză?',
    answer: 'Panourile moderne produc energie și pe vreme înnorată, la 10–25% din randamentul maxim. Randamentul anual depinde de orientare, înclinare și geografia locală.',
  },

  'et-etichetare': {
    question: 'Pot fi tipărite date variabile (lot, dată) direct pe etichetă?',
    answer: 'Da, mașina se integrează cu imprimante termotransfer sau inkjet pentru coduri de lot, date de expirare și coduri de bare variabile pe fiecare etichetă.',
  },
  'et-dozare': {
    question: 'Ce precizie de dozare oferă echipamentul?',
    answer: 'Precizia uzuală este sub ±1% din volumul dozat, cu reglaje fine pentru produse vâscoase. Senzorii volumetrici sau masici se aleg în funcție de produs.',
  },
  'et-general': {
    question: 'Echipamentul se integrează cu o linie existentă?',
    answer: 'Da, echipamentul acceptă integrare cu transportoare și sisteme SCADA prin interfețe standard. Configurarea se face conform fluxului actual al fabricii.',
  },

  'rec-plastic': {
    question: 'Materialul rezultat poate fi reintrodus în producția de peleți?',
    answer: 'Da, granulele obținute sunt compatibile cu liniile de extrudere pentru peleți. Puritatea se asigură prin spălare prealabilă și separare magnetică.',
  },
  'rec-metal': {
    question: 'Ce metale pot fi procesate pe acest echipament?',
    answer: 'Echipamentul procesează fier, oțel, aluminiu și alte neferoase, în funcție de configurare. Pentru cabluri sunt disponibile accesorii de separare suplimentare.',
  },
  'rec-lemn': {
    question: 'Ce umiditate maximă acceptă pentru lemnul procesat?',
    answer: 'Umiditatea recomandată este sub 15% pentru peleți și sub 25% pentru RDF. Materialul uscat mai mult susține randamente mai bune la peletizare.',
  },
  'rec-hartie': {
    question: 'Ce dimensiune au baloții de hârtie rezultați?',
    answer: 'Dimensiunile standard se încadrează între 1.100×750 mm și 1.100×1.100 mm, cu greutate variabilă între 250 și 600 kg în funcție de presiune și material.',
  },
  'rec-cauciuc': {
    question: 'Ce granulație de cauciuc se poate obține?',
    answer: 'Granulația variază de la bucăți grosiere până la granule fine de 1–4 mm. Configurarea cu sita de ieșire stabilește fracțiunea finală.',
  },
  'rec-balotare': {
    question: 'Ce dimensiuni au baloții rezultați?',
    answer: 'Dimensiunile standard se încadrează între 1.100×750 mm și 1.100×1.100 mm, cu greutate variabilă între 250 și 600 kg în funcție de material.',
  },
  'rec-tocator': {
    question: 'Ce materiale pot fi tocate pe acest echipament?',
    answer: 'Tocătorul procesează plastic, lemn, hârtie, deșeuri mixte și alte materiale solide. Dimensiunea de ieșire se stabilește prin sita de evacuare.',
  },
  'rec-presa': {
    question: 'Ce forță de presare oferă presa?',
    answer: 'Forța maximă este specificată în fișa tehnică și susține compactarea diverselor materiale. Reglajele de ciclu se fac din panoul de comandă.',
  },
  'rec-separator': {
    question: 'Ce metode de separare folosește acest echipament?',
    answer: 'Separarea se poate face magnetic, prin curenți Foucault, pneumatic sau densimetric, în funcție de configurare. Eficiența depinde de tipul fluxului.',
  },
  'rec-colector-praf': {
    question: 'Ce debit de aspirație asigură acest colector?',
    answer: 'Debitul depinde de configurația ventilatorului și a filtrelor. Fișa tehnică indică debitul nominal și depresiunea la puncte de lucru standard.',
  },
  'rec-spalare': {
    question: 'Ce temperatură atinge apa în modulul de spălare?',
    answer: 'Modulul lucrează cu apă caldă reglabilă pentru eliminarea etichetelor și contaminanților. Temperatura se ajustează în funcție de tipul de polimer.',
  },
  'rec-general': {
    question: 'Care este puterea instalată pentru acest echipament?',
    answer: 'Puterea motorului și consumul sunt specificate în fișa tehnică. Echipamentul este configurat pentru alimentare trifazată industrială standard.',
  },

  'insp-xray': {
    question: 'Ce tipuri de contaminanți poate detecta sistemul cu raze X?',
    answer: 'Detectează metale, sticlă, piatră, oase și plastic dens în alimente și produse ambalate. Sensibilitatea se ajustează pentru fiecare tip de produs.',
  },
  'insp-metal': {
    question: 'Detectorul identifică și metale neferoase?',
    answer: 'Da, detectorul identifică feroase, neferoase și inox. Sensibilitatea se calibrează individual pentru fiecare produs în funcție de umiditate și sare.',
  },
  'insp-cantarire': {
    question: 'Ce precizie de cântărire oferă acest echipament?',
    answer: 'Precizia depinde de capacitate și viteza benzii. Echipamentele profesionale ating ±0,1 g la produse mici și ±1 g la produse mari, conform fișei tehnice.',
  },
  'insp-vision': {
    question: 'Ce tipuri de defecte poate identifica sistemul de viziune?',
    answer: 'Sistemul identifică defecte vizuale, abateri dimensionale, absența componentelor și erori de etichetă. Configurarea se face cu biblioteca de inspecție specifică.',
  },
  'insp-endoscop': {
    question: 'Ce diametru minim de conductă poate inspecta acest robot?',
    answer: 'Diametrul minim depinde de modelul de robot — variantele standard accesează conducte de la 100 mm și pot urca pe pante moderate.',
  },
  'insp-termo': {
    question: 'Ce rezoluție termică oferă camera?',
    answer: 'Rezoluția diferă între modele și este esențială pentru detalii fine. Fișa tehnică indică rezoluția senzorului și sensibilitatea termică (NETD).',
  },
  'insp-ultrasonic': {
    question: 'Ce grosimi minime pot fi măsurate ultrasonic?',
    answer: 'Grosimea minimă de măsurare pornește de la 1–2 mm în funcție de traductor și material. Precizia este influențată de rugozitatea suprafeței.',
  },
  'insp-duritate': {
    question: 'Ce scale de duritate sunt suportate?',
    answer: 'Echipamentul suportă scalele Rockwell, Brinell și Vickers conform fișei tehnice. Conversiile între scale se fac automat de software.',
  },
  'insp-general': {
    question: 'Echipamentul se integrează cu liniile existente de producție?',
    answer: 'Da, se integrează cu transportoarele și sistemele SCADA prin interfețe standard Ethernet sau câmp industrial, conform cerințelor liniei.',
  },

  generic: {
    question: 'Ce opțiuni de configurare sunt disponibile la comandă?',
    answer: 'Echipamentul este configurabil la cerere în funcție de aplicație și volum. UZINEX recomandă configurația optimă la ofertare și oferă consultanță tehnică gratuită.',
  },
};

// ============= image caption library =============

const IMAGE_CAPTIONS = {
  'cnc-stone': 'Zonă de lucru pentru plăci de granit, quartz și marmură.',
  'cnc-5axe': 'Cap de tăiere cu cinci axe pentru geometrii complexe.',
  'cnc-wood': 'Masa de lucru cu T-slot și vacuum pentru piese din lemn.',
  'cnc-laser': 'Sursa laser și zona de tăiere cu extracție fum.',
  'cnc-metal': 'Zona de prelucrare și capul frezare pentru piese metalice.',
  'cnc-general': 'Vedere generală a centrului de prelucrare CNC.',

  'strung-mini': 'Sania longitudinală și mandrina strungului compact.',
  'strung-cnc': 'Turela portscule și panoul de control al strungului CNC.',
  'strung-universal': 'Pătrățelul de avans și patina longitudinală.',
  'strung-general': 'Sanie și mandrină — elemente principale ale strungului.',

  'lemn-slefuire': 'Cilindri abrazivi și masa de avans pentru calibrare.',
  'lemn-debitare': 'Grup de debitare și masă formatizare cu ghidaj.',
  'lemn-canturi': 'Grup de aplicare și cap de retezare cant.',
  'lemn-gaurit': 'Cap cu capete multiple pentru găurire paralelă.',
  'lemn-freza': 'Arbore portscule și masă reglabilă pentru frezare.',
  'lemn-presa': 'Platane și sistem de presare în regim reglabil.',
  'lemn-rindea': 'Cuțite rotative și masă de avans pentru rindeluire.',
  'lemn-aspirator': 'Carcasa ciclon și racorduri de aspirație centralizată.',
  'lemn-general': 'Spațiu util și elemente principale ale mașinii.',

  'amb-vacuum': 'Camera de vidare și capac cu blocaj de siguranță.',
  'amb-stretch': 'Brațul rotativ și sistemul de preîntindere a foliei.',
  'amb-blister': 'Grup termoformare și sistem de sigilare blister.',
  'amb-flow': 'Rola de film și tunelul de sigilare longitudinal.',
  'amb-banding': 'Modul de banding și arc cu rola de bandă PP.',
  'amb-bagaje': 'Post de ambalare bagaje cu sistem rotativ de folie.',
  'amb-cutii': 'Modul de formare a cutiilor și sigilare la bază.',
  'amb-sigilare': 'Bare de sigilare și sistem de transport continuu.',
  'amb-termoform': 'Matrițe de termoformare și zona de sigilare.',
  'amb-general': 'Zona de lucru și elementele principale ale liniei.',

  laser: 'Sursa laser și zona de tăiere cu extracție fum.',

  'constr-excavator': 'Cupa și brațul articulat în poziție de lucru.',
  'constr-concasor': 'Camera de zdrobire și banda de evacuare material.',
  'constr-sortare': 'Ciururi suprapuse și banda de ieșire a fracțiunilor.',
  'constr-incarcator': 'Cupa frontală și cabina operatorului încărcătorului.',
  'constr-stivuitor': 'Catarg telescopic și furci pentru manipulare paleți.',
  'constr-generator': 'Motor diesel și panoul de comandă cu indicatoare.',
  'constr-compresor': 'Unitatea de compresie și rezervorul tampon cu reglare.',
  'constr-malaxor': 'Tamburul de malaxare și postul de descărcare.',
  'constr-macara': 'Brațul telescopic și sistemul de cablu cu sarcină.',
  'constr-foraj': 'Coloana de foraj și turela de antrenare a sculei.',
  'constr-grader': 'Lama centrală reglabilă și cabina utilajului.',
  'constr-compact': 'Tamburul vibrator și cabina operatorului cilindrului.',
  'constr-foarfeca': 'Lamele foarfecii și cilindri hidraulici principali.',
  'constr-ciocan': 'Corpul ciocanului și dalta de lucru montată.',
  'constr-atasament-cupa': 'Cupa echipată cu sistem de cuplare pe excavator.',
  'constr-placa': 'Placa vibratoare și ghidonul de comandă.',
  'constr-pompa-beton': 'Pompa de beton și brațul de distribuție al agregatului.',
  'constr-statie': 'Fluxul de procesare al agregatelor pe senile.',
  'constr-transport': 'Benă basculantă și sistemul de acționare hidraulic.',
  'constr-general': 'Utilajul în configurație completă, gata de lucru.',

  'energy-generator': 'Grupul electrogen cu motor diesel și tablou de comandă.',
  'energy-heatpump': 'Unitatea exterioară și ecranul tactil al pompei de căldură.',
  'energy-solar': 'Panourile fotovoltaice și sistemul de montaj orientat.',

  'et-etichetare': 'Cap de etichetare și transportor de recipiente.',
  'et-dozare': 'Duze de dozare și sistem de transport recipiente.',
  'et-general': 'Zona de dozare și postul de control al liniei.',

  'rec-plastic': 'Tocător de plastic și modulul de alimentare cu material.',
  'rec-metal': 'Camera de procesare pentru metale și extractor.',
  'rec-lemn': 'Sistemul de tocare și evacuare a materialului lemnos.',
  'rec-hartie': 'Cameră de compactare și sistemul de legare a baloților.',
  'rec-cauciuc': 'Grup de tocare și sita de clasificare cauciuc.',
  'rec-balotare': 'Camera de compactare și sistemul de legare baloți.',
  'rec-tocator': 'Camera de mărunțire și sistemul de evacuare material.',
  'rec-presa': 'Camera de presare și pistonul principal al presei.',
  'rec-separator': 'Zona de separare și banda de evacuare a fracțiunilor.',
  'rec-colector-praf': 'Corpul filtrant și modulele de curățare cu impuls.',
  'rec-spalare': 'Tancurile de spălare și cicloanele de evacuare apă.',
  'rec-general': 'Camera de procesare și banda transportoare de alimentare.',

  'insp-xray': 'Tunelul de inspecție cu sursă de raze X și detector.',
  'insp-metal': 'Bobina de detecție și transportorul cu rejector integrat.',
  'insp-cantarire': 'Banda de cântărire și sistemul de rejectare automată.',
  'insp-vision': 'Camerele și iluminarea structurată a sistemului de viziune.',
  'insp-endoscop': 'Cap camera și cablu rezistent la apă al robotului.',
  'insp-termo': 'Camera termoviziune și ecranul de analiză a punctelor fierbinți.',
  'insp-ultrasonic': 'Traductor ultrasonic și afișajul digital al valorilor.',
  'insp-duritate': 'Capul de indentare și sistemul de măsurare al amprentei.',
  'insp-general': 'Linie de inspecție automată pentru control calitate.',

  generic: 'Vedere detaliată a echipamentului.',
};

// ============= build for one product =============

function buildForProduct(p) {
  const slug = p.slug;
  const paragraphs = getParagraphs(p);
  const totalParagraphs = paragraphs.length;
  const existingAnimations = (animations[slug] || []).map((a) => a.insertAfterParagraph);
  const usedPositions = new Set(existingAnimations);

  // Positions preferring 2, 3, 5, 6, 8
  const candidatePositions = [2, 3, 5, 6, 8, 9, 10];
  const maxAllowed = Math.max(2, totalParagraphs - 2);
  const positions = [];
  for (const pos of candidatePositions) {
    if (positions.length >= 4) break;
    if (pos > maxAllowed) continue;
    if (usedPositions.has(pos)) continue;
    positions.push(pos);
  }
  if (positions.length < 4) {
    for (let pos = 2; pos <= maxAllowed && positions.length < 4; pos++) {
      if (usedPositions.has(pos)) continue;
      if (positions.includes(pos)) continue;
      positions.push(pos);
    }
  }
  positions.sort((a, b) => a - b);
  while (positions.length > 4) positions.pop();

  const types = ['quote', 'usecases', 'faq', 'image'];
  const orderedTypes = types.slice(0, positions.length);

  const pType = productType(p);

  const entries = [];
  for (let i = 0; i < orderedTypes.length; i++) {
    const type = orderedTypes[i];
    const position = positions[i];
    if (type === 'quote') {
      const stripDia = (s) => s.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');
      const nameTokens = stripDia((p.name || '').toLowerCase()).split(/[\s\-]+/).filter((w) => w.length > 3);
      const isRestatement = (t) => {
        if (!t || !nameTokens.length) return false;
        const nd = stripDia(t.toLowerCase());
        const m = nameTokens.filter((tok) => nd.includes(tok)).length;
        const r = m / nameTokens.length;
        return r >= 0.65 && nameTokens.length >= 3;
      };
      let text = pickSentence(paragraphs, p.name);
      if (text && isRestatement(text)) text = null;
      if (!text) {
        // Last-ditch: search mid paragraphs for any non-restating sentence via comma split
        const pool = paragraphs.slice(1, 12);
        let chosen = null;
        for (const src of pool) {
          const segments = src.replace(/\s*\n+\s*/g, ' ').split(/[.!?]\s+|,\s+/);
          for (const seg of segments) {
            const cleaned = cleanSentence(seg);
            const w = wordCount(cleaned);
            if (w < 8 || w > 22) continue;
            if (looksLikeHeading(cleaned)) continue;
            if (/uzinex|garan[tț]ie|transport|ofertare|pnrr|seap|leasing|iasi/i.test(cleaned)) continue;
            if (isRestatement(cleaned)) continue;
            let c = cleaned;
            if (/^[a-zăîâșț]/.test(c)) c = c[0].toUpperCase() + c.slice(1);
            chosen = ensurePeriod(c);
            break;
          }
          if (chosen) break;
        }
        if (!chosen) {
          // Absolute fallback: benefit text or static summary
          const benList = benefits[p.slug];
          if (benList && benList.length) {
            const b = benList[0];
            chosen = ensurePeriod(`${b.benefitTitle} — ${b.benefitValue}`.slice(0, 200));
          } else {
            chosen = 'Echipament configurat pentru producție industrială continuă.';
          }
        }
        text = chosen;
      }
      entries.push({
        type: 'quote',
        insertAfterParagraph: position,
        data: { text, attribution: 'Caracteristică tehnică' },
      });
    } else if (type === 'usecases') {
      const uc = USECASES[pType] || USECASES.generic;
      entries.push({
        type: 'usecases',
        insertAfterParagraph: position,
        data: { heading: uc.heading, cases: uc.cases },
      });
    } else if (type === 'faq') {
      const f = FAQS[pType] || FAQS.generic;
      entries.push({
        type: 'faq',
        insertAfterParagraph: position,
        data: { question: f.question, answer: f.answer },
      });
    } else if (type === 'image') {
      const caption = IMAGE_CAPTIONS[pType] || IMAGE_CAPTIONS.generic;
      const altBase = `${p.name} — vedere de ansamblu`;
      const alt = altBase.length > 80 ? altBase.slice(0, 77) + '...' : altBase;
      entries.push({
        type: 'image',
        insertAfterParagraph: position,
        data: { src: p.image, alt, caption },
      });
    }
  }

  return entries;
}

// ============= run =============

const out = {};
let skipped = 0;
for (const p of produse) {
  try {
    const entries = buildForProduct(p);
    out[p.slug] = entries;
  } catch (e) {
    console.error('Failed for', p.slug, e.message);
    skipped++;
  }
}

const outPath = DATA('product-enrichments.json');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');

// Self-audit
const totalEntries = Object.values(out).reduce((n, arr) => n + arr.length, 0);
const byType = { quote: 0, usecases: 0, faq: 0, image: 0, video: 0 };
Object.values(out).forEach((arr) => arr.forEach((e) => { byType[e.type] = (byType[e.type] || 0) + 1; }));
let collisions = 0;
let dupeSlugs = 0;
for (const [slug, arr] of Object.entries(out)) {
  const aPositions = (animations[slug] || []).map((a) => a.insertAfterParagraph);
  const ePositions = arr.map((e) => e.insertAfterParagraph);
  const overlap = ePositions.filter((pn) => aPositions.includes(pn));
  const dupes = ePositions.length !== new Set(ePositions).size;
  if (overlap.length > 0) collisions += overlap.length;
  if (dupes) { console.error('DUP positions for', slug, ePositions); dupeSlugs++; }
}

// Type distribution across slugs
const typeCounts = {};
for (const p of produse) {
  const pt = productType(p);
  typeCounts[pt] = (typeCounts[pt] || 0) + 1;
}

console.log('Products processed:', Object.keys(out).length);
console.log('Total enrichments:', totalEntries);
console.log('By type:', byType);
console.log('Position collisions with animations:', collisions);
console.log('Products with duplicate positions:', dupeSlugs);
console.log('Skipped products:', skipped);
console.log('Product type distribution (top):');
console.log(Object.entries(typeCounts).sort((a,b) => b[1]-a[1]).map(([k,v]) => `  ${k}: ${v}`).join('\n'));
