export default function HomeStudioMind() {
  return (
    <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        <p className="eyebrow" style={{ marginBottom: "24px" }}>03 · THE THINKING</p>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "40px" }}>
          We help businesses build the small tools that quietly make them better.
        </h2>
        <p style={{ fontSize: "19px", color: "var(--fg-muted)", lineHeight: 1.6, marginBottom: "24px" }}>
          We don&apos;t sell templates. We don&apos;t resell software. We sit with a business, find what is leaking time, what is frustrating customers, what has been broken for years, and we design a focused system around it.
        </p>
        <p style={{ fontSize: "19px", color: "var(--fg-muted)", lineHeight: 1.6 }}>
          Sometimes the answer is a tool. Sometimes a workflow. Sometimes an interface that did not exist yet. The thing we sell is judgment about which one your business actually needs.
        </p>
      </div>
    </section>
  );
}
