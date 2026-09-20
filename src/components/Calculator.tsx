import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PartnerLeadForm } from "@/components/PartnerLeadForm";
import { Button } from "@/components/ui/button";
import { isPitchedReplacementQuoteEligible } from "@/config/partner";
import { publicMethodology } from "@/config/pricingData";
import {
  emptyInput,
  estimateRoofCost,
  formatGbp,
  parseAreaInput,
  type CalculatorInput,
  type Complexity,
  type FlatMaterial,
  type PitchedMaterial,
  type ProjectType,
  type PropertyType,
  type RepairExtent,
  type RoofType,
  type Scaffolding,
  type YesNoUnsure,
} from "@/lib/calculator";
import { track } from "@/lib/events";
import { cn } from "@/lib/utils";

const STEPS = ["Project", "Property", "Roof", "Material", "Details", "Result"] as const;

type Option<T extends string> = { value: T; label: string; hint?: string };

function ChoiceGroup<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: Option<T>[];
  onChange: (v: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 font-semibold">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <label
              key={opt.value}
              className={cn(
                "flex min-h-14 cursor-pointer items-start gap-3 rounded-md border px-3 py-3",
                selected ? "border-primary bg-primary/10" : "border-border bg-surface hover:border-primary/50",
              )}
            >
              <input
                type="radio"
                className="mt-1 size-4 accent-primary"
                name={name}
                value={opt.value}
                checked={selected}
                onChange={() => onChange(opt.value)}
              />
              <span>
                <span className="block font-medium">{opt.label}</span>
                {opt.hint ? <span className="block text-sm text-muted">{opt.hint}</span> : null}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Calculator() {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<CalculatorInput>(emptyInput);
  const [areaText, setAreaText] = useState("");
  const [areaError, setAreaError] = useState("");
  const [started, setStarted] = useState(false);

  const estimate = useMemo(() => (step === 5 ? estimateRoofCost(input) : null), [step, input]);

  useEffect(() => {
    if (!started) {
      setStarted(true);
      track("calculator_started");
    }
  }, [started]);

  function patch(p: Partial<CalculatorInput>) {
    setInput((prev) => ({ ...prev, ...p }));
  }

  function goNext() {
    if (step === 2) {
      if (!input.areaUnknown) {
        const parsed = parseAreaInput(areaText);
        if (!parsed.ok) {
          setAreaError(parsed.error);
          return;
        }
        setAreaError("");
        patch({ areaM2: parsed.value });
      } else {
        setAreaError("");
        patch({ areaM2: null });
      }
    }
    track("calculator_step_completed", { step: step + 1 });
    if (step === 4) {
      const next = estimateRoofCost({
        ...input,
        areaM2: input.areaUnknown ? null : input.areaM2,
      });
      track("calculator_completed", { low: next.low, high: next.high });
    }
    setStep((s) => Math.min(5, s + 1));
  }

  function goBack() {
    setStep((s) => Math.max(0, s - 1));
  }

  const roofLockedFlat = input.project === "flat-replacement";
  const showFlatMaterials =
    roofLockedFlat || input.roofType === "flat" || input.roofType === "mixed" || input.roofType === "unsure";
  const showPitchedMaterials =
    !roofLockedFlat && (input.roofType === "pitched" || input.roofType === "mixed" || input.roofType === "unsure");

  return (
    <div className="rounded-lg border border-border bg-surface p-4 shadow-sm sm:p-6">
      {step < 5 ? (
        <p className="mb-4 text-sm text-muted">No contact details required to see your estimate.</p>
      ) : null}

      <div className="mb-6" aria-hidden={step === 5}>
        <p className="text-sm text-muted">
          Step {Math.min(step + 1, 5)} of 5
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-border">
          <div
            className="h-full bg-primary transition-[width] duration-200"
            style={{ width: `${((Math.min(step, 4) + (step === 5 ? 1 : 0)) / 5) * 100}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-muted">{STEPS[Math.min(step, 5)]}</p>
      </div>

      {step === 0 ? (
        <ChoiceGroup<ProjectType>
          legend="What work are you considering?"
          name="project"
          value={input.project}
          onChange={(v) =>
            patch({
              project: v,
              roofType: v === "flat-replacement" ? "flat" : input.roofType === "flat" && v === "replacement" ? "pitched" : input.roofType,
            })
          }
          options={[
            { value: "repair", label: "Roof repair", hint: "Tiles, leaks, flashing or localised damage" },
            { value: "replacement", label: "Full roof replacement", hint: "Re-covering a pitched roof" },
            { value: "flat-replacement", label: "Flat roof replacement", hint: "Felt, EPDM or GRP" },
            { value: "unsure", label: "Not sure", hint: "We’ll show a wider planning range" },
          ]}
        />
      ) : null}

      {step === 1 ? (
        <ChoiceGroup<PropertyType>
          legend="What type of property is it?"
          name="property"
          value={input.propertyType}
          onChange={(v) => patch({ propertyType: v })}
          options={[
            { value: "terraced", label: "Terraced house" },
            { value: "semi", label: "Semi-detached house" },
            { value: "detached", label: "Detached house" },
            { value: "bungalow", label: "Bungalow" },
            { value: "garage", label: "Garage / outbuilding" },
            { value: "other", label: "Other" },
          ]}
        />
      ) : null}

      {step === 2 ? (
        <div className="space-y-6">
          {roofLockedFlat ? (
            <p className="rounded-md bg-bg px-3 py-2 text-sm text-muted">
              Roof type set to flat for a flat roof replacement.
            </p>
          ) : (
            <ChoiceGroup<RoofType>
              legend="What type of roof is it?"
              name="roofType"
              value={input.roofType}
              onChange={(v) => patch({ roofType: v })}
              options={[
                { value: "pitched", label: "Pitched" },
                { value: "flat", label: "Flat" },
                { value: "mixed", label: "Mixed", hint: "For example a pitched house with a flat extension" },
                { value: "unsure", label: "Not sure" },
              ]}
            />
          )}
          <div>
            <label htmlFor="area" className="mb-2 block font-semibold">
              Approximate roof area (m²)
            </label>
            <input
              id="area"
              inputMode="numeric"
              className="min-h-11 w-full max-w-xs rounded-md border border-border bg-bg px-3 disabled:opacity-50"
              value={areaText}
              disabled={input.areaUnknown}
              aria-invalid={Boolean(areaError)}
              aria-describedby={areaError ? "area-error" : "area-help"}
              onChange={(e) => {
                setAreaText(e.target.value.replace(/[^0-9.]/g, ""));
                setAreaError("");
              }}
            />
            <p id="area-help" className="mt-1 text-sm text-muted">
              Roof area is usually larger than the ground-floor footprint on a pitched roof.
            </p>
            <label className="mt-3 flex min-h-11 items-center gap-2">
              <input
                type="checkbox"
                className="size-4 accent-primary"
                checked={input.areaUnknown}
                onChange={(e) => {
                  patch({ areaUnknown: e.target.checked, areaM2: e.target.checked ? null : input.areaM2 });
                  setAreaError("");
                }}
              />
              I don’t know the area
            </label>
            {input.areaUnknown ? (
              <p className="mt-2 text-sm text-muted">
                We will not guess an exact size from the property type. The result will use a
                wider typical band instead.
              </p>
            ) : null}
            {areaError ? (
              <p id="area-error" className="mt-2 text-sm text-warn-fg" role="alert">
                {areaError}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}

      {step === 3 ? (
        <div className="space-y-6">
          {showPitchedMaterials ? (
            <ChoiceGroup<PitchedMaterial>
              legend="Pitched roof covering"
              name="pitched"
              value={input.pitchedMaterial}
              onChange={(v) => patch({ pitchedMaterial: v })}
              options={[
                { value: "concrete", label: "Concrete tiles" },
                { value: "clay", label: "Clay tiles" },
                { value: "natural-slate", label: "Natural slate" },
                { value: "artificial-slate", label: "Artificial slate" },
                { value: "unsure", label: "Not sure" },
              ]}
            />
          ) : null}
          {showFlatMaterials ? (
            <ChoiceGroup<FlatMaterial>
              legend="Flat roof covering"
              name="flat"
              value={input.flatMaterial}
              onChange={(v) => patch({ flatMaterial: v })}
              options={[
                { value: "felt", label: "Felt" },
                { value: "epdm", label: "EPDM rubber" },
                { value: "grp", label: "GRP / fibreglass" },
                { value: "unsure", label: "Not sure" },
              ]}
            />
          ) : null}
        </div>
      ) : null}

      {step === 4 ? (
        <div className="space-y-6">
          {input.project === "repair" ? (
            <ChoiceGroup<RepairExtent>
              legend="How extensive is the damage?"
              name="extent"
              value={input.repairExtent}
              onChange={(v) => patch({ repairExtent: v })}
              options={[
                { value: "minor", label: "Minor / localised issue", hint: "A few tiles or a small isolated defect — not a diagnosis" },
                { value: "several", label: "Moderate repair", hint: "Several damaged areas, flashing, or a localised leak" },
                { value: "significant", label: "Significant / widespread damage", hint: "A larger section, or you suspect the problem is extensive" },
                { value: "unsure", label: "Not sure", hint: "We’ll show a wider band and recommend an inspection if needed" },
              ]}
            />
          ) : (
            <ChoiceGroup<Complexity>
              legend="How complex is the roof shape?"
              name="complexity"
              value={input.complexity}
              onChange={(v) => patch({ complexity: v })}
              options={[
                { value: "simple", label: "Simple roof shape" },
                { value: "some", label: "Some complexity / valleys / chimneys" },
                { value: "complex", label: "Complex roof" },
                { value: "unsure", label: "Not sure" },
              ]}
            />
          )}
          <ChoiceGroup<Scaffolding>
            legend="Is scaffolding likely?"
            name="scaffold"
            value={input.scaffolding}
            onChange={(v) => patch({ scaffolding: v })}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "unsure", label: "Not sure" },
            ]}
          />
          {input.project === "flat-replacement" || input.roofType === "flat" ? (
            <>
              <ChoiceGroup<YesNoUnsure>
                legend="Does the existing covering need to be removed?"
                name="strip"
                value={input.stripExisting}
                onChange={(v) => patch({ stripExisting: v })}
                options={[
                  { value: "yes", label: "Yes, strip the old covering" },
                  { value: "no", label: "No / overlay may be possible" },
                  { value: "unsure", label: "Not sure" },
                ]}
              />
              <ChoiceGroup<YesNoUnsure>
                legend="Is an insulation upgrade likely?"
                name="insulation"
                value={input.insulationUpgrade}
                onChange={(v) => patch({ insulationUpgrade: v })}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "unsure", label: "Not sure" },
                ]}
              />
              <p className="text-sm text-muted">
                Insulation and deck repairs are quoted after inspection. We do not invent a £/m² adder for them.
              </p>
            </>
          ) : null}
        </div>
      ) : null}

      {step === 5 && estimate ? (
        <div>
          <p className="text-sm font-medium text-muted">{estimate.projectLabel}</p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Estimated planning range</h2>
          <p className="mt-3 font-display text-4xl font-semibold tabular-nums tracking-tight">
            {formatGbp(estimate.low)} – {formatGbp(estimate.high)}
          </p>
          <p className="mt-2 text-sm text-muted">
            Typical midpoint around {formatGbp(estimate.midpoint)}. This is an indicative planning
            range, not a quotation.
          </p>
          <p className="mt-3 text-sm">
            <strong>{estimate.confidenceLabel}</strong>
          </p>
          <p className="mt-1 text-sm text-muted">{estimate.confidenceReason}</p>
          {estimate.needsInspection ? (
            <p className="mt-4 rounded-md border border-border bg-warn-bg px-3 py-3 text-sm text-fg" role="status">
              Professional inspection recommended. Visible sagging, storm damage, major water
              ingress or possible structural problems cannot be priced safely from this form.
              Do not access the roof yourself.
            </p>
          ) : null}

          {isPitchedReplacementQuoteEligible(input.project) ? (
            <div className="mt-6">
              <PartnerLeadForm placement="result" />
            </div>
          ) : null}

          <ul className="mt-6 list-disc space-y-1 pl-5 text-sm text-muted">
            {estimate.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>

          <h3 className="mt-6 font-display text-lg font-semibold">Factors affecting this estimate</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {estimate.factors.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="font-display text-base font-semibold">What could push the price higher</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {estimate.pushHigher.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-base font-semibold">What could reduce the price</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {estimate.pushLower.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mt-6 text-sm">
            Learn more:{" "}
            <Link to="/new-roof-cost" className="underline">
              new roof costs
            </Link>
            {", "}
            <Link to="/roof-repair-cost" className="underline">
              repair costs
            </Link>
            {" and "}
            <Link to="/flat-roof-cost" className="underline">
              flat-roof costs
            </Link>
            .
          </p>

          <section className="mt-8 border-t border-border pt-6" aria-labelledby="how-est">
            <h3 id="how-est" className="font-display text-lg font-semibold">
              How we estimate costs
            </h3>
            <p className="mt-2 text-sm text-muted">{publicMethodology.headline}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
              {publicMethodology.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-3">
        {step > 0 ? (
          <Button type="button" variant="secondary" onClick={goBack}>
            Back
          </Button>
        ) : null}
        {step < 5 ? (
          <Button type="button" onClick={goNext}>
            {step === 4 ? "See planning range" : "Continue"}
          </Button>
        ) : (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setStep(0);
            }}
          >
            Start again
          </Button>
        )}
      </div>
    </div>
  );
}
