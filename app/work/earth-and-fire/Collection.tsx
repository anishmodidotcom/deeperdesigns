"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { LotusBorder, PaisleyOrnament } from "./illustrations";

const SOFT = [0.4, 0, 0.6, 1] as const;
const CLAY = [0.34, 1.56, 0.64, 1] as const;

type Piece = {
  index: string;
  category: string;
  name: string;
  note: string;
  price: string;
  image: string;
  alt: string;
};

const PIECES: Piece[] = [
  {
    index: "001",
    category: "CUP",
    name: "Marigold",
    note: "Hand-painted · Saffron and jade glaze · Limited to 12 pieces",
    price: "Rs. 4,800",
    image: "/images/earth-and-fire/clay-detail.webp",
    alt: "A terracotta cup with marigold-yellow hand-painted patterns",
  },
  {
    index: "002",
    category: "BOWL",
    name: "Indigo Dawn",
    note: "Wheel-thrown · Indigo dip · One of nine",
    price: "Rs. 6,400",
    image: "/images/earth-and-fire/pottery-collection.webp",
    alt: "An indigo glazed bowl, photographed top-down",
  },
  {
    index: "003",
    category: "VASE",
    name: "Saffron Hour",
    note: "Tall form · Burnt saffron · Twelve-week lead",
    price: "Rs. 9,200",
    image: "/images/earth-and-fire/hero-vase.webp",
    alt: "A tall vase glazed in burnt saffron tones",
  },
  {
    index: "004",
    category: "CUP",
    name: "Rose and Vine",
    note: "Tea cup · Henna line work · Limited to 8 pieces",
    price: "Rs. 5,200",
    image: "/images/earth-and-fire/pattern-detail-1.webp",
    alt: "A small terracotta cup with rose-vine line painting",
  },
  {
    index: "005",
    category: "PLANTER",
    name: "Banyan Leaf",
    note: "Garden form · Raw clay · Drainage cut",
    price: "Rs. 8,600",
    image: "/images/earth-and-fire/workshop-shelves.webp",
    alt: "A raw-clay planter with banyan-leaf carving on the rim",
  },
  {
    index: "006",
    category: "VASE",
    name: "Desert Bloom",
    note: "Hand-carved relief · Terracotta and jade · Made to order",
    price: "Rs. 14,200",
    image: "/images/earth-and-fire/kiln-glow.webp",
    alt: "A large hand-carved vase in terracotta with jade accents",
  },
];

export default function Collection() {
  return (
    <section
      style={{
        paddingBlock: 144,
        position: "relative",
        background: "var(--page-surface-1)",
      }}
    >
      <div
        className="container-x"
        style={{ maxWidth: 1280, marginInline: "auto" }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: SOFT }}
          aria-hidden
          style={{
            display: "flex",
            justifyContent: "center",
            color: "var(--page-border)",
            marginBottom: 56,
          }}
        >
          <LotusBorder width={220} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
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
            textAlign: "center",
          }}
        >
          THE WORKS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: SOFT }}
          style={{
            fontFamily:
              "var(--font-display-script), 'DM Serif Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(40px, 6vw, 72px)",
            letterSpacing: "-0.01em",
            lineHeight: 1.05,
            color: "var(--page-text)",
            margin: 0,
            marginBottom: 80,
            textAlign: "center",
          }}
        >
          What lives on the wheel.
        </motion.h2>

        <div className="ef-collection-grid">
          {PIECES.map((piece, i) => (
            <PieceCard key={piece.name} piece={piece} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        .ef-collection-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
        }
        @media (min-width: 640px) {
          .ef-collection-grid {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }
        }
        @media (min-width: 1024px) {
          .ef-collection-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 56px 40px;
          }
        }
      `}</style>
    </section>
  );
}

function PieceCard({ piece, index }: { piece: Piece; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.08,
        ease: CLAY,
      }}
      data-cursor="view"
      style={{
        position: "relative",
        cursor: "pointer",
      }}
      whileHover="hover"
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "4 / 5",
          overflow: "hidden",
          borderRadius: 4,
          marginBottom: 20,
        }}
      >
        <motion.div
          variants={{
            hover: { scale: 1.04 },
          }}
          transition={{ duration: 0.9, ease: CLAY }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Image
            src={piece.image}
            alt={piece.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
            style={{ objectFit: "cover" }}
          />
        </motion.div>
        <motion.div
          variants={{
            hover: { opacity: 1, scale: 1 },
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.5, ease: CLAY }}
          aria-hidden
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "var(--page-accent)",
          }}
        >
          <PaisleyOrnament width={36} />
        </motion.div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: 11,
              letterSpacing: "0.18em",
              color: "var(--page-text-3)",
              margin: 0,
              marginBottom: 6,
            }}
          >
            {piece.index} · {piece.category}
          </p>
          <h3
            style={{
              fontFamily: "var(--font-serif), 'Fraunces', Georgia, serif",
              fontWeight: 600,
              fontSize: 26,
              letterSpacing: "-0.01em",
              color: "var(--page-text)",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {piece.name}
          </h3>
        </div>
        <p
          style={{
            fontFamily:
              "var(--font-display-script), 'DM Serif Display', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 18,
            color: "var(--page-accent)",
            margin: 0,
            whiteSpace: "nowrap",
          }}
        >
          {piece.price}
        </p>
      </div>
      <p
        style={{
          fontFamily:
            "var(--font-display-script), 'DM Serif Display', Georgia, serif",
          fontStyle: "italic",
          fontWeight: 400,
          fontSize: 14,
          color: "var(--page-text-2)",
          margin: 0,
          marginTop: 10,
          lineHeight: 1.5,
        }}
      >
        {piece.note}
      </p>
    </motion.article>
  );
}
