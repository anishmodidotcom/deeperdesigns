import type { Metadata } from "next";
import Image from "next/image";

// Real full-screen demo: the Catalogue Studio for "Indie Thread". Flat
// product inputs turned into on-model and lifestyle sets (real generated
// images). Not indexed.
export const metadata: Metadata = {
  title: "Catalogue Studio demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#E84393";

const INPUTS = [
  { src: "/builds/fashion/runway-flat.webp", label: "Olive co-ord" },
  { src: "/builds/fashion/studio/flat-dress.webp", label: "Slip dress" },
];

const OUTPUTS = [
  { src: "/builds/fashion/runway-poster.webp", label: "On-model", alt: "On-model shot of the olive linen co-ord set" },
  { src: "/builds/fashion/studio/onmodel-lifestyle.webp", label: "Lifestyle", alt: "Lifestyle shot of the olive linen co-ord set" },
  { src: "/builds/fashion/studio/onmodel-dress.webp", label: "On-model", alt: "On-model shot of the slip dress" },
];

const PRESETS = ["On-model", "Lifestyle", "Studio", "Flat lay", "Editorial"];

export default function CatalogueStudioDemo() {
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
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Catalogue Studio</h1>
          <span style={{ fontSize: 13, color: "#6B6B6B" }}>Indie Thread · Summer Linen drop</span>
        </div>
        <span style={{ background: ACCENT, color: "#0A0A0A", fontSize: 14, fontWeight: 600, padding: "10px 22px", borderRadius: 999 }}>Shoot catalogue</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "300px 1fr", minHeight: 0 }}>
        {/* Inputs */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)", padding: "20px 22px", display: "flex", flexDirection: "column" }}>
          <p style={{ margin: "0 0 14px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "#6B6B6B" }}>FLAT INPUTS</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {INPUTS.map((it) => (
              <div key={it.label} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#111111" }}>
                <Image src={it.src} alt={`Flat product photo, ${it.label}`} width={256} height={200} style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }} />
                <div style={{ padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="2" aria-hidden><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
                  <span style={{ fontSize: 12, color: "#A8A8A8" }}>{it.label}</span>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 18, fontSize: 12.5, lineHeight: 1.55, color: "#6B6B6B" }}>
            Flat product photos in. On-model and lifestyle sets out, in one consistent brand look.
          </p>
        </div>

        {/* Generated grid */}
        <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: ACCENT }}>GENERATED</p>
            <span style={{ fontSize: 11.5, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>3 OF 24 SHOTS</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, flex: 1, minHeight: 0 }}>
            {OUTPUTS.map((o, i) => (
              <div key={i} style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "#111111" }}>
                <Image src={o.src} alt={o.alt} width={300} height={440} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <span style={{ position: "absolute", top: 12, left: 12, fontSize: 11, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.08em", color: "#F5F5F5", background: "rgba(10,10,10,0.6)", borderRadius: 999, padding: "4px 11px", backdropFilter: "blur(6px)" }}>{o.label}</span>
                <span style={{ position: "absolute", bottom: 12, right: 12, fontSize: 12, fontWeight: 600, color: "#0A0A0A", background: "#F5F5F5", borderRadius: 999, padding: "6px 14px" }}>Use</span>
              </div>
            ))}
          </div>
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
