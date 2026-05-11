"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mandala } from "./illustrations";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function VideoMoment() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mobile = window.matchMedia("(max-width: 700px)").matches;
    if (reduced || mobile) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b) return;

    a.style.opacity = "1";
    b.style.opacity = "0";
    a.play().catch(() => {});

    const FADE = 0.35;

    function attach(self: HTMLVideoElement, other: HTMLVideoElement) {
      function onTimeUpdate() {
        if (!self.duration) return;
        const remaining = self.duration - self.currentTime;
        if (remaining < FADE) {
          if (other.paused) {
            other.currentTime = 0;
            other.play().catch(() => {});
          }
          const t = Math.max(0, Math.min(1, 1 - remaining / FADE));
          self.style.opacity = String(1 - t);
          other.style.opacity = String(t);
        }
      }
      function onEnded() {
        self.currentTime = 0;
        self.style.opacity = "0";
        const tick = () => {
          const cur = parseFloat(other.style.opacity || "1");
          if (cur < 1) {
            other.style.opacity = String(Math.min(1, cur + 0.06));
            rafRef.current = requestAnimationFrame(tick);
          } else {
            other.style.opacity = "1";
          }
        };
        rafRef.current = requestAnimationFrame(tick);
      }
      self.addEventListener("timeupdate", onTimeUpdate);
      self.addEventListener("ended", onEnded);
      return () => {
        self.removeEventListener("timeupdate", onTimeUpdate);
        self.removeEventListener("ended", onEnded);
      };
    }

    const cleanupA = attach(a, b);
    const cleanupB = attach(b, a);
    return () => {
      cleanupA();
      cleanupB();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  return (
    <section
      style={{
        position: "relative",
        paddingBlock: 160,
        overflow: "hidden",
        background: "var(--page-bg)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, rotate: -8 }}
        whileInView={{ opacity: 0.12, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.6, ease: SOFT }}
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "var(--page-accent)",
          pointerEvents: "none",
        }}
      >
        <Mandala width={720} style={{ width: "min(98vh, 820px)", height: "min(98vh, 820px)" }} />
      </motion.div>

      <div
        className="container-x"
        style={{
          maxWidth: 1100,
          marginInline: "auto",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: SOFT }}
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-border)",
            margin: 0,
            marginBottom: 28,
          }}
        >
          THE CRAFT · IN MOTION
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, ease: SOFT }}
          style={{
            position: "relative",
            width: "min(560px, 80vw)",
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 50px 120px -40px rgba(43,28,14,0.55)",
            border: "1px solid var(--page-border)",
          }}
        >
          <Image
            src="/images/earth-and-fire/clay-detail.webp"
            alt="A cup being shaped on the wheel"
            fill
            sizes="(min-width: 700px) 560px, 80vw"
            style={{ objectFit: "cover" }}
          />
          {enabled && (
            <>
              <video
                ref={videoARef}
                src="/videos/earth-and-fire/wheel-loop.mp4"
                muted
                playsInline
                preload="auto"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0,
                  transition: "opacity 0s linear",
                }}
              />
              <video
                ref={videoBRef}
                src="/videos/earth-and-fire/wheel-loop.mp4"
                muted
                playsInline
                preload="auto"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  opacity: 0,
                  transition: "opacity 0s linear",
                }}
              />
            </>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, delay: 0.2, ease: SOFT }}
          style={{
            fontFamily:
              "var(--font-display-script), 'DM Serif Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(24px, 3vw, 32px)",
            color: "var(--page-text-2)",
            textAlign: "center",
            margin: 0,
            marginTop: 56,
            maxWidth: 640,
            lineHeight: 1.4,
          }}
        >
          Eight seconds of clay finding its centre.
        </motion.p>
      </div>
    </section>
  );
}
