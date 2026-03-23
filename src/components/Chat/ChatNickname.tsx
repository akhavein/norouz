import { useState, useCallback } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

interface ChatNicknameProps {
  onSave: (nickname: string) => Promise<void>;
}

export function ChatNickname({ onSave }: ChatNicknameProps) {
  const [value, setValue] = useState('');
  const [saving, setSaving] = useState(false);
  const [failed, setFailed] = useState(false);
  const { t, locale } = useLanguage();
  const fontClass = locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : '';

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const nick = value.trim().replace(/#/g, '').slice(0, 20);
    if (!nick) return;
    setSaving(true);
    setFailed(false);
    try {
      await onSave(nick);
    } catch {
      setFailed(true);
    } finally {
      setSaving(false);
    }
  }, [value, onSave]);

  return (
    <div className={`border-t border-persian-gold/15 p-4 ${fontClass}`}>
      <p className="text-xs text-warm-charcoal/60 dark:text-cream/50 mb-3">
        {t('chat_nickname_prompt')}
      </p>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/#/g, '').slice(0, 20))}
          placeholder={t('chat_nickname_placeholder')}
          autoFocus
          className={`flex-1 min-w-0 px-3 py-1.5 text-sm rounded-full border border-persian-gold/20 focus:border-persian-gold/40 bg-transparent text-warm-charcoal dark:text-cream placeholder:text-warm-charcoal/30 dark:placeholder:text-cream/25 focus:outline-none transition-colors ${fontClass}`}
        />
        <button
          type="submit"
          disabled={!value.trim() || saving}
          className="px-3 py-1.5 text-xs rounded-full border border-persian-gold/40 hover:border-persian-gold/70 bg-persian-gold/5 hover:bg-persian-gold/10 text-persian-gold font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-persian-gold disabled:opacity-30"
        >
          {t('chat_nickname_save')}
        </button>
      </form>
      {failed ? (
        <p className={`text-[10px] text-red-400/80 mt-2 ${fontClass}`}>
          {t('chat_error')} {t('chat_retry').toLowerCase()}
        </p>
      ) : (
        <p className="text-[10px] text-warm-charcoal/35 dark:text-cream/30 mt-2">
          {t('chat_nickname_hint')}
        </p>
      )}
    </div>
  );
}
