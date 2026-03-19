# Phase 1 MVP Design — Norouz Countdown

## Scope

Core countdown to the Spring Equinox, deployed to GitHub Pages at `norouz.akhave.in`. English only. Light theme only. No celebration mode, no bilingual support.

## Project Structure

```
norouz/
├── public/
│   ├── CNAME                    # norouz.akhave.in
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Countdown.tsx        # Timer display (days/hrs/min/sec)
│   │   ├── Header.tsx           # Logo/title
│   │   └── Footer.tsx           # "Made with ♡"
│   ├── data/
│   │   └── equinox-times.ts    # Lookup table 2025–2040 + astronomy-engine fallback
│   ├── hooks/
│   │   ├── useCountdown.ts     # Tick logic (recalculates every 250ms)
│   │   └── useEquinox.ts       # Determines next equinox target
│   ├── utils/
│   │   ├── dateHelpers.ts      # IRST formatting, local timezone display
│   │   └── persianYear.ts      # Gregorian year → Shamsi year
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css                # Tailwind base + custom properties
├── .github/workflows/deploy.yml
├── index.html
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## Equinox Data & Countdown Logic

- **Primary:** Precomputed UTC timestamps in `equinox-times.ts` for 2025–2040, cross-referenced from USNO, timeanddate.com, AstroPixels.
- **Fallback:** Dynamic `import('astronomy-engine')` for years outside the table (~40KB, lazy-loaded only when needed).
- **Resolution:** `useEquinox.ts` checks if this year's equinox is past; if so, targets next year.
- **Tick:** `useCountdown.ts` uses `setInterval` at 250ms, recalculating `target - Date.now()` each tick. Returns `{ days, hours, minutes, seconds, isComplete }`.
- **IRST display:** `Intl.DateTimeFormat` with `timeZone: 'Asia/Tehran'` (UTC+3:30, no DST).
- **Shamsi year:** `gregorianYear - 621`.

## Visual Design

Minimal and clean with subtle Persian touches.

- **Background:** warm white (`#fafaf9`)
- **Countdown digits:** near-black (`#1c1917`), large, bold — the hero element
- **Gold accent (`#d4a853`):** year badge only
- **Secondary text:** muted gray (`#78716c`) for target datetime, labels
- **One subtle geometric divider:** thin CSS line with small Persian-inspired motif at center
- **Footer:** quiet, small text
- **Everything else:** whitespace and typography

### Typography

- English: Inter (Google Fonts)
- Countdown digits: Inter with `font-variant-numeric: tabular-nums`
- Vazirmatn loaded from Google Fonts (ready for Phase 3, not actively used)

### Responsive Breakpoints

| Width | Behavior |
|---|---|
| >=1024px | Centered card, generous whitespace |
| 768–1023px | Slightly condensed padding |
| <768px | Full-width, stacked |
| <375px | Smaller digits, abbreviated labels (d/h/m/s) |

### Theme

Light only. Dark mode deferred to Phase 2.

## SEO

- `<title>`: "Norouz Countdown — Spring Equinox Timer"
- `<meta name="description">`: bilingual, keyword-rich
- Open Graph: `og:title`, `og:description`, `og:url`, `og:type`, `og:locale` (en + fa alternate)
- Twitter Card: `twitter:card`, `twitter:title`, `twitter:description`
- Canonical URL: `https://norouz.akhave.in`
- `<html lang="en">`
- JSON-LD `Event` schema for the next equinox
- Semantic HTML: `<main>`, `<header>`, `<footer>`, `<time datetime="...">`
- `robots.txt` and `sitemap.xml` in `public/`
- No OG image yet (Phase 2)

## Deployment

- **Build:** `npm run build` (Vite outputs to `dist/`)
- **GitHub Actions:** On push to `main`, build and deploy to GitHub Pages via `actions/deploy-pages`
- **Custom domain:** `CNAME` in `public/`, DNS CNAME `norouz` → `akhavein.github.io`
- **Base path:** `base: '/'` in `vite.config.ts`

## Deferred to Later Phases

- Celebration mode (confetti, greeting)
- State machine (celebrating, dormant states)
- Bilingual EN/FA with RTL
- Dark mode / theme toggle
- OG image
- Analytics
- Accessibility audit
