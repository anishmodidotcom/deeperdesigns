"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.7, 0, 0.2, 1] as const;
const FADE_MS = 300;

const POSTER_SRC = "/images/zara-fitness/gym-interior.webp";
const VIDEO_SRC = "/videos/zara-fitness/training-loop.mp4";

export default function VideoCTA() {
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
    let fading = false;
    const onTimeUpdate = () => {
      if (!v.duration || Number.isNaN(v.duration)) return;
      if (v.duration - v.currentTime <= FADE_MS / 1000 && !fading) {
        fading = true;
        setVideoOpacity(0);
      }
    };
    const onEnded = () => {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
      requestAnimationFrame(() => {
        fading = false;
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
        height: "80vh",
        minHeight: 540,
        overflow: "hidden",
      }}
    >
      <Image
        src={POSTER_SRC}
        alt="Dark premium gym interior"
        fill
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      {showVideo && (
        <video
          ref={videoRef}
          key="training-loop"
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
            "linear-gradient(180deg, rgba(14,14,14,0.45) 0%, rgba(14,14,14,0.35) 50%, rgba(14,14,14,0.85) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingInline: 24,
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ maxWidth: 920 }}
        >
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.22em",
              color: "var(--page-accent)",
              margin: 0,
            }}
          >
            JOIN THE PROGRAM
          </p>
          <h2
            style={{
              fontFamily: "var(--font-anton), Impact, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(72px, 14vw, 200px)",
              letterSpacing: "-0.01em",
              lineHeight: 0.92,
              color: "var(--page-text)",
              margin: 0,
              marginTop: 18,
              textTransform: "uppercase",
            }}
          >
            Train with Zara.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              letterSpacing: "0.12em",
              color: "var(--page-text-2)",
              margin: 0,
              marginTop: 24,
            }}
          >
            FIRST MONTH FREE · LOCK IN FOUNDING MEMBER PRICING
          </p>
          <a
            href="#"
            data-cursor="pointer"
            style={{
              display: "inline-block",
              marginTop: 36,
              background: "var(--page-accent)",
              color: "#0E0E0E",
              paddingInline: 36,
              paddingBlock: 18,
              fontFamily: "var(--font-anton), Impact, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              borderRadius: 9999,
            }}
          >
            Get access
          </a>
        </motion.div>
      </div>
    </section>
  );
}
