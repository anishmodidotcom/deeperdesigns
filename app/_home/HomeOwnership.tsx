import { renderSerif } from "@/components/industry/text";

// v26 Part 1: the ownership layer. Sits directly beneath the hero, above
// the confusion block. Deliberately quiet: no cards, no icons, no grid.
// The hero is untouched; this is the story that follows it.

const LINES = [
  "Built for your workflow, not a template you bend yourself around.",
  // v35 part 2.5: the mechanics line moves to /services, where it is
  // stated once. What remains true without it stays.
  "One price, agreed before we start. No per-seat meter.",
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
          Every business runs on systems. Some were built on purpose. Some grew
          by accident. Some were never built, and the business has been paying
          for their absence without noticing. Owners build the systems they
          understand: a sales founder builds sales, an operator builds
          operations, and the rest waits. That is where the next level is.
          Around one crore, the systems are the owner&rsquo;s habits. Around ten
          crore, they are a few tools and a few key people. Around a hundred
          crore, they are departments with software and controls. A business
          that wants to move up a level builds the next level&rsquo;s systems
          before the revenue arrives, not after.
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
        {/* v27 voice line, closing the ownership section. */}
        <p
          style={{
            marginTop: "32px",
            fontSize: "17px",
            lineHeight: 1.6,
            color: "var(--fg)",
            maxWidth: "680px",
          }}
        >
          Custom built systems that are safe, secure, owned by you, and
          maintained by us.
        </p>
      </div>
    </section>
  );
}
