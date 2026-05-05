import type { Metadata } from "next";
import CariereClient from "./CariereClient";
import { jobPostingSchema, collectionPageSchema, breadcrumbSchema } from "@/lib/seo";

// JobPosting schemas, 12 open roles. Kept minimal here (title + summary + location)
// for SEO purposes; the rich UI detail lives in CariereClient.
const JOBS = [
  { title: "Inginer proiectant CNC & laser", tags: "SolidWorks, G-code, CAM, Fanuc, Siemens", location: "Iași" },
  { title: "Inginer automatizări & PLC", tags: "Siemens TIA, Beckhoff, Ladder, SCADA", location: "Iași" },
  { title: "Inginer robotică industrială", tags: "Fanuc, ABB RobotStudio, Cobots UR, Vision", location: "Iași" },
  { title: "Inginer punere în funcțiune (commissioning)", tags: "CNC, laser, training operatori", location: "Iași" },
  { title: "Inginer mentenanță & service", tags: "Diagnoză hardware, hidraulică, pneumatică", location: "Iași" },
  { title: "Inginer vânzări tehnice B2B/B2G", tags: "SEAP, SICAP, CAEN, proforme", location: "București sau Iași" },
  { title: "Specialist IIoT & edge computing", tags: "MQTT, Node-RED, Modbus, OPC UA", location: "Iași" },
  { title: "Specialist MES & digitalizare producție", tags: "Ignition, SQL, KPI producție, Industry 4.0", location: "Iași" },
  { title: "Data engineer industrial", tags: "Python, PostgreSQL, Grafana, time-series", location: "Iași" },
  { title: "AI/ML engineer, vision industrial", tags: "OpenCV, YOLO, PyTorch, Edge inference", location: "Iași" },
  { title: "Software engineer (full-stack)", tags: "Next.js, TypeScript, Prisma, PostgreSQL", location: "Iași" },
  { title: "DevOps & cloud industrial", tags: "Docker, Kubernetes, Linux, CI/CD", location: "Remote România" },
];

export const metadata: Metadata = {
  title: "Cariere, Ingineri & specialiști digitalizare",
  description:
    "Alătură-te echipei Uzinex din Iași. 12 poziții deschise pentru ingineri (CNC, automatizări, robotică, service) și specialiști digitalizare (IIoT, MES, AI vision, full-stack). Mentorat, AI frontier zi de zi, pachet transparent.",
  alternates: { canonical: "/cariere" },
  openGraph: {
    title: "Cariere Uzinex, Ingineri & specialiști digitalizare",
    description:
      "12 poziții deschise. Ingineri CNC/laser/robotică + specialiști digitalizare (IIoT, MES, AI). Parc Tehnopolis Iași. Acceptăm studenți pentru practică.",
    url: "/cariere",
    type: "website",
  },
  keywords: [
    "cariere Uzinex",
    "inginer automatizări",
    "inginer robotică",
    "specialist IIoT",
    "job Iași",
    "practică studenți",
    "internship",
    "Industry 4.0",
  ],
};

export default function Page() {
  const jobs = jobPostingSchema(
    JOBS.map((j) => ({
      title: j.title,
      description: `${j.title} la Uzinex. Stack tehnic: ${j.tags}. Lucrezi cu cele mai avansate sisteme AI de pe planetă în fluxul tău de ofertare și proiectare. Parc Științific Tehnopolis Iași. Abonament medical, training internațional, pachet transparent.`,
      location: j.location,
      employmentType: "FULL_TIME",
    }))
  );
  const collection = collectionPageSchema({
    title: "Cariere la Uzinex",
    description: "12 poziții deschise pentru ingineri și specialiști digitalizare.",
    url: "/cariere",
    numItems: JOBS.length,
  });
  const crumb = breadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Cariere", url: "/cariere" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collection) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }}
      />
      {jobs.map((job, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(job) }}
        />
      ))}
      <CariereClient />
    </>
  );
}
