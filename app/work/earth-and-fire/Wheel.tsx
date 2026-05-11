"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import { Mandala } from "./illustrations";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const EASE = [0.4, 0, 0.6, 1] as const;

export default function Wheel() {
  const sectionRef = useRef<HTMLElement>(null);
  const potteryRef = useRef<HTMLDivElement>(null);
  const mandalaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (reduced) return;

      const pottery = potteryRef.current;
      const mandala = mandalaRef.current;
      if (!pottery || !mandala) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        pottery,
        { rotate: 0 },
        { rotate: 360, ease: "none" },
        0
      ).fromTo(
        mandala,
        { rotate: 0 },
        { rotate: -360, ease: "none" },
        0
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        background: "var(--page-bg)",
      }}
    >
      <div
        ref={mandalaRef}
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          color: "var(--page-border)",
          opacity: 0.18,
          willChange: "transform",
        }}
      >
        <Mandala width={Math.min(960, 110)} style={{ width: "min(110vh, 960px)", height: "min(110vh, 960px)" }} />
      </div>

      <div
        ref={potteryRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(48vh, 380px)",
          height: "min(48vh, 380px)",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 30px 60px -30px rgba(43,28,14,0.4)",
          willChange: "transform",
        }}
      >
        <Image
          src="/images/earth-and-fire/clay-detail.webp"
          alt="A piece of wet clay being shaped on a pottery wheel"
          fill
          sizes="min(48vh, 380px)"
          style={{ objectFit: "cover" }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.9, ease: EASE }}
        style={{
          position: "absolute",
          top: "10%",
          left: "6%",
          right: "6%",
          zIndex: 2,
          maxWidth: 760,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 500,
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.22em",
            color: "var(--page-border)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          SECTION 03 · THE WHEEL
        </p>
        <h2
          style={{
            fontFamily:
              "var(--font-display-script), 'DM Serif Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(36px, 5.2vw, 60px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
          }}
        >
          Every piece. Spun by hand.
          <br />
          Twelve weeks of waiting. Worth every day.
        </h2>
      </motion.div>

      <p
        style={{
          position: "absolute",
          bottom: 32,
          right: "6%",
          zIndex: 2,
          fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          fontWeight: 500,
          fontSize: 11,
          textTransform: "uppercase",
          letterSpacing: "0.22em",
          color: "var(--page-accent-2)",
          margin: 0,
        }}
      >
        SCROLL · THE WHEEL TURNS
      </p>
    </section>
  );
}
