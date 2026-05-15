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
          "linear-gradient(to bottom, var(--page-bg) 0%, #14141E 100%)",
      }}
    >
      <Link
        href="/work/karan-legal"
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
            transition: "color 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          NEXT STUDY · 014
        </p>

        <h3
          style={{
            fontFamily:
              "var(--font-bricolage), Georgia, serif",
            fontWeight: 600,
            fontSize: "clamp(48px, 7vw, 96px)",
            letterSpacing: "-0.04em",
            color: hover ? "var(--page-accent)" : "var(--page-text)",
            transition: "color 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            margin: 0,
            lineHeight: 1.0,
            fontVariationSettings: "'opsz' 96",
          }}
        >
          Karan Legal
        </h3>

        <p
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 22,
            maxWidth: 680,
            marginInline: "auto",
            lineHeight: 1.6,
          }}
        >
          A solo startup lawyer in Mumbai drowning in template work. A
          lead qualifier that filters before he ever picks up.{" "}
          <span
            style={{
              display: "inline-block",
              transform: hover
                ? "translateX(10px)"
                : "translateX(0)",
              transition:
                "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
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
