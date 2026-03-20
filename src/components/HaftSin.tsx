import { useLanguage } from '../i18n/LanguageContext';

type TranslationKey = 'haftsin_sabzeh' | 'haftsin_sib' | 'haftsin_sir' | 'haftsin_senjed' | 'haftsin_samanu' | 'haftsin_somaq' | 'haftsin_serkeh';

interface HaftSinItem {
  emoji: string;
  persian: string;
  english: string;
  meaningKey: TranslationKey;
}

const ITEMS: HaftSinItem[] = [
  { emoji: '🌱', persian: 'سبزه', english: 'Sabzeh', meaningKey: 'haftsin_sabzeh' },
  { emoji: '🍎', persian: 'سیب', english: 'Sib', meaningKey: 'haftsin_sib' },
  { emoji: '🧄', persian: 'سیر', english: 'Sir', meaningKey: 'haftsin_sir' },
  { emoji: '🫒', persian: 'سنجد', english: 'Senjed', meaningKey: 'haftsin_senjed' },
  { emoji: '🍯', persian: 'سمنو', english: 'Samanu', meaningKey: 'haftsin_samanu' },
  { emoji: '🌿', persian: 'سماق', english: 'Somaq', meaningKey: 'haftsin_somaq' },
  { emoji: '🍶', persian: 'سرکه', english: 'Serkeh', meaningKey: 'haftsin_serkeh' },
];

function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HaftSin() {
  const { t, locale } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section className="w-full max-w-2xl mx-auto" aria-label={t('haftsin_title')}>
      <h2 className={`text-center text-xl sm:text-2xl font-bold text-persian-gold mb-6 ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        {t('haftsin_title')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {ITEMS.map((item, i) => (
          <div
            key={item.meaningKey}
            className="group flex flex-col items-center gap-1.5 p-4 rounded-xl border border-persian-gold/15 bg-cream/60 dark:bg-dark-surface/60 hover:border-persian-gold/40 hover:shadow-sm transition-all duration-200"
            style={
              reducedMotion
                ? undefined
                : {
                    animation: `haftsin-fade-in 0.4s ease-out ${i * 0.08}s both`,
                  }
            }
          >
            <span className="text-3xl sm:text-4xl" aria-hidden="true">
              {item.emoji}
            </span>
            <span className="text-sm font-bold text-warm-charcoal dark:text-cream font-['Vazirmatn',sans-serif]">
              {item.persian}
            </span>
            <span className={`text-xs text-warm-charcoal/60 dark:text-cream/55 ${locale === 'fa' ? "font-['Inter',sans-serif]" : ''}`}>
              {item.english}
            </span>
            <span className="text-xs text-persian-gold/80 font-medium text-center">
              {t(item.meaningKey)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
