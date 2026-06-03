"use client";

import { createContext, useContext, type ReactNode } from "react";

// Showcase-scoped tracking context.
//
// Sitewide WhatsApp CTAs (Nav 'Talk to us', WhatsAppButton FAB, Footer
// WhatsApp number) are rendered inside the root layout, so they have
// no idea which page they're on. When a visitor on /work/maplelens
// taps the floating FAB, the FAB needs to fire Lead +
// LiveProductCTAClick + WhatsAppOpenedFromShowcase. Without a context,
// the FAB only knows pathname and can't reach the showcase metadata.
//
// Each showcase page wraps its body in <ShowcaseProvider>. Sitewide
// trackers call useShowcaseContext(): null off-showcase, populated
// on-showcase. They fire the extra events when present.

export type ShowcaseContextValue = {
  slug: string;
  industry: string;
  isLiveProduct: boolean;
};

const ShowcaseContext = createContext<ShowcaseContextValue | null>(null);

export function ShowcaseProvider({
  slug,
  industry,
  isLiveProduct,
  children,
}: ShowcaseContextValue & { children: ReactNode }) {
  return (
    <ShowcaseContext.Provider value={{ slug, industry, isLiveProduct }}>
      {children}
    </ShowcaseContext.Provider>
  );
}

export function useShowcaseContext(): ShowcaseContextValue | null {
  return useContext(ShowcaseContext);
}
