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
      // Call unconditionally on every page load — required to process the OAuth
      // credential after signInWithRedirect. Fire-and-forget so the auth listener
      // is set up immediately. The SW cross-origin fix ensures Firebase's auth
      // iframe is no longer intercepted, so this completes cleanly without the
      // previous loop issue.
      checkRedirectResult().catch(() => {});
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
