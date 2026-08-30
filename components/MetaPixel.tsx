"use client";

import Script from "next/script";

// Standard Meta Pixel base code. Adapted for Next.js 16 App Router via
// next/script (strategy="afterInteractive") so it loads after hydration
// without blocking initial paint.
//
// v25.5: the base snippet initialises the pixel but no longer fires
// PageView itself. It used to fire one with no event_id and no CAPI
// mirror, so the ad-click landing view was the one hit with no server
// signal to fall back on. MetaPageViewOnRouteChange now fires every
// PageView through lib/meta-events.ts, so all of them, initial load
// included, are deduplicated against the CAPI mirror like every other
// event.

export default function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  // No-op when the env var is unset (local dev without credentials,
  // or pre-Vercel-config deploys). Keeps the build clean.
  if (!pixelId) return null;

  return (
    <>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${pixelId}');
        `}
      </Script>
      <noscript>
        {/* Raw <img> intentional: noscript is JS-disabled fallback,
            next/image would have nothing to bind to. eslint exception
            is the correct treatment. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
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
