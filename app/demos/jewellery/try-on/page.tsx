import type { Metadata } from "next";
import Image from "next/image";

// Real full-screen demo: the Try-On Studio for "Kalasri Jewellers", a phone
// tool that places a real piece on the buyer (real generated images). Not
// indexed; kept for reuse as a live demo.
export const metadata: Metadata = {
  title: "Try-On Studio demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#C9A227";
const BG = "#0B0B0C";

export default function TryOnDemo() {
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
          color: "#F5F2E8",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          "--page-accent": ACCENT,
        } as React.CSSProperties
      }
    >
      {/* App bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 16px 14px" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5F2E8" strokeWidth="2.2" aria-hidden>
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <div style={{ flex: 1, lineHeight: 1.2 }}>
          <p style={{ margin: 0, fontSize: 15.5, fontWeight: 600 }}>Try it on</p>
          <p style={{ margin: 0, fontSize: 11.5, color: "#9A937F" }}>Kalasri Jewellers</p>
        </div>
        <span style={{ width: 9, height: 9, borderRadius: 2, background: ACCENT }} />
      </div>

      {/* Result image */}
      <div style={{ flex: 1, position: "relative", minHeight: 0, margin: "0 14px", borderRadius: 22, overflow: "hidden", border: "1px solid rgba(201,162,39,0.3)" }}>
        <Image
          src="/builds/jewellery/tryon/tryon-after.webp"
          alt="The buyer's neckline wearing a generated gold necklace try-on result"
          width={362}
          height={520}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* before/after toggle */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", background: "rgba(10,10,10,0.55)", backdropFilter: "blur(8px)", borderRadius: 999, padding: 3 }}>
          {["Before", "On you"].map((t, i) => (
            <span key={t} style={{ fontSize: 12, fontWeight: 600, padding: "5px 13px", borderRadius: 999, color: i === 1 ? "#0A0A0A" : "#E8E1CE", background: i === 1 ? ACCENT : "transparent" }}>
              {t}
            </span>
          ))}
        </div>
        <span style={{ position: "absolute", bottom: 14, left: 14, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.06em", color: "#0A0A0A", background: ACCENT, borderRadius: 999, padding: "5px 12px" }}>
          your piece, on you
        </span>
      </div>

      {/* Piece info */}
      <div style={{ margin: "14px 14px 0", display: "flex", alignItems: "center", gap: 12, background: "#14130F", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "12px 14px" }}>
        <span style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(201,162,39,0.16)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" aria-hidden>
            <path d="M12 3l2.5 4.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-1.5z" />
          </svg>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Antique Lakshmi Haar, 22K</p>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: "#C9A227", fontFamily: "var(--font-geist-mono), monospace" }}>32.4 g · in stock</p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: "14px 14px 22px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button
type="button"           style={{
            width: "100%",
            background: "#25D366",
            color: "#06270F",
            fontSize: 15,
            fontWeight: 600,
            padding: "14px",
            borderRadius: 14,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            cursor: "pointer",
          }}
        >
          <svg width="19" height="19" viewBox="0 0 24 24" fill="#06270F" aria-hidden>
            <path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.9.9-2.8-.2-.3A8 8 0 1 1 12 20Z" />
          </svg>
          Share on WhatsApp
        </button>
        <button
type="button"           style={{
            width: "100%",
            background: "transparent",
            color: ACCENT,
            fontSize: 14.5,
            fontWeight: 600,
            padding: "13px",
            borderRadius: 14,
            border: `1px solid ${ACCENT}`,
            cursor: "pointer",
          }}
        >
          Book a visit to see it
        </button>
      </div>
    </main>
  );
}
