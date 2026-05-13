"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";
import { SHOWCASES, OBJECTIVES, INDUSTRIES } from "@/lib/showcases";

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
    <section style={{ padding: "var(--section-py) 0" }}>
      <div className="container">
        <p className="eyebrow" style={{ marginBottom: "24px" }}>02 · POSSIBILITY GALLERY</p>
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px", maxWidth: "900px" }}>
          What is slowing your business down?
        </h2>
        <p style={{ fontSize: "17px", color: "var(--fg-muted)", maxWidth: "640px", marginBottom: "48px" }}>
          Pick a lane. We will show you what we have already imagined for businesses like yours. Or scroll past and see everything.
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
            <p style={{ fontSize: "20px", marginBottom: "12px" }}>We haven&apos;t imagined this one yet.</p>
            <p style={{ color: "var(--fg-muted)", marginBottom: "24px" }}>Tell us about it. We&apos;ll figure out what to build.</p>
            <a href="/start-your-study" className="btn-outline">Let&apos;s explore possibilities</a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {filtered.map((s, idx) => (
              <Link key={s.slug} href={`/work/${s.slug}`} style={{ display: "block", position: "relative", aspectRatio: "4/5", borderRadius: "12px", overflow: "hidden", background: "var(--bg-card)" }}>
                {s.image && (
                  <Image src={s.image} alt="" fill sizes="(max-width: 768px) 100vw, 320px" style={{ objectFit: "cover", opacity: 0.7 }} />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.85) 100%)" }} />
                {s.live && (
                  <span style={{ position: "absolute", top: "12px", right: "12px", padding: "4px 10px", borderRadius: "999px", background: "var(--whatsapp)", color: "#0A0A0A", fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", boxShadow: "0 0 0 0 rgba(37,211,102,0.6)", animation: "livePulse 2s infinite" }}>LIVE</span>
                )}
                <div style={{ position: "absolute", left: "16px", right: "16px", bottom: "16px" }}>
                  <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "8px" }}>{String(idx + 1).padStart(2, "0")}</p>
                  <p style={{ fontSize: "16px", fontWeight: 500, marginBottom: "4px", lineHeight: 1.3 }}>{s.cardLabel}</p>
                  <p style={{ fontSize: "13px", color: "var(--fg-muted)", lineHeight: 1.4 }}>{s.cardDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes livePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.6); }
          50% { box-shadow: 0 0 0 8px rgba(37,211,102,0); }
        }
      `}</style>
    </section>
  );
}
