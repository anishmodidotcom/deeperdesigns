// Which Meta dataset an event belongs to (v33.1).
//
// SERVER ONLY. Reads the tokens, which are not public.
//
// A product sold on someone else's behalf reports to their pixel, not to
// Deeper Designs'. Both halves have to agree: the browser initialises
// that product's pixel and nothing else, and the server posts to that
// dataset with that token, so the pair deduplicates on one event_id
// inside one dataset.
//
// Falls back rather than failing. If a product names a dataset it does
// not have credentials for, the event goes to the Deeper Designs
// dataset and the fallback is logged with the product named. Tracking
// going to the wrong dataset is recoverable; tracking going nowhere is
// silent, and silence is worse.

import { getProduct } from "@/lib/products";

export type MetaDataset = {
  pixelId: string | undefined;
  accessToken: string | undefined;
  /** True when the product's own dataset was asked for and not found. */
  fellBack: boolean;
  product: string | null;
};

export function siteDataset(): MetaDataset {
  return {
    pixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    accessToken: process.env.META_CAPI_ACCESS_TOKEN,
    fellBack: false,
    product: null,
  };
}

export function datasetForProduct(slug: unknown): MetaDataset {
  const product = getProduct(slug);
  if (!product) return siteDataset();

  const pixelId = product.metaPixelId?.trim();
  const accessToken = product.metaCapiToken?.trim();
  if (pixelId && accessToken) {
    return { pixelId, accessToken, fellBack: false, product: product.slug };
  }

  console.warn(
    JSON.stringify({
      scope: "meta-dataset",
      event: "product_dataset_missing",
      product: product.slug,
      has_pixel_id: Boolean(pixelId),
      has_access_token: Boolean(accessToken),
      fallback: "deeper_designs_dataset",
      impact: "events_recorded_against_the_wrong_dataset",
    }),
  );
  return { ...siteDataset(), fellBack: true, product: product.slug };
}
