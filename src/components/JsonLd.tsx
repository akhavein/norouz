import { useEffect, useState } from 'react';
import { EQUINOX_UTC, getCelebrationEndMs } from '../data/equinox-times';
import { nowMs, subscribeToNowSync } from '../utils/now';
import { getShamsiYear } from '../utils/persianYear';
import { toPersianNumerals } from '../utils/persian';

const CELEBRATION_DAYS = 13;

function getRelevantEquinox(): { date: Date; year: number } | null {
  const now = nowMs();
  const currentYear = new Date(now).getFullYear();

  // During celebration period (through Sizdah Bedar), show the current year's equinox
  const thisTs = EQUINOX_UTC[currentYear];
  if (thisTs !== undefined) {
    const celebrationEnd = getCelebrationEndMs(thisTs, CELEBRATION_DAYS);
    if (now < celebrationEnd) {
      return { date: new Date(thisTs), year: currentYear };
    }
  }

  // After celebration, show next year's equinox
  const nextTs = EQUINOX_UTC[currentYear + 1];
  if (nextTs !== undefined) {
    return { date: new Date(nextTs), year: currentYear + 1 };
  }

  return null;
}

export function JsonLd() {
  const [syncVersion, setSyncVersion] = useState(0);

  useEffect(() => subscribeToNowSync(() => {
    setSyncVersion((version) => version + 1);
  }), []);

  useEffect(() => {
    const equinox = getRelevantEquinox();
    if (!equinox) return;

    const shamsiYear = getShamsiYear(equinox.year);
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `Norouz ${shamsiYear} — Persian New Year`,
      alternateName: `نوروز ${toPersianNumerals(shamsiYear)}`,
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
  }, [syncVersion]);

  return null;
}
