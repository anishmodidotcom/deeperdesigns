"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Steam() {
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
          aspectRatio: "16 / 9",
          overflow: "hidden",
        }}
      >
        <Image
          src="/images/kadak-chai/brewing-ritual.webp"
          alt="A brass kettle on a stove with chai brewing inside, steam rising"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        {enabled && (
          <>
            <video
              ref={videoARef}
              src="/videos/kadak-chai/steam-loop.mp4"
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
              src="/videos/kadak-chai/steam-loop.mp4"
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
              "linear-gradient(180deg, rgba(17,9,6,0.4) 0%, rgba(17,9,6,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: 32,
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: SOFT }}
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: "var(--page-accent)",
              margin: 0,
              marginBottom: 24,
              textAlign: "center",
            }}
          >
            THE CRAFT · IN MOTION
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, ease: SOFT }}
            style={{
              fontFamily:
                "var(--font-display-bold), 'Archivo Black', Impact, sans-serif",
              fontWeight: 400,
              fontSize: "clamp(40px, 7vw, 96px)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "var(--page-text)",
              margin: 0,
              textTransform: "uppercase",
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            Eight seconds of steam.
          </motion.h2>
        </div>
      </motion.div>
    </section>
  );
}
