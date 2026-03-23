import { useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | null = null;

    import('../firebase/auth').then(({ onAuthChange, checkRedirectResult }) => {
      if (!active) return;
      // Only process a redirect result when the redirect fallback path was used
      // (popup was blocked). Normal popup sign-in resolves directly via onAuthStateChanged.
      if (sessionStorage.getItem('norouz_auth_redirect')) {
        sessionStorage.removeItem('norouz_auth_redirect');
        checkRedirectResult().catch(() => {});
      }
      unsubscribe = onAuthChange((u) => {
        if (!active) return;
        setUser(u);
        setLoading(false);
      });
    }).catch(() => {
      if (active) setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const signIn = useCallback(async () => {
    const { signInWithGoogle } = await import('../firebase/auth');
    return signInWithGoogle();
  }, []);

  const signOut = useCallback(async () => {
    const { signOut: fbSignOut } = await import('../firebase/auth');
    return fbSignOut();
  }, []);

  return { user, loading, signIn, signOut };
}
