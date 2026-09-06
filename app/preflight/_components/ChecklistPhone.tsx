// Section 04's phone UI mockup: the master launch-blocker checklist
// (v29). Rendered interface, illustrative content, per the export.

import { PhoneShell } from "./Frames";
import { IconTick } from "./Icons";

const MONO = "var(--font-geist-mono), monospace";

type Item = { label: string; state: "done" | "active" | "open" };

const ITEMS: Item[] = [
  { label: "Tenant isolation proven live", state: "done" },
  { label: "No service key in the client", state: "done" },
  { label: "Webhook signatures verified", state: "done" },
  { label: "Backups restored in a drill", state: "active" },
  { label: "Spend cap set on every provider", state: "open" },
  { label: "Agent tools scoped and logged", state: "done" },
  { label: "Deletion path honours privacy law", state: "done" },
];

export default function ChecklistPhone() {
  return (
    <PhoneShell>
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0A0A0B",
        }}
      >
        <div
          style={{
            padding: "44px 20px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            style={{
              margin: "0 0 14px",
              fontFamily: MONO,
              fontSize: 9.5,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6B6B6B",
            }}
          >
            Master launch-blocker checklist
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "#F5F3EF",
              }}
            >
              Nearly cleared
            </span>
            <span
              style={{
                fontFamily: MONO,
                fontSize: 9.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "#7C6CFF",
              }}
            >
              In progress
            </span>
          </div>
          <span
            style={{
              display: "block",
              height: 5,
              borderRadius: 999,
              background: "rgba(255,255,255,0.07)",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                display: "block",
                height: "100%",
                width: "82%",
                borderRadius: 999,
                background: "#7C6CFF",
              }}
            />
          </span>
        </div>

        <div
          style={{
            flex: 1,
            display: "grid",
            gap: 2,
            padding: "8px 12px",
            alignContent: "start",
          }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                padding: "12px 8px",
                borderRadius: 8,
                ...(item.state === "active"
                  ? {
                      background: "rgba(124,108,255,0.07)",
                      border: "1px solid rgba(124,108,255,0.3)",
                    }
                  : null),
              }}
            >
              {item.state === "done" ? (
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    background: "#7C6CFF",
                    color: "#0A0A0A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IconTick size={12} strokeWidth={3} />
                </span>
              ) : (
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    border:
                      item.state === "active"
                        ? "1.5px solid #7C6CFF"
                        : "1.5px solid rgba(255,255,255,0.18)",
                    flexShrink: 0,
                  }}
                />
              )}
              <span
                style={{
                  fontSize: 13,
                  lineHeight: 1.35,
                  color:
                    item.state === "done"
                      ? "#6B6B6B"
                      : item.state === "active"
                        ? "#F5F3EF"
                        : "#A8A8A8",
                  textDecoration: item.state === "done" ? "line-through" : undefined,
                }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: "14px 20px 22px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6B6B6B",
            }}
          >
            Open items
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 9.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#7C6CFF",
            }}
          >
            Re-cert triggers <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </PhoneShell>
  );
}
