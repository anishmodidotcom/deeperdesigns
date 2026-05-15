"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";

export default function NextProject() {
  const [hover, setHover] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        paddingBlock: 96,
        background:
          "linear-gradient(to bottom, var(--page-bg) 0%, var(--bg) 100%)",
      }}
    >
      <Link
        href="/work/autobazaar"
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
            color: "var(--page-text-2)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          NEXT STUDY · 007
        </p>

        <h3
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: hover ? "var(--accent)" : "var(--text)",
            transition: "color var(--t-base) var(--ease-spring)",
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          AutoBazaar
        </h3>

        <p
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            margin: 0,
            marginTop: 12,
          }}
        >
          Dynamic Pricing
        </p>
      </Link>
    </section>
  );
}
