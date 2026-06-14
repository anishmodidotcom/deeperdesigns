// Behaviour Recovery Engine demo.
// A clean, DD-styled recreation of a WhatsApp recovery conversation. This
// is a rebuild in our own visual language, not an embedded screenshot. The
// thread shows the exact product the visitor viewed, with quick replies.

const GREEN = "#1FA855"; // WhatsApp-family header green, rebuilt, not lifted
const THREAD_BG = "#0B130F";
const IN_BUBBLE = "#15201A";
const OUT_BUBBLE = "#103A2A";

export default function BehaviourRecoveryDemo() {
  return (
    <div
      data-demo="behaviour-recovery"
      style={{
        width: "100%",
        maxWidth: 380,
        marginInline: "auto",
        borderRadius: 22,
        overflow: "hidden",
        border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        background: THREAD_BG,
        boxShadow: "0 40px 80px -40px rgba(0,0,0,0.6)",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      {/* Branded header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
          background: GREEN,
        }}
      >
        <div
          aria-hidden
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: "0.04em",
          }}
        >
          YB
        </div>
        <div style={{ lineHeight: 1.25 }}>
          <p style={{ margin: 0, color: "#FFFFFF", fontSize: 15, fontWeight: 600 }}>
            Your Brand
          </p>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.78)", fontSize: 12 }}>
            online
          </p>
        </div>
      </div>

      {/* Thread */}
      <div
        style={{
          padding: "18px 14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <Bubble side="in" bg={IN_BUBBLE}>
          Hi Aarav, you were looking at a couple of things earlier today
        </Bubble>

        {/* Product card inside the thread */}
        <div
          style={{
            alignSelf: "flex-start",
            maxWidth: "86%",
            background: IN_BUBBLE,
            borderRadius: "4px 14px 14px 14px",
            padding: 10,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            <div
              aria-hidden
              style={{
                width: 64,
                height: 80,
                borderRadius: 8,
                flexShrink: 0,
                background:
                  "linear-gradient(150deg, var(--page-accent-soft) 0%, var(--page-accent) 70%)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: 6,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 8,
                  letterSpacing: "0.1em",
                  color: "rgba(0,0,0,0.55)",
                }}
              >
                PRODUCT
              </span>
            </div>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  margin: 0,
                  color: "var(--dd-text-high, #F5F5F5)",
                  fontSize: 14,
                  fontWeight: 600,
                  lineHeight: 1.25,
                }}
              >
                Terracotta Linen Midi
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  color: "var(--dd-text-mid, #A8A8A8)",
                  fontSize: 12,
                }}
              >
                <span style={{ color: "var(--page-money)", fontWeight: 600 }}>
                  ₹2,490
                </span>{" "}
                · size M in stock
              </p>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 8,
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  color: "var(--page-accent)",
                  border: "1px solid var(--page-accent)",
                  borderRadius: 999,
                  padding: "2px 8px",
                }}
              >
                VIEWED 3 TIMES
              </span>
            </div>
          </div>
        </div>

        <Bubble side="in" bg={IN_BUBBLE}>
          Still in your size, but moving fast. Want me to hold it for an hour?
        </Bubble>

        {/* Quick-reply chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 4,
            justifyContent: "flex-end",
          }}
        >
          {["Hold it for me", "See it on a model", "Any discount?"].map((c) => (
            <span
              key={c}
              style={{
                background: OUT_BUBBLE,
                color: "#DFF6EA",
                fontSize: 12.5,
                padding: "8px 12px",
                borderRadius: 999,
                border: "1px solid rgba(37,211,102,0.3)",
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Bubble({
  side,
  bg,
  children,
}: {
  side: "in" | "out";
  bg: string;
  children: React.ReactNode;
}) {
  const isIn = side === "in";
  return (
    <div
      style={{
        alignSelf: isIn ? "flex-start" : "flex-end",
        maxWidth: "82%",
        background: bg,
        color: "var(--dd-text-high, #F5F5F5)",
        fontSize: 14,
        lineHeight: 1.45,
        padding: "9px 13px",
        borderRadius: isIn ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
      }}
    >
      {children}
    </div>
  );
}
