import type { Metadata } from "next";
import Image from "next/image";

// Real full-screen demo: the Listing Studio. A raw empty-room phone photo
// turned into virtually-staged, magazine-grade variants (real generated
// images). Not indexed; kept for reuse as a live demo.
export const metadata: Metadata = {
  title: "Listing Studio demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#3E7BFA";

const OUTPUTS = [
  { src: "/builds/real-estate/studio/staged-modern.webp", label: "Modern", alt: "The living room virtually staged in a clean modern style" },
  { src: "/builds/real-estate/studio/staged-classic.webp", label: "Classic", alt: "The living room virtually staged in a warm classic Indian style" },
  { src: "/builds/real-estate/studio/staged-warm.webp", label: "Warm", alt: "The living room virtually staged in a cosy warm minimal style" },
];

const PRESETS = ["Modern", "Classic", "Warm", "Scandi", "Luxe"];

export default function ListingStudioDemo() {
  return (
    <main
      data-demo-screen
      style={
        {
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          background: "#0A0A0A",
          color: "#F5F5F5",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          "--page-accent": ACCENT,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: ACCENT, alignSelf: "center" }} />
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Listing Studio</h1>
          <span style={{ fontSize: 13, color: "#6B6B6B" }}>Anand Realty · Prestige Lakeside, 3BHK</span>
        </div>
        <span style={{ background: ACCENT, color: "#0A0A0A", fontSize: 14, fontWeight: 600, padding: "10px 22px", borderRadius: 999 }}>Stage room</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "360px 1fr", minHeight: 0 }}>
        {/* Input */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", display: "flex", flexDirection: "column" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "#6B6B6B" }}>INPUT</p>
          <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#111111" }}>
            <Image
              src="/builds/real-estate/studio/raw-room.webp"
              alt="Amateur phone photo of an empty unfurnished apartment living room"
              width={312}
              height={416}
              style={{ width: "100%", height: 416, objectFit: "cover", display: "block" }}
            />
            <div style={{ padding: "12px 14px", display: "flex", alignItems: "center", gap: 9 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" aria-hidden>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span style={{ fontSize: 12.5, color: "#A8A8A8" }}>uploaded · empty room photo</span>
            </div>
          </div>
          <p style={{ marginTop: 18, fontSize: 13, lineHeight: 1.55, color: "#6B6B6B" }}>
            One raw photo from the site visit. The studio relights it, furnishes the room virtually, and keeps the walls and windows exactly where they are.
          </p>
        </div>

        {/* Generated */}
        <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>STAGED</p>
            <span style={{ fontSize: 11.5, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>3 OF 9 STYLES</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, flex: 1, minHeight: 0 }}>
            {OUTPUTS.map((o) => (
              <div key={o.label} style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#111111" }}>
                <Image
                  src={o.src}
                  alt={o.alt}
                  width={300}
                  height={440}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <span style={{ position: "absolute", top: 12, left: 12, fontSize: 11, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.08em", color: "#F5F5F5", background: "rgba(10,10,10,0.6)", borderRadius: 999, padding: "4px 11px", backdropFilter: "blur(6px)" }}>{o.label}</span>
                <span style={{ position: "absolute", bottom: 12, right: 12, fontSize: 12, fontWeight: 600, color: "#0A0A0A", background: "#F5F5F5", borderRadius: 999, padding: "6px 14px" }}>Use</span>
              </div>
            ))}
          </div>

          {/* Preset chips */}
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            {PRESETS.map((p, i) => (
              <span key={p} style={{ fontSize: 12.5, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em", color: i === 0 ? "#0A0A0A" : "#A8A8A8", background: i === 0 ? ACCENT : "transparent", border: i === 0 ? `1px solid ${ACCENT}` : "1px solid rgba(255,255,255,0.16)", borderRadius: 999, padding: "8px 16px" }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
