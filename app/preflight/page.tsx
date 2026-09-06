import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./preflight.css";
import AuditReport from "./_components/AuditReport";
import ChecklistPhone from "./_components/ChecklistPhone";
import Faq, { type FaqItem } from "./_components/Faq";
import OrderForm from "./_components/OrderForm";
import PreflightAnalytics from "./_components/PreflightAnalytics";
import {
  IconBuilding,
  IconCheckCircle,
  IconChecklist,
  IconCreditMint,
  IconCross,
  IconCrossCircle,
  IconCrossTenant,
  IconDatabaseLeak,
  IconEvidence,
  IconEyeCrossed,
  IconFieldNotes,
  IconFloor,
  IconGuide,
  IconKey,
  IconLayers,
  IconNoProof,
  IconNoRecovery,
  IconPasteProtocol,
  IconRefresh,
  IconReport,
  IconShield,
  IconShieldBolt,
  IconStack,
  IconTarget,
  IconTerminal,
  IconTick,
  IconVerdict,
} from "./_components/Icons";
import { SUPPORT_EMAIL } from "@/lib/contact";
import { priceLabel } from "@/lib/preflight";
import { PRODUCTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "Preflight · Launch audit suite for AI-built products",
  description:
    "Five adversarial audit protocols you run yourself. Paste one into your coding agent, point it at your live product, get a scored verdict and a gap list.",
  alternates: { canonical: "https://www.deeperdesigns.in/preflight" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Preflight · Launch audit suite for AI-built products",
    description:
      "Five adversarial audit protocols you run yourself. Paste one into your coding agent, point it at your live product, get a scored verdict and a gap list.",
    url: "https://www.deeperdesigns.in/preflight",
    siteName: "Deeper Designs",
    type: "website",
    images: [
      {
        url: "/api/og/preflight",
        width: 1200,
        height: 630,
        alt: "Preflight · Audit your AI-built product before your users do.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preflight · Launch audit suite for AI-built products",
    description:
      "Five adversarial audit protocols you run yourself. Paste one into your coding agent, point it at your live product, get a scored verdict and a gap list.",
    images: ["/api/og/preflight"],
  },
};

const MONO = "var(--font-geist-mono), monospace";
const SERIF = "var(--font-instrument-serif), Georgia, serif";

/* ---------- shared style objects, lifted verbatim from the export ---------- */

const section = (band: boolean): React.CSSProperties => ({
  padding: "clamp(72px,10vh,132px) clamp(20px,4vw,48px)",
  background: band ? "#111111" : undefined,
  borderBottom: "1px solid rgba(255,255,255,0.08)",
});

const inner: React.CSSProperties = { maxWidth: 1240, margin: "0 auto" };

const eyebrow: React.CSSProperties = {
  margin: "0 0 20px",
  fontFamily: MONO,
  fontSize: 12,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "#C8C8C8",
};

const h2: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(30px,3.6vw,50px)",
  lineHeight: 1.12,
  letterSpacing: "-0.02em",
  fontWeight: 500,
  textWrap: "pretty",
};

const body: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(16px,1.2vw + 8px,18px)",
  lineHeight: 1.55,
  color: "#F5F5F5",
  textWrap: "pretty",
};

const bodyMuted: React.CSSProperties = { ...body, color: "#A8A8A8" };

const serif: React.CSSProperties = {
  fontFamily: SERIF,
  fontStyle: "italic",
  fontWeight: 400,
};

function IconSlot({
  colour = "#7C6CFF",
  top = 2,
  children,
}: {
  colour?: string;
  top?: number;
  children: React.ReactNode;
}) {
  return (
    <span style={{ color: colour, flexShrink: 0, marginTop: top }}>{children}</span>
  );
}

/* ---------- content ---------- */

const WHY_POINTS = [
  {
    icon: <IconShieldBolt />,
    text: (
      <>
        Roughly 45% of AI-generated code carries an OWASP Top 10 vulnerability.{" "}
        <span style={{ color: "#6B6B6B" }}>(Veracode, 2025)</span>
      </>
    ),
  },
  {
    icon: <IconDatabaseLeak />,
    text: (
      <>
        170 apps built on one AI builder leaked user data through a security
        policy that existed but did not restrict anything.{" "}
        <span style={{ color: "#6B6B6B" }}>(CVE-2025-48757)</span>
      </>
    ),
  },
  {
    icon: <IconEyeCrossed />,
    text: "The controls that fail most often look correctly configured. Reading the code passes them. Probing the live product does not.",
  },
  {
    icon: <IconTarget />,
    text: "Preflight probes your live product with the wrong credentials, the wrong role, and the wrong network, then reports what actually happens.",
  },
];

const PROOF_CARDS = [
  {
    icon: <IconCrossTenant size={26} />,
    title: "A cross-tenant data leak",
    lines: [
      "Any free signup could read another customer's full asset library by changing one HTTP header.",
      "Proven live: 94 rows returned from another tenant.",
    ],
    close: "Fixed before a single external customer was onboarded.",
  },
  {
    icon: <IconCreditMint size={26} />,
    title: "A live credit-minting exploit",
    lines: [
      "An anonymous caller could grant themselves 100,000 credits and delete other users' accounts.",
      "The revoke in the code looked correct and did nothing.",
    ],
    close: "Fixed and confirmed dead by live probe.",
  },
  {
    icon: <IconNoRecovery size={26} />,
    title: "No recovery path",
    lines: [
      "A production database with no backups, no point-in-time recovery, and hard deletes on every row.",
      "Escalated to a launch blocker.",
    ],
    close: "Fixed before launch.",
  },
];

const PROTOCOLS: {
  name: string;
  stat: string;
  lines: string[];
  close?: string;
  bars: [number, boolean][];
}[] = [
  {
    name: "Security hardening",
    stat: "9 layers · 159 checks · 6 launch blockers",
    lines: [
      "Tenant isolation, secrets in the client, authorization at the data layer, payment webhooks, supply chain, AI endpoints and agents, infrastructure, privacy.",
    ],
    close: "Weakest-link scored: the grade is the lowest layer, never the average.",
    bars: [
      [60, true],
      [85, true],
      [45, false],
      [100, true],
      [70, false],
    ],
  },
  {
    name: "Resilience and operations",
    stat: "6 layers · 105 checks · 5 launch blockers",
    lines: [
      "Load and capacity, backups and disaster recovery, spend caps and denial-of-wallet, observability and incident response, data lifecycle and migration safety, content safety.",
    ],
    bars: [
      [75, true],
      [40, false],
      [95, true],
      [55, false],
      [80, true],
    ],
  },
  {
    name: "Journey",
    stat: "4 layers plus sub-domains · 113 checks · 5 hard gates",
    lines: [
      "Core Web Vitals, WCAG 2.2, onboarding, conversion path, discoverability, trust surfaces.",
    ],
    close: "Mobile-first, scored on throttled 4G and a mid-tier phone.",
    bars: [
      [50, false],
      [100, true],
      [65, true],
      [35, false],
      [85, true],
    ],
  },
  {
    name: "Signature",
    stat: "5 layers · 115 checks",
    lines: [
      "Robustness under stress, motion, typography, states and edge cases, interface copy.",
    ],
    close: "The craft signal AI generation leaves out, with a dated fingerprint module.",
    bars: [
      [90, true],
      [55, false],
      [70, true],
      [100, true],
      [40, false],
    ],
  },
  {
    name: "Hallmark",
    stat: "5 layers · 100 checks",
    lines: ["Brand distinctiveness and coherence across every surface."],
    close: "Measured against evidence, not feeling.",
    bars: [
      [65, true],
      [100, true],
      [45, false],
      [75, true],
      [60, false],
    ],
  },
];

const KIT_POINTS = [
  {
    icon: <IconGuide />,
    lead: "Operator guide.",
    rest: " The access you need, the run order, how to read a verdict.",
  },
  {
    icon: <IconChecklist />,
    lead: "Four checklists, 61 items.",
    rest: " Pre-run inputs, the master launch-blocker list, silent-failure controls, re-cert triggers, and a fifteen-minute monthly check.",
  },
  {
    icon: <IconReport />,
    lead: "Report template.",
    rest: " Fill it as you go, so evidence never gets lost to a summary.",
  },
  {
    icon: <IconFieldNotes />,
    lead: "Field notes.",
    rest: " 16 findings from real audits, including the four-layer SECURITY DEFINER fix, the shared-tenant question, and the uncapped-provider check.",
  },
  {
    icon: <IconRefresh />,
    lead: "12 months of refreshes",
    rest: " as CVEs, standards, and framework versions move.",
  },
];

const STEPS = [
  {
    number: "01",
    icon: <IconTerminal />,
    title: "Open your coding agent with your repo.",
    text: "Claude Code, Cowork, Cursor agent, Codex, or any agent that can read your repo and reach your live URL.",
    logo: true,
  },
  {
    number: "02",
    icon: <IconPasteProtocol />,
    title: "Paste one protocol as the first message.",
    text: "Give it the inputs it asks for: your live URL, two test accounts, database access.",
    logo: false,
  },
  {
    number: "03",
    icon: <IconVerdict />,
    title: "Read the verdict.",
    text: "It probes your live product and hands you a scored verdict, a launch-blocker table, and a gap list with fixes and effort.",
    logo: false,
  },
];

const GOOD_FIT = [
  "You built, or are building, a product with AI coding tools.",
  "You can run a coding agent against your own repo.",
  "You have access to your database and hosting consoles.",
  "You would rather find it yourself than read about it later.",
];

const NOT_FIT = [
  "You only have a chat window and no repo access. The protocols need to run probes.",
  "You want someone to run the audit for you. That is a service, and we offer it separately.",
];

const PASS_POINTS = [
  { icon: <IconFloor />, text: "Passing is an evidenced floor, not a guarantee." },
  {
    icon: <IconEvidence />,
    text: "The protocols prove the controls that exist and the results of the probes they ran.",
  },
  { icon: <IconNoProof />, text: "They cannot prove the absence of a vulnerability." },
  {
    icon: <IconStack />,
    text: "They do not replace penetration testing, threat modeling, or legal counsel. They make those cheaper and shorter.",
  },
];

// Section 08. Final copy, supplied by DD Brain, replacing the export's
// placeholder in full.
const STUDIO_POINTS = [
  {
    icon: <IconBuilding />,
    text: "Deeper Designs is a build studio working from Delhi and Dubai. We build custom software and AI systems for Indian businesses, shaped to how each one already works.",
  },
  {
    icon: <IconLayers />,
    text: "We run four live products of our own: Outpost, Oviya Studio, Deeper Content and Maple Lens. Preflight was run against our own products before it was sold to anyone.",
  },
  {
    icon: <IconShield />,
    text: "Preflight exists because we needed it. It found a cross-tenant leak and a credit-minting exploit in our own products before launch. Now it is the protocol we ship with.",
  },
  {
    icon: <IconKey />,
    text: "Everything we build is owned by the client. One price, agreed in writing before we start. No per-seat licence.",
  },
];

const INCLUDED = [
  "Five audit protocols",
  "Operator guide",
  "Four checklists, 61 items",
  "Report template",
  "Field notes, 16 findings",
  "12 months of refreshes",
];

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What do I need to run Preflight?",
    a: "A coding agent that can read your repo and reach your live deployment, two test accounts at the same privilege level, and access to your database and hosting consoles.",
  },
  {
    q: "Can I run it in a plain chat window?",
    a: "No. The protocols run live probes against your product. A chat window with no repo or network access cannot do that.",
  },
  {
    q: "Does a passing grade mean my product is secure?",
    a: "No. It means the documented failure modes were tested and did not reproduce on audit day. It is an evidenced floor, not a guarantee.",
  },
  {
    q: "How often should I re-run it?",
    a: "Each protocol lists its cadence and triggers. At minimum: continuous automated scanning, a quarterly pass, a full re-audit yearly or on any listed trigger such as a new framework version or a new AI feature.",
  },
  {
    q: "What are refreshes?",
    a: "The protocols name specific CVEs, standards, and framework versions. When those move, the protocols are updated. You receive updated files for twelve months.",
  },
  {
    q: "What is the refund policy?",
    a: "There is no refund. Preflight is a digital download and you receive the full package once payment is confirmed. Read what is inside and who it is for before you buy.",
  },
  {
    q: "Can I get a refund?",
    a: "No. Preflight is a digital download, delivered in full on payment, so there are no refunds.",
  },
];

export default function PreflightPage() {
  const product = PRODUCTS.preflight;

  return (
    <main id="main" className="pf-root">
      <PreflightAnalytics />

      {/* SECTION 1: HERO */}
      <section
        style={{
          padding:
            "clamp(56px,8vh,104px) clamp(20px,4vw,48px) clamp(64px,9vh,120px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            ...inner,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))",
            gap: "clamp(40px,5vw,72px)",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 28px",
                fontFamily: MONO,
                fontSize: 12,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#7C6CFF",
              }}
            >
              Preflight · Launch audit suite for AI-built products
            </p>
            <h1
              style={{
                margin: "0 0 24px",
                fontSize: "clamp(38px,5.2vw,66px)",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                fontWeight: 500,
                textWrap: "pretty",
              }}
            >
              Audit your AI-built product{" "}
              <span style={serif}>before your users do.</span>
            </h1>
            <p
              style={{
                margin: "0 0 36px",
                maxWidth: 620,
                fontSize: "clamp(17px,1.1vw + 9px,21px)",
                lineHeight: 1.6,
                color: "#A8A8A8",
                textWrap: "pretty",
              }}
            >
              Five adversarial audit protocols you run yourself. Paste one into
              your coding agent, point it at your live product, get a scored
              verdict and a gap list.
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: 20,
              }}
            >
              <a
                href="#get-preflight"
                className="pf-btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "16px 30px",
                  borderRadius: 999,
                  background: "#7C6CFF",
                  color: "#0A0A0A",
                  fontSize: 16,
                  fontWeight: 500,
                }}
              >
                Get Preflight <span aria-hidden="true">→</span>
              </a>
              <a
                href="#whats-inside"
                className="pf-link-underline"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 16,
                  color: "#F5F5F5",
                }}
              >
                See what&rsquo;s inside <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div
              style={{
                marginTop: "clamp(40px,5vw,56px)",
                paddingTop: 32,
                borderTop: "1px solid rgba(255,255,255,0.08)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))",
                gap: 24,
              }}
            >
              {[
                ["5", "Protocols"],
                ["29", "Layers"],
                ["592", "Checks"],
                ["12", "Months of refreshes"],
              ].map(([value, label]) => (
                <div key={label}>
                  <div
                    style={{
                      fontSize: "clamp(34px,3.4vw,46px)",
                      lineHeight: 1,
                      fontWeight: 500,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {value}
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontFamily: MONO,
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#6B6B6B",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AuditReport />
        </div>
      </section>

      {/* SECTION 2: WHY THIS EXISTS */}
      <section style={section(true)}>
        <div style={inner}>
          <p style={eyebrow}>01 · Why this exists</p>
          <h2 style={{ ...h2, margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 900 }}>
            AI builds fast. Preflight makes sure it{" "}
            <span style={serif}>ships safe.</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
              gap: "clamp(40px,5vw,64px)",
              alignItems: "start",
            }}
          >
            <div style={{ display: "grid", gap: 28 }}>
              {WHY_POINTS.map((point, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 18, alignItems: "flex-start" }}
                >
                  <IconSlot>{point.icon}</IconSlot>
                  <p style={body}>{point.text}</p>
                </div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
                gap: 16,
              }}
            >
              <div
                style={{
                  borderRadius: 12,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#0A0A0B",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: "12px 14px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#6B6B6B",
                    }}
                  >
                    Code review
                  </span>
                  <span style={{ color: "#5BC48A" }}>
                    <IconTick size={16} />
                  </span>
                </div>
                <div
                  style={{
                    padding: 14,
                    display: "grid",
                    gap: 8,
                    fontFamily: MONO,
                    fontSize: 11,
                    lineHeight: 1.5,
                    color: "#A8A8A8",
                  }}
                >
                  <span>policy &quot;tenant_read&quot; enabled</span>
                  <span style={{ color: "#6B6B6B" }}>
                    using (auth.uid() is not null)
                  </span>
                  <span>role checks present</span>
                </div>
                <div
                  style={{
                    padding: "11px 14px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#5BC48A",
                  }}
                >
                  Pass
                </div>
              </div>

              <div
                style={{
                  borderRadius: 12,
                  border: "1px solid rgba(229,132,124,0.45)",
                  background: "#0A0A0B",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                    padding: "12px 14px",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 10,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#6B6B6B",
                    }}
                  >
                    Live probe
                  </span>
                  <span style={{ color: "#E5847C" }}>
                    <IconCross size={16} />
                  </span>
                </div>
                <div
                  style={{
                    padding: 14,
                    display: "grid",
                    gap: 8,
                    fontFamily: MONO,
                    fontSize: 11,
                    lineHeight: 1.5,
                    color: "#A8A8A8",
                  }}
                >
                  <span>GET /api/assets</span>
                  <span style={{ color: "#6B6B6B" }}>x-tenant-id: other-tenant</span>
                  <span style={{ color: "#E5847C" }}>OK · 94 rows returned</span>
                </div>
                <div
                  style={{
                    padding: "11px 14px",
                    borderTop: "1px solid rgba(255,255,255,0.06)",
                    fontFamily: MONO,
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#E5847C",
                  }}
                >
                  Fail
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: PROOF */}
      <section style={section(false)}>
        <div style={inner}>
          <p style={eyebrow}>02 · Proof</p>
          <h2 style={{ ...h2, margin: "0 0 20px" }}>
            Tested on our own products first.
          </h2>
          <p
            style={{
              margin: "0 0 clamp(36px,4vw,56px)",
              maxWidth: 760,
              fontSize: "clamp(16px,1.2vw + 8px,20px)",
              lineHeight: 1.6,
              color: "#A8A8A8",
              textWrap: "pretty",
            }}
          >
            Before launch, we ran every protocol on three live products we built.
            This is what it found.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
              gap: 20,
            }}
          >
            {PROOF_CARDS.map((card) => (
              <div
                key={card.title}
                className="pf-card-hover"
                style={{
                  padding: "clamp(24px,2.4vw,32px)",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#161616",
                }}
              >
                <span
                  style={{
                    color: "#7C6CFF",
                    display: "inline-flex",
                    marginBottom: 20,
                  }}
                >
                  {card.icon}
                </span>
                <h3
                  style={{
                    margin: "0 0 16px",
                    fontSize: "clamp(20px,1.6vw,24px)",
                    lineHeight: 1.25,
                    fontWeight: 500,
                  }}
                >
                  {card.title}
                </h3>
                <div style={{ display: "grid", gap: 10 }}>
                  {card.lines.map((line) => (
                    <p key={line} style={{ ...bodyMuted, lineHeight: 1.5 }}>
                      {line}
                    </p>
                  ))}
                  <p style={{ ...body, color: "#F5F3EF", lineHeight: 1.5 }}>
                    {card.close}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              margin: "clamp(28px,3vw,40px) 0 0",
              paddingTop: 24,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              fontSize: "clamp(16px,1.2vw + 8px,18px)",
              lineHeight: 1.6,
              color: "#A8A8A8",
            }}
          >
            Every finding above was made by the protocols in this package, on
            products we built.
          </p>
        </div>
      </section>

      {/* SECTION 4: WHAT'S INSIDE */}
      <section id="whats-inside" style={section(true)}>
        <div style={inner}>
          <p style={eyebrow}>03 · What&rsquo;s inside</p>
          <h2 style={{ ...h2, margin: "0 0 20px" }}>
            Five protocols. 592 checks. Every layer scored.
          </h2>
          <p
            style={{
              margin: "0 0 clamp(36px,4vw,56px)",
              maxWidth: 760,
              fontSize: "clamp(16px,1.2vw + 8px,20px)",
              lineHeight: 1.6,
              color: "#A8A8A8",
              textWrap: "pretty",
            }}
          >
            Each protocol is a complete audit prompt. Paste it, give it inputs,
            let it run.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))",
              gap: 16,
            }}
          >
            {PROTOCOLS.map((protocol) => (
              <div
                key={protocol.name}
                className="pf-card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: 24,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#0A0A0B",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: 4,
                    alignItems: "flex-end",
                    height: 26,
                    marginBottom: 20,
                  }}
                  aria-hidden="true"
                >
                  {protocol.bars.map(([height, solid], i) => (
                    <span
                      key={i}
                      style={{
                        width: 5,
                        height: `${height}%`,
                        background: solid ? "#7C6CFF" : "rgba(124,108,255,0.4)",
                        borderRadius: 2,
                      }}
                    />
                  ))}
                </div>
                <h3
                  style={{
                    margin: "0 0 10px",
                    fontFamily: MONO,
                    fontSize: 13,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#F5F3EF",
                  }}
                >
                  {protocol.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 18px",
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    color: "#7C6CFF",
                    lineHeight: 1.5,
                  }}
                >
                  {protocol.stat}
                </p>
                {protocol.lines.map((line) => (
                  <p
                    key={line}
                    style={{
                      margin: protocol.close ? "0 0 12px" : 0,
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: "#A8A8A8",
                      textWrap: "pretty",
                    }}
                  >
                    {line}
                  </p>
                ))}
                {protocol.close ? (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      lineHeight: 1.55,
                      color: "#F5F3EF",
                      textWrap: "pretty",
                    }}
                  >
                    {protocol.close}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: THE OPERATOR KIT */}
      <section style={section(false)}>
        <div style={inner}>
          <p style={eyebrow}>04 · The operator kit</p>
          <h2 style={{ ...h2, margin: "0 0 clamp(40px,5vw,64px)" }}>
            Plus everything you need to <span style={serif}>run them.</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))",
              gap: "clamp(40px,5vw,72px)",
              alignItems: "center",
            }}
          >
            <div style={{ display: "grid", gap: 26 }}>
              {KIT_POINTS.map((point) => (
                <div
                  key={point.lead}
                  style={{ display: "flex", gap: 18, alignItems: "flex-start" }}
                >
                  <IconSlot>{point.icon}</IconSlot>
                  <p style={body}>
                    <span style={{ color: "#F5F3EF", fontWeight: 500 }}>
                      {point.lead}
                    </span>
                    <span style={{ color: "#A8A8A8" }}>{point.rest}</span>
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <ChecklistPhone />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW IT WORKS */}
      <section style={section(true)}>
        <div style={inner}>
          <p style={eyebrow}>05 · How it works</p>
          <h2 style={{ ...h2, margin: "0 0 clamp(40px,5vw,64px)" }}>
            How it works
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
              gap: 20,
            }}
          >
            {STEPS.map((step) => (
              <div
                key={step.number}
                style={{
                  padding: "clamp(24px,2.4vw,32px)",
                  borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#0A0A0B",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    marginBottom: 24,
                  }}
                >
                  <span
                    style={{
                      fontFamily: MONO,
                      fontSize: 12,
                      letterSpacing: "0.16em",
                      color: "#7C6CFF",
                    }}
                  >
                    {step.number}
                  </span>
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    {step.logo ? (
                      // A 20px mark gains nothing from the image
                      // optimizer, and next/image's default lazy loading
                      // leaves it blank until it scrolls into view, which
                      // is visible on a fast scroll and in print.
                      <Image
                        src="/logos/github.svg"
                        alt="GitHub"
                        width={20}
                        height={20}
                        unoptimized
                        loading="eager"
                        style={{
                          display: "block",
                          opacity: 0.55,
                          filter: "invert(1)",
                        }}
                      />
                    ) : null}
                    <span style={{ color: "#7C6CFF", display: "inline-flex" }}>
                      {step.icon}
                    </span>
                  </span>
                </div>
                <h3
                  style={{
                    margin: "0 0 12px",
                    fontSize: "clamp(19px,1.5vw,23px)",
                    lineHeight: 1.3,
                    fontWeight: 500,
                    textWrap: "pretty",
                  }}
                >
                  {step.title}
                </h3>
                <p style={bodyMuted}>{step.text}</p>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "clamp(32px,4vw,48px)",
              paddingTop: 28,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "14px 22px",
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#6B6B6B",
              }}
            >
              Works with:
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* The only coloured logo on the page. Served straight
                  from the file, unoptimized and eager, so the coral is
                  the supplied #D97757 and the mark is never blank. */}
              <Image
                src="/logos/claude-coral.svg"
                alt="Claude"
                width={20}
                height={20}
                unoptimized
                loading="eager"
                style={{ display: "block", width: 20, height: 20 }}
              />
              <span style={{ fontSize: 17, color: "#F5F3EF" }}>Claude Code</span>
            </span>
            <span style={{ color: "#3A3A3A" }} aria-hidden="true">
              ·
            </span>
            <span style={{ fontSize: 17, color: "#A8A8A8" }}>Cowork</span>
            <span style={{ color: "#3A3A3A" }} aria-hidden="true">
              ·
            </span>
            <span style={{ fontSize: 17, color: "#A8A8A8" }}>Cursor</span>
            <span style={{ color: "#3A3A3A" }} aria-hidden="true">
              ·
            </span>
            <span style={{ fontSize: 17, color: "#A8A8A8" }}>Codex</span>
          </div>
        </div>
      </section>

      {/* SECTION 7: WHO IT'S FOR */}
      <section style={section(false)}>
        <div style={inner}>
          <p style={eyebrow}>06 · Who it&rsquo;s for</p>
          <h2 style={{ ...h2, margin: "0 0 clamp(40px,5vw,64px)", maxWidth: 900 }}>
            Built for people shipping AI-built products.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))",
              gap: 20,
            }}
          >
            <div
              style={{
                padding: "clamp(24px,2.4vw,36px)",
                borderRadius: 16,
                border: "1px solid rgba(124,108,255,0.35)",
                background: "#161616",
              }}
            >
              <p
                style={{
                  margin: "0 0 26px",
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#7C6CFF",
                }}
              >
                A good fit
              </p>
              <div style={{ display: "grid", gap: 18 }}>
                {GOOD_FIT.map((line) => (
                  <div
                    key={line}
                    style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                  >
                    <IconSlot colour="#5BC48A" top={3}>
                      <IconCheckCircle size={20} />
                    </IconSlot>
                    <p style={body}>{line}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: "clamp(24px,2.4vw,36px)",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "#111111",
              }}
            >
              <p
                style={{
                  margin: "0 0 26px",
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#A8A8A8",
                }}
              >
                Not a fit
              </p>
              <div style={{ display: "grid", gap: 18 }}>
                {NOT_FIT.map((line) => (
                  <div
                    key={line}
                    style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                  >
                    <IconSlot colour="#E5847C" top={3}>
                      <IconCrossCircle size={20} />
                    </IconSlot>
                    <p style={bodyMuted}>{line}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: WHAT A PASS MEANS */}
      <section style={section(false)}>
        <div style={inner}>
          <p style={eyebrow}>07 · What a pass means</p>
          <h2 style={{ ...h2, margin: "0 0 clamp(36px,4vw,56px)", maxWidth: 900 }}>
            What a passing grade means, and{" "}
            <span style={serif}>what it does not.</span>
          </h2>

          <div
            style={{
              padding: "clamp(28px,3.5vw,52px)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.16)",
              background: "linear-gradient(180deg,#161616,#0F0F10)",
              boxShadow: "0 0 80px 0 rgba(124,108,255,0.08)",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
                gap: "clamp(24px,3vw,40px)",
              }}
            >
              {PASS_POINTS.map((point) => (
                <div
                  key={point.text}
                  style={{ display: "flex", gap: 16, alignItems: "flex-start" }}
                >
                  <IconSlot colour="#F5B544">{point.icon}</IconSlot>
                  <p style={{ ...body, color: "#F5F3EF" }}>{point.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: BUILT BY DEEPER DESIGNS */}
      <section style={section(true)}>
        <div style={inner}>
          <p style={eyebrow}>08 · Built by Deeper Designs</p>
          <h2 style={{ ...h2, margin: "0 0 clamp(40px,5vw,64px)" }}>
            Built by Deeper Designs.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,280px),1fr))",
              gap: 20,
            }}
          >
            {STUDIO_POINTS.map((point) => (
              <div
                key={point.text}
                style={{
                  padding: 28,
                  borderRadius: 14,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "#0A0A0B",
                }}
              >
                <span
                  style={{
                    color: "#7C6CFF",
                    display: "inline-flex",
                    marginBottom: 20,
                  }}
                >
                  {point.icon}
                </span>
                <p style={body}>{point.text}</p>
              </div>
            ))}
          </div>
          <p style={{ margin: "32px 0 0", fontSize: "clamp(16px,1.2vw + 8px,18px)" }}>
            <a
              href="https://deeperdesigns.in"
              target="_blank"
              rel="noopener"
              className="pf-link-underline"
            >
              deeperdesigns.in <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      </section>

      {/* SECTION 10: GET PREFLIGHT */}
      <section id="get-preflight" style={section(false)}>
        <div style={inner}>
          <p style={eyebrow}>09 · Get Preflight</p>
          <h2 style={{ ...h2, margin: "0 0 clamp(40px,5vw,64px)" }}>
            One price. Everything included.
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))",
              gap: "clamp(28px,3vw,48px)",
              alignItems: "start",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "clamp(40px,5vw,64px)",
                  lineHeight: 1,
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  color: "#F5F3EF",
                }}
              >
                {priceLabel(product.priceInr)}
              </div>
              <p
                style={{
                  margin: "14px 0 0",
                  fontFamily: MONO,
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#6B6B6B",
                }}
              >
                International cards accepted.
              </p>
              <div
                style={{
                  marginTop: "clamp(32px,3.5vw,44px)",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
                  gap: "14px 28px",
                }}
              >
                {INCLUDED.map((item) => (
                  <div
                    key={item}
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                  >
                    <IconSlot top={3}>
                      <IconTick size={18} />
                    </IconSlot>
                    <span
                      style={{
                        fontSize: "clamp(16px,1.2vw + 8px,18px)",
                        lineHeight: 1.5,
                        color: "#F5F5F5",
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <OrderForm
              product={{
                slug: product.slug,
                name: product.name,
                description: product.description,
                priceInr: product.priceInr,
                thankYouPath: product.thankYouPath,
              }}
            />
          </div>
        </div>
      </section>

      {/* SECTION 11: QUESTIONS */}
      <section
        style={{
          padding: "clamp(72px,10vh,132px) clamp(20px,4vw,48px)",
          background: "#111111",
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={eyebrow}>10 · Questions</p>
          <h2 style={{ ...h2, margin: "0 0 clamp(32px,4vw,48px)" }}>Questions</h2>
          <Faq items={FAQ_ITEMS} startOpen={0} />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: "clamp(48px,6vh,80px) clamp(20px,4vw,48px)",
          background: "#0A0A0B",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ ...inner, display: "grid", gap: 28 }}>
          <p
            style={{
              margin: 0,
              maxWidth: 820,
              fontSize: 16,
              lineHeight: 1.6,
              color: "#6B6B6B",
              textWrap: "pretty",
            }}
          >
            Preflight is provided as-is for use against your own systems. It does
            not guarantee security or any outcome. Deeper Designs accepts no
            liability for results. Digital download, delivered in full on payment.
            No refunds.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "14px 28px",
              alignItems: "center",
              fontSize: 16,
            }}
          >
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="pf-link-underline"
            >
              {SUPPORT_EMAIL}
            </a>
            <a
              href="https://deeperdesigns.in"
              target="_blank"
              rel="noopener"
              className="pf-link-underline"
            >
              deeperdesigns.in
            </a>
            <Link href={product.termsPath} className="pf-link-underline">
              Terms
            </Link>
            <Link href="/privacy" className="pf-link-underline">
              Privacy
            </Link>
          </div>
          <p
            style={{
              margin: 0,
              fontFamily: MONO,
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#3A3A3A",
            }}
          >
            Preflight · Deeper Designs
          </p>
        </div>
      </footer>
    </main>
  );
}
