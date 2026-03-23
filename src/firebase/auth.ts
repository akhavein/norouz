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
  // Redirect is required on GitHub Pages — COOP: same-origin blocks popup's
  // window.closed polling, making signInWithPopup unreliable.
  await signInWithRedirect(auth(), provider);
  // Page navigates away; onAuthStateChanged handles the user after return.
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
