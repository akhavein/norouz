import { Header } from './components/Header';
import { Countdown } from './components/Countdown';
import { Footer } from './components/Footer';
import { useEquinox } from './hooks/useEquinox';
import { useCountdown } from './hooks/useCountdown';
import { getShamsiYear } from './utils/persianYear';
import { formatIRST, formatLocal, formatUTC } from './utils/dateHelpers';

function GeometricDivider() {
  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto">
      <div className="flex-1 h-px bg-stone-200" />
      <svg width="16" height="16" viewBox="0 0 16 16" className="text-amber-600/60" aria-hidden="true">
        <rect x="4" y="0" width="8" height="8" transform="rotate(45 8 8)" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="flex-1 h-px bg-stone-200" />
    </div>
  );
}

function App() {
  const { target, year, loading } = useEquinox();
  const countdown = useCountdown(target);

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center font-['Inter',sans-serif]">
        <p className="text-stone-400 text-sm">Loading…</p>
      </div>
    );
  }

  const shamsiYear = year ? getShamsiYear(year) : null;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-4 py-8 font-['Inter',sans-serif]">
      <main className="flex flex-col items-center gap-8 sm:gap-10 md:gap-12 max-w-2xl w-full">
        <Header />

        {shamsiYear && (
          <p className="text-xl sm:text-2xl font-bold text-amber-600 tracking-wide">
            {shamsiYear}
          </p>
        )}

        {countdown.isComplete ? (
          <p className="text-3xl font-bold text-stone-900">Norouz Mobarak!</p>
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
            <p className="text-sm text-stone-500">
              <time dateTime={target.toISOString()}>{formatIRST(target)}</time>
            </p>
            <p className="text-xs text-stone-400">
              <time dateTime={target.toISOString()}>{formatLocal(target)}</time>
              {' · '}
              <time dateTime={target.toISOString()}>{formatUTC(target)}</time>
            </p>
          </div>
        )}

        <GeometricDivider />

        <p className="text-sm text-stone-400 text-center max-w-sm leading-relaxed">
          Norouz marks the first day of spring and the beginning of the Persian New Year,
          celebrated at the exact moment of the vernal equinox.
        </p>
      </main>

      <div className="mt-auto pt-12">
        <Footer />
      </div>
    </div>
  );
}

export default App;
