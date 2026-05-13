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
          "linear-gradient(180deg, var(--page-bg) 0%, #F5E6E0 100%)",
      }}
    >
      <Link
        href="/work/sugar-lane"
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
              fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: hover ? "#C44536" : "var(--page-text-3)",
              margin: 0,
              marginBottom: 28,
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
            }}
          >
            NEXT STUDY · 019
          </p>
          <h3
            style={{
              fontFamily:
                "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
              fontWeight: 500,
              fontSize: "clamp(64px, 12vw, 180px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: hover ? "#C44536" : "var(--page-text)",
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
              margin: 0,
            }}
          >
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>
              Sugar Lane
            </em>
          </h3>
          <p
            style={{
              fontSize: 17,
              fontFamily:
                "var(--font-body-clean), 'Inter', system-ui, sans-serif",
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 24,
              maxWidth: 680,
              lineHeight: 1.7,
            }}
          >
            A home bakery in Abu Dhabi. We built her an order studio
            people genuinely enjoy filling out.{" "}
            <span
              style={{
                display: "inline-block",
                transform: hover ? "translateX(12px)" : "translateX(0)",
                transition:
                  "transform 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
                color: hover ? "#C44536" : "var(--page-text-2)",
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
