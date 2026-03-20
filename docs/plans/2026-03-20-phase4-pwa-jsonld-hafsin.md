# Phase 4: Dynamic JSON-LD, PWA, Haft-Sin Cards

**Date:** 2026-03-20

## 1. Dynamic JSON-LD

Replace the hardcoded JSON-LD in `index.html` with a runtime-generated `<script>` tag in React.

- Import equinox timestamps from `equinox-times.ts`
- Compute next equinox date and Shamsi year automatically
- Inject/update a `<script type="application/ld+json">` element on mount
- Remove static JSON-LD block and TODO comment from `index.html`
- Structured data shape stays identical — only `startDate`, `name`, and `description` update

## 2. PWA / Offline Support

### manifest.json (public/)
- App name: "Norouz Countdown" / "شمارش معکوس نوروز"
- Theme colors: cream (#fefdf8) light, dark (#1a1612) dark
- Icons: generated from favicon.svg at 192px and 512px
- `display: standalone`, `start_url: /`

### sw.js (public/)
- Cache-first strategy
- On install: pre-cache app shell, all built assets, and `tahvil.mp3`
- On fetch: serve from cache first, fall back to network
- Versioned cache name for update busting

### Registration
- Register service worker in `main.tsx` after React mounts
- Add `<link rel="manifest">` to `index.html`

## 3. Haft-Sin Illustrated Cards

New `<HaftSin />` component, visible only during the **celebrating** phase.

### Layout
- Responsive grid: 2-3 cols mobile, 4 cols tablet, 7 cols desktop
- Section heading: "هفت‌سین / Haft-Sin" with girih divider above

### Each Card
- Emoji icon (🍎, 🌱, 🧄, 🍷, 🪙, 🍬, 🌾)
- Persian name (سیب, سبزه, سیر, سرکه, سکه, سمنو, سبزی)
- English name
- One-line symbolic meaning

### Styling
- Cream/dark-surface card backgrounds, Persian gold accent
- Rounded corners, subtle hover lift
- Fully dark-mode aware

### Behavior
- Bilingual labels from en.json / fa.json, RTL-aware
- Staggered fade/slide-in animation on mount
- Respects `prefers-reduced-motion`

## Files to Create
- `public/manifest.json`
- `public/sw.js`
- `public/icons/icon-192.png`
- `public/icons/icon-512.png`
- `src/components/HaftSin.tsx`
- `src/components/JsonLd.tsx`

## Files to Modify
- `index.html` — remove static JSON-LD, add manifest link
- `src/main.tsx` — register service worker
- `src/App.tsx` — add JsonLd + HaftSin components
- `src/i18n/en.json` — add Haft-Sin translations
- `src/i18n/fa.json` — add Haft-Sin translations
