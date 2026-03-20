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
