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
 * Run (submits every indexable URL, taken from the sitemap):
 *   bun run indexnow
 * Submit specific URLs (absolute or root-relative paths):
 *   bun run indexnow /for/real-estate /for/ca-firms
 *
 * v25.5: the default set is derived from app/sitemap.ts rather than a
 * hardcoded list of the homepage plus the 13 /for pages. That list covered
 * 14 of 45 indexable URLs, so every showcase and every core page was
 * invisible to this script, which defeats the point of running it.
 *
 * Running it on deploy: there is no CI in this repo, so this is a manual
 * step after a deploy that changes page content. To automate it later,
 * call it from a Vercel deploy hook or a GitHub Action on push to main:
 *   bun install && bun run indexnow
 * It needs no secrets, so it is safe in any CI environment.
 *
 * No secrets: the IndexNow key is public by design (it is hosted at the
 * site root), so it is committed alongside this script.
 */
import sitemap from "@/app/sitemap";

const HOST = "www.deeperdesigns.in";
const ORIGIN = `https://${HOST}`;
const KEY = "41158d46bd700c550f51e145dbf41376";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

// Every URL the sitemap advertises, so this stays in step with the route
// set automatically as pages are added.
function defaultUrls(): string[] {
  return sitemap().map((entry) => entry.url);
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
