import { useLanguage } from '../i18n/LanguageContext';

export function LanguageToggle() {
  const { locale, toggleLocale } = useLanguage();

  return (
    <button
      onClick={toggleLocale}
      className="px-3 py-1.5 rounded-full border border-persian-gold/30 hover:border-persian-gold/60 bg-cream/80 dark:bg-warm-charcoal/20 hover:bg-persian-gold/10 transition-all duration-200 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-persian-gold"
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
