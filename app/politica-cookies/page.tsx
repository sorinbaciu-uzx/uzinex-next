import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de cookies — Uzinex",
  description:
    "Cum folosește site-ul uzinex.ro cookies și tehnologii similare pentru funcționare, analiză și marketing, drepturile utilizatorilor și modul de gestionare.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de cookies"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Definiție și cadru legal",
          body: "Un cookie este un fișier text de dimensiuni mici, conținând litere și cifre, care este stocat pe dispozitivul utilizatorului (computer, laptop, tabletă, smartphone) atunci când acesta vizitează un site web. Cookies-urile permit recunoașterea dispozitivului la vizite ulterioare și ajută la funcționarea corectă a site-ului, memorarea preferințelor și îmbunătățirea experienței de utilizare. Utilizarea cookies-urilor pe site-ul uzinex.ro respectă cadrul legal aplicabil: Regulamentul (UE) 2016/679 (GDPR), Directiva 2002/58/CE privind confidențialitatea în comunicațiile electronice (ePrivacy), Legea 506/2004 privind prelucrarea datelor cu caracter personal în sectorul comunicațiilor electronice și Ghidul Autorității Naționale de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP).",
        },
        {
          title: "Cine suntem",
          body: "Site-ul uzinex.ro este operat de GW LASER TECHNOLOGY S.R.L., cu sediul în Sat Rediu, Comuna Rediu, Strada Împăcării Nr. 2, județul Iași, CUI RO 49240731, J2023003903220, denumită în continuare Uzinex. Pentru întrebări privind cookies sau prelucrarea datelor personale, ne poți contacta la info@uzinex.ro.",
        },
        {
          title: "Categoriile de cookies utilizate pe uzinex.ro",
          body: [
            "Cookies strict necesare (Essential) — absolut indispensabile pentru funcționarea site-ului. Includ: cookies de sesiune pentru navigare, cookies pentru securitate (protecție CSRF, prevenire atacuri), cookies pentru funcționalitatea formularelor de contact, cookies pentru reținerea preferinței privind consimțământul cookies. Aceste cookies nu necesită consimțământ, fiind considerate indispensabile conform Articolului 5(3) din Directiva ePrivacy.",
            "Cookies de performanță și analiză (Analytics) — ne ajută să înțelegem modul în care vizitatorii interacționează cu site-ul: paginile cele mai vizitate, timpul petrecut, sursele de trafic, dispozitivele utilizate, eventualele erori. Folosim servicii precum Vercel Analytics sau Google Analytics pentru aceste scopuri. Datele sunt de obicei agregate și anonimizate.",
            "Cookies de funcționalitate (Functional) — rețin preferințele utilizatorului: limba aleasă (română sau engleză), regiunea, setările de afișare, preferințele privind videoclipurile embed. Îmbunătățesc experiența personalizată fără a urmări activitatea în scop comercial.",
            "Cookies de marketing și publicitate (Marketing) — utilizate exclusiv cu acordul tău expres pentru campanii de remarketing, măsurarea eficienței reclamelor și personalizarea ofertelor. Pot fi plasate de rețele terțe precum Google Ads, LinkedIn Insight Tag, Meta Pixel etc.",
            "Cookies terțe (Third-party) — plasate de servicii integrate în site, cum ar fi YouTube (pentru videoclipurile din Galeria Video), hărți Google, widget-uri sociale. Fiecare furnizor are propria politică de cookies, pe care te invităm să o consulți.",
          ],
        },
        {
          title: "Lista detaliată a cookies-urilor",
          body: [
            "_vercel_analytics — cookie de performanță, durată 1 an, scop: măsurare trafic și Core Web Vitals prin Vercel Analytics, anonimizat.",
            "uzinex_consent — cookie strict necesar, durată 6 luni, scop: reținerea deciziei utilizatorului privind consimțământul pentru cookies non-esențiale.",
            "uzinex_locale — cookie funcțional, durată 1 an, scop: reținerea limbii preferate (RO/EN).",
            "YouTube (VISITOR_INFO1_LIVE, YSC, PREF, CONSENT) — cookies terțe plasate de YouTube la vizualizarea videoclipurilor embed din Galeria Video.",
            "Google Fonts — nu plasează cookies, dar poate înregistra adresa IP pentru statistici de utilizare a fonturilor.",
          ],
        },
        {
          title: "Baza legală pentru utilizarea cookies",
          body: "Pentru cookies strict necesare, temeiul legal este interesul legitim al Uzinex de a asigura funcționarea corectă și securitatea site-ului (Art. 6(1)(f) GDPR), fără a fi necesar consimțământul utilizatorului, conform excepțiilor din Directiva ePrivacy. Pentru toate celelalte cookies (performanță, funcționalitate, marketing), temeiul legal este consimțământul expres al utilizatorului (Art. 6(1)(a) GDPR), obținut printr-un banner de cookies afișat la prima vizită.",
        },
        {
          title: "Bannerul de consimțământ",
          body: "La prima vizită pe uzinex.ro, utilizatorul vede un banner care îi permite să: (1) accepte toate cookies-urile; (2) respingă toate cookies-urile non-esențiale; (3) personalizeze alegerea pe categorii (performanță, funcționalitate, marketing). Preferința este stocată într-un cookie propriu (uzinex_consent) și poate fi modificată oricând prin accesarea link-ului Setări cookies din footer-ul site-ului. Respingerea cookies-urilor non-esențiale nu afectează funcționarea principală a site-ului, dar poate limita anumite caracteristici personalizate.",
        },
        {
          title: "Cum să gestionezi cookies-urile din browser",
          body: [
            "Google Chrome: Setări → Confidențialitate și securitate → Cookies și alte date ale site-urilor.",
            "Mozilla Firefox: Opțiuni → Confidențialitate & Securitate → Cookies și date site.",
            "Safari (macOS): Preferințe → Confidențialitate → Gestionare date site.",
            "Microsoft Edge: Setări → Cookies și permisiuni site.",
            "Poți bloca, accepta selectiv sau șterge cookies existente. Atenție: blocarea cookies-urilor strict necesare poate face ca site-ul să nu funcționeze corect.",
            "Poți activa Modul privat sau Navigare InPrivate care șterge automat cookies la închiderea browser-ului.",
          ],
        },
        {
          title: "Durata de viață a cookies-urilor",
          body: "Cookies-urile se împart în două categorii după durata de viață: (1) Cookies de sesiune (session cookies) — sunt șterse automat la închiderea browser-ului; folosite pentru navigare temporară, securitate, formulare. (2) Cookies persistente (persistent cookies) — rămân pe dispozitiv pentru o perioadă stabilită (de la câteva ore la maxim 24 de luni); folosite pentru preferințe, analiză, marketing. Uzinex nu utilizează cookies cu durată de viață nejustificat de lungă și revizuiește periodic durata fiecărui cookie pentru conformitate cu principiul minimizării din GDPR.",
        },
        {
          title: "Transferuri internaționale",
          body: "Unele cookies terțe pot transmite date către furnizori din afara Spațiului Economic European (de exemplu, servere YouTube operate de Google LLC în SUA). Aceste transferuri sunt protejate prin mecanisme conforme GDPR: Clauze Contractuale Standard, Data Privacy Framework UE-SUA sau alte garanții adecvate. Îți recomandăm să consulți politicile de confidențialitate ale furnizorilor terți pentru detalii.",
        },
        {
          title: "Drepturile tale",
          body: [
            "Dreptul de a-ți retrage consimțământul oricând, prin bannerul de cookies sau prin setările browser-ului.",
            "Dreptul de acces la datele personale colectate prin cookies.",
            "Dreptul de a solicita ștergerea datelor.",
            "Dreptul de a te opune prelucrării bazate pe interes legitim (pentru cookies-urile care nu necesită consimțământ).",
            "Dreptul de a depune o plângere la ANSPDCP dacă ai suspiciuni privind utilizarea cookies-urilor.",
          ],
        },
        {
          title: "Actualizări ale politicii de cookies",
          body: "Această politică poate fi actualizată periodic pentru a reflecta schimbări în tehnologiile utilizate, legislația aplicabilă sau practicile noastre. Data ultimei actualizări este indicată la începutul documentului. Îți recomandăm să consulți periodic această pagină pentru a fi la curent cu eventualele modificări.",
        },
      ]}
    />
  );
}
