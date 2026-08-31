"use client";

import Script from "next/script";

// Standard Meta Pixel base code, split across two strategies.
//
// v25.5: the base snippet initialises the pixel but no longer fires
// PageView itself. It used to fire one with no event_id and no CAPI
// mirror, so the ad-click landing view was the one hit with no server
// signal to fall back on. MetaPageViewOnRouteChange now fires every
// PageView through lib/meta-events.ts, so all of them, initial load
// included, are deduplicated against the CAPI mirror like every other
// event.
//
// v27: the stub and init move to beforeInteractive, and only the network
// fetch of fbevents.js stays afterInteractive.
//
// Why: Events Manager showed ForScrolled75, ForBuildCTAClick and
// ForLeadCTAClick arriving server side only, while ForPageView and
// ViewContent arrived on both legs. The difference between those two sets
// is when they fire. The working ones fire on mount; the failing ones fire
// on user interaction, late in the page's life, and two of the three are
// immediately followed by a navigation.
//
// With the whole snippet running afterInteractive there was a window in
// which window.fbq did not exist yet. Anything fired in that window went
// into the module-scoped queue in lib/meta-events.ts, which is destroyed
// with the page. Defining the stub and calling init at beforeInteractive
// closes that window: window.fbq exists from the first byte of script, so
// every event lands in fbq's own queue in the right order behind init, and
// fbevents flushes it whenever it arrives. The external script is still
// fetched afterInteractive, so nothing here costs paint time.

export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  // No-op when the env var is unset (local dev without credentials,
  // or pre-Vercel-config deploys). Keeps the build clean.
  if (!pixelId) return null;

  return (
    <>
      {/* Stub plus init, defined before anything can fire an event. This is
          the standard Meta stub with the script injection removed. */}
      <Script id="meta-pixel-stub" strategy="beforeInteractive">
        {`
!function(f,b,e,v,n){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[]}(window,document,'script');
fbq('init', '${pixelId}');
        `}
      </Script>
      {/* The library itself, fetched after hydration so it never blocks
          paint. It drains whatever the stub queued, in order. */}
      <Script
        id="meta-pixel-lib"
        strategy="afterInteractive"
        src="https://connect.facebook.net/en_US/fbevents.js"
      />
      <noscript>
        {/* Raw <img> intentional: noscript is JS-disabled fallback,
            next/image would have nothing to bind to. eslint exception
            is the correct treatment. */}
        <img
          height={1}
          width={1}
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
