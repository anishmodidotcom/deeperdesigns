"use client";

import { usePathname } from "next/navigation";

// v29: the Preflight routes are their own composition. They carry their
// own footer and no nav, per the design export, so the sitewide chrome is
// withheld on /preflight and everything under it. Every other route is
// unchanged.
//
// The root layout is a server component and cannot read the pathname, so
// this thin client wrapper does it and renders nothing on those routes.

const BARE_PREFIXES = ["/preflight"];

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";
  const bare = BARE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
  if (bare) return null;
  return <>{children}</>;
}
