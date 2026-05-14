"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const SOFT = [0.4, 0, 0.6, 1] as const;

export default function Founder() {
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
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-surface)",
        borderBlock: "1px solid rgba(232,93,42,0.12)",
      }}
    >
      <div className="container-x" style={{ maxWidth: 1280, marginInline: "auto" }}>
        <div className="zr-founder-grid">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: SOFT }}
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "16 / 11",
              overflow: "hidden",
              borderRadius: 4,
            }}
          >
            <Image
              src="/images/zaatar-republic/shawarma-shaving.webp"
              alt="A chef shaving slow-roasted shawarma from a vertical spit"
              fill
              sizes="(min-width: 1024px) 55vw, 90vw"
              style={{ objectFit: "cover" }}
            />
            {enabled && (
              <>
                <video
                  ref={videoARef}
                  src="/videos/zaatar-republic/spit-loop.mp4"
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
                  src="/videos/zaatar-republic/spit-loop.mp4"
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
                  "linear-gradient(180deg, rgba(13,8,6,0.05) 60%, rgba(13,8,6,0.65) 100%)",
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.1, ease: SOFT }}
          >
            <p
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                color: "var(--page-accent)",
                margin: 0,
                marginBottom: 24,
              }}
            >
              THE OWNER
            </p>
            <h2
              style={{
                fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
                fontWeight: 700,
                fontSize: "clamp(36px, 5.4vw, 60px)",
                letterSpacing: "-0.03em",
                lineHeight: 1.02,
                color: "var(--page-text)",
                margin: 0,
                marginBottom: 28,
                textTransform: "uppercase",
              }}
            >
              Faisal sleeps at 3 AM
              <br />
              <span style={{ color: "var(--page-accent)" }}>
                so the spit can rest.
              </span>
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 18,
                fontSize: 17,
                lineHeight: 1.75,
                color: "var(--page-text-2)",
                maxWidth: 520,
              }}
            >
              <p style={{ margin: 0 }}>
                Faisal opened the first Zaatar Republic above a tailor in
                Sharjah in 2019. Slow-roasted lamb, bread pressed
                in-house, toum whipped twice a day. People queued. He
                opened a second branch. Then two more.
              </p>
              <p style={{ margin: 0 }}>
                Four locations. A thousand orders a day. Three managers
                to call and a WhatsApp group that never stops. Every
                inventory decision made by gut. So we built him the
                dashboard.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .zr-founder-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 56px;
          align-items: center;
        }
        @media (min-width: 1024px) {
          .zr-founder-grid {
            grid-template-columns: 55fr 45fr;
            gap: 80px;
          }
        }
      `}</style>
    </section>
  );
}
