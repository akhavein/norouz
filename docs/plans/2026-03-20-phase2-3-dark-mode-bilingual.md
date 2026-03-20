# Phase 2–3: Dark Mode & Bilingual Support Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add system-preference dark mode and full bilingual EN/FA support with RTL layout, language toggle, Persian numeral countdown, and localStorage persistence.

**Architecture:** i18n via a lightweight React context (no library — only 2 languages, ~30 strings). Dark mode via Tailwind's `dark:` variant with `prefers-color-scheme` detection. Language context wraps the app and provides `t()` for translations plus `locale` for numeral formatting and RTL direction.

**Tech Stack:** React Context, Tailwind CSS dark mode, `Intl.NumberFormat('fa-IR')` for Persian numerals.

---

### Task 1: i18n Context & Translation Files

**Files:**
- Create: `src/i18n/en.json`
- Create: `src/i18n/fa.json`
- Create: `src/i18n/LanguageContext.tsx`

**Step 1: Create English translations**

Create `src/i18n/en.json`:
```json
{
  "title": "Norouz Countdown",
  "subtitle": "نوروز",
  "loading": "Loading…",
  "days": "Days",
  "hours": "Hours",
  "minutes": "Minutes",
  "seconds": "Seconds",
  "days_short": "d",
  "hours_short": "h",
  "minutes_short": "m",
  "seconds_short": "s",
  "norouz_mobarak": "Norouz Mobarak!",
  "norouz_mobarak_fa": "!نوروز مبارک",
  "see_you": "See you next Norouz!",
  "see_you_fa": "!سال دیگر می‌بینمتون",
  "blurb": "Norouz marks the first day of spring and the beginning of the Persian New Year, celebrated at the exact moment of the vernal equinox.",
  "footer": "Made with ♡ for Norouz",
  "play": "Tahvil Music",
  "pause": "Pause"
}
```

**Step 2: Create Farsi translations**

Create `src/i18n/fa.json`:
```json
{
  "title": "شمارش معکوس نوروز",
  "subtitle": "Norouz",
  "loading": "…در حال بارگذاری",
  "days": "روز",
  "hours": "ساعت",
  "minutes": "دقیقه",
  "seconds": "ثانیه",
  "days_short": "ر",
  "hours_short": "س",
  "minutes_short": "د",
  "seconds_short": "ث",
  "norouz_mobarak": "!نوروز مبارک",
  "norouz_mobarak_fa": "Norouz Mobarak!",
  "see_you": "!سال دیگر می‌بینمتون",
  "see_you_fa": "See you next Norouz!",
  "blurb": "نوروز نخستین روز بهار و آغاز سال نو ایرانی است که درست در لحظه تحویل سال، هم‌زمان با اعتدال بهاری، جشن گرفته می‌شود.",
  "footer": "ساخته شده با ♡ برای نوروز",
  "play": "موسیقی تحویل",
  "pause": "توقف"
}
```

**Step 3: Create LanguageContext**

Create `src/i18n/LanguageContext.tsx`:
```tsx
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import en from './en.json';
import fa from './fa.json';

type Locale = 'en' | 'fa';
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, fa };

interface LanguageContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  t: (key: keyof Translations) => string;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLocale(): Locale {
  const saved = localStorage.getItem('locale');
  if (saved === 'en' || saved === 'fa') return saved;
  const lang = navigator.language.toLowerCase();
  return lang.startsWith('fa') ? 'fa' : 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  const toggleLocale = useCallback(() => {
    setLocale(prev => (prev === 'en' ? 'fa' : 'en'));
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  }, [locale]);

  const t = useCallback(
    (key: keyof Translations) => translations[locale][key] ?? key,
    [locale]
  );

  const dir = locale === 'fa' ? 'rtl' as const : 'ltr' as const;

  return (
    <LanguageContext.Provider value={{ locale, dir, t, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
```

**Step 4: Verify types compile**

Run: `npx tsc --noEmit`

**Step 5: Commit**

```bash
git add src/i18n/
git commit -m "feat: add i18n context with EN/FA translations and locale detection"
```

---

### Task 2: Language Toggle Component

**Files:**
- Create: `src/components/LanguageToggle.tsx`

**Step 1: Create the toggle**

Create `src/components/LanguageToggle.tsx`:
```tsx
import { useLanguage } from '../i18n/LanguageContext';

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1.5 rounded-full border border-persian-gold/30 hover:border-persian-gold/60 bg-cream/80 dark:bg-warm-charcoal/20 hover:bg-persian-gold/10 transition-all duration-200 text-sm font-medium"
      aria-label={locale === 'en' ? 'Switch to Farsi' : 'Switch to English'}
    >
      <span className={locale === 'en' ? 'text-persian-gold' : 'text-warm-charcoal/40 dark:text-cream/40'}>
        EN
      </span>
      <span className="text-warm-charcoal/20 dark:text-cream/20 mx-1.5">|</span>
      <span className={`font-['Vazirmatn',sans-serif] ${locale === 'fa' ? 'text-persian-gold' : 'text-warm-charcoal/40 dark:text-cream/40'}`}>
        فا
      </span>
    </button>
  );
}
```

**Step 2: Verify types compile**

Run: `npx tsc --noEmit`

**Step 3: Commit**

```bash
git add src/components/LanguageToggle.tsx
git commit -m "feat: add language toggle component (EN | فا)"
```

---

### Task 3: Dark Mode Support

**Files:**
- Modify: `src/index.css`
- Modify: `index.html`

**Step 1: Update index.css with dark mode colors and detection**

Replace `src/index.css` with:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-cream: #fefdf8;
  --color-warm-charcoal: #2c2417;
  --color-persian-gold: #c8973e;
  --color-sage: #7dad8a;
  --color-blush: #e8b4b8;
  --color-persian-teal: #5b9ea6;
  --color-dark-bg: #1a1612;
  --color-dark-surface: #252017;
}

/* Subtle girih-inspired background pattern */
body {
  background-color: #fefdf8;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c8973e' stroke-width='0.5' opacity='0.06'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z'/%3E%3Cpath d='M30 10 L50 30 L30 50 L10 30 Z'/%3E%3C/g%3E%3C/svg%3E");
}

/* Dark mode background */
.dark body,
body:where(.dark *) {
  background-color: #1a1612;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c8973e' stroke-width='0.5' opacity='0.08'%3E%3Cpath d='M30 0 L60 30 L30 60 L0 30 Z'/%3E%3Cpath d='M30 10 L50 30 L30 50 L10 30 Z'/%3E%3C/g%3E%3C/svg%3E");
}
```

**Step 2: Add dark mode script to index.html**

Add right before `</head>` in `index.html`:
```html
    <!-- Dark mode detection -->
    <script>
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        document.documentElement.classList.toggle('dark', e.matches);
      });
    </script>
```

**Step 3: Verify build**

Run: `npm run build`

**Step 4: Commit**

```bash
git add src/index.css index.html
git commit -m "feat: add dark mode support via prefers-color-scheme"
```

---

### Task 4: Wire i18n + Dark Mode into All Components

**Files:**
- Modify: `src/main.tsx`
- Modify: `src/components/Header.tsx`
- Modify: `src/components/Countdown.tsx`
- Modify: `src/components/Footer.tsx`
- Modify: `src/App.tsx`

**Step 1: Wrap app in LanguageProvider**

Update `src/main.tsx`:
```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
```

**Step 2: Update Header — bilingual, dark mode, language toggle**

Replace `src/components/Header.tsx`:
```tsx
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';

export function Header() {
  const { t, locale } = useLanguage();

  return (
    <header className="flex flex-col items-center gap-3 w-full">
      <div className="w-full flex justify-end">
        <LanguageToggle />
      </div>
      <div className="text-center space-y-1">
        <h1 className={`text-lg font-semibold tracking-wide text-warm-charcoal/60 dark:text-cream/60 uppercase ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {t('title')}
        </h1>
        <p className={`text-2xl font-bold text-persian-gold ${locale === 'fa' ? '' : "font-['Vazirmatn',sans-serif]"}`} dir={locale === 'fa' ? 'ltr' : 'rtl'} lang={locale === 'fa' ? 'en' : 'fa'}>
          {t('subtitle')}
        </p>
      </div>
    </header>
  );
}
```

**Step 3: Update Countdown — i18n labels, Persian numerals, dark mode**

Replace `src/components/Countdown.tsx`:
```tsx
import { useLanguage } from '../i18n/LanguageContext';

function toPersianNumeral(n: number, padded: boolean = true): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const str = padded ? n.toString().padStart(2, '0') : n.toString();
  return str.split('').map(d => persianDigits[parseInt(d)] ?? d).join('');
}

function padTwo(n: number): string {
  return n.toString().padStart(2, '0');
}

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function TimeUnit({ value, label, shortLabel, locale }: { value: number; label: string; shortLabel: string; locale: 'en' | 'fa' }) {
  const display = locale === 'fa' ? toPersianNumeral(value) : padTwo(value);
  return (
    <div className="flex flex-col items-center">
      <span className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold text-warm-charcoal dark:text-cream tabular-nums leading-none ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        {display}
      </span>
      <span className={`mt-2 text-xs sm:text-sm font-medium text-warm-charcoal/40 dark:text-cream/40 uppercase tracking-widest ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        <span className="hidden min-[375px]:inline">{label}</span>
        <span className="inline min-[375px]:hidden">{shortLabel}</span>
      </span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-persian-gold/40 self-start mt-1 sm:mt-2 md:mt-3">
      :
    </span>
  );
}

export function Countdown({ days, hours, minutes, seconds }: CountdownProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="flex items-start justify-center gap-2 sm:gap-4 md:gap-6" role="timer" dir="ltr">
      <TimeUnit value={days} label={t('days')} shortLabel={t('days_short')} locale={locale} />
      <Separator />
      <TimeUnit value={hours} label={t('hours')} shortLabel={t('hours_short')} locale={locale} />
      <Separator />
      <TimeUnit value={minutes} label={t('minutes')} shortLabel={t('minutes_short')} locale={locale} />
      <Separator />
      <TimeUnit value={seconds} label={t('seconds')} shortLabel={t('seconds_short')} locale={locale} />
    </div>
  );
}
```

**Step 4: Update Footer — i18n, dark mode**

Replace `src/components/Footer.tsx`:
```tsx
import { useLanguage } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="text-center text-xs text-warm-charcoal/30 dark:text-cream/30">
      {t('footer')}
    </footer>
  );
}
```

**Step 5: Update App.tsx — full i18n + dark mode integration**

This is the biggest change. The full replacement for `src/App.tsx`:

```tsx
import { useRef, useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Countdown } from './components/Countdown';
import { Footer } from './components/Footer';
import { useNorouzState } from './hooks/useNorouzState';
import { useCountdown } from './hooks/useCountdown';
import { useConfetti } from './hooks/useConfetti';
import { useLanguage } from './i18n/LanguageContext';
import { getShamsiYear } from './utils/persianYear';
import { formatIRST, formatLocal, formatUTC } from './utils/dateHelpers';

function toPersianNumerals(n: number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().split('').map(d => persianDigits[parseInt(d)] || d).join('');
}

function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return prefersReduced;
}

function SpringBlossom({ className }: { className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className={className} aria-hidden="true">
      <g transform="translate(20,20)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-10"
            rx="4"
            ry="9"
            transform={`rotate(${angle})`}
            fill="currentColor"
            opacity="0.7"
          />
        ))}
        <circle cx="0" cy="0" r="3.5" fill="#c8973e" opacity="0.8" />
      </g>
    </svg>
  );
}

function GirihDivider() {
  return (
    <div className="flex items-center justify-center gap-2 w-full max-w-sm mx-auto">
      <div className="flex-1 h-px bg-persian-gold/20" />
      <svg width="80" height="20" viewBox="0 0 80 20" className="text-persian-gold/50" aria-hidden="true">
        <polygon points="40,2 44,8 52,8 46,12 48,20 40,16 32,20 34,12 28,8 36,8" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <polygon points="16,10 22,6 28,10 22,14" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        <polygon points="52,10 58,6 64,10 58,14" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        <line x1="0" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="64" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
      <div className="flex-1 h-px bg-persian-gold/20" />
    </div>
  );
}

const AUDIO_WINDOW_HOURS = 24;

function useNorouzAudio(target: Date | null, phase: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const triggeredRef = useRef(false);
  const prevPhaseRef = useRef(phase);

  const isInAudioWindow = target
    ? Date.now() >= target.getTime() &&
      Date.now() < target.getTime() + AUDIO_WINDOW_HOURS * 60 * 60 * 1000
    : false;

  const play = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/tahvil.mp3');
      audioRef.current.addEventListener('ended', () => setIsPlaying(false));
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  }, []);

  const toggle = useCallback(() => {
    setHasInteracted(true);
    if (!audioRef.current) {
      play();
      return;
    }
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      play();
    }
  }, [isPlaying, play]);

  useEffect(() => {
    if (
      phase === 'celebrating' &&
      prevPhaseRef.current === 'counting' &&
      !triggeredRef.current &&
      hasInteracted
    ) {
      triggeredRef.current = true;
      play();
    }
    prevPhaseRef.current = phase;
  }, [phase, hasInteracted, play]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return { isPlaying, isInAudioWindow, toggle };
}

function PlayButton({ isPlaying, onClick }: { isPlaying: boolean; onClick: () => void }) {
  const { t } = useLanguage();

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-2 px-4 py-2 rounded-full border border-persian-gold/30 hover:border-persian-gold/60 bg-cream/80 dark:bg-dark-surface/80 hover:bg-persian-gold/10 transition-all duration-200"
      aria-label={isPlaying ? t('pause') : t('play')}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" className="text-persian-gold" aria-hidden="true">
        {isPlaying ? (
          <>
            <rect x="3" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
            <rect x="9.5" y="2" width="3.5" height="12" rx="1" fill="currentColor" />
          </>
        ) : (
          <path d="M4 2.5v11l9-5.5-9-5.5z" fill="currentColor" />
        )}
      </svg>
      <span className="text-xs font-medium text-persian-gold/80 group-hover:text-persian-gold transition-colors">
        {isPlaying ? t('pause') : t('play')}
      </span>
    </button>
  );
}

function CelebrationView({ shamsiYear }: { shamsiYear: number }) {
  const { t, locale } = useLanguage();

  return (
    <div className="text-center space-y-4">
      <p className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm-charcoal dark:text-cream ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        {t('norouz_mobarak')}
      </p>
      <p className={`text-3xl sm:text-4xl md:text-5xl font-bold text-persian-gold ${locale === 'fa' ? '' : "font-['Vazirmatn',sans-serif]"}`} dir={locale === 'fa' ? 'ltr' : 'rtl'} lang={locale === 'fa' ? 'en' : 'fa'}>
        {t('norouz_mobarak_fa')}
      </p>
      <div className="pt-4">
        <p className="text-2xl sm:text-3xl font-bold text-persian-gold tracking-wide">
          {locale === 'fa' ? toPersianNumerals(shamsiYear) : shamsiYear}
        </p>
        <p className={`text-lg sm:text-xl font-bold text-persian-gold/70 ${locale === 'fa' ? '' : "font-['Vazirmatn',sans-serif]"}`}>
          {locale === 'fa' ? shamsiYear : toPersianNumerals(shamsiYear)}
        </p>
      </div>
    </div>
  );
}

function DormantView({ target, shamsiYear }: { target: Date; shamsiYear: number }) {
  const { t, locale } = useLanguage();

  return (
    <div className="text-center space-y-4">
      <p className={`text-2xl sm:text-3xl font-bold text-warm-charcoal dark:text-cream ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        {t('see_you')}
      </p>
      <p className={`text-xl sm:text-2xl font-bold text-persian-gold ${locale === 'fa' ? '' : "font-['Vazirmatn',sans-serif]"}`} dir={locale === 'fa' ? 'ltr' : 'rtl'} lang={locale === 'fa' ? 'en' : 'fa'}>
        {t('see_you_fa')}
      </p>
      <div className="pt-4 text-sm text-warm-charcoal/50 dark:text-cream/50">
        <p>
          {locale === 'fa'
            ? `نوروز ${toPersianNumerals(shamsiYear)}`
            : `Norouz ${shamsiYear} · ${toPersianNumerals(shamsiYear)}`
          }
        </p>
        <p className="text-xs text-warm-charcoal/30 dark:text-cream/30 mt-1">
          <time dateTime={target.toISOString()}>{formatIRST(target)}</time>
        </p>
      </div>
    </div>
  );
}

function App() {
  const { phase, target, year, loading } = useNorouzState();
  const countdown = useCountdown(phase === 'counting' ? target : null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const audio = useNorouzAudio(target, phase);
  const { t, locale } = useLanguage();

  useConfetti(phase, prefersReducedMotion);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Inter',sans-serif]">
        <p className="text-warm-charcoal/40 dark:text-cream/40 text-sm">{t('loading')}</p>
      </div>
    );
  }

  const shamsiYear = year ? getShamsiYear(year) : null;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : "font-['Inter',sans-serif]"}`}>
      <SpringBlossom className="absolute top-8 right-8 sm:top-12 sm:right-16 text-blush w-10 h-10 sm:w-14 sm:h-14 opacity-60" />
      <SpringBlossom className="absolute bottom-16 left-6 sm:bottom-20 sm:left-14 text-blush w-8 h-8 sm:w-10 sm:h-10 opacity-40 rotate-45" />
      <SpringBlossom className="absolute top-1/3 left-4 sm:left-10 text-sage w-6 h-6 sm:w-8 sm:h-8 opacity-30 -rotate-12" />

      <main className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 max-w-2xl w-full relative z-10">
        <Header />

        {phase === 'counting' && shamsiYear && (
          <div className="text-center space-y-0.5">
            <p className="text-2xl sm:text-3xl font-bold text-persian-gold tracking-wide">
              {locale === 'fa' ? toPersianNumerals(shamsiYear) : shamsiYear}
            </p>
            <p className={`text-lg sm:text-xl font-bold text-persian-gold/70 ${locale === 'fa' ? '' : "font-['Vazirmatn',sans-serif]"}`}>
              {locale === 'fa' ? shamsiYear : toPersianNumerals(shamsiYear)}
            </p>
          </div>
        )}

        {phase === 'counting' && (
          <Countdown
            days={countdown.days}
            hours={countdown.hours}
            minutes={countdown.minutes}
            seconds={countdown.seconds}
          />
        )}

        {phase === 'celebrating' && shamsiYear && (
          <CelebrationView shamsiYear={shamsiYear} />
        )}

        {phase === 'dormant' && target && shamsiYear && (
          <DormantView target={target} shamsiYear={shamsiYear} />
        )}

        {audio.isInAudioWindow && (
          <PlayButton isPlaying={audio.isPlaying} onClick={audio.toggle} />
        )}

        {phase === 'counting' && target && (
          <div className="text-center space-y-1">
            <p className="text-sm text-persian-teal font-medium">
              <time dateTime={target.toISOString()}>{formatIRST(target)}</time>
            </p>
            <p className="text-xs text-warm-charcoal/40 dark:text-cream/40">
              <time dateTime={target.toISOString()}>{formatLocal(target)}</time>
              {' · '}
              <time dateTime={target.toISOString()}>{formatUTC(target)}</time>
            </p>
          </div>
        )}

        <GirihDivider />

        <p className="text-sm text-warm-charcoal/50 dark:text-cream/50 text-center max-w-sm leading-relaxed">
          {t('blurb')}
        </p>
      </main>

      <div className="mt-auto pt-12 relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
```

**Step 6: Verify types compile and build**

Run:
```bash
npx tsc --noEmit
npm run build
```

**Step 7: Commit**

```bash
git add src/ index.html
git commit -m "feat: full bilingual EN/FA support with RTL, Persian numerals, dark mode, and language toggle"
```

---

### Task 5: Visual QA & Polish

**Step 1: Test all 4 combinations**

Using the dev server (`npm run dev`), verify:
1. English + Light mode — countdown, celebration, dormant views
2. English + Dark mode — toggle system preference
3. Farsi + Light mode — RTL layout, Persian numerals, Vazirmatn font
4. Farsi + Dark mode — all text readable, gold accents visible

**Step 2: Fix any RTL layout issues**

Common issues:
- Countdown should always be LTR (numbers read left-to-right even in Farsi) — handled via `dir="ltr"` on the timer container
- Language toggle should stay in top-right regardless of direction
- Blossoms should not shift with RTL

**Step 3: Test responsive (375px, 768px, 1280px)**

Verify all breakpoints still work in both languages.

**Step 4: Commit any fixes**

```bash
git add -A
git commit -m "fix: RTL and dark mode polish"
```

**Step 5: Push**

```bash
git push
```
