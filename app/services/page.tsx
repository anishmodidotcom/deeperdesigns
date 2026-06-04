import type { Metadata } from "next";
import AnishNote from "@/components/AnishNote";
import TrackedWhatsAppLink from "@/components/TrackedWhatsAppLink";
import TrackedTierCTA from "./TrackedTierCTA";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Services · Deeper Designs",
  description: "Custom internal tools, customer-facing tools, websites, AI agents, operational systems. From ₹25,000.",
  alternates: { canonical: "https://www.deeperdesigns.in/services" },
  openGraph: {
    title: "Services · Deeper Designs",
    description: "Custom internal tools, customer-facing tools, websites, AI agents, operational systems. From ₹25,000.",
    url: "https://www.deeperdesigns.in/services",
    siteName: "Deeper Designs",
    images: [{ url: "/brand/og-deeperdesigns.png", width: 1200, height: 630, alt: "Services · Deeper Designs" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services · Deeper Designs",
    description: "Custom internal tools, customer-facing tools, websites, AI agents, operational systems. From ₹25,000.",
    images: ["/brand/og-deeperdesigns.png"],
  },
};

const TIERS: { name: string; price: string; body: string; examples: string[] }[] = [
  {
    name: "Single tool",
    price: "From ₹25,000",
    body: "A quiz. A calculator. A small dashboard. One focused tool that quietly removes a daily headache.",
    examples: [
      "A WhatsApp agent that books appointments",
      "A skin or product quiz that ends in a purchase",
      "A small dashboard that replaces a daily spreadsheet check",
    ],
  },
  {
    name: "Custom build",
    price: "₹1L to ₹3L",
    body: "Configurators, AI tools, brand sites built to convert. The kind of work that turns visitors into buyers.",
    examples: [
      "A made-to-order product builder with custom pricing logic",
      "A lead qualifier that filters and routes inquiries",
      "A brand site with a smart configurator that converts",
    ],
  },
  {
    name: "Multi-tool system",
    price: "₹3L to ₹10L",
    body: "A portal and a dashboard. A site, a booking flow, and an inventory brain. Multiple parts, designed to work together.",
    examples: [
      "A client portal plus an internal ops dashboard plus a booking flow",
      "A pricing engine plus a buyer-facing site plus inventory sync",
      "A member CRM plus a retention engine plus an analytics view",
    ],
  },
  {
    name: "Operational redesign",
    price: "₹10L+",
    body: "The operating system for a business. Brand, site, internal tools, customer tools, the works.",
    examples: [
      "The full operating system for a regional QSR chain",
      "A heritage brand's entire digital presence and trade tooling",
      "A creator's training platform, sportswear store, and AI chat combined",
    ],
  },
];

// v18: emit a Service-typed JSON-LD entry per tier so each priced
// offering is independently indexable. ItemList wraps the four so
// Google reads them as a coherent product line.
const SERVICES_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: TIERS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      name: t.name,
      description: t.body,
      provider: {
        "@type": "Organization",
        name: "Deeper Designs",
        url: "https://www.deeperdesigns.in",
      },
      areaServed: ["IN", "AE"],
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: t.price,
        availability: "https://schema.org/InStock",
      },
    },
  })),
};

export default function Services() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <StructuredData data={SERVICES_LD} />
      <section style={{ padding: "80px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>SERVICES</p>
          <h1 style={{ fontSize: "var(--fs-display)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            What we build, and what it costs.
          </h1>
          <p style={{ fontSize: "21px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            Priced like a tool, not a procurement project. No retainers, no subscriptions, no surprise invoices.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
        <div className="container">
          <div style={{ maxWidth: "880px", marginBottom: "40px" }}>
            <AnishNote
              text="The price ranges below are where most builds land. We custom-quote after a 15-minute call. No proposals, no decks. Just a conversation and a number."
              align="left"
              variant="margin"
            />
          </div>
          <div style={{ clear: "both", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
            {TIERS.map(t => (
              <div key={t.name} style={{ background: "var(--bg)", padding: "48px 32px" }}>
                <h3 style={{ fontSize: "var(--fs-h3)", fontWeight: 500, marginBottom: "12px" }}>{t.name}</h3>
                <p style={{ fontSize: "28px", color: "var(--accent)", marginBottom: "24px", fontWeight: 500 }}>{t.price}</p>
                <p style={{ fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6 }}>{t.body}</p>
                <p style={{
                  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  // F2: was --dd-text-faint (#3A3A3A, ~1.7:1 on near-black, AA fail). Lifted.
                  color: "var(--dd-eyebrow-on-dark)",
                  marginTop: "24px",
                  marginBottom: "10px",
                }}>
                  Examples
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {t.examples.map(ex => (
                    <li
                      key={ex}
                      style={{
                        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                        fontSize: "14px",
                        color: "var(--dd-text-mid)",
                        lineHeight: 1.6,
                        marginBottom: "4px",
                      }}
                    >
                      ·&nbsp;{ex}
                    </li>
                  ))}
                </ul>
                <TrackedTierCTA tierName={t.name} tierPriceBand={t.price} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "880px" }}>
          <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            What could you build next?
          </h2>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/#gallery" className="btn-outline">Let&apos;s explore ideas</a>
            <TrackedWhatsAppLink href="/start-your-study" className="btn-whatsapp">Talk to us</TrackedWhatsAppLink>
          </div>
        </div>
      </section>
    </main>
  );
}
