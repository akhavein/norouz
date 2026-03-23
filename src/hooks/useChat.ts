import { useState, useEffect, useCallback, useRef } from 'react';
import type { ChatMessage } from '../firebase/firestore';
import type { User } from 'firebase/auth';

const RATE_LIMIT_MS = 5_000;

export function useChat(uid: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [hasPosted, setHasPosted] = useState(false);
  const lastSentRef = useRef(0);
  const hasPostedRef = useRef(false);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;
    import('../firebase/firestore').then(({ subscribeToMessages }) => {
      unsubscribe = subscribeToMessages(setMessages, (err) => setError(err.message));
    }).catch((err) => {
      setError(err instanceof Error ? err.message : 'Failed to connect');
    });
    return () => unsubscribe?.();
  }, []);

  // Check if the signed-in user has already posted this Norouz year
  useEffect(() => {
    if (!uid) {
      hasPostedRef.current = false;
      setHasPosted(false);
      return;
    }
    import('../firebase/firestore').then(({ getUserHasPostedThisYear, getCurrentNorouzYear }) => {
      getUserHasPostedThisYear(uid, getCurrentNorouzYear()).then((posted) => {
        hasPostedRef.current = posted;
        setHasPosted(posted);
      });
    }).catch(() => {
      // Silently ignore — don't block posting if the check fails
    });
  }, [uid]);

  const send = useCallback(async (user: User, text: string) => {
    const trimmed = text.trim();
    if (!trimmed || trimmed.length > 280) return;
    if (hasPostedRef.current) return;

    // Client-side rate limit
    const now = Date.now();
    if (now - lastSentRef.current < RATE_LIMIT_MS) return;

    setSending(true);
    try {
      const { sendMessage } = await import('../firebase/firestore');
      await sendMessage(user, trimmed);
      lastSentRef.current = Date.now();
      hasPostedRef.current = true;
      setHasPosted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send');
    } finally {
      setSending(false);
    }
  }, []);

  return { messages, error, sending, send, hasPosted };
}

export type { ChatMessage };
