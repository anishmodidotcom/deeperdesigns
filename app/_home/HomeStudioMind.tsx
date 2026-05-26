import AnishNote from "@/components/AnishNote";

export default function HomeStudioMind() {
  return (
    <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        <AnishNote
          text="I've sat across a lot of founders. The good ones aren't waiting for permission. They're waiting for someone to look at their business with them and build the thing."
          align="right"
          variant="margin"
        />
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "40px", clear: "none" }}>
          We build the small tools that quietly make a business better.
        </h2>
        <p style={{ fontSize: "19px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "24px" }}>
          Most businesses don&apos;t need more advice. They need someone to sit with them, find the bottleneck, and build the thing that fixes it. That&apos;s our work.
        </p>
        <p style={{ fontSize: "19px", color: "var(--fg-muted)", lineHeight: 1.6, clear: "both" }}>
          Sometimes the answer is a dashboard. Sometimes a customer-facing tool. Sometimes a workflow nobody&apos;s mapped yet. We figure out which, then we ship it.
        </p>
      </div>
    </section>
  );
}
