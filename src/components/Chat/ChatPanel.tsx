import { useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { useNickname } from '../../hooks/useNickname';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { ChatSignIn } from './ChatSignIn';
import { ChatNickname } from './ChatNickname';

interface ChatPanelProps {
  onClose: () => void;
}

export default function ChatPanel({ onClose }: ChatPanelProps) {
  const { t, locale } = useLanguage();
  const fontClass = locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : '';
  const { user, loading: authLoading, signIn, signOut } = useAuth();
  const { nickname, loading: nicknameLoading, displayName, saveNickname } = useNickname(user);
  const { messages, error, sending, send, hasPosted } = useChat(user?.uid ?? null, displayName);
  const listRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > prevCountRef.current && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
    prevCountRef.current = messages.length;
  }, [messages.length]);

  // Determine what to show in the bottom action area
  const showSignIn = !authLoading && !user;
  const showNickname = !authLoading && !!user && !nicknameLoading && !nickname;
  const showInput = !authLoading && !!user && !!nickname;

  // Messages are only shown to authenticated users who have set a nickname
  const showMessages = !!user && !!nickname;

  return (
    <div
      className="chat-enter fixed bottom-16 z-30 w-[calc(100%-2rem)] sm:w-96 max-h-[70vh] flex flex-col rounded-2xl border border-persian-gold/20 bg-cream/95 dark:bg-dark-bg/95 backdrop-blur-sm shadow-xl overflow-hidden left-4 sm:left-4"
      style={locale === 'fa' ? { left: 'auto', right: '1rem' } : undefined}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-persian-gold/15">
        <h2 className={`text-sm font-bold text-persian-gold ${fontClass}`}>
          {t('chat_title')}
        </h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-persian-gold/10 transition-colors"
          aria-label={t('chat_close')}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" className="text-warm-charcoal/50 dark:text-cream/45" aria-hidden="true">
            <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Messages — only for authenticated users with a nickname */}
      {showMessages && (
        <div ref={listRef} className="flex-1 overflow-y-auto min-h-0 py-2" style={{ maxHeight: 'calc(70vh - 8rem)' }}>
          {error && (
            <p className={`text-xs text-center text-warm-charcoal/50 dark:text-cream/40 px-4 py-6 ${fontClass}`}>
              {t('chat_error')}
            </p>
          )}
          {!error && messages.length === 0 && (
            <p className={`text-xs text-center text-warm-charcoal/40 dark:text-cream/35 px-4 py-6 ${fontClass}`}>
              {t('chat_empty')}
            </p>
          )}
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} isOwn={msg.uid === user?.uid} />
          ))}
        </div>
      )}

      {/* Bottom action area */}
      {showSignIn && <ChatSignIn onSignIn={signIn} loading={authLoading} />}
      {showNickname && <ChatNickname onSave={saveNickname} />}
      {showInput && (
        <ChatInput user={user!} sending={sending} hasPosted={hasPosted} onSend={send} onSignOut={signOut} />
      )}
    </div>
  );
}
