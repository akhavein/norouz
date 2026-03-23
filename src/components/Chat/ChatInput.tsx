import { useState, useCallback } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import type { User } from 'firebase/auth';

interface ChatInputProps {
  user: User;
  sending: boolean;
  hasPosted: boolean;
  onSend: (user: User, text: string) => void;
  onSignOut: () => void;
}

export function ChatInput({ user, sending, hasPosted, onSend, onSignOut }: ChatInputProps) {
  const [text, setText] = useState('');
  const { t, locale } = useLanguage();
  const fontClass = locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : '';

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || sending) return;
    onSend(user, text);
    setText('');
  }, [text, sending, onSend, user]);

  return (
    <div className="border-t border-persian-gold/15 p-3">
      {/* User info + sign out */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 min-w-0">
          {user.photoURL && (
            <img src={user.photoURL} alt="" className="w-4 h-4 rounded-full" referrerPolicy="no-referrer" />
          )}
          <span className="text-[11px] text-warm-charcoal/50 dark:text-cream/45 truncate">
            {user.displayName}
          </span>
        </div>
        <button
          onClick={onSignOut}
          className={`text-[11px] text-warm-charcoal/40 dark:text-cream/35 hover:text-warm-charcoal/60 dark:hover:text-cream/55 transition-colors ${fontClass}`}
        >
          {t('chat_sign_out')}
        </button>
      </div>

      {/* Input or already-sent notice */}
      {hasPosted ? (
        <p className={`text-xs text-center text-persian-gold/70 dark:text-persian-gold/60 px-3 py-2 ${fontClass}`}>
          {t('chat_already_sent')}
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value.slice(0, 280))}
            placeholder={t('chat_placeholder')}
            dir="auto"
            className={`flex-1 min-w-0 px-3 py-1.5 text-sm rounded-full border border-persian-gold/20 focus:border-persian-gold/40 bg-transparent text-warm-charcoal dark:text-cream placeholder:text-warm-charcoal/30 dark:placeholder:text-cream/25 focus:outline-none transition-colors ${fontClass}`}
          />
          <button
            type="submit"
            disabled={!text.trim() || sending}
            aria-label={t('chat_send')}
            className="p-2 rounded-full border border-persian-gold/30 hover:border-persian-gold/60 bg-cream/80 dark:bg-dark-surface/80 hover:bg-persian-gold/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-persian-gold disabled:opacity-30 disabled:hover:border-persian-gold/30 disabled:hover:bg-transparent"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" className="text-persian-gold" aria-hidden="true">
              <path d="M1 1.5L15 8L1 14.5V9.5L10 8L1 6.5V1.5Z" fill="currentColor" />
            </svg>
          </button>
        </form>
      )}
    </div>
  );
}
