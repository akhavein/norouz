import { useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';

export function useNickname(user: User | null) {
  const [nickname, setNicknameState] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState<string | null>(null);

  // Load nickname from Firestore when user changes
  useEffect(() => {
    let active = true;
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
      if (!active) return;
      setNicknameState(nick);
      setLoading(false);
    }).catch(() => {
      if (!active) return;
      setLoading(false);
    });
    return () => { active = false; };
  }, [user?.uid]); // eslint-disable-line react-hooks/exhaustive-deps

  // Recompute displayName whenever nickname or email changes
  useEffect(() => {
    let active = true;
    if (!nickname) {
      setDisplayName(null);
      return;
    }
    if (!user?.email) {
      // Google always provides email, but if absent show nickname without hash
      setDisplayName(nickname);
      return;
    }
    import('../firebase/firestore').then(({ hashEmail4 }) =>
      hashEmail4(user.email!)
    ).then((hash) => {
      if (active) setDisplayName(`${nickname}#${hash}`);
    }).catch(() => {
      if (active) setDisplayName(nickname);
    });
    return () => { active = false; };
  }, [nickname, user?.email]);

  const saveNickname = useCallback(async (nick: string) => {
    if (!user) return;
    const { setUserNickname } = await import('../firebase/firestore');
    await setUserNickname(user.uid, nick);
    setNicknameState(nick);
  }, [user?.uid]); // eslint-disable-line react-hooks/exhaustive-deps

  return { nickname, loading, displayName, saveNickname };
}
