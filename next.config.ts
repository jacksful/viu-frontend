import type { NextConfig } from "next";

import { loadEnvConfig } from "@next/env";

/** `.env*` is not reliably on `process.env` until Next loads runtime; CMS image hosts need it early.
 * Next may call `loadEnvConfig` first and cache; without `forceReload`, this import can see a stale
 * snapshot and omit `NEXT_PUBLIC_*` / `NEXT_IMAGE_REMOTE_HOSTS` → remotePatterns miss the CMS host
 * (`"url" parameter is not allowed` on `/_next/image`). */
loadEnvConfig(
  process.cwd(),
  process.env.NODE_ENV !== "production",
  undefined,
  true,
);

type RemotePattern = NonNullable<
  NonNullable<NextConfig["images"]>["remotePatterns"]
>[number];

function patternKey(p: RemotePattern): string {
  return `${p.protocol}://${p.hostname}:${"port" in p && p.port ? p.port : ""}${p.pathname}`;
}

/** Origins derived from env — Laravel `APP_URL` and API bases usually share the same host as `/storage/` URLs. */
function patternsFromKnownApiBases(): RemotePattern[] {
  const out: RemotePattern[] = [];
  for (const raw of [
    process.env.LARAVEL_APP_URL,
    process.env.NEXT_PUBLIC_LARAVEL_APP_URL,
    process.env.NEXT_PUBLIC_ZIP_API_BASE_URL,
    process.env.CMS_API_URL,
  ]) {
    const trimmed = raw?.trim();
    if (!trimmed) continue;
    try {
      const u = new URL(trimmed);
      out.push({
        protocol: u.protocol === "https:" ? "https" : "http",
        hostname: u.hostname,
        ...(u.port ? { port: u.port } : {}),
        pathname: "/**",
      });
    } catch {
      /* skip */
    }
  }
  return out;
}


/** When Laravel’s `storage` / `asset` URLs use a different host than the vars above
 * (e.g. CDN or `CMS_API_URL` is only the `/api` path on another domain), list extra hosts —
 * comma-separated. Supports bare hostnames (`mvp.test`) or full origins (`http://mvp.test:80`).
 */
function imageHostsFromEnv(): RemotePattern[] {
  const raw = process.env.NEXT_IMAGE_REMOTE_HOSTS?.trim();
  if (!raw) return [];
  const patterns: RemotePattern[] = [];
  for (const part of raw.split(/[\s,]+/).filter(Boolean)) {
    try {
      if (part.includes("://")) {
        const u = new URL(part);
        patterns.push({
          protocol: u.protocol === "https:" ? "https" : "http",
          hostname: u.hostname,
          ...(u.port ? { port: u.port } : {}),
          pathname: "/**",
        });
      } else {
        patterns.push({
          protocol: "http",
          hostname: part,
          pathname: "/**",
        });
        patterns.push({
          protocol: "https",
          hostname: part,
          pathname: "/**",
        });
      }
    } catch {
      /* skip invalid entries */
    }
  }
  return patterns;
}

const basePatterns: RemotePattern[] = [
  {
    protocol: "http",
    hostname: "localhost",
    pathname: "/**",
  },
  {
    protocol: "http",
    hostname: "127.0.0.1",
    pathname: "/**",
  },
];

const envHostPatterns = imageHostsFromEnv();
const apiBasePatterns = patternsFromKnownApiBases();
const merged: RemotePattern[] = [
  ...basePatterns,
  ...apiBasePatterns,
  ...envHostPatterns,
];
const seen = new Set<string>();
const remotePatterns = merged.filter((p) => {
  const k = patternKey(p);
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
