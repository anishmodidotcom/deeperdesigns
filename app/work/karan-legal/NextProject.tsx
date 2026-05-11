"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";

export default function NextProject() {
  const [hover, setHover] = useState(false);

  return (
    <section
      style={{
        borderTop: "1px solid var(--page-border)",
        background: hover ? "var(--page-surface-2)" : "var(--page-bg)",
        transition: "background 1s linear",
      }}
    >
      <Link
        href="/work/zara-fitness"
        data-cursor="view"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "block",
          paddingBlock: 112,
          paddingInline: 24,
        }}
      >
        <div
          className="container-x"
          style={{ maxWidth: 1100, marginInline: "auto" }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--page-text)",
              margin: 0,
              marginBottom: 32,
            }}
          >
            NEXT CASE · §015
          </p>
          <h3
            style={{
              fontFamily:
                "var(--font-spectral), 'Source Serif 4', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 500,
              fontSize: "clamp(48px, 7.4vw, 92px)",
              letterSpacing: "-0.02em",
              color: "var(--page-text)",
              margin: 0,
              lineHeight: 1.0,
            }}
          >
            Zara Fitness
          </h3>
          <p
            style={{
              fontSize: 17,
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 24,
              maxWidth: 680,
              lineHeight: 1.6,
            }}
          >
            An influencer with 280K followers and a static PDF workout
            guide. We built her a platform.{" "}
            <span
              style={{
                display: "inline-block",
                transform: hover
                  ? "translateX(12px)"
                  : "translateX(0)",
                transition:
                  "transform 1s cubic-bezier(0.7, 0, 0.3, 1)",
              }}
            >
              →
            </span>
          </p>
        </div>
      </Link>
    </section>
  );
}
