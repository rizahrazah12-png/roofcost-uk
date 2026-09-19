import assert from "node:assert/strict";
import test from "node:test";
import { emptyInput, estimateRoofCost, parseAreaInput } from "./calculator.ts";

test("semi concrete replacement with known area returns a sensible band", () => {
  const r = estimateRoofCost({
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
  assert.ok(r.low >= 5000 && r.low <= 12000, `low ${r.low}`);
  assert.ok(r.high >= 9000 && r.high <= 20000, `high ${r.high}`);
  assert.ok(r.high - r.low >= 400);
  assert.equal(r.low % 100, 0);
  assert.equal(r.confidence, "more-tailored");
});

test("unknown area is a broad estimate and does not invent a single m²", () => {
  const unknown = estimateRoofCost({
    ...emptyInput,
    project: "replacement",
    areaM2: null,
    areaUnknown: true,
    scaffolding: "unsure",
    complexity: "unsure",
    pitchedMaterial: "unsure",
    roofType: "pitched",
  });
  assert.equal(unknown.areaKnown, false);
  assert.equal(unknown.confidence, "broad");
  assert.match(unknown.confidenceReason, /did not enter an approximate roof area/i);
  assert.notEqual(unknown.areaMin, unknown.areaMax);
});

test("minor repair is far below a full replacement", () => {
  const repair = estimateRoofCost({
    ...emptyInput,
    project: "repair",
    repairExtent: "minor",
    scaffolding: "no",
    areaM2: 80,
    areaUnknown: false,
    roofType: "pitched",
  });
  const replacement = estimateRoofCost({
    ...emptyInput,
    project: "replacement",
    areaM2: 80,
    areaUnknown: false,
    roofType: "pitched",
    scaffolding: "yes",
    complexity: "simple",
  });
  assert.ok(repair.high < replacement.low, `${repair.high} vs ${replacement.low}`);
  assert.equal(repair.needsInspection, false);
});

test("significant repair flags inspection", () => {
  const r = estimateRoofCost({
    ...emptyInput,
    project: "repair",
    repairExtent: "significant",
    scaffolding: "yes",
    areaM2: 80,
    areaUnknown: false,
  });
  assert.equal(r.needsInspection, true);
});

test("flat EPDM garage is a small covering job", () => {
  const r = estimateRoofCost({
    ...emptyInput,
    project: "flat-replacement",
    propertyType: "garage",
    roofType: "flat",
    areaM2: 20,
    areaUnknown: false,
    flatMaterial: "epdm",
    complexity: "simple",
    scaffolding: "no",
  });
  assert.ok(r.low >= 1400 && r.low <= 2500, `low ${r.low}`);
  assert.ok(r.high >= 1800 && r.high <= 4000, `high ${r.high}`);
});

test("unknown material is wider than EPDM", () => {
  const known = estimateRoofCost({
    ...emptyInput,
    project: "flat-replacement",
    propertyType: "garage",
    roofType: "flat",
    areaM2: 20,
    areaUnknown: false,
    flatMaterial: "epdm",
    scaffolding: "no",
  });
  const unsure = estimateRoofCost({
    ...emptyInput,
    project: "flat-replacement",
    propertyType: "garage",
    roofType: "flat",
    areaM2: 20,
    areaUnknown: false,
    flatMaterial: "unsure",
    scaffolding: "no",
  });
  assert.ok(unsure.high - unsure.low >= known.high - known.low);
});

test("unsure project spans repair to replacement", () => {
  const r = estimateRoofCost({
    ...emptyInput,
    project: "unsure",
    areaM2: 80,
    areaUnknown: false,
    scaffolding: "unsure",
  });
  assert.ok(r.low <= 800, `low ${r.low}`);
  assert.ok(r.high >= 10000, `high ${r.high}`);
  assert.equal(r.confidence, "broad");
});

test("parseAreaInput rejects junk", () => {
  assert.equal(parseAreaInput("").ok, false);
  assert.equal(parseAreaInput("abc").ok, false);
  assert.equal(parseAreaInput("0").ok, false);
  assert.equal(parseAreaInput("-12").ok, false);
  assert.equal(parseAreaInput("5000").ok, false);
  const ok = parseAreaInput("80");
  assert.equal(ok.ok, true);
  if (ok.ok) assert.equal(ok.value, 80);
});

test("zero or huge area in the engine does not invent millions", () => {
  const zero = estimateRoofCost({ ...emptyInput, project: "replacement", areaM2: 0, areaUnknown: false });
  assert.equal(zero.areaKnown, false);
  const huge = estimateRoofCost({ ...emptyInput, project: "replacement", areaM2: 99999, areaUnknown: false });
  assert.equal(huge.areaKnown, false);
  assert.ok(huge.high < 200000);
});
