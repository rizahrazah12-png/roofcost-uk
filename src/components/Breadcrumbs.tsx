import { JsonLd } from "@/components/JsonLd";
import { canonicalUrl } from "@/config/site";

export type Crumb = { label: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ label: "Home", path: "/" }, ...items];
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: canonicalUrl(item.path),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
      <JsonLd data={data} />
      <ol className="flex flex-wrap items-center gap-1">
        {all.map((item, i) => (
          <li key={item.path} className="flex items-center gap-1">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {i === all.length - 1 ? (
              <span className="text-fg" aria-current="page">
                {item.label}
              </span>
            ) : (
              <a href={item.path} className="no-underline hover:underline">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
