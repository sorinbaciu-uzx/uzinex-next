import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica privind egalitatea de șanse — Uzinex",
  description:
    "Angajamentul Uzinex pentru egalitate de șanse, diversitate și incluziune la locul de muncă, în relațiile comerciale și în comunitatea industrială.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica privind egalitatea de șanse"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Declarație de angajament",
          body: "GW LASER TECHNOLOGY S.R.L., denumită în continuare Uzinex, promovează în mod activ egalitatea de șanse, tratamentul echitabil, diversitatea și incluziunea în toate activitățile sale. Credem ferm că diversitatea este un atu strategic care îmbunătățește performanța organizațională, stimulează inovația, îmbogățește cultura companiei și răspunde mai bine cerințelor unei piețe globale. Această politică exprimă angajamentul nostru de a crea un mediu de muncă în care fiecare persoană este respectată, valorizată și are șanse egale de dezvoltare profesională, indiferent de caracteristicile personale.",
        },
        {
          title: "Cadru legal și referințe internaționale",
          body: "Politica Uzinex se bazează pe următoarele instrumente legale și standarde internaționale: Constituția României (Art. 4 — egalitatea în drepturi); Codul Muncii Român (Legea 53/2003), în special Art. 5 privind principiul egalității de tratament; Ordonanța de Guvern 137/2000 privind prevenirea și sancționarea tuturor formelor de discriminare; Legea 202/2002 privind egalitatea de șanse și de tratament între femei și bărbați; Legea 448/2006 privind protecția și promovarea drepturilor persoanelor cu handicap; Directiva UE 2000/43 privind egalitatea de tratament indiferent de rasă sau origine etnică; Directiva UE 2000/78 privind egalitatea de tratament în muncă și ocupare; Directiva UE 2006/54 privind egalitatea de șanse între bărbați și femei; Convenția OIM nr. 111 privind discriminarea în muncă și ocupare; Convenția ONU privind drepturile persoanelor cu dizabilități (ratificată de România prin Legea 221/2010).",
        },
        {
          title: "Principii fundamentale",
          body: [
            "Demnitatea umană — fiecare persoană are dreptul la respect, fără discriminare sau prejudecăți.",
            "Meritocrație — deciziile privind recrutarea, promovarea și remunerarea sunt bazate exclusiv pe competențe, experiență, performanță și potențial.",
            "Transparență — criteriile, procedurile și deciziile sunt clare, comunicate și aplicabile în mod uniform.",
            "Incluziune — creăm un mediu în care toată lumea se simte binevenită, respectată și valorizată.",
            "Responsabilitate — fiecare manager și angajat își asumă respectarea acestei politici în activitatea zilnică.",
            "Îmbunătățire continuă — evaluăm periodic practicile noastre și le ajustăm pentru a promova tot mai bine egalitatea de șanse.",
          ],
        },
        {
          title: "Criterii protejate împotriva discriminării",
          body: "Uzinex interzice categoric orice formă de discriminare directă sau indirectă, hărțuire, tratament inegal sau comportament abuziv bazat pe: (1) sex, identitate de gen sau orientare sexuală; (2) vârstă; (3) rasă, etnie, naționalitate sau origine socială; (4) religie, convingeri sau apartenență la o confesiune religioasă; (5) dizabilitate fizică, senzorială sau mentală; (6) stare civilă sau situație familială (inclusiv statutul de părinte, sarcină, concediu maternal/paternal); (7) statut socio-economic; (8) opinii politice sau filosofice; (9) apartenență sindicală sau activitate sindicală; (10) limbă vorbită; (11) boli cronice sau stare medicală; (12) caracteristici genetice; (13) orice alt criteriu neobiectiv și nelegitim legat de activitatea profesională.",
        },
        {
          title: "Domenii de aplicare concretă",
          body: [
            "Recrutarea — anunțurile sunt formulate neutru, fără criterii discriminatorii, iar evaluarea candidaților se bazează pe competențe, experiență și potrivirea cu postul. Nu solicitam informații personale nerelevante pentru activitatea profesională.",
            "Selecția — procesul de selecție este standardizat, documentat și transparent. Interviurile urmează ghiduri predefinite pentru a asigura obiectivitatea.",
            "Angajarea — contractele și condițiile de muncă sunt identice pentru poziții similare, fără diferențiere pe criterii neprofesionale.",
            "Remunerarea — principiul la muncă egală, salariu egal este aplicat strict. Sistemul de remunerare este transparent și bazat pe grile obiective, experiență, performanță și complexitate.",
            "Promovarea — oportunitățile de avansare sunt comunicate intern, deschise tuturor angajaților calificați, iar selecția este bazată pe meritele demonstrate.",
            "Formarea profesională — toți angajații au acces egal la programe de training, cursuri, certificări și dezvoltare profesională.",
            "Condițiile de muncă — programul, beneficiile, accesul la resurse și instrumente sunt distribuite echitabil.",
            "Gestionarea performanței — evaluările sunt obiective, bazate pe indicatori măsurabili și discutate transparent cu fiecare angajat.",
            "Concedierea și încetarea contractelor — deciziile se fundamentează pe cauze legale, nu pe criterii discriminatorii.",
          ],
        },
        {
          title: "Hărțuire și comportamente inacceptabile",
          body: [
            "Hărțuirea sexuală — sub orice formă, verbală, non-verbală sau fizică, este strict interzisă și sancționată ferm.",
            "Hărțuirea morală (mobbing) — comportamente repetate care umilesc, intimidează sau izolează un angajat sunt inacceptabile.",
            "Discriminarea verbală — glume, comentarii, remarci bazate pe criterii protejate sunt interzise.",
            "Violența fizică sau verbală — tolerăm zero violență la locul de muncă.",
            "Retaliere — este strict interzis să se ia măsuri represive împotriva unei persoane care a raportat un caz de discriminare sau hărțuire.",
          ],
        },
        {
          title: "Măsuri de promovare activă a diversității",
          body: [
            "Promovăm recrutarea echilibrată între sexe în sectorul tehnic/industrial, tradițional dominat de bărbați.",
            "Sprijinim femeile în poziții de conducere și în roluri tehnice STEM (science, technology, engineering, mathematics).",
            "Oferim programe de mentorat pentru tineri angajați și noi veniți.",
            "Colaborăm cu organizații și inițiative care promovează diversitatea în industria tehnică (Women in Tech, Women in Engineering).",
            "Asigurăm accesibilitatea fizică a birourilor și a platformelor digitale pentru persoanele cu dizabilități.",
            "Adaptăm programul și condițiile de muncă pentru părinți (flexibilitate, work-from-home, program redus la revenirea din concediu maternal/paternal).",
            "Organizăm sesiuni de conștientizare privind bias-urile inconștiente și stereotipurile.",
          ],
        },
        {
          title: "Relația cu clienții, furnizorii și partenerii",
          body: "Principiile egalității de șanse se extind și asupra relațiilor comerciale. Uzinex: (1) tratează toți clienții cu aceeași considerație și profesionalism, indiferent de mărimea afacerii, regiunea geografică sau caracteristicile personale ale reprezentanților acestora; (2) selectează furnizorii și partenerii pe baza criteriilor obiective de calitate, preț, livrare și fiabilitate, fără favoritisme; (3) refuză să participe la practici discriminatorii solicitate de terți; (4) promovează standarde similare în lanțul de aprovizionare, încurajând furnizorii să adopte politici proprii de egalitate.",
        },
        {
          title: "Procedura de raportare a incidentelor",
          body: "Orice angajat, colaborator, partener comercial sau altă persoană care consideră că a fost supusă unor acte de discriminare, hărțuire sau tratament inegal în legătură cu Uzinex are dreptul și este încurajat(ă) să raporteze situația. Procedura de raportare: (1) Raportare informală — direct către managerul direct sau către departamentul de resurse umane, pentru situații care pot fi rezolvate prin dialog; (2) Raportare formală — prin email la info@uzinex.ro (cu subiectul [EGALITATE SANSE]) sau în scris la sediul companiei; (3) Toate sesizările sunt tratate confidențial și investigate prompt de o echipă independentă; (4) Sesizatorul primește confirmarea primirii în maxim 48 de ore și feedback privind concluzia investigației în maxim 30 de zile; (5) Măsurile corective pot include: instruire suplimentară, mutare de post, sancțiune disciplinară, concediere pentru abateri grave, plângere penală în cazuri extreme; (6) Uzinex garantează protecția sesizatorului împotriva oricăror represalii.",
        },
        {
          title: "Formare și sensibilizare",
          body: "Uzinex investește în formarea continuă a angajaților privind egalitatea de șanse, prin: cursuri obligatorii pentru toți noii angajați în perioada de onboarding, sesiuni anuale de actualizare pentru toți angajații, training dedicat managerilor privind bias-urile inconștiente și gestionarea echipelor diverse, workshop-uri tematice pentru ocazii speciale (Ziua Internațională a Femeii, Ziua Internațională a Persoanelor cu Dizabilități, luna mândriei LGBT+). Materialele de training sunt actualizate periodic cu exemple concrete și cele mai recente practici.",
        },
        {
          title: "Monitorizare și raportare",
          body: "Uzinex monitorizează aplicarea acestei politici prin: (1) indicatori cantitativi — procentul de femei în poziții de conducere, diversitatea demografică a echipei, rata de angajare a persoanelor cu dizabilități, disparitatea salarială pe sex (gender pay gap); (2) indicatori calitativi — sondaje de satisfacție a angajaților, numărul și natura sesizărilor primite, feedback din interviurile de ieșire; (3) raport anual de diversitate și incluziune publicat intern și disponibil la cerere partenerilor comerciali; (4) audit extern periodic pentru verificarea conformității cu standardele internaționale (GRI, SDGs, ESG).",
        },
      ]}
    />
  );
}
