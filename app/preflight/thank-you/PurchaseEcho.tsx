"use client";

import { useEffect, useRef } from "react";
import { trackPreflightPurchase } from "@/lib/meta-events";

// The browser half of the Purchase pair. The fulfilment routine already
// fired the server half under the same event_id, which is the Razorpay
// payment id, so Meta collapses the two into one conversion.
//
// No payment id in the query string means no event: an id we invented
// would deduplicate against nothing and double-count the sale.
export default function PurchaseEcho({
  paymentId,
  value,
}: {
  paymentId: string | null;
  value: number;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current || !paymentId) return;
    fired.current = true;
    try {
      trackPreflightPurchase(paymentId, value);
    } catch {
      // Analytics never blocks the page.
    }
  }, [paymentId, value]);
  return null;
}
