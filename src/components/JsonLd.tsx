import { useEffect } from 'react';
import { getCelebrationEndMs } from '../data/equinox-times';
import { useLanguage } from '../i18n/LanguageContext';
import { getShamsiYear } from '../utils/persianYear';
import { toPersianNumerals } from '../utils/persian';

interface JsonLdProps {
  phase: 'counting' | 'celebrating' | 'dormant';
  target: Date | null;
  year: number | null;
}

const CELEBRATION_DAYS = 13;

export function JsonLd({ phase, target, year }: JsonLdProps) {
  const { locale } = useLanguage();

  useEffect(() => {
    if (!target || !year) return;

    const shamsiYear = getShamsiYear(year);
    const celebrationEnd = new Date(getCelebrationEndMs(target.getTime(), CELEBRATION_DAYS)).toISOString();
    const eventStatus = phase === 'celebrating'
      ? 'https://schema.org/EventInProgress'
      : 'https://schema.org/EventScheduled';

    const questions = locale === 'fa'
      ? [
          {
            name: 'نوروز چیست؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'نوروز سال نوی ایرانی و آغاز بهار است که در لحظهٔ دقیق اعتدال بهاری آغاز می‌شود.',
            },
          },
          {
            name: `نوروز ${toPersianNumerals(year)} چه زمانی است؟`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `لحظهٔ تحویل سال ${toPersianNumerals(year)} در ${target.toISOString()} رخ می‌دهد. در این صفحه زمان دقیق نوروز را در ساعت محلی شما، تهران و UTC می‌بینید.`,
            },
          },
          {
            name: 'هفت‌سین چیست؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'هفت‌سین سفرهٔ نمادین نوروزی است که با هفت قلمی که با حرف سین آغاز می‌شوند، چیده می‌شود و نمادهای برکت، تندرستی، عشق و نوزایی را نشان می‌دهد.',
            },
          },
        ]
      : [
          {
            name: 'What is Nowruz?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nowruz is the Persian New Year and the start of spring, celebrated at the exact astronomical moment of the vernal equinox.',
            },
          },
          {
            name: `When is Nowruz ${year}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Nowruz ${year} begins at ${target.toISOString()}. This page shows the exact Tahvil time in your local time, Tehran time, and UTC.`,
            },
          },
          {
            name: 'What is Haft-Sin?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Haft-Sin is the traditional Nowruz table arranged with seven symbolic items beginning with the Persian letter sin, representing renewal, health, abundance, love, and patience.',
            },
          },
        ];

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'Nowruz Countdown',
          alternateName: ['Norouz Countdown', 'نوروز'],
          url: 'https://norouz.akhave.in',
          inLanguage: ['en', 'fa'],
          description: locale === 'fa'
            ? 'شمارش معکوس نوروز با زمان دقیق تحویل سال، زمان تهران، UTC و معرفی رسم‌های نوروزی.'
            : 'A live countdown to the exact moment of Nowruz, with precise Tahvil time, Tehran time, UTC, and core Nowruz traditions.',
        },
        {
          '@type': 'Event',
          name: `Nowruz ${year} — Persian New Year`,
          alternateName: [`Norouz ${year}`, `نوروز ${toPersianNumerals(shamsiYear)}`],
          startDate: target.toISOString(),
          endDate: celebrationEnd,
          eventStatus,
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          inLanguage: locale,
          image: 'https://norouz.akhave.in/og-image.png',
          description: locale === 'fa'
            ? `لحظهٔ دقیق اعتدال بهاری و آغاز سال نوی ایرانی (نوروز ${toPersianNumerals(shamsiYear)}).`
            : `The exact astronomical moment of the vernal equinox, marking the beginning of the Persian New Year, Nowruz ${year}.`,
          location: {
            '@type': 'VirtualLocation',
            url: 'https://norouz.akhave.in',
          },
        },
        {
          '@type': 'FAQPage',
          inLanguage: locale,
          mainEntity: questions,
        },
      ],
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [locale, phase, target, year]);

  return null;
}
