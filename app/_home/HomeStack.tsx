import Image from "next/image";

const GROUPS = [
  { label: "AI + MODELS", items: [
    { name: "Claude", logo: "/logos/anthropic.svg" },
    { name: "ChatGPT", logo: "/logos/openai.svg" },
    { name: "Gemini", logo: "/logos/googlegemini.svg" },
    { name: "Perplexity", logo: "/logos/perplexity.svg" },
  ]},
  { label: "BUILD + CODE", items: [
    { name: "Next.js", logo: "/logos/nextdotjs.svg" },
    { name: "React", logo: "/logos/react.svg" },
    { name: "Vercel", logo: "/logos/vercel.svg" },
    { name: "GitHub", logo: "/logos/github.svg" },
    { name: "Cursor", logo: "/logos/cursor.svg" },
    { name: "Claude Code", logo: "/logos/claude.svg" },
  ]},
  { label: "BACKEND + DATA", items: [
    { name: "Supabase", logo: "/logos/supabase.svg" },
    { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
    { name: "Resend", logo: "/logos/resend.svg" },
    { name: "Cloudflare", logo: "/logos/cloudflare.svg" },
  ]},
  { label: "AUTOMATION", items: [
    { name: "n8n", logo: "/logos/n8n.svg" },
    { name: "Zapier", logo: "/logos/zapier.svg" },
    { name: "Make", logo: "/logos/make.svg" },
  ]},
  { label: "DESIGN", items: [
    { name: "Figma", logo: "/logos/figma.svg" },
    { name: "Framer", logo: "/logos/framer.svg" },
  ]},
  { label: "OPS + ANALYTICS", items: [
    { name: "PostHog", logo: "/logos/posthog.svg" },
    { name: "Notion", logo: "/logos/notion.svg" },
    { name: "Linear", logo: "/logos/linear.svg" },
    { name: "Google Analytics", logo: "/logos/googleanalytics.svg" },
  ]},
  { label: "DISTRIBUTION", items: [
    { name: "WhatsApp", logo: "/logos/whatsapp.svg" },
    { name: "Meta Ads", logo: "/logos/meta.svg" },
    { name: "Google Ads", logo: "/logos/googleads.svg" },
    { name: "LinkedIn", logo: "/logos/linkedin.svg" },
  ]},
];

export default function HomeStack() {
  return (
    <section style={{ padding: "var(--section-py) 0", background: "var(--bg-elev)" }}>
      <div className="container">
        <h2 style={{ fontSize: "var(--fs-h1)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "16px" }}>
          Stacked with the engines that move the world right now.
        </h2>
        <p style={{ fontSize: "17px", color: "var(--fg-muted)", marginBottom: "64px", maxWidth: "640px" }}>
          The tools change every month. The judgment doesn&apos;t.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {GROUPS.map(g => (
            <div key={g.label}>
              <p className="mono" style={{ color: "var(--fg-dim)", marginBottom: "16px" }}>{g.label}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                {g.items.map(it => (
                  <div key={it.name} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 16px", border: "1px solid var(--border)", borderRadius: "10px", background: "#FFFFFF" }}>
                    <Image src={it.logo} alt={it.name} width={20} height={20} />
                    <span style={{ fontSize: "14px", color: "#0A0A0A" }}>{it.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
