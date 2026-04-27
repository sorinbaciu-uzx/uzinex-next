"use client";

import { useState } from "react";
import type { ProductSpec, SpecIcon as SpecIconKey } from "@/lib/product-specs";
import { SpecIcon } from "@/app/produs/[slug]/SpecIcon";

const ICON_OPTIONS: SpecIconKey[] = [
  "dimensions",
  "weight",
  "power",
  "voltage",
  "battery",
  "capacity",
  "speed",
  "temperature",
  "certification",
  "material",
  "control",
  "axis",
  "diameter",
  "travel",
  "tools",
  "config",
  "output",
  "consumption",
  "rpm",
  "precision",
  "protection",
  "default",
  "lathe",
  "cnc",
  "shredder",
  "crusher",
  "excavator",
  "bucket",
  "shears",
  "claw",
  "pipe",
  "camera",
  "laser",
  "wood",
  "pump",
  "conveyor",
  "wrap",
  "label",
  "box",
];

const ICON_LABELS: Record<SpecIconKey, string> = {
  dimensions: "Dimensiuni",
  weight: "Greutate",
  power: "Putere",
  voltage: "Tensiune",
  battery: "Autonomie",
  capacity: "Capacitate",
  speed: "Viteză",
  temperature: "Temperatură",
  certification: "Certificare",
  material: "Material",
  control: "Controler",
  axis: "Axe",
  diameter: "Diametru",
  travel: "Cursă",
  tools: "Scule",
  config: "Configurare",
  output: "Productivitate",
  consumption: "Consum",
  rpm: "RPM",
  precision: "Precizie",
  protection: "Protecție",
  default: "Generic",
  lathe: "Strung",
  cnc: "CNC",
  shredder: "Tocător",
  crusher: "Concasor",
  excavator: "Excavator",
  bucket: "Cupă",
  shears: "Foarfecă",
  claw: "Graifer",
  pipe: "Conductă",
  camera: "Cameră inspecție",
  laser: "Laser",
  wood: "Lemn",
  pump: "Pompă",
  conveyor: "Bandă transportoare",
  wrap: "Folie ambalare",
  label: "Etichetă",
  box: "Cutie",
};

/**
 * Editor pentru cele 4 specs afișate în hero-ul paginii de produs.
 * Dacă nu editezi, sistem folosește extracția automată din descriptionBlocks.
 */
export function ProductSpecsEditor({
  autoExtracted,
  value,
  onChange,
}: {
  autoExtracted: ProductSpec[];
  value: ProductSpec[] | undefined;
  onChange: (specs: ProductSpec[] | undefined) => void;
}) {
  const [editing, setEditing] = useState(
    value !== undefined && value.length > 0
  );

  // Current specs — either override or auto
  const currentSpecs = editing ? value || [] : autoExtracted;

  function updateSpec(index: number, partial: Partial<ProductSpec>) {
    const base = value && value.length > 0 ? value : autoExtracted;
    const next = Array.from({ length: 4 }, (_, i) => ({
      icon: (base[i]?.icon || "default") as SpecIconKey,
      title: base[i]?.title || "",
      value: base[i]?.value || "",
      ...(i === index ? partial : {}),
    }));
    onChange(next.filter((s) => s.title || s.value));
  }

  function startEditing() {
    setEditing(true);
    // Initialize with auto-extracted if no value yet
    if (!value || value.length === 0) {
      onChange(autoExtracted);
    }
  }

  function resetToAuto() {
    if (
      !confirm(
        "Ștergi override-ul manual și revii la specs auto-extrase din tabel?"
      )
    )
      return;
    setEditing(false);
    onChange(undefined);
  }

  return (
    <div className="bg-white border hairline p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <label className="text-[11px] uppercase tracking-wider text-uzx-orange font-mono font-semibold">
            Specs hero (4 iconițe vizibile pe pagina produs)
          </label>
          <div className="text-xs text-ink-500 mt-1">
            {editing
              ? "Mode: override manual — tu decizi ce apare"
              : `Mode: auto-extragere din tabel (${autoExtracted.length} detectate)`}
          </div>
        </div>
        {editing ? (
          <button
            type="button"
            onClick={resetToAuto}
            className="text-xs border hairline bg-white px-3 py-1.5 hover:bg-ink-50 transition text-red-600"
          >
            ↺ Revine la auto
          </button>
        ) : (
          <button
            type="button"
            onClick={startEditing}
            className="text-xs border hairline bg-white px-3 py-1.5 hover:bg-ink-50 transition"
          >
            ✎ Override manual
          </button>
        )}
      </div>

      {/* Preview */}
      {currentSpecs.length === 0 ? (
        <div className="bg-ink-50 border hairline p-4 text-xs text-ink-500 text-center">
          Niciun spec detectat. Descrierea produsului nu are tabel, sau toate
          rândurile sunt generice. Click "Override manual" pentru a seta
          manual.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => {
            const spec = currentSpecs[i];
            const isEmpty = !spec;
            return (
              <div
                key={i}
                className={
                  "border hairline bg-white p-3 " +
                  (isEmpty ? "opacity-40" : "")
                }
              >
                {editing ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="shrink-0 text-uzx-blue">
                        <SpecIcon
                          icon={(spec?.icon || "default") as SpecIconKey}
                        />
                      </div>
                      <select
                        value={spec?.icon || "default"}
                        onChange={(e) =>
                          updateSpec(i, {
                            icon: e.target.value as SpecIconKey,
                          })
                        }
                        className="flex-1 text-xs border hairline px-2 py-1 bg-white focus:outline-none focus:border-uzx-blue"
                      >
                        {ICON_OPTIONS.map((key) => (
                          <option key={key} value={key}>
                            {ICON_LABELS[key]} ({key})
                          </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="text"
                      value={spec?.title || ""}
                      onChange={(e) => updateSpec(i, { title: e.target.value })}
                      placeholder="Titlu (ex: Putere motor)"
                      className="w-full text-xs border hairline px-2 py-1.5 bg-white focus:outline-none focus:border-uzx-blue"
                    />
                    <input
                      type="text"
                      value={spec?.value || ""}
                      onChange={(e) => updateSpec(i, { value: e.target.value })}
                      placeholder="Valoare (ex: 5.5 kW)"
                      className="w-full text-xs border hairline px-2 py-1.5 bg-white focus:outline-none focus:border-uzx-blue font-medium text-ink-900"
                    />
                  </div>
                ) : (
                  <div className="flex items-start gap-2">
                    <div className="shrink-0 text-uzx-blue mt-0.5">
                      <SpecIcon icon={(spec?.icon || "default") as SpecIconKey} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-ink-400 font-mono">
                        {spec?.title || "(gol)"}
                      </div>
                      <div className="text-sm text-ink-900 font-medium mt-0.5">
                        {spec?.value || "—"}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="bg-ink-50 border hairline p-3 text-[11px] text-ink-500 leading-relaxed">
        <b>Cum funcționează:</b> Sistemul extrage automat 4 specs tehnice din
        tabelul de specificații al produsului (ex: Putere, Dimensiuni, Cursă).
        Dacă extragerea e greșită sau vrei alte specs, apasă "Override manual"
        și le editezi direct. Iconița se alege automat pe bază de titlu, sau
        poți selecta tu din listă.
      </div>
    </div>
  );
}
