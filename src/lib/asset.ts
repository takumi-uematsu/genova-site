/**
 * Asset path helper.
 *
 * Next.js auto-prefixes basePath for routing (next/link) but NOT for
 * unoptimized static assets like SVGs used in <Image src="/...">.
 * Prefix them explicitly via `asset("/foo.svg")` so the URL becomes
 * `/company/foo.svg` and matches where Next.js actually serves the file.
 */
export const BASE_PATH = "/company";

export function asset(path: string): string {
  if (!path.startsWith("/")) return `${BASE_PATH}/${path}`;
  return `${BASE_PATH}${path}`;
}
