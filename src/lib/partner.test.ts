import assert from "node:assert/strict";
import test from "node:test";
import {
  isPartnerActive,
  isPitchedReplacementQuoteEligible,
  partnerConfig,
} from "../config/partner.ts";
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
