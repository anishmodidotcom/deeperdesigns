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
          "linear-gradient(180deg, var(--page-surface-1) 0%, #1F140C 100%)",
        color: "#F5EFE3",
      }}
    >
      <Link
        href="/work/kadak-chai"
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
              color: hover ? "var(--page-accent)" : "#A6968A",
              margin: 0,
              marginBottom: 28,
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
            }}
          >
            NEXT · 017
          </p>
          <h3
            style={{
              fontFamily:
                "var(--font-display-script), 'DM Serif Display', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(60px, 11vw, 160px)",
              letterSpacing: "-0.01em",
              lineHeight: 0.95,
              color: hover ? "var(--page-accent)" : "#F5EFE3",
              transition: "color 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
              margin: 0,
            }}
          >
            Kadak Chai
          </h3>
          <p
            style={{
              fontSize: 17,
              color: "#C8B8AB",
              margin: 0,
              marginTop: 24,
              maxWidth: 680,
              lineHeight: 1.6,
            }}
          >
            A Mumbai tea brand by a third-generation tea family. We built them
            packaging, a tasting club, and a site that reads like a strong
            cup.{" "}
            <span
              style={{
                display: "inline-block",
                transform: hover ? "translateX(12px)" : "translateX(0)",
                transition:
                  "transform 0.4s cubic-bezier(0.7, 0, 0.2, 1)",
                color: hover ? "var(--page-accent)" : "#C8B8AB",
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
