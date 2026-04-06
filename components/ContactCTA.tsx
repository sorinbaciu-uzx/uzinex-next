export function ContactCTA() {
  return (
    <section id="contact" className="border-b hairline py-24 lg:py-32">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-4">05 / Contact</div>
          <h2 className="serif text-5xl md:text-6xl lg:text-7xl text-ink-900 leading-[0.92]" style={{ letterSpacing: "-0.04em" }}>
            Construim împreună<br />
            următorul tău <span className="font-light text-uzx-orange">proiect.</span>
          </h2>
          <p className="text-ink-500 text-lg max-w-xl mt-8 leading-relaxed">
            Contactează echipa noastră și primești o ofertă personalizată în maxim 24 de ore lucrătoare.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9 space-y-8">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-3">Telefon</div>
            <a href="tel:+40000000000" className="serif text-2xl text-ink-900 hover:text-ink-600 transition">
              +40 21 000 0000
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-3">Email</div>
            <a href="mailto:contact@uzinex.ro" className="serif text-2xl text-ink-900 hover:text-ink-600 transition">
              contact@uzinex.ro
            </a>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-uzx-orange mb-3">Sediu</div>
            <div className="text-ink-700">
              Șos. București-Ploiești, km 12
              <br />
              Otopeni, jud. Ilfov
            </div>
          </div>
          <a
            href="#"
            className="bg-uzx-blue hover:bg-uzx-blue2 text-white text-sm px-7 py-4 inline-flex items-center gap-3 group transition"
          >
            Discută cu un inginer
            <span className="group-hover:translate-x-1 transition">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
