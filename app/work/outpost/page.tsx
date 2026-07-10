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
    "Outpost finds your next customers and starts the conversation. Verified contacts, outreach in your voice, every reply in one inbox. A Deeper Designs product, live today.",
  alternates: { canonical: "/work/outpost" },
  openGraph: {
    title: "Outpost · Live Product · Deeper Designs",
    siteName: "Deeper Designs",
    description:
      "Finds your next customers and starts the conversation. A Deeper Designs product, live today.",
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
      "Finds your next customers and starts the conversation. A Deeper Designs product, live today.",
    images: ["/api/og/outpost"],
  },
};

const ACCENT = "#6366F1";

const pageStyle = {
  "--page-accent": ACCENT,
  "--page-accent-soft": "#8B8DF7",
  background: "var(--dd-bg, #0A0A0A)",
  color: "var(--dd-text-high, #F5F5F5)",
  minHeight: "100vh",
} as React.CSSProperties;

const WHAT_IT_DOES = [
  "Finds the right businesses from the market, not a stale database",
  "Verifies every email before a single message goes out",
  "Writes personal outreach in your voice, not a template blast",
  "Sends from your own email address, with deliverability handled",
  "Follows up until they reply, then hands the conversation to you",
  "Every reply, one inbox",
];

export default function OutpostPage() {
  return (
    <main style={pageStyle}>
      <StructuredData
        data={creativeWorkLd({
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
            Outpost finds your next customers{" "}
            <span
              style={{
                fontFamily:
                  "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              and starts the conversation.
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
            Tell it who you sell to. It finds them, gets verified contact
            details, writes outreach that sounds like you, sends from your own
            email, follows up on its own, and lands every reply in one inbox.
          </p>

          <div style={{ marginTop: 48, maxWidth: 960 }}>
            <BrowserFrame
              src="/images/outpost/live-hero.webp"
              alt="Outpost, the live product, a real screenshot of outpost.deeperdesigns.in"
              url="outpost.deeperdesigns.in"
              width={1600}
              height={1000}
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
              Built for founders and sales teams who know exactly who they sell
              to and are tired of doing the finding, writing, and chasing by
              hand.
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
              See Outpost
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

      <ShowcaseAnalytics slug="outpost" name="Outpost" industry="Deeper Designs" />

      <style>{`
        .op-cta-primary { transition: filter 150ms var(--dd-ease-out, ease); }
        .op-cta-primary:hover { filter: brightness(1.08); }
        .op-cta-primary:active { transform: translateY(1px); }
      `}</style>
    </main>
  );
}
