import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process · Deeper Designs",
  description: "It starts with a real conversation. We pick one thing worth building, sharpen it together, and ship. No long brief.",
  alternates: { canonical: "https://deeperdesigns.in/process" },
};

const STEPS = [
  { n: "01", title: "It starts with a real conversation", body: "Tell us what your business does, what is hurting, what you wish existed. No jargon. No forms upfront. Most calls last 45 minutes." },
  { n: "02", title: "We come back with a shape", body: "Within a day, we send back a rough idea of what to build. Not a deck. A description that you can read in three minutes and feel either yes or no about." },
  { n: "03", title: "We sharpen it together", body: "A short loop. You react, we adjust, we agree on what is in and what is out. Scope locked. Number agreed. Timeline set." },
  { n: "04", title: "We build it", body: "You stay in the loop the whole time. We share work as it ships. No surprises at the end." },
  { n: "05", title: "Live, and yours", body: "Deployed, working, documented. Code you own. We stay close for the first 30 days, then hand off cleanly." },
];

export default function Process() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <section style={{ padding: "80px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>PROCESS</p>
          <h1 style={{ fontSize: "var(--fs-display)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            It starts with a real conversation.
          </h1>
          <p style={{ fontSize: "21px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            Five steps. The first one is free. You do not write a brief, fill a form, or sit through a discovery deck. You just talk to us.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "32px", padding: "48px 0", borderBottom: i === STEPS.length - 1 ? "none" : "1px solid var(--border)" }}>
                <p className="mono" style={{ color: "var(--accent)", fontSize: "14px", paddingTop: "6px" }}>{s.n}</p>
                <div>
                  <h3 style={{ fontSize: "var(--fs-h2)", fontWeight: 500, marginBottom: "16px", lineHeight: 1.2 }}>{s.title}</h3>
                  <p style={{ fontSize: "17px", color: "var(--fg-muted)", lineHeight: 1.6 }}>{s.body}</p>
                </div>
              </div>
            ))}
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
