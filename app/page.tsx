export default function Home() {
  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: 24,
      }}
    >
      <div>
        <p
          className="eyebrow"
          style={{
            fontSize: 12,
            color: "var(--text-3)",
            marginBottom: 16,
          }}
        >
          Deeper Designs
        </p>
        <h1
          style={{
            fontSize: "clamp(40px, 8vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            fontWeight: 500,
            margin: 0,
            color: "var(--text)",
          }}
        >
          Coming Soon
        </h1>
      </div>
    </section>
  );
}
