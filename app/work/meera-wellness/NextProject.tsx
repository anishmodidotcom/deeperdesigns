"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";

export default function NextProject() {
  const [hover, setHover] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        paddingBlock: 128,
        background: "#0A0A0A",
        color: "#F7F8F8",
      }}
    >
      <Link
        href="/work/zaatar-republic"
        data-cursor="view"
        style={{ display: "block", textAlign: "center" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "rgba(247,248,248,0.7)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          NEXT STUDY · 004
        </p>

        <h3
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: hover ? "#7DA08E" : "#F7F8F8",
            transition: "color var(--t-base) var(--ease-spring)",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          Zaatar Republic
        </h3>

        <p
          style={{
            fontSize: 18,
            color: "rgba(247,248,248,0.6)",
            margin: 0,
            marginTop: 12,
          }}
        >
          Operations Intelligence
        </p>
      </Link>
    </section>
  );
}
