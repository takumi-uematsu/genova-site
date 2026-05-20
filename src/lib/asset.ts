/**
 * Asset path helper.
 *
 * The site now lives at the root of company.z-data.io, so no basePath
 * prefix is required. This helper is kept (as a no-op) for two reasons:
 *   1. Easy to re-introduce a basePath in the future without touching every
 *      <Image src> call site.
 *   2. Centralized place for any future path rewriting logic.
 */
export const BASE_PATH = "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return `${BASE_PATH}/${path}`;
  return `${BASE_PATH}${path}`;
}
