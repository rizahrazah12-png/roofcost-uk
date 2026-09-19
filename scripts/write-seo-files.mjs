/**
 * Writes public/robots.txt and public/sitemap.xml from VITE_PUBLIC_SITE_URL.
 * Run before `vite build` so the static files ship with the production host.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  renderRobotsTxt,
  renderSitemapXml,
  toPublicHttpsOrigin,
} from "../src/config/site.ts";

const origin = toPublicHttpsOrigin(
  process.env.VITE_PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL || "",
);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

writeFileSync(join(root, "public/robots.txt"), renderRobotsTxt(origin));
writeFileSync(
  join(root, "public/sitemap.xml"),
  origin
    ? renderSitemapXml(origin)
    : `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`,
);

console.log(`[seo] VITE_PUBLIC_SITE_URL → ${origin || "(unset; robots.txt has no Sitemap line)"}`);
