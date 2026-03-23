import {
  getAuth,
  GoogleAuthProvider,
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

export async function signInWithGoogle(): Promise<void> {
  // GitHub Pages enforces COOP: same-origin which breaks popup auth.
  // Use redirect — onAuthStateChanged fires automatically on return,
  // no need to call getRedirectResult() explicitly.
  await signInWithRedirect(auth(), provider);
}

export async function signOut(): Promise<void> {
  await fbSignOut(auth());
}

export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth(), callback);
}

export type { User };
