import type { Metadata } from "next";
import Link from "next/link";
import BrowserFrame from "@/components/industry/frames/BrowserFrame";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import { WHATSAPP_HREF } from "@/lib/contact";

// v22: Oviya Studio, a Deeper Designs live product. Follows the live-product
// showcase pattern (maplelens, deeper-content): entry in lib/showcases.ts,
// per-page accent tokens, real product screenshot in a BrowserFrame,
// ShowcaseAnalytics, creativeWorkLd, indexable. Accent sampled from the
// live oviyastudio.com brand rose.

export const metadata: Metadata = {
  title: "Oviya Studio · Live Product · Deeper Designs",
  description:
    "Upload the piece. Oviya shoots it. One photo of your garment or jewellery becomes a magazine-grade shoot. A Deeper Designs product, live today.",
  alternates: { canonical: "/work/oviya-studio" },
  openGraph: {
    title: "Oviya Studio · Live Product · Deeper Designs",
    siteName: "Deeper Designs",
    description:
      "One photo of your piece becomes a magazine-grade shoot. A Deeper Designs product, live today.",
    url: "/work/oviya-studio",
    images: [
      {
        url: "/api/og/oviya-studio",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/oviya-studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oviya Studio · Live Product · Deeper Designs",
    description:
      "One photo of your piece becomes a magazine-grade shoot. A Deeper Designs product, live today.",
    images: ["/api/og/oviya-studio"],
  },
};

const ACCENT = "#C4485C";

const pageStyle = {
  "--page-accent": ACCENT,
  "--page-accent-soft": "#E08A98",
  background: "var(--dd-bg, #0A0A0A)",
  color: "var(--dd-text-high, #F5F5F5)",
  minHeight: "100vh",
} as React.CSSProperties;

const WHAT_IT_DOES = [
  "Reads your piece from one photo and keeps it exact",
  "Casts the model, sets the light, builds the scene",
  "Returns editorial stills and video, ready for your store and your ads",
  "A full drop shot in an afternoon, not a week and a big bill",
];

export default function OviyaStudioPage() {
  return (
    <main id="main" style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          // v25.5: a real, live product, not a concept build.
          concept: false,
          name: "Oviya Studio",
          description:
            "Upload the piece. Oviya shoots it. One photo of your garment or jewellery becomes a magazine-grade shoot.",
          slug: "oviya-studio",
          image: "/images/oviya-studio/live-hero.webp",
          archetype: "a Deeper Designs product",
        })}
      />

      {/* Hero */}
      <section
        style={{
          paddingTop: 168,
          paddingBottom: "var(--dd-section-py, 120px)",
        }}
      >
        <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
          <p
            className="mono"
            style={{
              fontSize: 12,
              letterSpacing: "0.2em",
              color: "var(--page-accent)",
              margin: "0 0 12px",
            }}
          >
            LIVE PRODUCT · OVIYA STUDIO
          </p>
          <h1
            style={{
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "var(--dd-fs-h1, clamp(40px, 5vw, 64px))",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
              maxWidth: 720,
            }}
          >
            Upload the piece.{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Oviya shoots it.
            </span>
          </h1>
          <p
            style={{
              marginTop: 28,
              maxWidth: 620,
              fontSize: 18,
              lineHeight: 1.6,
              color: "var(--dd-text-mid, #A8A8A8)",
            }}
          >
            One photo of your garment or jewellery becomes a magazine-grade
            shoot. Model, light, and set handled. Your exact piece preserved,
            down to the stitch, or the credits come back.
          </p>

          <div style={{ marginTop: 48, maxWidth: 960 }}>
            <BrowserFrame
              src="/images/oviya-studio/live-hero.webp"
              alt="Oviya Studio, the live product, a real screenshot of oviyastudio.com"
              url="oviyastudio.com"
              width={1920}
              height={1200}
              priority
            />
          </div>
        </div>
      </section>

      {/* What it does */}
      <section
        style={{
          paddingBlock: "var(--dd-section-py, 120px)",
          borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        }}
      >
        <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
          <p
            className="mono"
            style={{
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "var(--page-accent)",
              margin: "0 0 28px",
            }}
          >
            WHAT IT DOES
          </p>
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              maxWidth: 640,
            }}
          >
            {WHAT_IT_DOES.map((line) => (
              <li
                key={line}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: "var(--dd-text-high, #F5F5F5)",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    marginTop: 10,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "var(--page-accent)",
                  }}
                />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Who it is for + the honest line */}
      <section
        style={{
          paddingBlock: "var(--dd-section-py, 120px)",
          borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        }}
      >
        <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
          <div style={{ maxWidth: 680 }}>
            <p
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: "0.16em",
                color: "var(--page-accent)",
                margin: "0 0 18px",
              }}
            >
              WHO IT IS FOR
            </p>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--dd-text-high, #F5F5F5)", margin: 0 }}>
              Built for fashion and jewellery brands that live or die on how
              the product looks, and cannot burn a lakh on every shoot.
            </p>

            <p
              style={{
                marginTop: 48,
                fontFamily:
                  "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontSize: "clamp(20px, 2vw, 26px)",
                lineHeight: 1.4,
                color: "var(--dd-bone, #F5F4EF)",
                borderLeft: "2px solid var(--page-accent)",
                paddingLeft: 20,
              }}
            >
              Oviya is our own product, live today, with free credits to try it
              on your own piece before you spend a rupee.
            </p>
          </div>

          <div style={{ marginTop: 56, display: "flex", flexWrap: "wrap", gap: 14 }}>
            <a
              href="https://oviyastudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ov-cta-primary"
              style={{
                background: "var(--page-accent)",
                color: "#0A0A0A",
                padding: "15px 28px",
                borderRadius: 999,
                fontWeight: 600,
                fontSize: 15,
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              Try Oviya Studio
            </a>
            <Link
              href="/start-your-study"
              className="btn-whatsapp"
              style={{ padding: "15px 28px" }}
            >
              Book a free strategy call
            </Link>
            <TrackedWhatsAppLink
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: "15px 28px" }}
            >
              Or message us on WhatsApp
            </TrackedWhatsAppLink>
          </div>
        </div>
      </section>

      <ShowcaseAnalytics slug="oviya-studio" name="Oviya Studio" industry="Deeper Designs" />

      <style>{`
        .ov-cta-primary { transition: filter 150ms var(--dd-ease-out, ease); }
        .ov-cta-primary:hover { filter: brightness(1.08); }
        .ov-cta-primary:active { transform: translateY(1px); }
      `}</style>
    </main>
  );
}
