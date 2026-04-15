export type SiteLocale = 'en' | 'fa';

export interface SiteRouteInfo {
  locale: SiteLocale | null;
  year: number | null;
}

function cleanSegments(pathname: string): string[] {
  return pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
}

export function getSiteRouteInfo(pathname: string = window.location.pathname): SiteRouteInfo {
  const segments = cleanSegments(pathname);
  const locale = segments[0] === 'en' || segments[0] === 'fa' ? segments[0] : null;
  const yearSegment = locale ? segments[1] : segments[0];
  const year = yearSegment && /^\d{4}$/.test(yearSegment) ? Number(yearSegment) : null;
  return { locale, year };
}

export function buildSitePath(locale: SiteLocale | null, year: number | null): string {
  const parts = [locale, year ? String(year) : null].filter(Boolean);
  return parts.length ? `/${parts.join('/')}/` : '/';
}

export function buildAbsoluteSiteUrl(locale: SiteLocale | null, year: number | null): string {
  return `https://norouz.akhave.in${buildSitePath(locale, year)}`;
}
