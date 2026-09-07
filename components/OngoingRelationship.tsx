import { renderSerif } from "@/components/industry/text";

// v30 part 7: the ongoing relationship. Rendered on /about and on /trust,
// because it answers the same question on both: what happens after the
// system is live. Copy is final and verbatim.

export default function OngoingRelationship() {
  return (
    <section
      style={{ padding: "var(--section-py) 0" }}
      aria-label="The ongoing relationship"
    >
      <div className="container" style={{ maxWidth: "880px" }}>
        <h2
          style={{
            fontSize: "var(--fs-h2)",
            fontWeight: 500,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            margin: "0 0 24px",
          }}
        >
          {renderSerif(
            "Your business changes. {serif}The system changes with it.{/serif}",
          )}
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(17px, 1vw + 12px, 20px)",
            lineHeight: 1.65,
            color: "var(--fg-muted)",
            maxWidth: "68ch",
            textWrap: "pretty",
          }}
        >
          Once a system is live, the work is not over. Every month we look at
          the number we agreed on, tell you what it says, and decide the next
          change: a new workflow, a new integration, better logic, a new
          experiment. Not maintenance. Forward motion.
        </p>
      </div>
    </section>
  );
}
