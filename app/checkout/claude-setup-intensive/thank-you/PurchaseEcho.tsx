"use client";

import { useEffect, useRef } from "react";
import {
  type TrackableProduct,
  trackCheckoutPurchase,
} from "@/lib/checkout/track";

// The browser half of the Purchase pair for the Anish Modi product.
// Identical machinery to the Preflight echo, and identical for the same
// reason: the id is the Razorpay payment id, so this collapses into the
// server event fulfilment already fired.
export default function PurchaseEcho({
  paymentId,
  product,
}: {
  paymentId: string | null;
  product: TrackableProduct;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current || !paymentId) return;
    fired.current = true;
    try {
      trackCheckoutPurchase(product, paymentId);
    } catch {
      // Analytics never blocks the page.
    }
  }, [paymentId, product]);
  return null;
}
