import { useLanguage } from '../i18n/LanguageContext';
import { toPersianNumerals } from '../utils/persian';
import { padTwo } from '../utils/dateHelpers';

interface CountdownProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function FlipCard({ value, locale }: { value: number; locale: 'en' | 'fa' }) {
  const formatted = locale === 'fa' ? toPersianNumerals(value, true) : padTwo(value);
  const fontClass = locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : '';
  const digitClass = `text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tabular-nums leading-none text-warm-charcoal dark:text-cream ${fontClass}`;

  return (
    <div className="flip-card rounded-lg px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4">
      <span className={`${digitClass} flip-enter`} key={value}>{formatted}</span>
    </div>
  );
}

function Separator() {
  return (
    <span className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-persian-gold/40 mt-3 sm:mt-4 md:mt-5" aria-hidden="true">
      :
    </span>
  );
}

function TimeUnit({ value, label, shortLabel, locale }: { value: number; label: string; shortLabel: string; locale: 'en' | 'fa' }) {
  return (
    <div className="flex flex-col items-center gap-1.5 sm:gap-2">
      <FlipCard value={value} locale={locale} />
      <span className={`text-[10px] sm:text-xs font-medium text-warm-charcoal/55 dark:text-cream/50 uppercase tracking-widest ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        <span className="hidden min-[375px]:inline">{label}</span>
        <span className="inline min-[375px]:hidden">{shortLabel}</span>
      </span>
    </div>
  );
}

export function Countdown({ days, hours, minutes, seconds }: CountdownProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="flex items-start justify-center gap-1 sm:gap-3 md:gap-4" role="timer" aria-label={t('countdown_label')} aria-live="off" dir="ltr">
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
