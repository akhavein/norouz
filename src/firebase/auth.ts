import {
  getAuth,
  GoogleAuthProvider,
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
  // GitHub Pages enforces COOP: same-origin which breaks popup auth.
  // Mark that a redirect was initiated so useAuth calls getRedirectResult on return.
  sessionStorage.setItem('norouz_auth_redirect', '1');
  await signInWithRedirect(auth(), provider);
}

/** Process the pending redirect credential. Must be called after signInWithRedirect returns. */
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
