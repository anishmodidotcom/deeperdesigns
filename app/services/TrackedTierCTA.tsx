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
        textDecoration: "none",
        borderBottom: "1px solid currentColor",
        paddingBottom: "2px",
      }}
    >
      Start with this tier <span aria-hidden>→</span>
    </Link>
  );
}
