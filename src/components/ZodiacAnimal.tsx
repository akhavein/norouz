import { type ReactNode } from 'react';

/**
 * Persian 12-year animal cycle (سال حیوانات)
 * Base: 1404 = Snake (index 5). Cycle: Mouse(0), Cow(1), Leopard(2),
 * Rabbit(3), Whale(4), Snake(5), Horse(6), Sheep(7), Monkey(8),
 * Rooster(9), Dog(10), Pig(11).
 */
const ZODIAC_ANIMALS: { en: string; fa: string; icon: () => ReactNode }[] = [
  { en: 'Mouse', fa: 'موش', icon: IconMouse },
  { en: 'Cow', fa: 'گاو', icon: IconCow },
  { en: 'Leopard', fa: 'پلنگ', icon: IconLeopard },
  { en: 'Rabbit', fa: 'خرگوش', icon: IconRabbit },
  { en: 'Whale', fa: 'نهنگ', icon: IconWhale },
  { en: 'Snake', fa: 'مار', icon: IconSnake },
  { en: 'Horse', fa: 'اسب', icon: IconHorse },
  { en: 'Sheep', fa: 'گوسفند', icon: IconSheep },
  { en: 'Monkey', fa: 'میمون', icon: IconMonkey },
  { en: 'Rooster', fa: 'مرغ', icon: IconRooster },
  { en: 'Dog', fa: 'سگ', icon: IconDog },
  { en: 'Pig', fa: 'خوک', icon: IconPig },
];

const BASE_YEAR = 1404;
const BASE_INDEX = 5; // 1404 = Snake

function getZodiacIndex(shamsiYear: number): number {
  return ((shamsiYear - BASE_YEAR + BASE_INDEX) % 12 + 12) % 12;
}

/* ── Animal SVG icons (64x48, facing right) ── */

function IconHorse() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body */}
      <ellipse cx="32" cy="28" rx="16" ry="10" fill="#b08530" />
      <ellipse cx="32" cy="27" rx="14" ry="8" fill="#c9a050" opacity="0.4" />
      {/* Neck */}
      <path d="M42 22 Q46 14 48 10 Q50 8 50 10 L48 12 Q46 18 44 24" fill="#b08530" />
      <path d="M43 22 Q46 15 48 11" stroke="#c9a050" strokeWidth="0.8" fill="none" opacity="0.5" />
      {/* Head */}
      <ellipse cx="52" cy="10" rx="6" ry="4.5" fill="#b08530" transform="rotate(-15 52 10)" />
      <ellipse cx="54" cy="9" rx="4" ry="3" fill="#c9a050" opacity="0.3" transform="rotate(-15 54 9)" />
      {/* Eye */}
      <circle cx="55" cy="9" r="1" fill="#2c2417" />
      {/* Ear */}
      <path d="M50 5 Q49 1 51 2 Q53 3 52 6" fill="#b08530" />
      {/* Nostril */}
      <circle cx="57" cy="11" r="0.6" fill="#8b6232" />
      {/* Mane */}
      <path d="M44 18 Q42 12 44 8 Q45 6 46 8 Q44 12 45 16" fill="#8b6232" opacity="0.6" />
      <path d="M42 20 Q40 14 42 10 Q43 8 44 10 Q42 14 43 18" fill="#8b6232" opacity="0.5" />
      {/* Tail */}
      <path d="M16 24 Q10 20 8 16 Q6 12 8 14 Q10 18 12 22" stroke="#8b6232" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M16 26 Q10 24 6 20 Q4 16 6 18 Q8 22 12 26" stroke="#8b6232" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6" />
      {/* Front legs — two classes for walk animation */}
      <g className="zodiac-leg-front">
        <path d="M38 36 L40 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 36 L43 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Back legs */}
      <g className="zodiac-leg-back">
        <path d="M22 36 L20 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M26 36 L25 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Hooves */}
      <g className="zodiac-leg-front">
        <rect x="39" y="43" width="3" height="2" rx="1" fill="#6b4226" />
        <rect x="42" y="43" width="3" height="2" rx="1" fill="#6b4226" />
      </g>
      <g className="zodiac-leg-back">
        <rect x="19" y="43" width="3" height="2" rx="1" fill="#6b4226" />
        <rect x="24" y="43" width="3" height="2" rx="1" fill="#6b4226" />
      </g>
    </svg>
  );
}

/* Placeholder silhouettes for future years — simple recognizable shapes */

function IconMouse() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <ellipse cx="30" cy="30" rx="14" ry="9" fill="#b08530" />
      <ellipse cx="42" cy="24" rx="8" ry="7" fill="#b08530" />
      <circle cx="46" cy="22" r="1" fill="#2c2417" />
      <ellipse cx="38" cy="17" rx="4" ry="5" fill="#c9a050" opacity="0.5" />
      <ellipse cx="44" cy="17" rx="4" ry="5" fill="#c9a050" opacity="0.5" />
      <path d="M16 30 Q6 28 2 26" stroke="#b08530" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <g className="zodiac-leg-front"><path d="M36 37 L37 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" /><path d="M40 37 L41 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" /></g>
      <g className="zodiac-leg-back"><path d="M22 37 L21 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" /><path d="M26 37 L26 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" /></g>
    </svg>
  );
}

function IconCow() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <ellipse cx="30" cy="28" rx="16" ry="11" fill="#f0e6d3" />
      <ellipse cx="28" cy="26" rx="6" ry="5" fill="#b08530" opacity="0.4" />
      <ellipse cx="46" cy="22" rx="8" ry="7" fill="#f0e6d3" />
      <circle cx="49" cy="20" r="1" fill="#2c2417" />
      <ellipse cx="52" cy="24" rx="3" ry="2.5" fill="#e8b4b8" opacity="0.5" />
      <path d="M40 15 Q38 10 36 12" stroke="#b08530" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M46 14 Q48 9 50 11" stroke="#b08530" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g className="zodiac-leg-front"><path d="M38 37 L39 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" /><path d="M42 37 L43 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" /></g>
      <g className="zodiac-leg-back"><path d="M20 37 L19 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" /><path d="M24 37 L24 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" /></g>
    </svg>
  );
}

function IconLeopard() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <ellipse cx="30" cy="28" rx="16" ry="9" fill="#c9a050" />
      {[22,26,30,34,28,24,32].map((x, i) => <circle key={i} cx={x} cy={26 + (i % 3) * 2} r="1.2" fill="#8b6232" opacity="0.5" />)}
      <ellipse cx="46" cy="22" rx="7" ry="6" fill="#c9a050" />
      <circle cx="49" cy="20" r="1" fill="#2c2417" />
      <path d="M42 16 Q41 12 43 14" fill="#c9a050" />
      <path d="M48 16 Q49 12 47 14" fill="#c9a050" />
      <path d="M14 28 Q8 24 4 28 Q8 26 12 30" stroke="#c9a050" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g className="zodiac-leg-front"><path d="M38 35 L40 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" /><path d="M42 35 L43 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" /></g>
      <g className="zodiac-leg-back"><path d="M20 35 L19 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" /><path d="M24 35 L24 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" /></g>
    </svg>
  );
}

function IconRabbit() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <ellipse cx="30" cy="30" rx="13" ry="9" fill="#f0e6d3" />
      <ellipse cx="42" cy="24" rx="7" ry="6" fill="#f0e6d3" />
      <circle cx="45" cy="22" r="1" fill="#2c2417" />
      <ellipse cx="39" cy="12" rx="2.5" ry="8" fill="#f0e6d3" />
      <ellipse cx="39" cy="12" rx="1.5" ry="6" fill="#e8b4b8" opacity="0.4" />
      <ellipse cx="44" cy="12" rx="2.5" ry="8" fill="#f0e6d3" />
      <ellipse cx="44" cy="12" rx="1.5" ry="6" fill="#e8b4b8" opacity="0.4" />
      <circle cx="17" cy="30" r="2" fill="#f0e6d3" />
      <g className="zodiac-leg-front"><path d="M38 37 L39 44" stroke="#f0e6d3" strokeWidth="2" strokeLinecap="round" /><path d="M42 37 L42 44" stroke="#f0e6d3" strokeWidth="2" strokeLinecap="round" /></g>
      <g className="zodiac-leg-back"><path d="M22 35 L20 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" /><path d="M26 35 L25 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" /></g>
    </svg>
  );
}

function IconWhale() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <path d="M10 28 Q10 18 24 16 Q40 14 52 20 Q58 24 56 28 Q54 34 40 36 Q24 38 14 34 Q10 32 10 28Z" fill="#3d7a82" />
      <path d="M10 28 Q10 20 24 18 Q36 16 46 20" fill="#5b9ea6" opacity="0.3" />
      <circle cx="50" cy="22" r="1.2" fill="#2c2417" />
      <path d="M8 26 Q4 20 2 16 Q4 18 8 22" fill="#3d7a82" />
      <path d="M8 28 Q2 24 0 18 Q2 22 6 28" fill="#3d7a82" opacity="0.7" />
      <ellipse cx="56" cy="24" rx="2" ry="1" fill="#5b9ea6" opacity="0.4" />
    </svg>
  );
}

function IconSnake() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <path d="M8 38 Q8 30 16 28 Q24 26 28 30 Q32 34 38 32 Q44 30 46 26 Q48 22 52 20 Q56 18 58 16" stroke="#7dad8a" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M8 38 Q8 30 16 28 Q24 26 28 30 Q32 34 38 32 Q44 30 46 26 Q48 22 52 20 Q56 18 58 16" stroke="#5a9a6a" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.4" />
      <ellipse cx="58" cy="14" rx="4" ry="3.5" fill="#7dad8a" />
      <circle cx="60" cy="13" r="0.8" fill="#2c2417" />
      <path d="M62 15 L64 14.5 L62 16" stroke="#c94c4c" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function IconSheep() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Fluffy body */}
      {[24,28,32,36,26,30,34].map((x, i) => <circle key={i} cx={x} cy={26 + (i % 3) * 2} r="5" fill="#f0e6d3" />)}
      <ellipse cx="44" cy="24" rx="6" ry="5" fill="#2c2417" />
      <circle cx="47" cy="22" r="1" fill="#f0e6d3" />
      <path d="M42 19 Q40 16 42 17" stroke="#2c2417" strokeWidth="1.5" fill="none" />
      <path d="M46 19 Q48 16 46 17" stroke="#2c2417" strokeWidth="1.5" fill="none" />
      <g className="zodiac-leg-front"><path d="M36 33 L37 44" stroke="#2c2417" strokeWidth="2" strokeLinecap="round" /><path d="M40 33 L41 44" stroke="#2c2417" strokeWidth="2" strokeLinecap="round" /></g>
      <g className="zodiac-leg-back"><path d="M22 33 L21 44" stroke="#2c2417" strokeWidth="2" strokeLinecap="round" /><path d="M26 33 L26 44" stroke="#2c2417" strokeWidth="2" strokeLinecap="round" /></g>
    </svg>
  );
}

function IconMonkey() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <ellipse cx="30" cy="28" rx="12" ry="9" fill="#b08530" />
      <ellipse cx="42" cy="20" rx="8" ry="7" fill="#b08530" />
      <ellipse cx="42" cy="22" rx="5" ry="4" fill="#c9a050" opacity="0.5" />
      <circle cx="39" cy="19" r="1" fill="#2c2417" />
      <circle cx="45" cy="19" r="1" fill="#2c2417" />
      <circle cx="35" cy="16" r="4" fill="#b08530" />
      <circle cx="35" cy="16" r="2.5" fill="#c9a050" opacity="0.4" />
      <circle cx="49" cy="16" r="4" fill="#b08530" />
      <circle cx="49" cy="16" r="2.5" fill="#c9a050" opacity="0.4" />
      <path d="M18 28 Q10 22 8 16 Q10 20 14 26" stroke="#b08530" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g className="zodiac-leg-front"><path d="M36 35 L38 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" /><path d="M40 35 L41 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" /></g>
      <g className="zodiac-leg-back"><path d="M22 35 L21 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" /><path d="M26 35 L26 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" /></g>
    </svg>
  );
}

function IconRooster() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <ellipse cx="30" cy="28" rx="12" ry="10" fill="#c94c4c" />
      <ellipse cx="30" cy="26" rx="10" ry="8" fill="#d96666" opacity="0.3" />
      <ellipse cx="42" cy="18" rx="6" ry="6" fill="#c94c4c" />
      <circle cx="44" cy="17" r="1" fill="#2c2417" />
      <path d="M48 18 L52 17 L48 20" fill="#c9a050" />
      <path d="M40 12 Q42 6 44 8 Q42 8 40 12" fill="#c94c4c" />
      <path d="M42 12 Q44 6 46 8" fill="#d96666" opacity="0.7" />
      <path d="M44 20 L46 22 L44 22" fill="#c94c4c" opacity="0.7" />
      {/* Tail feathers */}
      <path d="M18 26 Q10 18 8 12" stroke="#3d7a82" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M18 28 Q12 22 10 16" stroke="#b08530" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M18 24 Q12 16 12 10" stroke="#7dad8a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <g className="zodiac-leg-front"><path d="M34 36 L36 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" /></g>
      <g className="zodiac-leg-back"><path d="M26 36 L25 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" /></g>
    </svg>
  );
}

function IconDog() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <ellipse cx="30" cy="28" rx="14" ry="9" fill="#b08530" />
      <ellipse cx="44" cy="22" rx="7" ry="6" fill="#b08530" />
      <circle cx="47" cy="20" r="1" fill="#2c2417" />
      <ellipse cx="50" cy="23" rx="3" ry="2" fill="#8b6232" />
      <circle cx="51" cy="22.5" r="0.7" fill="#2c2417" />
      <path d="M40 16 Q38 10 36 14" fill="#b08530" />
      <path d="M46 16 Q48 10 50 14" fill="#b08530" />
      <path d="M16 26 Q10 22 8 26 Q10 28 14 28" stroke="#b08530" strokeWidth="2" fill="none" strokeLinecap="round" />
      <g className="zodiac-leg-front"><path d="M38 35 L39 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" /><path d="M42 35 L43 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" /></g>
      <g className="zodiac-leg-back"><path d="M20 35 L19 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" /><path d="M24 35 L24 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" /></g>
    </svg>
  );
}

function IconPig() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      <ellipse cx="30" cy="28" rx="16" ry="11" fill="#e8b4b8" />
      <ellipse cx="46" cy="24" rx="8" ry="7" fill="#e8b4b8" />
      <circle cx="49" cy="22" r="1" fill="#2c2417" />
      <ellipse cx="52" cy="25" rx="3.5" ry="2.5" fill="#d9a0a6" />
      <circle cx="51" cy="25" r="0.6" fill="#c08088" />
      <circle cx="53" cy="25" r="0.6" fill="#c08088" />
      <path d="M42 18 Q40 14 42 16" fill="#e8b4b8" />
      <path d="M48 18 Q50 14 48 16" fill="#e8b4b8" />
      <path d="M14 28 Q12 26 10 28 Q12 30 14 30" fill="#e8b4b8" stroke="#d9a0a6" strokeWidth="0.5" />
      <g className="zodiac-leg-front"><path d="M38 37 L39 44" stroke="#e8b4b8" strokeWidth="2.5" strokeLinecap="round" /><path d="M42 37 L43 44" stroke="#e8b4b8" strokeWidth="2.5" strokeLinecap="round" /></g>
      <g className="zodiac-leg-back"><path d="M20 37 L19 44" stroke="#e8b4b8" strokeWidth="2.5" strokeLinecap="round" /><path d="M24 37 L24 44" stroke="#e8b4b8" strokeWidth="2.5" strokeLinecap="round" /></g>
    </svg>
  );
}

interface ZodiacAnimalProps {
  shamsiYear: number;
}

export function ZodiacAnimal({ shamsiYear }: ZodiacAnimalProps) {
  const index = getZodiacIndex(shamsiYear);
  const animal = ZODIAC_ANIMALS[index];
  const Icon = animal.icon;

  return (
    <div
      className="zodiac-walk pointer-events-none fixed bottom-6 z-10"
      role="img"
      aria-label={`Year of the ${animal.en} — سال ${animal.fa}`}
    >
      <Icon />
    </div>
  );
}
