import type { Metadata } from "next";

// Real full-screen demo: the COD Confirmation ops console for "Aarka
// Skincare". Not indexed; kept for reuse as a live demo / marketing asset.
export const metadata: Metadata = {
  title: "COD Confirm demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#FF5C38";
const MONEY = "#F5B544";
const GOOD = "#2FB46A";
const AMBER = "#F5B544";
const BAD = "#E5484D";

const STATS = [
  { label: "CONFIRMED TODAY", value: "218", tone: GOOD },
  { label: "AWAITING REPLY", value: "34", tone: AMBER },
  { label: "FLAGGED RISKY", value: "11", tone: BAD },
  { label: "RTO SAVED THIS MONTH", value: "Rs 95,000", tone: MONEY },
];

type Order = {
  id: string;
  product: string;
  amount: string;
  city: string;
  channel: "wa" | "call";
  status: "Confirmed" | "Awaiting" | "Flagged";
  selected?: boolean;
};

const ORDERS: Order[] = [
  { id: "AK-4821", product: "Midnight Repair Serum", amount: "Rs 2,490", city: "Pune", channel: "wa", status: "Confirmed" },
  { id: "AK-4822", product: "Vitamin C Day Drops", amount: "Rs 1,790", city: "Bengaluru", channel: "wa", status: "Confirmed" },
  { id: "AK-4823", product: "Barrier Repair Set", amount: "Rs 3,200", city: "Lucknow", channel: "call", status: "Flagged", selected: true },
  { id: "AK-4824", product: "Gentle Foaming Cleanser", amount: "Rs 690", city: "Delhi", channel: "wa", status: "Awaiting" },
  { id: "AK-4825", product: "Hydra Recovery Cream", amount: "Rs 1,450", city: "Navi Mumbai", channel: "wa", status: "Confirmed" },
  { id: "AK-4826", product: "Midnight Repair Serum", amount: "Rs 2,490", city: "Kolkata", channel: "call", status: "Awaiting" },
  { id: "AK-4827", product: "Vitamin C Day Drops", amount: "Rs 1,790", city: "Jaipur", channel: "wa", status: "Confirmed" },
];

const STATUS_TONE: Record<Order["status"], string> = { Confirmed: GOOD, Awaiting: AMBER, Flagged: BAD };

const RISK = [
  { k: "Address completeness", v: "40%", tone: BAD },
  { k: "Past RTO on this number", v: "2 of 3 returned", tone: BAD },
  { k: "Pincode RTO rate", v: "High", tone: AMBER },
];

function ChannelGlyph({ channel }: { channel: Order["channel"] }) {
  if (channel === "wa") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#A8A8A8" aria-hidden>
        <path d="M12.05 2a9.94 9.94 0 0 0-8.5 15.06L2 22l5.05-1.32A9.94 9.94 0 1 0 12.05 2Zm5.2 13.5c-.22.62-1.3 1.2-1.78 1.24-.46.04-.9.2-3-.62-2.54-1-4.15-3.6-4.28-3.77-.12-.17-1.02-1.36-1.02-2.6 0-1.23.65-1.84.88-2.1.22-.24.48-.3.64-.3h.46c.16 0 .35-.03.54.42.22.52.74 1.8.8 1.93.07.13.1.28.02.45-.42.84-.86.8-.6 1.26.86 1.48 1.72 1.98 3.02 2.64.22.1.35.1.48-.06.13-.16.55-.64.7-.86.14-.22.28-.18.48-.1.2.06 1.28.6 1.5.72.22.1.36.16.42.25.06.1.06.5-.16 1.12Z" />
      </svg>
    );
  }
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A8A8A8" strokeWidth="2" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

export default function CODConfirmDemo() {
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
          "--page-money": MONEY,
        } as React.CSSProperties
      }
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 28px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 11, height: 11, borderRadius: 3, background: ACCENT }} />
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>COD Confirmation</h1>
          <span style={{ fontSize: 12.5, color: "#A8A8A8", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "4px 11px" }}>Aarka Skincare</span>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: GOOD, fontFamily: "var(--font-geist-mono), monospace" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: GOOD }} /> CONFIRMING IN REAL TIME
        </span>
      </div>

      {/* Stat strip */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {STATS.map((s, i) => (
          <div key={s.label} style={{ padding: "16px 28px", borderLeft: i === 0 ? "none" : "1px solid rgba(255,255,255,0.06)" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: "#6B6B6B" }}>{s.label}</p>
            <p style={{ margin: "9px 0 0", fontFamily: "var(--font-geist-mono), monospace", fontSize: 24, fontWeight: 600, letterSpacing: "-0.01em", color: s.tone }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Two-pane */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1.3fr 1fr", minHeight: 0 }}>
        {/* Order queue */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.08)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 24px 10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Order queue</p>
            <p style={{ margin: 0, fontSize: 11, color: "#6B6B6B", fontFamily: "var(--font-geist-mono), monospace" }}>263 TODAY</p>
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            {ORDERS.map((o) => (
              <div
                key={o.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "13px 24px",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  background: o.selected ? "rgba(255,92,56,0.08)" : "transparent",
                  borderLeft: o.selected ? `2px solid ${ACCENT}` : "2px solid transparent",
                }}
              >
                <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, color: "#A8A8A8", width: 64, flexShrink: 0 }}>{o.id}</span>
                <span aria-hidden style={{ width: 34, height: 34, borderRadius: 7, background: "linear-gradient(150deg, rgba(245,181,68,0.4), rgba(184,85,48,0.5))", flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontSize: 13.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{o.product}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11.5, color: "#6B6B6B", display: "flex", alignItems: "center", gap: 7 }}>
                    <ChannelGlyph channel={o.channel} /> {o.city}
                  </p>
                </div>
                <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 13, color: MONEY, width: 78, textAlign: "right" }}>{o.amount}</span>
                <span style={{ fontSize: 11, color: STATUS_TONE[o.status], border: `1px solid ${STATUS_TONE[o.status]}`, borderRadius: 999, padding: "2px 10px", width: 86, textAlign: "center", flexShrink: 0 }}>{o.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div style={{ padding: "16px 24px", overflow: "hidden", display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ margin: 0, fontSize: 13.5, fontWeight: 600 }}>Order AK-4823</p>
            <span style={{ fontSize: 11, color: BAD, border: `1px solid ${BAD}`, borderRadius: 999, padding: "2px 10px" }}>Flagged risky</span>
          </div>

          {/* Mini confirm thread */}
          <div style={{ background: "#0B141A", borderRadius: 12, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ alignSelf: "flex-start", maxWidth: "88%", background: "#1F2C34", color: "#E9EDEF", fontSize: 13, lineHeight: 1.4, padding: "8px 11px", borderRadius: "8px 8px 8px 4px" }}>
              Hi, confirming your Aarka order of Barrier Repair Set for Rs 3,200, cash on delivery to Lucknow. Shall we ship it?
            </div>
            <div style={{ alignSelf: "flex-start", width: "88%", display: "flex", gap: 6 }}>
              <span style={{ flex: 1, textAlign: "center", background: "#1F2C34", color: "#53BDEB", fontSize: 13, fontWeight: 500, padding: "9px", borderRadius: 8 }}>Yes, confirm</span>
              <span style={{ flex: 1, textAlign: "center", background: "#1F2C34", color: "#53BDEB", fontSize: 13, fontWeight: 500, padding: "9px", borderRadius: 8 }}>Switch to prepaid</span>
            </div>
          </div>

          {/* Risk check */}
          <div style={{ background: "#111111", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "14px 16px" }}>
            <p style={{ margin: "0 0 12px", fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: BAD }} /> Risk check
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {RISK.map((r) => (
                <div key={r.k} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <span style={{ fontSize: 13, color: "#A8A8A8" }}>{r.k}</span>
                  <span style={{ fontSize: 12.5, color: r.tone, fontFamily: "var(--font-geist-mono), monospace", textAlign: "right" }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended action */}
          <div style={{ marginTop: "auto", background: "rgba(255,92,56,0.1)", border: `1px solid ${ACCENT}`, borderRadius: 12, padding: "14px 16px" }}>
            <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: ACCENT }}>RECOMMENDED ACTION</p>
            <p style={{ margin: "8px 0 0", fontSize: 15, fontWeight: 600 }}>Offer prepaid, hold dispatch</p>
          </div>
        </div>
      </div>
    </main>
  );
}
