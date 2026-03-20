import { useEffect } from 'react';
import { EQUINOX_UTC } from '../data/equinox-times';
import { getShamsiYear } from '../utils/persianYear';

function getNextEquinox(): { date: Date; year: number } | null {
  const now = Date.now();
  const currentYear = new Date().getFullYear();

  // Check this year and next
  for (const y of [currentYear, currentYear + 1]) {
    const ts = EQUINOX_UTC[y];
    if (ts !== undefined && ts > now) {
      return { date: new Date(ts), year: y };
    }
  }
  return null;
}

export function JsonLd() {
  useEffect(() => {
    const equinox = getNextEquinox();
    if (!equinox) return;

    const shamsiYear = getShamsiYear(equinox.year);
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `Norouz ${shamsiYear} — Persian New Year`,
      alternateName: `نوروز ${shamsiYear}`,
      startDate: equinox.date.toISOString(),
      description: `The exact astronomical moment of the Vernal Equinox, marking the beginning of the Persian New Year (Norouz) ${shamsiYear}.`,
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      location: {
        '@type': 'VirtualLocation',
        url: 'https://norouz.akhave.in',
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
