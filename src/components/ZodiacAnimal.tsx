import { type ReactNode, useRef, useEffect } from 'react';

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

/* ── All 12 animals, detailed illustrated style ── */

function IconMouse() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body */}
      <ellipse cx="28" cy="30" rx="14" ry="8" fill="#b08530" />
      <ellipse cx="28" cy="29" rx="12" ry="6.5" fill="#c9a050" opacity="0.35" />
      {/* Head */}
      <ellipse cx="44" cy="24" rx="8" ry="7" fill="#b08530" />
      <ellipse cx="46" cy="23" rx="6" ry="5" fill="#c9a050" opacity="0.25" />
      {/* Ears — large round */}
      <ellipse cx="38" cy="16" rx="4.5" ry="5.5" fill="#b08530" />
      <ellipse cx="38" cy="16" rx="3" ry="4" fill="#e8b4b8" opacity="0.4" />
      <ellipse cx="45" cy="15" rx="4.5" ry="5.5" fill="#b08530" />
      <ellipse cx="45" cy="15" rx="3" ry="4" fill="#e8b4b8" opacity="0.4" />
      {/* Eye */}
      <circle cx="47" cy="22" r="1.2" fill="#2c2417" />
      <circle cx="47.3" cy="21.7" r="0.4" fill="#fefdf8" />
      {/* Nose */}
      <ellipse cx="51" cy="25" rx="1.5" ry="1" fill="#8b6232" />
      {/* Whiskers */}
      <line x1="50" y1="24" x2="58" y2="22" stroke="#c9a050" strokeWidth="0.5" opacity="0.6" />
      <line x1="50" y1="25" x2="58" y2="25" stroke="#c9a050" strokeWidth="0.5" opacity="0.6" />
      <line x1="50" y1="26" x2="57" y2="28" stroke="#c9a050" strokeWidth="0.5" opacity="0.6" />
      {/* Tail — long thin curve */}
      <path d="M14 30 Q6 26 2 22 Q0 18 2 20 Q4 24 8 28" stroke="#c9a050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Legs */}
      <g className="zodiac-leg-front">
        <path d="M38 35 L39 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" />
        <path d="M42 35 L43 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="zodiac-leg-back">
        <path d="M20 35 L19 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 35 L24 44" stroke="#b08530" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Paws */}
      <g className="zodiac-leg-front">
        <circle cx="39" cy="44.5" r="1.2" fill="#8b6232" />
        <circle cx="43" cy="44.5" r="1.2" fill="#8b6232" />
      </g>
      <g className="zodiac-leg-back">
        <circle cx="19" cy="44.5" r="1.2" fill="#8b6232" />
        <circle cx="24" cy="44.5" r="1.2" fill="#8b6232" />
      </g>
    </svg>
  );
}

function IconCow() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body */}
      <ellipse cx="28" cy="26" rx="17" ry="11" fill="#f0e6d3" />
      <ellipse cx="28" cy="25" rx="15" ry="9" fill="#fefdf8" opacity="0.3" />
      {/* Spots */}
      <ellipse cx="22" cy="24" rx="5" ry="4" fill="#6b4226" opacity="0.35" />
      <ellipse cx="34" cy="28" rx="4" ry="3" fill="#6b4226" opacity="0.3" />
      <ellipse cx="26" cy="30" rx="3" ry="2.5" fill="#6b4226" opacity="0.25" />
      {/* Head */}
      <ellipse cx="48" cy="20" rx="8" ry="7" fill="#f0e6d3" />
      <ellipse cx="50" cy="19" rx="6" ry="5" fill="#fefdf8" opacity="0.25" />
      {/* Horns */}
      <path d="M42 14 Q40 8 38 10" stroke="#c9a050" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M46 13 Q48 7 50 9" stroke="#c9a050" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Ears */}
      <path d="M40 16 Q37 14 38 18" fill="#f0e6d3" stroke="#d4c4a8" strokeWidth="0.5" />
      <path d="M50 14 Q53 12 52 16" fill="#f0e6d3" stroke="#d4c4a8" strokeWidth="0.5" />
      {/* Eye */}
      <circle cx="50" cy="18" r="1.2" fill="#2c2417" />
      <circle cx="50.3" cy="17.7" r="0.4" fill="#fefdf8" />
      {/* Muzzle */}
      <ellipse cx="54" cy="22" rx="4" ry="3" fill="#e8b4b8" opacity="0.5" />
      <circle cx="53" cy="22.5" r="0.5" fill="#c08088" />
      <circle cx="55" cy="22.5" r="0.5" fill="#c08088" />
      {/* Tail */}
      <path d="M11 24 Q6 20 4 16" stroke="#6b4226" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <ellipse cx="4" cy="15" rx="1.5" ry="2.5" fill="#6b4226" opacity="0.6" />
      {/* Legs */}
      <g className="zodiac-leg-front">
        <path d="M38 35 L39 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 35 L43 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="zodiac-leg-back">
        <path d="M18 35 L17 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M22 35 L22 44" stroke="#f0e6d3" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Hooves */}
      <g className="zodiac-leg-front">
        <rect x="38" y="43" width="3" height="2" rx="1" fill="#6b4226" />
        <rect x="42" y="43" width="3" height="2" rx="1" fill="#6b4226" />
      </g>
      <g className="zodiac-leg-back">
        <rect x="16" y="43" width="3" height="2" rx="1" fill="#6b4226" />
        <rect x="21" y="43" width="3" height="2" rx="1" fill="#6b4226" />
      </g>
    </svg>
  );
}

function IconLeopard() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body — sleek */}
      <ellipse cx="30" cy="26" rx="16" ry="9" fill="#c9a050" />
      <ellipse cx="30" cy="25" rx="14" ry="7" fill="#d4b060" opacity="0.3" />
      {/* Rosette spots */}
      {[[20,24],[24,28],[28,24],[32,28],[36,24],[24,22],[32,22]].map(([x,y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="2" fill="none" stroke="#8b6232" strokeWidth="0.8" opacity="0.5" />
          <circle cx={x} cy={y} r="0.6" fill="#8b6232" opacity="0.3" />
        </g>
      ))}
      {/* Head */}
      <ellipse cx="48" cy="20" rx="7" ry="6" fill="#c9a050" />
      <ellipse cx="50" cy="19" rx="5" ry="4" fill="#d4b060" opacity="0.3" />
      {/* Ears — rounded */}
      <ellipse cx="43" cy="14" rx="2.5" ry="3" fill="#c9a050" />
      <ellipse cx="43" cy="14" rx="1.5" ry="2" fill="#8b6232" opacity="0.3" />
      <ellipse cx="48" cy="13" rx="2.5" ry="3" fill="#c9a050" />
      <ellipse cx="48" cy="13" rx="1.5" ry="2" fill="#8b6232" opacity="0.3" />
      {/* Eye */}
      <circle cx="50" cy="18" r="1.2" fill="#2c2417" />
      <circle cx="50.3" cy="17.7" r="0.4" fill="#c9a050" />
      {/* Nose */}
      <ellipse cx="54" cy="21" rx="1.5" ry="1" fill="#8b6232" />
      {/* Whiskers */}
      <line x1="54" y1="20" x2="60" y2="18" stroke="#d4b060" strokeWidth="0.4" opacity="0.5" />
      <line x1="54" y1="21" x2="60" y2="21" stroke="#d4b060" strokeWidth="0.4" opacity="0.5" />
      <line x1="54" y1="22" x2="59" y2="24" stroke="#d4b060" strokeWidth="0.4" opacity="0.5" />
      {/* Tail — long curving up */}
      <path d="M14 24 Q8 20 4 22 Q2 24 4 26 Q6 24 8 22" stroke="#c9a050" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M4 26 Q2 28 4 28" fill="#8b6232" opacity="0.5" />
      {/* Legs */}
      <g className="zodiac-leg-front">
        <path d="M40 33 L41 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 33 L45 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="zodiac-leg-back">
        <path d="M20 33 L19 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 33 L24 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Paws */}
      <g className="zodiac-leg-front">
        <ellipse cx="41" cy="44.5" rx="1.5" ry="1" fill="#8b6232" />
        <ellipse cx="45" cy="44.5" rx="1.5" ry="1" fill="#8b6232" />
      </g>
      <g className="zodiac-leg-back">
        <ellipse cx="19" cy="44.5" rx="1.5" ry="1" fill="#8b6232" />
        <ellipse cx="24" cy="44.5" rx="1.5" ry="1" fill="#8b6232" />
      </g>
    </svg>
  );
}

function IconRabbit() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body */}
      <ellipse cx="28" cy="30" rx="14" ry="9" fill="#f0e6d3" />
      <ellipse cx="28" cy="29" rx="12" ry="7" fill="#fefdf8" opacity="0.3" />
      {/* Head */}
      <ellipse cx="44" cy="24" rx="7" ry="6.5" fill="#f0e6d3" />
      <ellipse cx="45" cy="23" rx="5" ry="5" fill="#fefdf8" opacity="0.25" />
      {/* Long ears */}
      <ellipse cx="40" cy="10" rx="2.5" ry="9" fill="#f0e6d3" transform="rotate(-8 40 10)" />
      <ellipse cx="40" cy="10" rx="1.5" ry="7" fill="#e8b4b8" opacity="0.35" transform="rotate(-8 40 10)" />
      <ellipse cx="46" cy="9" rx="2.5" ry="9" fill="#f0e6d3" transform="rotate(5 46 9)" />
      <ellipse cx="46" cy="9" rx="1.5" ry="7" fill="#e8b4b8" opacity="0.35" transform="rotate(5 46 9)" />
      {/* Eye */}
      <circle cx="47" cy="22" r="1.3" fill="#2c2417" />
      <circle cx="47.4" cy="21.7" r="0.4" fill="#fefdf8" />
      {/* Nose */}
      <ellipse cx="50" cy="25" rx="1.2" ry="0.8" fill="#e8b4b8" />
      {/* Whiskers */}
      <line x1="50" y1="24" x2="56" y2="22" stroke="#d4c4a8" strokeWidth="0.4" opacity="0.5" />
      <line x1="50" y1="25.5" x2="56" y2="26" stroke="#d4c4a8" strokeWidth="0.4" opacity="0.5" />
      {/* Cotton tail */}
      <circle cx="14" cy="28" r="3" fill="#fefdf8" />
      <circle cx="13" cy="27" r="2" fill="#fefdf8" opacity="0.8" />
      {/* Front legs */}
      <g className="zodiac-leg-front">
        <path d="M40 35 L41 44" stroke="#f0e6d3" strokeWidth="2" strokeLinecap="round" />
        <path d="M44 35 L44 44" stroke="#f0e6d3" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Back legs — larger (rabbit hind legs) */}
      <g className="zodiac-leg-back">
        <path d="M20 33 Q17 38 16 44" stroke="#f0e6d3" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 33 Q22 38 22 44" stroke="#f0e6d3" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* Paws */}
      <g className="zodiac-leg-front">
        <ellipse cx="41" cy="44.5" rx="1.2" ry="0.8" fill="#d4c4a8" />
        <ellipse cx="44" cy="44.5" rx="1.2" ry="0.8" fill="#d4c4a8" />
      </g>
      <g className="zodiac-leg-back">
        <ellipse cx="16" cy="44.5" rx="2" ry="1" fill="#d4c4a8" />
        <ellipse cx="22" cy="44.5" rx="2" ry="1" fill="#d4c4a8" />
      </g>
    </svg>
  );
}

function IconWhale() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body — streamlined */}
      <path d="M8 28 Q8 16 22 14 Q38 12 52 18 Q60 22 58 28 Q56 36 40 38 Q22 40 12 34 Q8 32 8 28Z" fill="#3d7a82" />
      {/* Belly — lighter */}
      <path d="M14 32 Q22 38 40 36 Q52 34 56 30 Q54 36 40 38 Q22 40 14 34Z" fill="#5b9ea6" opacity="0.35" />
      {/* Body highlight */}
      <path d="M12 24 Q18 16 30 14 Q40 13 48 18" fill="#5b9ea6" opacity="0.2" />
      {/* Eye */}
      <circle cx="52" cy="22" r="1.5" fill="#2c2417" />
      <circle cx="52.4" cy="21.6" r="0.5" fill="#5b9ea6" />
      {/* Mouth line */}
      <path d="M56 26 Q58 26 60 25" stroke="#2c6a72" strokeWidth="0.8" fill="none" strokeLinecap="round" />
      {/* Dorsal fin */}
      <path d="M28 14 Q30 6 34 10 Q32 12 30 14" fill="#3d7a82" />
      {/* Pectoral fin */}
      <path d="M40 32 Q44 36 48 34 Q44 34 40 32" fill="#2c6a72" opacity="0.5" />
      {/* Tail flukes */}
      <path d="M8 26 Q2 18 0 14 Q2 18 6 22" fill="#3d7a82" />
      <path d="M8 30 Q2 34 0 38 Q2 34 6 30" fill="#3d7a82" />
      <path d="M8 26 L8 30" stroke="#2c6a72" strokeWidth="0.5" />
      {/* Blowhole spout */}
      <path d="M36 12 Q34 6 32 2" stroke="#5b9ea6" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M36 12 Q38 6 40 4" stroke="#5b9ea6" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.3" />
    </svg>
  );
}

function IconSnake() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body — sinuous S-curve */}
      <path d="M6 40 Q6 30 14 28 Q22 26 26 30 Q30 34 36 32 Q42 30 44 26 Q46 22 50 20 Q54 18 56 16" stroke="#7dad8a" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Body highlight */}
      <path d="M6 40 Q6 30 14 28 Q22 26 26 30 Q30 34 36 32 Q42 30 44 26 Q46 22 50 20 Q54 18 56 16" stroke="#5a9a6a" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.35" />
      {/* Scale pattern */}
      {[[10,34],[16,28],[22,28],[28,32],[34,32],[40,28],[46,24],[52,18]].map(([x,y], i) => (
        <path key={i} d={`M${x-1} ${y} Q${x} ${y-1.5} ${x+1} ${y}`} stroke="#4a8a5a" strokeWidth="0.6" fill="none" opacity="0.4" />
      ))}
      {/* Diamond head */}
      <path d="M54 14 Q56 10 60 12 Q62 14 60 16 Q58 18 56 18 Q54 18 54 14Z" fill="#7dad8a" />
      <path d="M56 12 Q58 11 60 12" fill="#5a9a6a" opacity="0.3" />
      {/* Eye */}
      <circle cx="58" cy="13.5" r="1" fill="#2c2417" />
      <circle cx="58.3" cy="13.2" r="0.3" fill="#c9a050" />
      {/* Forked tongue */}
      <path d="M61 15 L63 14" stroke="#c94c4c" strokeWidth="0.7" fill="none" strokeLinecap="round" />
      <path d="M61 15 L63 16" stroke="#c94c4c" strokeWidth="0.7" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function IconSheep() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Fluffy wool body — overlapping circles */}
      {[[22,24],[26,22],[30,24],[34,22],[28,28],[32,28],[24,28],[36,26],[20,26]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#f0e6d3" />
      ))}
      {/* Wool highlight */}
      {[[24,22],[30,22],[34,20],[28,26]].map(([x,y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="#fefdf8" opacity="0.4" />
      ))}
      {/* Head — dark face */}
      <ellipse cx="44" cy="22" rx="6" ry="5.5" fill="#2c2417" />
      <ellipse cx="45" cy="21" rx="4.5" ry="4" fill="#3d3020" opacity="0.5" />
      {/* Eye */}
      <circle cx="46" cy="21" r="1" fill="#fefdf8" />
      <circle cx="46" cy="21" r="0.5" fill="#2c2417" />
      {/* Ears */}
      <path d="M40 18 Q37 16 38 20" fill="#2c2417" />
      <path d="M47 17 Q50 15 49 19" fill="#2c2417" />
      {/* Nose */}
      <ellipse cx="48" cy="24" rx="1" ry="0.6" fill="#4a3a28" />
      {/* Legs — thin dark */}
      <g className="zodiac-leg-front">
        <path d="M36 31 L37 44" stroke="#2c2417" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 31 L41 44" stroke="#2c2417" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="zodiac-leg-back">
        <path d="M20 31 L19 44" stroke="#2c2417" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 31 L24 44" stroke="#2c2417" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Hooves */}
      <g className="zodiac-leg-front">
        <rect x="36" y="43" width="2.5" height="2" rx="1" fill="#1a1612" />
        <rect x="40" y="43" width="2.5" height="2" rx="1" fill="#1a1612" />
      </g>
      <g className="zodiac-leg-back">
        <rect x="18" y="43" width="2.5" height="2" rx="1" fill="#1a1612" />
        <rect x="23" y="43" width="2.5" height="2" rx="1" fill="#1a1612" />
      </g>
    </svg>
  );
}

function IconMonkey() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body */}
      <ellipse cx="28" cy="28" rx="13" ry="9" fill="#8b6232" />
      <ellipse cx="28" cy="27" rx="11" ry="7" fill="#a07038" opacity="0.35" />
      {/* Head */}
      <ellipse cx="44" cy="18" rx="8" ry="7.5" fill="#8b6232" />
      {/* Face — lighter muzzle area */}
      <ellipse cx="46" cy="20" rx="5.5" ry="5" fill="#c9a050" opacity="0.5" />
      {/* Ears — large round */}
      <circle cx="36" cy="14" r="4" fill="#8b6232" />
      <circle cx="36" cy="14" r="2.5" fill="#c9a050" opacity="0.4" />
      <circle cx="52" cy="14" r="4" fill="#8b6232" />
      <circle cx="52" cy="14" r="2.5" fill="#c9a050" opacity="0.4" />
      {/* Eyes */}
      <circle cx="42" cy="17" r="1.3" fill="#2c2417" />
      <circle cx="42.3" cy="16.7" r="0.4" fill="#fefdf8" />
      <circle cx="48" cy="17" r="1.3" fill="#2c2417" />
      <circle cx="48.3" cy="16.7" r="0.4" fill="#fefdf8" />
      {/* Nose */}
      <ellipse cx="45" cy="20.5" rx="1.5" ry="1" fill="#6b4226" />
      {/* Mouth */}
      <path d="M43 22 Q45 24 47 22" stroke="#6b4226" strokeWidth="0.6" fill="none" />
      {/* Tail — curled */}
      <path d="M15 26 Q8 20 6 14 Q4 10 6 12 Q8 16 10 22" stroke="#8b6232" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M6 12 Q4 10 6 8 Q8 10 6 12" fill="#8b6232" />
      {/* Arms */}
      <path d="M38 24 Q42 28 44 32" stroke="#8b6232" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Legs */}
      <g className="zodiac-leg-front">
        <path d="M36 35 L38 44" stroke="#8b6232" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 35 L41 44" stroke="#8b6232" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="zodiac-leg-back">
        <path d="M20 35 L19 44" stroke="#8b6232" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 35 L24 44" stroke="#8b6232" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Hands/feet */}
      <g className="zodiac-leg-front">
        <ellipse cx="38" cy="44.5" rx="1.5" ry="1" fill="#6b4226" />
        <ellipse cx="41" cy="44.5" rx="1.5" ry="1" fill="#6b4226" />
      </g>
      <g className="zodiac-leg-back">
        <ellipse cx="19" cy="44.5" rx="1.5" ry="1" fill="#6b4226" />
        <ellipse cx="24" cy="44.5" rx="1.5" ry="1" fill="#6b4226" />
      </g>
    </svg>
  );
}

function IconRooster() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body */}
      <ellipse cx="30" cy="28" rx="13" ry="10" fill="#c94c4c" />
      <ellipse cx="30" cy="26" rx="11" ry="8" fill="#d96666" opacity="0.3" />
      {/* Wing detail */}
      <path d="M24 24 Q28 20 34 24 Q30 22 26 26" fill="#a03030" opacity="0.4" />
      <path d="M22 28 Q26 24 34 26" stroke="#a03030" strokeWidth="0.6" fill="none" opacity="0.4" />
      {/* Head */}
      <ellipse cx="44" cy="16" rx="6" ry="6" fill="#c94c4c" />
      <ellipse cx="45" cy="15" rx="4.5" ry="4.5" fill="#d96666" opacity="0.3" />
      {/* Comb — prominent red */}
      <path d="M40 10 Q42 4 44 8 Q46 4 48 8 Q46 6 44 10 Q42 6 40 10" fill="#c94c4c" />
      <path d="M41 10 Q43 5 45 9" fill="#d96666" opacity="0.5" />
      {/* Eye */}
      <circle cx="46" cy="15" r="1.1" fill="#2c2417" />
      <circle cx="46.3" cy="14.7" r="0.35" fill="#fefdf8" />
      {/* Beak */}
      <path d="M50 16 L54 15 L50 18" fill="#c9a050" />
      <line x1="50" y1="17" x2="54" y2="15.5" stroke="#b08530" strokeWidth="0.5" />
      {/* Wattle */}
      <path d="M48 19 Q50 22 48 22 Q46 22 48 19" fill="#c94c4c" opacity="0.8" />
      {/* Tail feathers — colorful arcs */}
      <path d="M17 24 Q10 16 6 8" stroke="#3d7a82" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M17 26 Q10 20 8 12" stroke="#b08530" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M17 22 Q12 14 10 6" stroke="#7dad8a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M18 28 Q12 24 10 18" stroke="#c9a050" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* Legs — thin with spurs */}
      <g className="zodiac-leg-front">
        <path d="M36 36 L38 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="zodiac-leg-back">
        <path d="M26 36 L25 44" stroke="#c9a050" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* Feet with toes */}
      <g className="zodiac-leg-front">
        <path d="M36 44 L38 44 L40 45" stroke="#c9a050" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M38 44 L36 45" stroke="#c9a050" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
      <g className="zodiac-leg-back">
        <path d="M23 44 L25 44 L27 45" stroke="#c9a050" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M25 44 L23 45" stroke="#c9a050" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function IconDog() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body */}
      <ellipse cx="28" cy="26" rx="15" ry="9" fill="#b08530" />
      <ellipse cx="28" cy="25" rx="13" ry="7" fill="#c9a050" opacity="0.3" />
      {/* Chest — lighter */}
      <ellipse cx="38" cy="30" rx="5" ry="4" fill="#c9a050" opacity="0.3" />
      {/* Head */}
      <ellipse cx="46" cy="20" rx="7" ry="6.5" fill="#b08530" />
      <ellipse cx="47" cy="19" rx="5.5" ry="5" fill="#c9a050" opacity="0.25" />
      {/* Ears — floppy */}
      <path d="M40 16 Q36 10 34 14 Q36 16 38 18" fill="#8b6232" />
      <path d="M48 15 Q52 10 54 14 Q52 16 50 17" fill="#8b6232" />
      {/* Eye */}
      <circle cx="48" cy="18" r="1.3" fill="#2c2417" />
      <circle cx="48.3" cy="17.7" r="0.4" fill="#fefdf8" />
      {/* Snout */}
      <ellipse cx="52" cy="22" rx="3.5" ry="2.5" fill="#c9a050" opacity="0.5" />
      {/* Nose */}
      <ellipse cx="54" cy="21" rx="1.5" ry="1" fill="#2c2417" />
      <circle cx="54.3" cy="20.7" r="0.3" fill="#3d3020" />
      {/* Mouth */}
      <path d="M52 23 Q54 25 56 23" stroke="#8b6232" strokeWidth="0.5" fill="none" />
      {/* Tongue */}
      <path d="M54 23.5 Q54 26 53 26" fill="#e8b4b8" />
      {/* Tail — upward wag */}
      <path d="M13 22 Q8 16 6 12 Q4 8 6 10 Q8 14 10 18" stroke="#b08530" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Legs */}
      <g className="zodiac-leg-front">
        <path d="M38 33 L39 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 33 L43 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="zodiac-leg-back">
        <path d="M18 33 L17 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M22 33 L22 44" stroke="#b08530" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Paws */}
      <g className="zodiac-leg-front">
        <ellipse cx="39" cy="44.5" rx="1.8" ry="1" fill="#8b6232" />
        <ellipse cx="43" cy="44.5" rx="1.8" ry="1" fill="#8b6232" />
      </g>
      <g className="zodiac-leg-back">
        <ellipse cx="17" cy="44.5" rx="1.8" ry="1" fill="#8b6232" />
        <ellipse cx="22" cy="44.5" rx="1.8" ry="1" fill="#8b6232" />
      </g>
    </svg>
  );
}

function IconPig() {
  return (
    <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden="true">
      {/* Body — round */}
      <ellipse cx="28" cy="28" rx="16" ry="11" fill="#e8b4b8" />
      <ellipse cx="28" cy="26" rx="14" ry="9" fill="#f0c4c8" opacity="0.35" />
      {/* Head */}
      <ellipse cx="46" cy="22" rx="8" ry="7.5" fill="#e8b4b8" />
      <ellipse cx="47" cy="21" rx="6" ry="6" fill="#f0c4c8" opacity="0.3" />
      {/* Ears — floppy forward */}
      <path d="M40 16 Q38 10 36 12 Q38 14 40 18" fill="#d9a0a6" />
      <path d="M48 15 Q50 10 52 12 Q50 14 48 17" fill="#d9a0a6" />
      {/* Eye */}
      <circle cx="48" cy="20" r="1.2" fill="#2c2417" />
      <circle cx="48.3" cy="19.7" r="0.4" fill="#fefdf8" />
      {/* Snout — flat round */}
      <ellipse cx="54" cy="23" rx="4" ry="3" fill="#d9a0a6" />
      <ellipse cx="54" cy="23" rx="3" ry="2.2" fill="#e8b4b8" opacity="0.5" />
      {/* Nostrils */}
      <circle cx="53" cy="23" r="0.8" fill="#c08088" />
      <circle cx="55.5" cy="23" r="0.8" fill="#c08088" />
      {/* Curly tail */}
      <path d="M12 24 Q8 22 6 24 Q4 26 6 28 Q8 26 8 24 Q8 22 10 24" stroke="#d9a0a6" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Legs — short sturdy */}
      <g className="zodiac-leg-front">
        <path d="M38 37 L39 44" stroke="#e8b4b8" strokeWidth="3" strokeLinecap="round" />
        <path d="M42 37 L43 44" stroke="#e8b4b8" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className="zodiac-leg-back">
        <path d="M18 37 L17 44" stroke="#e8b4b8" strokeWidth="3" strokeLinecap="round" />
        <path d="M22 37 L22 44" stroke="#e8b4b8" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* Trotters */}
      <g className="zodiac-leg-front">
        <rect x="37.5" y="43" width="3.5" height="2" rx="1" fill="#c08088" />
        <rect x="41.5" y="43" width="3.5" height="2" rx="1" fill="#c08088" />
      </g>
      <g className="zodiac-leg-back">
        <rect x="15.5" y="43" width="3.5" height="2" rx="1" fill="#c08088" />
        <rect x="20.5" y="43" width="3.5" height="2" rx="1" fill="#c08088" />
      </g>
    </svg>
  );
}

/* ── Food SVG icons per zodiac animal (24×24, same illustrated palette) ── */

const ZODIAC_FOOD_SVG: string[] = [
  // Mouse — cheese wedge
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 20L12 4l9 16Z" fill="#d4b060"/><path d="M5 18L12 6l7 12Z" fill="#c9a050" opacity=".4"/><circle cx="9" cy="15" r="1.5" fill="#b08530" opacity=".4"/><circle cx="15" cy="17" r="1.2" fill="#b08530" opacity=".35"/><circle cx="13" cy="12" r=".9" fill="#b08530" opacity=".3"/><line x1="3" y1="20" x2="21" y2="20" stroke="#b08530" stroke-width=".6"/></svg>',
  // Cow — grass tuft
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 22Q6 14 4 8" stroke="#7dad8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M12 22Q11 12 9 5" stroke="#7dad8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M17 22Q18 14 20 9" stroke="#7dad8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M9 22Q8 16 6 11" stroke="#5a9a6a" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/><path d="M15 22Q16 16 18 11" stroke="#5a9a6a" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/></svg>',
  // Leopard — meat chunk with bone
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="13" cy="14" rx="8" ry="6" fill="#c94c4c" transform="rotate(-15 13 14)"/><ellipse cx="13" cy="13" rx="6" ry="4" fill="#d96666" opacity=".4" transform="rotate(-15 13 13)"/><path d="M6 12Q8 10 10 12" stroke="#a03030" stroke-width=".6" fill="none" opacity=".5"/><circle cx="5" cy="7" r="2.2" fill="#f0e6d3"/><circle cx="5" cy="7" r="1.3" fill="#fefdf8" opacity=".3"/><path d="M6 8.5L8 11" stroke="#f0e6d3" stroke-width="2.5" stroke-linecap="round"/></svg>',
  // Rabbit — carrot
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5Q7 12 10 20Q12 23 14 20Q17 12 15 5Z" fill="#c9a050"/><path d="M10 7Q9 12 11 18Q12 20 13 18Q15 12 14 7Z" fill="#d4b060" opacity=".35"/><path d="M9 5Q8 2 6 0" stroke="#7dad8a" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M12 4Q12 1 13 0" stroke="#7dad8a" stroke-width="1.5" fill="none" stroke-linecap="round"/><path d="M15 5Q16 2 18 0" stroke="#5a9a6a" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".7"/><line x1="10" y1="11" x2="14" y2="11" stroke="#b08530" stroke-width=".4" opacity=".3"/><line x1="10.5" y1="15" x2="13.5" y2="15" stroke="#b08530" stroke-width=".4" opacity=".3"/></svg>',
  // Whale — small fish
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 12Q8 6 14 6Q20 6 20 12Q20 18 14 18Q8 18 6 12Z" fill="#5b9ea6"/><path d="M8 12Q10 8 14 8Q18 8 18 12" fill="#3d7a82" opacity=".3"/><path d="M5 12L2 8V16Z" fill="#5b9ea6"/><circle cx="17" cy="11" r="1.2" fill="#2c2417"/><circle cx="17.3" cy="10.7" r=".4" fill="#5b9ea6"/><path d="M12 7Q13 4 14 7" fill="#3d7a82" opacity=".5"/></svg>',
  // Snake — egg
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="13" rx="7" ry="9" fill="#f0e6d3"/><ellipse cx="12" cy="12" rx="5.5" ry="7.5" fill="#fefdf8" opacity=".4"/><ellipse cx="10" cy="10" rx="2" ry="3" fill="#fefdf8" opacity=".3" transform="rotate(-15 10 10)"/><ellipse cx="12" cy="13" rx="7" ry="9" fill="none" stroke="#d4c4a8" stroke-width=".5" opacity=".5"/></svg>',
  // Horse — grass tuft
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 22Q6 14 4 8" stroke="#7dad8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M12 22Q11 12 9 5" stroke="#7dad8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M17 22Q18 14 20 9" stroke="#7dad8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M9 22Q8 16 6 11" stroke="#5a9a6a" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/><path d="M15 22Q16 16 18 11" stroke="#5a9a6a" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/></svg>',
  // Sheep — grass tuft
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 22Q6 14 4 8" stroke="#7dad8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M12 22Q11 12 9 5" stroke="#7dad8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M17 22Q18 14 20 9" stroke="#7dad8a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M9 22Q8 16 6 11" stroke="#5a9a6a" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/><path d="M15 22Q16 16 18 11" stroke="#5a9a6a" stroke-width="1.5" fill="none" stroke-linecap="round" opacity=".6"/></svg>',
  // Monkey — banana
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18Q4 12 8 6Q12 2 16 4Q14 4 10 8Q6 14 8 20Z" fill="#d4b060"/><path d="M7 16Q6 12 9 7Q12 4 14 5Q12 5 9 9Q7 14 8 18Z" fill="#c9a050" opacity=".5"/><path d="M6 18Q8 20 8 20" stroke="#b08530" stroke-width=".8" fill="none"/><path d="M16 4Q17 3 18 4" stroke="#8b6232" stroke-width="1" stroke-linecap="round"/></svg>',
  // Rooster — scattered seeds
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="8" cy="16" rx="2" ry="1.5" fill="#c9a050" transform="rotate(-20 8 16)"/><ellipse cx="14" cy="14" rx="2" ry="1.5" fill="#d4b060" transform="rotate(15 14 14)"/><ellipse cx="10" cy="10" rx="2" ry="1.5" fill="#c9a050" transform="rotate(-10 10 10)"/><ellipse cx="16" cy="18" rx="2" ry="1.5" fill="#b08530" transform="rotate(5 16 18)"/><ellipse cx="6" cy="11" rx="1.8" ry="1.3" fill="#d4b060" transform="rotate(-30 6 11)"/><ellipse cx="18" cy="10" rx="1.8" ry="1.3" fill="#c9a050" transform="rotate(20 18 10)"/><ellipse cx="12" cy="19" rx="1.8" ry="1.3" fill="#b08530" transform="rotate(-5 12 19)" opacity=".8"/></svg>',
  // Dog — bone
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="10" width="12" height="4" rx="2" fill="#f0e6d3"/><circle cx="6" cy="10" r="3" fill="#f0e6d3"/><circle cx="6" cy="14" r="3" fill="#f0e6d3"/><circle cx="18" cy="10" r="3" fill="#f0e6d3"/><circle cx="18" cy="14" r="3" fill="#f0e6d3"/><circle cx="6" cy="9.5" r="1.5" fill="#fefdf8" opacity=".3"/><circle cx="18" cy="9.5" r="1.5" fill="#fefdf8" opacity=".3"/></svg>',
  // Pig — acorn
  '<svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10Q6 8 12 7Q18 8 18 10L18 12Q12 13 6 12Z" fill="#8b6232"/><path d="M7 9Q12 8 17 9" stroke="#6b4226" stroke-width=".5" fill="none" opacity=".5"/><ellipse cx="12" cy="16" rx="6" ry="7" fill="#c9a050"/><ellipse cx="12" cy="15" rx="4.5" ry="5.5" fill="#d4b060" opacity=".35"/><ellipse cx="10" cy="14" rx="1.5" ry="2" fill="#d4b060" opacity=".3" transform="rotate(-8 10 14)"/><path d="M12 7V4" stroke="#6b4226" stroke-width="1.5" stroke-linecap="round"/></svg>',
];

interface ZodiacAnimalProps {
  shamsiYear: number;
}

export function ZodiacAnimal({ shamsiYear }: ZodiacAnimalProps) {
  const index = getZodiacIndex(shamsiYear);
  const animal = ZODIAC_ANIMALS[index];
  const Icon = animal.icon;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const MARGIN = 80;
    const MIN_SCALE = 0.45;
    const MAX_SCALE = 1.4;
    const MIN_OPACITY = 0.2;
    const MAX_OPACITY = 0.65;
    const BASE_SPEED = 50;
    const ESCAPE_SPEED = 180;
    const STEER = 2.0;
    const ESCAPE_STEER = 5.0;
    const ESCAPE_DIST = 250;
    const FLEE_RADIUS = 100;
    const FOOD_COUNT = 4;
    const EAT_DURATION = 2.5;
    const EAT_FADE = 0.8;
    const FOOD_REACH = 30;
    const RESPAWN_MIN = 6;
    const RESPAWN_MAX = 12;

    const pickPos = () => ({
      x: MARGIN + Math.random() * Math.max(0, window.innerWidth - 2 * MARGIN),
      y: window.innerHeight * 0.1 + Math.random() * (window.innerHeight * 0.78),
    });

    const persp = (py: number) => {
      const yn = Math.max(0, Math.min(1, py / window.innerHeight));
      return {
        scale: MIN_SCALE + yn * (MAX_SCALE - MIN_SCALE),
        opacity: MIN_OPACITY + yn * (MAX_OPACITY - MIN_OPACITY),
        yn,
      };
    };

    /* ── Spawn food ── */
    const foodSvg = ZODIAC_FOOD_SVG[index];
    const foods: { el: HTMLDivElement; x: number; y: number; eaten: boolean; timer: number }[] = [];

    for (let i = 0; i < FOOD_COUNT; i++) {
      const pos = pickPos();
      const div = document.createElement('div');
      div.innerHTML = foodSvg;
      div.setAttribute('aria-hidden', 'true');
      div.style.cssText =
        'position:fixed;left:0;top:0;z-index:9;pointer-events:none;user-select:none;' +
        'will-change:transform,opacity;line-height:0;';
      document.body.appendChild(div);
      const p = persp(pos.y);
      div.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${p.scale})`;
      div.style.opacity = `${p.opacity}`;
      foods.push({ el: div, ...pos, eaten: false, timer: 0 });
    }

    /* ── Animal state ── */
    let x = -MARGIN;
    let y = window.innerHeight * 0.7;
    let vx = 30;
    let vy = 0;
    let target = pickPos();
    let facingRight = true;
    let prev = 0;
    let frame: number;
    let escaping = false;
    let escapeTimer = 0;
    let eating = false;
    let eatTimer = 0;
    let eatIdx = -1;
    let pointerX = -9999;
    let pointerY = -9999;
    let lastLegDur = '0.6';

    const flee = (px: number, py: number) => {
      const dx = (x + 32) - px;
      const dy = (y + 24) - py;
      const d = Math.hypot(dx, dy) || 1;
      target = {
        x: Math.max(MARGIN, Math.min(window.innerWidth - MARGIN, x + (dx / d) * ESCAPE_DIST)),
        y: Math.max(window.innerHeight * 0.05, Math.min(window.innerHeight * 0.9, y + (dy / d) * ESCAPE_DIST)),
      };
      escaping = true;
      escapeTimer = 1.2;
      if (eating) {
        eating = false;
        el.classList.remove('zodiac-eating');
        if (eatIdx >= 0 && !foods[eatIdx].eaten) {
          foods[eatIdx].el.style.opacity = `${persp(foods[eatIdx].y).opacity}`;
        }
        eatIdx = -1;
      }
    };

    const nearest = () => {
      let best = -1;
      let bd = Infinity;
      const ax = x + 32;
      const ay = y + 24;
      for (let i = 0; i < foods.length; i++) {
        if (foods[i].eaten) continue;
        const d = Math.hypot(foods[i].x + 12 - ax, foods[i].y + 12 - ay);
        if (d < bd) { bd = d; best = i; }
      }
      return best;
    };

    const onPointer = (e: PointerEvent) => { pointerX = e.clientX; pointerY = e.clientY; };
    document.addEventListener('pointermove', onPointer, { passive: true });
    document.addEventListener('pointerdown', onPointer, { passive: true });

    const step = (now: number) => {
      if (!prev) prev = now;
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;

      /* ── Respawn eaten food ── */
      for (const f of foods) {
        if (!f.eaten) continue;
        f.timer -= dt;
        if (f.timer <= 0) {
          const pos = pickPos();
          f.x = pos.x;
          f.y = pos.y;
          f.eaten = false;
          const p = persp(pos.y);
          f.el.style.transform = `translate(${pos.x}px, ${pos.y}px) scale(${p.scale})`;
          f.el.style.opacity = `${p.opacity}`;
        }
      }

      /* ── Escape cooldown ── */
      if (escaping) {
        escapeTimer -= dt;
        if (escapeTimer <= 0) escaping = false;
      }

      /* ── Eating ── */
      if (eating) {
        eatTimer -= dt;
        vx *= Math.pow(0.05, dt);
        vy *= Math.pow(0.05, dt);

        if (eatIdx >= 0 && eatTimer < EAT_FADE) {
          const baseOp = persp(foods[eatIdx].y).opacity;
          foods[eatIdx].el.style.opacity = `${Math.max(0, (eatTimer / EAT_FADE) * baseOp)}`;
        }

        if (eatTimer <= 0) {
          eating = false;
          el.classList.remove('zodiac-eating');
          if (eatIdx >= 0) {
            foods[eatIdx].eaten = true;
            foods[eatIdx].timer = RESPAWN_MIN + Math.random() * (RESPAWN_MAX - RESPAWN_MIN);
            foods[eatIdx].el.style.opacity = '0';
          }
          eatIdx = -1;
        }
      }

      const { scale, yn } = persp(y);

      /* ── Flee from pointer ── */
      if (!escaping && !eating) {
        const dp = Math.hypot(x + 32 - pointerX, y + 24 - pointerY);
        if (dp < FLEE_RADIUS * scale) flee(pointerX, pointerY);
      }

      /* ── Targeting: head toward nearest food, or roam randomly ── */
      const cx = x + 32;
      const cy = y + 24;

      if (!escaping && !eating) {
        const ni = nearest();
        if (ni >= 0) {
          const fcx = foods[ni].x + 12;
          const fcy = foods[ni].y + 12;
          target = { x: fcx, y: fcy };
          if (Math.hypot(fcx - cx, fcy - cy) < FOOD_REACH * scale) {
            eating = true;
            eatTimer = EAT_DURATION;
            eatIdx = ni;
            el.classList.add('zodiac-eating');
          }
        } else if (Math.hypot(target.x - cx, target.y - cy) < 25) {
          target = pickPos();
        }
      }

      /* ── Movement ── */
      if (!eating) {
        const dx = target.x - cx;
        const dy = target.y - cy;
        const dist = Math.hypot(dx, dy);
        const speed = (escaping ? ESCAPE_SPEED : BASE_SPEED) * scale;
        const steer = escaping ? ESCAPE_STEER : STEER;
        if (dist > 1) {
          vx += ((dx / dist) * speed - vx) * steer * dt;
          vy += ((dy / dist) * speed - vy) * steer * dt;
        }
      }

      x += vx * dt;
      y += vy * dt;

      if (Math.abs(vx) > 1) facingRight = vx > 0;

      const opacity = MIN_OPACITY + yn * (MAX_OPACITY - MIN_OPACITY);
      const sx = (facingRight ? 1 : -1) * scale;
      const currentSpeed = Math.hypot(vx, vy);
      const legDur = currentSpeed > 3
        ? (Math.round(Math.max(1.5, Math.min(8, 200 / currentSpeed))) / 10).toFixed(1)
        : '99';

      el.style.transform = `translate(${x}px, ${y}px) scale(${sx}, ${scale})`;
      el.style.opacity = `${opacity}`;
      if (legDur !== lastLegDur) {
        el.style.setProperty('--leg-dur', `${legDur}s`);
        lastLegDur = legDur;
      }

      frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', onPointer);
      document.removeEventListener('pointerdown', onPointer);
      foods.forEach(f => f.el.remove());
    };
  }, [index]);

  return (
    <div
      ref={ref}
      className="zodiac-roam fixed left-0 top-0 z-10"
      role="img"
      aria-label={`Year of the ${animal.en} — سال ${animal.fa}`}
    >
      <Icon />
    </div>
  );
}
