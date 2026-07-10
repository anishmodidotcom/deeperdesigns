"use client";

import type { CSSProperties, ReactNode } from "react";
import {
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
  // v19.7: optional extra tracking fired alongside the existing Lead +
  // showcase events, e.g. ForLeadCTAClick on /for pages. Additive; never
  // replaces the existing behaviour.
  extraTrack?: () => void;
};

// Sitewide WhatsApp CTA wrapper.
// When rendered inside a ShowcaseProvider or
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
  extraTrack,
}: Props) {
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
    // v21: Lead no longer fires on clicks. Lead is reserved for the lead
    // form's confirmed completion; clicks are intent signals only.
    try {
      if (effectiveSlug) {
        trackWhatsAppOpenedFromShowcase(effectiveSlug, effectiveIndustry ?? "");
      }
      if (effectiveLiveProduct) {
        trackLiveProductCTAClick(effectiveLiveProduct);
      }
      if (extraTrack) extraTrack();
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
