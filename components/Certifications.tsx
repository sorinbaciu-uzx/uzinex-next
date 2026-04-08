"use client";

import { motion } from "motion/react";

export type CertificationsData = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  certs: string[];
  brandsTitle: string;
  brands: string[];
};

const CERTS = [
  "ISO 9001",
  "ISO 14001",
  "Marcaj CE",
  "EN 1090",
  "DNSH",
  "PNRR",
  "EBRD",
  "Manuale AI",
];
const BRANDS = [
  "Siemens",
  "Mitsubishi Electric",
  "Schneider Electric",
  "ABB",
  "Samsung",
  "Panasonic",
  "Omron",
  "Yaskawa",
  "WEG",
  "Fanuc",
  "Bosch Rexroth",
  "Festo",
  "SMC",
  "Rockwell Automation",
  "Allen-Bradley",
  "Danfoss",
  "SEW-Eurodrive",
];

export const CERTIFICATIONS_DEFAULT: CertificationsData = {
  eyebrow: "— Conformitate",
  titleLine1: "Certificat, eligibil,",
  titleLine2: "sustenabil.",
  description:
    "Toate echipamentele livrate respectă standardele europene de calitate și principiul DNSH, sunt eligibile pentru achiziții cu fonduri UE și PNRR și includ manuale interactive cu inteligență artificială pentru exploatare, mentenanță și training-ul operatorilor.",
  certs: CERTS,
  brandsTitle: "Componente cheie de la",
  brands: BRANDS,
};

export function Certifications({ data }: { data?: CertificationsData | null }) {
  const d = data ?? CERTIFICATIONS_DEFAULT;
  return (
    <section className="border-b hairline py-10 lg:py-12">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-4">{d.eyebrow}</div>
            <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-tight" style={{ letterSpacing: "-0.04em" }}>
              {d.titleLine1}<br />{d.titleLine2}
            </h2>
            <p className="text-ink-500 mt-6 leading-relaxed">
              {d.description}
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-200">
              {d.certs.map((c) => (
                <div key={c} className="bg-white p-8 flex items-center justify-center serif text-xl text-ink-700">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t hairline">
          <div className="text-center text-xs uppercase tracking-[0.2em] text-ink-400 mb-10">
            {d.brandsTitle}
          </div>
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-16"
              style={{ width: "max-content" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[...d.brands, ...d.brands].map((b, i) => (
                <span key={i} className="serif text-2xl text-ink-400 whitespace-nowrap">
                  {b}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
