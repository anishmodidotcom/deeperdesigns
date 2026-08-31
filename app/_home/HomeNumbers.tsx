// v28 Part 6: the numbers strip. Only genuinely countable figures, each
// checked against the codebase before shipping:
//   24  showcase entries in lib/showcases.ts, and 24 dirs under app/work
//    4  entries carrying a liveUrl (Outpost, Oviya Studio, Deeper Content,
//       Maple Lens)
//   13  industries with live: true in lib/industries.ts
// v28.1: the fourth slot ("7 days to a small build") is removed. A bare 7
// beside a hero that guarantees 30 days invites a question, and it read
// closer to a promise than the three counted figures beside it. Speed stays
// where it is framed properly, in the how-it-works step, unchanged.
//
// No percentages, no client counts, no savings claims, no growth figures.

const NUMBERS = [
  { value: "24", label: "builds shipped" },
  { value: "4", label: "live products running" },
  { value: "13", label: "industries covered" },
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
          grid-template-columns: repeat(3, 1fr);
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
          .nums-grid { grid-template-columns: repeat(3, 1fr); }
          .nums-cell { padding: 26px 18px; }
        }
      `}</style>
    </section>
  );
}
