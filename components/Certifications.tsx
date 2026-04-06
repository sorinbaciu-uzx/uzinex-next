"use client";

import { motion } from "motion/react";

const CERTS = ["ISO 9001", "ISO 14001", "CE Mark", "EN 1090", "Hardox® Wearparts", "SSAB Partner", "EBRD", "PNRR"];
const BRANDS = ["Caterpillar", "Komatsu", "Volvo CE", "Hitachi", "JCB", "Liebherr", "Case", "Doosan", "Hyundai CE", "Bobcat"];

export function Certifications() {
  return (
    <section className="border-b hairline py-14 lg:py-16">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-4">— Recunoaștere</div>
            <h2 className="serif text-3xl md:text-4xl text-ink-900 leading-tight" style={{ letterSpacing: "-0.04em" }}>
              Certificări și<br />parteneri industriali.
            </h2>
            <p className="text-ink-500 mt-6 leading-relaxed">
              Lucrăm conform celor mai stricte standarde europene și suntem furnizori oficiali pentru cele mai
              importante grupuri din construcții.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-200">
              {CERTS.map((c) => (
                <div key={c} className="bg-white p-8 flex items-center justify-center serif text-xl text-ink-700">
                  {c}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 pt-12 border-t hairline">
          <div className="text-center text-xs uppercase tracking-[0.2em] text-ink-400 mb-10">
            Compatibili cu utilaje de la
          </div>
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-16"
              style={{ width: "max-content" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <span key={i} className="serif text-2xl text-ink-300 whitespace-nowrap">
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
