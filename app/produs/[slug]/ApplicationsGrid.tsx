import Image from "next/image";
import {
  ApplicationAnimation,
  ApplicationIcon,
  type ApplicationAnimationId,
  type ApplicationIconId,
} from "@/components/product-applications";

export type Application = {
  title: string;
  caption?: string;
  image?: string;
  animation?: ApplicationAnimationId;
  icon?: ApplicationIconId;
};

export function ApplicationsGrid({ items }: { items: Application[] }) {
  if (items.length === 0) return null;

  return (
    <section className="py-6 sm:py-8 lg:py-10 bg-white border-b border-ink-100">
      <div className="container-x">
        <div className="text-[10px] sm:text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-2">
          — Industrii deservite
        </div>

        <div className="mb-4 sm:mb-5 flex items-center gap-3 sm:gap-4">
          <h2 className="text-[20px] sm:text-[24px] lg:text-[26px] leading-tight font-bold text-[#0b2b66]">
            Aplicații recomandate
          </h2>
          <span className="h-[3px] w-10 sm:w-14 bg-uzx-orange" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {items.slice(0, 4).map((app) => (
            <article
              key={app.title}
              className="group border border-ink-200 bg-white overflow-hidden transition hover:border-uzx-orange hover:shadow-lg"
            >
              <div className="relative h-[130px] sm:h-[140px] lg:h-[145px] bg-ink-50 overflow-hidden">
                {app.animation ? (
                  <ApplicationAnimation id={app.animation} />
                ) : app.image ? (
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>

              <div className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-3 sm:py-4 min-h-[72px] sm:min-h-[80px]">
                {app.icon && (
                  <div className="flex shrink-0 items-center justify-center text-uzx-orange [&_svg]:h-10 [&_svg]:w-10 sm:[&_svg]:h-12 sm:[&_svg]:w-12">
                    <ApplicationIcon id={app.icon} />
                  </div>
                )}

                <h3 className="text-[15px] sm:text-[16px] lg:text-[17px] leading-snug font-bold text-[#0b2b66]">
                  {app.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
