import { canonicalUrl, siteConfig } from "@/config/site";

type PageSeo = {
  title: string;
  description: string;
  path: string;
  index?: boolean;
};

export function pageHead({ title, description, path, index = true }: PageSeo) {
  const url = canonicalUrl(path);
  const robots = index ? "index, follow" : "noindex, follow";
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: robots },
      { name: "author", content: siteConfig.name },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },
      { property: "og:site_name", content: siteConfig.name },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
