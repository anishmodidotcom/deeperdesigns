"use client";

type Node = {
  label: string;
  description: string;
  variant: "teal" | "amber" | "glow";
};

const NODES: Node[] = [
  {
    label: "First Visit",
    description: "Patient record created. Treatment plan documented.",
    variant: "teal",
  },
  {
    label: "Treatment",
    description:
      "Active care. Progress tracked. Notes updated after every session.",
    variant: "teal",
  },
  {
    label: "Follow-up",
    description:
      "AI monitors pending treatments. Sends personalized reminders via WhatsApp.",
    variant: "amber",
  },
  {
    label: "Recall",
    description:
      "6-month cleaning reminder. Annual check-up nudge. Keeps patients in the loop.",
    variant: "teal",
  },
  {
    label: "Referral",
    description:
      "Happy patients refer family. The system tracks and rewards referrals.",
    variant: "glow",
  },
];

function variantStyles(v: Node["variant"]): React.CSSProperties {
  if (v === "amber") {
    return {
      borderColor: "rgba(245,158,11,0.5)",
      color: "#F59E0B",
      boxShadow: "0 0 0 1px rgba(245,158,11,0.15) inset",
    };
  }
  if (v === "glow") {
    return {
      borderColor: "var(--page-accent)",
      color: "var(--page-accent)",
      boxShadow:
        "0 0 0 1px rgba(15,168,154,0.2) inset, 0 0 28px rgba(15,168,154,0.45)",
    };
  }
  return {
    borderColor: "rgba(15,168,154,0.5)",
    color: "var(--page-accent)",
    boxShadow: "0 0 0 1px rgba(15,168,154,0.12) inset",
  };
}

export default function Journey() {
  return (
    <section style={{ paddingBlock: 128 }}>
      <div className="container-x">
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 64,
          }}
        >
          PATIENT LIFECYCLE
        </p>

        <div className="sf-journey">
          {NODES.map((n, i) => (
            <div key={n.label} className="sf-journey-step">
              <div className="sf-node" style={variantStyles(n.variant)}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3
                style={{
                  fontFamily:
                    "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                  fontWeight: 500,
                  fontSize: 16,
                  color: "var(--page-text)",
                  letterSpacing: "-0.01em",
                  margin: 0,
                  marginTop: 20,
                  marginBottom: 8,
                }}
              >
                {n.label}
              </h3>
              <p
                style={{
                  fontFamily:
                    "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
                  fontSize: 13,
                  color: "var(--page-text-2)",
                  lineHeight: 1.5,
                  margin: 0,
                  maxWidth: 200,
                }}
              >
                {n.description}
              </p>
              {i < NODES.length - 1 && (
                <span aria-hidden className="sf-flow sf-flow-h" />
              )}
              {i < NODES.length - 1 && (
                <span aria-hidden className="sf-flow sf-flow-v" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .sf-journey {
          display: grid;
          grid-template-columns: 1fr;
          gap: 32px;
        }
        .sf-journey-step {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding-bottom: 32px;
        }
        .sf-node {
          width: 44px;
          height: 44px;
          border-radius: 9999px;
          border: 1px solid currentColor;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-geist-mono), monospace;
          font-size: 13px;
          letter-spacing: 0.06em;
          background: var(--page-bg);
          z-index: 2;
        }
        @keyframes sf-flow-h {
          from {
            background-position-x: 0px;
          }
          to {
            background-position-x: 16px;
          }
        }
        @keyframes sf-flow-v {
          from {
            background-position-y: 0px;
          }
          to {
            background-position-y: 16px;
          }
        }
        .sf-flow-h {
          display: none;
        }
        .sf-flow-v {
          position: absolute;
          left: 50%;
          top: calc(44px + 8px);
          height: calc(100% - 44px - 16px);
          width: 8px;
          margin-left: -4px;
          background-image: radial-gradient(
            circle,
            rgba(15, 168, 154, 0.7) 1.5px,
            transparent 2px
          );
          background-size: 8px 16px;
          background-repeat: repeat-y;
          background-position-y: 0;
          animation: sf-flow-v 1.6s linear infinite;
          z-index: 1;
        }
        @media (min-width: 900px) {
          .sf-journey {
            grid-template-columns: repeat(5, 1fr);
            gap: 16px;
            align-items: flex-start;
          }
          .sf-journey-step {
            padding-bottom: 0;
          }
          .sf-flow-v {
            display: none;
          }
          .sf-flow-h {
            display: block;
            position: absolute;
            top: 22px;
            left: calc(50% + 30px);
            right: calc(-50% + 30px);
            height: 8px;
            margin-top: -4px;
            background-image: radial-gradient(
              circle,
              rgba(15, 168, 154, 0.7) 1.5px,
              transparent 2px
            );
            background-size: 16px 8px;
            background-repeat: repeat-x;
            animation: sf-flow-h 1.6s linear infinite;
            z-index: 1;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .sf-flow-h,
          .sf-flow-v {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
