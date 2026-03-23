import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { getFirebaseApp } from './config';

const provider = new GoogleAuthProvider();

function auth() {
  return getAuth(getFirebaseApp());
}

export async function signInWithGoogle(): Promise<void> {
  try {
    await signInWithPopup(auth(), provider);
    // onAuthStateChanged handles the user — no need to return it.
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    // Popup blocked (common on mobile / strict browsers) — fall back to redirect.
    if (code === 'auth/popup-blocked') {
      await signInWithRedirect(auth(), provider);
      // Page navigates away; onAuthStateChanged fires on return.
    } else {
      throw err;
    }
  }
}

/** Call once on app load to complete any pending redirect sign-in. */
export async function checkRedirectResult(): Promise<User | null> {
  const result = await getRedirectResult(auth());
  return result?.user ?? null;
}

export async function signOut(): Promise<void> {
  await fbSignOut(auth());
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth(), callback);
}

export type { User };
