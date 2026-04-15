import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { buildAbsoluteSiteUrl, buildAbsoluteYearsHubUrl, getSiteRouteInfo } from '../utils/siteRoutes';

interface SeoHeadProps {
  year: number | null;
}

function getOgImagePath(locale: 'en' | 'fa', year: number | null) {
  if (locale === 'fa') return year ? `/og/fa-${year}.png` : '/og/fa-home.png';
  return year ? `/og/en-${year}.png` : '/og/en-home.png';
}

function getOgImageAlt(locale: 'en' | 'fa', year: number | null) {
  if (locale === 'fa') {
    return year
      ? `پوستر نوروز ${year} با زمان دقیق تحویل سال به وقت تهران و UTC`
      : 'پوستر شمارش معکوس نوروز با حال‌وهوای بهاری و زمان تحویل سال';
  }

  return year
    ? `Nowruz ${year} social preview card with exact Tahvil time in Tehran and UTC`
    : 'Nowruz Countdown social preview card with spring motifs and exact Tahvil timing';
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
    const effectiveYear = route.pageKind === 'year' ? (route.year ?? year) : null;

    let title: string;
    let description: string;

    if (route.pageKind === 'yearsHub') {
      title = locale === 'fa'
        ? 'همهٔ سال‌های نوروز | زمان دقیق تحویل سال'
        : 'All Nowruz years | exact date and time';
      description = locale === 'fa'
        ? 'فهرست همهٔ صفحه‌های نوروز با زمان دقیق تحویل سال به وقت تهران و UTC، برای مرور و مقایسهٔ سال‌های مختلف.'
        : 'Browse all available Nowruz year pages with exact Tahvil time in Tehran and UTC, and compare different years.';
    } else {
      title = locale === 'fa'
        ? effectiveYear
          ? `نوروز ${effectiveYear} | زمان دقیق تحویل سال و شمارش معکوس Nowruz`
          : 'Nowruz Countdown | Norouz, نوروز, Persian New Year & Spring Equinox'
        : effectiveYear
          ? `Nowruz ${effectiveYear} Date & Time | Exact Tahvil in Tehran and UTC`
          : 'Nowruz Countdown | Norouz, نوروز, Persian New Year & Spring Equinox';

      description = locale === 'fa'
        ? effectiveYear
          ? `زمان دقیق تحویل سال نوروز ${effectiveYear} با تاریخ و ساعت دقیق به وقت تهران و UTC، به همراه توضیحات هفت‌سین و رسم‌های نوروزی.`
          : 'شمارش معکوس زنده تا لحظهٔ دقیق نوروز، با زمان تحویل سال در ساعت محلی شما، تهران و UTC، به همراه هفت‌سین و رسم‌های نوروزی.'
        : effectiveYear
          ? `Find the exact date and time of Nowruz ${effectiveYear}, with Tahvil time in Tehran and UTC, plus Haft-Sin and Persian New Year traditions.`
          : 'Live countdown to the exact moment of Nowruz (Norouz, نوروز), the Persian New Year and spring equinox, with precise Tahvil time in local time, Tehran time, and UTC.';
    }

    const ogLocale = locale === 'fa' ? 'fa_IR' : 'en_US';
    const keywords = locale === 'fa'
      ? 'نوروز, Nowruz, Norouz, سال نو ایرانی, تحویل سال, هفت‌سین, سیزده‌بدر, اعتدال بهاری'
      : 'Nowruz, Norouz, نوروز, Persian New Year, Iranian New Year, Tahvil, spring equinox, Haft-Sin, Sizdah Bedar';
    const canonical = route.pageKind === 'yearsHub'
      ? buildAbsoluteYearsHubUrl(route.locale)
      : buildAbsoluteSiteUrl(route.locale, effectiveYear, route.pageKind);
    const defaultUrl = route.pageKind === 'yearsHub'
      ? buildAbsoluteYearsHubUrl(null)
      : buildAbsoluteSiteUrl(null, effectiveYear, route.pageKind);
    const enUrl = route.pageKind === 'yearsHub'
      ? buildAbsoluteYearsHubUrl('en')
      : buildAbsoluteSiteUrl('en', effectiveYear, route.pageKind);
    const faUrl = route.pageKind === 'yearsHub'
      ? buildAbsoluteYearsHubUrl('fa')
      : buildAbsoluteSiteUrl('fa', effectiveYear, route.pageKind);
    const ogImage = `https://norouz.akhave.in${getOgImagePath(locale, effectiveYear)}`;
    const ogImageAlt = getOgImageAlt(locale, effectiveYear);

    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('name', 'robots', 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:locale', ogLocale);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('property', 'og:image:alt', ogImageAlt);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', ogImage);
    upsertMeta('name', 'twitter:image:alt', ogImageAlt);
    upsertLink('canonical', canonical);
    upsertLink('alternate', defaultUrl, 'x-default');
    upsertLink('alternate', enUrl, 'en');
    upsertLink('alternate', faUrl, 'fa');
  }, [locale, year]);

  return null;
}
