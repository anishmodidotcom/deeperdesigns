const POINTS = [
  { n: "01", t: "The tools are easy", b: "Claude, ChatGPT, Cursor, Vercel. Anyone can use them. They are commodity. We use the best one for each job and switch when something better drops next month." },
  { n: "02", t: "Knowing what to build is the hard part", b: "Ten years of running businesses. We know what is worth building because we have spent a decade fixing how businesses actually run." },
  { n: "03", t: "Taste does not come from a prompt", b: "A prompt gives you a wireframe. We give you a product. Brand, copy, interaction design, conversion logic, mobile behavior. Twenty hand-tuned details between a demo and a deliverable." },
  { n: "04", t: "You get a system, not a screenshot", b: "Code you own. Documentation you can hand off. A working tool, not a screenshot of one. Built to grow with your business, not to be redone in six months." },
];

export default function HomeWhyNotDIY() {
  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>04 · WHY NOT DO IT YOURSELF</p>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "80px", maxWidth: "880px" }}>
          AI can generate interfaces. It cannot understand your business.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "48px" }}>
          {POINTS.map(p => (
            <div key={p.n}>
              <p className="mono" style={{ color: "var(--accent)", marginBottom: "16px" }}>{p.n}</p>
              <h3 style={{ fontSize: "var(--fs-h3)", fontWeight: 500, marginBottom: "16px", lineHeight: 1.3 }}>{p.t}</h3>
              <p style={{ fontSize: "15px", color: "var(--fg-muted)", lineHeight: 1.6 }}>{p.b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
