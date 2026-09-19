# RoofCost UK

Independent UK roofing cost information and a free planning-range calculator for homeowners. Not a contractor.

Partner status in code: **pending**. Do not claim a live quote partnership until an approved embed is in `src/config/partner.ts`.

## Run locally

```bash
npm install
npm run dev
```

```bash
npm run build
npm run typecheck
```

## Cloudflare Pages

Indexable production host. Grok `*.grok.me` sends `X-Robots-Tag: noindex` and is not used as the public origin.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Environment variable | `VITE_PUBLIC_SITE_URL` = `https://your-project.pages.dev` (or your custom domain). HTTPS, no trailing slash. |

Cloudflare Pages sets `CF_PAGES=1` during the build, which selects the Nitro `cloudflare-pages` preset. You can also run `npm run build:pages` locally.

After the first deploy, set `VITE_PUBLIC_SITE_URL` to the live HTTPS origin and rebuild so canonicals, Open Graph, JSON-LD, `robots.txt` and `sitemap.xml` all use that host.

## BEFORE PUBLIC LAUNCH

1. Set `VITE_PUBLIC_SITE_URL` to the Cloudflare (or custom) HTTPS origin and rebuild.
2. Confirm canonical tags, `/sitemap.xml` and `/robots.txt` all use that host.
3. Re-read `src/config/pricingData.ts` and only then change `PRICING_DATA_LAST_VERIFIED` if you actually reviewed the figures.
4. Set `contactEmail` in `src/config/site.ts` if you want the contact form to open a real mailbox. Leave it blank rather than inventing an address.
5. Click every route: `/`, calculator, three guides, about, contact, privacy, terms, affiliate disclosure.
6. Add the Search Console HTML verification token to `src/config/site.ts` → `googleSiteVerification` after go-live.
7. Submit `/sitemap.xml` in Search Console.
8. Apply to the CPL partner (intended first partner: Leads Do Work) using the live HTTPS URL. Do not activate partner code first.

## AFTER LEADS DO WORK APPROVAL

1. Change `partnerStatus` to `"active"` in `src/config/partner.ts`.
2. Insert **only** the approved embed, widget or tracking URL. Do not invent code.
3. Add `partnerPrivacyUrl` / `partnerTermsUrl`.
4. Set `partnerScriptEnabled` to `true`.
5. Confirm the commission disclosure still shows next to the form.
6. Update `/privacy` if the partner processes personal data (the page already switches copy when status is active).
7. Test the live form end-to-end. A button click is not a lead.
8. Only treat `lead_submitted` as a lead if the partner provides a real completion callback.

## Configuration map

| What | Where |
| --- | --- |
| Site name / contact / Search Console tag | `src/config/site.ts` |
| Canonical host | `VITE_PUBLIC_SITE_URL` |
| Sitemap + robots | `public/robots.txt`, `public/sitemap.xml` (written at build from the same env var) |
| Price assumptions | `src/config/pricingData.ts` |
| Partner / CPL | `src/config/partner.ts` |
| Analytics IDs (off by default) | `src/config/analytics.ts` |
| In-memory events | `src/lib/events.ts` |

## Update prices

Edit `src/config/pricingData.ts` only. Keep `sourceName`, `sourceUrl`, dates, notes and `confidence`. HIGH/MEDIUM may narrow a consumer range; LOW may only widen it or appear as a caveat. Change `PRICING_DATA_LAST_VERIFIED` only after a genuine review.

## Add a future cost-guide page

1. `src/routes/your-slug.tsx` with `pageHead()`.
2. Add the path to `publicPages` in `src/config/site.ts` (sitemap follows automatically).
3. Do not mass-generate city or “roofers near me” pages.

## Architecture

- Calculator engines: `src/lib/calculator.ts`
- Price data: `src/config/pricingData.ts`
- Partner UI: `src/components/PartnerLeadForm.tsx`
