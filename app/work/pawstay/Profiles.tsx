"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Profile = {
  number: string;
  name: string;
  meta: string;
  rows: [string, string][];
  src: string;
  alt: string;
};

const PROFILES: Profile[] = [
  {
    number: "001",
    name: "Biscuit",
    meta: "Indie · 4 yrs · 12 kg",
    rows: [
      ["DIET", "Chicken, rice, no grain"],
      ["ALLERGIES", "Beef"],
      ["MEDS", "Joint supplement 8am"],
      ["FEAR", "Loud bikes"],
      ["FAVORITE", "Belly rubs, the green cushion"],
    ],
    src: "/images/pawstay/happy-dog-1.webp",
    alt: "Biscuit, a light brown indie dog with white markings, lying on a beige cushion",
  },
  {
    number: "002",
    name: "Max",
    meta: "Labrador · 6 yrs · 32 kg",
    rows: [
      ["DIET", "Premium kibble, twice daily"],
      ["ALLERGIES", "None"],
      ["MEDS", "None"],
      ["FEAR", "Crackers"],
      ["FAVORITE", "Long park walks"],
    ],
    src: "/images/pawstay/happy-dog-2.webp",
    alt: "Max, a black Labrador retriever, resting head on paws on a cream rug",
  },
  {
    number: "003",
    name: "Moti",
    meta: "Pomeranian-mix · 3 yrs · 5 kg",
    rows: [
      ["DIET", "Wet food + small kibble"],
      ["ALLERGIES", "Dairy"],
      ["MEDS", "Antihistamine if needed"],
      ["FEAR", "New dogs > 20kg"],
      ["FAVORITE", "Being held"],
    ],
    src: "/images/pawstay/happy-dog-3.webp",
    alt: "Moti, a fluffy white pomeranian mix, sitting on a sage velvet cushion",
  },
];

function ProfileCard({ p, index }: { p: Profile; index: number }) {
  const [hover, setHover] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      data-cursor="view"
      style={{
        background: "var(--page-surface-1)",
        border: hover
          ? "1px solid var(--page-accent)"
          : "1px solid var(--page-border)",
        borderRadius: 12,
        overflow: "hidden",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hover
          ? "0 30px 60px -30px rgba(232,165,87,0.35), 0 0 0 1px rgba(232,165,87,0.08) inset"
          : "0 0 0 1px rgba(0,0,0,0) inset",
        transition:
          "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.6s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 5",
          overflow: "hidden",
        }}
      >
        <Image
          src={p.src}
          alt={p.alt}
          fill
          sizes="(min-width: 1024px) 30vw, 90vw"
          style={{
            objectFit: "cover",
            transform: hover ? "scale(1.03)" : "scale(1)",
            transition:
              "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
      <div
        style={{
          padding: 28,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-accent)",
            margin: 0,
          }}
        >
          {p.number} · {p.name.toUpperCase()}
        </p>
        <p
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontSize: 15,
            color: "var(--page-text-2)",
            margin: 0,
          }}
        >
          {p.meta}
        </p>
        <dl
          style={{
            display: "grid",
            gridTemplateColumns: "max-content 1fr",
            columnGap: 18,
            rowGap: 8,
            margin: 0,
            paddingTop: 12,
            borderTop: "1px solid var(--page-border)",
          }}
        >
          {p.rows.map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: 10,
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  color: "var(--page-text-3)",
                  alignSelf: "start",
                }}
              >
                {k}
              </dt>
              <dd
                style={{
                  margin: 0,
                  fontFamily:
                    "var(--font-geist-mono), monospace",
                  fontSize: 12,
                  color: "var(--page-text)",
                  lineHeight: 1.5,
                }}
              >
                {v}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.article>
  );
}

export default function Profiles() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div className="container-x">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          EVERY DOG. EVERY DETAIL.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(32px, 4.6vw, 56px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 64,
            maxWidth: 760,
          }}
        >
          We remember so she does not have to.
        </motion.h2>

        <div className="ps-profiles-grid">
          {PROFILES.map((p, i) => (
            <ProfileCard key={p.number} p={p} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          style={{
            fontFamily:
              "var(--font-jakarta), var(--font-geist-sans), system-ui, sans-serif",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(22px, 2.8vw, 32px)",
            letterSpacing: "-0.02em",
            color: "var(--page-text)",
            textAlign: "center",
            margin: 0,
            marginTop: 64,
            maxWidth: 680,
            marginInline: "auto",
          }}
        >
          She greets every dog by name on day one.
        </motion.p>
      </div>

      <style jsx>{`
        .ps-profiles-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 720px) {
          .ps-profiles-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }
        @media (min-width: 1100px) {
          .ps-profiles-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
