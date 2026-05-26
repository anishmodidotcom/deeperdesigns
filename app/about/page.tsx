import type { Metadata } from "next";
import Image from "next/image";
import AnishNote from "@/components/AnishNote";
import HowWeThink from "./HowWeThink";

export const metadata: Metadata = {
  title: "About · Deeper Designs",
  description: "A studio that builds custom tools and operational systems for ambitious businesses. Founded 2017.",
  alternates: { canonical: "https://www.deeperdesigns.in/about" },
};

export default function About() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <section style={{ padding: "80px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>ABOUT</p>
          <AnishNote
            text="I started this because most Indian businesses get one of two things, a deck from a consultant, or a quote from a dev shop. Neither builds the thing. Deeper Designs does."
            align="right"
            variant="margin"
          />
          <h1 style={{ fontSize: "var(--fs-display)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            We build the small tools that quietly make a business better.
          </h1>
          <p style={{ fontSize: "21px", color: "var(--fg-muted)", lineHeight: 1.6, clear: "both" }}>
            A studio for founders who don&apos;t need another deck. We sit, we listen, we figure out what to build, and then we build it.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
        <div className="container about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }}>
          <div style={{ position: "sticky", top: "120px" }}>
            <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: "12px", overflow: "hidden", background: "var(--bg-card)" }}>
              <Image src="/images/about/anish-portrait.jpg" alt="Anish Modi" fill style={{ objectFit: "cover" }} priority sizes="(max-width: 768px) 100vw, 400px" />
            </div>
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: "24px" }}>THE FOUNDER</p>
            <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
              Anish Modi
            </h2>
            <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              Anish runs two things: a strategy practice for founders, and Deeper Designs, where he builds the actual tools those conversations point to.
            </p>
            <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              After a decade running businesses across Delhi and Dubai, he learned most companies don&apos;t need more advice. They need someone to think with them, then build the thing.
            </p>
            <a href="https://anishmodi.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "16px", color: "var(--accent)", marginTop: "12px" }}>
              More at anishmodi.com →
            </a>
          </div>
        </div>
      </section>

      <HowWeThink />

      <section style={{ padding: "var(--section-py) 0" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>HOW WE WORK</p>
          <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            From conversation to live, in weeks.
          </h2>
          <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            First call is a real conversation. We pick one thing worth building, sharpen it together, and ship. You stay in the loop the whole time. No long brief. No discovery deck. The output is a working tool, owned by you.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>A BIT OF HISTORY</p>
          <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
            Founded 2017. Rebuilt 2024.
          </h2>
          <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            Started as a design studio in 2017. Rebuilt around AI in 2024. Same instincts about business, new tools to act on them.
          </p>
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

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </main>
  );
}
