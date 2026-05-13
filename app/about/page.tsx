import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About · Deeper Designs",
  description: "Deeper Designs is an India-first studio building custom digital tools and operational systems for ambitious Indian businesses. Founded 2017.",
  alternates: { canonical: "https://deeperdesigns.in/about" },
  openGraph: {
    title: "About · Deeper Designs",
    description: "India-first studio building custom digital tools for ambitious Indian businesses.",
    url: "https://deeperdesigns.in/about",
  },
};

export default function About() {
  return (
    <main style={{ paddingTop: "120px" }}>
      <section style={{ padding: "80px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>ABOUT</p>
          <h1 style={{ fontSize: "var(--fs-display)", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "40px" }}>
            We help businesses build the small tools that quietly make them better.
          </h1>
          <p style={{ fontSize: "21px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            Deeper Designs is an India-first studio building custom digital tools for ambitious businesses. We work primarily out of Delhi, with select clients in the UAE. Most of what we ship starts with a founder telling us something is broken, and ends with us building the thing that fixes it.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
        <div className="container about-founder-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "80px", alignItems: "start" }} >
          <div style={{ position: "sticky", top: "120px" }}>
            <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: "12px", overflow: "hidden", background: "var(--bg-card)" }}>
              <Image src="/images/about/anish-portrait.webp" alt="Anish Modi" fill sizes="(max-width: 768px) 100vw, 400px" style={{ objectFit: "cover" }} priority />
            </div>
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: "24px" }}>01 · THE FOUNDER</p>
            <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
              Anish Modi
            </h2>
            <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              Anish runs two things: a strategy practice for founders, and Deeper Designs, where he builds the actual tools those conversations point to.
            </p>
            <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              Most of what he works on starts with a founder telling him something is broken, and ends with shipping something specific to fix it. After a decade running businesses across Dubai and Delhi, he has learned that most companies do not need more advice. They need someone who can think with them and then build the thing.
            </p>
            <a href="https://anishmodi.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "16px", color: "var(--accent)", marginTop: "12px" }}>
              Read more at anishmodi.com →
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>02 · THE WAY WE WORK</p>
          <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "40px" }}>
            From first call to live.
          </h2>
          <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
            First call is usually a long conversation about what is actually slowing the business down. We pick one thing worth building. A rough idea comes back the next day. We sharpen it together, then start building.
          </p>
          <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            You stay in the loop the whole time. No long brief. No waiting around. The output is a tool you own and a team that knows how to use it.
          </p>
        </div>
      </section>

      <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>03 · A BIT OF HISTORY</p>
          <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "40px" }}>
            Founded 2017. Rebuilt 2024.
          </h2>
          <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
            Deeper Designs started in 2017 as a design agency. We built brands and sites for early-stage Indian businesses and learned what actually moves the needle for an SMB versus what looks good in a deck.
          </p>
          <p style={{ fontSize: "18px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
            In 2024, we rebuilt around AI. The same business strategy work, with custom tools and operational systems as the deliverable instead of just brand. The 21 studies on the homepage are the result.
          </p>
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

      <style>{`
        @media (max-width: 768px) {
          .about-founder-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </main>
  );
}
