// v28 Part 6: the numbers strip. Only genuinely countable figures, each
// checked against the codebase before shipping:
//   24  showcase entries in lib/showcases.ts, and 24 dirs under app/work
//    4  entries carrying a liveUrl (Outpost, Oviya Studio, Deeper Content,
//       Maple Lens)
//   13  industries with live: true in lib/industries.ts
//    7  the one figure that is a capability claim rather than a repo fact.
//       Flagged in the PR. Part 7's rule stands everywhere else: seven days
//       is always "as little as", never a promise, and the guarantee
//       sentence is the only commitment.
//
// No percentages, no client counts, no savings claims, no growth figures.

const NUMBERS = [
  { value: "24", label: "builds shipped" },
  { value: "4", label: "live products running" },
  { value: "13", label: "industries covered" },
  { value: "7", label: "days to a small build" },
];

export default function HomeNumbers() {
  return (
    <section style={{ padding: "calc(var(--section-py) * 0.45) 0" }}>
      <div className="container">
        <dl className="nums-grid">
          {NUMBERS.map((n) => (
            <div key={n.label} className="nums-cell">
              <dt
                style={{
                  fontSize: "clamp(30px, 4vw, 44px)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "var(--fg)",
                  lineHeight: 1,
                }}
              >
                {n.value}
              </dt>
              <dd
                className="mono"
                style={{
                  margin: "10px 0 0",
                  fontSize: "11px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--dd-eyebrow-on-dark)",
                }}
              >
                {n.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <style>{`
        .nums-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border-block: 1px solid var(--border);
          margin: 0;
        }
        .nums-cell {
          background: var(--bg);
          padding: 32px 24px;
        }
        @media (max-width: 767px) {
          .nums-grid { grid-template-columns: repeat(2, 1fr); }
          .nums-cell { padding: 26px 18px; }
        }
      `}</style>
    </section>
  );
}
