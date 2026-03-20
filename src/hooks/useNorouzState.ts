import { useState, useEffect } from 'react';
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

export function useNorouzState(): NorouzState {
  const [state, setState] = useState<NorouzState>({
    phase: 'counting',
    target: null,
    year: null,
    loading: true,
  });

  useEffect(() => {
    async function resolve() {
      const now = Date.now();
      const currentYear = new Date().getFullYear();

      // Check this year's equinox first
      const thisEquinox = await resolveEquinox(currentYear);
      const thisMs = thisEquinox.getTime();

      if (now < thisMs) {
        // Equinox hasn't happened yet — counting down
        setState({ phase: 'counting', target: thisEquinox, year: currentYear, loading: false });
        return;
      }

      const celebrationEnd = thisMs + CELEBRATION_DAYS * MS_PER_DAY;
      if (now < celebrationEnd) {
        // Within 13-day celebration window
        setState({ phase: 'celebrating', target: thisEquinox, year: currentYear, loading: false });
        return;
      }

      const dormantEnd = celebrationEnd + DORMANT_DAYS * MS_PER_DAY;
      if (now < dormantEnd) {
        // Dormant period — "See you next Norouz!"
        const nextEquinox = await resolveEquinox(currentYear + 1);
        setState({ phase: 'dormant', target: nextEquinox, year: currentYear + 1, loading: false });
        return;
      }

      // Past dormant — count down to next year
      const nextEquinox = await resolveEquinox(currentYear + 1);
      setState({ phase: 'counting', target: nextEquinox, year: currentYear + 1, loading: false });
    }

    resolve();

    // Re-check phase every minute to catch transitions
    const interval = setInterval(resolve, 60_000);
    return () => clearInterval(interval);
  }, []);

  return state;
}
