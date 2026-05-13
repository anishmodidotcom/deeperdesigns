import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services · Deeper Designs",
  description: "Custom internal tools, customer-facing tools, websites, WhatsApp agents, operational systems, brand and identity. From ₹25,000.",
  alternates: { canonical: "https://deeperdesigns.in/services" },
};

const TIERS = [
  { name: "Single tool builds", price: "From ₹25,000", body: "A quiz. A landing page. A WhatsApp form. A small dashboard. One focused tool that solves one specific bottleneck." },
  { name: "Custom tools", price: "₹1L to ₹3L", body: "Custom calculators, recommendation engines, single-purpose AI tools, branded sites built to convert." },
  { name: "Multi-tool systems", price: "₹3L to ₹10L", body: "A portal and a dashboard. A site, a booking flow, and an inventory system. A brand world and a store." },
  { name: "Operational redesigns", price: "₹10L+", body: "The operating system for a business. Brand, site, internal tools, customer-facing tools, the works." },
];

export default function Services() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <section style={{ padding: "80px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>SERVICES</p>
          <h1 style={{ fontSize: "var(--fs-display)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            What we build, and what it costs.
          </h1>
          <p style={{ fontSize: "21px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            We price like a tool, not a procurement project. INR primary. UAE clients pay in AED. No retainers. No subscriptions.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
            {TIERS.map(t => (
              <div key={t.name} style={{ background: "var(--bg)", padding: "48px 32px" }}>
                <h3 style={{ fontSize: "var(--fs-h3)", fontWeight: 500, marginBottom: "12px" }}>{t.name}</h3>
                <p style={{ fontSize: "28px", color: "var(--accent)", marginBottom: "24px", fontWeight: 500 }}>{t.price}</p>
                <p style={{ fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6 }}>{t.body}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px", padding: "32px", border: "1px solid var(--border)", borderRadius: "12px", background: "var(--bg-card)" }}>
            <p style={{ fontSize: "17px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
              Budget tight? Tell us anyway. If it is not a fit we will say so within a day, no posturing. Most businesses spend more on a single industry conference than a custom DD tool. The tool, unlike the conference, ships value every day after.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "880px" }}>
          <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            Tell us what is slowing your business down.
          </h2>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="https://wa.me/919968716498?text=Hi%2C%20I%27d%20like%20to%20explore%20possibilities%20for%20my%20business." className="btn-whatsapp">Start a conversation</a>
            <a href="/start-your-study" className="btn-outline">Let&apos;s explore possibilities</a>
          </div>
        </div>
      </section>
    </main>
  );
}
