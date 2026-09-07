"use client";

import { Link } from "next-view-transitions";
import { trackInitiateCheckout } from "@/lib/meta-events";

type Props = {
  tierName: string;
  tierPriceBand: string;
};

// Per-tier CTA on /services. Fires trackInitiateCheckout with the
// tier name + price band, then navigates to /start-your-study.
export default function TrackedTierCTA({ tierName, tierPriceBand }: Props) {
  return (
    <Link
      href="/start-your-study"
      onClick={() => {
        try {
          trackInitiateCheckout(tierName, tierPriceBand);
        } catch {
          // Never block navigation.
        }
      }}
      style={{
        marginTop: "24px",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
        fontSize: "12px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--accent)",
        // v30.2: an underline drawn by text-decoration rather than a
        // bottom border, so the vertical padding that takes this to a
        // 44px hit area does not push the rule away from the words.
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        paddingBlock: "14px",
        marginBlock: "-14px",
      }}
    >
      Start with this tier <span aria-hidden>→</span>
    </Link>
  );
}
