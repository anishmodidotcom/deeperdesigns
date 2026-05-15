"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";

export default function NextProject() {
  const [hover, setHover] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        paddingBlock: 144,
        background:
          "linear-gradient(to bottom, var(--page-bg) 0%, #0B100A 100%)",
      }}
    >
      <Link
        href="/work/sahaja-farms"
        data-cursor="view"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ display: "block", textAlign: "center" }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: hover ? "var(--page-accent)" : "var(--page-text-3)",
            margin: 0,
            marginBottom: 24,
            transition: "color 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          NEXT STUDY · 013
        </p>

        <h3
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(44px, 6.4vw, 84px)",
            letterSpacing: "-0.025em",
            color: hover ? "var(--page-accent)" : "var(--page-text)",
            transition: "color 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            margin: 0,
            lineHeight: 1.0,
          }}
        >
          Sahaja Farms
        </h3>

        <p
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 20,
            maxWidth: 620,
            marginInline: "auto",
            lineHeight: 1.6,
          }}
        >
          200 organic acres outside Mysore. A farm dashboard that predicts
          what to plant.{" "}
          <span
            style={{
              display: "inline-block",
              transform: hover
                ? "translateX(10px)"
                : "translateX(0)",
              transition:
                "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
              color: hover ? "var(--page-accent)" : "var(--page-text-2)",
            }}
          >
            →
          </span>
        </p>
      </Link>
    </section>
  );
}
