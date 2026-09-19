import {
  flatReplacementPerM2,
  pitchedReplacementPerM2,
  propertyAreaBenchmarks,
  repairJobBands,
  scaffoldingByProperty,
  wasteSkip,
} from "../config/pricingData.ts";

export type ProjectType = "repair" | "replacement" | "flat-replacement" | "unsure";
export type PropertyType = keyof typeof propertyAreaBenchmarks;
export type RoofType = "pitched" | "flat" | "mixed" | "unsure";
export type PitchedMaterial = keyof typeof pitchedReplacementPerM2;
export type FlatMaterial = keyof typeof flatReplacementPerM2;
export type RepairExtent = keyof typeof repairJobBands;
export type Complexity = "simple" | "some" | "complex" | "unsure";
export type Scaffolding = "yes" | "no" | "unsure";
export type YesNoUnsure = "yes" | "no" | "unsure";
export type Confidence = "broad" | "moderate" | "more-tailored";

export type CalculatorInput = {
  project: ProjectType;
  propertyType: PropertyType;
  roofType: RoofType;
  areaM2: number | null;
  areaUnknown: boolean;
  pitchedMaterial: PitchedMaterial;
  flatMaterial: FlatMaterial;
  repairExtent: RepairExtent;
  complexity: Complexity;
  scaffolding: Scaffolding;
  stripExisting: YesNoUnsure;
  insulationUpgrade: YesNoUnsure;
};

export type EstimateResult = {
  low: number;
  high: number;
  midpoint: number;
  confidence: Confidence;
  confidenceLabel: string;
  confidenceReason: string;
  projectLabel: string;
  areaKnown: boolean;
  areaMin: number;
  areaMax: number;
  needsInspection: boolean;
  factors: string[];
  pushHigher: string[];
  pushLower: string[];
  notes: string[];
};

const AREA_MIN = 5;
const AREA_MAX = 400;

export function parseAreaInput(raw: string): { ok: true; value: number } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: "Enter a roof area between 5 and 400 m², or choose “I don’t know the area”." };
  }
  if (!/^\d+(\.\d{1,2})?$/.test(trimmed)) {
    return { ok: false, error: "Use numbers only, for example 80 or 12.5." };
  }
  const n = Number(trimmed);
  if (!Number.isFinite(n) || n <= 0) {
    return { ok: false, error: "Area must be greater than zero." };
  }
  if (n < AREA_MIN) {
    return { ok: false, error: "Enter at least 5 m², or choose “I don’t know the area”." };
  }
  if (n > AREA_MAX) {
    return { ok: false, error: "Enter an area of 400 m² or less. Larger roofs need a contractor quotation, not this planner." };
  }
  return { ok: true, value: Math.round(n) };
}

function roundBand(n: number): number {
  return Math.max(100, Math.round(n / 100) * 100);
}

function resolveArea(input: CalculatorInput): { min: number; max: number; known: boolean } {
  if (!input.areaUnknown && input.areaM2 && input.areaM2 >= AREA_MIN && input.areaM2 <= AREA_MAX) {
    const a = Math.round(input.areaM2);
    return { min: a, max: a, known: true };
  }
  const b = propertyAreaBenchmarks[input.propertyType];
  return { min: b.min, max: b.max, known: false };
}

function scaffoldCost(input: CalculatorInput): { low: number; high: number } {
  const base = scaffoldingByProperty[input.propertyType];
  if (input.scaffolding === "no") return { low: 0, high: 0 };
  if (input.scaffolding === "yes") return { low: base.low, high: base.high };
  return { low: 0, high: base.high };
}

function shapeFactor(complexity: Complexity): { low: number; high: number } {
  if (complexity === "simple") return { low: 1, high: 1.05 };
  if (complexity === "some") return { low: 1, high: 1.18 };
  if (complexity === "complex") return { low: 1.05, high: 1.32 };
  return { low: 1, high: 1.18 };
}

function effectiveRoof(input: CalculatorInput): RoofType {
  if (input.project === "flat-replacement") return "flat";
  return input.roofType;
}

function pitchedReplacement(input: CalculatorInput, area: { min: number; max: number }) {
  const rate = pitchedReplacementPerM2[input.pitchedMaterial];
  const cx = shapeFactor(input.complexity);
  const scaf = scaffoldCost(input);
  const waste = wasteSkip.replacement;
  const low = area.min * rate.low * cx.low + scaf.low + waste.low;
  const high = area.max * rate.high * cx.high + scaf.high + waste.high;
  return { low, high };
}

function flatReplacement(input: CalculatorInput, area: { min: number; max: number }) {
  const rate = flatReplacementPerM2[input.flatMaterial];
  const cx = shapeFactor(input.complexity);
  const scaf = scaffoldCost(input);
  const waste = wasteSkip.replacement;
  let low = area.min * rate.low * cx.low + scaf.low + waste.low;
  let high = area.max * rate.high * cx.high + scaf.high + waste.high;
  return { low, high };
}

function repairEstimate(input: CalculatorInput, area: { min: number; max: number }) {
  const band = repairJobBands[input.repairExtent];
  const scaf = scaffoldCost(input);
  const waste = wasteSkip.repair;
  let low = band.low + scaf.low + waste.low;
  let high = band.high + scaf.high + waste.high;
  if (input.repairExtent === "significant") {
    const roof = effectiveRoof(input);
    const repl =
      roof === "flat" ? flatReplacement(input, area) : pitchedReplacement(input, area);
    high = Math.min(high, roundBand(repl.high * 0.85));
    high = Math.max(high, low + 400);
  }
  return { low, high };
}

function unknownProject(input: CalculatorInput, area: { min: number; max: number }) {
  const repair = repairEstimate({ ...input, project: "repair", repairExtent: "minor" }, area);
  const pitched = pitchedReplacement({ ...input, project: "replacement", pitchedMaterial: "unsure" }, area);
  const flat = flatReplacement({ ...input, project: "flat-replacement", flatMaterial: "unsure" }, area);
  return {
    low: Math.min(repair.low, pitched.low, flat.low),
    high: Math.max(pitched.high, flat.high),
  };
}

function mixedReplacement(input: CalculatorInput, area: { min: number; max: number }) {
  const p = pitchedReplacement(input, area);
  const f = flatReplacement(input, area);
  return { low: Math.min(p.low, f.low), high: Math.max(p.high, f.high) };
}

function confidenceOf(input: CalculatorInput, areaKnown: boolean): { level: Confidence; reason: string } {
  if (input.project === "unsure" || (input.repairExtent === "unsure" && input.project === "repair")) {
    return {
      level: "broad",
      reason: "Too little is known about the job type, so this is a broad planning span rather than a tailored figure.",
    };
  }
  if (!areaKnown) {
    return {
      level: "broad",
      reason:
        "You did not enter an approximate roof area, so we have used a wider property-based planning range.",
    };
  }
  const materialUnknown =
    effectiveRoof(input) === "flat" ? input.flatMaterial === "unsure" : input.pitchedMaterial === "unsure";
  const fuzzy =
    input.scaffolding === "unsure" ||
    input.complexity === "unsure" ||
    materialUnknown ||
    input.roofType === "unsure" ||
    input.roofType === "mixed";
  if (!fuzzy && input.project !== "repair") {
    return {
      level: "more-tailored",
      reason: "Area, covering and access were provided. This remains an indicative planning estimate rather than a contractor quote.",
    };
  }
  if (input.project === "repair" && input.repairExtent !== "unsure" && input.scaffolding !== "unsure") {
    return {
      level: "moderate",
      reason: "Repairs are priced by severity and access more than by roof area. A visit can still change the job entirely.",
    };
  }
  return {
    level: "moderate",
    reason: "Some details are still unknown, so the band is only moderately tailored.",
  };
}

function projectLabel(input: CalculatorInput): string {
  const roof = effectiveRoof(input);
  if (input.project === "repair") {
    return roof === "flat" ? "Flat roof repair" : "Roof repair";
  }
  if (input.project === "flat-replacement" || roof === "flat") return "Flat roof replacement";
  if (input.project === "unsure") return "Roof work (type not specified)";
  if (roof === "mixed") return "Mixed roof replacement";
  return "Pitched roof replacement";
}

export const emptyInput: CalculatorInput = {
  project: "repair",
  propertyType: "semi",
  roofType: "pitched",
  areaM2: null,
  areaUnknown: false,
  pitchedMaterial: "concrete",
  flatMaterial: "epdm",
  repairExtent: "minor",
  complexity: "simple",
  scaffolding: "unsure",
  stripExisting: "unsure",
  insulationUpgrade: "unsure",
};

export function estimateRoofCost(input: CalculatorInput): EstimateResult {
  const area = resolveArea(input);
  const roof = effectiveRoof(input);
  let pkg: { low: number; high: number };

  if (input.project === "unsure") {
    pkg = unknownProject(input, area);
  } else if (input.project === "repair") {
    pkg = repairEstimate(input, area);
  } else if (input.project === "flat-replacement" || roof === "flat") {
    pkg = flatReplacement(input, area);
  } else if (roof === "mixed") {
    pkg = mixedReplacement(input, area);
  } else {
    pkg = pitchedReplacement(input, area);
  }

  let low = roundBand(pkg.low);
  let high = roundBand(pkg.high);
  if (high - low < 400) high = low + 400;

  const midpoint = roundBand((low + high) / 2);
  const conf = confidenceOf(input, area.known);
  const needsInspection = input.project === "repair" && input.repairExtent === "significant";

  const factors: string[] = [
    propertyAreaBenchmarks[input.propertyType].label,
    area.known
      ? `Roof area entered: ${area.min} m²`
      : `Roof area not known — using a typical ${propertyAreaBenchmarks[input.propertyType].label} range of about ${area.min}–${area.max} m²`,
  ];

  if (roof === "flat") {
    factors.push(`Flat roof covering: ${flatReplacementPerM2[input.flatMaterial].label}`);
  } else if (roof === "pitched") {
    factors.push(`Pitched covering: ${pitchedReplacementPerM2[input.pitchedMaterial].label}`);
  } else {
    factors.push("Roof type mixed or unspecified — range is wider");
  }

  if (input.project === "repair") {
    const labels: Record<RepairExtent, string> = {
      minor: "Minor / localised repair (not a diagnosis)",
      several: "Moderate repair — several areas, flashing or a localised leak",
      significant: "Significant or widespread damage",
      unsure: "Repair extent not specified",
    };
    factors.push(labels[input.repairExtent]);
  } else if (input.project !== "unsure") {
    const labels: Record<Complexity, string> = {
      simple: "Simple roof shape",
      some: "Some complexity (valleys, chimneys or details)",
      complex: "Complex roof",
      unsure: "Complexity not specified",
    };
    factors.push(labels[input.complexity]);
  }

  factors.push(
    input.scaffolding === "yes"
      ? "Scaffolding included in the range"
      : input.scaffolding === "no"
        ? "Scaffolding not included — many two-storey jobs still need it"
        : "Scaffolding uncertain — the top of the range includes typical access costs",
  );

  if (input.project === "flat-replacement" || roof === "flat") {
    if (input.stripExisting === "yes") factors.push("Existing covering assumed to be stripped");
    if (input.stripExisting === "no") factors.push("Existing covering may be overlaid — quotes still depend on deck condition");
    if (input.insulationUpgrade === "yes") {
      factors.push("Insulation upgrade expected — not given a fake £/m²; budget extra after inspection");
    }
  }

  const pushHigher = [
    "Poor access, parking restrictions or a cramped site",
    "Rotten battens, deck or rafters found after strip-out",
    "Insulation upgrades, rooflights, chimneys or heritage materials",
    "London and much of the South East, where labour often runs higher",
    "Emergency or out-of-hours work, or a roof that cannot be left open overnight",
  ];
  const pushLower = [
    "A simple, easily accessed roof with a sound structure",
    "A single-storey building where a tower or smaller access may suffice",
    "A straightforward covering change without hidden timber work",
    "Combining the work with other planned access so scaffold is shared",
  ];

  const notes: string[] = [
    "This is an indicative planning range, not a contractor quotation.",
    "No physical roof inspection has taken place. Actual contractor pricing can vary materially.",
    "Always compare written quotations that set out labour, materials, waste, access and VAT.",
  ];
  if (!area.known) {
    notes.unshift("Because the roof area is unknown, this range is deliberately wide.");
  }
  if (input.project === "unsure") {
    notes.unshift("The job type is unspecified, so the span runs from a small repair up to a full replacement.");
  }
  if (needsInspection) {
    notes.unshift("Professional inspection recommended. Widespread damage, sagging, storm damage or major water ingress cannot be priced safely from a web form.");
  }

  return {
    low,
    high,
    midpoint,
    confidence: conf.level,
    confidenceLabel: confidenceLabel(conf.level),
    confidenceReason: conf.reason,
    projectLabel: projectLabel(input),
    areaKnown: area.known,
    areaMin: area.min,
    areaMax: area.max,
    needsInspection,
    factors,
    pushHigher,
    pushLower,
    notes,
  };
}

export function formatGbp(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
}

export function confidenceLabel(c: Confidence): string {
  if (c === "more-tailored") return "More tailored estimate";
  if (c === "moderate") return "Moderately tailored estimate";
  return "Broad estimate";
}
