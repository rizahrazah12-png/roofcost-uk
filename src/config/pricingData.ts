/**
 * Central UK roofing cost assumptions for RoofCost UK.
 *
 * Consumer-facing calculator bands are planning ranges, not quotations.
 * Checkatrade tables are often ex-VAT or mixed; whole-job replacement
 * tables on the same site are labelled +VAT. Notes record that mix.
 *
 * Only HIGH and MEDIUM confidence figures may narrow a result.
 * LOW-confidence items may widen a range or appear as caveats only.
 */

export type AssumptionConfidence = "HIGH" | "MEDIUM" | "LOW";
export type AssumptionUnit = "gbp_per_m2" | "gbp_job" | "gbp_lump" | "m2_band";

export type PriceAssumption = {
  id: string;
  category: "pitched-replacement" | "flat-replacement" | "repair" | "access" | "area" | "waste";
  low: number;
  high: number;
  unit: AssumptionUnit;
  sourceName: string;
  sourceUrl: string;
  sourcePublishedOrUpdatedDate: string;
  dateVerified: string;
  notes: string;
  confidence: AssumptionConfidence;
  label: string;
};

export const PRICING_DATA_LAST_VERIFIED = "2026-09-19";
export const PRICING_DATA_LAST_VERIFIED_LABEL = "19 September 2026";
/** @deprecated alias — use PRICING_DATA_LAST_VERIFIED_LABEL */
export const LAST_REVIEWED_ISO = PRICING_DATA_LAST_VERIFIED;
export const LAST_REVIEWED_LABEL = PRICING_DATA_LAST_VERIFIED_LABEL;

const CHECKATRADE_REPLACEMENT =
  "https://www.checkatrade.com/blog/cost-guides/roof-replacement-cost/";
const CHECKATRADE_INSTALL =
  "https://www.checkatrade.com/blog/cost-guides/roof-installation-cost/";
const CHECKATRADE_FLAT =
  "https://www.checkatrade.com/blog/cost-guides/flat-roof-replacement-costs/";
const CHECKATRADE_REPAIR =
  "https://www.checkatrade.com/blog/cost-guides/roof-repair-cost/";
const CHECKATRADE_SCAFFOLD =
  "https://www.checkatrade.com/blog/cost-guides/scaffolding-cost/";
const CHECKATRADE_TILES =
  "https://www.checkatrade.com/blog/cost-guides/roof-tile-replacement-cost/";
const COSTTOBUILD =
  "https://costtobuild.co.uk/cost-guides/roof-replacement/";

export const assumptions: PriceAssumption[] = [
  { id: "flat-felt-m2", category: "flat-replacement", low: 50, high: 80, unit: "gbp_per_m2", label: "felt / bitumen", sourceName: "Checkatrade — Flat roof replacement costs", sourceUrl: CHECKATRADE_FLAT, sourcePublishedOrUpdatedDate: "December 2024 table; page 2026", dateVerified: "2026-09-19", notes: "Fitted covering on a typical domestic flat roof, +VAT in the published table. Excludes rotten deck, insulation upgrade and awkward access.", confidence: "HIGH" },
  { id: "flat-epdm-m2", category: "flat-replacement", low: 80, high: 100, unit: "gbp_per_m2", label: "EPDM rubber", sourceName: "Checkatrade — Flat roof replacement costs", sourceUrl: CHECKATRADE_FLAT, sourcePublishedOrUpdatedDate: "December 2024 table; page 2026", dateVerified: "2026-09-19", notes: "EPDM £80–£100/m² +VAT. Typical 20–40 year membrane if detailed well.", confidence: "HIGH" },
  { id: "flat-grp-m2", category: "flat-replacement", low: 95, high: 120, unit: "gbp_per_m2", label: "GRP / fibreglass", sourceName: "Checkatrade — Flat roof replacement costs", sourceUrl: CHECKATRADE_FLAT, sourcePublishedOrUpdatedDate: "December 2024 table; page 2026", dateVerified: "2026-09-19", notes: "GRP £95–£120/m² +VAT. Often used where a harder finish is wanted.", confidence: "HIGH" },
  { id: "flat-unsure-m2", category: "flat-replacement", low: 50, high: 120, unit: "gbp_per_m2", label: "flat covering (unspecified)", sourceName: "Checkatrade — standard flat roof band", sourceUrl: CHECKATRADE_FLAT, sourcePublishedOrUpdatedDate: "2026", dateVerified: "2026-09-19", notes: "Published standard flat roof £50–£110/m², extended to GRP high of £120 when material is unknown. Do not silently pick the cheapest system.", confidence: "HIGH" },
  { id: "flat-typical-job", category: "flat-replacement", low: 2800, high: 7500, unit: "gbp_job", label: "typical domestic flat-roof replacement", sourceName: "Checkatrade — Flat roof replacement / roof replacement tables", sourceUrl: CHECKATRADE_REPLACEMENT, sourcePublishedOrUpdatedDate: "March 2026", dateVerified: "2026-09-19", notes: "Whole-job planning band for a standard flat roof, not a garage overlay and not the cost of building an extension.", confidence: "HIGH" },
  { id: "pitched-concrete-m2", category: "pitched-replacement", low: 85, high: 145, unit: "gbp_per_m2", label: "concrete tiles", sourceName: "Checkatrade gable replacement + CostToBuild 3-bed semi (cross-check)", sourceUrl: CHECKATRADE_REPLACEMENT, sourcePublishedOrUpdatedDate: "March 2026 / May 2026", dateVerified: "2026-09-19", notes: "Calibrated so an ~80 m² simple concrete re-roof plus scaffold lands near Checkatrade gable (£7,000–£16,250 +VAT) and CostToBuild 3-bed semi concrete. Checkatrade supply-and-fit concrete £120–£230/m² is treated as a covering-rate ceiling, not used alone, because it overshoots whole-job tables once scaffold is added.", confidence: "MEDIUM" },
  { id: "pitched-clay-m2", category: "pitched-replacement", low: 110, high: 175, unit: "gbp_per_m2", label: "clay tiles", sourceName: "Checkatrade installation (clay above concrete) + whole-job guides", sourceUrl: CHECKATRADE_INSTALL, sourcePublishedOrUpdatedDate: "June 2026", dateVerified: "2026-09-19", notes: "Clay sits above concrete and below natural slate in 2026 whole-job guides.", confidence: "MEDIUM" },
  { id: "pitched-slate-m2", category: "pitched-replacement", low: 140, high: 230, unit: "gbp_per_m2", label: "natural slate", sourceName: "Checkatrade supply-and-fit slate + CostToBuild slate bands", sourceUrl: CHECKATRADE_INSTALL, sourcePublishedOrUpdatedDate: "June 2026 / May 2026", dateVerified: "2026-09-19", notes: "Welsh slate can exceed this. Used as a planning band for typical natural slate, not a heritage quotation.", confidence: "MEDIUM" },
  { id: "pitched-artificial-slate-m2", category: "pitched-replacement", low: 95, high: 160, unit: "gbp_per_m2", label: "artificial slate", sourceName: "Industry position between concrete and clay (no single Checkatrade row)", sourceUrl: CHECKATRADE_INSTALL, sourcePublishedOrUpdatedDate: "2026", dateVerified: "2026-09-19", notes: "Fibre-cement / synthetic slate is interpolated between concrete and clay. Confidence MEDIUM; range kept wide.", confidence: "MEDIUM" },
  { id: "pitched-unsure-m2", category: "pitched-replacement", low: 85, high: 230, unit: "gbp_per_m2", label: "pitched covering (unspecified)", sourceName: "Union of concrete-to-slate planning bands", sourceUrl: CHECKATRADE_REPLACEMENT, sourcePublishedOrUpdatedDate: "2026", dateVerified: "2026-09-19", notes: "Unknown covering must not silently assume concrete.", confidence: "MEDIUM" },
  { id: "repair-minor-job", category: "repair", low: 150, high: 800, unit: "gbp_job", label: "minor / localised repair", sourceName: "Checkatrade tile replacement + leak/flashing consumer bands", sourceUrl: CHECKATRADE_TILES, sourcePublishedOrUpdatedDate: "April 2026", dateVerified: "2026-09-19", notes: "Few tiles or a small isolated defect with straightforward access. Scaffold extra. Not a diagnosis.", confidence: "HIGH" },
  { id: "repair-moderate-job", category: "repair", low: 400, high: 2500, unit: "gbp_job", label: "moderate repair (several areas / flashing / localised leak)", sourceName: "Checkatrade repair sundries + flashing/leak consumer guides 2026", sourceUrl: CHECKATRADE_REPAIR, sourcePublishedOrUpdatedDate: "June 2026", dateVerified: "2026-09-19", notes: "Multiple damaged areas, flashing-related work or a localised leak investigation. Per-m² repair rates (£90–£180 ex extras) inform the band but are not applied to the whole roof.", confidence: "MEDIUM" },
  { id: "repair-significant-job", category: "repair", low: 1200, high: 6500, unit: "gbp_job", label: "significant / widespread repair", sourceName: "Checkatrade larger-section repairs vs partial re-roof", sourceUrl: CHECKATRADE_REPAIR, sourcePublishedOrUpdatedDate: "June 2026", dateVerified: "2026-09-19", notes: "Capped against a full replacement of the same roof so a repair cannot price above a new covering without saying so. Inspection recommended.", confidence: "MEDIUM" },
  { id: "repair-unsure-job", category: "repair", low: 150, high: 4500, unit: "gbp_job", label: "repair extent not specified", sourceName: "Span of minor through significant domestic repairs", sourceUrl: CHECKATRADE_REPAIR, sourcePublishedOrUpdatedDate: "2026", dateVerified: "2026-09-19", notes: "Intentionally wide. LOW precision — must not be presented as tailored.", confidence: "LOW" },
  { id: "scaffold-semi", category: "access", low: 650, high: 1600, unit: "gbp_lump", label: "scaffolding, semi-detached", sourceName: "Checkatrade scaffolding + roof replacement access notes", sourceUrl: CHECKATRADE_SCAFFOLD, sourcePublishedOrUpdatedDate: "February 2026", dateVerified: "2026-09-19", notes: "2-storey semi £650–£1,100/week; replacement often £700–£1,300 to set up. High end allows a longer hire on a re-roof.", confidence: "HIGH" },
  { id: "scaffold-terraced", category: "access", low: 550, high: 1400, unit: "gbp_lump", label: "scaffolding, terraced", sourceName: "Checkatrade single scaffold / terraced wall work", sourceUrl: CHECKATRADE_SCAFFOLD, sourcePublishedOrUpdatedDate: "February 2026", dateVerified: "2026-09-19", notes: "Single elevation often cheaper than a semi; still material on a full re-roof.", confidence: "MEDIUM" },
  { id: "scaffold-detached", category: "access", low: 900, high: 2200, unit: "gbp_lump", label: "scaffolding, detached", sourceName: "Checkatrade 4-wall detached monthly vs replacement access", sourceUrl: CHECKATRADE_SCAFFOLD, sourcePublishedOrUpdatedDate: "February 2026", dateVerified: "2026-09-19", notes: "More elevations and often longer hire.", confidence: "MEDIUM" },
  { id: "scaffold-bungalow", category: "access", low: 400, high: 1200, unit: "gbp_lump", label: "scaffolding, bungalow", sourceName: "Checkatrade bungalow / lower-height access", sourceUrl: CHECKATRADE_SCAFFOLD, sourcePublishedOrUpdatedDate: "February 2026", dateVerified: "2026-09-19", notes: "Single-storey work may use a tower; still budget access.", confidence: "MEDIUM" },
  { id: "scaffold-garage", category: "access", low: 0, high: 450, unit: "gbp_lump", label: "access, garage / outbuilding", sourceName: "Checkatrade scaffold tower ~£250/week", sourceUrl: CHECKATRADE_SCAFFOLD, sourcePublishedOrUpdatedDate: "February 2026", dateVerified: "2026-09-19", notes: "Many garage roofs need little or no full scaffold.", confidence: "MEDIUM" },
  { id: "waste-replacement", category: "waste", low: 125, high: 400, unit: "gbp_lump", label: "skip / waste on a replacement", sourceName: "Checkatrade skip hire and roof installation extras", sourceUrl: CHECKATRADE_INSTALL, sourcePublishedOrUpdatedDate: "June 2026", dateVerified: "2026-09-19", notes: "Skip typically £125–£320; £300 cited as a round extra on installation.", confidence: "HIGH" },
  { id: "area-terraced", category: "area", low: 40, high: 70, unit: "m2_band", label: "typical terraced covering area", sourceName: "Industry planning bands used with whole-job examples (not a measured survey)", sourceUrl: COSTTOBUILD, sourcePublishedOrUpdatedDate: "2026", dateVerified: "2026-09-19", notes: "Used only when the user does not know m². Never assigned as a single fake size.", confidence: "MEDIUM" },
  { id: "area-semi", category: "area", low: 60, high: 95, unit: "m2_band", label: "typical semi-detached covering area", sourceName: "CostToBuild / whole-job 3-bed semi examples (~60–90 m²)", sourceUrl: COSTTOBUILD, sourcePublishedOrUpdatedDate: "May 2026", dateVerified: "2026-09-19", notes: "A band, not 65 m² exactly.", confidence: "MEDIUM" },
  { id: "area-detached", category: "area", low: 90, high: 140, unit: "m2_band", label: "typical detached covering area", sourceName: "Whole-job detached examples in 2026 cost guides", sourceUrl: COSTTOBUILD, sourcePublishedOrUpdatedDate: "2026", dateVerified: "2026-09-19", notes: "Wide because detached footprints vary.", confidence: "MEDIUM" },
  { id: "area-bungalow", category: "area", low: 50, high: 95, unit: "m2_band", label: "typical bungalow covering area", sourceName: "Planning band inferred from single-storey housing examples", sourceUrl: COSTTOBUILD, sourcePublishedOrUpdatedDate: "2026", dateVerified: "2026-09-19", notes: "MEDIUM: fewer published m² samples than semis.", confidence: "MEDIUM" },
  { id: "area-garage", category: "area", low: 15, high: 30, unit: "m2_band", label: "typical garage / outbuilding covering area", sourceName: "Common single/double garage footprints in UK flat-roof guides", sourceUrl: CHECKATRADE_FLAT, sourcePublishedOrUpdatedDate: "2026", dateVerified: "2026-09-19", notes: "Not a measured survey.", confidence: "MEDIUM" },
  { id: "area-other", category: "area", low: 40, high: 110, unit: "m2_band", label: "other property covering area", sourceName: "Wide fallback spanning terrace to modest detached", sourceUrl: COSTTOBUILD, sourcePublishedOrUpdatedDate: "2026", dateVerified: "2026-09-19", notes: "LOW precision by design.", confidence: "LOW" },
];

function must(id: string): PriceAssumption {
  const row = assumptions.find((a) => a.id === id);
  if (!row) throw new Error(`Missing assumption ${id}`);
  return row;
}

export const propertyAreaBenchmarks = {
  terraced: { min: must("area-terraced").low, max: must("area-terraced").high, label: "terraced house" },
  semi: { min: must("area-semi").low, max: must("area-semi").high, label: "semi-detached house" },
  detached: { min: must("area-detached").low, max: must("area-detached").high, label: "detached house" },
  bungalow: { min: must("area-bungalow").low, max: must("area-bungalow").high, label: "bungalow" },
  garage: { min: must("area-garage").low, max: must("area-garage").high, label: "garage / outbuilding" },
  other: { min: must("area-other").low, max: must("area-other").high, label: "other property" },
} as const;

export const pitchedReplacementPerM2 = {
  concrete: must("pitched-concrete-m2"),
  clay: must("pitched-clay-m2"),
  "natural-slate": must("pitched-slate-m2"),
  "artificial-slate": must("pitched-artificial-slate-m2"),
  unsure: must("pitched-unsure-m2"),
} as const;

export const flatReplacementPerM2 = {
  felt: must("flat-felt-m2"),
  epdm: must("flat-epdm-m2"),
  grp: must("flat-grp-m2"),
  unsure: must("flat-unsure-m2"),
} as const;

export const scaffoldingByProperty = {
  terraced: must("scaffold-terraced"),
  semi: must("scaffold-semi"),
  detached: must("scaffold-detached"),
  bungalow: must("scaffold-bungalow"),
  garage: must("scaffold-garage"),
  other: must("scaffold-semi"),
} as const;

export const wasteSkip = {
  replacement: must("waste-replacement"),
  repair: { low: 0, high: 180, confidence: "MEDIUM" as const },
};

export const repairJobBands = {
  minor: must("repair-minor-job"),
  several: must("repair-moderate-job"),
  significant: must("repair-significant-job"),
  unsure: must("repair-unsure-job"),
} as const;

export const pricingSources = [
  { name: "Checkatrade — Roof replacement cost breakdown 2026", url: CHECKATRADE_REPLACEMENT, published: "March 2026 table", lastChecked: "2026-09-19", represents: "Whole-job +VAT ranges for gable, hip and flat replacements." },
  { name: "Checkatrade — Flat roof replacement costs", url: CHECKATRADE_FLAT, published: "2026 page / December 2024 table", lastChecked: "2026-09-19", represents: "Felt, EPDM and GRP £/m² and £2,800–£7,500 typical job." },
  { name: "Checkatrade — Roof repair costs 2026", url: CHECKATRADE_REPAIR, published: "June 2026", lastChecked: "2026-09-19", represents: "Repair £/m² for small areas; access and VAT often extra." },
  { name: "Checkatrade — Roof tile replacement 2026", url: CHECKATRADE_TILES, published: "April 2026", lastChecked: "2026-09-19", represents: "Small tile jobs from about £170 for up to five tiles." },
  { name: "Checkatrade — Scaffolding costs 2026", url: CHECKATRADE_SCAFFOLD, published: "February 2026", lastChecked: "2026-09-19", represents: "Weekly hire for typical UK houses." },
  { name: "CostToBuild — Roof replacement cost UK 2026", url: COSTTOBUILD, published: "21 May 2026", lastChecked: "2026-09-19", represents: "Whole-roof 3-bed semi examples used as a cross-check, not copied." },
];

export const publicMethodology = {
  headline: "Estimates are planning ranges built from 2026 UK cost guides, not a survey of your roof.",
  bullets: [
    "Pitched replacement, flat replacement and repairs use separate logic — they are not one formula.",
    "If you know the roof area in m², that figure is used. If you do not, we use a wider property-type band, not a single made-up size.",
    "Unknown materials return a blended range. We do not silently pick the cheapest covering.",
    "Location is not applied as a fake percentage. Labour is often higher in London and the South East.",
    "Figures are rounded to the nearest £100. They are indicative only.",
  ],
};
