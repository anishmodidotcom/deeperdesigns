"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;
const FADE_MS = 300;

const VIDEO_SRC = "/videos/pawstay/live-feed.mp4";
const POSTER_SRC = "/images/pawstay/dog-camera-feed.webp";

const UI_NOTES = [
  { color: "var(--page-text-2)", text: "Tap any dog to see their card" },
  { color: "var(--page-text-3)", text: "Two-way audio coming soon" },
  { color: "var(--page-text-2)", text: "Recording saved for 24 hours" },
];

export default function LiveCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [videoOpacity, setVideoOpacity] = useState(1);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)"
    );
    const update = () => setShowVideo(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!showVideo) return;
    const v = videoRef.current;
    if (!v) return;
    let fadingOut = false;

    const onTimeUpdate = () => {
      if (!v.duration || Number.isNaN(v.duration)) return;
      const remaining = v.duration - v.currentTime;
      if (remaining <= FADE_MS / 1000 && !fadingOut) {
        fadingOut = true;
        setVideoOpacity(0);
      }
    };
    const onEnded = () => {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      requestAnimationFrame(() => {
        fadingOut = false;
        setVideoOpacity(1);
      });
    };

    v.addEventListener("timeupdate", onTimeUpdate);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
      v.removeEventListener("ended", onEnded);
    };
  }, [showVideo]);

  return (
    <section
      id="live-camera"
      style={{ paddingBlock: 144 }}
    >
      <div className="container-x" style={{ textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE FEATURE THAT CHANGED EVERYTHING
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.6vw, 56px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 56,
            maxWidth: 880,
            marginInline: "auto",
          }}
        >
          A live window into the daycare. Always on. Always there.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.99, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            background: "var(--page-surface-2)",
            border: "1px solid var(--page-accent)",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 40px 90px -40px rgba(232,165,87,0.22)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              paddingInline: 18,
              paddingBlock: 12,
              borderBottom: "1px solid rgba(232,165,87,0.2)",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {[
                "rgba(232,165,87,0.65)",
                "rgba(232,165,87,0.45)",
                "rgba(232,165,87,0.3)",
              ].map((c, i) => (
                <span
                  key={i}
                  aria-hidden
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 9999,
                    background: c,
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                color: "var(--page-text-2)",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              LIVE · Chattarpur Facility · 14:32 IST
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                color: "#88A682",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
              }}
            >
              <PulseDot color="#88A682" />
              LIVE
            </span>
          </div>

          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 9",
              background: "var(--page-surface-1)",
            }}
          >
            <img
              src={POSTER_SRC}
              alt="Indoor camera view of dogs resting on rugs in a sunlit daycare"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            {showVideo && (
              <video
                ref={videoRef}
                key="live-feed"
                aria-hidden="true"
            tabIndex={-1}
                autoPlay
                muted
                playsInline
                preload="auto"
                poster={POSTER_SRC}
                src={VIDEO_SRC}
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  opacity: videoOpacity,
                  transition: `opacity ${FADE_MS}ms ease-in-out`,
                }}
              />
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 28,
            marginTop: 28,
            maxWidth: 1100,
            marginInline: "auto",
          }}
        >
          {UI_NOTES.map((n) => (
            <span
              key={n.text}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 12,
                color: n.color,
                letterSpacing: "0.02em",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 9999,
                  background: "currentColor",
                  opacity: 0.7,
                }}
              />
              {n.text}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(22px, 2.8vw, 32px)",
            letterSpacing: "-0.02em",
            color: "var(--page-text)",
            margin: 0,
            marginTop: 64,
            maxWidth: 680,
            marginInline: "auto",
            lineHeight: 1.3,
          }}
        >
          Most parents check it twice. Then they remember to stop checking.
        </motion.p>
      </div>
    </section>
  );
}

function PulseDot({ color }: { color: string }) {
  return (
    <motion.span
      aria-hidden
      animate={{ opacity: [0.45, 1, 0.45] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: 6,
        height: 6,
        borderRadius: 9999,
        background: color,
      }}
    />
  );
}
