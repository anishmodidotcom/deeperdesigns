"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Reusable, accent-driven player frame. Shows a poster with a centered play
// affordance, a thin progress bar and a small duration label. If a real
// video source is provided it plays muted-loop while in view (reduced-motion
// users always see the still poster). No vertical hardcoding: the accent
// reads from --page-accent. A 9:16 variant is selected via `aspect`.
//
// v19.6: when a `before` still is passed, the frame renders as a before/after,
// the raw still labelled as the starting point beside the cinematic result,
// mirroring the Studio Engine and Listing Studio builds.
export default function VideoFrame({
  poster,
  src,
  alt,
  aspect = "16:9",
  duration = "0:08",
  width,
  height,
  before,
  beforeLabel = "RAW",
  afterLabel = "GENERATED",
  beforeCaption = "the walkthrough they would have got",
  afterCaption = "the film we make",
}: {
  poster: string;
  src?: string;
  alt: string;
  aspect?: "16:9" | "9:16";
  duration?: string;
  width?: number;
  height?: number;
  before?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeCaption?: string;
  afterCaption?: string;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);

  const ratio = aspect === "9:16" ? "9 / 16" : "16 / 9";
  const maxW = aspect === "9:16" ? 320 : 640;

  // Play muted-loop while in view; pause otherwise. Skipped entirely when the
  // user prefers reduced motion or no video source is present.
  useEffect(() => {
    if (reduce || !src) return;
    const el = wrapRef.current;
    const vid = videoRef.current;
    if (!el || !vid) return;
    const io = new IntersectionObserver(
      (entries) => {
        const inView = entries[0]?.isIntersecting ?? false;
        if (inView) {
          vid.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
        } else {
          vid.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, src]);

  const showVideo = !!src && !reduce;

  const player = (
    <div
      style={{
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
        background: "var(--dd-surface-1, #111111)",
        border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
        boxShadow: "0 50px 100px -50px rgba(0,0,0,0.65)",
      }}
    >
      <div style={{ position: "relative", aspectRatio: ratio, background: "#000" }}>
        {showVideo ? (
          <video
            ref={videoRef}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            width={width}
            height={height}
            aria-label={alt}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          // Still poster (no source, or reduced-motion). Plain img keeps this
          // frame self-contained and avoids next/image layout in the player.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={poster}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        )}

        {/* Play affordance, hidden once the clip is actually playing. */}
        {!playing ? (
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "color-mix(in srgb, var(--page-accent) 92%, #0A0A0A)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px -8px rgba(0,0,0,0.55)",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A0A0A" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        ) : null}

        {/* Quiet duration chip, bottom-right. */}
        <span
          className="mono"
          style={{
            position: "absolute",
            bottom: 12,
            right: 12,
            fontSize: 11,
            letterSpacing: "0.04em",
            color: "#F5F5F5",
            background: "rgba(10,10,10,0.6)",
            backdropFilter: "blur(6px)",
            borderRadius: 999,
            padding: "3px 10px",
          }}
        >
          {duration}
        </span>

        {/* Thin progress bar, accent from CSS var. */}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            background: "rgba(255,255,255,0.14)",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: playing ? "100%" : "34%",
              background: "var(--page-accent)",
              transition: playing ? "width 8s linear" : "none",
            }}
          />
        </span>
      </div>
    </div>
  );

  // Single-video (no before): preserve the original centered player.
  if (!before) {
    return (
      <div ref={wrapRef} style={{ width: "100%", maxWidth: maxW, marginInline: "auto" }}>
        {player}
      </div>
    );
  }

  // Before/after: raw still beside the cinematic result, each labelled.
  return (
    <div ref={wrapRef} className="vf-ba">
      <figure className="vf-ba__col" style={{ margin: 0 }}>
        <p className="vf-ba__label" style={{ color: "var(--dd-text-low, #6B6B6B)" }}>
          {beforeLabel}
        </p>
        <div
          style={{
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid var(--dd-border, rgba(255,255,255,0.08))",
            background: "var(--dd-surface-1, #111111)",
          }}
        >
          <div style={{ aspectRatio: ratio, background: "#000" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={before}
              alt={`${alt}, the raw starting point`}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "grayscale(0.35) brightness(0.82)",
              }}
            />
          </div>
        </div>
        <figcaption className="vf-ba__cap">{beforeCaption}</figcaption>
      </figure>

      <span aria-hidden className="vf-ba__arrow">
        →
      </span>

      <figure className="vf-ba__col" style={{ margin: 0 }}>
        <p className="vf-ba__label" style={{ color: "var(--page-accent)" }}>
          {afterLabel}
        </p>
        {player}
        <figcaption className="vf-ba__cap">{afterCaption}</figcaption>
      </figure>

      <style>{`
        .vf-ba {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }
        .vf-ba__col {
          flex: 1 1 0;
          min-width: 0;
          max-width: ${aspect === "9:16" ? "190px" : "320px"};
          display: flex;
          flex-direction: column;
        }
        .vf-ba__label {
          font-family: var(--font-geist-mono), monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          margin: 0 0 10px;
        }
        .vf-ba__cap {
          margin: 10px 0 0;
          font-size: 12px;
          line-height: 1.45;
          color: var(--dd-text-mid, #A8A8A8);
        }
        .vf-ba__arrow {
          flex-shrink: 0;
          color: var(--dd-text-low, #6B6B6B);
          font-size: 20px;
          margin-top: 18px;
        }
        @media (max-width: 480px) {
          .vf-ba__arrow { transform: rotate(90deg); }
        }
      `}</style>
    </div>
  );
}
