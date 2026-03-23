import { useLanguage } from '../../i18n/LanguageContext';

interface ChatToggleProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatToggle({ onClick, isOpen }: ChatToggleProps) {
  const { t, locale } = useLanguage();

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 z-30 p-3 rounded-full border border-persian-gold/30 hover:border-persian-gold/60 bg-cream/90 dark:bg-dark-surface/90 backdrop-blur-sm hover:bg-persian-gold/10 shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-persian-gold left-4 sm:left-4"
      style={locale === 'fa' ? { left: 'auto', right: '1rem' } : undefined}
      aria-label={isOpen ? t('chat_close') : t('chat_open')}
    >
      {isOpen ? (
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-persian-gold" aria-hidden="true">
          <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 20 20" className="text-persian-gold" aria-hidden="true">
          <path d="M3 4C3 2.9 3.9 2 5 2H15C16.1 2 17 2.9 17 4V12C17 13.1 16.1 14 15 14H7L3 18V4Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="7" cy="8" r="1" fill="currentColor" />
          <circle cx="10" cy="8" r="1" fill="currentColor" />
          <circle cx="13" cy="8" r="1" fill="currentColor" />
        </svg>
      )}
    </button>
  );
}
