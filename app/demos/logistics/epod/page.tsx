import type { Metadata } from "next";

// Real full-screen demo: the driver ePOD flow for "Sharma Transport", a phone
// screen capturing proof of delivery with photo, signature and stamp.
// Not indexed.
export const metadata: Metadata = {
  title: "ePOD demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#F59F00";
const GOOD = "#2FB46A";
const BG = "#0C0D0F";

export default function EpodDemo() {
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
          background: BG,
          color: "#F5F5F5",
          fontFamily: "var(--font-geist-sans), -apple-system, system-ui, sans-serif",
          "--page-accent": ACCENT,
        } as React.CSSProperties
      }
    >
      {/* App bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 16px 14px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2.2" aria-hidden><polyline points="15 18 9 12 15 6" /></svg>
        <div style={{ flex: 1, lineHeight: 1.2 }}>
          <p style={{ margin: 0, fontSize: 15.5, fontWeight: 600 }}>Proof of delivery</p>
          <p style={{ margin: 0, fontSize: 11.5, color: "#8A8A8A", fontFamily: "var(--font-geist-mono), monospace" }}>TRP-4465 · Mumbai → Pune</p>
        </div>
        <span style={{ fontSize: 10.5, color: ACCENT, border: `1px solid ${ACCENT}`, borderRadius: 999, padding: "3px 9px" }}>Stop 3 of 3</span>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* Consignment */}
        <div style={{ background: "#15171A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "14px 16px" }}>
          <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Patel Distributors</p>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#8A8A8A" }}>14 cartons · Invoice INV-2231</p>
        </div>

        {/* Captured photo */}
        <div>
          <p style={{ margin: "0 0 8px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "#6B6B6B" }}>DELIVERY PHOTO</p>
          <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", height: 150, background: "linear-gradient(135deg, #1d2024, #121417)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3A3D42" strokeWidth="1.5" aria-hidden><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
            <span style={{ position: "absolute", bottom: 10, left: 10, fontSize: 10.5, color: "#F5F5F5", background: "rgba(10,10,10,0.6)", backdropFilter: "blur(6px)", borderRadius: 999, padding: "4px 10px", fontFamily: "var(--font-geist-mono), monospace" }}>cartons at gate, captured</span>
            <span style={{ position: "absolute", top: 10, right: 10, width: 24, height: 24, borderRadius: "50%", background: GOOD, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="3" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
            </span>
          </div>
        </div>

        {/* Signature */}
        <div>
          <p style={{ margin: "0 0 8px", fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "#6B6B6B" }}>RECEIVER SIGNATURE</p>
          <div style={{ borderRadius: 14, background: "#F5F2EC", height: 84, position: "relative", overflow: "hidden" }}>
            <svg viewBox="0 0 300 84" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }} aria-hidden>
              <path d="M20 56 C40 30, 60 30, 78 50 S110 70, 128 44 C140 28, 156 30, 168 52 C180 70, 200 64, 214 46 C226 32, 250 34, 280 50" fill="none" stroke="#1A1A1A" strokeWidth="2.4" />
            </svg>
            <span style={{ position: "absolute", bottom: 8, right: 12, fontSize: 11, color: "#5A5A5A" }}>R. Patel</span>
          </div>
        </div>

        {/* Stamp + exception */}
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1, background: "#15171A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 14px" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>TIME &amp; LOCATION</p>
            <p style={{ margin: "6px 0 0", fontSize: 12.5, color: "#E8E8E8" }}>2:14 PM</p>
            <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "#8A8A8A" }}>Wakad, Pune · GPS locked</p>
          </div>
          <div style={{ flex: 1, background: "#15171A", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 14px" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 9.5, letterSpacing: "0.08em", color: "#6B6B6B" }}>EXCEPTION</p>
            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 34, height: 19, borderRadius: 999, background: "rgba(255,255,255,0.12)", position: "relative", flexShrink: 0 }}>
                <span style={{ position: "absolute", top: 2, left: 2, width: 15, height: 15, borderRadius: "50%", background: "#6B6B6B" }} />
              </span>
              <span style={{ fontSize: 12, color: "#8A8A8A" }}>None</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm */}
      <div style={{ padding: "14px 16px 22px" }}>
        <button type="button" style={{ width: "100%", background: ACCENT, color: "#0A0A0A", fontSize: 15, fontWeight: 600, padding: "15px", borderRadius: 14, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9 }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.6" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
          Confirm delivery
        </button>
        <p style={{ margin: "10px 0 0", textAlign: "center", fontSize: 11.5, color: "#6B6B6B" }}>Syncs to the control room and the customer the instant you tap.</p>
      </div>
    </main>
  );
}
