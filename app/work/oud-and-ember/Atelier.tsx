"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EASE = [0.19, 1, 0.22, 1] as const;

export default function Atelier() {
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      const onTime = () => {
        if (!self.duration) return;
        const r = self.duration - self.currentTime;
        if (r < FADE) {
          if (other.paused) {
            other.currentTime = 0;
            other.play().catch(() => {});
          }
          const t = Math.max(0, Math.min(1, 1 - r / FADE));
          self.style.opacity = String(1 - t);
          other.style.opacity = String(t);
        }
      };
      const onEnded = () => {
        self.currentTime = 0;
        self.style.opacity = "0";
        const tick = () => {
          const cur = parseFloat(other.style.opacity || "1");
          if (cur < 1) {
            other.style.opacity = String(Math.min(1, cur + 0.06));
            rafRef.current = requestAnimationFrame(tick);
          } else other.style.opacity = "1";
        };
        rafRef.current = requestAnimationFrame(tick);
      };
      self.addEventListener("timeupdate", onTime);
      self.addEventListener("ended", onEnded);
      return () => {
        self.removeEventListener("timeupdate", onTime);
        self.removeEventListener("ended", onEnded);
      };
    }
    const ca = attach(a, b);
    const cb = attach(b, a);
    return () => {
      ca();
      cb();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled]);

  return (
    <section
      style={{
        position: "relative",
        height: "70vh",
        minHeight: 480,
        overflow: "hidden",
      }}
    >
      <Image
        src="/images/oud-and-ember/atelier.webp"
        alt="Atmospheric perfumer's atelier shelves of amber bottles in warm light"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {enabled && (
        <>
          <video
            ref={videoARef}
            src="/videos/oud-and-ember/smoke-loop.mp4"
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
              mixBlendMode: "screen",
            }}
          />
          <video
            ref={videoBRef}
            src="/videos/oud-and-ember/smoke-loop.mp4"
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
              mixBlendMode: "screen",
            }}
          />
        </>
      )}

      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(7,6,10,0.55) 0%, rgba(7,6,10,0.4) 50%, rgba(7,6,10,0.95) 100%)",
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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.4, ease: EASE }}
          style={{ maxWidth: 760 }}
        >
          <p
            style={{
              fontFamily:
                "var(--font-cormorant-display), Cormorant, Georgia, serif",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "clamp(30px, 4.6vw, 52px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "var(--page-text)",
              margin: 0,
            }}
          >
            Some things were always meant to be touched, smelled, breathed.
          </p>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--page-accent)",
              margin: 0,
              marginTop: 28,
            }}
          >
            We didn&rsquo;t replace the atelier. We built its threshold.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
