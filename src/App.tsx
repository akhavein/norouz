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
