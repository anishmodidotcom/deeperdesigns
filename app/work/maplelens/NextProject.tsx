"use client";

import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { useEffect, useState } from "react";
import { nextShowcase, type Industry, type Objective } from "@/lib/showcases";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function NextProject() {
  const [next, setNext] = useState(() => nextShowcase("maplelens"));

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const i = params.get("industry");
    const o = params.get("objective");
    const industries = (i ? i.split("|") : []) as Industry[];
    const objectives = (o ? o.split("|") : []) as Objective[];
    setNext(nextShowcase("maplelens", industries, objectives));
  }, []);

  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--page-border)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1080, marginInline: "auto" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 16,
          }}
        >
          NEXT STUDY
        </motion.p>
        <Link
          href={`/work/${next.slug}`}
          data-cursor="view"
          style={{
            display: "block",
            color: "var(--page-text)",
            textDecoration: "none",
          }}
        >
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: EASE }}
            style={{
              fontFamily: "var(--font-inter), system-ui, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(36px, 6vw, 72px)",
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              margin: 0,
            }}
          >
            {next.industryLabel} · {next.toolKind} →
          </motion.h2>
        </Link>
      </div>
    </section>
  );
}
