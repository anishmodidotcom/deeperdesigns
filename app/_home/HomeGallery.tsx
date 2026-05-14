"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { SHOWCASES, OBJECTIVES, INDUSTRIES } from "@/lib/showcases";

const AMBIENT_SLUGS = new Set([
  "zaatar-republic",
  "smilefirst",
  "autobazaar",
  "stumpvision",
  "pawstay",
  "malabar-spice",
  "hivedesk",
  "maplelens",
]);

function thumbFor(slug: string, fallback: string) {
  return AMBIENT_SLUGS.has(slug) ? `/images/_ambient/${slug}.webp` : fallback;
}

export default function HomeGallery() {
  const [objectives, setObjectives] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);

  const toggle = (list: string[], set: (v: string[]) => void, val: string) => {
    set(list.includes(val) ? list.filter(x => x !== val) : [...list, val]);
  };

  const filtered = useMemo(() => {
    return SHOWCASES.filter(s => {
      const objMatch = objectives.length === 0 || s.objectives.some(o => objectives.includes(o));
      const indMatch = industries.length === 0 || s.industries.some(i => industries.includes(i));
      return objMatch && indMatch;
    });
  }, [objectives, industries]);

  return (
    <section id="gallery" style={{ padding: "var(--section-py) 0", scrollMarginTop: "96px" }}>
      <div className="container">
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px", maxWidth: "900px" }}>
          What kind of tool would change everything for you?
        </h2>
        <p style={{ fontSize: "17px", color: "var(--fg-muted)", maxWidth: "640px", marginBottom: "48px" }}>
          Pick a lane, or scroll. We&apos;ve imagined tools for 21 kinds of business.
        </p>

        <div style={{ marginBottom: "16px" }}>
          <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "12px" }}>BY OBJECTIVE</p>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
            {OBJECTIVES.map(o => {
              const active = objectives.includes(o);
              return (
                <button key={o} onClick={() => toggle(objectives, setObjectives, o)} style={{ padding: "8px 16px", borderRadius: "999px", fontSize: "13px", whiteSpace: "nowrap", border: "1px solid", borderColor: active ? "var(--accent)" : "var(--border-strong)", background: active ? "var(--accent)" : "transparent", color: active ? "#fff" : "var(--fg-muted)", transition: "all 200ms" }}>{o}</button>
              );
            })}
          </div>
        </div>

        <div style={{ marginBottom: "48px" }}>
          <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "12px" }}>BY INDUSTRY</p>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "8px", scrollbarWidth: "none" }}>
            {INDUSTRIES.filter(i => i !== "Other").map(i => {
              const active = industries.includes(i);
              return (
                <button key={i} onClick={() => toggle(industries, setIndustries, i)} style={{ padding: "8px 16px", borderRadius: "999px", fontSize: "13px", whiteSpace: "nowrap", border: "1px solid", borderColor: active ? "var(--accent)" : "var(--border-strong)", background: active ? "var(--accent)" : "transparent", color: active ? "#fff" : "var(--fg-muted)", transition: "all 200ms" }}>{i}</button>
              );
            })}
          </div>
        </div>

        {(objectives.length > 0 || industries.length > 0) && (
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <p style={{ fontSize: "14px", color: "var(--fg-muted)" }}>{filtered.length} {filtered.length === 1 ? "study" : "studies"}</p>
            <button onClick={() => { setObjectives([]); setIndustries([]); }} style={{ fontSize: "13px", color: "var(--accent)" }}>Clear filters</button>
          </div>
        )}

        {filtered.length === 0 ? (
          <div style={{ padding: "80px 0", textAlign: "center" }}>
            <p style={{ fontSize: "22px", fontWeight: 500, marginBottom: "12px" }}>Nothing yet for that combination.</p>
            <p style={{ color: "var(--fg-muted)", marginBottom: "24px" }}>Tell us about it. We&apos;ll figure out what to build.</p>
            <a href="/start-your-study" className="btn-outline">Let&apos;s talk</a>
          </div>
        ) : (
          <div className="gallery-grid">
            {filtered.map(s => (
              <Link key={s.slug} href={`/work/${s.slug}`} className="gallery-card">
                <div className="gallery-card-thumb">
                  <Image src={thumbFor(s.slug, s.image)} alt="" fill sizes="(max-width: 768px) 100vw, 320px" style={{ objectFit: "cover" }} />
                  {s.live && <span className="live-badge">LIVE</span>}
                </div>
                <p className="gallery-card-label">{s.cardLabel}</p>
                <p className="gallery-card-desc">{s.cardDescription}</p>
                <p className="gallery-card-outcome">{s.outcome}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          transition: opacity 200ms var(--ease-out);
        }
        .gallery-card {
          display: block;
          border-radius: 12px;
          transition: transform 300ms var(--ease-out);
        }
        .gallery-card:hover {
          transform: translateY(-4px);
        }
        .gallery-card-thumb {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 12px;
          overflow: hidden;
          background: var(--bg-card);
          margin-bottom: 16px;
          box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.0), 0 12px 32px rgba(0,0,0,0.45);
          transition: box-shadow 300ms var(--ease-out);
        }
        .gallery-card:hover .gallery-card-thumb {
          box-shadow: 0 0 0 1px rgba(99, 102, 241, 0.3), 0 24px 48px rgba(0,0,0,0.55), 0 0 60px rgba(99, 102, 241, 0.2);
        }
        .gallery-card-label {
          font-size: 16px;
          font-weight: 500;
          line-height: 1.3;
          color: var(--fg);
          margin-bottom: 4px;
          transition: text-shadow 300ms var(--ease-out);
        }
        .gallery-card:hover .gallery-card-label {
          text-shadow: 0 0 18px rgba(99, 102, 241, 0.45);
        }
        .gallery-card-desc {
          font-size: 13px;
          color: var(--fg-muted);
          line-height: 1.4;
          margin-bottom: 8px;
        }
        .gallery-card-outcome {
          font-family: var(--font-geist-mono), ui-monospace, monospace;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent);
        }
        .live-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          border-radius: 999px;
          background: var(--whatsapp);
          color: #0A0A0A;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          animation: livePulse 2s infinite;
        }
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
          50% { box-shadow: 0 0 0 8px rgba(37, 211, 102, 0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .gallery-card { transition: none !important; }
          .live-badge { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
