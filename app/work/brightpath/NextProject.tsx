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
          "linear-gradient(180deg, var(--page-bg) 0%, #2D1810 100%)",
      }}
    >
      <Link
        href="/work/veda-glow"
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
              color: hover ? "var(--page-accent)" : "var(--page-text-3)",
              margin: 0,
              marginBottom: 28,
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
            }}
          >
            BACK TO THE START · 001
          </p>
          <h3
            style={{
              fontFamily:
                "var(--font-display-academic), 'Source Serif 4', 'Times New Roman', serif",
              fontWeight: 500,
              fontSize: "clamp(64px, 12vw, 180px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
              color: hover ? "var(--page-accent)" : "var(--page-text)",
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
              margin: 0,
            }}
          >
            <em style={{ fontStyle: "italic", fontWeight: 400 }}>
              Veda Glow
            </em>
          </h3>
          <p
            style={{
              fontSize: 17,
              fontFamily:
                "var(--font-body-soft), 'Source Sans 3', sans-serif",
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 24,
              maxWidth: 680,
              lineHeight: 1.7,
            }}
          >
            Twenty tools. Twenty businesses. The loop closes where it
            opened: a skincare brand built around a skin advisor that
            actually pays attention.{" "}
            <span
              style={{
                display: "inline-block",
                transform: hover ? "translateX(12px)" : "translateX(0)",
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
