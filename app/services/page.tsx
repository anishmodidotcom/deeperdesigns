import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services · Deeper Designs",
  description: "Custom internal tools, customer-facing tools, websites, AI agents, operational systems. From ₹25,000.",
  alternates: { canonical: "https://deeperdesigns.in/services" },
};

const TIERS = [
  { name: "Single tool",           price: "From ₹25,000", body: "A quiz. A calculator. A small dashboard. One focused tool that quietly removes a daily headache." },
  { name: "Custom build",          price: "₹1L to ₹3L",   body: "Configurators, AI tools, brand sites built to convert. The kind of work that turns visitors into buyers." },
  { name: "Multi-tool system",     price: "₹3L to ₹10L",  body: "A portal and a dashboard. A site, a booking flow, and an inventory brain. Multiple parts, designed to work together." },
  { name: "Operational redesign",  price: "₹10L+",        body: "The operating system for a business. Brand, site, internal tools, customer tools, the works." },
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
            Priced like a tool, not a procurement project. No retainers, no subscriptions, no surprise invoices.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
            {TIERS.map(t => (
              <div key={t.name} style={{ background: "var(--bg)", padding: "48px 32px" }}>
                <h3 style={{ fontSize: "var(--fs-h3)", fontWeight: 500, marginBottom: "12px" }}>{t.name}</h3>
                <p style={{ fontSize: "28px", color: "var(--accent)", marginBottom: "24px", fontWeight: 500 }}>{t.price}</p>
                <p style={{ fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6 }}>{t.body}</p>
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
            <a href="/start-your-study" className="btn-whatsapp">Talk to us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
