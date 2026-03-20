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
