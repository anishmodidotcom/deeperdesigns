/**
 * IndexNow URL submitter for deeperdesigns.in.
 *
 * IndexNow (https://www.indexnow.org) pings participating engines (Bing,
 * Yandex, Naver, Seznam, and shared with others) to re-crawl URLs fast.
 * Bing Webmaster recommends it for this property.
 *
 * Key hosting: the key file lives at the site root,
 *   public/<KEY>.txt   ->   https://www.deeperdesigns.in/<KEY>.txt
 * and its contents are exactly the key. IndexNow fetches that file to
 * verify ownership before accepting submissions.
 *
 * Run (submits the 13 /for pages + homepage by default):
 *   bun run scripts/indexnow-submit.ts
 * Submit specific URLs (absolute or root-relative paths):
 *   bun run scripts/indexnow-submit.ts /for/real-estate /for/ca-firms
 *
 * No secrets: the IndexNow key is public by design (it is hosted at the
 * site root), so it is committed alongside this script.
 */
import { INDUSTRIES } from "@/lib/industries";

const HOST = "www.deeperdesigns.in";
const ORIGIN = `https://${HOST}`;
const KEY = "41158d46bd700c550f51e145dbf41376";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

function defaultUrls(): string[] {
  const live = INDUSTRIES.filter((i) => i.live).map((i) => `${ORIGIN}/for/${i.slug}`);
  return [`${ORIGIN}/`, ...live];
}

function toAbsolute(arg: string): string {
  if (arg.startsWith("http://") || arg.startsWith("https://")) return arg;
  return `${ORIGIN}${arg.startsWith("/") ? "" : "/"}${arg}`;
}

async function main() {
  const args = process.argv.slice(2);
  const urlList = args.length > 0 ? args.map(toAbsolute) : defaultUrls();

  console.log(`Submitting ${urlList.length} URL(s) to IndexNow:`);
  urlList.forEach((u) => console.log("  " + u));

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, pending). 4xx means a
  // key/host problem worth surfacing.
  const text = await res.text().catch(() => "");
  console.log(`\nIndexNow responded ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`);
  if (res.status !== 200 && res.status !== 202) {
    process.exit(1);
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
