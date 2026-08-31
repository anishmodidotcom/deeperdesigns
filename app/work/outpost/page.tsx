import type { Metadata } from "next";
import Link from "next/link";
import BrowserFrame from "@/components/industry/frames/BrowserFrame";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import ShowcaseAnalytics from "@/components/ShowcaseAnalytics";
import { StructuredData, creativeWorkLd } from "@/components/StructuredData";
import { WHATSAPP_HREF } from "@/lib/contact";

// v22: Outpost, a Deeper Designs live product. Follows the live-product
// showcase pattern (maplelens, deeper-content): entry in lib/showcases.ts,
// per-page accent tokens, real product screenshot in a BrowserFrame,
// ShowcaseAnalytics, creativeWorkLd, indexable.

export const metadata: Metadata = {
  title: "Outpost · Live Product · Deeper Designs",
  description:
    "Outpost replaces your cold email stack with one tool: find leads, verify them, send and follow up. Pay per credit, 100 free to start.",
  alternates: { canonical: "/work/outpost" },
  openGraph: {
    title: "Outpost · Live Product · Deeper Designs",
    siteName: "Deeper Designs",
    description:
      "Outpost replaces your cold email stack with one tool: find leads, verify them, send and follow up. Pay per credit, 100 free to start.",
    url: "/work/outpost",
    images: [
      {
        url: "/api/og/outpost",
        width: 1200,
        height: 630,
        alt: "Deeper Designs · /work/outpost",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outpost · Live Product · Deeper Designs",
    description:
      "Outpost replaces your cold email stack with one tool: find leads, verify them, send and follow up. Pay per credit, 100 free to start.",
    images: ["/api/og/outpost"],
  },
};

// v25.5: was #6366F1, which is 4.43:1 on the near-black page background and
// fails AA at the 11px to 12px sizes it is used at for the eyebrow and the
// section headings. Lifted 3 percent toward white, which reads as the same
// colour and clears AA at 4.68:1. Hue is unchanged, so the Outpost accent
// stays distinct from the DD indigo.
const ACCENT = "#686BF1";

const pageStyle = {
  "--page-accent": ACCENT,
  "--page-accent-soft": "#8B8DF7",
  background: "var(--dd-bg, #0A0A0A)",
  color: "var(--dd-text-high, #F5F5F5)",
  minHeight: "100vh",
} as React.CSSProperties;

// v25.6: the page described a personalised outbound agent. The live
// product is a metered cold email platform, so the copy is replaced to
// match what outpost.deeperdesigns.in actually does today.
const WHAT_IT_DOES = [
  "Finds the right businesses from the market, not a stale database",
  "Enriches and verifies every contact before a message goes out",
  "Sends across multiple warmed inboxes, with deliverability handled",
  "Follows up until they reply, then hands the conversation to you",
  "Every reply in one inbox",
];

const TIERS = [
  "Mini, Rs 500",
  "Starter, Rs 2,500",
  "Growth, Rs 10,000",
  "Scale, Rs 25,000",
];

export default function OutpostPage() {
  return (
    <main id="main" style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
          // v25.5: a real, live product, not a concept build.
          concept: false,
          name: "Outpost",
          description:
            "Outpost finds your next customers and starts the conversation. Verified contacts, outreach in your voice, every reply in one inbox.",
          slug: "outpost",
          image: "/images/outpost/live-hero.webp",
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
            LIVE PRODUCT · OUTPOST
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
            Outpost replaces your whole cold email stack.{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              One instrument.
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
            Finding leads, verifying them, and sending used to mean three
            tools and three bills. Outpost does all of it in one place, and
            you pay only for what you use.
          </p>

          <div style={{ marginTop: 48, maxWidth: 960 }}>
            <BrowserFrame
              src="/images/outpost/live-hero.webp"
              alt="Outpost, the live product, a real screenshot of outpost.deeperdesigns.in"
              url="outpost.deeperdesigns.in"
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
          {/* v25.5: was a styled <p>, so the page had an h1 and no section
              headings at all and could not be navigated by heading. Same
              text, same type treatment, correct element. */}
          <h2 className="op-section-label" style={{ marginBottom: 28 }}>
            WHAT IT DOES
          </h2>
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

      {/* How you pay */}
      <section
        style={{
          paddingBlock: "var(--dd-section-py, 120px)",
          borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        }}
      >
        <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
          <div style={{ maxWidth: 680 }}>
            <h2 className="op-section-label">HOW YOU PAY</h2>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--dd-text-high, #F5F5F5)", margin: 0 }}>
              Two balances, no subscription trap. One lead credit per lead
              sourced, with enrichment and verification included. One email
              credit per send. Credits roll over and never expire. Every
              account starts with 100 lead credits and 100 email credits free.
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: "28px 0 0",
                padding: 0,
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              {TIERS.map((t) => (
                <li
                  key={t}
                  className="mono"
                  style={{
                    fontSize: 13,
                    letterSpacing: "0.04em",
                    color: "var(--dd-text-high, #F5F5F5)",
                    border: "1px solid var(--dd-border-strong, rgba(255,255,255,0.16))",
                    borderRadius: 999,
                    padding: "9px 16px",
                  }}
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Bring your own, or not */}
      <section
        style={{
          paddingBlock: "var(--dd-section-py, 120px)",
          borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        }}
      >
        <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
          <div style={{ maxWidth: 680 }}>
            <h2 className="op-section-label">BRING YOUR OWN, OR NOT</h2>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--dd-text-high, #F5F5F5)", margin: 0 }}>
              Connect your own Apollo, FullEnrich, ZeroBounce and Amazon SES
              accounts and Outpost runs on top of them for a small platform
              fee. Or use ours and skip the setup entirely.
            </p>
          </div>
        </div>
      </section>

      {/* Your own version + the honest line */}
      <section
        style={{
          paddingBlock: "var(--dd-section-py, 120px)",
          borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        }}
      >
        <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
          <div style={{ maxWidth: 680 }}>
            <h2 className="op-section-label">YOUR OWN VERSION</h2>
            <p style={{ fontSize: 19, lineHeight: 1.6, color: "var(--dd-text-high, #F5F5F5)", margin: 0 }}>
              We also build Outpost as your own product: your brand, your
              domain, your workflow, the same engine underneath. Built and run
              by us.
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
              Outpost is our own product. We built it because we needed it, we
              run our own outreach on it, and it is live today.
            </p>
          </div>

          <div style={{ marginTop: 56, display: "flex", flexWrap: "wrap", gap: 14 }}>
            <a
              href="https://outpost.deeperdesigns.in"
              target="_blank"
              rel="noopener noreferrer"
              className="op-cta-primary"
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
              Start free
            </a>
            <Link
              href="/start-your-study"
              className="btn-whatsapp"
              style={{ padding: "15px 28px" }}
            >
              Talk to us
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

      <ShowcaseAnalytics slug="outpost" name="Outpost" industry="Deeper Designs" />

      <style>{`
        /* v25.6: one shared treatment for the mono section labels, which
           are real h2 headings styled as eyebrows. */
        .op-section-label {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.16em;
          color: var(--page-accent);
          margin: 0 0 18px;
        }
        .op-cta-primary { transition: filter 150ms var(--dd-ease-out, ease); }
        .op-cta-primary:hover { filter: brightness(1.08); }
        .op-cta-primary:active { transform: translateY(1px); }
      `}</style>
    </main>
  );
}
