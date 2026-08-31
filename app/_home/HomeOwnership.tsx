import { renderSerif } from "@/components/industry/text";

// v26 Part 1: the ownership layer. Sits directly beneath the hero, above
// the confusion block. Deliberately quiet: no cards, no icons, no grid.
// The hero is untouched; this is the story that follows it.

const LINES = [
  "Built for your workflow, not a template you bend yourself around.",
  "One price, agreed in writing before we start. No per-seat meter.",
  "You own the software and the data. We hand over everything.",
];

export default function HomeOwnership() {
  return (
    <section style={{ padding: "calc(var(--section-py) * 0.6) 0" }}>
      <div className="container">
        <h2
          style={{
            fontSize: "var(--fs-h1)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginBottom: "32px",
            maxWidth: "880px",
          }}
        >
          {renderSerif(
            "The software big companies pay crores for {serif}can now be built for you.{/serif}",
          )}
        </h2>
        <p
          style={{
            fontSize: "18px",
            lineHeight: 1.65,
            color: "var(--fg-muted)",
            maxWidth: "760px",
            margin: "0 0 40px",
          }}
        >
          Salesforce, SAP, and the rest were built for companies with hundreds
          of people and budgets to match. You have been quoted lakhs for
          software that almost fits, then charged again for every new person
          who logs in. That maths has changed. The same tools can now be built
          around exactly how your business runs, for a fraction of that, in
          weeks. And they belong to you.
        </p>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            maxWidth: "680px",
          }}
        >
          {LINES.map((line) => (
            <li
              key={line}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "14px",
                fontSize: "17px",
                lineHeight: 1.55,
                color: "var(--fg)",
              }}
            >
              <span
                aria-hidden
                style={{
                  flexShrink: 0,
                  marginTop: "10px",
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "var(--accent)",
                }}
              />
              {line}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
