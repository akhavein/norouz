import { useState, useEffect, useCallback } from 'react';
import { EQUINOX_UTC, getEquinoxFallback, getCelebrationEndMs } from '../data/equinox-times';

export type NorouzPhase = 'counting' | 'celebrating' | 'dormant';

const CELEBRATION_DAYS = 13; // Through Sizdah Bedar
const DORMANT_DAYS = 7;     // Brief pause before next countdown
const MS_PER_DAY = 86_400_000;
const IRST_OFFSET_MS = 3.5 * 60 * 60 * 1000; // UTC+3:30
// Solar noon in Tehran ≈ 12:14 IRST, expressed as ms from midnight IRST
const SOLAR_NOON_IRST_MS = (12 * 60 + 14) * 60 * 1000;

// Get the Gregorian date of 1 Farvardin using the solar noon rule.
// If equinox is before solar noon in Tehran → that IRST date is 1 Farvardin.
// If after → the next IRST date is 1 Farvardin.
// Returns a local Date at midnight for day-counting.
function getFarvardinOneDate(equinoxMs: number): Date {
  const isAfterSolarNoon = ((equinoxMs + IRST_OFFSET_MS) % MS_PER_DAY) >= SOLAR_NOON_IRST_MS;
  // Get equinox date in IRST
  const eqIRST = new Date(equinoxMs + IRST_OFFSET_MS);
  let day = eqIRST.getUTCDate();
  const month = eqIRST.getUTCMonth();
  const year = eqIRST.getUTCFullYear();
  if (isAfterSolarNoon) day += 1;
  // Return as a local-timezone midnight Date for clean day comparison
  return new Date(year, month, day);
}

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

  // End of celebrations = midnight IRST on Farvardin 14 (day after Sizdah Bedar)
  const celebrationEnd = getCelebrationEndMs(thisMs, CELEBRATION_DAYS);
  if (now < celebrationEnd) {
    // Count days from 1 Farvardin (solar noon rule)
    const farvardinOne = getFarvardinOneDate(thisMs);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const rawDay = Math.round((today.getTime() - farvardinOne.getTime()) / MS_PER_DAY) + 1;
    const norouzDay = Math.max(1, Math.min(CELEBRATION_DAYS, rawDay));
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    resolve(); // async — setState is called after the awaited computeState(), not synchronously

    // Background poll for dormant/celebration end transitions
    const interval = setInterval(resolve, 60_000);
    return () => clearInterval(interval);
  }, [resolve]);

  // Precise transition: schedule re-resolve at exactly the equinox moment
  useEffect(() => {
    if (state.phase !== 'counting' || !state.target) return;

    const msUntilTarget = state.target.getTime() - Date.now();
    if (msUntilTarget <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      resolve(); // async — setState is called after the awaited computeState(), not synchronously
      return;
    }

    // setTimeout max safe delay is 2^31-1 ms (~24.8 days). Larger values
    // overflow and fire immediately, causing a busy render loop.
    // The 60-second poll handles re-evaluation until we're close enough.
    if (msUntilTarget > 2_147_483_647) return;

    // Schedule resolve for the exact equinox moment (+ 100ms buffer)
    const timeout = setTimeout(resolve, msUntilTarget + 100);
    return () => clearTimeout(timeout);
  }, [state.phase, state.target, resolve]);

  return state;
}
