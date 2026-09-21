# KARX Photography — Premium Redesign

Premium rebuild of the KARX Photography portfolio: Next.js 16 (App Router),
React 19, Tailwind CSS 4 and Framer Motion 12.

## Run locally

```bash
npm install
cp .env.example .env.local   # then fill in CONTACT_WEBHOOK_URL
npm run dev                  # http://localhost:3001
```

The original site still lives in the parent directory and runs on port 3000, so
both can run side by side.

## Scripts

- `npm run dev` — development server on port 3001 (webpack)
- `npm run dev:turbo` — same, but with Turbopack
- `npm run build` — production build
- `npm run start` — serve the production build on port 3001
- `npm run lint` — ESLint

### Why `dev` uses webpack

Turbopack needs more than 3 GB to compile a single route in this project —
measured by running the dev server in a capped cgroup, where even a simple page
was killed at a 3 GB limit. The same route under webpack peaks at ~1.3 GB.

On a machine with limited RAM the Turbopack figure is enough to push the whole
user session past `systemd-oomd`'s 50% memory-pressure threshold, at which point
it kills the largest process in the session — usually the editor, not the dev
server. `npm run dev:turbo` is kept for machines with headroom; production
builds still use Turbopack and are unaffected.

## Environment

| Variable | Required | Purpose |
| --- | --- | --- |
| `CONTACT_WEBHOOK_URL` | yes, in production | Destination for contact-form enquiries. `/api/contact` validates the submission and forwards it here; if unset the route answers 503 rather than pretending the message was sent. |

## Structure

```
src/
  app/            routes: /, /about, /films, /weddings, /gallery, /reviews, /contact
    api/contact/  enquiry endpoint (validates, then forwards to the webhook)
  components/     page sections and shared UI primitives in components/ui
  lib/
    animations.ts Framer Motion variants, durations and easings
    hooks/        useScrollAnimation, useIntersectionObserver, useReducedMotion
    site-data.ts  all copy, contact details, portfolio/service/review/film data
```

Content lives in `src/lib/site-data.ts` — change it there rather than in the
components.

## Before deploying

1. **Set `SITE.url` in `src/lib/site-data.ts` to the real deployed URL.** It is
   currently `https://karxstudio.com`, a placeholder. Canonical tags,
   `sitemap.xml`, `robots.txt`, OpenGraph tags and the JSON-LD business listing
   all derive from this one constant, so a wrong value points Google at a host
   that does not serve the site.
2. **Set `CONTACT_WEBHOOK_URL`** in the host's environment variables, or the
   contact form answers 503. See `.env.example`.
3. **Root directory.** This project lives in a subfolder of the `karx_client`
   repository and has its own `package.json` and lockfile. If you deploy the
   parent repo, set the project's Root Directory to `premium-redesign` so the
   build runs here and not against the original site.
4. After the first deploy, submit `<your-domain>/sitemap.xml` in Google Search
   Console. The ownership meta tag is already in the page head.

## Theming

Every colour the UI uses is a token in the `@theme` block of
`src/app/globals.css`. Components reference them through Tailwind utilities
(`bg-panel`, `text-ink`, `border-field`, …) and contain no hex literals, so
changing the palette is an edit to that one block.

| Role | Token | Utility |
| --- | --- | --- |
| Page background | `--color-surface` | `bg-surface` |
| Cards, alternating sections | `--color-panel` | `bg-panel` |
| Inactive pills, subtle fills | `--color-raised` | `bg-raised` |
| Amber-tinted wells | `--color-accent-soft` | `bg-accent-soft` |
| Footer | `--color-footer` | `bg-footer` |
| Headings | `--color-ink` | `text-ink` |
| Body copy | `--color-body` | `text-body` |
| Small labels, meta | `--color-muted` | `text-muted` |
| Brand accent | `--color-accent` | `bg-accent` / `text-accent` |
| Accent hover | `--color-accent-hover` | `hover:bg-accent-hover` |
| Label on an accent fill | `--color-on-accent` | `text-on-accent` |
| Dividers, card edges | `--color-line` | `border-line` |
| Input borders | `--color-field` | `border-field` |

Two rules worth keeping if you re-colour it:

- Anything filled with `bg-accent` takes `text-on-accent`, not `text-white`.
  The accent is light, so a white label lands at 2.2:1.
- `--color-field` is used on input borders and must stay at 3:1 against both
  `--color-surface` and `--color-panel` (WCAG 1.4.11).

## Accessibility and performance notes

- Every text/background pair used meets WCAG AA (4.5:1, or 3:1 for large text).
- `prefers-reduced-motion` skips the intro sequence, review auto-advance,
  parallax and layout animations.
- Photography goes through `next/image`; the Instagram feed and film videos only
  load when scrolled near or played.
