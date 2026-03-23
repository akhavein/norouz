import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  orderBy,
  limit,
  where,
  getDocs,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe,
} from 'firebase/firestore';
import { getFirebaseApp } from './config';
import { EQUINOX_UTC } from '../data/equinox-times';
import type { User } from './auth';

export interface ChatMessage {
  id: string;
  uid: string;
  displayName: string;
  photoURL: string;
  text: string;
  createdAt: Date | null; // null while pending (server timestamp not yet resolved)
}

const MESSAGE_LIMIT = 100;

/** SHA-256 of email → first 4 hex characters (2 bytes). */
export async function hashEmail4(email: string): Promise<string> {
  const data = new TextEncoder().encode(email.toLowerCase().trim());
  const buf = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf).slice(0, 2))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Load the stored nickname for a user (null if not set). */
export async function getUserNickname(uid: string): Promise<string | null> {
  const db = getFirestore(getFirebaseApp());
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const nickname = snap.data().nickname;
  return typeof nickname === 'string' ? nickname : null;
}

/** Persist a nickname for a user. */
export async function setUserNickname(uid: string, nickname: string): Promise<void> {
  const db = getFirestore(getFirebaseApp());
  await setDoc(doc(db, 'users', uid), { nickname }, { merge: true });
}

/** Returns the Gregorian year of the most recent Norouz equinox. */
export function getCurrentNorouzYear(): number {
  const now = Date.now();
  const years = Object.keys(EQUINOX_UTC).map(Number).sort((a, b) => b - a);
  for (const year of years) {
    if (EQUINOX_UTC[year] <= now) return year;
  }
  return years[years.length - 1];
}

/** Returns true if the user has already posted a message in the given Norouz year. */
export async function getUserHasPostedThisYear(uid: string, year: number): Promise<boolean> {
  const db = getFirestore(getFirebaseApp());
  const q = query(
    collection(db, 'messages'),
    where('uid', '==', uid),
    where('year', '==', year),
    limit(1),
  );
  const snap = await getDocs(q);
  return !snap.empty;
}

export function subscribeToMessages(
  year: number,
  onMessages: (msgs: ChatMessage[]) => void,
  onError: (err: Error) => void,
): Unsubscribe {
  const db = getFirestore(getFirebaseApp());
  // Order descending so the most-recent 100 documents are fetched first.
  // This allows client-side year filtering without a composite index while
  // ensuring current-year messages are always within the window.
  const q = query(
    collection(db, 'messages'),
    orderBy('createdAt', 'desc'),
    limit(MESSAGE_LIMIT),
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const messages: ChatMessage[] = snapshot.docs
        .filter((doc) => doc.data().year === year)
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            uid: data.uid,
            displayName: data.displayName,
            photoURL: data.photoURL ?? '',
            text: data.text,
            createdAt: data.createdAt?.toDate() ?? null,
          };
        })
        .reverse(); // restore chronological (oldest-first) order for display
      onMessages(messages);
    },
    onError,
  );
}

export async function sendMessage(user: User, text: string, displayName: string): Promise<void> {
  const db = getFirestore(getFirebaseApp());
  await addDoc(collection(db, 'messages'), {
    uid: user.uid,
    displayName,
    photoURL: user.photoURL ?? '',
    text: text.trim().slice(0, 280),
    year: getCurrentNorouzYear(),
    createdAt: serverTimestamp(),
  });
}
