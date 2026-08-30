import type { Metadata } from "next";
import Image from "next/image";

// Real full-screen demo: the Try-On for "Indie Thread", a phone screen
// showing the outfit on a shopper with a see-it-move affordance and an
// add-to-cart row (real generated image). Not indexed.
export const metadata: Metadata = {
  title: "Try-On demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#E84393";
const MONEY = "#E0B341";
const BG = "#0D0A0C";

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
          color: "#F6EEF2",
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          "--page-accent": ACCENT,
          "--page-money": MONEY,
        } as React.CSSProperties
      }
    >
      {/* App bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "18px 16px 14px" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F6EEF2" strokeWidth="2.2" aria-hidden>
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <div style={{ flex: 1, lineHeight: 1.2 }}>
          <p style={{ margin: 0, fontSize: 15.5, fontWeight: 600 }}>Try it on</p>
          <p style={{ margin: 0, fontSize: 11.5, color: "#A892A0" }}>Indie Thread</p>
        </div>
        <span style={{ width: 9, height: 9, borderRadius: 2, background: ACCENT }} />
      </div>

      {/* Result image */}
      <div style={{ flex: 1, position: "relative", minHeight: 0, margin: "0 14px", borderRadius: 22, overflow: "hidden", border: "1px solid rgba(232,67,147,0.3)" }}>
        <Image
          src="/builds/fashion/try-on/tryon-result.webp"
          alt="A shopper wearing the olive-green linen co-ord set, generated on-model try-on result"
          width={362}
          height={560}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* toggle */}
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", background: "rgba(10,10,10,0.55)", backdropFilter: "blur(8px)", borderRadius: 999, padding: 3 }}>
          {["Your photo", "On you"].map((t, i) => (
            <span key={t} style={{ fontSize: 12, fontWeight: 600, padding: "5px 13px", borderRadius: 999, color: i === 1 ? "#0A0A0A" : "#E8DCE3", background: i === 1 ? ACCENT : "transparent" }}>{t}</span>
          ))}
        </div>
        {/* see it move */}
        <button type="button" style={{ position: "absolute", bottom: 14, left: 14, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12.5, fontWeight: 600, color: "#0A0A0A", background: "#F6EEF2", borderRadius: 999, padding: "8px 14px", border: "none", cursor: "pointer" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#0A0A0A" aria-hidden><path d="M8 5v14l11-7z" /></svg>
          See it move
        </button>
      </div>

      {/* Product info */}
      <div style={{ margin: "14px 14px 0", display: "flex", alignItems: "center", gap: 12, background: "#171215", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "12px 14px" }}>
        <span style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(232,67,147,0.16)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="1.8" aria-hidden><path d="M6 3l3 3 3-2 3 2 3-3 2 5-3 2v9H7v-9L4 8z" /></svg>
        </span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Olive Linen Co-ord Set</p>
          <p style={{ margin: "3px 0 0", fontSize: 12, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>Rs 3,200 · size M in stock</p>
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: "14px 14px 22px", display: "flex", gap: 10 }}>
        <button type="button" style={{ flex: 1, background: ACCENT, color: "#0A0A0A", fontSize: 15, fontWeight: 600, padding: "14px", borderRadius: 14, border: "none", cursor: "pointer" }}>
          Add to cart
        </button>
        <button type="button" style={{ width: 56, background: "transparent", color: "#25D366", border: "1px solid rgba(37,211,102,0.5)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#25D366" aria-hidden><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Z" /></svg>
        </button>
      </div>
    </main>
  );
}
