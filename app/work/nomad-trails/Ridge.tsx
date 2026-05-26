"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Ridge() {
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
        background: "var(--page-bg)",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2, ease: SOFT }}
        style={{
          position: "relative",
          width: "100%",
          height: "min(720px, 86vh)",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/nomad-trails/trekker-back.webp"
          alt="A solo trekker viewed from behind walking a snow ridge at dawn"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        {enabled && (
          <>
            <video
              ref={videoARef}
              src="/videos/nomad-trails/ridge-loop.mp4"
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
              src="/videos/nomad-trails/ridge-loop.mp4"
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(26,31,38,0.1) 0%, rgba(26,31,38,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "flex-end",
            paddingBlock: 64,
            paddingInline: 48,
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: SOFT }}
              style={{
                fontFamily: "var(--font-mono-tech), 'IBM Plex Mono', monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "#FAF8F4",
                margin: 0,
                marginBottom: 28,
                opacity: 0.85,
              }}
            >
              SECTION 05 · THE RIDGE
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.9, ease: SOFT }}
              style={{
                fontFamily:
                  "var(--font-display-editorial), 'Bodoni Moda', 'Didot', serif",
                fontWeight: 500,
                fontSize: "clamp(40px, 6vw, 84px)",
                letterSpacing: "-0.02em",
                lineHeight: 0.98,
                color: "#FAF8F4",
                margin: 0,
              }}
            >
              Eight seconds.
              <br />
              <em style={{ fontStyle: "italic", fontWeight: 400 }}>
                No one talking.
              </em>
            </motion.h2>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
