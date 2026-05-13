export default function HomeCTA() {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: "880px" }}>
        <p className="eyebrow" style={{ marginBottom: "24px" }}>READY?</p>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "48px" }}>
          Tell us what is slowing your business down.
        </h2>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="https://wa.me/919968716498?text=Hi%2C%20I%27d%20like%20to%20explore%20possibilities%20for%20my%20business." className="btn-whatsapp">Start a conversation</a>
          <a href="/start-your-study" className="btn-outline">Let&apos;s explore possibilities</a>
        </div>
      </div>
    </section>
  );
}
