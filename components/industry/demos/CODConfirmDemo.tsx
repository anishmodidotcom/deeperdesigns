// COD Confirm Agent demo.
// A four-step vertical flow showing a COD order auto-confirmed before it
// ships. Each step carries a mono timing / status label.

const STEPS = [
  {
    title: "Order placed, agent picks it up",
    sub: "COD · ₹2,490",
    tag: "0s",
    tagNote: "automatic",
    state: "done" as const,
  },
  {
    title: "WhatsApp sent to buyer, one-tap confirm",
    sub: "Confirm or change before dispatch",
    tag: "8s",
    tagNote: "automatic",
    state: "done" as const,
  },
  {
    title: "Risk check runs in parallel",
    sub: "Address and past-RTO scored",
    tag: "clean",
    tagNote: "flagged",
    state: "done" as const,
  },
  {
    title: "Confirmed, moved to packing queue",
    sub: "Fakes never ship",
    tag: "ready to pack",
    tagNote: "result",
    state: "result" as const,
  },
];

export default function CODConfirmDemo() {
  return (
    <div
      data-demo="cod-confirm"
      style={{
        width: "100%",
        borderRadius: 18,
        border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        background: "var(--dd-surface-1, #111111)",
        padding: "22px 22px 24px",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 22,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--dd-text-mid, #A8A8A8)",
          }}
        >
          COD CONFIRM AGENT
        </span>
        <span
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            letterSpacing: "0.1em",
            color: "var(--page-accent)",
          }}
        >
          BEFORE DISPATCH
        </span>
      </div>

      <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {STEPS.map((s, i) => {
          const last = i === STEPS.length - 1;
          const isResult = s.state === "result";
          return (
            <li
              key={i}
              style={{ display: "flex", gap: 16, paddingBottom: last ? 0 : 18 }}
            >
              {/* Rail */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  aria-hidden
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: isResult ? "var(--page-accent)" : "transparent",
                    border: isResult
                      ? "none"
                      : "1.5px solid var(--page-accent)",
                    color: isResult ? "#0A0A0A" : "var(--page-accent)",
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                >
                  {isResult ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </span>
                {!last && (
                  <span
                    aria-hidden
                    style={{
                      width: 1.5,
                      flex: 1,
                      minHeight: 28,
                      marginTop: 4,
                      background:
                        "linear-gradient(var(--page-accent), rgba(255,255,255,0.08))",
                    }}
                  />
                )}
              </div>

              {/* Body */}
              <div style={{ paddingTop: 1, minWidth: 0, flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14.5,
                      fontWeight: 600,
                      color: "var(--dd-text-high, #F5F5F5)",
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </p>
                  <span
                    style={{
                      flexShrink: 0,
                      fontFamily: "var(--font-geist-mono), monospace",
                      fontSize: 10,
                      letterSpacing: "0.06em",
                      color: isResult
                        ? "var(--page-accent)"
                        : "var(--dd-text-mid, #A8A8A8)",
                      border: `1px solid ${
                        isResult ? "var(--page-accent)" : "var(--dd-border, rgba(255,255,255,0.08))"
                      }`,
                      borderRadius: 999,
                      padding: "2px 8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <p
                  style={{
                    margin: "5px 0 0",
                    fontSize: 12.5,
                    color: "var(--dd-text-mid, #A8A8A8)",
                    lineHeight: 1.4,
                  }}
                >
                  {s.sub}
                </p>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 6,
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: 9,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--dd-text-low, #6B6B6B)",
                  }}
                >
                  {s.tagNote}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
