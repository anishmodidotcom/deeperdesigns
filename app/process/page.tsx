import type { Metadata } from "next";
import AnishNote from "@/components/AnishNote";

export const metadata: Metadata = {
  title: "Process · Deeper Designs",
  description: "From conversation to live, in two to four weeks. Five steps, no long brief.",
  alternates: { canonical: "https://www.deeperdesigns.in/process" },
};

const STEPS = [
  { n: "01", title: "We talk",                 body: "A real conversation. No brief. No deck. You describe what's stuck, we ask the right questions." },
  { n: "02", title: "We send back a shape",    body: "Within a day, a rough idea of what to build. Three minutes to read. Yes or no, no theatre." },
  { n: "03", title: "We sharpen it",           body: "A short loop. We adjust, lock scope, agree on number and timeline." },
  { n: "04", title: "We build",                body: "Working pieces every week. No big reveal. No surprises." },
  { n: "05", title: "Live, and yours",         body: "Deployed, documented, owned by you. We stay close for 30 days, then hand off." },
];

export default function Process() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <section style={{ padding: "80px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>PROCESS</p>
          <h1 style={{ fontSize: "var(--fs-display)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            From conversation to live, in two to four weeks.
          </h1>
          <p style={{ fontSize: "21px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            Five steps. The first one is free. No brief to write, no form to fill, no discovery deck.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <AnishNote
            text="Most of the work is done on the call. By the time we send you a scope, we already know what we're building and why."
            align="right"
            variant="margin"
          />
          <div style={{ clear: "both", display: "flex", flexDirection: "column", gap: "0" }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: "32px", padding: "48px 0", borderBottom: i === STEPS.length - 1 ? "none" : "1px solid var(--border)" }}>
                <p className="mono" style={{ color: "var(--accent)", fontSize: "14px", paddingTop: "6px" }}>{s.n}</p>
                <div>
                  <h3 style={{ fontSize: "var(--fs-h2)", fontWeight: 500, marginBottom: "12px", lineHeight: 1.2 }}>{s.title}</h3>
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
