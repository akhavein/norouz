import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { buildAbsoluteSiteUrl, getSiteRouteInfo } from '../utils/siteRoutes';

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

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    if (hreflang) element.setAttribute('hreflang', hreflang);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

export function SeoHead({ year }: SeoHeadProps) {
  const { locale } = useLanguage();

  useEffect(() => {
    const route = getSiteRouteInfo();
    const effectiveYear = route.year ?? year;
    const title = locale === 'fa'
      ? effectiveYear
        ? `نوروز ${effectiveYear} | شمارش معکوس Nowruz و Norouz`
        : 'Nowruz Countdown | Norouz, نوروز, Persian New Year & Spring Equinox'
      : effectiveYear
        ? `Nowruz ${effectiveYear} Countdown | Norouz, نوروز, Persian New Year`
        : 'Nowruz Countdown | Norouz, نوروز, Persian New Year & Spring Equinox';

    const description = locale === 'fa'
      ? effectiveYear
        ? `زمان دقیق تحویل سال و اطلاعات نوروز ${effectiveYear}، با ساعت تهران، UTC و توضیحاتی دربارهٔ هفت‌سین و رسم‌های نوروزی.`
        : 'شمارش معکوس زنده تا لحظهٔ دقیق نوروز، با زمان تحویل سال در ساعت محلی شما، تهران و UTC، به همراه هفت‌سین و رسم‌های نوروزی.'
      : effectiveYear
        ? `Find the exact time of Nowruz ${effectiveYear}, with Tahvil time in Tehran time, UTC, and your local time, plus Haft-Sin and Persian New Year traditions.`
        : 'Live countdown to the exact moment of Nowruz (Norouz, نوروز), the Persian New Year and spring equinox, with precise Tahvil time in local time, Tehran time, and UTC.';

    const ogLocale = locale === 'fa' ? 'fa_IR' : 'en_US';
    const keywords = locale === 'fa'
      ? 'نوروز, Nowruz, Norouz, سال نو ایرانی, تحویل سال, هفت‌سین, سیزده‌بدر, اعتدال بهاری'
      : 'Nowruz, Norouz, نوروز, Persian New Year, Iranian New Year, Tahvil, spring equinox, Haft-Sin, Sizdah Bedar';
    const canonical = buildAbsoluteSiteUrl(route.locale, effectiveYear);
    const defaultUrl = buildAbsoluteSiteUrl(null, effectiveYear);
    const enUrl = buildAbsoluteSiteUrl('en', effectiveYear);
    const faUrl = buildAbsoluteSiteUrl('fa', effectiveYear);

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:locale', ogLocale);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertLink('canonical', canonical);
    upsertLink('alternate', defaultUrl, 'x-default');
    upsertLink('alternate', enUrl, 'en');
    upsertLink('alternate', faUrl, 'fa');
  }, [locale, year]);

  return null;
}
