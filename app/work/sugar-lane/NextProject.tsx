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
          "linear-gradient(180deg, var(--page-bg) 0%, #0F1828 100%)",
        color: "#FFFFFF",
      }}
    >
      <Link
        href="/work/brightpath"
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
              color: hover ? "#7DA9FF" : "var(--page-text-3)",
              margin: 0,
              marginBottom: 28,
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
            }}
          >
            NEXT · 020
          </p>
          <h3
            style={{
              fontFamily: "var(--font-body), 'DM Sans', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(64px, 12vw, 180px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: hover ? "#7DA9FF" : "var(--page-text)",
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
              margin: 0,
            }}
          >
            BrightPath
          </h3>
          <p
            style={{
              fontSize: 17,
              fontFamily: "var(--font-body), 'DM Sans', sans-serif",
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 24,
              maxWidth: 680,
              lineHeight: 1.7,
            }}
          >
            An Al Ain tutoring practice run by a former teacher. We
            built him a parent portal that does the talking.{" "}
            <span
              style={{
                display: "inline-block",
                transform: hover ? "translateX(12px)" : "translateX(0)",
                transition:
                  "transform 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
                color: hover ? "#7DA9FF" : "var(--page-text-2)",
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
