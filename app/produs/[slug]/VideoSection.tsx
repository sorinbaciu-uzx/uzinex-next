type Bullet = { title: string; body: string };

export function VideoSection({
  videoId,
  title = "Vezi utilajul în lucru",
  intro,
  bullets,
}: {
  videoId?: string;
  title?: string;
  intro?: string;
  bullets: Bullet[];
}) {
  return (
    <section className="py-14 lg:py-20 bg-white border-b border-ink-100">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7">
            <div
              className="relative aspect-video w-full overflow-hidden bg-ink-900"
              style={{
                boxShadow: "0 30px 60px -25px rgba(8,37,69,0.35)",
              }}
            >
              {videoId ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, #0d2c52 0%, #082545 50%, #050f1f 100%)",
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-uzx-orange/90 flex items-center justify-center shadow-2xl">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-5 text-white/70 text-xs uppercase tracking-[0.2em] mono">
                    Video demonstrativ
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="text-[11px] mono uppercase tracking-[0.2em] text-uzx-orange mb-3">
              — În producție
            </div>
            <h2
              className="serif text-2xl lg:text-3xl text-ink-900 leading-tight"
              style={{ letterSpacing: "-0.025em" }}
            >
              {title}
            </h2>
            {intro && (
              <p className="mt-4 text-[14px] text-ink-600 leading-relaxed">
                {intro}
              </p>
            )}

            <ul className="mt-6 space-y-4">
              {bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-uzx-blue/10 border border-uzx-blue/30 flex items-center justify-center text-uzx-blue text-[11px] font-bold shrink-0">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="serif text-[15px] text-ink-900 leading-tight font-medium">
                      {b.title}
                    </div>
                    <div className="text-[12px] text-ink-500 leading-snug mt-1">
                      {b.body}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
