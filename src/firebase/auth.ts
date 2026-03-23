import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut as fbSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { getFirebaseApp } from './config';

const provider = new GoogleAuthProvider();

function auth() {
  return getAuth(getFirebaseApp());
}

export async function signInWithGoogle(): Promise<User> {
  try {
    const result = await signInWithPopup(auth(), provider);
    return result.user;
  } catch (err: unknown) {
    // Popup blocked (common on mobile) — fall back to redirect
    if (err instanceof Error && 'code' in err && (err as { code: string }).code === 'auth/popup-blocked') {
      await signInWithRedirect(auth(), provider);
      // Won't reach here — page redirects
      throw err;
    }
    throw err;
  }
}

export async function signOut(): Promise<void> {
  await fbSignOut(auth());
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth(), callback);
}

export type { User };
