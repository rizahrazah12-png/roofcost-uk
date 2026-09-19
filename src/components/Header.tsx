import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { isPartnerActive } from "@/config/partner";
import { navItems } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const partner = isPartnerActive();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-fg"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="shrink-0 no-underline text-fg" aria-label="RoofCost UK home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-md px-3 py-2 text-sm text-fg no-underline hover:bg-bg"
              activeProps={{ className: "bg-bg font-semibold text-primary-dark" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {partner ? (
            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link to="/roof-cost-calculator" hash="quotes" className="no-underline text-primary-fg">
                Compare Roofing Quotes
              </Link>
            </Button>
          ) : null}
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border bg-surface lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-surface px-4 py-3 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="block rounded-md px-3 py-3 text-fg no-underline hover:bg-bg"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {partner ? (
              <li>
                <Link
                  to="/roof-cost-calculator"
                  hash="quotes"
                  className="block rounded-md bg-primary px-3 py-3 text-center font-semibold text-primary-fg no-underline"
                  onClick={() => setOpen(false)}
                >
                  Compare Roofing Quotes
                </Link>
              </li>
            ) : null}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
