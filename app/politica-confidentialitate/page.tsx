import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Politica de confidențialitate — Uzinex",
  description:
    "Politica de confidențialitate Uzinex (GW LASER TECHNOLOGY S.R.L.) conform GDPR — modul în care colectăm, procesăm și protejăm datele tale personale.",
};

export default function Page() {
  return (
    <LegalPage
      title="Politica de confidențialitate"
      updated="Aprilie 2026"
      sections={[
        {
          title: "Operator de date",
          body: "GW LASER TECHNOLOGY S.R.L. (denumită în continuare Uzinex), cu sediul în Sat Rediu, Comuna Rediu, Strada Împăcării Nr. 2, înregistrată la Registrul Comerțului sub J2023003903220, CUI RO 49240731, este operatorul datelor cu caracter personal colectate prin acest site web și prin relațiile comerciale cu clienții, furnizorii și partenerii săi.",
        },
        {
          title: "Date pe care le colectăm",
          body: [
            "Date de identificare: nume, prenume, denumire companie, funcție, CUI, număr de înregistrare.",
            "Date de contact: adresa de email, număr de telefon, adresa fizică de livrare și facturare.",
            "Date tehnice: specificații echipamente solicitate, istoricul proiectelor, documentație tehnică transmisă.",
            "Date de navigare: adresa IP, tipul browser-ului, paginile vizitate, durata vizitei (prin cookies).",
          ],
        },
        {
          title: "Scopul prelucrării",
          body: [
            "Furnizarea de oferte tehnice și comerciale, executarea contractelor și livrarea echipamentelor.",
            "Facturare, contabilitate și raportare fiscală către autoritățile române.",
            "Suport tehnic, mentenanță și garanție post-vânzare.",
            "Marketing direct către persoane juridice, cu acordul expres al destinatarului.",
            "Respectarea obligațiilor legale privind achizițiile publice (SEAP/SICAP) și finanțările europene.",
          ],
        },
        {
          title: "Temeiul legal",
          body: "Prelucrăm datele tale în baza executării unui contract (Art. 6(1)(b) GDPR), a obligațiilor legale (Art. 6(1)(c)), a interesului legitim (Art. 6(1)(f)) și, unde este cazul, a consimțământului expres (Art. 6(1)(a)).",
        },
        {
          title: "Drepturile tale",
          body: [
            "Dreptul de acces la datele tale personale.",
            "Dreptul de rectificare a datelor inexacte.",
            "Dreptul la ștergere (dreptul de a fi uitat).",
            "Dreptul la restricționarea prelucrării.",
            "Dreptul la portabilitatea datelor.",
            "Dreptul de opoziție și dreptul de a depune o plângere la ANSPDCP.",
          ],
        },
        {
          title: "Destinatarii datelor",
          body: "Datele pot fi transmise către parteneri de încredere (firme de curierat, servicii contabile, instituții financiare, parteneri de leasing) exclusiv în scopul executării contractelor. Nu vindem și nu partajăm date cu terți în scop de marketing fără acordul tău.",
        },
        {
          title: "Perioada de stocare",
          body: "Datele sunt păstrate pe durata relației contractuale și ulterior conform termenelor legale de arhivare (minim 10 ani pentru documente financiare și fiscale, conform legislației românești).",
        },
        {
          title: "Securitate",
          body: "Implementăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor personale împotriva accesului neautorizat, pierderii, alterării sau distrugerii, inclusiv criptare, controale de acces și audit regulat.",
        },
      ]}
    />
  );
}
