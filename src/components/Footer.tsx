import { useLanguage } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="text-center text-xs text-warm-charcoal/50 dark:text-cream/45">
      {t('footer')}
    </footer>
  );
}
