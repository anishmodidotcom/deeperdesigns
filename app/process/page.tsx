import type { Metadata } from "next";
import AnishNote from "@/components/AnishNote";
import { renderSerif } from "@/components/industry/text";

export const metadata: Metadata = {
  title: "Process · Deeper Designs",
  description: "From conversation to live, in two to four weeks. Five steps, no long brief.",
  alternates: { canonical: "https://www.deeperdesigns.in/process" },
  openGraph: {
    title: "Process · Deeper Designs",
    description: "From conversation to live, in two to four weeks. Five steps, no long brief.",
    url: "https://www.deeperdesigns.in/process",
    siteName: "Deeper Designs",
    images: [{ url: "/brand/og-deeperdesigns.png", width: 1200, height: 630, alt: "Process · Deeper Designs" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Process · Deeper Designs",
    description: "From conversation to live, in two to four weeks. Five steps, no long brief.",
    images: ["/brand/og-deeperdesigns.png"],
  },
};

// v30 part 5: five steps become six stages, with a timeline label on
// each. Copy is final and verbatim.
const STEPS = [
  { n: "01", title: "UNDERSTAND", lead: "Your business, your goals", when: "DAY 0", body: "A free conversation about what you want to improve and how the business runs." },
  { n: "02", title: "DIAGNOSE", lead: "Where the opportunity is", when: "WEEK 1", body: "A walkthrough of your processes, your team and your data. Findings in writing." },
  { n: "03", title: "DESIGN", lead: "What should change", when: "WEEK 2", body: "The strategy, the systems that carry it, the number we will measure, the scope you choose." },
  { n: "04", title: "BUILD", lead: "A prototype first", when: "WEEKS 2 TO 3", body: "A working version in as little as seven days. You use it before we go further." },
  { n: "05", title: "DEPLOY", lead: "Into the business", when: "MONTHS 1 TO 3", body: "Integrations, training, hardware where needed. Around three months for a larger system." },
  { n: "06", title: "IMPROVE", lead: "Keep moving the number", when: "ONGOING", body: "Measurement, refinement, new experiments. Your business changes. The system changes with it." },
];

export default function Process() {
  return (
    <main id="main" style={{ paddingTop: "120px" }}>
      <section style={{ padding: "80px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>PROCESS</p>
          <h1 style={{ fontSize: "var(--fs-display)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            {renderSerif("Understand, diagnose, design, {serif}build, deploy, improve.{/serif}")}
          </h1>
          <p style={{ fontSize: "21px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            From your goals to a live system, and then onward.
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
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "clamp(90px,12vw,130px) 1fr", gap: "32px", padding: "48px 0", borderBottom: i === STEPS.length - 1 ? "none" : "1px solid var(--border)" }}>
                <div style={{ paddingTop: "6px" }}>
                  <p className="mono" style={{ color: "var(--accent)", fontSize: "14px", margin: 0 }}>{s.n}</p>
                  {/* v30: the timeline label, so the six stages read as a
                      schedule rather than a list. */}
                  <p className="mono" style={{ color: "var(--fg-dim)", fontSize: "11px", letterSpacing: "0.12em", margin: "8px 0 0" }}>{s.when}</p>
                </div>
                <div>
                  <h3 style={{ fontSize: "var(--fs-h2)", fontWeight: 500, marginBottom: "8px", lineHeight: 1.2 }}>{s.title}</h3>
                  <p style={{ fontSize: "17px", color: "var(--fg)", lineHeight: 1.5, marginBottom: "12px" }}>{s.lead}</p>
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
            <a href="/#gallery" className="btn-outline">Let us explore ideas</a>
            <a href="/start-your-study" className="btn-whatsapp">Talk to us</a>
          </div>
        </div>
      </section>
    </main>
  );
}
