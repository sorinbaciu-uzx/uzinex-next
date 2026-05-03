"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { BazaNatoTile } from "./BazaNatoTile";

const DETAIL_PAGES: Record<string, string> = {
  feg: "/studii-de-caz/future-energy-group",
  "baza-nato": "/studii-de-caz/baza-nato-aluminium-laser",
  camma: "/studii-de-caz/caramida-modulara-camma",
  "fier-forjat-limanu": "/studii-de-caz/fier-forjat-limanu",
  airone: "/studii-de-caz/airone-inox",
  geomar: "/studii-de-caz/geomar-pitesti",
};

type Industry =
  | "Toate"
  | "Producție & manufactură"
  | "Logistică & depozitare"
  | "Energie & infrastructură"
  | "Procesare & reciclare"
  | "Auto & metalurgie"
  | "Apărare & securitate";

export type CaseStudyAll = {
  id: string;
  client: string;
  industry: Exclude<Industry, "Toate">;
  location: string;
  year: string;
  title: string;
  excerpt: string;
  quote?: { text: string; author: string };
  equipment: string[];
  metrics?: { label: string; value: string }[];
  image: string;
  alt: string;
  featured?: boolean;
  youtubeId?: string;
};

const CASE_STUDIES: CaseStudyAll[] = [
  {
    id: "camma",
    client: "CAMMA Tehno Metal S.R.L.",
    industry: "Procesare & reciclare",
    location: "Buzău, România",
    year: "2022",
    title: "Linie completă de producție pentru cea mai mare fabrică de cărămidă modulară din România",
    excerpt:
      "CAMMA Tehno Metal cumpărase din Ucraina 2 prese hidraulice cu forțe enorme și nu reușea să producă nici o cărămidă utilă. Soluția nu a fost forța de presare, ci o linie completă turnkey, calculator de umiditate pentru materia primă și transferul rețetei pentru chimia betoanelor hyper-presate semi-uscate, adaptată in-situ pe argila din Buzău. Capacitate operațională ×100, de la 200 la 20.000 cărămizi/zi.",
    equipment: [
      "Moară cu ciocane · spargere argilă uscată",
      "Cernător · site fine pentru bucățile mari",
      "Malaxor materie primă · amestec calibrat",
      "Presă hidraulică · compactare semi-uscată",
      "Benzi transportoare · interconectare flux + evacuare",
      "Calculator umiditate · recalculare automată proporții",
    ],
    metrics: [
      { label: "Capacitate", value: "×100" },
      { label: "Capacitate teoretică", value: "800K m³/an" },
      { label: "Defecte garanție", value: "0" },
    ],
    image: "https://img.youtube.com/vi/AoMfOAPQzVQ/maxresdefault.jpg",
    alt: "Linie completă de producție pentru cea mai mare fabrică de cărămidă modulară din România — CAMMA Tehno Metal Buzău",
    featured: true,
    youtubeId: "AoMfOAPQzVQ",
  },
  {
    id: "airone",
    client: "DORASERV SRL · AIRONE Inox · Octav Damasken",
    industry: "Producție & manufactură",
    location: "Măcin, Tulcea",
    year: "2017–2026",
    title: "9 ani · 0 intervenții service · recordul Uzinex pe laser fiber 6 kW la AIRONE Inox",
    excerpt:
      "DORASERV SRL cu brandul AIRONE Inox produce de 24 de ani echipamente pentru bucătării profesionale, lider HoReCa pe piața românească și partener white label pentru branduri italiene. Din 2017 până în 2026, Uzinex a livrat 7 echipamente majore (≈ 500.000 € investiție continuă), iar laserul fiber 6 kW din 2017 funcționează în 2026 fără o singură chemare în garanție. Recordul absolut Uzinex.",
    equipment: [
      "Laser fiber 6 kW · masă transfer · cabină închisă (2017, flagship)",
      "Abkant pentru îndoire tablă inox",
      "Sudură laser 2 kW pentru cordoane fine",
      "Robot de sudură pentru serii repetabile",
      "Mașină debitare cu jet de apă (waterjet)",
      "Presă formare la rece 600 tone (2025)",
      "Software industrial proiectare elemente metalice",
    ],
    metrics: [
      { label: "Service post-livrare", value: "9 ani · 0" },
      { label: "Investiție continuă", value: "≈ 500K €" },
      { label: "Vechime piață", value: "24 ani" },
    ],
    image: "https://img.youtube.com/vi/LVRLKCO4yQY/maxresdefault.jpg",
    alt: "Echipamente Uzinex livrate la AIRONE Inox Măcin — laser fiber 6 kW cu 9 ani 0 intervenții service, plus 6 utilaje complementare pentru fabrica completă de inox HoReCa",
    featured: true,
    youtubeId: "LVRLKCO4yQY",
  },
  {
    id: "baza-nato",
    client: "Contractor român · construcții apărare",
    industry: "Apărare & securitate",
    location: "Bază NATO · România",
    year: "2025",
    title: "5 aparate laser pe o bază NATO unde vremea bloca sudura conventională",
    excerpt:
      "Un contractor român cu acreditare NATO a livrat hangare expediționare din aluminiu pe o bază militară terestră, cu termen ferm și penalități zilnice. Vântul și ploaia făceau imposibilă sudura MIG sau TIG. Soluția: 5 aparate laser identice, 3 active plus 2 în standby, operate de oameni fără experiență de sudură care s-au adaptat mai rapid decât sudorii cu zece ani vechime.",
    equipment: [
      "5× aparat laser 3-in-1 · 2.000W · sursă MAX · pistol SUP23T",
      "Pachet consumabile pentru 12 luni",
      "Abonament înlocuire 24h",
    ],
    metrics: [
      { label: "Unități livrate", value: "5" },
      { label: "Backup", value: "2 standby" },
      { label: "Imun la vreme", value: "100%" },
    ],
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80&auto=format&fit=crop",
    alt: "Aparate de sudură laser Uzinex livrate pentru un contractor român cu acreditare NATO pentru hangare expediționare din aluminiu pe o bază militară terestră",
    featured: true,
  },
  {
    id: "feg",
    client: "Future Energy Group",
    industry: "Energie & infrastructură",
    location: "București, România",
    year: "2024",
    title: "Atelier fotovoltaic premium care a învățat să sudeze în 2 ore",
    excerpt:
      "Future Energy Group, instalator de sisteme fotovoltaice premium din București, avea nevoie să producă intern cuști de aluminiu pentru organizarea cablajelor — la standardul calitativ pe care îl livrează clienților lor. Cu o echipă agile de 3 oameni și fără sudor angajat, au ales un aparat laser 3-in-1 (sudură + curățare + debitare). Owner-ul a învățat tehnologia în 2 ore. Cost evitat: 2.500 €/lună salariu sudor.",
    equipment: ["Aparat laser 3-in-1 · 2.000W MAX · pistol SUP23T"],
    metrics: [
      { label: "Curba de învățare", value: "2 ore" },
      { label: "Salariu sudor evitat", value: "2.500 €/lună" },
      { label: "Payback estimat", value: "≈4,4 luni" },
    ],
    image: "https://img.youtube.com/vi/DQO74tlDNNQ/maxresdefault.jpg",
    alt: "Aparat laser 3-in-1 Uzinex livrat Future Energy Group București — sudură, curățare și debitare în atelierul fotovoltaic",
    featured: true,
    youtubeId: "DQO74tlDNNQ",
  },
  {
    id: "geo-ex",
    client: "Geo-Ex Construct",
    industry: "Procesare & reciclare",
    location: "România",
    year: "2025",
    title: "Fabrică completă de procesare a pietrei pentru blaturi, chiuvete și monumente funerare",
    excerpt:
      "Geo-Ex Construct, specialist în prelucrarea pietrei naturale, a colaborat cu Uzinex pentru echiparea unei fabrici complete de procesare a pietrei. Portofoliul acoperă blaturi de bucătărie, chiuvete din piatră, monumente funerare și elemente arhitecturale personalizate.",
    equipment: [
      "Centru CNC prelucrare piatră",
      "Mașini de tăiere cu disc diamantat",
      "Sistem de lustruire automată",
      "Pod rulant pentru manipulare blocuri",
    ],
    metrics: [
      { label: "Specializare", value: "Piatră" },
      { label: "Capacitate", value: "Industrială" },
      { label: "Livrare", value: "Turnkey" },
    ],
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80&auto=format&fit=crop",
    alt: "Fabrică completă de prelucrare a pietrei Uzinex pentru Geo-Ex Construct — blaturi, chiuvete, monumente",
  },
  {
    id: "geomar",
    client: "Geomar SRL · Marian",
    industry: "Auto & metalurgie",
    location: "Pitești, Argeș",
    year: "2022–2023",
    title: "Atelier B2C confecții metalice cu laser fiber 6 kW · pivotare spre tabla curată",
    excerpt:
      "Marian, fondatorul Geomar SRL din Pitești, a observat că nișa „tablă curată” devine mainstream pe B2C și a pivotat strategic. Cu o investiție Start-Up Nation 2022 de circa 50.000 €, atelierul lui de 2 oameni a primit laser fiber economy 6 kW, aparat sudură laser și pachet de digitalizare. Pentru clienți B2C care văd direct muchia produsului, edge-ul curat din laser este diferențiatorul vizibil.",
    equipment: [
      "Laser fiber economy 6 kW · debit tablă curată inox / aluminiu / oțel",
      "Aparat sudură cu laser · cordoane fine pe inox și aluminiu",
      "Pachet digitalizare · software industrial proiectare elemente metalice",
    ],
    metrics: [
      { label: "Investiție Start-Up Nation", value: "≈ 50K €" },
      { label: "Pivot", value: "Tabla curată" },
      { label: "Service post-PIF", value: "0 chemări" },
    ],
    image: "https://img.youtube.com/vi/Ofsgi59eWI4/maxresdefault.jpg",
    alt: "Atelier B2C confecții metalice Geomar SRL Pitești — laser fiber 6 kW economy plus sudură laser plus pachet digitalizare prin Start-Up Nation 2022",
    featured: true,
    youtubeId: "Ofsgi59eWI4",
  },
  {
    id: "goldpack",
    client: "Gold Pack S.R.L.",
    industry: "Procesare & reciclare",
    location: "Râmnicu Sărat, România",
    year: "2025",
    title: "Fabrică de ambalaje personalizate din carton cu linie de producție completă",
    excerpt:
      "Gold Pack S.R.L. din Râmnicu Sărat a implementat, prin Uzinex, o fabrică completă de ambalaje personalizate din carton. Linia acoperă tăiere, ștanțare, imprimare și asamblare, permițând producție flexibilă pentru clienți din diverse industrii.",
    equipment: [
      "Mașini de tăiere și ștanțare carton",
      "Sistem de imprimare flexo/offset",
      "Linie de asamblare cutii",
      "Paletizare automată",
    ],
    metrics: [
      { label: "Segment", value: "Ambalaje" },
      { label: "Material", value: "Carton" },
      { label: "Flexibilitate", value: "Custom" },
    ],
    image: "https://img.youtube.com/vi/Jqy_Rx89lH0/maxresdefault.jpg",
    alt: "Linie de producție ambalaje carton Uzinex pentru Gold Pack Râmnicu Sărat",
    featured: true,
    youtubeId: "Jqy_Rx89lH0",
  },
  {
    id: "victoria-unic",
    client: "Victoria Unic",
    industry: "Procesare & reciclare",
    location: "Huși, România",
    year: "2025",
    title: "Concasor pentru betoane în industria de reciclare",
    excerpt:
      "Victoria Unic din Huși operează în industria de reciclare a deșeurilor din construcții. Uzinex a furnizat un concasor industrial de betoane de mare capacitate, contribuind la transformarea deșeurilor în agregate reutilizabile pentru construcții noi — în linie cu principiile economiei circulare.",
    equipment: [
      "Concasor industrial pentru beton",
      "Sistem de sortare agregate",
      "Conveyor cu banda",
      "Sistem de reducere praf",
    ],
    metrics: [
      { label: "Aplicație", value: "Reciclare" },
      { label: "Impact", value: "DNSH ✓" },
      { label: "Capacitate", value: "Mare" },
    ],
    image:
      "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=1200&q=80&auto=format&fit=crop",
    alt: "Concasor industrial de betoane Uzinex pentru Victoria Unic Huși — reciclare deșeuri construcții",
  },
  {
    id: "alin-carp",
    client: "Întreprindere Individuală Alin Carp",
    industry: "Producție & manufactură",
    location: "Botoșani, România",
    year: "2025",
    title: "Secție de tricotaje completă într-o mică afacere de familie",
    excerpt:
      "Întreprinderea Individuală Alin Carp din județul Botoșani a fost dotată de Uzinex cu o secție de tricotaje completă. Proiectul demonstrează angajamentul nostru de a sprijini și afaceri mici, nu doar corporațiile, oferind soluții industriale accesibile pentru producători locali.",
    equipment: [
      "Mașini de tricotat industriale",
      "Sistem de pregătire fire",
      "Mașini de finisare",
      "Utilaje de control calitate",
    ],
    metrics: [
      { label: "Profil", value: "Afacere familie" },
      { label: "Dotare", value: "Completă" },
      { label: "Tip", value: "Turnkey" },
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
    alt: "Secție de tricotaje completă Uzinex pentru Întreprindere Individuală Alin Carp Botoșani",
  },
  {
    id: "specat",
    client: "Specat S.R.L.",
    industry: "Procesare & reciclare",
    location: "Craiova, România",
    year: "2025",
    title: "Precurățător de cereale de mare capacitate pentru industria agro",
    excerpt:
      "Specat S.R.L. din Craiova a integrat în fluxul său de procesare un precurățător de cereale industrial livrat de Uzinex. Echipamentul îmbunătățește calitatea cerealelor înainte de procesare sau depozitare, reducând pierderile și crescând eficiența operațională.",
    equipment: [
      "Precurățător de cereale industrial",
      "Sistem de aspirație impurități",
      "Conveyor cu elevator",
      "Sistem de control automat",
    ],
    metrics: [
      { label: "Industrie", value: "Agro" },
      { label: "Funcție", value: "Precurățare" },
      { label: "Capacitate", value: "Mare" },
    ],
    image: "https://img.youtube.com/vi/sFsmEF-OOCg/hqdefault.jpg",
    alt: "Precurățător de cereale industrial Uzinex pentru Specat Craiova",
    youtubeId: "sFsmEF-OOCg",
  },
  {
    id: "magnius",
    client: "Magnius",
    industry: "Producție & manufactură",
    location: "Iași, România",
    year: "2025",
    title: "Aparat CNC de îndoit litere volumetrice pentru industria publicitară",
    excerpt:
      "Magnius, brand de referință în industria publicitară din Iași, a investit într-un aparat CNC specializat de îndoit litere volumetrice, furnizat de Uzinex. Echipamentul permite producția rapidă și precisă de litere 3D pentru firmele luminoase, signalistică și branding corporate.",
    equipment: [
      "Aparat CNC îndoit litere volumetrice",
      "Software CAD pentru design",
      "Accesorii pentru materiale diverse (aluminiu, inox, acrilic)",
    ],
    metrics: [
      { label: "Industrie", value: "Publicitate" },
      { label: "Tehnologie", value: "CNC 3D" },
      { label: "Precizie", value: "Mare" },
    ],
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&q=80&auto=format&fit=crop",
    alt: "Aparat CNC de îndoit litere volumetrice Uzinex pentru Magnius Iași — industria publicitară",
  },
  {
    id: "fier-forjat-limanu",
    client: "Fier-Forjat Limanu SRL · Jan Paul Elhor",
    industry: "Auto & metalurgie",
    location: "Limanu, Constanța",
    year: "2023",
    title: "Atelier de fier forjat semi-automatizat cu finanțare nerambursabilă Start-Up Nation",
    excerpt:
      "Un meșter în fier forjat din Limanu, cu dureri cronice de spate după un accident de pe acoperiș, construiește un atelier semi-automat de 68.000 € prin Start-Up Nation. Uzinex livrează echipamentele și pregătește dosarul de finanțare gratuit. Rezultat: ×5–6 viteză producție, +50% calitate, 1 om operează 3–4 mașini, durerile de spate eliminate.",
    equipment: [
      "Mașină îndoit fier rece A150A · Spania · CNC · platbandă 2,20m",
      "Ghilotină combinată cu pedaul · taie tablă + găurire",
      "Ciocan pneumatic 40 kg-forță",
      "Fierăstrău cu bandă · mașină găurit cu avans automat",
      "Aparate sudură MIG/MAG/TIG · forjă · freză · CNC",
    ],
    metrics: [
      { label: "Viteză producție", value: "×5–6" },
      { label: "Calitate cordoane", value: "+50%" },
      { label: "Investiție", value: "≈ 68K €" },
    ],
    image: "https://img.youtube.com/vi/bCxoVN1QgQM/maxresdefault.jpg",
    alt: "Atelier complet de fier forjat semi-automatizat Uzinex pentru Jan Paul Elhor — Fier-Forjat Limanu Constanța",
    featured: true,
    youtubeId: "bCxoVN1QgQM",
  },
  {
    id: "birou-proiectare-iasi",
    client: "Birou de proiectare drumuri",
    industry: "Energie & infrastructură",
    location: "Iași, România",
    year: "2025",
    title: "Echipare completă pentru un birou de proiectare drumuri",
    excerpt:
      "Un birou specializat în proiectarea infrastructurii rutiere din Iași a fost echipat integral de Uzinex. Proiectul a inclus stații de lucru CAD performante, plottere de format mare, echipamente de măsurare topografică și infrastructură IT dedicată — totul pentru un mediu de proiectare modern și productiv.",
    equipment: [
      "Stații de lucru CAD profesionale",
      "Plottere A0 și scanere",
      "Echipamente de măsurare topo",
      "Infrastructură IT și rețea",
    ],
    metrics: [
      { label: "Tip proiect", value: "Birotică" },
      { label: "Domeniu", value: "Infrastructură" },
      { label: "Dotare", value: "Turnkey" },
    ],
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80&auto=format&fit=crop",
    alt: "Echipare completă birou proiectare drumuri Iași — Uzinex",
  },
  {
    id: "sablare-laser-ocnele-mari",
    client: "Atelier industrial Ocnele Mari",
    industry: "Producție & manufactură",
    location: "Ocnele Mari, Vâlcea",
    year: "2025",
    title: "Echipament de sablare cu laser pentru prelucrări de precizie",
    excerpt:
      "Un atelier industrial din Ocnele Mari, județul Vâlcea, a fost dotat de Uzinex cu un echipament modern de sablare cu laser. Tehnologia permite curățare, marcare și pregătire superficială non-abrazivă, fără chimicale, ideală pentru componente tehnice, piese auto vintage și aplicații muzeale.",
    equipment: [
      "Sistem de sablare cu laser",
      "Sistem de filtrare și ventilație",
      "Cabină de lucru închisă",
      "Software de control",
    ],
    metrics: [
      { label: "Tehnologie", value: "Laser" },
      { label: "Impact mediu", value: "Zero chimicale" },
      { label: "Aplicații", value: "Multiple" },
    ],
    image: "https://img.youtube.com/vi/rmf2y9oWsdg/maxresdefault.jpg",
    alt: "Echipament sablare cu laser Uzinex pentru atelier industrial Ocnele Mari Vâlcea",
    youtubeId: "rmf2y9oWsdg",
  },
  {
    id: "ars-sudura",
    client: "ARS Industrial S.R.L.",
    industry: "Auto & metalurgie",
    location: "Ploiești, România",
    year: "2025",
    title: "Aparate de sudură cap la cap de mari dimensiuni pentru linii industriale",
    excerpt:
      "ARS Industrial S.R.L. din Ploiești a colaborat cu Uzinex pentru echiparea atelierului cu aparate de sudură cap la cap de mari dimensiuni. Soluția acoperă sudarea țevilor și profilelor industriale de diametru mare, cu calitate uniformă și repetabilitate ridicată — critice pentru aplicații în petrol-gaz, construcții și infrastructură.",
    equipment: [
      "Aparat sudură cap la cap mari dimensiuni",
      "Sistem de aliniere și clampare",
      "Unitate de control parametri",
      "Kit de siguranță și protecție",
    ],
    metrics: [
      { label: "Dimensiune", value: "Mari" },
      { label: "Aplicație", value: "Petrol-gaz" },
      { label: "Calitate", value: "Uniformă" },
    ],
    image:
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=1200&q=80&auto=format&fit=crop",
    alt: "Aparat sudură cap la cap mari dimensiuni Uzinex pentru ARS Industrial Ploiești",
  },
  {
    id: "ars-fotovoltaic",
    client: "ARS Industrial S.R.L.",
    industry: "Energie & infrastructură",
    location: "Ploiești, România",
    year: "2025",
    title: "Centrală fotovoltaică mobilă — energie autonomă pentru șantiere și aplicații tactice",
    excerpt:
      "Tot pentru ARS Industrial S.R.L., Uzinex a livrat o soluție distinctă: o centrală fotovoltaică mobilă complet autonomă, cu panouri solare integrate, sistem de stocare în baterii și invertor industrial. Aplicația permite alimentarea cu energie curată a unor șantiere izolate, evenimente mobile sau operațiuni tactice — fără dependență de rețeaua națională.",
    equipment: [
      "Panouri fotovoltaice de înaltă eficiență",
      "Sistem de stocare baterii Li-Ion",
      "Invertor industrial hibrid",
      "Structură mobilă cu remorcă",
      "Sistem de monitorizare la distanță",
    ],
    metrics: [
      { label: "Sursă", value: "Solară" },
      { label: "Autonomie", value: "Mobilă" },
      { label: "Impact", value: "Zero CO₂" },
    ],
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&q=80&auto=format&fit=crop",
    alt: "Centrală fotovoltaică mobilă Uzinex pentru ARS Industrial Ploiești — energie autonomă șantiere",
    featured: true,
  },
  {
    id: "envirotec",
    client: "Envirotec S.R.L.",
    industry: "Procesare & reciclare",
    location: "Vaslui, România",
    year: "2025",
    title: "Presă de balotat deșeuri pentru industria de reciclare",
    excerpt:
      "Envirotec S.R.L. din Vaslui operează în domeniul colectării și valorificării deșeurilor. Uzinex a livrat o presă industrială de balotat deșeuri care permite compactarea eficientă a hârtiei, cartonului, plasticului și metalelor, reducând volumul transportat și crescând rentabilitatea lanțului de reciclare.",
    equipment: [
      "Presă industrială de balotat",
      "Sistem hidraulic de mare presiune",
      "Masă de încărcare automată",
      "Sistem de legare baloți",
    ],
    metrics: [
      { label: "Tip deșeuri", value: "Mix" },
      { label: "Reducere volum", value: "Max" },
      { label: "Economie circulară", value: "DNSH ✓" },
    ],
    image:
      "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1200&q=80&auto=format&fit=crop",
    alt: "Presă de balotat deșeuri Uzinex pentru Envirotec Vaslui — industria de reciclare",
  },
  {
    id: "venus-mobila",
    client: "Fabrica de mobilă Venus",
    industry: "Logistică & depozitare",
    location: "Pitești, România",
    year: "2025",
    title: "Macara pentru manipulare plăci de PAL la o fabrică de mobilă",
    excerpt:
      "Fabrica de mobilă Venus din Pitești a implementat, cu ajutorul Uzinex, o macara industrială dedicată manipulării eficiente a plăcilor de PAL în procesul de producție. Echipamentul reduce timpul de încărcare/descărcare, elimină efortul fizic al operatorilor și crește siguranța la locul de muncă.",
    equipment: [
      "Macara industrială cu braț rotativ",
      "Sistem de prindere pentru plăci PAL",
      "Comandă electrică și manuală",
      "Sistem de siguranță CE",
    ],
    metrics: [
      { label: "Aplicație", value: "Manipulare PAL" },
      { label: "Siguranță", value: "CE certificat" },
      { label: "Productivitate", value: "Crescută" },
    ],
    image: "https://img.youtube.com/vi/KsBWTNjk1EE/hqdefault.jpg",
    alt: "Macara pentru manipulare PAL Uzinex la fabrica de mobilă Venus Pitești",
    youtubeId: "KsBWTNjk1EE",
  },
];

const INDUSTRIES: Industry[] = [
  "Toate",
  "Producție & manufactură",
  "Logistică & depozitare",
  "Energie & infrastructură",
  "Procesare & reciclare",
  "Auto & metalurgie",
  "Apărare & securitate",
];

export type CaseStudiesAllData = { items: CaseStudyAll[] };
export const CASE_STUDIES_ALL_DEFAULT: CaseStudiesAllData = { items: CASE_STUDIES };

export function CaseStudiesGallery({ data }: { data?: CaseStudiesAllData | null }) {
  const items = data?.items ?? CASE_STUDIES;
  const [filter, setFilter] = useState<Industry>("Toate");
  const [activeVideo, setActiveVideo] = useState<CaseStudyAll | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const filtered = useMemo(() => {
    if (filter === "Toate") return items;
    return items.filter((c) => c.industry === filter);
  }, [filter, items]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { Toate: items.length };
    items.forEach((c) => {
      map[c.industry] = (map[c.industry] || 0) + 1;
    });
    return map;
  }, []);

  return (
    <>
      {/* HERO — extends under the sticky header so the brand-blue bg flows behind it */}
      <section
        className="relative overflow-hidden border-b text-white -mt-[140px] pt-[140px]"
        style={{ background: "#082545", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 70% at 80% 50%, rgba(30,107,184,0.45) 0%, rgba(30,107,184,0.1) 50%, transparent 80%)",
          }}
        />
        <div className="container-x pt-10 lg:pt-14 pb-10 lg:pb-14 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 text-[10px] lg:text-[11px] uppercase tracking-[0.2em] text-white/70 mb-4 mono">
              <span className="w-6 h-px bg-white/40" />
              <span>Portofoliu de proiecte · 2024 — prezent</span>
            </div>
            <h1
              className="serif text-3xl md:text-4xl lg:text-5xl font-medium leading-[0.95] mb-4"
              style={{ letterSpacing: "-0.03em" }}
            >
              Studii de caz<br />
              <span className="font-light text-uzx-orange">livrate pentru clienții noștri.</span>
            </h1>
            <p className="text-sm lg:text-base text-ink-200 leading-relaxed max-w-2xl">
              Proiecte reale, rezultate măsurabile, clienți mulțumiți. Descoperă cum integrăm
              tehnologie industrială la cheie pentru companii din producție, logistică, energie,
              procesare, auto și apărare.
            </p>
            <div className="grid grid-cols-3 gap-4 mt-6 max-w-md">
              <div>
                <div className="serif text-2xl lg:text-3xl text-white num">{items.length}+</div>
                <div className="text-[9px] lg:text-[10px] uppercase tracking-wider text-white/60 mt-1 mono">
                  Proiecte prezentate
                </div>
              </div>
              <div>
                <div className="serif text-2xl lg:text-3xl text-white num">6</div>
                <div className="text-[9px] lg:text-[10px] uppercase tracking-wider text-white/60 mt-1 mono">
                  Industrii deservite
                </div>
              </div>
              <div>
                <div className="serif text-2xl lg:text-3xl text-white num">RO</div>
                <div className="text-[9px] lg:text-[10px] uppercase tracking-wider text-white/60 mt-1 mono">
                  Clienți din toată țara
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FILTER BAR — sticky dropdown */}
      <section className="sticky top-16 lg:top-20 z-30 border-b hairline bg-white/95 backdrop-blur">
        <div className="container-x py-3 lg:py-4 flex items-center justify-between gap-4">
          <div className="text-[11px] mono uppercase tracking-[0.2em] text-ink-400">
            {filtered.length} {filtered.length === 1 ? "proiect" : "proiecte"} afișate
          </div>

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              className="flex items-center gap-3 px-4 py-2 border hairline hover:border-uzx-blue transition text-sm text-ink-900 min-w-[220px] justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-widest text-ink-400 mono">
                  Industrie:
                </span>
                <span>{filter}</span>
              </span>
              <span
                className="text-[11px] text-ink-500 transition-transform"
                style={{ transform: dropdownOpen ? "rotate(180deg)" : "none" }}
              >
                ▾
              </span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  role="listbox"
                  className="absolute right-0 top-full mt-2 min-w-[280px] bg-white border hairline shadow-lg"
                >
                  {INDUSTRIES.map((ind) => {
                    const isActive = filter === ind;
                    return (
                      <li key={ind}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            setFilter(ind);
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition ${
                            isActive
                              ? "text-uzx-orange bg-uzx-orange/5"
                              : "text-ink-700 hover:bg-ink-50"
                          }`}
                        >
                          <span>{ind}</span>
                          <span
                            className={`text-[10px] mono num ${
                              isActive ? "text-uzx-orange" : "text-ink-400"
                            }`}
                          >
                            {counts[ind] || 0}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CASE GRID */}
      <section className="py-10 lg:py-14 bg-ink-50">
        <div className="container-x">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={filter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
            >
              {filtered.map((c, i) => (
                <motion.article
                  key={c.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="bg-white border hairline flex flex-col group hover:border-ink-300 transition"
                >
                  <button
                    type="button"
                    onClick={() => c.youtubeId && setActiveVideo(c)}
                    disabled={!c.youtubeId}
                    aria-label={c.youtubeId ? `Vezi videoclipul: ${c.title}` : c.title}
                    className="relative aspect-[16/10] overflow-hidden bg-ink-100 text-left disabled:cursor-default"
                  >
                    {c.id === "baza-nato" ? (
                      <BazaNatoTile />
                    ) : (
                      <Image
                        src={c.image}
                        alt={c.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition duration-700"
                        loading="lazy"
                      />
                    )}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          c.id === "baza-nato"
                            ? "linear-gradient(180deg, rgba(8,37,69,0) 70%, rgba(8,37,69,0.85) 100%)"
                            : "linear-gradient(180deg, rgba(8,37,69,0) 50%, rgba(8,37,69,0.85) 100%)",
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <div className="text-[9px] mono uppercase tracking-widest text-white px-2 py-0.5 bg-uzx-orange">
                        {c.industry}
                      </div>
                    </div>
                    {c.featured && (
                      <div className="absolute top-3 right-3">
                        <div className="text-[9px] mono uppercase tracking-widest text-white px-2 py-0.5 border border-white/40 backdrop-blur">
                          ★
                        </div>
                      </div>
                    )}
                    {c.youtubeId && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 bg-white/15 backdrop-blur border border-white/40 flex items-center justify-center group-hover:bg-uzx-orange group-hover:border-uzx-orange transition">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="text-[10px] mono uppercase tracking-wider opacity-85 truncate">
                        {c.client}
                      </div>
                    </div>
                  </button>

                  <div className="p-5 lg:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-[10px] mono text-ink-400 mb-3">
                      <span className="truncate">{c.location}</span>
                      <span className="text-ink-300">·</span>
                      <span className="num">{c.year}</span>
                    </div>

                    <h3
                      className="serif text-base lg:text-lg text-ink-900 leading-snug mb-3"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {c.title}
                    </h3>

                    <p className="text-xs lg:text-sm text-ink-600 leading-relaxed mb-4 line-clamp-3">
                      {c.excerpt}
                    </p>

                    {c.metrics && c.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-2 mb-4 py-3 border-y hairline">
                        {c.metrics.map((m) => (
                          <div key={m.label}>
                            <div className="serif text-sm lg:text-base text-uzx-blue num leading-tight">
                              {m.value}
                            </div>
                            <div className="text-[9px] mono text-ink-400 uppercase tracking-wider mt-0.5 leading-tight">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-2">
                      <div className="text-[10px] mono text-ink-400 uppercase tracking-wider mb-1.5">
                        Echipamente
                      </div>
                      <ul className="text-[11px] lg:text-xs text-ink-600 space-y-0.5">
                        {c.equipment.slice(0, 3).map((e) => (
                          <li key={e} className="flex gap-2">
                            <span className="text-ink-300 num shrink-0">—</span>
                            <span className="truncate">{e}</span>
                          </li>
                        ))}
                        {c.equipment.length > 3 && (
                          <li className="text-[10px] text-ink-400 pl-4">
                            +{c.equipment.length - 3} mai multe
                          </li>
                        )}
                      </ul>
                    </div>

                    {DETAIL_PAGES[c.id] && (
                      <Link
                        href={DETAIL_PAGES[c.id]}
                        className="mt-5 inline-flex items-center gap-2 text-xs text-uzx-blue hover:text-uzx-orange underline-link self-start group/cta"
                      >
                        Citește studiul complet
                        <span className="group-hover/cta:translate-x-1 transition">→</span>
                      </Link>
                    )}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-ink-500">
              Nu există studii de caz în această categorie momentan.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="border-b hairline py-10 lg:py-14 bg-white">
        <div className="container-x">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="text-[11px] uppercase tracking-[0.2em] text-uzx-orange mb-3">
                Următorul proiect
              </div>
              <h2
                className="serif text-3xl md:text-4xl lg:text-5xl text-ink-900 leading-[0.95]"
                style={{ letterSpacing: "-0.03em" }}
              >
                Construim împreună<br />
                <span className="font-light text-uzx-orange">povestea ta de succes.</span>
              </h2>
              <p className="text-ink-500 mt-6 max-w-xl">
                Indiferent de industrie, mărime sau complexitate, inginerii Uzinex sunt pregătiți
                să-ți proiecteze, livreze și pună în funcțiune soluția potrivită. Discută cu noi
                despre proiectul tău.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex flex-col gap-3">
              <a
                href="/contact"
                className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-7 py-4 inline-flex items-center justify-center gap-3 group transition"
              >
                Discută cu un inginer
                <span className="group-hover:translate-x-1 transition">→</span>
              </a>
              <a
                href="tel:+40769081081"
                className="border hairline text-ink-700 hover:border-uzx-blue hover:text-uzx-blue text-sm px-7 py-4 inline-flex items-center justify-center transition"
              >
                (+40) 769 081 081
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* YouTube lightbox */}
      <AnimatePresence>
        {activeVideo && activeVideo.youtubeId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-pointer"
            style={{ background: "rgba(5,15,30,0.92)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl cursor-default"
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Închide"
                className="absolute -top-12 right-0 text-white/70 hover:text-white text-2xl"
              >
                ✕
              </button>
              <div className="aspect-video bg-black border border-white/10">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
              <div className="mt-4 text-white">
                <div className="text-[11px] mono uppercase tracking-widest text-uzx-orange mb-2">
                  {activeVideo.client} · {activeVideo.year}
                </div>
                <div className="serif text-xl">{activeVideo.title}</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
