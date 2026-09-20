import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  isPartnerActive,
  isPitchedReplacementQuoteEligible,
  partnerConfig,
} from "../config/partner.ts";
import {
  DEFAULT_PUBLIC_ORIGIN,
  renderRobotsTxt,
  renderSitemapXml,
} from "../config/site.ts";
import { QUOTES_SECTION_ID } from "./quoteIntent.ts";

test("partner is active with the approved pitched-roof-replacement widget", () => {
  assert.equal(partnerConfig.partnerStatus, "active");
  assert.equal(partnerConfig.partnerName, "Leads Do Work");
  assert.equal(partnerConfig.partnerWidgetConfigId, "af248316a218e4bee91296a19adc1e32");
  assert.equal(
    partnerConfig.partnerWidgetScriptUrl,
    "https://widget.leads.work/js/prefilled-form-load.js",
  );
  assert.match(partnerConfig.partnerWidgetScriptUrl, /^https:\/\//);
  assert.equal(partnerConfig.partnerScriptEnabled, true);
  assert.equal(isPartnerActive(), true);
});

test("widget eligibility is pitched replacement only", () => {
  assert.equal(isPitchedReplacementQuoteEligible("replacement"), true);
  assert.equal(isPitchedReplacementQuoteEligible("repair"), false);
  assert.equal(isPitchedReplacementQuoteEligible("flat-replacement"), false);
  assert.equal(isPitchedReplacementQuoteEligible("unsure"), false);
});

test("all quote CTAs share one commercial section id", () => {
  assert.equal(QUOTES_SECTION_ID, "quotes");
});

test("repair and flat guides do not mount the pitched-replacement widget", () => {
  const files = ["../routes/roof-repair-cost.tsx", "../routes/flat-roof-cost.tsx"];
  for (const rel of files) {
    const src = readFileSync(fileURLToPath(new URL(rel, import.meta.url)), "utf8");
    assert.equal(src.includes("PartnerLeadForm"), false, rel);
  }
});

test("new-roof-cost has both intent paths targeting one quote section", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../routes/new-roof-cost.tsx", import.meta.url)),
    "utf8",
  );
  assert.match(src, /Calculate My Roof Cost/);
  assert.match(src, /QuoteCtaButton/);
  assert.match(src, /<PartnerLeadForm placement="guide"/);
  assert.equal((src.match(/<PartnerLeadForm/g) || []).length, 1);
});

test("header does not carry a global pitched-replacement quote CTA", () => {
  const src = readFileSync(
    fileURLToPath(new URL("../components/Header.tsx", import.meta.url)),
    "utf8",
  );
  assert.doesNotMatch(src, /Compare Roofing Quotes/);
  assert.doesNotMatch(src, /QuoteCtaButton/);
  assert.doesNotMatch(src, /PartnerLeadForm/);
  assert.doesNotMatch(src, /requestQuoteForm/);
});

test("sitemap and robots use the production origin and stay indexable", () => {
  assert.equal(DEFAULT_PUBLIC_ORIGIN, "https://roofcost-uk.pages.dev");
  const xml = renderSitemapXml(DEFAULT_PUBLIC_ORIGIN);
  assert.match(xml, /https:\/\/roofcost-uk\.pages\.dev\/new-roof-cost/);
  assert.match(xml, /https:\/\/roofcost-uk\.pages\.dev\/roof-cost-calculator/);
  assert.doesNotMatch(xml, /<urlset>\s*<\/urlset>/);
  const robots = renderRobotsTxt(DEFAULT_PUBLIC_ORIGIN);
  assert.match(robots, /Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/roofcost-uk\.pages\.dev\/sitemap.xml/);
  assert.doesNotMatch(robots, /noindex/i);
  assert.doesNotMatch(robots, /Disallow: \//);
});
