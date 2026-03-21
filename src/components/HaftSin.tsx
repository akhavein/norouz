import { type ReactNode, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import type en from '../i18n/en.json';

type TranslationKey = keyof typeof en;

type HaftSinKey = 'haftsin_sabzeh' | 'haftsin_sib' | 'haftsin_sir' | 'haftsin_senjed' | 'haftsin_samanu' | 'haftsin_somaq' | 'haftsin_serkeh';
type ExtraKey = 'haftsin_ayeneh' | 'haftsin_mahi' | 'haftsin_sham' | 'haftsin_tokhmmorgh' | 'haftsin_sekkeh';

interface HaftSinItem {
  icon: ReactNode;
  persian: string;
  english: string;
  meaningKey: HaftSinKey | ExtraKey;
}

/* ── Existing 7 S icons ── */

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

function IconSenjed() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="40" rx="12" ry="3" fill="#b08530" opacity="0.15" />
      <ellipse cx="24" cy="38" rx="11" ry="3" fill="#b08530" opacity="0.3" />
      <path d="M12 36 Q12 32 16 31 L32 31 Q36 32 36 36 Q36 40 24 41 Q12 40 12 36Z" fill="#c9a96e" opacity="0.4" />
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

function IconSamanu() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="40" rx="12" ry="2.5" fill="#b08530" opacity="0.15" />
      <path d="M10 28 Q10 24 14 22 L34 22 Q38 24 38 28 Q38 38 24 40 Q10 38 10 28Z" fill="#c9a96e" opacity="0.5" />
      <path d="M10 28 Q10 24 14 22 L34 22 Q38 24 38 28" fill="none" stroke="#b08530" strokeWidth="1" opacity="0.6" />
      <ellipse cx="24" cy="25" rx="12" ry="4.5" fill="#8b6232" />
      <ellipse cx="24" cy="24.5" rx="10" ry="3.5" fill="#a07038" opacity="0.6" />
      <line x1="16" y1="25" x2="32" y2="25" stroke="#c9a050" strokeWidth="0.7" opacity="0.5" />
      <line x1="24" y1="21" x2="24" y2="29" stroke="#c9a050" strokeWidth="0.7" opacity="0.5" />
    </svg>
  );
}

function IconSomaq() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="40" rx="10" ry="2" fill="#b08530" opacity="0.15" />
      <path d="M12 34 Q12 30 16 28 L32 28 Q36 30 36 34 Q36 38 24 39 Q12 38 12 34Z" fill="#c9a96e" opacity="0.4" />
      <ellipse cx="24" cy="30" rx="10" ry="4" fill="#8b2252" />
      <ellipse cx="24" cy="29" rx="8" ry="3" fill="#a03060" opacity="0.5" />
      <circle cx="20" cy="29" r="0.5" fill="#c04870" opacity="0.6" />
      <circle cx="27" cy="28" r="0.4" fill="#c04870" opacity="0.5" />
      <circle cx="23" cy="30" r="0.5" fill="#701840" opacity="0.4" />
    </svg>
  );
}

function IconSerkeh() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="42" rx="8" ry="1.5" fill="#b08530" opacity="0.15" />
      <path d="M18 42 L18 24 Q18 20 20 18 L20 12 Q20 10 22 10 L26 10 Q28 10 28 12 L28 18 Q30 20 30 24 L30 42 Q30 42 24 42 Q18 42 18 42Z" fill="#d4e8d0" opacity="0.5" />
      <path d="M18 42 L18 24 Q18 20 20 18 L20 12 Q20 10 22 10 L26 10 Q28 10 28 12 L28 18 Q30 20 30 24 L30 42" fill="none" stroke="#7dad8a" strokeWidth="0.8" opacity="0.6" />
      <path d="M19 42 L19 26 Q19 22 21 20 L29 20 Q29 22 29 26 L29 42 Q29 42 24 42 Q19 42 19 42Z" fill="#c9a050" opacity="0.35" />
      <rect x="21" y="8" width="6" height="3" rx="1" fill="#b08530" opacity="0.6" />
    </svg>
  );
}

/* ── Extra item icons ── */

function IconAyeneh() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="42" rx="10" ry="1.5" fill="#b08530" opacity="0.15" />
      {/* Mirror frame */}
      <ellipse cx="24" cy="24" rx="13" ry="16" fill="none" stroke="#b08530" strokeWidth="2" opacity="0.7" />
      <ellipse cx="24" cy="24" rx="11" ry="14" fill="none" stroke="#b08530" strokeWidth="0.8" opacity="0.4" />
      {/* Reflective surface */}
      <ellipse cx="24" cy="24" rx="10" ry="13" fill="#e8e4dc" opacity="0.4" />
      {/* Light reflection */}
      <ellipse cx="20" cy="18" rx="4" ry="6" fill="#fefdf8" opacity="0.3" transform="rotate(-15 20 18)" />
      {/* Frame decorations */}
      <circle cx="24" cy="7" r="1.5" fill="#b08530" opacity="0.5" />
      <circle cx="24" cy="41" r="1.5" fill="#b08530" opacity="0.5" />
    </svg>
  );
}

function IconMahi() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="42" rx="10" ry="1.5" fill="#3d7a82" opacity="0.1" />
      {/* Bowl */}
      <path d="M8 28 Q8 22 14 20 L34 20 Q40 22 40 28 Q40 40 24 42 Q8 40 8 28Z" fill="#3d7a82" opacity="0.12" />
      <path d="M8 28 Q8 22 14 20 L34 20 Q40 22 40 28" fill="none" stroke="#3d7a82" strokeWidth="0.8" opacity="0.3" />
      {/* Fish body */}
      <path d="M16 28 Q20 22 28 24 Q34 26 32 30 Q28 36 20 34 Q14 32 16 28Z" fill="#e85d3a" opacity="0.8" />
      <path d="M18 28 Q22 24 28 25 Q32 27 30 30 Q27 34 21 32 Q16 30 18 28Z" fill="#f07050" opacity="0.5" />
      {/* Tail */}
      <path d="M16 28 Q12 24 10 22 Q12 28 10 34 Q12 32 16 28Z" fill="#e85d3a" opacity="0.7" />
      {/* Eye */}
      <circle cx="28" cy="27" r="1.5" fill="#2c2417" opacity="0.8" />
      <circle cx="28.5" cy="26.5" r="0.5" fill="#fefdf8" opacity="0.6" />
      {/* Fin */}
      <path d="M22 26 Q24 22 26 26" fill="none" stroke="#c94c3c" strokeWidth="0.6" opacity="0.5" />
    </svg>
  );
}

function IconSham() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="42" rx="10" ry="1.5" fill="#b08530" opacity="0.15" />
      {/* Holder base */}
      <path d="M14 40 Q14 38 18 38 L30 38 Q34 38 34 40 Q34 42 24 42 Q14 42 14 40Z" fill="#b08530" opacity="0.4" />
      {/* Left candle */}
      <rect x="17" y="20" width="4" height="18" rx="1.5" fill="#f0e6d3" opacity="0.8" />
      <path d="M19 20 Q17 16 19 12 Q21 16 19 20Z" fill="#e8a030" opacity="0.8" />
      <path d="M19 14 Q18.5 16 19 18 Q19.5 16 19 14Z" fill="#f0c860" opacity="0.6" />
      {/* Right candle */}
      <rect x="27" y="22" width="4" height="16" rx="1.5" fill="#f0e6d3" opacity="0.8" />
      <path d="M29 22 Q27 18 29 14 Q31 18 29 22Z" fill="#e8a030" opacity="0.8" />
      <path d="M29 16 Q28.5 18 29 20 Q29.5 18 29 16Z" fill="#f0c860" opacity="0.6" />
      {/* Wicks */}
      <line x1="19" y1="12" x2="19" y2="10" stroke="#6b4226" strokeWidth="0.5" opacity="0.5" />
      <line x1="29" y1="14" x2="29" y2="12" stroke="#6b4226" strokeWidth="0.5" opacity="0.5" />
    </svg>
  );
}

function IconTokhmMorgh() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="42" rx="12" ry="1.5" fill="#b08530" opacity="0.15" />
      {/* Egg 1 — teal decorated */}
      <ellipse cx="18" cy="30" rx="7" ry="9" fill="#3d7a82" opacity="0.6" />
      <path d="M14 28 Q18 26 22 28" fill="none" stroke="#fefdf8" strokeWidth="0.6" opacity="0.5" />
      <path d="M14 32 Q18 30 22 32" fill="none" stroke="#fefdf8" strokeWidth="0.6" opacity="0.5" />
      <circle cx="18" cy="30" r="1" fill="#fefdf8" opacity="0.3" />
      {/* Egg 2 — blush decorated */}
      <ellipse cx="30" cy="31" rx="7" ry="9" fill="#e8b4b8" opacity="0.6" />
      <path d="M26 29 Q30 27 34 29" fill="none" stroke="#fefdf8" strokeWidth="0.6" opacity="0.5" />
      <path d="M26 33 Q30 31 34 33" fill="none" stroke="#fefdf8" strokeWidth="0.6" opacity="0.5" />
      <circle cx="30" cy="31" r="1" fill="#fefdf8" opacity="0.3" />
      {/* Egg 3 — gold behind, peeking */}
      <ellipse cx="24" cy="26" rx="5" ry="7" fill="#b08530" opacity="0.35" />
    </svg>
  );
}

function IconSekkeh() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden="true">
      <ellipse cx="24" cy="42" rx="10" ry="1.5" fill="#b08530" opacity="0.15" />
      {/* Bottom coin */}
      <ellipse cx="24" cy="36" rx="10" ry="3" fill="#b08530" opacity="0.3" />
      <ellipse cx="24" cy="35" rx="10" ry="3" fill="#c9a050" opacity="0.5" />
      {/* Middle coin */}
      <ellipse cx="24" cy="30" rx="10" ry="3" fill="#b08530" opacity="0.3" />
      <ellipse cx="24" cy="29" rx="10" ry="3" fill="#c9a050" opacity="0.6" />
      {/* Top coin */}
      <ellipse cx="24" cy="24" rx="10" ry="3" fill="#b08530" opacity="0.3" />
      <ellipse cx="24" cy="23" rx="10" ry="3" fill="#d4b060" opacity="0.7" />
      {/* Coin detail on top */}
      <circle cx="24" cy="23" r="5" fill="none" stroke="#b08530" strokeWidth="0.6" opacity="0.5" />
      <circle cx="24" cy="23" r="2.5" fill="none" stroke="#b08530" strokeWidth="0.4" opacity="0.4" />
      {/* Edge lines */}
      <line x1="14" y1="24" x2="14" y2="36" stroke="#b08530" strokeWidth="0.5" opacity="0.2" />
      <line x1="34" y1="24" x2="34" y2="36" stroke="#b08530" strokeWidth="0.5" opacity="0.2" />
    </svg>
  );
}

/* ── Data ── */

const ITEMS: HaftSinItem[] = [
  { icon: <IconSabzeh />, persian: 'سبزه', english: 'Sabzeh', meaningKey: 'haftsin_sabzeh' },
  { icon: <IconSib />, persian: 'سیب', english: 'Sib', meaningKey: 'haftsin_sib' },
  { icon: <IconSir />, persian: 'سیر', english: 'Sir', meaningKey: 'haftsin_sir' },
  { icon: <IconSenjed />, persian: 'سنجد', english: 'Senjed', meaningKey: 'haftsin_senjed' },
  { icon: <IconSamanu />, persian: 'سمنو', english: 'Samanu', meaningKey: 'haftsin_samanu' },
  { icon: <IconSomaq />, persian: 'سماق', english: 'Somaq', meaningKey: 'haftsin_somaq' },
  { icon: <IconSerkeh />, persian: 'سرکه', english: 'Serkeh', meaningKey: 'haftsin_serkeh' },
];

const EXTRA_ITEMS: HaftSinItem[] = [
  { icon: <IconAyeneh />, persian: 'آینه', english: 'Mirror', meaningKey: 'haftsin_ayeneh' },
  { icon: <IconMahi />, persian: 'ماهی قرمز', english: 'Goldfish', meaningKey: 'haftsin_mahi' },
  { icon: <IconSham />, persian: 'شمع', english: 'Candles', meaningKey: 'haftsin_sham' },
  { icon: <IconTokhmMorgh />, persian: 'تخم‌مرغ رنگی', english: 'Painted Eggs', meaningKey: 'haftsin_tokhmmorgh' },
  { icon: <IconSekkeh />, persian: 'سکه', english: 'Coins', meaningKey: 'haftsin_sekkeh' },
];

/* ── Component ── */

function usePrefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function ItemCard({
  item,
  index,
  expanded,
  onToggle,
  reducedMotion,
  locale,
  t,
}: {
  item: HaftSinItem;
  index: number;
  expanded: boolean;
  onToggle: () => void;
  reducedMotion: boolean;
  locale: string;
  t: (key: TranslationKey) => string;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`group flex flex-col items-center gap-1.5 p-4 rounded-xl border transition-all duration-200 text-left w-full cursor-pointer ${
        expanded
          ? 'border-persian-gold/40 shadow-md bg-cream/80 dark:bg-dark-surface/80'
          : 'border-persian-gold/15 bg-cream/60 dark:bg-dark-surface/60 hover:border-persian-gold/40 hover:shadow-md hover:-translate-y-0.5'
      }`}
      style={
        reducedMotion
          ? undefined
          : { animation: `haftsin-fade-in 0.4s ease-out ${index * 0.08}s both` }
      }
    >
      <span className="w-12 h-12 shrink-0" aria-hidden="true">
        {item.icon}
      </span>
      <span className={`text-sm font-bold text-warm-charcoal dark:text-cream ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        {locale === 'fa' ? item.persian : item.english}
      </span>
      {/* Chevron indicator */}
      <svg
        width="12" height="12" viewBox="0 0 12 12"
        className={`text-persian-gold/40 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
        aria-hidden="true"
      >
        <path d="M2 4 L6 8 L10 4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {/* Expandable description */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out w-full ${
          expanded ? 'max-h-64 opacity-100 mt-1' : 'max-h-0 opacity-0'
        }`}
      >
        <p className={`text-xs leading-relaxed text-warm-charcoal/70 dark:text-cream/65 text-center ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {t(item.meaningKey)}
        </p>
      </div>
    </button>
  );
}

export function HaftSin() {
  const { t, locale } = useLanguage();
  const reducedMotion = usePrefersReducedMotion();
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const toggleExpand = (key: string) => {
    setExpandedKey(prev => (prev === key ? null : key));
  };

  return (
    <section className="w-full max-w-2xl mx-auto" aria-label={t('haftsin_title')}>
      <h2 className={`text-center text-xl sm:text-2xl font-bold text-persian-gold mb-6 ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
        {t('haftsin_title')}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {ITEMS.map((item, i) => (
          <ItemCard
            key={item.meaningKey}
            item={item}
            index={i}
            expanded={expandedKey === item.meaningKey}
            onToggle={() => toggleExpand(item.meaningKey)}
            reducedMotion={reducedMotion}
            locale={locale}
            t={t}
          />
        ))}
      </div>

      {/* Extra Norouz table items */}
      <div className="flex items-center gap-3 mt-8 mb-6">
        <div className="flex-1 h-px bg-persian-gold/15" />
        <h3 className={`text-sm sm:text-base font-semibold text-persian-gold/70 whitespace-nowrap ${locale === 'fa' ? "font-['Vazirmatn',sans-serif]" : ''}`}>
          {t('haftsin_extra_title')}
        </h3>
        <div className="flex-1 h-px bg-persian-gold/15" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {EXTRA_ITEMS.map((item, i) => (
          <ItemCard
            key={item.meaningKey}
            item={item}
            index={ITEMS.length + i}
            expanded={expandedKey === item.meaningKey}
            onToggle={() => toggleExpand(item.meaningKey)}
            reducedMotion={reducedMotion}
            locale={locale}
            t={t}
          />
        ))}
      </div>
    </section>
  );
}
