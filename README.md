# Summit Roofing Co. — Roofing Contractor Demo Website

A production-quality demo site for **Summit Roofing Co.**, a *fictional* locally owned roofing company in Charlotte, North Carolina. It shows roofing business owners what a fast, modern, high-converting website looks like.

Built with **Vite + React + Tailwind CSS v4**. Every page is prerendered to static HTML at build time. Only the interactive parts (inspection form, payment estimator, project filter) hydrate in the browser, and the mobile menu is a native popover that needs no JavaScript. No backend is required: `dist/` deploys to any static host.

> Demo website designed by **CodingStack**. The business, reviews, projects, license number and contact details are placeholders.

## Lighthouse scores

Measured with Lighthouse 13.6 against `npm run preview`. Mobile uses the default profile (Moto G Power emulation, slow 4G, 4× CPU throttling) and shows the median of three runs per page. Desktop uses the desktop preset.

| Page          | Performance | Accessibility | Best Practices | SEO | Mobile LCP | Mobile TBT |
| ------------- | :---------: | :-----------: | :------------: | :-: | :--------: | :--------: |
| Home          |     99      |      100      |      100       | 100 |   1.5 s    |   110 ms   |
| Services      |     100     |      100      |      100       | 100 |   1.6 s    |   50 ms    |
| Our Work      |     99      |      100      |      100       | 100 |   1.8 s    |   110 ms   |
| Service Areas |     100     |      100      |      100       | 100 |   1.4 s    |   70 ms    |
| About         |     100     |      100      |      100       | 100 |   1.4 s    |   40 ms    |
| Contact       |     100     |      100      |      100       | 100 |   0.8 s    |   40 ms    |

On desktop every page scores 100 in all four categories, with LCP between 0.2 and 0.6 s. Cumulative layout shift is 0 everywhere. Individual mobile runs vary by a point or two.

To reproduce:

```bash
npm run build && npm run preview
npx lighthouse http://localhost:4173/ --view
```

### What keeps it fast

- **No JavaScript on the critical path.** Each page loads one ~2 KB script up front. React (~66 KB gzipped) is imported on demand, only when an island needs it, so it never competes with the hero photo.
- **The mobile menu needs no JavaScript.** It's a native popover (`popover` + `popovertarget`), so the browser handles opening, closing, Escape, click-outside and `aria-expanded`.
- **Islands hydrate late.** The inspection form and payment estimator hydrate when scrolled near. The project filter hydrates on first hover, focus or tap, and replays a click that lands before React is ready.
- **Images are responsive AVIF/WebP** with intrinsic sizes, a tiny inline blurred placeholder, `loading="lazy"` below the fold and `fetchpriority="high"` on the hero.
- **One preloaded variable font** (Archivo, Latin subset, 35 KB). Plus 10 KB of CSS, all gzipped.

---

## Quick start

Requires **Node 20.19+ or 22.12+** (`.nvmrc` pins 22).

```bash
npm install
npm run dev        # http://localhost:5173 (server-rendered, same HTML as production)
npm run build      # static site → dist/
npm run preview    # serve dist/ at http://localhost:4173
```

| Script              | What it does                                                                     |
| ------------------- | -------------------------------------------------------------------------------- |
| `npm run dev`       | Dev server. Pages are rendered by the same code the build uses.                  |
| `npm run build`     | Builds client assets, builds the server renderer, prerenders every page to HTML. |
| `npm run preview`   | Serves the production build locally.                                             |
| `npm run typecheck` | TypeScript project check.                                                        |
| `npm run images`    | Regenerates responsive AVIF/WebP photos and PNG icons (see [Images](#images)).   |
| `npm run og`        | Re-renders the social share image with headless Chrome.                          |

## Pages

| URL               | Contents                                                                                                                                                                                        |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`               | Hero + trust badges, storm damage banner, services grid, 4-step process, project gallery preview, reviews, financing with payment estimator, FAQ accordion, final CTA with the inspection form |
| `/services/`      | All 7 services with anchors (e.g. `/services/#storm-damage`), the insurance claim process, and roofing materials                                                                               |
| `/our-work/`      | 9 before/after project cards with a category filter                                                                                                                                             |
| `/service-areas/` | Coverage map plus Charlotte, Matthews, Huntersville, Concord, Gastonia and Fort Mill, each with neighborhoods and ZIP codes (anchors like `/service-areas/#concord`)                           |
| `/about/`         | Story, stats, values, credentials with the Certified Installer badge, timeline                                                                                                                  |
| `/contact/`       | Free inspection form, contact details, office hours, "what happens after you book"                                                                                                              |
| `404.html`        | Not-found page (served by static hosts for unknown URLs)                                                                                                                                        |

## How it works

```
npm run build
 ├─ vite build                     → dist/            client JS, CSS, fonts (hashed)
 ├─ vite build --ssr …             → .ssr/            server renderer (temporary)
 └─ node scripts/prerender.js      → dist/**/index.html, 404.html, sitemap.xml, robots.txt
```

- **Static first.** `src/entry-server.tsx` renders each route in `src/routes.ts` with `renderToString`. The result, including per-page `<head>` tags and JSON-LD, is written into `index.html`.
- **Islands.** Interactive components are wrapped with `island()` (`src/islands/island.tsx`). The server renders their HTML plus their props as JSON. `src/entry-client.ts` hydrates only those components, choosing a strategy per island: `load`, `idle`, `visible` (the form and payment estimator) or `interaction` (the project filter). React is imported only when the first island hydrates. Everything else ships zero JavaScript.
- **No-JS by default.** The FAQ uses native `<details>`, the mobile menu is a native popover (with a tiny fallback in `entry-client.ts` for browsers without the Popover API), and every phone number and link works before any script runs.
- **Dev parity.** `scripts/dev-ssr-plugin.ts` makes `npm run dev` serve the same server-rendered HTML, so what you see in development is what ships.

## SEO

- A unique `<title>`, meta description and canonical URL for each page (exported as `…Meta` from each file in `src/pages/`).
- Open Graph and Twitter card tags with a 1200×630 share image (`public/og-image.jpg`).
- JSON-LD on every page: `RoofingContractor` (a schema.org `LocalBusiness` type) with address, geo, hours, service area, aggregate rating and an offer catalog of services. Inner pages add `BreadcrumbList`, the home page adds `FAQPage`, and the services page adds an `ItemList` of `Service`s. All of it is built in `src/lib/seo.ts` from `src/config/site.ts`.
- `sitemap.xml` and `robots.txt` are generated at build time from the route table.
- Semantic landmarks, one `<h1>` per page, a skip link, labelled form controls, visible focus styles, and colors checked against WCAG AA.

## Project structure

```
├── images/                    Source photos (run `npm run images` after changing) + CREDITS.md
├── public/                    Copied as-is: favicon, icons, og-image.jpg, optimized images, _headers
├── scripts/
│   ├── prerender.js           Renders every route to static HTML, writes sitemap/robots
│   ├── dev-ssr-plugin.ts      Vite plugin: server-renders pages in dev
│   ├── optimize-images.js     Photos → AVIF/WebP srcsets + manifest; SVG → PNG icons
│   ├── og-image.html          Social share image design (1200×630)
│   └── render-og-image.js     Screenshots og-image.html → public/og-image.jpg
└── src/
    ├── config/site.ts         ★ Business name, phone, address, hours, license, rating, nav
    ├── data/                  ★ Services, projects, service areas, reviews, FAQs (plain TS)
    ├── pages/                 One component per page, each exporting its SEO meta
    ├── components/
    │   ├── layout/            Header + popover menu, footer, logo, page layout
    │   ├── sections/          Page sections (Hero, StormBanner, Reviews, Financing, FAQ, …)
    │   ├── forms/             Inspection form (island) + photo picker
    │   ├── work/              Project card + filter (island)
    │   └── ui/                Buttons, Picture, StarRating, CertifiedBadge, …
    ├── islands/               island() wrapper + client registry
    ├── lib/                   SEO/JSON-LD, form validation & submission, image helpers
    ├── styles/global.css      Tailwind import + design tokens (@theme)
    ├── routes.ts              Route table
    ├── entry-server.tsx       render(url) used by dev server + prerender
    └── entry-client.ts        Hydrates islands
```

## Customizing for a real client

1. **Business details:** edit `src/config/site.ts` (name, phone, email, address, geo, hours, license, rating). Header, footer, CTAs, meta tags and schema markup all read from this file.
2. **Content:** edit the arrays in `src/data/`. Services drive the services page, home grid, footer links, form dropdown and schema `OfferCatalog`. Projects drive the Our Work page and the home page gallery (`featuredProjects` picks which six appear).
3. **Brand colors:** change the `--color-brand-*` (charcoal) and `--color-accent-*` (red) tokens in `src/styles/global.css`. Red buttons use white text on `accent-600`, which is 5.6:1. If you lighten the red, re-check the contrast.
4. **Logo:** update `public/favicon.svg` and `LogoMark` in `src/components/layout/Logo.tsx` (same artwork), then run `npm run images` to regenerate the PNG icons.
5. **Certified badge:** `src/components/ui/CertifiedBadge.tsx` is a generic, brand-free seal. Only swap in a real manufacturer's badge if the client holds that certification and has permission to use the logo.
6. **Page SEO:** each page exports its `title` and `description` (e.g. `homeMeta` in `src/pages/HomePage.tsx`).
7. **Social image:** edit `scripts/og-image.html`, then run `npm run og` (needs Chrome; set `CHROME_PATH` if it isn't on your `PATH` as `google-chrome`).

### Images

Put a JPG/PNG in `images/` and run `npm run images`. The script writes AVIF + WebP files at several widths to `public/images/`, with a content hash in each filename. It also writes `src/data/image-manifest.json` with dimensions and a tiny blurred placeholder. Then use the image by name:

```tsx
<Picture name="service-gutters" alt="…" sizes="(min-width: 1024px) 50vw, 100vw" />
```

`<Picture>` sets width/height (no layout shift) and lazy-loads by default. Pass `priority` for above-the-fold images. Image names are type-checked against the manifest. Photo sources and licenses are listed in `images/CREDITS.md`.

## Connecting the inspection form

The form validates on the client: name, a 10-digit US phone number, email, a street address with a house number, the service needed, and an optional message (up to 1,000 characters). Errors appear inline with `aria-invalid`/`aria-describedby`, and focus moves to the first problem. On success it shows a friendly confirmation. Links like `/contact/?service=gutters#inspection` pre-select the service.

It POSTs JSON to whatever `VITE_FORM_ENDPOINT` points to. **Without it, the form runs in demo mode:** it validates and shows success, but sends nothing.

**Formspree**

1. Create a form at [formspree.io](https://formspree.io) and copy its endpoint (`https://formspree.io/f/abcdwxyz`).
2. Set `VITE_FORM_ENDPOINT` in `.env` (copy `.env.example`) or in your host's environment variables.
3. Rebuild. Formspree reads `email` as the reply-to address and `_subject` as the email subject, and `_gotcha` is its built-in spam honeypot.

**Any webhook** (Zapier, Make, n8n, a serverless function) works the same way. It must accept a JSON `POST` and allow CORS from your domain. The payload looks like this:

```json
{
  "name": "Jordan Smith",
  "phone": "(704) 555-0111",
  "email": "jordan@example.com",
  "address": "123 Main St, Charlotte, NC 28203",
  "service": "storm-damage",
  "serviceLabel": "Storm & Hail Damage",
  "message": "Shingles missing on the back slope after Tuesday's storm",
  "photos": ["back-slope.jpg"],
  "_subject": "New inspection request: Storm & Hail Damage — Jordan Smith",
  "page": "https://www.example.com/contact/"
}
```

The request is sent from `src/lib/submit-inspection.ts`. Change that one function to use a different transport.

### Photo uploads

The photo field is **UI only**, as the brief asked. Visitors can pick or drag in up to five images (10 MB each), see thumbnails and remove them, but the files are not sent. Only their names go in the `photos` array, so the office knows to ask for them.

To upload the files themselves, send `multipart/form-data` instead of JSON in `submit-inspection.ts` (append each `File` to a `FormData` and drop the `Content-Type` header). Formspree accepts file uploads on its paid plans; for a webhook, make sure it accepts multipart bodies.

## Deploying

The build output in `dist/` is plain static files, so any static host works. Set `VITE_SITE_URL` to the production URL (no trailing slash) so canonical links, Open Graph URLs, JSON-LD and the sitemap are correct, plus `VITE_FORM_ENDPOINT` if the form should deliver.

- **Netlify:** import the repo. `netlify.toml` sets the build command and publish directory, and `public/_headers` adds long-lived caching for hashed assets plus security headers.
- **Vercel:** import the repo. `vercel.json` sets the build, output directory, trailing slashes and the same headers.
- **Cloudflare Pages:** build command `npm run build`, output directory `dist`. `public/_headers` is honored automatically.
- **GitHub Pages / S3 / any web server:** run `npm run build` and upload `dist/`. Serve `404.html` for missing paths.

## Credits

- Photos: [Unsplash](https://unsplash.com) contributors, under the Unsplash License. See `images/CREDITS.md`.
- Icons: [Lucide](https://lucide.dev) (ISC license).
- Font: [Archivo](https://fonts.google.com/specimen/Archivo) via Fontsource (SIL Open Font License).
- Logo and Certified Installer badge: original artwork made for this demo, with no third-party brand marks.
