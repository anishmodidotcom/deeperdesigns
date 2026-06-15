import type { Metadata } from "next";

// Real full-screen demo: the Voice Receptionist for "Sukoon Clinic", a phone
// call/agent view with a live transcript and a WhatsApp confirmation. Not
// indexed.
export const metadata: Metadata = {
  title: "Voice Receptionist demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#5B8DEF";
const MONEY = "#5BC8A0";
const BG = "#0B0E14";

const TRANSCRIPT: { who: "agent" | "caller"; text: string }[] = [
  { who: "agent", text: "Sukoon Clinic, good evening. How can I help you?" },
  { who: "caller", text: "I need to see Dr Mehra, is there a slot this evening?" },
  { who: "agent", text: "Dr Mehra has 6:30 PM open today. Shall I book that for you?" },
  { who: "caller", text: "Yes please, 6:30 works." },
  { who: "agent", text: "Booked. May I have your name and number for the confirmation?" },
  { who: "caller", text: "Rahul Verma, 98XXX 30021." },
  { who: "agent", text: "Done, Rahul. Confirmation is on its way on WhatsApp." },
];

export default function VoiceReceptionistDemo() {
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
          color: "#EAF0FB",
          fontFamily: "var(--font-geist-sans), -apple-system, system-ui, sans-serif",
          "--page-accent": ACCENT,
          "--page-money": MONEY,
        } as React.CSSProperties
      }
    >
      {/* Call status bar */}
      <div style={{ padding: "20px 18px 14px", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <p style={{ margin: 0, fontFamily: "var(--font-geist-mono), monospace", fontSize: 11, letterSpacing: "0.14em", color: ACCENT }}>SUKOON CLINIC · AI RECEPTIONIST</p>
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <span style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(91,141,239,0.16)", border: `1px solid ${ACCENT}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" aria-hidden>
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
          </span>
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 17, fontWeight: 600 }}>Incoming call</p>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "#8FA0BE" }}>+91 98XXX 30021 · 1:12 · answered by agent</p>
        <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, color: MONEY, fontFamily: "var(--font-geist-mono), monospace" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: MONEY }} /> LIVE TRANSCRIPT
        </div>
      </div>

      {/* Transcript */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 9 }}>
        {TRANSCRIPT.map((t, i) => (
          <div key={i} style={{ alignSelf: t.who === "agent" ? "flex-start" : "flex-end", maxWidth: "85%" }}>
            <p style={{ margin: "0 0 3px", fontSize: 10, letterSpacing: "0.1em", fontFamily: "var(--font-geist-mono), monospace", color: t.who === "agent" ? ACCENT : "#7E8DA8", textAlign: t.who === "agent" ? "left" : "right" }}>
              {t.who === "agent" ? "AGENT" : "CALLER"}
            </p>
            <div style={{ background: t.who === "agent" ? "rgba(91,141,239,0.14)" : "#161A24", border: t.who === "agent" ? `1px solid rgba(91,141,239,0.4)` : "1px solid rgba(255,255,255,0.08)", color: "#EAF0FB", fontSize: 14.5, lineHeight: 1.45, padding: "9px 13px", borderRadius: t.who === "agent" ? "4px 12px 12px 12px" : "12px 4px 12px 12px" }}>
              {t.text}
            </div>
          </div>
        ))}

        {/* WhatsApp confirmation */}
        <div style={{ alignSelf: "center", marginTop: 8, width: "92%", background: "#0E1F18", border: "1px solid rgba(91,200,160,0.4)", borderRadius: 14, padding: "13px 15px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.8-1.5A10 10 0 1 0 12 2Z" /></svg>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: MONEY }}>Confirmation sent on WhatsApp</span>
          </div>
          <p style={{ margin: 0, fontSize: 13.5, color: "#CDE7DC", lineHeight: 1.45 }}>
            Dr Mehra · Today 6:30 PM · Sukoon Clinic, Indiranagar. Reply RESCHEDULE to change.
          </p>
        </div>
      </div>

      {/* Call controls */}
      <div style={{ padding: "14px 18px 22px", display: "flex", alignItems: "center", justifyContent: "center", gap: 28, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <span style={{ width: 46, height: 46, borderRadius: "50%", background: "#161A24", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8FA0BE" strokeWidth="2" aria-hidden><path d="M11 5 6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
        </span>
        <span style={{ width: 56, height: 56, borderRadius: "50%", background: "#E5484D", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M21 15.46l-5.27-.61-2.52 2.52a15.05 15.05 0 0 1-6.59-6.59l2.53-2.53L8.54 3H3.03C2.45 13.18 10.82 21.55 21 20.97v-5.51z" transform="rotate(135 12 12)" /></svg>
        </span>
        <span style={{ width: 46, height: 46, borderRadius: "50%", background: "#161A24", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8FA0BE" strokeWidth="2" aria-hidden><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /></svg>
        </span>
      </div>
    </main>
  );
}
