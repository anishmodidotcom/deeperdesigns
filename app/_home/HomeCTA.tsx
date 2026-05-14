"use client";

export default function HomeCTA() {
  const onExplore = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const el = document.getElementById("gallery");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: "880px" }}>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "32px" }}>
          What could you build next?
        </h2>
        <p style={{ fontSize: "18px", color: "var(--fg-muted)", maxWidth: "600px", marginInline: "auto", marginBottom: "40px" }}>
          If something here made you think of your business, that&apos;s the point. Let&apos;s see what we can build.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#gallery" onClick={onExplore} className="btn-outline">Let&apos;s explore ideas</a>
          <a href="/start-your-study" className="btn-whatsapp">Talk to us</a>
        </div>
      </div>
    </section>
  );
}
