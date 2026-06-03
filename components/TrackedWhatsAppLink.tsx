"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import {
  trackLead,
  trackLiveProductCTAClick,
  trackWhatsAppOpenedFromShowcase,
} from "@/lib/meta-events";

type LiveProduct = "maplelens" | "deeper-content";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  // Showcase context, if the link sits on a /work/<slug> page. When
  // present, trackWhatsAppOpenedFromShowcase fires alongside trackLead.
  showcaseSlug?: string;
  showcaseIndustry?: string;
  // If the link sits on a live product page, trackLiveProductCTAClick
  // fires alongside trackLead.
  liveProduct?: LiveProduct;
};

// Sitewide WhatsApp CTA wrapper. Always fires trackLead. Optionally
// fires the showcase-context or live-product variant. Tracking is
// fire-and-forget so the link navigates normally.
export default function TrackedWhatsAppLink({
  href,
  children,
  className,
  style,
  target,
  rel,
  ariaLabel,
  showcaseSlug,
  showcaseIndustry,
  liveProduct,
}: Props) {
  const pathname = usePathname() ?? "";

  const onClick = () => {
    try {
      trackLead(pathname);
      if (showcaseSlug) {
        trackWhatsAppOpenedFromShowcase(showcaseSlug, showcaseIndustry ?? "");
      }
      if (liveProduct) {
        trackLiveProductCTAClick(liveProduct);
      }
    } catch {
      // Never block navigation.
    }
  };

  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      style={style}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
