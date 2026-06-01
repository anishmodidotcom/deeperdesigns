import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SHOWCASES } from "@/lib/showcases";
import { SLUG_ACCENTS, accentWash } from "@/lib/og";

export const runtime = "nodejs";

// Branded OG card generator for showcase routes + /colophon.
// Template per spec: deep near-black canvas, accent wash, monogram TL,
// eyebrow TR, big sans headline center-left, italic serif tagline below,
// route URL BR.

const W = 1200;
const H = 630;
const BG = "#0A0A0A";
const INDIGO = "#7C6CFF";

type CardInput = {
  eyebrow: string;
  headline: string;
  tagline: string;
  url: string;
  accent: string;
};

function colophonCard(): CardInput {
  return {
    eyebrow: "DEEPER DESIGNS",
    headline: "Colophon",
    tagline: "The materials and methods of Deeper Designs.",
    url: "deeperdesigns.in/colophon",
    accent: INDIGO,
  };
}

function showcaseCard(slug: string): CardInput | null {
  const s = SHOWCASES.find((x) => x.slug === slug);
  if (!s) return null;
  return {
    eyebrow: s.live ? "LIVE PRODUCT" : "CONCEPT BUILD",
    headline: s.cardLabel,
    tagline: s.outcome,
    url: `deeperdesigns.in/work/${slug}`,
    accent: SLUG_ACCENTS[slug] ?? INDIGO,
  };
}

async function loadMonogram(): Promise<string> {
  // Read the source SVG and bake in white fill so satori does not depend
  // on currentColor inheritance.
  const svg = await readFile(
    join(process.cwd(), "brand/v1/logo/monogram-primary.svg"),
    "utf8",
  );
  return svg.replace(/currentColor/g, "#FAFAFA");
}

async function loadFontBuffer(rel: string): Promise<ArrayBuffer> {
  const buf = await readFile(join(process.cwd(), rel));
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength) as ArrayBuffer;
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> },
) {
  const { slug } = await ctx.params;

  const card = slug === "colophon" ? colophonCard() : showcaseCard(slug);
  if (!card) {
    return new Response("Not found", { status: 404 });
  }

  // Brand fonts shipped under /og-fonts at the repo root. Read at request
  // time so the OG renderer matches site typography.
  let fonts: Array<{ name: string; data: ArrayBuffer; weight: 400 | 600; style: "normal" | "italic" }> = [];
  try {
    const [sans, sansBold, serif] = await Promise.all([
      loadFontBuffer("og-fonts/Geist-Regular.ttf"),
      loadFontBuffer("og-fonts/Geist-SemiBold.ttf"),
      loadFontBuffer("og-fonts/InstrumentSerif-Italic.ttf"),
    ]);
    fonts = [
      { name: "Geist", data: sans, weight: 400, style: "normal" },
      { name: "Geist", data: sansBold, weight: 600, style: "normal" },
      { name: "Instrument Serif", data: serif, weight: 400, style: "italic" },
    ];
  } catch {
    // Fonts not present; satori will fall back to its bundled defaults.
    fonts = [];
  }

  const monogram = await loadMonogram();

  return new ImageResponse(
    (
      <div
        style={{
          width: W,
          height: H,
          background: BG,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          fontFamily: "Geist",
          color: "#F5F5F5",
          padding: 64,
        }}
      >
        {/* accent wash */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: accentWash(card.accent, 0.08),
            display: "flex",
          }}
        />

        {/* top row: monogram + eyebrow */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/svg+xml;utf8,${encodeURIComponent(monogram)}`}
            width={64}
            height={32}
            alt=""
            style={{ display: "block" }}
          />
          <span
            style={{
              fontFamily: "Geist",
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: "0.22em",
              color: "#F5F5F5",
              textTransform: "uppercase",
            }}
          >
            {card.eyebrow}
          </span>
        </div>

        {/* center: headline + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            paddingTop: 40,
            paddingBottom: 40,
            gap: 28,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "Geist",
              fontWeight: 600,
              fontSize: 80,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#F5F5F5",
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {card.headline}
          </div>
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 36,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: card.accent,
              maxWidth: 1000,
              display: "flex",
            }}
          >
            {card.tagline}
          </div>
        </div>

        {/* bottom: route URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: "Geist",
              fontWeight: 400,
              fontSize: 18,
              letterSpacing: "0.06em",
              color: "#A8A8A8",
            }}
          >
            {card.url}
          </span>
        </div>
      </div>
    ),
    {
      width: W,
      height: H,
      fonts,
    },
  );
}

// Pre-render all known OG cards at build time.
export function generateStaticParams() {
  return [
    ...SHOWCASES.map((s) => ({ slug: s.slug })),
    { slug: "colophon" },
  ];
}
