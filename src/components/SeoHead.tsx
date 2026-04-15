import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

interface SeoHeadProps {
  year: number | null;
}

function upsertMeta(kind: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${kind}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(kind, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

export function SeoHead({ year }: SeoHeadProps) {
  const { locale } = useLanguage();

  useEffect(() => {
    const title = locale === 'fa'
      ? year
        ? `شمارش معکوس نوروز ${year} | Nowruz, Norouz, Persian New Year`
        : 'شمارش معکوس نوروز | Nowruz, Norouz, Persian New Year'
      : year
        ? `Nowruz ${year} Countdown | Norouz, نوروز, Persian New Year`
        : 'Nowruz Countdown | Norouz, نوروز, Persian New Year';

    const description = locale === 'fa'
      ? 'شمارش معکوس زنده تا لحظهٔ دقیق نوروز، با زمان تحویل سال در ساعت محلی شما، تهران و UTC، به همراه هفت‌سین و رسم‌های نوروزی.'
      : 'Live countdown to the exact moment of Nowruz (Norouz, نوروز), the Persian New Year and spring equinox, with precise Tahvil time in local time, Tehran time, and UTC.';

    const ogLocale = locale === 'fa' ? 'fa_IR' : 'en_US';
    const keywords = locale === 'fa'
      ? 'نوروز, Nowruz, Norouz, سال نو ایرانی, تحویل سال, هفت‌سین, سیزده‌بدر, اعتدال بهاری'
      : 'Nowruz, Norouz, نوروز, Persian New Year, Iranian New Year, Tahvil, spring equinox, Haft-Sin, Sizdah Bedar';

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:locale', ogLocale);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
  }, [locale, year]);

  return null;
}
