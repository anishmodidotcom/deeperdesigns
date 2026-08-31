"use client";

import { useEffect } from "react";
import { trackSoftwareIndexView } from "@/lib/meta-events";

// v26: fires SoftwareIndexView once per /software/[slug] view, carrying the
// category slug, so we learn which categories actually pull interest.
// Mirrors ForAnalytics: mount-only, never fires Lead.
export default function SoftwareAnalytics({ slug }: { slug: string }) {
  useEffect(() => {
    trackSoftwareIndexView(slug);
  }, [slug]);

  return null;
}
