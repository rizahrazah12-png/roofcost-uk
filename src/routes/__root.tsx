import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteLayout } from "@/components/SiteLayout";
import { siteConfig } from "@/config/site";
import { analyticsConfig } from "@/config/analytics";
import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  head: () => {
    const meta = [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteConfig.name },
      { name: "theme-color", content: "#1f6a56" },
      { name: "color-scheme", content: "light" },
    ];
    const verification = siteConfig.googleSiteVerification || analyticsConfig.googleSearchConsoleVerification;
    if (verification) {
      meta.push({ name: "google-site-verification", content: verification });
    }
    return {
      meta,
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/__grok/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      ],
    };
  },
  notFoundComponent: NotFound,
  component: () => (
    <html lang="en-GB" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <SiteLayout>
            <Outlet />
          </SiteLayout>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  ),
});

function NotFound() {
  return (
    <main id="main" className="mx-auto max-w-xl px-4 py-16">
      <h1 className="font-display text-3xl font-semibold">Page not found</h1>
      <p className="mt-3 text-muted">That address is not used on RoofCost UK.</p>
      <p className="mt-4">
        <a href="/" className="font-semibold text-primary-dark underline">
          Back to the homepage
        </a>
      </p>
    </main>
  );
}
