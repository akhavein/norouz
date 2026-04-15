import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import en from './en.json';
import fa from './fa.json';
import { buildSitePath, getSiteRouteInfo } from '../utils/siteRoutes';

type Locale = 'en' | 'fa';
type Translations = typeof en;

const translations: Record<Locale, Translations> = { en, fa };

interface LanguageContextValue {
  locale: Locale;
  dir: 'ltr' | 'rtl';
  t: (key: keyof Translations) => string;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectLocale(): Locale {
  const routeLocale = getSiteRouteInfo().locale;
  if (routeLocale === 'en' || routeLocale === 'fa') return routeLocale;
  const saved = localStorage.getItem('locale');
  if (saved === 'en' || saved === 'fa') return saved;
  return 'fa';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(detectLocale);

  const toggleLocale = useCallback(() => {
    setLocale(prev => {
      const next = prev === 'en' ? 'fa' : 'en';
      const { year } = getSiteRouteInfo();
      window.location.assign(buildSitePath(next, year));
      return next;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('locale', locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
  }, [locale]);

  const t = useCallback(
    (key: keyof Translations) => translations[locale][key] ?? key,
    [locale]
  );

  const dir = locale === 'fa' ? 'rtl' as const : 'ltr' as const;

  return (
    <LanguageContext.Provider value={{ locale, dir, t, toggleLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
