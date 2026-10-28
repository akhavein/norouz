---
name: "norouz"
description: "Source capture of the existing implementation; no new visual direction."
colors: {"color-cream":"#fefdf8","color-warm-charcoal":"#2c2417","color-persian-gold":"#b08530","color-sage":"#7dad8a","color-blush":"#e8b4b8","color-persian-teal":"#3d7a82","color-dark-bg":"#1a1612","color-dark-surface":"#252017"}
---

# Design System: norouz

## Overview

This is a source capture of the incumbent implementation at `64f3d5e87660f667fe2f1861e12b9a089e95217e`, not a redesign or a claim that the interface has been rendered or tested. Source files remain the implementation authority. Creative metaphors, qualitative branding and unverified component previews are deliberately unresolved.

The full declaration inventory, selector/variant scope, file locations and source hashes are in `.impeccable/design-source.json`. Re-capture after relevant implementation changes; do not apply an isolated declaration outside its original selector, media query or platform.

## Colors

Representative observed declarations (complete source context remains in the inventory):

- `2026/index.html:69` — `.seo-fallback`: `color: #2b2118`.
- `2026/index.html:78` — `@media (prefers-color-scheme: dark) > .seo-fallback`: `color: #f4ecde`.
- `2026/index.html:78` — `@media (prefers-color-scheme: dark) > .seo-fallback`: `background: #1a1612`.
- `en/years/index.html:33` — `:root`: `--bg: #fefdf8`.
- `en/years/index.html:35` — `:root`: `--muted: #6e573e`.
- `en/years/index.html:36` — `:root`: `--link: #b08530`.
- `en/years/index.html:37` — `:root`: `--card-bg: rgba(255,250,240,.72)`.
- `en/years/index.html:38` — `:root`: `--card-border: rgba(176,133,48,.2)`.
- `en/years/index.html:39` — `:root`: `--control-bg: rgba(254,253,248,.86)`.
- `en/years/index.html:40` — `:root`: `--control-border: rgba(176,133,48,.24)`.
- `en/years/index.html:44` — `html.dark`: `--bg: #17120d`.
- `en/years/index.html:46` — `html.dark`: `--muted: #d3c0a0`.
- `en/years/index.html:47` — `html.dark`: `--link: #d9af5a`.
- `en/years/index.html:48` — `html.dark`: `--card-bg: rgba(34,26,20,.9)`.
- `en/years/index.html:49` — `html.dark`: `--card-border: rgba(217,175,90,.24)`.
- `en/years/index.html:50` — `html.dark`: `--control-bg: rgba(34,26,20,.88)`.

## Typography

Representative observed declarations (complete source context remains in the inventory):

- `2026/index.html:70` — `.seo-fallback`: `font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- `2026/index.html:71` — `.seo-fallback`: `line-height: 1.65`.
- `2026/index.html:75` — `.seo-fallback h1,
      .seo-fallback h2,
      .seo-fallback h3`: `line-height: 1.25`.
- `2026/index.html:76` — `.seo-fallback .fa`: `font-family: Vazirmatn, Inter, system-ui, sans-serif`.
- `en/years/index.html:53` — `body`: `font-family: Inter, system-ui, sans-serif`.
- `en/years/index.html:55` — `.fa`: `font-family: Vazirmatn, Inter, system-ui, sans-serif`.
- `en/years/index.html:62` — `.card-cta`: `font-weight: 700`.
- `en/years/index.html:74` — `.theme-toggle`: `font-size: 1rem`.

## Layout

Representative observed declarations (complete source context remains in the inventory):

- `2026/index.html:66` — `.seo-fallback`: `max-width: 56rem`.
- `2026/index.html:67` — `.seo-fallback`: `margin: 0 auto`.
- `2026/index.html:68` — `.seo-fallback`: `padding: 4rem 1.25rem 2rem`.
- `2026/index.html:77` — `@media`: `media-query: (prefers-color-scheme: dark)`.
- `en/years/index.html:53` — `body`: `margin: 0`.
- `en/years/index.html:54` — `.wrap`: `max-width: 68rem`.
- `en/years/index.html:54` — `.wrap`: `margin: 0 auto`.
- `en/years/index.html:54` — `.wrap`: `padding: 3rem 1.25rem 4rem`.
- `en/years/index.html:56` — `.grid`: `display: grid`.
- `en/years/index.html:56` — `.grid`: `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`.
- `en/years/index.html:56` — `.grid`: `gap: 1rem`.
- `en/years/index.html:57` — `.toplinks`: `display: flex`.
- `en/years/index.html:57` — `.toplinks`: `flex-wrap: wrap`.
- `en/years/index.html:57` — `.toplinks`: `gap: .75rem`.
- `en/years/index.html:57` — `.toplinks`: `margin: 0 0 1.5rem`.
- `en/years/index.html:60` — `.card`: `padding: 1rem 1.1rem`.

## Shapes

Representative observed declarations (complete source context remains in the inventory):

- `en/years/index.html:60` — `.card`: `border: 1px solid var(--card-border)`.
- `en/years/index.html:60` — `.card`: `border-radius: 1rem`.
- `en/years/index.html:65` — `.theme-toggle`: `border: 1px solid var(--control-border)`.
- `en/years/index.html:68` — `.theme-toggle`: `border-radius: 999px`.

## Components

Representative observed declarations (complete source context remains in the inventory):

- `en/years/index.html:53` — `body`: `transition: background-color .2s ease, color .2s ease`.
- `src/index.css:61` — `.flip-enter`: `animation: flip-slide-in 0.25s cubic-bezier(0.22, 1, 0.36, 1)`.
- `src/index.css:73` — `@media (prefers-reduced-motion: reduce) > .flip-enter`: `animation: none`.
- `src/index.css:104` — `.phase-enter`: `animation: phase-fade-in 0.5s ease-out`.
- `src/index.css:109` — `@media (prefers-reduced-motion: reduce) > .phase-enter`: `animation: none`.
- `src/index.css:122` — `.zodiac-leg-front`: `animation: zodiac-leg-stride-front var(--leg-dur, 0.6s) ease-in-out infinite alternate`.
- `src/index.css:127` — `.zodiac-leg-back`: `animation: zodiac-leg-stride-back var(--leg-dur, 0.6s) ease-in-out infinite alternate`.
- `src/index.css:143` — `.zodiac-roam svg`: `animation: zodiac-bob 0.3s ease-in-out infinite alternate`.
- `src/index.css:153` — `.zodiac-roam.zodiac-eating svg`: `animation: zodiac-eat-nod 0.5s ease-in-out infinite`.
- `src/index.css:167` — `@media (prefers-reduced-motion: reduce) > .zodiac-roam,
  .zodiac-leg-front,
  .zodiac-leg-back,
  .zodiac-roam svg,
  .zodiac-roam.zodiac-eating svg`: `animation: none`.
- `src/index.css:188` — `.modal-enter`: `animation: modal-slide-up 0.25s cubic-bezier(0.22, 1, 0.36, 1)`.
- `src/index.css:193` — `@media (prefers-reduced-motion: reduce) > .modal-enter`: `animation: none`.
- `src/index.css:211` — `.chat-enter`: `animation: chat-slide-up 0.3s ease-out`.
- `src/index.css:216` — `@media (prefers-reduced-motion: reduce) > .chat-enter`: `animation: none`.

Existing component implementations to reuse: `src/components/Chat/ChatInput.tsx`, `src/components/Chat/ChatMessage.tsx`, `src/components/Chat/ChatNickname.tsx`, `src/components/Chat/ChatPanel.tsx`, `src/components/Chat/ChatSignIn.tsx`, `src/components/Chat/ChatToggle.tsx`, `src/components/Countdown.tsx`, `src/components/Footer.tsx`, `src/components/HaftSin.tsx`, `src/components/Header.tsx`, `src/components/JsonLd.tsx`, `src/components/LanguageToggle.tsx`, `src/components/SeoContent.tsx`, `src/components/SeoHead.tsx`, `src/components/ZodiacAnimal.tsx`. Their complete states and runtime dependencies remain in source; no synthetic preview substitutes for those implementations.

## Do's and Don'ts

- Preserve existing tokens, selectors, light/dark variants, locale overrides and platform semantics.
- Reuse existing component implementations and inspect their complete interaction states.
- Verify accessibility, navigation, focus, text scaling and reduced motion in the appropriate browser or native runtime before claiming a UI pass.
- Do not treat this source inventory as a rendered audit or approval for a new brand.
- Do not synthesize missing colors, scales, component previews or product claims.
