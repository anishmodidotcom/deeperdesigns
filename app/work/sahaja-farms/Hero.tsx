"use client";

import Image from "next/image";
import { Link } from "next-view-transitions";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.4, 0, 0.2, 1] as const;
const FADE_MS = 300;

const POSTER_SRC = "/images/sahaja-farms/hero-field.webp";
const VIDEO_SRC = "/videos/sahaja-farms/field-loop.mp4";

export default function Hero() {
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
      if (v.duration - v.currentTime <= FADE_MS / 1000 && !fadingOut) {
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
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Image
          src={POSTER_SRC}
          alt="Wide view of a 200-acre organic farm at golden hour outside Mysore"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        {showVideo && (
          <video
            ref={videoRef}
            key="field-loop"
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
              "linear-gradient(135deg, rgba(11,16,10,0.85) 0%, rgba(11,16,10,0.45) 35%, rgba(11,16,10,0.2) 70%, rgba(11,16,10,0.6) 100%)",
          }}
        />
      </div>

      <div
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div
          className="container-x"
          style={{ paddingBlock: 96, width: "100%" }}
        >
          <div style={{ maxWidth: 820 }}>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
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
              SAHAJA FARMS · POSSIBILITY STUDY · 013
            </motion.p>

            <h1
              style={{
                fontFamily:
                  "var(--font-bricolage), Georgia, serif",
                fontWeight: 600,
                fontSize: "clamp(44px, 7.8vw, 88px)",
                letterSpacing: "-0.035em",
                lineHeight: 0.95,
                color: "var(--page-text)",
                margin: 0,
                fontVariationSettings: "'opsz' 96",
              }}
            >
              <WordReveal text="She does the hard work." />
              <span style={{ display: "block" }}>
                <WordReveal
                  text="Now the software does the math."
                  delay={0.55}
                />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4, ease: EASE }}
              style={{
                fontSize: 19,
                color: "var(--page-text-2)",
                maxWidth: 620,
                lineHeight: 1.6,
                margin: 0,
                marginTop: 28,
              }}
            >
              A farm management dashboard that knows what to plant, when to
              harvest, and which subscribers are about to cancel. For
              Lata&rsquo;s 200-acre organic farm and the 400 Bangalore
              families who eat from it.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6, ease: EASE }}
              style={{ marginTop: 36 }}
            >
              <Link
                href="#dashboard"
                data-cursor="pointer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  background: "var(--page-accent)",
                  color: "#1A140A",
                  paddingInline: 24,
                  paddingBlock: 13,
                  borderRadius: 9999,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily:
                    "var(--font-bricolage), Georgia, serif",
                  letterSpacing: "-0.01em",
                  transition:
                    "background 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--page-accent-2)";
                  e.currentTarget.style.color = "#0B100A";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--page-accent)";
                  e.currentTarget.style.color = "#1A140A";
                }}
              >
                View the build
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.6, ease: EASE }}
        style={{
          position: "absolute",
          right: 32,
          bottom: 24,
          zIndex: 2,
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 10,
          textTransform: "uppercase",
          letterSpacing: "0.18em",
          color: "var(--page-text-3)",
          margin: 0,
          textAlign: "right",
          maxWidth: 360,
        }}
      >
        200 ACRES · MYSORE, KARNATAKA · CERTIFIED ORGANIC SINCE 2013
      </motion.p>
    </section>
  );
}

function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(" ");
  return (
    <span style={{ display: "inline-block" }}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
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
              duration: 0.8,
              delay: delay + 0.2 + i * 0.09,
              ease: EASE,
            }}
            style={{ display: "inline-block" }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
