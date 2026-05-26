import EditorialPullQuote from "@/components/EditorialPullQuote";

export default function HomeFounderQuote() {
  return (
    <section
      style={{
        position: "relative",
        paddingBlock: "clamp(80px, 12vh, 120px)",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(99, 102, 241, 0.06) 0%, rgba(99, 102, 241, 0) 60%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative" }}>
        <EditorialPullQuote
          quote="The right tool for the smallest businesses used to cost a crore. AI changed the price. We changed who gets to build it."
          attribution="ANISH MODI · FOUNDER, DEEPER DESIGNS"
          accent="var(--dd-accent-primary)"
        />
      </div>
    </section>
  );
}
