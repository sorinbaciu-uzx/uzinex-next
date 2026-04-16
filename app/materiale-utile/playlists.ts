/**
 * Playlists data — extracted to its own module so both the server page
 * (page.tsx for JSON-LD generation) and the client component
 * (MaterialeUtileClient.tsx for UI) can import it without
 * "use client" serialization issues.
 */

export type Video = { id: string; title: string; duration?: string };
export type Playlist = {
  key: "lean" | "stiri" | "podcast";
  title: string;
  tagline: string;
  accent: string;
  videos: Video[];
};

export const PLAYLISTS: Playlist[] = [
  {
    key: "lean",
    title: "Producție Lean",
    tagline: "Optimizare, logistică și management industrial",
    accent: "#1e6bb8",
    videos: [
      { id: "01WoOGmMnxE", title: "Cum funcționează strategia Make-to-Stock" },
      { id: "SET5ImJOVwU", title: "Cum să îmbunătățești fluxul de producție prin eliminarea Muda, Mura și Miri" },
      { id: "dyObDECnxkc", title: "Cum să transformi logistica afacerii tale cu metoda Milk Run" },
      { id: "RhWwH3r7uLs", title: "Cum să îți optimizezi managementul calității pentru rezultate excepționale" },
      { id: "QMMB7_F-zgA", title: "De ce rezolvarea problemelor nu se termină niciodată" },
      { id: "49pt1x9gI5M", title: "De la depozit la client — cum să gestionezi perfect logistica" },
      { id: "jWkyD7FkCe0", title: "De ce ai nevoie de un panou de comunicare în organizația ta" },
      { id: "gp2OMBep7G0", title: "Maximizarea eficienței în uzine — calcularea timpului de producție" },
      { id: "XQTx6U2Mb7U", title: "Cum să alegi tehnologia potrivită pentru afacerea ta" },
      { id: "NGqCm-7sBG8", title: "Cum să crești eficiența în producție — secretul japonez al Heijunka" },
      { id: "TtS03Wr73oQ", title: "Cum să eviți stocurile excedentare cu prognoza cererii eficientă" },
      { id: "DrUqfuHCJSQ", title: "Cum să îți aliniezi echipa și să atingi scopuri ambițioase cu OKR-uri" },
      { id: "IvIglm4RPqs", title: "Cum să îți optimizezi procesul de producție — eficiența reală explicată" },
      { id: "ncg88gVYF2w", title: "Cum să îți transformi fabrica într-un model de eficiență — activități adăugătoare de valoare" },
      { id: "W8Zlo60f3vI", title: "Cum să realizezi o analiză SWOT eficientă pentru succesul afacerii tale" },
      { id: "NvCvOlDlpwA", title: "Cum să transformi proiectele de construcții cu metodologia Lean" },
      { id: "8jh8jm9pEsU", title: "De ce eficiența producției tale contează — îmbunătățește PCE-ul acum" },
      { id: "Ju2CpDq2UlE", title: "De ce Toyota Kata este cheia succesului în Lean Manufacturing" },
      { id: "0plQwICsJ-0", title: "De la Ford la Lean Manufacturing — transformarea industriei moderne" },
      { id: "AW5klcoIxAk", title: "De la haos la eficiență — beneficiile managementului vizual în producție" },
      { id: "Q_njGwx6X_I", title: "De la idee la produs — cum metoda 3P îți poate schimba afacerea" },
      { id: "7cNMeGOChEw", title: "De la teorie la practică — implementarea Six Sigma în fabrica ta" },
      { id: "7v5ZqKkn3PA", title: "Descoperă secretul gestionării ratei de blocaj în producția Lean" },
      { id: "uiF8gdsP5KY", title: "Eficientizează-ți operațiunile cu plimbările Gemba" },
      { id: "879JeeNKc9w", title: "EPEX — cheia pentru a minimiza stocurile și pierderile în producție" },
      { id: "mZS_BzbVZO0", title: "Ești gata să previi problemele industriale încă de la rădăcină — tehnica celor 5 De ce" },
      { id: "s1GkXFqdnDI", title: "FIFO — cel mai eficient mod de a gestiona stocurile în fabrică" },
      { id: "w-xZ0EFWm1A", title: "Găsește și rezolvă problema reală din fabrica ta cu RCA" },
      { id: "z4Yujh6UzOQ", title: "Productivitatea în afaceri — cum să faci mai mult cu resurse limitate" },
      { id: "d8TFRkKKw58", title: "Revoluția în producție — ce este Kaikaku și cum poate schimba totul" },
      { id: "avulbXhQAB8", title: "Rolul crucial al managerului logistic — cum fac diferența în afaceri" },
      { id: "euzAgdWkNyA", title: "Secretul producției personalizate — descoperă Make-to-Order" },
      { id: "4ErGc4KkoKk", title: "Strategii eficiente pentru gestionarea costurilor de inventar" },
      { id: "-CHpkbVmSI0", title: "Strategii eficiente pentru planificarea capacității în producția Lean" },
      { id: "U9d0Y8V62lw", title: "Tabla Kamishibai — instrumentul japonez care revoluționează managementul sarcinilor" },
      { id: "NYG2eGmX1k4", title: "Transformă-ți producția — tehnici avansate de management al capacității" },
      { id: "2I73pztafCo", title: "VMI — strategia care îți optimizează lanțul de aprovizionare și crește profitul" },
      { id: "MbW5ncPJFEY", title: "Ce este eficiența echipamentelor și cum se calculează" },
      { id: "CLJb3g8rVhQ", title: "Criticitatea activelor — un concept esențial în managementul operațiunilor" },
      { id: "bbHdu_Zn7Vo", title: "Cum faci întreținerea preventivă la echipamentele din fabrică" },
      { id: "E6Y6yxReFTg", title: "Întreținerea reactivă — să lași echipamentele să funcționeze până se strică" },
    ],
  },
  {
    key: "stiri",
    title: "Știri industriale",
    tagline: "Episoade săptămânale cu Sorin Baciu și Cristian Munthiu",
    accent: "#f5851f",
    videos: [
      { id: "6NFRA8-iVmc", title: "Știrile industriale cu UzineX — episodul pilot" },
      { id: "QhG459JWL_U", title: "Știri industriale cu Sorin Baciu și Cristian Munthiu" },
      { id: "RRzjXeia8nM", title: "Știri industriale cu Cristian Munthiu — episodul 2" },
      { id: "Sao06JRPHjQ", title: "Știri industriale cu Cristian Munthiu — episodul 3" },
    ],
  },
  {
    key: "podcast",
    title: "Podcast industrial",
    tagline: "Interviuri cu experți, antreprenori și lideri de industrie",
    accent: "#2f855a",
    videos: [
      { id: "mrA-PYYM7tc", title: "Automatizări industriale și viitorul mecatronicii — cu Bogdan Anușca" },
      { id: "jenyQ6WNDAQ", title: "Cum să construiești un business durabil — cu Dumitru Rascanu" },
      { id: "PDVzf8KwJSo", title: "Podcast cu Paul Butnariu, Președintele CCI Iași — provocări și oportunități pentru antreprenori" },
    ],
  },
];
