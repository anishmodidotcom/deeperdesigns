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
          "linear-gradient(to bottom, var(--page-bg) 0%, var(--bg) 100%)",
      }}
    >
      <Link
        href="/work/hivedesk"
        data-cursor="view"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "block",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: hover ? "var(--page-accent)" : "var(--page-text-2)",
            margin: 0,
            marginBottom: 28,
            transition:
              "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          NEXT CASE
        </p>

        <h3
          style={{
            fontFamily:
              "var(--font-cormorant-display), Cormorant, Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(48px, 7vw, 92px)",
            letterSpacing: "-0.02em",
            color: hover ? "var(--accent)" : "var(--text)",
            transition:
              "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
            margin: 0,
            lineHeight: 1.0,
          }}
        >
          HiveDesk
        </h3>

        <p
          style={{
            fontSize: 18,
            color: hover ? "var(--text)" : "var(--text-2)",
            margin: 0,
            marginTop: 18,
            transition:
              "color 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          }}
        >
          Member retention reimagined{" "}
          <span
            style={{
              display: "inline-block",
              transform: hover ? "translateX(8px)" : "translateX(0)",
              transition:
                "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
            }}
          >
            →
          </span>
        </p>
      </Link>
    </section>
  );
}
