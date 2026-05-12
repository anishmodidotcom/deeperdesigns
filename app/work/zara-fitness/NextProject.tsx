"use client";

import { useState } from "react";
import { Link } from "next-view-transitions";

export default function NextProject() {
  const [hover, setHover] = useState(false);

  return (
    <section
      style={{
        position: "relative",
        background:
          "linear-gradient(to bottom, var(--page-bg) 0%, #2A1810 100%)",
      }}
    >
      <Link
        href="/work/earth-and-fire"
        data-cursor="view"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "block",
          paddingBlock: 144,
          paddingInline: 24,
          borderTop: "1px solid var(--page-border)",
        }}
      >
        <div className="container-x">
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: hover ? "var(--page-accent)" : "var(--page-text-2)",
              margin: 0,
              marginBottom: 28,
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
            }}
          >
            NEXT STUDY · 016
          </p>
          <h3
            style={{
              fontFamily: "var(--font-anton), Impact, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(72px, 14vw, 200px)",
              letterSpacing: "-0.01em",
              lineHeight: 0.92,
              color: hover ? "var(--page-accent)" : "var(--page-text)",
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
              margin: 0,
              textTransform: "uppercase",
            }}
          >
            Earth &amp; Fire
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
            A 26-year-old ceramicist in Jaipur. We built her a pottery
            experience, not a Shopify store.{" "}
            <span
              style={{
                display: "inline-block",
                transform: hover
                  ? "translateX(12px)"
                  : "translateX(0)",
                transition:
                  "transform 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
                color: hover ? "var(--page-accent)" : "var(--page-text-2)",
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
