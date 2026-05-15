"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.25, 1, 0.5, 1] as const;

const POSTER_SRC = "/images/malabar-spice/hero-pepper.webp";
const VIDEO_SRC = "/videos/malabar-spice/hero-loop.mp4";

// The Veo clip is not a true ambient loop. It begins with an empty wood
// surface and ends with a full mound of peppercorns, so a naive <video loop>
// snaps from full pile back to empty table every 8 seconds.
//
// We could not use playbackRate = -1 (Chrome and Safari ignore negative
// rates), so we mask the seam with an opacity crossfade. The last 300ms of
// playback fades the video down to opacity 0, revealing the still poster
// image underneath. On the `ended` event we snap the video back to t = 0
// and fade it in over 300ms. The dissolve hides the snap.
const FADE_MS = 300;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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
      const playPromise = v.play();
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise.catch(() => {});
      }
      // requestAnimationFrame ensures the opacity change registers as a
      // transition, not a same-tick instant set.
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
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          y: imageY,
          willChange: "transform",
        }}
      >
        <Image
          src={POSTER_SRC}
          alt="A mound of freshly harvested black peppercorns on aged dark wood, lit from upper left"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {showVideo && (
          <video
            ref={videoRef}
            key="hero-loop"
            aria-hidden="true"
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
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(14,8,5,0.32) 0%, rgba(14,8,5,0.55) 55%, rgba(14,8,5,0.95) 100%)",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          position: "relative",
          zIndex: 2,
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
          y: textY,
          opacity: textOpacity,
        }}
      >
        <div
          className="container-x"
          style={{
            paddingBlock: 96,
            width: "100%",
          }}
        >
          <div style={{ maxWidth: 760 }}>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 28,
              }}
            >
              MALABAR SPICE HOUSE
            </motion.p>

            <h1
              style={{
                fontFamily: "var(--font-fraunces), Georgia, serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(44px, 7.4vw, 84px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.0,
                color: "var(--page-text)",
                margin: 0,
                fontVariationSettings: "'opsz' 144",
              }}
            >
              <WordReveal text="Sixty-four years. Forty-five buyers." delayStart={0.1} />
              <span style={{ display: "block" }}>
                <WordReveal
                  text="One website that finally feels like Kerala."
                  delayStart={0.6}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
              style={{
                fontSize: 18,
                color: "var(--page-text-2)",
                maxWidth: 560,
                lineHeight: 1.7,
                margin: 0,
                marginTop: 28,
              }}
            >
              Rashid did not need a dashboard. He needed a digital
              warehouse with the same dignity as the one his grandfather
              built in 1962, and a quiet door for the next buyer in
              Copenhagen to find.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.85, ease: EASE }}
              style={{
                marginTop: 28,
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--page-text-3)",
              }}
            >
              A concept build.
            </motion.p>
          </div>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.8, ease: EASE }}
        style={{
          position: "absolute",
          right: 32,
          bottom: 24,
          zIndex: 2,
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.2em",
          color: "var(--page-text-3)",
          margin: 0,
        }}
      >
        EST. 1962 · KOCHI, KERALA
      </motion.p>

      <style jsx>{`
        :global(.ms-hero-cta:hover) {
          color: var(--page-accent-2) !important;
        }
        :global(.ms-hero-cta:hover .ms-hero-arrow) {
          transform: translateX(8px);
        }
      `}</style>
    </section>
  );
}

function WordReveal({
  text,
  delayStart = 0,
}: {
  text: string;
  delayStart?: number;
}) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "top",
            }}
          >
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: delayStart + i * 0.1,
                ease: EASE,
              }}
              style={{ display: "inline-block" }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}
