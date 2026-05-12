"use client";

import { useState } from "react";
import { motion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Live = {
  name: string;
  blurb: string;
  url?: string;
  status: "live" | "soon";
  category: string;
};

// TODO Anish: drop the live URLs and final blurbs for Maplelens and Farm to
// Cup here. The Coming Soon cards capture an email and notify on launch.
const PRODUCTS: Live[] = [
  {
    name: "Maplelens",
    category: "Live · Vision",
    status: "live",
    blurb:
      "An AI lens for the everyday. We built it. We use it. You can too.",
    url: "https://maplelens.com",
  },
  {
    name: "Farm to Cup",
    category: "Live · Food",
    status: "live",
    blurb:
      "Specialty coffee from farm to cup. Subscription. Origin storytelling. Built end to end.",
    url: "https://farmtocup.in",
  },
  {
    name: "IG Post Studio",
    category: "Coming Soon · Content",
    status: "soon",
    blurb:
      "An Instagram post creator that knows your brand. We are testing it now.",
  },
  {
    name: "Restaurant OS",
    category: "Coming Soon · Operations",
    status: "soon",
    blurb:
      "An operating system for an independent restaurant. Menus, orders, the rota, the WhatsApp.",
  },
];

export default function LiveProducts() {
  return (
    <section
      style={{
        paddingBlock: 144,
        borderTop: "1px solid var(--border)",
        background: "var(--surface-1)",
      }}
      id="live-products"
    >
      <div className="container-x" style={{ maxWidth: 1320, marginInline: "auto" }}>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.16em",
            color: "var(--accent)",
            margin: 0,
            marginBottom: 24,
          }}
        >
          Live Products
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.08, ease: EASE }}
          style={{
            fontSize: "clamp(32px, 5vw, 64px)",
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            lineHeight: 1.05,
            margin: 0,
            marginBottom: 24,
            maxWidth: 900,
          }}
        >
          Tools we built, polished, and put in the world.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.14, ease: EASE }}
          style={{
            fontSize: 18,
            color: "var(--text-2)",
            lineHeight: 1.6,
            margin: 0,
            marginBottom: 64,
            maxWidth: 700,
          }}
        >
          Use them. Then commission your own version. These are real,
          shippable, and live, distinct from the twenty Possibility Studies
          above.
        </motion.p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 16,
          }}
          className="lp-grid"
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.name} product={p} index={i} />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          :global(.lp-grid) {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function ProductCard({ product, index }: { product: Live; index: number }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "sending" | "error">(
    "idle"
  );

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/notify-me", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ product: product.name, email }),
      });
      if (!res.ok) throw new Error("Could not subscribe.");
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      style={{
        background: "var(--bg)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "clamp(28px, 4vw, 40px)",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        minHeight: 280,
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color:
            product.status === "live" ? "var(--accent)" : "var(--text-3)",
          margin: 0,
        }}
      >
        {product.category}
      </p>
      <h3
        style={{
          fontSize: "clamp(28px, 3.4vw, 40px)",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: "var(--text)",
          margin: 0,
          lineHeight: 1.05,
        }}
      >
        {product.name}
      </h3>
      <p
        style={{
          fontSize: 16,
          color: "var(--text-2)",
          lineHeight: 1.6,
          margin: 0,
          flex: 1,
        }}
      >
        {product.blurb}
      </p>
      {product.status === "live" && product.url ? (
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            paddingInline: 22,
            paddingBlock: 12,
            background: "var(--accent)",
            color: "#FFFFFF",
            borderRadius: 9999,
            fontSize: 14,
            fontWeight: 600,
            textDecoration: "none",
            alignSelf: "flex-start",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
          }}
        >
          Visit {product.name}
          <span aria-hidden>↗</span>
        </a>
      ) : (
        <form
          onSubmit={subscribe}
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@yourbusiness.com"
            disabled={status === "sending" || status === "ok"}
            style={{
              flex: "1 1 200px",
              paddingInline: 14,
              paddingBlock: 12,
              background: "var(--surface-1)",
              border: "1px solid var(--border-2)",
              borderRadius: 8,
              color: "var(--text)",
              fontSize: 14,
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "ok"}
            data-cursor="pointer"
            style={{
              paddingInline: 18,
              paddingBlock: 12,
              background:
                status === "ok" ? "var(--accent-2, #79C9A0)" : "var(--text)",
              color: "var(--bg)",
              border: "none",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            }}
          >
            {status === "ok"
              ? "On the list"
              : status === "sending"
              ? "..."
              : "Notify me"}
          </button>
        </form>
      )}
    </motion.article>
  );
}
