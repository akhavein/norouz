import { useState, useEffect, useCallback } from 'react';
import { EQUINOX_UTC, getEquinoxFallback } from '../data/equinox-times';

export type NorouzPhase = 'counting' | 'celebrating' | 'dormant';

const CELEBRATION_DAYS = 13; // Through Sizdah Bedar
const DORMANT_DAYS = 7;     // Brief pause before next countdown
const MS_PER_DAY = 86_400_000;

interface NorouzState {
  phase: NorouzPhase;
  target: Date | null;
  year: number | null;
  loading: boolean;
  norouzDay: number | null;
}

async function resolveEquinox(year: number): Promise<Date> {
  const timestamp = EQUINOX_UTC[year];
  if (timestamp !== undefined) return new Date(timestamp);

  try {
    return await getEquinoxFallback(year);
  } catch {
    return new Date(Date.UTC(year, 2, 20, 12, 0, 0));
  }
}

async function computeState(): Promise<NorouzState> {
  const now = Date.now();
  const currentYear = new Date().getFullYear();

  const thisEquinox = await resolveEquinox(currentYear);
  const thisMs = thisEquinox.getTime();

  if (now < thisMs) {
    return { phase: 'counting', target: thisEquinox, year: currentYear, loading: false, norouzDay: null };
  }

  const celebrationEnd = thisMs + CELEBRATION_DAYS * MS_PER_DAY;
  if (now < celebrationEnd) {
    const norouzDay = Math.floor((now - thisMs) / MS_PER_DAY) + 1;
    return { phase: 'celebrating', target: thisEquinox, year: currentYear, loading: false, norouzDay };
  }

  const dormantEnd = celebrationEnd + DORMANT_DAYS * MS_PER_DAY;
  if (now < dormantEnd) {
    const nextEquinox = await resolveEquinox(currentYear + 1);
    return { phase: 'dormant', target: nextEquinox, year: currentYear + 1, loading: false, norouzDay: null };
  }

  const nextEquinox = await resolveEquinox(currentYear + 1);
  return { phase: 'counting', target: nextEquinox, year: currentYear + 1, loading: false, norouzDay: null };
}

export function useNorouzState(): NorouzState {
  const [state, setState] = useState<NorouzState>({
    phase: 'counting',
    target: null,
    year: null,
    loading: true,
    norouzDay: null,
  });

  const resolve = useCallback(async () => {
    setState(await computeState());
  }, []);

  useEffect(() => {
    resolve();

    // Background poll for dormant/celebration end transitions
    const interval = setInterval(resolve, 60_000);
    return () => clearInterval(interval);
  }, [resolve]);

  // Precise transition: schedule re-resolve at exactly the equinox moment
  useEffect(() => {
    if (state.phase !== 'counting' || !state.target) return;

    const msUntilTarget = state.target.getTime() - Date.now();
    if (msUntilTarget <= 0) {
      resolve();
      return;
    }

    // Schedule resolve for the exact equinox moment (+ 100ms buffer)
    const timeout = setTimeout(resolve, msUntilTarget + 100);
    return () => clearTimeout(timeout);
  }, [state.phase, state.target, resolve]);

  return state;
}
