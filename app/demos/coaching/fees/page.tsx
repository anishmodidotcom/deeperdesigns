import type { Metadata } from "next";

// Real full-screen demo: a WhatsApp Business fee reminder from "Pinnacle
// Classes" to a parent, with a UPI pay link and an instant receipt. Same
// fidelity as the D2C chat. Not indexed.
export const metadata: Metadata = {
  title: "Fee Engine demo",
  robots: { index: false, follow: false },
};

const ACCENT = "#F25F4C";
const HEADER = "#1F2C34";
const CHAT_BG = "#0B141A";
const IN_BUBBLE = "#1F2C34";
const OUT_BUBBLE = "#005C4B";
const LINK = "#53BDEB";
const TIME = "#8696A0";

const DOODLE =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90' viewBox='0 0 90 90'><g fill='none' stroke='%238696A0' stroke-width='1.1' opacity='0.5'><circle cx='18' cy='20' r='6'/><path d='M50 14 l6 6 -6 6 -6 -6 z'/><path d='M70 60 q6 -8 12 0'/><path d='M14 64 h12 M20 58 v12'/><circle cx='66' cy='24' r='3'/><path d='M40 60 l4 4 8 -10'/></g></svg>\")";

export default function FeesDemo() {
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
          background: HEADER,
          fontFamily: "var(--font-geist-sans), -apple-system, system-ui, sans-serif",
          "--page-accent": ACCENT,
        } as React.CSSProperties
      }
    >
      {/* Chat header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "16px 12px 12px", background: HEADER }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E9EDEF" strokeWidth="2.2" aria-hidden>
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <div aria-hidden style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(150deg, #F25F4C, #B5371F)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontWeight: 600, fontSize: 15, flexShrink: 0 }}>
          P
        </div>
        <div style={{ flex: 1, minWidth: 0, lineHeight: 1.2 }}>
          <p style={{ margin: 0, color: "#E9EDEF", fontSize: 16, fontWeight: 600 }}>Pinnacle Classes</p>
          <p style={{ margin: 0, color: TIME, fontSize: 12 }}>business account · online</p>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E9EDEF" strokeWidth="2" aria-hidden>
          <path d="M23 7l-7 5 7 5V7z" />
          <rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#E9EDEF" strokeWidth="2" aria-hidden style={{ marginLeft: 4 }}>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
        <svg width="6" height="20" viewBox="0 0 6 24" fill="#E9EDEF" aria-hidden style={{ marginLeft: 6 }}>
          <circle cx="3" cy="4" r="2" /><circle cx="3" cy="12" r="2" /><circle cx="3" cy="20" r="2" />
        </svg>
      </div>

      {/* Chat body */}
      <div style={{ flex: 1, overflowY: "auto", background: CHAT_BG, backgroundImage: DOODLE, backgroundSize: "90px 90px", padding: "14px 14px 6px", display: "flex", flexDirection: "column", gap: 8 }}>
        <SystemPill>Today</SystemPill>
        <SystemPill>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#8696A0" aria-hidden><path d="M12 1a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5Zm3 8H9V6a3 3 0 0 1 6 0Z" /></svg>
            Messages are end-to-end encrypted
          </span>
        </SystemPill>

        <OutBubble time="09:30">Good morning Mr Sharma, a reminder from Pinnacle Classes for Diya (NEET Dropper batch).</OutBubble>

        {/* Fee card */}
        <div style={{ alignSelf: "flex-end", maxWidth: "84%" }}>
          <div style={{ background: OUT_BUBBLE, borderRadius: "8px 8px 4px 8px", padding: 4, boxShadow: "0 1px 1px rgba(0,0,0,0.18)" }}>
            <div style={{ borderRadius: 6, overflow: "hidden", background: "rgba(0,0,0,0.16)", padding: "12px 12px 10px" }}>
              <p style={{ margin: 0, color: "#FFC9A8", fontSize: 12, fontWeight: 600, fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em" }}>TERM 2 FEE · DUE 15 JUN</p>
              <p style={{ margin: "9px 0 0", color: "#E9EDEF", fontSize: 14.5, lineHeight: 1.45 }}>
                Term 2 fee of <b style={{ fontWeight: 600 }}>Rs 18,000</b> is due. Tap to pay via UPI, receipt sent instantly.
              </p>
            </div>
            <Meta time="09:30" />
          </div>
        </div>

        {/* UPI button */}
        <div style={{ alignSelf: "flex-end", width: "84%", marginTop: 2 }}>
          <button style={{ width: "100%", background: IN_BUBBLE, color: LINK, fontSize: 14.5, fontWeight: 600, padding: "12px", borderRadius: 8, border: "none", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, cursor: "pointer" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={LINK} strokeWidth="2.2" aria-hidden><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
            Pay Rs 18,000 by UPI
          </button>
        </div>

        <InBubble time="09:41">Paid.</InBubble>

        {/* Receipt confirmation */}
        <div style={{ alignSelf: "flex-end", maxWidth: "84%" }}>
          <div style={{ background: OUT_BUBBLE, borderRadius: "8px 8px 4px 8px", padding: 4, boxShadow: "0 1px 1px rgba(0,0,0,0.18)" }}>
            <div style={{ borderRadius: 6, overflow: "hidden", background: "rgba(0,0,0,0.16)", padding: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7BE0A0" strokeWidth="2.4" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                <span style={{ color: "#7BE0A0", fontSize: 13.5, fontWeight: 600 }}>Payment received</span>
              </div>
              <p style={{ margin: 0, color: "#D7E4DE", fontSize: 13 }}>Receipt PNC-2291 · Rs 18,000 · GST included</p>
              <span style={{ display: "inline-block", marginTop: 8, fontSize: 11, color: LINK, border: `1px solid ${LINK}`, borderRadius: 999, padding: "2px 10px" }}>Download receipt (PDF)</span>
            </div>
            <Meta time="09:41" />
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px 14px", background: CHAT_BG }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, background: IN_BUBBLE, borderRadius: 24, padding: "10px 14px" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TIME} strokeWidth="2" aria-hidden><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
          <span style={{ flex: 1, color: TIME, fontSize: 15 }}>Message</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TIME} strokeWidth="2" aria-hidden><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>
        </div>
        <div aria-hidden style={{ width: 46, height: 46, borderRadius: "50%", background: "#00A884", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="#0B141A" aria-hidden><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z" /></svg>
        </div>
      </div>
    </main>
  );
}

function SystemPill({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ alignSelf: "center", margin: "2px 0" }}>
      <span style={{ background: "#182229", color: TIME, fontSize: 12, padding: "5px 12px", borderRadius: 8, display: "inline-block" }}>{children}</span>
    </div>
  );
}

function OutBubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div style={{ alignSelf: "flex-end", maxWidth: "84%" }}>
      <div style={{ background: OUT_BUBBLE, color: "#E9EDEF", fontSize: 14.5, lineHeight: 1.4, padding: "7px 9px 5px 11px", borderRadius: "8px 8px 4px 8px", boxShadow: "0 1px 1px rgba(0,0,0,0.18)" }}>
        {children}
        <Meta time={time} />
      </div>
    </div>
  );
}

function InBubble({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div style={{ alignSelf: "flex-start", maxWidth: "84%" }}>
      <div style={{ background: IN_BUBBLE, color: "#E9EDEF", fontSize: 14.5, lineHeight: 1.4, padding: "7px 11px 5px", borderRadius: "8px 8px 8px 4px", boxShadow: "0 1px 1px rgba(0,0,0,0.18)" }}>
        {children}
        <span style={{ display: "block", textAlign: "right", color: TIME, fontSize: 11, marginTop: 2 }}>{time}</span>
      </div>
    </div>
  );
}

function Meta({ time }: { time: string }) {
  return (
    <span style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 2 }}>
      <span style={{ color: "#A7C4BC", fontSize: 11 }}>{time}</span>
      <svg width="16" height="11" viewBox="0 0 18 12" fill="none" stroke={LINK} strokeWidth="1.8" aria-hidden>
        <polyline points="1 6.5 4.5 10 11 2.5" /><polyline points="7 10 13.5 2.5" />
      </svg>
    </span>
  );
}
