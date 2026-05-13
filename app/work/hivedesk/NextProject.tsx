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
          "linear-gradient(to bottom, var(--page-bg) 0%, #1A1208 100%)",
      }}
    >
      <Link
        href="/work/malabar-spice"
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
            color: hover ? "var(--page-accent)" : "var(--page-text-3)",
            margin: 0,
            marginBottom: 24,
            transition: "color 0.15s var(--ease-spring)",
          }}
        >
          NEXT STUDY
        </p>

        <h3
          style={{
            fontFamily: "var(--font-inter), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(40px, 6vw, 80px)",
            letterSpacing: "-0.04em",
            color: hover ? "var(--page-accent)" : "var(--page-text)",
            transition: "color 0.15s var(--ease-spring)",
            margin: 0,
            lineHeight: 1.0,
          }}
        >
          Malabar Spice House
        </h3>

        <p
          style={{
            fontSize: 17,
            color: "var(--page-text-2)",
            margin: 0,
            marginTop: 18,
            maxWidth: 640,
            marginInline: "auto",
            lineHeight: 1.5,
          }}
        >
          Heritage exporters who didn&rsquo;t need a tool. They needed a
          website that smells like Kochi.{" "}
          <span
            style={{
              display: "inline-block",
              transform: hover
                ? "translateX(8px)"
                : "translateX(0)",
              transition: "transform 0.15s var(--ease-spring)",
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
