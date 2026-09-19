import { Link } from "@tanstack/react-router";
import { legalItems, navItems, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-muted">
            Independent UK roofing cost information. Not a contractor, surveyor or
            roofer. Estimates are indicative planning ranges.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold">Cost guides</p>
          <ul className="mt-2 space-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted no-underline hover:text-primary-dark hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold">This site</p>
          <ul className="mt-2 space-y-1 text-sm">
            {legalItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted no-underline hover:text-primary-dark hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Last reviewed {siteConfig.lastReviewed}.
        </p>
      </div>
    </footer>
  );
}
