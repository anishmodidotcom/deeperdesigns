import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import OngoingRelationship from "@/components/OngoingRelationship";
import Scenarios from "@/components/Scenarios";
import { renderSerif } from "@/components/industry/text";

// v30 part 7: /about becomes the founder page. Strategy first, then the
// building, with the founder in the middle of it rather than a studio
// origin story. Copy is final and verbatim.
//
// v30.1: the founder portrait supplied by Anish now fills the slot the
// v30 pass left marked. Converted to webp at quality 88 with the EXIF
// orientation applied and all metadata stripped.

const DESCRIPTION =
  "Deeper Designs finds what is holding a business back and builds the system that fixes it. One team for the thinking and the building.";

export const metadata: Metadata = {
  title: "About · Deeper Designs",
  description: DESCRIPTION,
  alternates: { canonical: "https://www.deeperdesigns.in/about" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "About · Deeper Designs",
    description: DESCRIPTION,
    url: "https://www.deeperdesigns.in/about",
    siteName: "Deeper Designs",
    images: [
      {
        url: "/brand/og-deeperdesigns.png",
        width: 1200,
        height: 630,
        alt: "About · Deeper Designs",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About · Deeper Designs",
    description: DESCRIPTION,
    images: ["/brand/og-deeperdesigns.png"],
  },
};

const FOUNDER_POINTS = [
  {
    icon: <IconCompass />,
    lead: "A decade in business strategy",
    body: "Marketing, branding, sales, go-to-market, pricing, retention, e-commerce, across many businesses. Then AI changed the economics of execution.",
  },
  {
    icon: <IconLayers />,
    lead: "From advising to building",
    body: 'The advice used to end at "here is what to do." Now the same team builds the system that does it. Four live products prove it: Outpost, Oviya Studio, Deeper Content and Maple Lens.',
  },
  {
    icon: <IconPeople />,
    lead: "Founder-led, senior-led",
    body: "Strategy, design, AI and engineering, one team, working from Delhi and Dubai, with the founder in every engagement.",
  },
];

// The same three points as the homepage method section, by design: the
// thinking does not change between pages.
const HOW_WE_THINK = [
  {
    icon: <IconTarget />,
    lead: "The objective sets the brief",
    body: "What you want to change, in your words.",
  },
  {
    icon: <IconCalculator />,
    lead: "The economics decide the build",
    body: "If building it will not pay for itself, we tell you, and we do not build it.",
  },
  {
    icon: <IconFlask />,
    lead: "We test before we scale",
    body: "Prototype, measure, then expand what works.",
  },
];

export default function About() {
  return (
    <main id="main" style={{ paddingTop: "120px" }}>
      {/* Hero */}
      <section style={{ padding: "80px 0 var(--section-py)" }}>
        <div className="container" style={{ maxWidth: "880px" }}>
          <p className="eyebrow" style={{ marginBottom: "24px" }}>
            WHO WE ARE
          </p>
          <h1
            style={{
              fontSize: "var(--fs-display)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
              textWrap: "pretty",
            }}
          >
            {renderSerif("Strategy first, {serif}then we build it.{/serif}")}
          </h1>
          <p
            style={{
              fontSize: "21px",
              color: "var(--fg-muted)",
              lineHeight: 1.6,
              margin: 0,
              maxWidth: "62ch",
              textWrap: "pretty",
            }}
          >
            Deeper Designs finds what is holding a business back and builds the
            system that fixes it. One team for the thinking and the building.
          </p>
        </div>
      </section>

      {/* The founder */}
      <section
        style={{
          padding: "var(--section-py) 0",
          background: "var(--bg-elev)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div className="container" style={{ maxWidth: "1000px" }}>
          <p
            className="mono"
            style={{
              fontSize: "12px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
              margin: "0 0 32px",
            }}
          >
            Anish Modi · Founder
          </p>

          <div className="about-founder-grid">
            {/* v30.1: the real portrait replaces the v30 placeholder.
                The source is 1200x1500, already inside the 1600 cap, so
                it is stored at native size rather than upscaled. */}
            <Image
              src="/images/about/anish-modi.webp"
              alt="Anish Modi, founder of Deeper Designs"
              width={1200}
              height={1500}
              sizes="(max-width: 768px) 100vw, 320px"
              priority
              style={{
                width: "100%",
                height: "auto",
                display: "block",
                borderRadius: "16px",
                border: "1px solid var(--border)",
              }}
            />

            <div style={{ display: "grid", gap: "28px", alignContent: "start" }}>
              {FOUNDER_POINTS.map((p) => (
                <PointRow key={p.lead} {...p} />
              ))}
              <p style={{ margin: 0 }}>
                <a
                  className="mono"
                  href="https://anishmodi.com"
                  target="_blank"
                  rel="noopener"
                  style={{
                    fontSize: "12px",
                    letterSpacing: "0.16em",
                    color: "var(--accent)",
                  }}
                >
                  ANISHMODI.COM
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we think */}
      <section style={{ padding: "var(--section-py) 0" }}>
        <div className="container" style={{ maxWidth: "1000px" }}>
          <p
            className="mono"
            style={{
              fontSize: "12px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--accent)",
              margin: "0 0 32px",
            }}
          >
            How we think
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(min(100%,280px),1fr))",
              gap: "28px",
            }}
          >
            {HOW_WE_THINK.map((p) => (
              <PointRow key={p.lead} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Real scenarios, the same six as the homepage */}
      <Scenarios />

      {/* The ongoing relationship, also on /trust */}
      <OngoingRelationship />

      {/* CTA */}
      <section style={{ padding: "var(--section-py) 0" }}>
        <div
          className="container"
          style={{ textAlign: "center", maxWidth: "880px" }}
        >
          <h2
            style={{
              fontSize: "var(--fs-h1)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            What could you build next?
          </h2>
          <div
            style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link href="/audit" className="btn-outline">
              Get a free audit
            </Link>
            <Link href="/start-your-study" className="btn-whatsapp">
              Talk to us
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .about-founder-grid {
          display: grid;
          grid-template-columns: minmax(0, 320px) 1fr;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-founder-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </main>
  );
}

function PointRow({
  icon,
  lead,
  body,
}: {
  icon: React.ReactNode;
  lead: string;
  body: string;
}) {
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
      <span style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }}>
        {icon}
      </span>
      <p style={{ margin: 0, fontSize: "17px", lineHeight: 1.6 }}>
        <span style={{ fontWeight: 500 }}>{lead}</span>
        <br />
        <span style={{ color: "var(--fg-muted)" }}>{body}</span>
      </p>
    </div>
  );
}

/* Line icons, uniform 1.5 stroke on a 24 grid. */

function Svg({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={{
        stroke: "currentColor",
        strokeWidth: 1.5,
        fill: "none",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        display: "block",
      }}
    >
      {children}
    </svg>
  );
}

function IconCompass() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5l-2 5-5 2 2-5z" />
    </Svg>
  );
}

function IconLayers() {
  return (
    <Svg>
      <path d="M12 2.8l9 4.4-9 4.4-9-4.4z" />
      <path d="M3 12.2l9 4.4 9-4.4" />
      <path d="M3 16.9l9 4.4 9-4.4" />
    </Svg>
  );
}

function IconPeople() {
  return (
    <Svg>
      <circle cx="9" cy="8" r="3.4" />
      <path d="M2.8 20.2a6.4 6.4 0 0112.4 0" />
      <path d="M16 5a3.4 3.4 0 010 6.5" />
      <path d="M17.8 14.6a6.4 6.4 0 013.4 5.6" />
    </Svg>
  );
}

function IconTarget() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1.8v3.4M12 18.8v3.4M1.8 12h3.4M18.8 12h3.4" />
    </Svg>
  );
}

function IconCalculator() {
  return (
    <Svg>
      <rect x="4.5" y="2.5" width="15" height="19" rx="2" />
      <path d="M8 6.5h8" />
      <path d="M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01" />
    </Svg>
  );
}

function IconFlask() {
  return (
    <Svg>
      <path d="M9.5 2.5h5" />
      <path d="M10.5 2.5v6L5.2 18.2A2 2 0 007 21.2h10a2 2 0 001.8-3L13.5 8.5v-6" />
      <path d="M7.6 14.5h8.8" />
    </Svg>
  );
}
