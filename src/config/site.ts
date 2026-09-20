/**
 * Central site configuration.
 *
 * Canonical host comes from VITE_PUBLIC_SITE_URL (HTTPS, no trailing slash).
 * Set this in Cloudflare Pages (or any host) before a production build.
 */

function stripOrigin(raw: string): string {
  return raw.trim().replace(/^https?:\/\//i, "").replace(/\/+$/, "").split(",")[0]!.trim().toLowerCase();
}

function hostOnly(raw: string): string {
  return stripOrigin(raw).split(":")[0] ?? "";
}

/** Cloudflare Pages production origin when VITE_PUBLIC_SITE_URL is unset at build. */
export const DEFAULT_PUBLIC_ORIGIN = "https://roofcost-uk.pages.dev";

/** Public HTTPS origin, or "" if the value is not a publishable host. */
export function toPublicHttpsOrigin(raw: string): string {
  const host = hostOnly(raw);
  if (!host || !host.includes(".")) return "";
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
  if (host === "localhost" || host.endsWith(".localhost")) return "";
  if (host === "vercel.app" || host.endsWith(".vercel.app") || host.endsWith(".vercel.com")) return "";
  if (host === "example" || host.endsWith(".example")) return "";
  if (host === "grok.com" || host.endsWith(".grok.com")) return "";
  if (!/^[a-z0-9.-]+$/.test(host)) return "";
  return `https://${host}`;
}

function readEnvSiteUrl(): string {
  let vite = "";
  try {
    const env = (import.meta as ImportMeta & { env?: Record<string, string> }).env;
    vite = String(env?.VITE_PUBLIC_SITE_URL ?? "");
  } catch {
    vite = "";
  }
  const node =
    typeof process !== "undefined"
      ? String(process.env.VITE_PUBLIC_SITE_URL ?? process.env.PUBLIC_SITE_URL ?? "")
      : "";
  return toPublicHttpsOrigin(vite) || toPublicHttpsOrigin(node) || DEFAULT_PUBLIC_ORIGIN;
}

export function originFromRequest(request?: Request | null): string {
  const configured = readEnvSiteUrl();
  if (configured) return configured;
  if (!request) return "";
  const xf = request.headers.get("x-forwarded-host") ?? "";
  const host = request.headers.get("host") ?? "";
  return toPublicHttpsOrigin(xf) || toPublicHttpsOrigin(host);
}

export const siteConfig = {
  name: "RoofCost UK",
  shortName: "RoofCost UK",
  tagline: "UK roofing cost estimates for homeowners",
  description:
    "Free UK roofing cost estimates for repairs, replacements and flat roofs. Indicative planning ranges, not contractor quotations.",
  get siteUrl(): string {
    return readEnvSiteUrl();
  },
  locale: "en-GB",
  language: "en-GB",
  lastReviewed: "20 September 2026",
  lastReviewedIso: "2026-09-20",
  googleSiteVerification: "aoclT7NSKo_e0kweb6GEl49EPifxXC6I3WHSESrOy5A",
  contactEmail: "",
  contactName: "RoofCost UK",
  twitterHandle: "",
};

export const navItems = [
  { label: "Roof Cost Calculator", to: "/roof-cost-calculator" as const },
  { label: "New Roof Cost", to: "/new-roof-cost" as const },
  { label: "Roof Repair Cost", to: "/roof-repair-cost" as const },
  { label: "Flat Roof Cost", to: "/flat-roof-cost" as const },
] as const;

export const legalItems = [
  { label: "About", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
  { label: "Privacy", to: "/privacy" as const },
  { label: "Terms", to: "/terms" as const },
  { label: "Affiliate disclosure", to: "/affiliate-disclosure" as const },
] as const;

/**
 * Published indexable routes. Add a path here only when the matching
 * `src/routes/*.tsx` page is a complete article — never as an empty slug.
 *
 * Later high-quality guides (do not create until written in full):
 * pitched-roof-replacement-cost (would cannibalise /new-roof-cost),
 * city or county pages (wait for Search Console evidence).
 */
export const replacementClusterPages = [
  {
    path: "/roof-replacement-cost-per-m2" as const,
    label: "Roof replacement cost per m²",
    description: "What a UK £/m² rate includes — and why floor area × rate is the wrong quote.",
  },
  {
    path: "/semi-detached-roof-replacement-cost" as const,
    label: "Semi-detached roof replacement costs",
    description: "Planning ranges for a typical 3-bed semi, including hips, gables and access.",
  },
  {
    path: "/terraced-house-roof-replacement-cost" as const,
    label: "Terraced house roof replacement costs",
    description: "Mid-terrace re-roofs, shared boundaries and front-or-rear access.",
  },
  {
    path: "/bungalow-roof-replacement-cost" as const,
    label: "Bungalow roof replacement costs",
    description: "Why a single-storey house can still have a large, expensive roof.",
  },
  {
    path: "/concrete-tile-roof-replacement-cost" as const,
    label: "Concrete tile roof replacement costs",
    description: "Full concrete-tile re-roofs, not a handful of replacement tiles.",
  },
  {
    path: "/slate-roof-replacement-cost" as const,
    label: "Slate roof replacement costs",
    description: "Natural slate re-roofs, labour intensity and why they sit above concrete.",
  },
] as const;

export const publicPages: { path: string; changefreq: string; priority: string }[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/roof-cost-calculator", changefreq: "weekly", priority: "0.9" },
  { path: "/new-roof-cost", changefreq: "monthly", priority: "0.8" },
  { path: "/roof-repair-cost", changefreq: "monthly", priority: "0.8" },
  { path: "/flat-roof-cost", changefreq: "monthly", priority: "0.8" },
  ...replacementClusterPages.map((p) => ({
    path: p.path,
    changefreq: "monthly",
    priority: "0.7",
  })),
  { path: "/about", changefreq: "yearly", priority: "0.4" },
  { path: "/contact", changefreq: "yearly", priority: "0.4" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
  { path: "/affiliate-disclosure", changefreq: "yearly", priority: "0.3" },
];

export function canonicalUrl(path: string, request?: Request | null): string {
  const origin = originFromRequest(request).replace(/\/$/, "");
  const suffix = path === "/" ? "/" : path;
  if (!origin) return suffix;
  return origin + suffix;
}

export function renderSitemapXml(origin: string): string {
  const host = origin.replace(/\/$/, "");
  const lastmod = siteConfig.lastReviewedIso;
  const urls = publicPages
    .map((p) => {
      const loc = p.path === "/" ? `${host}/` : `${host}${p.path}`;
      return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function renderRobotsTxt(origin: string): string {
  const host = origin.replace(/\/$/, "");
  const sitemap = host ? `Sitemap: ${host}/sitemap.xml\n` : "";
  return `User-agent: *\nAllow: /\n\n${sitemap}`;
}
