import { useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';

export function useNickname(user: User | null) {
  const [nickname, setNicknameState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);

  // Load nickname from Firestore when user changes
  useEffect(() => {
    if (!user) {
      setNicknameState(null);
      setDisplayName(null);
      setLoading(false);
      return;
    }
    setLoading(true);
    import('../firebase/firestore').then(({ getUserNickname }) =>
      getUserNickname(user.uid)
    ).then((nick) => {
      setNicknameState(nick);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [user?.uid]); // eslint-disable-line react-hooks/exhaustive-deps

  // Recompute displayName whenever nickname or email changes
  useEffect(() => {
    if (!nickname || !user?.email) {
      setDisplayName(null);
      return;
    }
    import('../firebase/firestore').then(({ hashEmail4 }) =>
      hashEmail4(user.email!)
    ).then((hash) => {
      setDisplayName(`${nickname}#${hash}`);
    }).catch(() => {
      setDisplayName(nickname);
    });
  }, [nickname, user?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  const saveNickname = useCallback(async (nick: string) => {
    if (!user) return;
    const { setUserNickname } = await import('../firebase/firestore');
    await setUserNickname(user.uid, nick);
    setNicknameState(nick);
  }, [user?.uid]); // eslint-disable-line react-hooks/exhaustive-deps

  return { nickname, loading, displayName, saveNickname };
}
