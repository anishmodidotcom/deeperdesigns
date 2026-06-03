"use client";

import { usePathname } from "next/navigation";
import type { CSSProperties, ReactNode } from "react";
import {
  trackLead,
  trackLiveProductCTAClick,
  trackWhatsAppOpenedFromShowcase,
} from "@/lib/meta-events";
import { useShowcaseContext } from "@/components/ShowcaseContext";

type LiveProduct = "maplelens" | "deeper-content";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  // Explicit overrides. Useful for in-content CTAs that want to assert
  // showcase identity even if context is missing. When omitted, the
  // values are read from ShowcaseContext (populated by the showcase
  // page wrapper).
  showcaseSlug?: string;
  showcaseIndustry?: string;
  liveProduct?: LiveProduct;
};

// Sitewide WhatsApp CTA wrapper.
// Always fires trackLead. When rendered inside a ShowcaseProvider or
// when the explicit override props are present, additionally fires
// trackWhatsAppOpenedFromShowcase and (for live products only)
// trackLiveProductCTAClick. Tracking is fire-and-forget, never blocks
// navigation.
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
  const ctx = useShowcaseContext();

  // Explicit props win; otherwise inherit from context. liveProduct on
  // context is gated by isLiveProduct so concept showcases never fire
  // LiveProductCTAClick.
  const effectiveSlug = showcaseSlug ?? ctx?.slug;
  const effectiveIndustry = showcaseIndustry ?? ctx?.industry;
  const effectiveLiveProduct: LiveProduct | undefined =
    liveProduct ??
    (ctx?.isLiveProduct && (ctx.slug === "maplelens" || ctx.slug === "deeper-content")
      ? ctx.slug
      : undefined);

  const onClick = () => {
    try {
      trackLead(pathname);
      if (effectiveSlug) {
        trackWhatsAppOpenedFromShowcase(effectiveSlug, effectiveIndustry ?? "");
      }
      if (effectiveLiveProduct) {
        trackLiveProductCTAClick(effectiveLiveProduct);
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
