import { useLanguage } from '../i18n/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="text-center text-xs text-warm-charcoal/30 dark:text-cream/30">
      {t('footer')}
    </footer>
  );
}
