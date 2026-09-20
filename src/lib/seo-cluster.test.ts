import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { emptyInput, estimateRoofCost } from "./calculator.ts";
import {
  DEFAULT_PUBLIC_ORIGIN,
  navItems,
  publicPages,
  renderRobotsTxt,
  renderSitemapXml,
  replacementClusterPages,
  siteConfig,
} from "../config/site.ts";

const here = dirname(fileURLToPath(import.meta.url));
const routesDir = join(here, "../routes");

const CLUSTER = [
  {
    path: "/roof-replacement-cost-per-m2",
    file: "roof-replacement-cost-per-m2.tsx",
    title: "Roof Replacement Cost per m² UK (2026) | RoofCost UK",
    h1: "Roof replacement cost per m² in the UK",
  },
  {
    path: "/semi-detached-roof-replacement-cost",
    file: "semi-detached-roof-replacement-cost.tsx",
    title: "Semi-Detached Roof Replacement Cost UK (2026)",
    h1: "Semi-detached roof replacement cost in the UK",
  },
  {
    path: "/terraced-house-roof-replacement-cost",
    file: "terraced-house-roof-replacement-cost.tsx",
    title: "Terraced House Roof Replacement Cost UK (2026)",
    h1: "Terraced house roof replacement cost in the UK",
  },
  {
    path: "/bungalow-roof-replacement-cost",
    file: "bungalow-roof-replacement-cost.tsx",
    title: "Bungalow Roof Replacement Cost UK (2026)",
    h1: "Bungalow roof replacement cost in the UK",
  },
  {
    path: "/concrete-tile-roof-replacement-cost",
    file: "concrete-tile-roof-replacement-cost.tsx",
    title: "Concrete Tile Roof Replacement Cost UK (2026)",
    h1: "Concrete tile roof replacement cost in the UK",
  },
  {
    path: "/slate-roof-replacement-cost",
    file: "slate-roof-replacement-cost.tsx",
    title: "Slate Roof Replacement Cost UK (2026)",
    h1: "Slate roof replacement cost in the UK",
  },
] as const;

function readRoute(file: string): string {
  return readFileSync(join(routesDir, file), "utf8");
}

test("exactly six unique pitched-replacement cluster routes exist", () => {
  assert.equal(CLUSTER.length, 6);
  assert.equal(replacementClusterPages.length, 6);
  const files = new Set<string>();
  const paths = new Set<string>();
  for (const page of CLUSTER) {
    assert.equal(existsSync(join(routesDir, page.file)), true, page.file);
    files.add(page.file);
    paths.add(page.path);
    assert.equal(
      replacementClusterPages.some((p) => p.path === page.path),
      true,
      page.path,
    );
  }
  assert.equal(files.size, 6);
  assert.equal(paths.size, 6);
  assert.equal(existsSync(join(routesDir, "roof-replacement-cost.tsx")), false);
  assert.equal(existsSync(join(routesDir, "pitched-roof-replacement-cost.tsx")), false);
});

test("publicPages has 16 unique paths including the six cluster pages", () => {
  const paths = publicPages.map((p) => p.path);
  assert.equal(paths.length, 16);
  assert.equal(new Set(paths).size, 16);
  for (const page of CLUSTER) {
    assert.equal(paths.includes(page.path), true, page.path);
  }
  for (const required of [
    "/",
    "/roof-cost-calculator",
    "/new-roof-cost",
    "/roof-repair-cost",
    "/flat-roof-cost",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/affiliate-disclosure",
  ]) {
    assert.equal(paths.includes(required), true, required);
  }
  assert.equal(paths.includes("/roof-replacement-cost"), false);
  assert.equal(
    paths.some((p) => /london|manchester|birmingham|county/i.test(p)),
    false,
  );
});

test("sitemap contains exactly 16 unique production URLs including all six cluster pages", () => {
  const xml = renderSitemapXml(DEFAULT_PUBLIC_ORIGIN);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(locs.length, 16);
  assert.equal(new Set(locs).size, 16);
  for (const page of CLUSTER) {
    assert.equal(
      locs.includes(`https://roofcost-uk.pages.dev${page.path}`),
      true,
      page.path,
    );
  }
  assert.doesNotMatch(xml, /noindex/i);
  const robots = renderRobotsTxt(DEFAULT_PUBLIC_ORIGIN);
  assert.match(robots, /Allow: \//);
  assert.doesNotMatch(robots, /Disallow: \//);
});

test("each cluster page has a unique title, unique H1, and one existing partner form", () => {
  const titles = new Set<string>();
  const h1s = new Set<string>();
  const faqs = new Set<string>();
  for (const page of CLUSTER) {
    const src = readRoute(page.file);
    assert.match(src, new RegExp(`createFileRoute\\("${page.path.replaceAll("/", "\\/")}"\\)`));
    assert.match(src, new RegExp(`title: "${page.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
    assert.match(src, new RegExp(`>\\s*${page.h1.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*<`));
    titles.add(page.title);
    h1s.add(page.h1);

    assert.match(src, /Calculate My Roof Cost/);
    assert.match(src, /to="\/roof-cost-calculator"/);
    assert.match(src, /No contact details required/);
    assert.match(src, /QuoteCtaButton/);
    assert.match(src, /<PartnerLeadForm placement="guide"/);
    assert.equal((src.match(/<PartnerLeadForm/g) || []).length, 1, page.file);
    assert.equal((src.match(/QuoteCtaButton/g) || []).length, 2, page.file);
    assert.match(src, /<SourcesBlock/);
    assert.match(src, /to="\/new-roof-cost"/);
    assert.match(src, /Last reviewed:/);
    assert.doesNotMatch(src, /index:\s*false/);
    assert.doesNotMatch(src, /noindex/i);
    assert.doesNotMatch(src, /loadPartnerWidget/);
    assert.doesNotMatch(src, /af248316a218e4bee91296a19adc1e32/);
    assert.doesNotMatch(src, /widget\.leads\.work/);
    assert.doesNotMatch(src, /reviewed by a (?:roofer|surveyor)/i);
    assert.doesNotMatch(src, /based on RoofCost UK (?:customers|quotations)/i);

    const questions = [...src.matchAll(/name: "([^"]+)"/g)].map((m) => m[1]);
    assert.ok(questions.length >= 3 && questions.length <= 5, `${page.file} FAQ count ${questions.length}`);
    for (const q of questions) {
      assert.equal(faqs.has(q), false, `duplicate FAQ: ${q}`);
      faqs.add(q);
    }
  }
  assert.equal(titles.size, 6);
  assert.equal(h1s.size, 6);
});

test("repair and flat pages still do not mount the pitched-replacement widget", () => {
  for (const file of ["roof-repair-cost.tsx", "flat-roof-cost.tsx"]) {
    const src = readRoute(file);
    assert.equal(src.includes("PartnerLeadForm"), false, file);
    assert.equal(src.includes("QuoteCtaButton"), false, file);
  }
});

test("header remains free of the global Compare Roofing Quotes CTA", () => {
  const src = readFileSync(join(here, "../components/Header.tsx"), "utf8");
  assert.doesNotMatch(src, /Compare Roofing Quotes/);
  assert.doesNotMatch(src, /QuoteCtaButton/);
  assert.doesNotMatch(src, /PartnerLeadForm/);
  const navTos = new Set(navItems.map((item) => String(item.to)));
  for (const page of CLUSTER) {
    assert.equal(navTos.has(page.path), false, page.path);
  }
});

test("homepage does not list the six cluster pages as primary links", () => {
  const src = readRoute("index.tsx");
  for (const page of CLUSTER) {
    assert.equal(src.includes(page.path), false, page.path);
  }
  assert.match(src, /to="\/new-roof-cost"/);
});

test("new-roof-cost explores the six cluster pages with crawlable links", () => {
  const src = readRoute("new-roof-cost.tsx");
  assert.match(src, /Explore roof replacement costs/);
  assert.match(src, /replacementClusterPages/);
  for (const page of CLUSTER) {
    assert.equal(src.includes(page.path) || src.includes("replacementClusterPages"), true);
  }
  assert.equal((src.match(/<PartnerLeadForm/g) || []).length, 1);
});

test("Google Search Console verification token is unchanged", () => {
  assert.equal(
    siteConfig.googleSiteVerification,
    "aoclT7NSKo_e0kweb6GEl49EPifxXC6I3WHSESrOy5A",
  );
});

test("cluster worked examples reuse the live calculator engine", () => {
  const semiConcrete = estimateRoofCost({
    ...emptyInput,
    project: "replacement",
    propertyType: "semi",
    roofType: "pitched",
    areaM2: 80,
    areaUnknown: false,
    pitchedMaterial: "concrete",
    complexity: "simple",
    scaffolding: "yes",
  });
  assert.equal(semiConcrete.low, 7600);
  assert.equal(semiConcrete.high, 14200);
  assert.equal(semiConcrete.midpoint, 10900);

  const terrace = estimateRoofCost({
    ...emptyInput,
    project: "replacement",
    propertyType: "terraced",
    roofType: "pitched",
    areaM2: 55,
    areaUnknown: false,
    pitchedMaterial: "concrete",
    complexity: "simple",
    scaffolding: "yes",
  });
  assert.equal(terrace.low, 5400);
  assert.equal(terrace.high, 10200);

  const bungalow = estimateRoofCost({
    ...emptyInput,
    project: "replacement",
    propertyType: "bungalow",
    roofType: "pitched",
    areaM2: 70,
    areaUnknown: false,
    pitchedMaterial: "concrete",
    complexity: "simple",
    scaffolding: "yes",
  });
  assert.equal(bungalow.low, 6500);
  assert.equal(bungalow.high, 12300);

  const slate = estimateRoofCost({
    ...emptyInput,
    project: "replacement",
    propertyType: "semi",
    roofType: "pitched",
    areaM2: 80,
    areaUnknown: false,
    pitchedMaterial: "natural-slate",
    complexity: "simple",
    scaffolding: "yes",
  });
  assert.equal(slate.low, 12000);
  assert.equal(slate.high, 21300);

  const perM2 = readRoute("roof-replacement-cost-per-m2.tsx");
  assert.match(perM2, /£7,600–£14,200/);
  assert.match(readRoute("terraced-house-roof-replacement-cost.tsx"), /£5,400–£10,200/);
  assert.match(readRoute("bungalow-roof-replacement-cost.tsx"), /£6,500–£12,300/);
  assert.match(readRoute("slate-roof-replacement-cost.tsx"), /£12,000–£21,300/);
});

test("route files are unique and do not add city or county pages", () => {
  const files = readdirSync(routesDir).filter((f) => f.endsWith(".tsx"));
  assert.equal(new Set(files).size, files.length);
  assert.equal(
    files.some((f) => /london|manchester|birmingham|leeds|glasgow|county/i.test(f)),
    false,
  );
});
