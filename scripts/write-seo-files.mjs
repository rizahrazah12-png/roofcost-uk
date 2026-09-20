/**
 * Writes public/robots.txt and public/sitemap.xml from VITE_PUBLIC_SITE_URL.
 * Run before `vite build` so the static files ship with the production host.
 */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_PUBLIC_ORIGIN,
  renderRobotsTxt,
  renderSitemapXml,
  toPublicHttpsOrigin,
} from "../src/config/site.ts";

const origin =
  toPublicHttpsOrigin(
    process.env.VITE_PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL || "",
  ) || DEFAULT_PUBLIC_ORIGIN;
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

writeFileSync(join(root, "public/robots.txt"), renderRobotsTxt(origin));
writeFileSync(join(root, "public/sitemap.xml"), renderSitemapXml(origin));

console.log(`[seo] origin → ${origin}`);
