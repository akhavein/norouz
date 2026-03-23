import {
  getFirestore,
  collection,
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
  onMessages: (msgs: ChatMessage[]) => void,
  onError: (err: Error) => void,
): Unsubscribe {
  const db = getFirestore(getFirebaseApp());
  const q = query(
    collection(db, 'messages'),
    orderBy('createdAt', 'asc'),
    limit(MESSAGE_LIMIT),
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const messages: ChatMessage[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          uid: data.uid,
          displayName: data.displayName,
          photoURL: data.photoURL ?? '',
          text: data.text,
          createdAt: data.createdAt?.toDate() ?? null,
        };
      });
      onMessages(messages);
    },
    onError,
  );
}

export async function sendMessage(user: User, text: string): Promise<void> {
  const db = getFirestore(getFirebaseApp());
  await addDoc(collection(db, 'messages'), {
    uid: user.uid,
    displayName: user.displayName ?? 'Anonymous',
    photoURL: user.photoURL ?? '',
    text: text.trim().slice(0, 280),
    year: getCurrentNorouzYear(),
    createdAt: serverTimestamp(),
  });
}
