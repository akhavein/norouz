export type SiteLocale = 'en' | 'fa';
export type SitePageKind = 'home' | 'year' | 'yearsHub';

export interface SiteRouteInfo {
  locale: SiteLocale | null;
  year: number | null;
  pageKind: SitePageKind;
}

function cleanSegments(pathname: string): string[] {
  return pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
}

export function getSiteRouteInfo(pathname: string = window.location.pathname): SiteRouteInfo {
  const segments = cleanSegments(pathname);
  const locale = segments[0] === 'en' || segments[0] === 'fa' ? segments[0] : null;
  const pageSegment = locale ? segments[1] : segments[0];

  if (pageSegment === 'years') {
    return { locale, year: null, pageKind: 'yearsHub' };
  }

  const year = pageSegment && /^\d{4}$/.test(pageSegment) ? Number(pageSegment) : null;
  return { locale, year, pageKind: year ? 'year' : 'home' };
}

export function buildSitePath(
  locale: SiteLocale | null,
  year: number | null,
  pageKind: SitePageKind = year ? 'year' : 'home'
): string {
  if (pageKind === 'yearsHub') {
    const parts = [locale, 'years'].filter(Boolean);
    return `/${parts.join('/')}/`;
  }

  const parts = [locale, pageKind === 'year' && year ? String(year) : null].filter(Boolean);
  return parts.length ? `/${parts.join('/')}/` : '/';
}

export function buildYearsHubPath(locale: SiteLocale | null): string {
  return buildSitePath(locale, null, 'yearsHub');
}

export function resolveContentRouteLocale(routeLocale: SiteLocale | null, uiLocale: SiteLocale): SiteLocale | null {
  return routeLocale ?? (uiLocale === 'en' ? 'en' : null);
}

export function resolveSeoLocale(routeLocale: SiteLocale | null): SiteLocale {
  return routeLocale ?? 'fa';
}

export function buildAbsoluteSiteUrl(
  locale: SiteLocale | null,
  year: number | null,
  pageKind: SitePageKind = year ? 'year' : 'home'
): string {
  return `https://norouz.akhave.in${buildSitePath(locale, year, pageKind)}`;
}

export function buildAbsoluteYearsHubUrl(locale: SiteLocale | null): string {
  return buildAbsoluteSiteUrl(locale, null, 'yearsHub');
}
