import type { Metadata } from "next";
import AnishNote from "@/components/AnishNote";

export const metadata: Metadata = {
  title: "Colophon · Deeper Designs",
  description:
    "The materials and methods of Deeper Designs. The stack, the typography, the photography, and how we use AI co-workers to ship.",
  alternates: { canonical: "https://www.deeperdesigns.in/colophon" },
  openGraph: {
    title: "Colophon · Deeper Designs",
    description: "The materials and methods of Deeper Designs.",
    url: "https://www.deeperdesigns.in/colophon",
    type: "article",
    images: [
      {
        url: "/api/og/colophon",
        width: 1200,
        height: 630,
        alt: "Colophon · Deeper Designs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Colophon · Deeper Designs",
    description: "The materials and methods of Deeper Designs.",
    images: ["/api/og/colophon"],
  },
};

const SECTIONS = [
  {
    heading: "The site",
    body: "Next.js 16, App Router, deployed on Vercel. Built in TypeScript. Tailwind v4 with custom tokens at /brand/v1/tokens.css. Motion via Motion (formerly Framer Motion) and GSAP where state machines need finer control. Smooth scroll via Lenis.",
  },
  {
    heading: "The typography",
    body: "Geist Sans (display + body) and Geist Mono (eyebrows + labels + status pills), both via next/font/google. Instrument Serif Italic for editorial moments: pull quotes, founder voice, margin annotations. Hierarchy is strict: italic serif carries emotion, mono carries data, sans carries everything else.",
  },
  {
    heading: "The photography",
    body: "Hero and showcase photography is AI-generated using Nano Banana (Gemini), Veo 3, and Kling, then graded in Photoshop. No stock photography. No Unsplash. Every founder pictured on a showcase page is a composite of the brief we wrote for that page: fictional people in real-feeling environments. Where we use real photography (Anish's portrait, brand v1 monogram), it is labeled in the alt text.",
  },
  {
    heading: "The build process",
    body: 'We use AI as a co-worker. Most of the code in this repo was written collaboratively with Claude Code, an AI engineering tool made by Anthropic. We made every architectural and brand decision. Claude wrote the implementations. We reviewed every PR before merging.\n\nThe Git author log will show many Claude commits. We could rewrite history to hide that. We are not going to. AI co-workers are how this studio gets work done at the speed and quality we promise our clients. The repo reflects that honestly.\n\nWhat we do not include in this repo: our positioning playbook (internal), our pricing models (internal), our cost data per asset (internal). Some craft stays inside the workshop.\n\nTwo verification tools were not run in the Signature pass and are accepted as open gaps: Impeccable (stack-classifier, low signal for our purposes) and Lighthouse (performance, treated as a useful diagnostic rather than a craft gate). We close them opportunistically when a PSI key or working headless Chromium is available, not as a blocker.',
  },
  {
    heading: "The stack",
    body: "Claude (strategy + briefs), Gemini (image + brief expansion), Veo 3 (motion), Kling (motion alt), Next.js, Vercel, Supabase (when needed), Resend (email), Tailwind.",
  },
  {
    heading: "Anish Modi",
    body: "Built in Delhi. WhatsApp first. anish.modi@deeperdesigns.in. deeperdesigns.in.",
  },
] as const;

const pageStyle = {
  background: "var(--dd-bg)",
  color: "var(--dd-text-high)",
  minHeight: "100vh",
} as React.CSSProperties;

export default function Colophon() {
  return (
    <main style={pageStyle}>
      <section
        style={{
          maxWidth: 840,
          marginInline: "auto",
          paddingInline: "clamp(20px, 4vw, 48px)",
          paddingTop: 160,
          paddingBottom: 120,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--dd-indigo-soft, #818CF8)",
            margin: 0,
            marginBottom: 32,
          }}
        >
          MATERIALS · METHODS · 2026
        </p>

        <h1
          style={{
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontWeight: 600,
            fontSize: "clamp(48px, 7vw, 88px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.02,
            margin: 0,
            marginBottom: 24,
          }}
        >
          Colophon
        </h1>

        <p
          style={{
            fontFamily: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(22px, 2.4vw, 30px)",
            lineHeight: 1.35,
            color: "var(--dd-text-mid)",
            margin: 0,
            marginBottom: 96,
            maxWidth: 640,
          }}
        >
          The materials and methods of Deeper Designs.
        </p>

        {SECTIONS.map((s, idx) => (
          <article
            key={s.heading}
            style={{
              paddingBlock: 56,
              borderTop: "1px solid var(--dd-border)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 28,
                letterSpacing: "-0.01em",
                lineHeight: 1.2,
                margin: 0,
                marginBottom: 20,
              }}
            >
              {s.heading}
            </h2>

            {s.body.split("\n\n").map((para, pi) => (
              <p
                key={pi}
                style={{
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--dd-text-mid)",
                  margin: 0,
                  marginBottom: pi < s.body.split("\n\n").length - 1 ? 18 : 0,
                  maxWidth: 680,
                }}
              >
                {para}
              </p>
            ))}

            {idx === 3 ? (
              <div style={{ marginTop: 32 }}>
                <AnishNote
                  text="We say the studio is two of us when we count Claude. It is, in practice. The decisions are ours; the typing is shared."
                  align="right"
                  variant="inline"
                />
              </div>
            ) : null}
          </article>
        ))}

        <p
          style={{
            paddingTop: 56,
            borderTop: "1px solid var(--dd-border)",
            fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--dd-text-low)",
            margin: 0,
          }}
        >
          DEEPER DESIGNS · DELHI · {new Date().getFullYear()}
        </p>
      </section>
    </main>
  );
}
