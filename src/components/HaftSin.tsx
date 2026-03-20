import { type ReactNode } from 'react';
import { useLanguage } from '../i18n/LanguageContext';

type TranslationKey = 'haftsin_sabzeh' | 'haftsin_sib' | 'haftsin_sir' | 'haftsin_senjed' | 'haftsin_samanu' | 'haftsin_somaq' | 'haftsin_serkeh';

interface HaftSinItem {
  icon: ReactNode;
  persian: string;
  english: string;
  meaningKey: TranslationKey;
}

/* Sabzeh — wheatgrass sprouts in a dish */
function IconSabzeh() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="38" rx="14" ry="4" fill="#b08530" opacity="0.25" />
      <path d="M10 36 Q10 32 14 32 L34 32 Q38 32 38 36 Q38 40 24 40 Q10 40 10 36Z" fill="#b08530" opacity="0.5" />
      <path d="M14 34 Q14 31 17 31 L31 31 Q34 31 34 34" fill="#7dad8a" opacity="0.3" />
      {[16, 20, 24, 28, 32].map((x, i) => (
        <path key={i} d={`M${x} 32 Q${x - 2} ${22 - i % 2 * 3} ${x - 1} ${14 - i % 3 * 2}`} stroke="#7dad8a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      ))}
      {[18, 22, 26, 30].map((x, i) => (
        <path key={i} d={`M${x} 32 Q${x + 1} ${20 - i % 2 * 4} ${x + 2} ${12 - i % 3 * 2}`} stroke="#5a9a6a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/* Sib — red apple with leaf */
function IconSib() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="40" rx="10" ry="2" fill="#b08530" opacity="0.15" />
      <path d="M24 14 Q14 14 12 24 Q10 34 18 38 Q22 40 24 38 Q26 40 30 38 Q38 34 36 24 Q34 14 24 14Z" fill="#c94c4c" />
      <path d="M24 14 Q20 14 17 18 Q15 22 16 28 Q18 24 22 20 Q24 18 24 14Z" fill="#d96666" opacity="0.5" />
      <path d="M24 14 Q24 10 23 8" stroke="#6b4226" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M24 10 Q28 8 30 10 Q28 10 26 12" fill="#7dad8a" />
    </svg>
  );
}

/* Sir — garlic bulb */
function IconSir() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="40" rx="10" ry="2" fill="#b08530" opacity="0.15" />
      <path d="M24 12 Q24 8 24 10" stroke="#b08530" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M20 14 Q18 20 16 28 Q14 36 24 38 Q34 36 32 28 Q30 20 28 14 Q26 10 24 10 Q22 10 20 14Z" fill="#f0e6d3" />
      <path d="M24 12 Q22 14 20 22 Q19 30 22 36 Q24 38 24 38" stroke="#d4c4a8" strokeWidth="0.8" fill="none" />
      <path d="M24 12 Q26 14 28 22 Q29 30 26 36" stroke="#d4c4a8" strokeWidth="0.8" fill="none" />
      <path d="M21 14 Q20 20 19 28 Q18 34 22 37" stroke="#e0d5c0" strokeWidth="0.6" fill="none" opacity="0.6" />
      <path d="M27 14 Q28 20 29 28 Q30 34 26 37" stroke="#e0d5c0" strokeWidth="0.6" fill="none" opacity="0.6" />
    </svg>
  );
}

/* Senjed — dried oleaster berries */
function IconSenjed() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="40" rx="12" ry="3" fill="#b08530" opacity="0.15" />
      <ellipse cx="24" cy="38" rx="11" ry="3" fill="#b08530" opacity="0.3" />
      {/* Small bowl */}
      <path d="M12 36 Q12 32 16 31 L32 31 Q36 32 36 36 Q36 40 24 41 Q12 40 12 36Z" fill="#c9a96e" opacity="0.4" />
      {/* Dried oleaster fruits — small elongated tan/brown shapes */}
      <ellipse cx="18" cy="30" rx="3.5" ry="2" fill="#a0754a" transform="rotate(-15 18 30)" />
      <ellipse cx="26" cy="29" rx="3.5" ry="2" fill="#8b6340" transform="rotate(10 26 29)" />
      <ellipse cx="21" cy="27" rx="3" ry="1.8" fill="#b08050" transform="rotate(-5 21 27)" />
      <ellipse cx="30" cy="31" rx="3" ry="1.8" fill="#966b42" transform="rotate(20 30 31)" />
      <ellipse cx="16" cy="33" rx="3" ry="1.8" fill="#a07848" transform="rotate(-10 16 33)" />
      <ellipse cx="24" cy="33" rx="3.5" ry="2" fill="#8b6840" transform="rotate(5 24 33)" />
      <ellipse cx="32" cy="34" rx="3" ry="1.6" fill="#a0754a" transform="rotate(15 32 34)" />
    </svg>
  );
}

/* Samanu — sweet wheat pudding in a bowl */
function IconSamanu() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="40" rx="12" ry="2.5" fill="#b08530" opacity="0.15" />
      {/* Bowl */}
      <path d="M10 28 Q10 24 14 22 L34 22 Q38 24 38 28 Q38 38 24 40 Q10 38 10 28Z" fill="#c9a96e" opacity="0.5" />
      <path d="M10 28 Q10 24 14 22 L34 22 Q38 24 38 28" fill="none" stroke="#b08530" strokeWidth="1" opacity="0.6" />
      {/* Brown pudding surface */}
      <ellipse cx="24" cy="25" rx="12" ry="4.5" fill="#8b6232" />
      <ellipse cx="24" cy="24.5" rx="10" ry="3.5" fill="#a07038" opacity="0.6" />
      {/* Traditional cross-hatch decoration on top */}
      <line x1="16" y1="25" x2="32" y2="25" stroke="#c9a050" strokeWidth="0.7" opacity="0.5" />
      <line x1="24" y1="21" x2="24" y2="29" stroke="#c9a050" strokeWidth="0.7" opacity="0.5" />
    </svg>
  );
}

/* Somaq — reddish sumac powder in a small dish */
function IconSomaq() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="40" rx="10" ry="2" fill="#b08530" opacity="0.15" />
      {/* Small dish */}
      <path d="M12 34 Q12 30 16 28 L32 28 Q36 30 36 34 Q36 38 24 39 Q12 38 12 34Z" fill="#c9a96e" opacity="0.4" />
      {/* Sumac mound — dark reddish-purple */}
      <ellipse cx="24" cy="30" rx="10" ry="4" fill="#8b2252" />
      <ellipse cx="24" cy="29" rx="8" ry="3" fill="#a03060" opacity="0.5" />
      {/* Texture specks */}
      <circle cx="20" cy="29" r="0.5" fill="#c04870" opacity="0.6" />
      <circle cx="27" cy="28" r="0.4" fill="#c04870" opacity="0.5" />
      <circle cx="23" cy="30" r="0.5" fill="#701840" opacity="0.4" />
    </svg>
  );
}

/* Serkeh — glass vinegar bottle */
function IconSerkeh() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="42" rx="8" ry="1.5" fill="#b08530" opacity="0.15" />
      {/* Bottle body */}
      <path d="M18 42 L18 24 Q18 20 20 18 L20 12 Q20 10 22 10 L26 10 Q28 10 28 12 L28 18 Q30 20 30 24 L30 42 Q30 42 24 42 Q18 42 18 42Z" fill="#d4e8d0" opacity="0.5" />
      <path d="M18 42 L18 24 Q18 20 20 18 L20 12 Q20 10 22 10 L26 10 Q28 10 28 12 L28 18 Q30 20 30 24 L30 42" fill="none" stroke="#7dad8a" strokeWidth="0.8" opacity="0.6" />
      {/* Vinegar liquid */}
      <path d="M19 42 L19 26 Q19 22 21 20 L29 20 Q29 22 29 26 L29 42 Q29 42 24 42 Q19 42 19 42Z" fill="#c9a050" opacity="0.35" />
      {/* Cap */}
      <rect x="21" y="8" width="6" height="3" rx="1" fill="#b08530" opacity="0.6" />
    </svg>
  );
}

const ITEMS: HaftSinItem[] = [
  { icon: <IconSabzeh />, persian: 'سبزه', english: 'Sabzeh', meaningKey: 'haftsin_sabzeh' },
  { icon: <IconSib />, persian: 'سیب', english: 'Sib', meaningKey: 'haftsin_sib' },
  { icon: <IconSir />, persian: 'سیر', english: 'Sir', meaningKey: 'haftsin_sir' },
  { icon: <IconSenjed />, persian: 'سنجد', english: 'Senjed', meaningKey: 'haftsin_senjed' },
  { icon: <IconSamanu />, persian: 'سمنو', english: 'Samanu', meaningKey: 'haftsin_samanu' },
  { icon: <IconSomaq />, persian: 'سماق', english: 'Somaq', meaningKey: 'haftsin_somaq' },
  { icon: <IconSerkeh />, persian: 'سرکه', english: 'Serkeh', meaningKey: 'haftsin_serkeh' },
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
            <span className="w-12 h-12" aria-hidden="true">
              {item.icon}
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
