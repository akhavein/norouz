import { useRef, useEffect, useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Countdown } from './components/Countdown';
import { Footer } from './components/Footer';
import { LanguageToggle } from './components/LanguageToggle';
import { JsonLd } from './components/JsonLd';
import { HaftSin } from './components/HaftSin';
import { ZodiacAnimal } from './components/ZodiacAnimal';
import { useNorouzState } from './hooks/useNorouzState';
import { useCountdown } from './hooks/useCountdown';
import { useConfetti } from './hooks/useConfetti';
import { useLanguage } from './i18n/LanguageContext';
import { getShamsiYear } from './utils/persianYear';
import { formatIRST, formatLocal, formatUTC } from './utils/dateHelpers';
import { toPersianNumerals } from './utils/persian';

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

function useTheme() {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  );

  const toggle = useCallback(() => {
    const next = !isDark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    setIsDark(next);
  }, [isDark]);

  return { isDark, toggle };
}

function ThemeToggle({ isDark, onClick }: { isDark: boolean; onClick: () => void }) {
  const { t } = useLanguage();
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-full border border-persian-gold/30 hover:border-persian-gold/60 bg-cream/80 dark:bg-warm-charcoal/20 hover:bg-persian-gold/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-persian-gold"
      aria-label={isDark ? t('switch_to_light') : t('switch_to_dark')}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-persian-gold" aria-hidden="true">
          <circle cx="8" cy="8" r="3.5" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line
              key={angle}
              x1="8"
              y1="1.5"
              x2="8"
              y2="3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              transform={`rotate(${angle} 8 8)`}
            />
          ))}
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-persian-gold" aria-hidden="true">
          <path
            d="M13.5 9.5A5.5 5.5 0 016.5 2.5a6 6 0 107 7z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
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
        <circle cx="0" cy="0" r="3.5" fill="#b08530" opacity="0.8" />
      </g>
    </svg>
  );
}

/* Boteh Jeghe (بته‌جقه) — Persian paisley motif */
function BotehJeghe({ className }: { className?: string }) {
  return (
    <svg width="40" height="60" viewBox="0 0 40 60" className={className} aria-hidden="true">
      {/* Outer teardrop */}
      <path
        d="M20 4 Q32 16 32 32 Q32 48 20 56 Q8 48 8 32 Q8 16 20 4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.6"
      />
      {/* Inner teardrop */}
      <path
        d="M20 10 Q28 20 28 32 Q28 44 20 50 Q12 44 12 32 Q12 20 20 10Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.4"
      />
      {/* Curved tip */}
      <path
        d="M20 4 Q24 2 26 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.6"
      />
      {/* Central spine */}
      <path
        d="M20 14 Q20 32 20 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.6"
        opacity="0.3"
      />
      {/* Inner floral details — small leaves */}
      <path d="M20 20 Q24 24 20 28" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <path d="M20 20 Q16 24 20 28" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.35" />
      <path d="M20 30 Q23 34 20 38" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      <path d="M20 30 Q17 34 20 38" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.3" />
      {/* Dot at center */}
      <circle cx="20" cy="24" r="1.5" fill="currentColor" opacity="0.3" />
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

  // Auto-play when transitioning from counting to celebrating
  // Browser may block if user hasn't interacted — play() handles that gracefully
  useEffect(() => {
    if (
      phase === 'celebrating' &&
      prevPhaseRef.current === 'counting' &&
      !triggeredRef.current
    ) {
      triggeredRef.current = true;
      play();
    }
    prevPhaseRef.current = phase;
  }, [phase, play]);

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
      className="group flex items-center gap-2 px-4 py-2 rounded-full border border-persian-gold/30 hover:border-persian-gold/60 bg-cream/80 dark:bg-dark-surface/80 hover:bg-persian-gold/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-persian-gold"
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

function CelebrationView({ shamsiYear, norouzDay }: { shamsiYear: number; norouzDay: number | null }) {
  const { t, locale } = useLanguage();

  return (
    <div className="text-center space-y-4">
      <p className={`text-4xl sm:text-5xl md:text-6xl font-extrabold text-warm-charcoal dark:text-cream ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        {t('norouz_mobarak')}
      </p>
      {norouzDay && (
        <p className={`text-lg sm:text-xl font-semibold ${norouzDay === 13 ? 'text-sage' : 'text-persian-teal'} ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {norouzDay === 13
            ? (locale === 'fa' ? 'سیزده‌بدر — روز طبیعت!' : 'Sizdah Bedar — Nature Day!')
            : locale === 'fa'
              ? `روز ${toPersianNumerals(norouzDay)} نوروز`
              : `Day ${norouzDay} of Norouz`
          }
        </p>
      )}
      <div className="pt-2">
        <p className={`text-2xl sm:text-3xl font-bold text-persian-gold tracking-wide ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {locale === 'fa' ? toPersianNumerals(shamsiYear) : shamsiYear}
        </p>
      </div>
    </div>
  );
}

function DormantView({ target, shamsiYear }: { target: Date; shamsiYear: number }) {
  const { t, locale } = useLanguage();

  return (
    <div className="text-center space-y-6 max-w-md mx-auto">
      <p className={`text-2xl sm:text-3xl font-bold text-warm-charcoal dark:text-cream ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        {t('see_you')}
      </p>
      <div className="p-4 rounded-xl border border-sage/20 bg-sage/5">
        <p className={`text-sm text-warm-charcoal/70 dark:text-cream/65 leading-relaxed ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {t('dormant_sizdah_bedar')}
        </p>
      </div>
      <div className="space-y-2">
        <p className={`text-sm font-medium text-persian-gold ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {t('dormant_next_norouz')} {locale === 'fa' ? toPersianNumerals(shamsiYear) : shamsiYear}
        </p>
        <p className="text-xs text-warm-charcoal/50 dark:text-cream/45">
          <time dateTime={target.toISOString()}>{formatIRST(target)}</time>
        </p>
        <p className={`text-xs text-warm-charcoal/50 dark:text-cream/45 ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {t('dormant_next_countdown')}
        </p>
      </div>
    </div>
  );
}

function App() {
  const { phase, target, year, loading, norouzDay } = useNorouzState();
  const countdown = useCountdown(phase === 'counting' ? target : null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const audio = useNorouzAudio(target, phase);
  const { t, locale } = useLanguage();
  const theme = useTheme();

  useConfetti(phase, prefersReducedMotion);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Inter',sans-serif]">
        <p className="text-warm-charcoal/55 dark:text-cream/50 text-sm">{t('loading')}</p>
      </div>
    );
  }

  const shamsiYear = year ? getShamsiYear(year) : null;

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8 relative overflow-hidden ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : "font-['Inter',sans-serif]"}`}>
      <JsonLd />
      {/* Toggles — pinned top-right to avoid title overlap */}
      <div className="fixed top-4 right-4 flex items-center gap-2 z-20" dir="ltr">
        <LanguageToggle />
        <ThemeToggle isDark={theme.isDark} onClick={theme.toggle} />
      </div>

      {/* Spring blossoms */}
      <SpringBlossom className="absolute top-20 right-8 sm:top-12 sm:right-16 text-blush w-10 h-10 sm:w-14 sm:h-14 opacity-60" />
      <SpringBlossom className="absolute bottom-16 left-6 sm:bottom-20 sm:left-14 text-blush w-8 h-8 sm:w-10 sm:h-10 opacity-40 rotate-45" />
      <SpringBlossom className="absolute top-2/3 left-4 sm:left-10 text-sage w-6 h-6 sm:w-8 sm:h-8 opacity-30 -rotate-12" />

      {/* Boteh Jeghe (Persian paisley) decorations */}
      <BotehJeghe className="absolute top-16 left-6 sm:top-20 sm:left-16 text-persian-gold w-8 h-12 sm:w-10 sm:h-[60px] opacity-20 rotate-12" />
      <BotehJeghe className="absolute bottom-24 right-4 sm:bottom-32 sm:right-12 text-persian-gold w-10 h-[60px] sm:w-12 sm:h-[72px] opacity-15 -rotate-[20deg]" />
      <BotehJeghe className="absolute top-1/2 right-2 sm:right-8 text-persian-teal w-6 h-9 sm:w-8 sm:h-12 opacity-15 rotate-[30deg]" />
      <BotehJeghe className="absolute top-1/4 left-1/2 -translate-x-[200px] sm:-translate-x-[300px] text-blush w-7 h-[42px] sm:w-9 sm:h-[54px] opacity-10 -rotate-[15deg]" />

      <main className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 max-w-2xl w-full relative z-10">
        <Header />

        <div key={phase} className="phase-enter flex flex-col items-center gap-6 sm:gap-8 md:gap-10 w-full">
          {phase === 'counting' && shamsiYear && (
            <div className="text-center">
              <p className={`text-2xl sm:text-3xl font-bold text-persian-gold tracking-wide ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
                {locale === 'fa' ? toPersianNumerals(shamsiYear) : shamsiYear}
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
            <CelebrationView shamsiYear={shamsiYear} norouzDay={norouzDay} />
          )}

          {phase === 'dormant' && target && shamsiYear && (
            <DormantView target={target} shamsiYear={shamsiYear} />
          )}

          {(phase === 'celebrating' || phase === 'counting') && <HaftSin />}

          {audio.isInAudioWindow && (
            <PlayButton isPlaying={audio.isPlaying} onClick={audio.toggle} />
          )}

          {phase === 'counting' && target && (
            <div className="text-center space-y-1">
              <p className="text-sm text-persian-teal font-medium">
                <time dateTime={target.toISOString()}>{formatIRST(target)}</time>
              </p>
              <p className="text-xs text-warm-charcoal/55 dark:text-cream/50">
                <time dateTime={target.toISOString()}>{formatLocal(target)}</time>
                {' · '}
                <time dateTime={target.toISOString()}>{formatUTC(target)}</time>
              </p>
            </div>
          )}
        </div>

        <GirihDivider />

        <p className="text-sm text-warm-charcoal/60 dark:text-cream/55 text-center max-w-sm leading-relaxed">
          {t('blurb')}
        </p>
      </main>

      {phase === 'celebrating' && shamsiYear && !prefersReducedMotion && (
        <ZodiacAnimal shamsiYear={shamsiYear} />
      )}

      <div className="mt-auto pt-12 relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
