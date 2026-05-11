"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

const EASE = [0.25, 1, 0.5, 1] as const;

type Spice = {
  number: string;
  category: string;
  latin: string;
  origin: string;
  body: string;
  footer: string;
  src: string;
  alt: string;
};

const SPICES: Spice[] = [
  {
    number: "001",
    category: "CARDAMOM",
    latin: "Elettaria cardamomum",
    origin: "Idukki highlands. Picked at first frost.",
    body: "Hand-harvested by three families we have worked with for two generations. The pods are sun-dried for thirty-six hours at 1,300 metres, then sorted by colour before they leave the hill.",
    footer: "AVAILABLE: GREEN · WHITE · BLACK",
    src: "/images/malabar-spice/cardamom-pods.webp",
    alt: "Fresh green cardamom pods on hand-woven jute cloth, warm side light",
  },
  {
    number: "002",
    category: "PEPPER",
    latin: "Piper nigrum, Tellicherry grade",
    origin: "Wayanad slopes. Late October harvest.",
    body: "The largest, most uniformly cured peppercorns from the year&rsquo;s crop. Vines climb the same rosewood trees they have climbed for sixty years. Hand-graded to TGSEB before bagging.",
    footer: "GRADES: TGSEB · TGEB · MG1",
    src: "/images/malabar-spice/pepper-grid-card.webp",
    alt: "Tellicherry black peppercorns piled on dark slate, dramatic side light",
  },
  {
    number: "003",
    category: "TURMERIC",
    latin: "Curcuma longa",
    origin: "Erode farms. Curcumin content 5.2%.",
    body: "Salem-fingers variety from four smallholder farms in Tamil Nadu. Boiled, sun-dried, and polished. Lab-tested for curcumin content on every shipment that leaves Kochi.",
    footer: "FORMS: WHOLE · POWDER · CUT",
    src: "/images/malabar-spice/turmeric-roots.webp",
    alt: "Freshly cut turmeric roots on dark slate, vivid orange interior",
  },
  {
    number: "004",
    category: "CINNAMON",
    latin: "Cinnamomum verum",
    origin: "Sri Lankan border. Hand-rolled quills.",
    body: "True Ceylon cinnamon, not cassia. Bark peeled and rolled the same afternoon it is cut. Quills cured in low shade for ten days. Sweet, light, papery. Not the heavy spice you find in supermarkets.",
    footer: "GRADES: ALBA · CONTINENTAL · MEXICAN",
    src: "/images/malabar-spice/cinnamon-curls.webp",
    alt: "Rolled cinnamon bark curls stacked, deep mahogany and rust",
  },
];

function SpiceCard({ s, index }: { s: Spice; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 1.02 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay: index * 0.1, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="view"
      style={{
        position: "relative",
        background: "var(--page-surface-1)",
        border: hovered
          ? "1px solid var(--page-accent)"
          : "1px solid var(--page-border)",
        borderRadius: 8,
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 30px 70px -30px rgba(232,155,45,0.35), 0 0 0 1px rgba(232,155,45,0.08) inset"
          : "0 0 0 1px rgba(0,0,0,0) inset",
        transition:
          "transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.9s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.9s cubic-bezier(0.25, 1, 0.5, 1)",
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
          src={s.src}
          alt={s.alt}
          fill
          sizes="(min-width: 1024px) 23vw, 45vw"
          style={{
            objectFit: "cover",
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition:
              "transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      </div>

      <div
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            color: "var(--page-accent)",
            margin: 0,
          }}
        >
          {s.number} · {s.category}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 24,
            letterSpacing: "-0.02em",
            color: "var(--page-text)",
            margin: 0,
            lineHeight: 1.15,
            fontVariationSettings: "'opsz' 144",
          }}
        >
          {s.latin}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 14,
            color: "var(--page-text-2)",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          {s.origin}
        </p>
        <p
          style={{
            fontSize: 14,
            color: "var(--page-text-2)",
            margin: 0,
            lineHeight: 1.7,
          }}
          dangerouslySetInnerHTML={{ __html: s.body }}
        />
        <p
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--page-text-3)",
            margin: 0,
            marginTop: 8,
            paddingTop: 14,
            borderTop: "1px solid var(--page-border)",
          }}
        >
          {s.footer}
        </p>
      </div>
    </motion.article>
  );
}

export default function Spices() {
  return (
    <section style={{ paddingBlock: 144 }}>
      <div
        className="container-x"
        style={{ textAlign: "center" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--page-accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          THE FOUR HOUSES
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          style={{
            fontFamily: "var(--font-fraunces), Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(34px, 5vw, 56px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--page-text)",
            margin: 0,
            fontVariationSettings: "'opsz' 144",
          }}
        >
          What we sell. In our own words.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1, delay: 0.2, ease: EASE }}
          aria-hidden
          style={{
            height: 1,
            width: 80,
            background: "var(--page-accent)",
            marginInline: "auto",
            marginTop: 28,
            marginBottom: 64,
            transformOrigin: "center",
          }}
        />

        <div className="ms-spice-grid">
          {SPICES.map((s, i) => (
            <SpiceCard key={s.number} s={s} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .ms-spice-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          text-align: left;
        }
        @media (min-width: 720px) {
          .ms-spice-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }
        @media (min-width: 1100px) {
          .ms-spice-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
