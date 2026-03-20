import { Header } from './components/Header';
import { Countdown } from './components/Countdown';
import { Footer } from './components/Footer';
import { useEquinox } from './hooks/useEquinox';
import { useCountdown } from './hooks/useCountdown';
import { getShamsiYear } from './utils/persianYear';
import { formatIRST, formatLocal, formatUTC } from './utils/dateHelpers';

function toPersianNumerals(n: number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return n.toString().split('').map(d => persianDigits[parseInt(d)] || d).join('');
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
        {/* Central 8-pointed star */}
        <polygon points="40,2 44,8 52,8 46,12 48,20 40,16 32,20 34,12 28,8 36,8" fill="none" stroke="currentColor" strokeWidth="0.8" />
        {/* Left diamond */}
        <polygon points="16,10 22,6 28,10 22,14" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        {/* Right diamond */}
        <polygon points="52,10 58,6 64,10 58,14" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.6" />
        {/* Connecting lines */}
        <line x1="0" y1="10" x2="16" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
        <line x1="64" y1="10" x2="80" y2="10" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      </svg>
      <div className="flex-1 h-px bg-persian-gold/20" />
    </div>
  );
}

function App() {
  const { target, year, loading } = useEquinox();
  const countdown = useCountdown(target);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-['Inter',sans-serif]">
        <p className="text-warm-charcoal/40 text-sm">Loading…</p>
      </div>
    );
  }

  const shamsiYear = year ? getShamsiYear(year) : null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 font-['Inter',sans-serif] relative overflow-hidden">
      {/* Decorative spring blossoms */}
      <SpringBlossom className="absolute top-8 right-8 sm:top-12 sm:right-16 text-blush w-10 h-10 sm:w-14 sm:h-14 opacity-60" />
      <SpringBlossom className="absolute bottom-16 left-6 sm:bottom-20 sm:left-14 text-blush w-8 h-8 sm:w-10 sm:h-10 opacity-40 rotate-45" />
      <SpringBlossom className="absolute top-1/3 left-4 sm:left-10 text-sage w-6 h-6 sm:w-8 sm:h-8 opacity-30 -rotate-12" />

      <main className="flex flex-col items-center gap-6 sm:gap-8 md:gap-10 max-w-2xl w-full relative z-10">
        <Header />

        {shamsiYear && (
          <div className="text-center space-y-0.5">
            <p className="text-2xl sm:text-3xl font-bold text-persian-gold tracking-wide">
              {shamsiYear}
            </p>
            <p className="text-lg sm:text-xl font-bold text-persian-gold/70 font-['Vazirmatn',sans-serif]" dir="rtl" lang="fa">
              {toPersianNumerals(shamsiYear)}
            </p>
          </div>
        )}

        {countdown.isComplete ? (
          <div className="text-center space-y-2">
            <p className="text-3xl sm:text-4xl font-bold text-warm-charcoal">Norouz Mobarak!</p>
            <p className="text-2xl sm:text-3xl font-bold text-persian-gold font-['Vazirmatn',sans-serif]" dir="rtl" lang="fa">
              !نوروز مبارک
            </p>
          </div>
        ) : (
          <Countdown
            days={countdown.days}
            hours={countdown.hours}
            minutes={countdown.minutes}
            seconds={countdown.seconds}
          />
        )}

        {target && (
          <div className="text-center space-y-1">
            <p className="text-sm text-persian-teal font-medium">
              <time dateTime={target.toISOString()}>{formatIRST(target)}</time>
            </p>
            <p className="text-xs text-warm-charcoal/40">
              <time dateTime={target.toISOString()}>{formatLocal(target)}</time>
              {' · '}
              <time dateTime={target.toISOString()}>{formatUTC(target)}</time>
            </p>
          </div>
        )}

        <GirihDivider />

        <p className="text-sm text-warm-charcoal/50 text-center max-w-sm leading-relaxed">
          Norouz marks the first day of spring and the beginning of the Persian New Year,
          celebrated at the exact moment of the vernal equinox.
        </p>
      </main>

      <div className="mt-auto pt-12 relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
