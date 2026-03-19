import { useEffect, useState } from 'react';
import { EQUINOX_UTC, getEquinoxFallback } from '../data/equinox-times.ts';

interface EquinoxState {
  target: Date | null;
  year: number | null;
  loading: boolean;
}

export function useEquinox(): EquinoxState {
  const [state, setState] = useState<EquinoxState>({
    target: null,
    year: null,
    loading: true,
  });

  useEffect(() => {
    async function resolve() {
      const now = Date.now();
      let year = new Date().getFullYear();

      // Check if this year's equinox is in the future
      let timestamp = EQUINOX_UTC[year];
      if (timestamp !== undefined && timestamp > now) {
        setState({ target: new Date(timestamp), year, loading: false });
        return;
      }

      // This year's equinox has passed — try next year
      year += 1;
      timestamp = EQUINOX_UTC[year];
      if (timestamp !== undefined) {
        setState({ target: new Date(timestamp), year, loading: false });
        return;
      }

      // Fallback to astronomy-engine
      try {
        const date = await getEquinoxFallback(year);
        setState({ target: date, year, loading: false });
      } catch {
        // Last resort: approximate March 20 at noon UTC
        setState({
          target: new Date(Date.UTC(year, 2, 20, 12, 0, 0)),
          year,
          loading: false,
        });
      }
    }

    resolve();
  }, []);

  return state;
}
