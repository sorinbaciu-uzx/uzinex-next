import Script from "next/script";

/**
 * Analytics pixels + tags pentru uzinex.ro
 *
 * Se încarcă toate pe fiecare pagină, prin layout.tsx. Fiecare tag se activează
 * doar dacă ID-ul corespunzător e setat în env vars — lipsa unui ID = lipsa
 * tag-ului (fără erori silențioase).
 *
 * Env vars (toate NEXT_PUBLIC_ pentru acces client-side):
 *   NEXT_PUBLIC_GA4_ID          — Google Analytics 4 (format: G-XXXXXXXXXX)
 *   NEXT_PUBLIC_META_PIXEL_ID   — Meta (Facebook) Pixel ID (format: numeric)
 *   NEXT_PUBLIC_LINKEDIN_ID     — LinkedIn Partner ID (numeric)
 *   NEXT_PUBLIC_CLARITY_ID      — Microsoft Clarity Project ID (alphanumeric)
 *
 * Strategy: `afterInteractive` pentru toate — nu blochează LCP, se încarcă
 * după ce pagina e interactive. GDPR: ar trebui wrapped în consent banner
 * pentru producție UE (vezi /politica-cookies).
 */

export function Analytics() {
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID?.trim();
  const meta = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  const linkedin = process.env.NEXT_PUBLIC_LINKEDIN_ID?.trim();
  const clarity = process.env.NEXT_PUBLIC_CLARITY_ID?.trim();

  return (
    <>
      {/* Google Analytics 4 */}
      {ga4 && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${ga4}', {
                anonymize_ip: true,
                cookie_flags: 'SameSite=None;Secure'
              });
            `}
          </Script>
        </>
      )}

      {/* Meta (Facebook) Pixel */}
      {meta && (
        <>
          <Script id="meta-pixel-init" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${meta}');
              fbq('track', 'PageView');
            `}
          </Script>
          {/* Fallback img pentru browserele fără JS */}
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://www.facebook.com/tr?id=${meta}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}

      {/* LinkedIn Insight Tag */}
      {linkedin && (
        <>
          <Script id="linkedin-init" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${linkedin}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
                if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                window.lintrk.q=[]}
                var s = document.getElementsByTagName("script")[0];
                var b = document.createElement("script");
                b.type = "text/javascript";b.async = true;
                b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                s.parentNode.insertBefore(b, s);
              })(window.lintrk);
            `}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              alt=""
              src={`https://px.ads.linkedin.com/collect/?pid=${linkedin}&fmt=gif`}
            />
          </noscript>
        </>
      )}

      {/* Microsoft Clarity (gratuit — heatmaps + session recordings) */}
      {clarity && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarity}");
          `}
        </Script>
      )}
    </>
  );
}

/* ─── Client-side conversion helpers ───
 * Call these in handleSubmit after a successful lead submission.
 * Safe no-op if the corresponding tag isn't installed.
 */

type GtagFn = (...args: unknown[]) => void;
type FbqFn = (...args: unknown[]) => void;
type LintrkFn = (cmd: string, data: Record<string, unknown>) => void;

export function trackLead(
  intent: "leads" | "service" | "finantare" | "hr",
  value?: number
) {
  if (typeof window === "undefined") return;
  const win = window as Window & {
    gtag?: GtagFn;
    fbq?: FbqFn;
    lintrk?: LintrkFn;
  };

  // GA4 — custom event "generate_lead"
  win.gtag?.("event", "generate_lead", {
    currency: "RON",
    value: value ?? 0,
    intent,
  });

  // Meta Pixel — standard Lead event
  win.fbq?.("track", "Lead", {
    currency: "RON",
    value: value ?? 0,
    content_category: intent,
  });

  // LinkedIn — conversion tracking (ID per campaign, set separately)
  win.lintrk?.("track", { conversion_id: 0 });
}
