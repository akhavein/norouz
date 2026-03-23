import { useLanguage } from '../../i18n/LanguageContext';
import type { ChatMessage as ChatMessageType } from '../../hooks/useChat';

interface ChatMessageProps {
  message: ChatMessageType;
  isOwn: boolean;
}

function timeAgo(date: Date | null, locale: string): string {
  if (!date) return locale === 'fa' ? '...' : '...';
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return locale === 'fa' ? 'الان' : 'now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return locale === 'fa' ? `${minutes}د` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return locale === 'fa' ? `${hours}س` : `${hours}h`;
  const days = Math.floor(hours / 24);
  return locale === 'fa' ? `${days}ر` : `${days}d`;
}

export function ChatMessage({ message, isOwn }: ChatMessageProps) {
  const { locale } = useLanguage();

  return (
    <div className={`flex gap-2 px-3 py-1.5 ${isOwn ? 'bg-persian-gold/5 dark:bg-persian-gold/10' : ''}`}>
      {message.photoURL ? (
        <img
          src={message.photoURL}
          alt=""
          className="w-6 h-6 rounded-full shrink-0 mt-0.5"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-6 h-6 rounded-full shrink-0 mt-0.5 bg-persian-gold/20 flex items-center justify-center">
          <span className="text-[10px] font-bold text-persian-gold">
            {message.displayName.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs font-semibold text-persian-gold truncate">
            {(() => {
              const idx = message.displayName.indexOf('#');
              if (idx < 0) return message.displayName;
              return (
                <>
                  {message.displayName.slice(0, idx)}
                  <span className="font-mono font-normal text-persian-gold/45 text-[10px]">
                    {message.displayName.slice(idx)}
                  </span>
                </>
              );
            })()}
          </span>
          <span className="text-[10px] text-warm-charcoal/40 dark:text-cream/35 shrink-0">
            {timeAgo(message.createdAt, locale)}
          </span>
        </div>
        <p className="text-sm text-warm-charcoal/80 dark:text-cream/75 break-words leading-snug" dir="auto">
          {message.text}
        </p>
      </div>
    </div>
  );
}
