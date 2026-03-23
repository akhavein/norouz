import { useState, useEffect, useCallback } from 'react';
import type { User } from 'firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | null = null;

    import('../firebase/auth').then(async ({ onAuthChange, checkRedirectResult }) => {
      if (!active) return;
      // Only call getRedirectResult when a redirect was actually initiated.
      // Await it before setting up onAuthStateChanged so the listener fires
      // with the signed-in user rather than the initial null state — prevents
      // the sign-in button from flashing after a successful redirect.
      if (sessionStorage.getItem('norouz_auth_redirect')) {
        sessionStorage.removeItem('norouz_auth_redirect');
        await checkRedirectResult().catch(() => {});
        if (!active) return;
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
