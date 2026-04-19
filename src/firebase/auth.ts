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
  // Use popup as primary. GitHub Pages sets COOP: same-origin which blocks
  // Firebase's window.closed polling (causes console warnings) but does NOT
  // block postMessage credential delivery — popup auth completes successfully.
  // signInWithRedirect fails on GitHub Pages because Chrome's storage
  // partitioning prevents the auth iframe from syncing the session (empty
  // firebaseLocalStorageDb after redirect). Fall back to redirect only when
  // the popup is explicitly blocked by the browser.
  try {
    await signInWithPopup(auth(), provider);
  } catch (err: unknown) {
    const code = (err as { code?: string }).code;
    if (code === 'auth/popup-blocked') {
      sessionStorage.setItem('norouz_auth_redirect', '1');
      sessionStorage.setItem('norouz_chat_open', '1');
      await signInWithRedirect(auth(), provider);
    } else {
      throw err;
    }
  }
}

/** Process a pending redirect credential (fallback path only). */
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
