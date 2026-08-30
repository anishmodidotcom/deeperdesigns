"use client";

import { Link } from "next-view-transitions";
import { INDUSTRIES } from "@/lib/industries";

// Footer-level strip listing the other industries as chips linking to
// /for/{slug}, mirroring the ShowcaseNavigator spirit. The current one is
// marked and not a link.
export default function IndustrySwitcher({ currentSlug }: { currentSlug: string }) {
  return (
    <section
      style={{
        borderTop: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        paddingBlock: "clamp(48px, 7vh, 88px)",
      }}
      aria-label="Browse by industry"
    >
      <div className="container" style={{ maxWidth: "var(--dd-container-max, 1280px)" }}>
        <p
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.16em",
            color: "var(--dd-text-low, #808080)",
            margin: "0 0 24px",
          }}
        >
          BROWSE BY INDUSTRY · {String(INDUSTRIES.length).padStart(2, "0")}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          {INDUSTRIES.map((ind) => {
            const active = ind.slug === currentSlug;
            if (active) {
              return (
                <span
                  key={ind.slug}
                  aria-current="page"
                  style={{
                    fontSize: 14,
                    color: "#0A0A0A",
                    background: "var(--page-accent)",
                    border: "1px solid var(--page-accent)",
                    borderRadius: 999,
                    padding: "9px 16px",
                    fontWeight: 600,
                  }}
                >
                  {ind.name}
                </span>
              );
            }
            return (
              <Link
                key={ind.slug}
                href={`/for/${ind.slug}`}
                className="ind-switcher-chip"
                style={{
                  fontSize: 14,
                  color: "var(--dd-text-mid, #A8A8A8)",
                  border: "1px solid var(--dd-border-strong, rgba(255,255,255,0.16))",
                  borderRadius: 999,
                  padding: "9px 16px",
                  textDecoration: "none",
                  transition: "color 150ms, border-color 150ms, background 150ms",
                }}
              >
                {ind.name}
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        .ind-switcher-chip:hover {
          color: var(--dd-text-high, #F5F5F5);
          border-color: var(--dd-text-high, #F5F5F5);
          background: rgba(255,255,255,0.04);
        }
        .ind-switcher-chip:active { transform: translateY(1px); }
      `}</style>
    </section>
  );
}
