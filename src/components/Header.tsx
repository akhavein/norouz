import { useLanguage } from '../i18n/LanguageContext';

export function Header() {
  const { t, locale } = useLanguage();

  return (
    <header className="flex flex-col items-center gap-3 w-full">
      <div className="text-center space-y-1">
        <h1 className={`text-lg font-semibold tracking-wide text-warm-charcoal/60 dark:text-cream/60 uppercase ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {t('title')}
        </h1>
        <p className={`text-2xl font-bold text-persian-gold ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {t('subtitle')}
        </p>
      </div>
    </header>
  );
}
