const ITEMS = [
  { n: "01", title: "Internal tools that replace spreadsheets", body: "Inventory trackers, booking systems, client portals, team dashboards. The kind of tools your team has been managing in Excel and WhatsApp for years." },
  { n: "02", title: "Customer-facing tools that look expensive", body: "Configurators, quizzes, recommendation engines, calculators. The kind of tools that turn a browser into a buyer." },
  { n: "03", title: "Websites that actually convert", body: "Not a template, not a Wix site. Custom-built sites with the conversion logic baked in. For brands that need to look serious." },
  { n: "04", title: "WhatsApp agents and chatbots", body: "AI that handles repetitive customer questions, books appointments, sends reminders, and only escalates to you when needed." },
  { n: "05", title: "Operational systems", body: "When a business has outgrown the manual way of doing things. We design the system end to end and ship the tools that run it." },
  { n: "06", title: "Brand and identity", body: "When the brand itself is the bottleneck. Naming, visual identity, packaging direction, and a site that holds it all together." },
];

export default function HomeWhatWeBuild() {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>01 · WHAT WE BUILD</p>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "900px", marginBottom: "80px" }}>
          Six kinds of work. Built for the specific shape of your business.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--border)", border: "1px solid var(--border)" }}>
          {ITEMS.map(item => (
            <div key={item.n} style={{ background: "var(--bg)", padding: "40px 32px" }}>
              <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "20px" }}>{item.n}</p>
              <h3 style={{ fontSize: "var(--fs-h3)", fontWeight: 500, marginBottom: "16px", lineHeight: 1.3 }}>{item.title}</h3>
              <p style={{ fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6 }}>{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
