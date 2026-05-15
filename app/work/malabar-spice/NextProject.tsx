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
          "linear-gradient(to bottom, var(--page-bg) 0%, #1A2220 100%)",
      }}
    >
      <Link
        href="/work/pawstay"
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
            letterSpacing: "0.18em",
            color: hover ? "var(--page-accent)" : "var(--page-text-3)",
            margin: 0,
            marginBottom: 24,
            transition:
              "color 0.9s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          NEXT STUDY · 012
        </p>

        <h3
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(48px, 7vw, 96px)",
            letterSpacing: "-0.03em",
            color: hover ? "var(--page-accent)" : "var(--page-text)",
            transition:
              "color 0.9s cubic-bezier(0.25, 1, 0.5, 1)",
            margin: 0,
            lineHeight: 1.0,
            fontVariationSettings: "'opsz' 144",
          }}
        >
          PawStay
        </h3>

        <p
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 22,
            maxWidth: 640,
            marginInline: "auto",
            lineHeight: 1.65,
          }}
        >
          A dog boarding daycare in Delhi. A pet portal for anxious
          parents.{" "}
          <span
            style={{
              display: "inline-block",
              transform: hover
                ? "translateX(10px)"
                : "translateX(0)",
              transition:
                "transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)",
              color: hover
                ? "var(--page-accent)"
                : "var(--page-text-2)",
            }}
          >
            →
          </span>
        </p>
      </Link>
    </section>
  );
}
