# Norouz Countdown نوروز

**A real-time countdown to the exact moment of the Spring Equinox.**

Norouz Countdown is a client-side web app that counts down to the precise astronomical instant the vernal equinox occurs — the moment Norouz begins. It displays the target time across multiple timezones, celebrates with confetti and traditional music, and stays active through the thirteen days of festivities ending on Sizdah Bedar.

**Live at [norouz.akhave.in](https://norouz.akhave.in)**

## Features

- Accurate countdown to the exact equinox second (precomputed table 2025–2040, astronomy-engine fallback)
- Target time displayed in IRST, local timezone, and UTC
- Solar Hijri (Shamsi) year in Latin and Persian numerals
- State machine: counting, celebrating (13 days), dormant, next year
- Confetti burst at the moment of equinox
- Traditional saz/sorna music playback (user-initiated)
- Bilingual elements (English + Farsi)
- Persian-inspired aesthetic — spring blossoms, girih patterns, warm gold accents
- Responsive design (320px–2560px)
- Full SEO with JSON-LD structured data
- `prefers-reduced-motion` support
- Zero backend, fully static

## Tech Stack

React · TypeScript · Tailwind CSS v4 · Vite · GitHub Pages

## Development

```bash
npm install
npm run dev
```

## License

[MIT](LICENSE)
