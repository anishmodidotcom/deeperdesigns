"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { SHOWCASES } from "@/lib/showcases";
import ProductFragment from "./ProductFragment";

const OBJECTIVES = ["Customer Experience", "Operations", "Growth", "Founder Overload"];
const INDUSTRIES = [
  "F&B / Restaurants",
  "Wellness / Beauty / Skincare",
  "Retail / D2C",
  "Professional Services",
  "Manufacturing / Industrial",
  "Hospitality / Travel",
  "Healthcare / Clinics",
  "Creative / Studios",
  "Agriculture / Farms",
];

export default function HomeGallery() {
  const [objectives, setObjectives] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, val: string) => {
    set(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);
  };

  const filtered = useMemo(() => {
    return SHOWCASES.filter(s => {
      const objMatch =
        objectives.length === 0 ||
        (s.objectives || []).some((o) => objectives.includes(o));
      const indMatch =
        industries.length === 0 ||
        (s.industries || []).some((i) => industries.includes(i));
      return objMatch && indMatch;
    });
  }, [objectives, industries]);

  const hasFilters = objectives.length > 0 || industries.length > 0;

  return (
    <section id="gallery" style={{ padding: "var(--section-py) 0" }}>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "16px", color: "var(--accent)" }}>
          {SHOWCASES.length} BUILT · MORE COMING
        </p>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px", maxWidth: "900px" }}>
          What kind of tool would change everything for you?
        </h2>
        <p style={{ fontSize: "17px", color: "var(--fg-muted)", maxWidth: "640px", marginBottom: "40px" }}>
          Pick a lane, or scroll. We&apos;ve imagined tools for every kind of business.
        </p>

        {/* Filter rows */}
        <div style={{ marginBottom: "16px" }}>
          <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "10px" }}>BY OBJECTIVE</p>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px", scrollbarWidth: "none" }} className="filter-row">
            {OBJECTIVES.map(o => {
              const active = objectives.includes(o);
              return (
                <button
                  key={o}
                  aria-pressed={active}
                  onClick={() => toggle(objectives, setObjectives, o)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    whiteSpace: "nowrap",
                    border: "1px solid",
                    borderColor: active ? "var(--accent)" : "var(--border-strong)",
                    background: active ? "var(--accent)" : "transparent",
                    // v25.5: white on the indigo accent is 3.86:1 at 13px, an AA

                    // fail. The near-black label used on every other accent-filled

                    // control is 5.13:1 and matches the rest of the system.

                    color: active ? "#0A0A0A" : "var(--fg-muted)",
                    transition: "all 200ms",
                  }}
                >
                  {o}
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "10px" }}>BY INDUSTRY</p>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px", scrollbarWidth: "none" }} className="filter-row">
            {INDUSTRIES.map(i => {
              const active = industries.includes(i);
              return (
                <button
                  key={i}
                  aria-pressed={active}
                  onClick={() => toggle(industries, setIndustries, i)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    whiteSpace: "nowrap",
                    border: "1px solid",
                    borderColor: active ? "var(--accent)" : "var(--border-strong)",
                    background: active ? "var(--accent)" : "transparent",
                    // v25.5: white on the indigo accent is 3.86:1 at 13px, an AA

                    // fail. The near-black label used on every other accent-filled

                    // control is 5.13:1 and matches the rest of the system.

                    color: active ? "#0A0A0A" : "var(--fg-muted)",
                    transition: "all 200ms",
                  }}
                >
                  {i}
                </button>
              );
            })}
          </div>
        </div>

        {hasFilters && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <p style={{ fontSize: "14px", color: "var(--fg-muted)" }}>
              {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
            </p>
            <button
              onClick={() => { setObjectives([]); setIndustries([]); }}
              style={{ fontSize: "13px", color: "var(--accent)" }}
            >
              Clear filters
            </button>
          </div>
        )}

        {/* The Pool: bordered container, 5x5 grid on desktop, horizontal slider on mobile */}
        <div className="gallery-pool">
          {/* Desktop / tablet grid */}
          <div className="gallery-grid">
            {SHOWCASES.map((s) => {
              const isVisible = filtered.includes(s);
              return (
                <Link
                  key={s.slug}
                  href={`/work/${s.slug}`}
                  className="gallery-card"
                  data-dim={!isVisible ? "true" : undefined}
                  aria-hidden={!isVisible}
                  tabIndex={!isVisible ? -1 : 0}
                  style={{ ["--card-accent" as string]: `var(--page-accent-${s.slug})` }}
                >
                  {s.live && (
                    <span className="live-badge">LIVE</span>
                  )}
                  <div className="card-fragment">
                    <ProductFragment slug={s.slug} />
                  </div>
                  <div className="card-meta">
                    <p className="card-label">{s.cardLabel}</p>
                  </div>
                  <div className="card-outcome">
                    <p className="outcome-text">{s.outcome}</p>
                  </div>
                </Link>
              );
            })}
            {/* Placeholder cards: 24 builds + 1 placeholder = 25 slots on the 5x5 grid */}
            {[1].map((n) => (
              <div key={`placeholder-${n}`} className="gallery-placeholder">
                <span>+ MORE COMING</span>
              </div>
            ))}
          </div>

          {/* Mobile horizontal slider */}
          <div className="gallery-slider">
            {filtered.map((s) => (
              <Link
                key={`m-${s.slug}`}
                href={`/work/${s.slug}`}
                className="slider-card"
                style={{ ["--card-accent" as string]: `var(--page-accent-${s.slug})` }}
              >
                {s.live && <span className="live-badge">LIVE</span>}
                <div className="card-fragment">
                  <ProductFragment slug={s.slug} />
                </div>
                <div className="card-meta">
                  <p className="card-label">{s.cardLabel}</p>
                  <p className="card-outcome-mobile">{s.outcome}</p>
                </div>
              </Link>
            ))}
            {filtered.length === 0 && (
              <div className="slider-empty">
                <p style={{ fontSize: "16px", marginBottom: "8px" }}>Nothing yet for that combination.</p>
                <p style={{ color: "var(--fg-muted)", fontSize: "13px" }}>Tell us about it. We&apos;ll figure out what to build.</p>
              </div>
            )}
          </div>
        </div>

        {/* Empty state for desktop grid when no matches */}
        {hasFilters && filtered.length === 0 && (
          <div className="gallery-empty">
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>Nothing yet for that combination.</p>
            <p style={{ color: "var(--fg-muted)", marginBottom: "20px" }}>Tell us about it. We&apos;ll figure out what to build.</p>
            <a href="/start-your-study" className="btn-outline">Talk to us</a>
          </div>
        )}
      </div>

      <style>{`
        .gallery-pool {
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 20px;
          background: var(--bg-elev);
        }
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 14px;
        }
        .gallery-slider { display: none; }

        .gallery-card {
          position: relative;
          aspect-ratio: 1 / 1;
          border-radius: 10px;
          background: var(--bg-card);
          border: 1px solid var(--border);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: all 280ms cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          text-decoration: none;
          color: var(--fg);
        }
        .gallery-card[data-dim="true"] {
          opacity: 0.18;
          pointer-events: none;
          filter: grayscale(0.6);
        }
        .gallery-card {
          transition: transform 240ms var(--ease-out), border-color 240ms var(--ease-out), box-shadow 240ms var(--ease-out);
        }
        .gallery-card:hover {
          transform: translateY(-3px);
          border-color: color-mix(in srgb, var(--card-accent, var(--accent)) 80%, transparent);
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--card-accent, var(--accent)) 80%, transparent),
            inset 0 0 60px color-mix(in srgb, var(--card-accent, var(--accent)) 10%, transparent),
            0 16px 40px rgba(0, 0, 0, 0.25);
        }
        .gallery-card:hover .outcome-text {
          color: var(--dd-text-high);
        }
        .card-fragment {
          flex: 1;
          min-height: 60%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-meta {
          padding: 8px 10px 10px;
          border-top: 1px solid var(--border);
          transition: all 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-card:hover .card-meta {
          opacity: 0;
        }
        .card-label {
          font-size: 11px;
          line-height: 1.25;
          color: var(--fg);
          font-weight: 500;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .card-outcome {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -100%;
          padding: 10px 12px;
          background: linear-gradient(180deg, transparent 0%, rgba(124,108,255,0.16) 100%);
          backdrop-filter: blur(2px);
          border-top: 1px solid var(--accent);
          transition: bottom 280ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .gallery-card:hover .card-outcome {
          bottom: 0;
        }
        .outcome-text {
          font-size: 10px;
          color: var(--dd-text-mid);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          line-height: 1.3;
          transition: color 240ms var(--ease-out);
        }
        .live-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          z-index: 2;
          padding: 2px 7px;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.08em;
          background: var(--whatsapp);
          color: #0A0A0A;
          border-radius: 999px;
          animation: livePulseSmall 2s infinite;
        }
        @keyframes livePulseSmall {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); }
          50% { box-shadow: 0 0 0 5px rgba(37,211,102,0); }
        }

        .gallery-placeholder {
          aspect-ratio: 1 / 1;
          border-radius: 10px;
          border: 1px dashed var(--border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.4;
        }
        .gallery-placeholder span {
          font-size: 9px;
          color: var(--fg-dim);
          font-family: var(--font-geist-mono), monospace;
          letter-spacing: 0.12em;
        }

        .gallery-empty {
          padding: 80px 24px;
          text-align: center;
        }

        @media (max-width: 1023px) and (min-width: 640px) {
          .gallery-grid { grid-template-columns: repeat(4, 1fr); }
        }

        @media (max-width: 639px) {
          .gallery-pool {
            padding: 12px;
            border: none;
            background: transparent;
            margin-inline: calc(var(--container-px) * -1);
            padding-inline: var(--container-px);
          }
          .gallery-grid { display: none; }
          .gallery-slider {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            scroll-padding-inline: var(--container-px);
            padding-bottom: 8px;
            scrollbar-width: none;
          }
          .gallery-slider::-webkit-scrollbar { display: none; }
          .slider-card {
            flex: 0 0 70vw;
            max-width: 280px;
            aspect-ratio: 4 / 5;
            border-radius: 12px;
            background: var(--bg-card);
            border: 1px solid var(--border);
            overflow: hidden;
            scroll-snap-align: start;
            display: flex;
            flex-direction: column;
            position: relative;
            text-decoration: none;
            color: var(--fg);
          }
          .slider-card .card-fragment {
            flex: 1;
          }
          .slider-card .card-meta {
            padding: 12px 14px 14px;
            border-top: 1px solid var(--border);
          }
          .slider-card .card-label {
            font-size: 13px;
            -webkit-line-clamp: 2;
            margin-bottom: 6px;
          }
          .card-outcome-mobile {
            font-size: 10px;
            color: var(--accent);
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }
          .slider-empty {
            flex: 0 0 80vw;
            padding: 40px 20px;
            text-align: center;
            border: 1px dashed var(--border-strong);
            border-radius: 12px;
          }
        }
      `}</style>
    </section>
  );
}
