"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export default function Hero() {
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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingInline: 24,
        paddingBlock: 96,
        overflow: "hidden",
      }}
    >
      <div aria-hidden style={{ position: "absolute", inset: 0 }}>
        <Image
          src="/images/autobazaar/hero-sedan.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          style={{ objectFit: "cover" }}
        />
        {enabled && (
          <>
            <video
              ref={videoARef}
              src="/videos/autobazaar/lot-loop.mp4"
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
              }}
            />
            <video
              ref={videoBRef}
              src="/videos/autobazaar/lot-loop.mp4"
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
              }}
            />
          </>
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(110deg, rgba(8,8,12,0.96) 0%, rgba(8,8,12,0.5) 60%, rgba(8,8,12,0.1) 100%)",
          }}
        />
      </div>

      <div
        className="container-x"
        style={{
          position: "relative",
          maxWidth: 1320,
          marginInline: "auto",
          width: "100%",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 40,
          }}
        >
          AUTOBAZAAR · POSSIBILITY STUDY · 007 · DEIRA DUBAI
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-outfit), system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(56px, 10vw, 144px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.94,
            margin: 0,
            maxWidth: 1100,
          }}
        >
          <span style={{ display: "block", color: "var(--page-text)" }}>
            Every car priced.
          </span>
          <span style={{ display: "block", color: "var(--page-accent)" }}>
            Every day.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "var(--font-outfit), system-ui, sans-serif",
            fontSize: 17,
            color: "var(--page-text-2)",
            maxWidth: 520,
            margin: 0,
            marginTop: 40,
            lineHeight: 1.7,
          }}
        >
          A dynamic pricing engine and live inventory system for a 60-car
          Deira dealership. Every car priced daily on market data, days on
          lot, and competitor pull.
        </motion.p>
      </div>
    </section>
  );
}
