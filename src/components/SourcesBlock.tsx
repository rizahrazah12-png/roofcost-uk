import { LAST_REVIEWED_LABEL, pricingSources } from "@/config/pricingData";

export function SourcesBlock() {
  return (
    <section className="mt-12 border-t border-border pt-8" aria-labelledby="sources-heading">
      <h2 id="sources-heading" className="font-display text-xl font-semibold">
        Sources and methodology
      </h2>
      <p className="mt-2 text-sm text-muted">Last reviewed: {LAST_REVIEWED_LABEL}.</p>
      <p className="mt-2 max-w-3xl text-sm text-muted">
        Cost bands on this page are paraphrased planning figures, cross-checked
        against published UK home-improvement and trade-marketplace guides. They
        are not copied from any one publisher and they are not quotations.
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted">
        {pricingSources.map((s) => (
          <li key={s.url}>
            <a href={s.url} className="underline" rel="noopener noreferrer">
              {s.name}
            </a>
            {s.published ? ` (${s.published})` : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
