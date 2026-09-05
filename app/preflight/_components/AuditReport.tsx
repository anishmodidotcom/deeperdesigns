// The hero's desktop UI mockup: an audit report (v29).
//
// Every value in here is illustrative interface content, exactly as the
// export set it. It is a rendered mock report, never captioned as a
// result of anything.

import { BrowserShell } from "./Frames";

const MONO = "var(--font-geist-mono), monospace";

type Layer = {
  label: string;
  score: string;
  width: number | null;
  colour: string;
};

const LAYERS: Layer[] = [
  { label: "Identity", score: "8", width: 80, colour: "#7C6CFF" },
  { label: "API", score: "8", width: 80, colour: "#7C6CFF" },
  { label: "Database", score: "9", width: 90, colour: "#7C6CFF" },
  { label: "Dependencies", score: "8", width: 80, colour: "#7C6CFF" },
  { label: "AI", score: "8", width: 80, colour: "#7C6CFF" },
  { label: "Payments", score: "N/A", width: null, colour: "#7C6CFF" },
  { label: "Secrets", score: "7", width: 70, colour: "#F5B544" },
  { label: "Infrastructure", score: "7", width: 70, colour: "#F5B544" },
  { label: "Privacy", score: "7", width: 70, colour: "#F5B544" },
];

const BLOCKERS = [
  "LB-01 · Tenant isolation proven live",
  "LB-02 · No secrets reachable in client",
  "LB-03 · Recovery path tested",
];

export default function AuditReport() {
  return (
    <BrowserShell url="preflight.report / security-hardening">
      <div style={{ padding: "clamp(16px,2vw,24px)", background: "#0A0A0B" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6B6B6B",
            }}
          >
            Audit report · security hardening
          </span>
          <span
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6B6B6B",
            }}
          >
            9 layers · 159 checks
          </span>
        </div>

        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "#111111",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#3A3A3A",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#6B6B6B",
                textTransform: "uppercase",
              }}
            >
              Verdict: not certified · grade 1 · 2 blockers open
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "14px 16px",
              borderRadius: 10,
              border: "1px solid rgba(124,108,255,0.55)",
              background: "rgba(124,108,255,0.07)",
              boxShadow: "0 0 40px 0 rgba(124,108,255,0.14)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#7C6CFF",
                flexShrink: 0,
                boxShadow: "0 0 10px #7C6CFF",
              }}
            />
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "#F5F3EF",
                textTransform: "uppercase",
              }}
            >
              Verdict: certified · grade 7 · 0 blockers open
            </span>
          </div>
        </div>

        <div
          style={{
            padding: 16,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "#111111",
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6B6B6B",
              marginBottom: 14,
            }}
          >
            Layer scorecard
          </div>
          <div style={{ display: "grid", gap: 9 }}>
            {LAYERS.map((layer) => (
              <div
                key={layer.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "88px 1fr 30px",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.08em",
                    color: layer.width === null ? "#6B6B6B" : "#A8A8A8",
                    textTransform: "uppercase",
                  }}
                >
                  {layer.label}
                </span>
                {layer.width === null ? (
                  <span
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background:
                        "repeating-linear-gradient(90deg,rgba(255,255,255,0.12) 0 6px,transparent 6px 12px)",
                      display: "block",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.07)",
                      display: "block",
                      overflow: "hidden",
                    }}
                  >
                    <span
                      style={{
                        display: "block",
                        height: "100%",
                        width: `${layer.width}%`,
                        borderRadius: 999,
                        background: layer.colour,
                      }}
                    />
                  </span>
                )}
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: layer.width === null ? 10 : 11,
                    color: layer.width === null ? "#6B6B6B" : "#F5F3EF",
                    textAlign: "right",
                  }}
                >
                  {layer.score}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.06)",
            background: "#111111",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 64px",
              gap: 12,
              padding: "11px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              fontFamily: MONO,
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#6B6B6B",
            }}
          >
            <span>Launch blocker</span>
            <span style={{ textAlign: "right" }}>State</span>
          </div>
          {BLOCKERS.map((label, i) => (
            <div
              key={label}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 64px",
                gap: 12,
                padding: "12px 16px",
                borderBottom:
                  i === BLOCKERS.length - 1
                    ? undefined
                    : "1px solid rgba(255,255,255,0.06)",
                alignItems: "center",
              }}
            >
              <span style={{ fontFamily: MONO, fontSize: 11, color: "#A8A8A8" }}>
                {label}
              </span>
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#5BC48A",
                  textAlign: "right",
                }}
              >
                Pass
              </span>
            </div>
          ))}
        </div>
      </div>
    </BrowserShell>
  );
}
