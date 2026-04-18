import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);

const years = [2026, 2027, 2028, 2029, 2030];
const baseUrl = 'https://norouz.akhave.in';
const equinoxIsoByYear = {
  2026: '2026-03-20T14:45:53.000Z',
  2027: '2027-03-20T20:24:18.000Z',
  2028: '2028-03-20T02:16:32.000Z',
  2029: '2029-03-20T08:01:03.000Z',
  2030: '2030-03-20T13:51:15.000Z',
};

function buildPath(locale, year) {
  const parts = [locale, year ? String(year) : null].filter(Boolean);
  return parts.length ? `/${parts.join('/')}/` : '/';
}

function buildUrl(locale, year) {
  return `${baseUrl}${buildPath(locale, year)}`;
}

function buildYearsHubPath(locale) {
  const parts = [locale, 'years'].filter(Boolean);
  return `/${parts.join('/')}/`;
}

function buildYearsHubUrl(locale) {
  return `${baseUrl}${buildYearsHubPath(locale)}`;
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getShamsiYear(year) {
  return year - 621;
}

function formatDateTime(date, locale, timeZone) {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone,
  }).format(date);
}

function formatCompactDateTime(date, locale, timeZone) {
  return new Intl.DateTimeFormat(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
  }).format(date);
}

function getYearTimeInfo(year, fa) {
  if (!year || !equinoxIsoByYear[year]) return null;

  const date = new Date(equinoxIsoByYear[year]);
  return {
    iso: date.toISOString(),
    utc: formatDateTime(date, fa ? 'fa-IR' : 'en-US', 'UTC'),
    tehran: formatDateTime(date, fa ? 'fa-IR' : 'en-US', 'Asia/Tehran'),
    dateOnly: new Intl.DateTimeFormat(fa ? 'fa-IR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(date),
  };
}

function getOgImageKey(fa, year, pageKind = year ? 'year' : 'home') {
  if (pageKind === 'yearsHub') return fa ? 'fa-years' : 'en-years';
  return fa ? (year ? `fa-${year}` : 'fa-home') : (year ? `en-${year}` : 'en-home');
}

function getOgImagePath(fa, year, pageKind = year ? 'year' : 'home') {
  return `/og/${getOgImageKey(fa, year, pageKind)}.png`;
}

function getOgImageAlt(fa, year, pageKind = year ? 'year' : 'home') {
  if (pageKind === 'yearsHub') {
    return fa
      ? 'پوستر فهرست سال‌های نوروز با دسترسی به صفحهٔ سال‌های مختلف و زمان تحویل سال'
      : 'Nowruz years hub social preview card with links to multiple year pages and exact Tahvil timing';
  }

  if (fa) {
    return year
      ? `پوستر نوروز ${year} با زمان دقیق تحویل سال به وقت تهران و UTC`
      : 'پوستر شمارش معکوس نوروز با حال‌وهوای بهاری و زمان تحویل سال';
  }

  return year
    ? `Nowruz ${year} social preview card with exact Tahvil time in Tehran and UTC`
    : 'Nowruz Countdown social preview card with spring motifs and exact Tahvil timing';
}

function getOgImageUrl(fa, year, pageKind = year ? 'year' : 'home') {
  return `${baseUrl}${getOgImagePath(fa, year, pageKind)}`;
}

function getOgCardData(fa, year, pageKind = year ? 'year' : 'home') {
  const timeInfo = getYearTimeInfo(year, fa);

  if (pageKind === 'yearsHub') {
    if (fa) {
      return {
        eyebrow: 'Nowruz • Norouz • نوروز',
        title: 'همهٔ سال‌های نوروز',
        subtitle: 'مرور و مقایسهٔ زمان تحویل سال',
        body: [
          { label: 'سال‌ها', value: '۲۰۲۶ تا ۲۰۳۰' },
          { label: 'شامل', value: 'تهران، UTC و صفحهٔ هر سال' },
        ],
      };
    }

    return {
      eyebrow: 'Nowruz • Norouz • نوروز',
      title: 'All Nowruz years',
      subtitle: 'Browse and compare exact Tahvil time',
      body: [
        { label: 'Years', value: '2026 to 2030' },
        { label: 'Includes', value: 'Tehran, UTC, and year pages' },
      ],
    };
  }

  if (fa) {
    return {
      eyebrow: 'Nowruz • Norouz • نوروز',
      title: year ? `نوروز ${year}` : 'شمارش معکوس نوروز',
      subtitle: year ? 'زمان دقیق تحویل سال' : 'زمان دقیق تحویل سال، تهران و UTC',
      body: year
        ? [
            { label: 'تهران', value: timeInfo ? formatCompactDateTime(new Date(timeInfo.iso), 'fa-IR', 'Asia/Tehran') : '' },
            { label: 'UTC', value: timeInfo ? formatCompactDateTime(new Date(timeInfo.iso), 'fa-IR', 'UTC') : '' },
            { label: 'سال خورشیدی', value: String(getShamsiYear(year)) },
          ]
        : [
            { label: 'ویژگی', value: 'شمارش زنده تا لحظهٔ اعتدال بهاری' },
            { label: 'درباره', value: 'هفت‌سین، تحویل سال، تهران و UTC' },
          ],
    };
  }

  return {
    eyebrow: 'Nowruz • Norouz • نوروز',
    title: year ? `Nowruz ${year}` : 'Nowruz Countdown',
    subtitle: year ? 'Exact Tahvil time' : 'Exact Tahvil time, Tehran and UTC',
    body: year
      ? [
          { label: 'Tehran', value: timeInfo ? formatCompactDateTime(new Date(timeInfo.iso), 'en-US', 'Asia/Tehran') : '' },
          { label: 'UTC', value: timeInfo ? formatCompactDateTime(new Date(timeInfo.iso), 'en-US', 'UTC') : '' },
          { label: 'Solar Hijri', value: String(getShamsiYear(year)) },
        ]
      : [
          { label: 'Live', value: 'Countdown to the spring equinox' },
          { label: 'Includes', value: 'Haft-Sin, Tahvil, Tehran time and UTC' },
        ],
  };
}

function renderOgSvg(fa, year, pageKind = year ? 'year' : 'home') {
  const card = getOgCardData(fa, year, pageKind);
  const bodyBlocks = card.body.map((item, index) => {
    const x = 120 + index * 320;
    const width = index === 2 ? 260 : 280;

    return `
      <g transform="translate(${x}, 370)">
        <rect width="${width}" height="110" rx="24" fill="#fffaf0" stroke="#c8973e" stroke-width="1.1" opacity="0.96"/>
        <text x="26" y="38" font-family="${fa ? "'Vazirmatn', 'Arial', sans-serif" : "'Inter', 'Arial', sans-serif"}" font-size="20" font-weight="700" fill="#b08530">${escapeHtml(item.label)}</text>
        <text x="26" y="74" font-family="${fa ? "'Vazirmatn', 'Arial', sans-serif" : "'Inter', 'Arial', sans-serif"}" font-size="24" font-weight="600" fill="#2c2417">${escapeHtml(item.value)}</text>
      </g>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fefdf8"/>
      <stop offset="100%" stop-color="#f8f1df"/>
    </linearGradient>
    <pattern id="girih" x="0" y="0" width="84" height="84" patternUnits="userSpaceOnUse">
      <polygon points="42,6 47,18 59,12 51,24 63,28 51,34 59,46 47,40 42,52 37,40 25,46 33,34 21,28 33,24 25,12 37,18" fill="none" stroke="#c8973e" stroke-width="0.6" opacity="0.12"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#girih)"/>
  <rect x="34" y="34" width="1132" height="562" rx="20" fill="none" stroke="#c8973e" stroke-width="1.2" opacity="0.35"/>
  <rect x="54" y="54" width="1092" height="522" rx="18" fill="none" stroke="#c8973e" stroke-width="0.7" opacity="0.22"/>

  <circle cx="160" cy="120" r="18" fill="#e8b4b8" opacity="0.35"/>
  <circle cx="1040" cy="152" r="12" fill="#e8b4b8" opacity="0.3"/>
  <circle cx="1030" cy="500" r="16" fill="#e8b4b8" opacity="0.22"/>
  <circle cx="170" cy="510" r="12" fill="#7dad8a" opacity="0.2"/>

  <text x="600" y="120" text-anchor="middle" font-family="'Inter', 'Arial', sans-serif" font-size="22" font-weight="700" fill="#b08530" letter-spacing="3">${escapeHtml(card.eyebrow)}</text>
  <text x="600" y="220" text-anchor="middle" font-family="${fa ? "'Vazirmatn', 'Arial', sans-serif" : "'Inter', 'Georgia', serif"}" font-size="64" font-weight="800" fill="#2c2417">${escapeHtml(card.title)}</text>
  <text x="600" y="286" text-anchor="middle" font-family="${fa ? "'Vazirmatn', 'Arial', sans-serif" : "'Inter', 'Arial', sans-serif"}" font-size="30" font-weight="600" fill="#b08530">${escapeHtml(card.subtitle)}</text>

  <line x1="420" y1="315" x2="780" y2="315" stroke="#c8973e" stroke-width="1" opacity="0.28"/>
  <polygon points="600,308 607,315 600,322 593,315" fill="#c8973e" opacity="0.36"/>

  ${bodyBlocks}

  <text x="600" y="560" text-anchor="middle" font-family="'Inter', 'Arial', sans-serif" font-size="20" font-weight="600" fill="#2c2417" opacity="0.45" letter-spacing="2">norouz.akhave.in</text>
</svg>`;
}

async function generateOgImages() {
  const ogDir = fileURLToPath(new URL('../public/og/', import.meta.url));
  await fs.mkdir(ogDir, { recursive: true });
  const canRasterizePng = process.platform === 'darwin';

  const variants = [
    { fa: false, year: null, pageKind: 'home' },
    { fa: true, year: null, pageKind: 'home' },
    { fa: false, year: null, pageKind: 'yearsHub' },
    { fa: true, year: null, pageKind: 'yearsHub' },
    ...years.flatMap((year) => [
      { fa: false, year, pageKind: 'year' },
      { fa: true, year, pageKind: 'year' },
    ]),
  ];

  for (const variant of variants) {
    const key = getOgImageKey(variant.fa, variant.year, variant.pageKind);
    const svgPath = path.join(ogDir, `${key}.svg`);
    const pngPath = path.join(ogDir, `${key}.png`);
    const nextSvg = renderOgSvg(variant.fa, variant.year, variant.pageKind);
    let existingSvg = null;

    try {
      existingSvg = await fs.readFile(svgPath, 'utf8');
    } catch {
      existingSvg = null;
    }

    const svgChanged = existingSvg !== nextSvg;

    if (svgChanged) {
      await fs.writeFile(svgPath, nextSvg);
    }

    if (canRasterizePng) {
      const pngExists = await fs.access(pngPath).then(() => true).catch(() => false);
      if (svgChanged || !pngExists) {
        execFileSync('sips', ['-s', 'format', 'png', svgPath, '--out', pngPath], { stdio: 'ignore' });
      }
      continue;
    }

    try {
      await fs.access(pngPath);
    } catch {
      throw new Error(`Missing pre-rendered OG PNG for ${key}. Run the generator on macOS before shipping.`);
    }
  }
}

function getYearNavigation(locale, year, fa) {
  if (!year) return null;

  const index = years.indexOf(year);
  if (index === -1) return null;

  const previousYear = index > 0 ? years[index - 1] : null;
  const nextYear = index < years.length - 1 ? years[index + 1] : null;

  return {
    previousYear,
    nextYear,
    previousUrl: previousYear ? buildPath(locale, previousYear) : null,
    nextUrl: nextYear ? buildPath(locale, nextYear) : null,
    hubUrl: buildYearsHubPath(locale),
    allYears: years.map((itemYear) => ({
      year: itemYear,
      url: buildPath(locale, itemYear),
      label: fa ? `نوروز ${itemYear}` : `Nowruz ${itemYear}`,
      current: itemYear === year,
    })),
  };
}

function renderYearsHubPage(locale) {
  const fa = locale !== 'en';
  const canonical = buildYearsHubUrl(locale);
  const xDefault = buildYearsHubUrl(null);
  const en = buildYearsHubUrl('en');
  const faUrl = buildYearsHubUrl('fa');
  const ogImage = getOgImageUrl(fa, null, 'yearsHub');
  const ogImageAlt = getOgImageAlt(fa, null, 'yearsHub');
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        url: canonical,
        inLanguage: fa ? 'fa' : 'en',
        name: fa ? 'همهٔ سال‌های نوروز' : 'All Nowruz years',
        about: ['Nowruz', 'Norouz', 'نوروز', 'Persian New Year', 'Spring Equinox'],
      },
      {
        '@type': 'CollectionPage',
        url: canonical,
        inLanguage: fa ? 'fa' : 'en',
        name: fa ? 'مرکز سال‌های نوروز' : 'Nowruz years hub',
        description: fa
          ? 'فهرست همهٔ صفحه‌های نوروز با زمان دقیق تحویل سال برای سال‌های مختلف.'
          : 'A directory of Nowruz year pages with exact Tahvil time for multiple years.',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: fa ? 'نوروز' : 'Nowruz',
            item: buildUrl(locale, null),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: fa ? 'همهٔ سال‌ها' : 'All years',
            item: canonical,
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: fa ? 'فهرست سال‌های نوروز' : 'List of Nowruz years',
        numberOfItems: years.length,
        itemListElement: years.map((year, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: buildUrl(locale, year),
          name: fa ? `نوروز ${year}` : `Nowruz ${year}`,
        })),
      },
    ],
  };

  const cards = years.map((year) => {
    const timeInfo = getYearTimeInfo(year, fa);
    return `
      <article class="card">
        <h2${fa ? ' class="fa"' : ''} style="font-size:1.15rem;margin:0 0 .35rem;">
          <a href="${buildPath(locale, year)}" class="card-link">${escapeHtml(fa ? `نوروز ${year}` : `Nowruz ${year}`)}</a>
        </h2>
        <p${fa ? ' class="fa"' : ''} class="muted" style="margin:0 0 .5rem;">${escapeHtml(fa ? `سال خورشیدی ${getShamsiYear(year)}` : `Solar Hijri year ${getShamsiYear(year)}`)}</p>
        <p${fa ? ' class="fa"' : ''} style="margin:0 0 .35rem;">${escapeHtml(fa ? `تهران: ${timeInfo?.tehran ?? ''}` : `Tehran: ${timeInfo?.tehran ?? ''}`)}</p>
        <p${fa ? ' class="fa"' : ''} style="margin:0 0 .8rem;">${escapeHtml(`UTC: ${timeInfo?.utc ?? ''}`)}</p>
        <a href="${buildPath(locale, year)}"${fa ? ' class="fa card-cta"' : ' class="card-cta"'}>${escapeHtml(fa ? `مشاهدهٔ نوروز ${year}` : `Open Nowruz ${year}`)}</a>
      </article>`;
  }).join('');

  return `<!doctype html>
<html lang="${fa ? 'fa' : 'en'}" dir="${fa ? 'rtl' : 'ltr'}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(fa ? 'همهٔ سال‌های نوروز | زمان دقیق تحویل سال' : 'All Nowruz years | exact date and time')}</title>
    <meta name="description" content="${escapeHtml(fa ? 'فهرست همهٔ صفحه‌های نوروز با زمان دقیق تحویل سال به وقت تهران و UTC، برای مرور و مقایسهٔ سال‌های مختلف.' : 'Browse all available Nowruz year pages with exact Tahvil time in Tehran and UTC, and compare different years.')}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${xDefault}" />
    <link rel="alternate" hreflang="en" href="${en}" />
    <link rel="alternate" hreflang="fa" href="${faUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(fa ? 'همهٔ سال‌های نوروز | زمان دقیق تحویل سال' : 'All Nowruz years | exact date and time')}" />
    <meta property="og:description" content="${escapeHtml(fa ? 'فهرست همهٔ صفحه‌های نوروز با زمان دقیق تحویل سال به وقت تهران و UTC، برای مرور و مقایسهٔ سال‌های مختلف.' : 'Browse all available Nowruz year pages with exact Tahvil time in Tehran and UTC, and compare different years.')}" />
    <meta property="og:locale" content="${fa ? 'fa_IR' : 'en_US'}" />
    <meta property="og:site_name" content="Nowruz Countdown" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(fa ? 'همهٔ سال‌های نوروز | زمان دقیق تحویل سال' : 'All Nowruz years | exact date and time')}" />
    <meta name="twitter:description" content="${escapeHtml(fa ? 'فهرست همهٔ صفحه‌های نوروز با زمان دقیق تحویل سال به وقت تهران و UTC، برای مرور و مقایسهٔ سال‌های مختلف.' : 'Browse all available Nowruz year pages with exact Tahvil time in Tehran and UTC, and compare different years.')}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="color-scheme" content="light dark" />
    <script>
      (function() {
        var savedTheme = localStorage.getItem('theme');
        var isDark = savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', isDark);
      })();
    </script>
    <style>
      :root {
        color-scheme: light;
        --bg: #fefdf8;
        --text: #2b2118;
        --muted: #6e573e;
        --link: #b08530;
        --card-bg: rgba(255,250,240,.72);
        --card-border: rgba(176,133,48,.2);
        --control-bg: rgba(254,253,248,.86);
        --control-border: rgba(176,133,48,.24);
      }
      html.dark {
        color-scheme: dark;
        --bg: #17120d;
        --text: #f6efe3;
        --muted: #d3c0a0;
        --link: #d9af5a;
        --card-bg: rgba(34,26,20,.9);
        --card-border: rgba(217,175,90,.24);
        --control-bg: rgba(34,26,20,.88);
        --control-border: rgba(217,175,90,.24);
      }
      body { margin: 0; background: var(--bg); color: var(--text); font-family: Inter, system-ui, sans-serif; transition: background-color .2s ease, color .2s ease; }
      .wrap { max-width: 68rem; margin: 0 auto; padding: 3rem 1.25rem 4rem; }
      .fa { font-family: Vazirmatn, Inter, system-ui, sans-serif; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; }
      .toplinks { display:flex; flex-wrap:wrap; gap:.75rem; margin:0 0 1.5rem; ${fa ? 'direction:rtl;' : ''} }
      a { color: var(--link); }
      .muted { color: var(--muted); }
      .card { padding: 1rem 1.1rem; border: 1px solid var(--card-border); border-radius: 1rem; background: var(--card-bg); }
      .card-link { color: var(--text); text-decoration: none; }
      .card-cta { color: var(--link); text-decoration: none; font-weight: 700; }
      .controls { position: fixed; top: 1rem; right: 1rem; z-index: 20; display: flex; gap: .5rem; }
      .theme-toggle {
        border: 1px solid var(--control-border);
        background: var(--control-bg);
        color: var(--link);
        border-radius: 999px;
        width: 2.25rem;
        height: 2.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        cursor: pointer;
      }
      @media (max-width: 640px) {
        .wrap { padding-top: 4.5rem; }
      }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Vazirmatn:wght@400;700&display=swap" rel="stylesheet" />
    <script>
      (function() {
        var pathname = window.location.pathname;
        var forcedLocale = pathname === '/en/years/' ? 'en' : pathname === '/fa/years/' ? 'fa' : null;
        var savedLocale = localStorage.getItem('locale');
        if (!forcedLocale && savedLocale === 'en') {
          window.location.replace('/en/years/' + window.location.search + window.location.hash);
          return;
        }
        var locale = forcedLocale || savedLocale;
        if (locale !== 'en' && locale !== 'fa') locale = 'fa';
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
        localStorage.setItem('locale', locale);
      })();
    </script>
    <script type="application/ld+json">${escapeHtml(JSON.stringify(jsonLd))}</script>
  </head>
  <body>
    <div class="controls" dir="ltr">
      <button id="theme-toggle" class="theme-toggle" type="button" aria-label="${escapeHtml(fa ? 'تغییر به حالت تاریک' : 'Switch to dark mode')}" title="${escapeHtml(fa ? 'تغییر به حالت تاریک' : 'Switch to dark mode')}">◐</button>
    </div>
    <main class="wrap">
      <div class="toplinks">
        <a href="${buildPath(locale, null)}"${fa ? ' class="fa"' : ''}>${escapeHtml(fa ? 'صفحهٔ اصلی نوروز' : 'Nowruz homepage')}</a>
        <a href="${fa ? buildYearsHubPath('en') : buildYearsHubPath('fa')}"${fa ? ' class="fa"' : ''}>${escapeHtml(fa ? 'English years hub' : 'مرکز سال‌های فارسی')}</a>
      </div>
      <h1${fa ? ' class="fa"' : ''} style="font-size:2rem;margin:0 0 1rem;">${escapeHtml(fa ? 'همهٔ سال‌های نوروز' : 'All Nowruz years')}</h1>
      <p${fa ? ' class="fa"' : ''} style="font-size:1.05rem;max-width:56rem;margin:0 0 1.5rem;line-height:1.7;">${escapeHtml(fa ? 'این صفحه همهٔ سال‌های منتشرشدهٔ نوروز را یکجا جمع می‌کند تا بتوانید زمان دقیق تحویل سال را در سال‌های مختلف، هم به وقت تهران و هم به وقت UTC، مرور و مقایسه کنید.' : 'This page gathers all published Nowruz year pages in one place so you can browse and compare exact Tahvil times across years in both Tehran time and UTC.')}</p>
      <section class="grid">
        ${cards}
      </section>
    </main>
    <script>
      (function() {
        var locale = document.documentElement.lang === 'en' ? 'en' : 'fa';
        var labels = locale === 'fa'
          ? { dark: 'تغییر به حالت تاریک', light: 'تغییر به حالت روشن' }
          : { dark: 'Switch to dark mode', light: 'Switch to light mode' };
        var button = document.getElementById('theme-toggle');
        if (!button) return;
        var media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

        function syncButton() {
          var isDark = document.documentElement.classList.contains('dark');
          var label = isDark ? labels.light : labels.dark;
          button.setAttribute('aria-label', label);
          button.setAttribute('title', label);
          button.textContent = isDark ? '☀︎' : '☾';
        }

        button.addEventListener('click', function() {
          var next = !document.documentElement.classList.contains('dark');
          document.documentElement.classList.toggle('dark', next);
          localStorage.setItem('theme', next ? 'dark' : 'light');
          syncButton();
        });

        if (media && !localStorage.getItem('theme')) {
          var handleChange = function(e) {
            document.documentElement.classList.toggle('dark', e.matches);
            syncButton();
          };
          if (media.addEventListener) media.addEventListener('change', handleChange);
          else if (media.addListener) media.addListener(handleChange);
        }

        syncButton();
      })();
    </script>
  </body>
</html>
`;
}

function getFaqs(fa, year) {
  const label = year ? String(year) : null;
  const timeInfo = getYearTimeInfo(year, fa);
  return fa
    ? [
        {
          question: 'نوروز چیست؟',
          answer: 'نوروز سال نوی ایرانی و آغاز بهار است که در لحظهٔ دقیق اعتدال بهاری آغاز می‌شود و به همین دلیل تحویل سال از نظر فرهنگی و نجومی اهمیت زیادی دارد.',
        },
        {
          question: label ? `نوروز ${label} چه زمانی است؟` : 'نوروز چه زمانی است؟',
          answer: label
            ? `این صفحه برای نوروز ${label} ساخته شده و زمان دقیق تحویل سال را نشان می‌دهد. زمان UTC برابر ${timeInfo?.utc ?? equinoxIsoByYear[year]} و زمان تهران برابر ${timeInfo?.tehran ?? equinoxIsoByYear[year]} است.`
            : 'این صفحه شمارش معکوس زنده تا لحظهٔ دقیق نوروز را همراه با توضیحاتی دربارهٔ هفت‌سین و رسم‌های نوروزی نشان می‌دهد.',
        },
        {
          question: label ? `تحویل سال ${label} به وقت تهران چه ساعتی است؟` : 'تحویل سال به وقت تهران چه ساعتی است؟',
          answer: label
            ? `زمان تحویل سال ${label} به وقت تهران ${timeInfo?.tehran ?? equinoxIsoByYear[year]} است.`
            : 'این صفحه زمان تحویل سال را هم به وقت تهران و هم به وقت UTC نشان می‌دهد.',
        },
        {
          question: 'هفت‌سین چیست؟',
          answer: 'هفت‌سین سفرهٔ نمادین نوروزی است که با هفت قلم شروع‌شونده با حرف سین چیده می‌شود و مفاهیمی مانند نوزایی، سلامتی، عشق، فراوانی و شکیبایی را بازتاب می‌دهد.',
        },
        {
          question: 'چرا لحظهٔ دقیق تحویل سال مهم است؟',
          answer: 'نوروز بر اساس لحظهٔ واقعی اعتدال بهاری تعیین می‌شود، نه صرفاً تغییر یک تاریخ قراردادی. به همین دلیل زمان دقیق تحویل سال در فرهنگ ایرانی جایگاهی ویژه دارد.',
        },
      ]
    : [
        {
          question: 'What is Nowruz?',
          answer: 'Nowruz is the Persian New Year and the start of spring, celebrated at the exact astronomical moment of the vernal equinox.',
        },
        {
          question: label ? `When is Nowruz ${label}?` : 'When is Nowruz?',
          answer: label
            ? `This page focuses on Nowruz ${label}, which falls on ${timeInfo?.dateOnly ?? year}, with exact Tahvil timing in UTC (${timeInfo?.utc ?? equinoxIsoByYear[year]}) and Tehran time (${timeInfo?.tehran ?? equinoxIsoByYear[year]}).`
            : 'This page provides a live countdown to the exact moment of Nowruz, with Tahvil time and core Nowruz traditions.',
        },
        {
          question: label ? `What time is Nowruz ${label} in Tehran?` : 'What time is Nowruz in Tehran?',
          answer: label
            ? `Nowruz ${label} begins at ${timeInfo?.tehran ?? equinoxIsoByYear[year]} in Tehran time.`
            : 'This page includes the exact Tahvil time in Tehran time as well as UTC.',
        },
        {
          question: 'What is Haft-Sin?',
          answer: 'Haft-Sin is the traditional Nowruz table arranged with seven symbolic items whose Persian names begin with the letter sin, representing renewal, health, abundance, love, and patience.',
        },
        {
          question: 'Why does the exact equinox matter?',
          answer: 'Nowruz begins at the real astronomical equinox, not simply at midnight on a fixed date. That exact moment is the Tahvil of the year.',
        },
      ];
}

function getStructuredData({ canonical, locale, year, fa }) {
  const faqs = getFaqs(fa, year);
  const timeInfo = getYearTimeInfo(year, fa);
  const yearNav = getYearNavigation(locale, year, fa);
  const graph = [
    {
      '@type': 'WebPage',
      url: canonical,
      inLanguage: fa ? 'fa' : 'en',
      name: fa
        ? year ? `نوروز ${year} | زمان دقیق تحویل سال` : 'نوروز | شمارش معکوس و زمان دقیق تحویل سال'
        : year ? `Nowruz ${year} | Exact date and time` : 'Nowruz | Countdown and exact equinox time',
      about: ['Nowruz', 'Norouz', 'نوروز', 'Persian New Year', 'Spring Equinox'],
    },
    {
      '@type': 'WebSite',
      name: 'Nowruz Countdown',
      alternateName: ['Norouz Countdown', 'نوروز'],
      url: canonical,
      inLanguage: fa ? ['fa', 'en'] : ['en', 'fa'],
      description: fa
        ? 'شمارش معکوس نوروز با زمان دقیق تحویل سال، زمان تهران، UTC و معرفی رسم‌های نوروزی.'
        : 'A live countdown to the exact moment of Nowruz, with precise Tahvil time, Tehran time, UTC, and core Nowruz traditions.',
    },
    {
      '@type': 'FAQPage',
      inLanguage: fa ? 'fa' : 'en',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ];

  if (yearNav) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: fa ? 'نوروز' : 'Nowruz',
          item: buildUrl(locale, null),
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: fa ? `نوروز ${year}` : `Nowruz ${year}`,
          item: canonical,
        },
      ],
    });
  }

  if (year && equinoxIsoByYear[year]) {
    graph.push({
      '@type': 'Event',
      name: `Nowruz ${year} — Persian New Year`,
      alternateName: [`Norouz ${year}`, `نوروز ${getShamsiYear(year)}`],
      startDate: equinoxIsoByYear[year],
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      inLanguage: fa ? 'fa' : 'en',
      image: getOgImageUrl(fa, year, 'year'),
      description: fa
        ? `لحظهٔ دقیق اعتدال بهاری و آغاز سال نوی ایرانی برای نوروز ${year}.`
        : `The exact astronomical moment of the vernal equinox, marking the beginning of the Persian New Year, Nowruz ${year}.`,
      location: {
        '@type': 'VirtualLocation',
        url: canonical,
      },
      organizer: {
        '@type': 'Person',
        name: 'Mehrzad Akhavein',
      },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: canonical,
      },
    });

    if (timeInfo) {
      graph.push({
        '@type': 'Dataset',
        name: fa ? `زمان‌های نوروز ${year}` : `Nowruz ${year} times`,
        description: fa
          ? `زمان دقیق نوروز ${year} به وقت UTC و تهران.`
          : `Exact Nowruz ${year} timing in UTC and Tehran time.`,
        url: canonical,
        variableMeasured: [
          { '@type': 'PropertyValue', name: 'UTC time', value: timeInfo.utc },
          { '@type': 'PropertyValue', name: 'Tehran time', value: timeInfo.tehran },
        ],
      });
    }
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

function getPageMeta(locale, year, explicitFaPath = false) {
  const fa = locale === 'fa' || (locale === null && !explicitFaPath);
  const isYearPage = year !== null;
  const yearLabel = year ? String(year) : '';

  const title = fa
    ? isYearPage
      ? `نوروز ${yearLabel} | زمان دقیق تحویل سال و شمارش معکوس Nowruz`
      : 'Nowruz Countdown | Norouz, نوروز, Persian New Year & Spring Equinox'
    : isYearPage
      ? `Nowruz ${yearLabel} Date & Time | Exact Tahvil in Tehran and UTC`
      : 'Nowruz Countdown | Norouz, نوروز, Persian New Year & Spring Equinox';

  const description = fa
    ? isYearPage
      ? `زمان دقیق تحویل سال نوروز ${yearLabel} با تاریخ و ساعت دقیق به وقت تهران و UTC، به همراه توضیحات هفت‌سین و رسم‌های نوروزی.`
      : 'شمارش معکوس زنده تا لحظهٔ دقیق نوروز، با زمان تحویل سال در ساعت محلی شما، تهران و UTC، به همراه هفت‌سین و رسم‌های نوروزی.'
    : isYearPage
      ? `Find the exact date and time of Nowruz ${yearLabel}, with Tahvil time in Tehran and UTC, plus Haft-Sin and Persian New Year traditions.`
      : 'Live countdown to the exact moment of Nowruz (Norouz, نوروز), the Persian New Year and spring equinox. See the precise Tahvil time in your local time, Tehran time, and UTC, plus Haft-Sin and Nowruz traditions.';

  const heading = fa
    ? isYearPage ? `نوروز ${yearLabel}` : 'Nowruz Countdown | Norouz | نوروز'
    : isYearPage ? `Nowruz ${yearLabel}` : 'Nowruz Countdown | Norouz | نوروز';

  const intro = fa
    ? isYearPage
      ? `در این صفحه زمان دقیق نوروز ${yearLabel} و لحظهٔ تحویل سال را می‌بینید، همراه با ساعت تهران، UTC، عبارت‌های رایج جستجو مثل Nowruz و Norouz، و توضیحی کوتاه دربارهٔ سال نوی ایرانی.`
      : 'نوروز جشن سال نو ایرانی و آغاز بهار است که در لحظهٔ دقیق اعتدال بهاری، یا همان لحظهٔ تحویل سال، جشن گرفته می‌شود.'
    : isYearPage
      ? `This page is focused on Nowruz ${yearLabel}, including the exact date and Tahvil time, common spellings like Norouz and نوروز, and key Persian New Year traditions.`
      : 'Live countdown to the exact moment of Nowruz (also spelled Norouz, نوروز), the Persian New Year celebrated at the spring equinox.';

  const what = fa
    ? 'نوروز سال نوی خورشیدی ایرانی است که در لحظهٔ دقیق اعتدال بهاری آغاز می‌شود. هفت‌سین، دید و بازدید، موسیقی تحویل سال و سیزده‌بدر از رسم‌های شناخته‌شدهٔ آن هستند.'
    : 'Nowruz is the Persian solar new year. It begins at the exact astronomical moment of the vernal equinox, and traditions around it include the Haft-Sin table, Tahvil music, visiting family, and Sizdah Bedar.';

  const searches = fa
    ? ['نوروز چیست؟', `نوروز ${yearLabel || 'امسال'} چه زمانی است؟`, 'تحویل سال به وقت تهران', 'هفت‌سین چیست؟', 'سیزده‌بدر چیست؟']
    : [`When is Nowruz${yearLabel ? ` ${yearLabel}` : ''}?`, 'Nowruz countdown', 'Norouz countdown', 'Tahvil time in Tehran', 'What is Haft-Sin?'];

  return { title, description, heading, intro, what, searches, fa };
}

function renderPage(locale, year) {
  const canonical = buildUrl(locale, year);
  const xDefault = buildUrl(null, year);
  const en = buildUrl('en', year);
  const fa = buildUrl('fa', year);
  const meta = getPageMeta(locale, year, locale === 'fa');
  const htmlLang = meta.fa ? 'fa' : 'en';
  const htmlDir = meta.fa ? 'rtl' : 'ltr';
  const structuredData = getStructuredData({ canonical, locale, year, fa: meta.fa });
  const faqs = getFaqs(meta.fa, year);
  const timeInfo = getYearTimeInfo(year, meta.fa);
  const shamsiYear = year ? getShamsiYear(year) : null;
  const yearNav = getYearNavigation(locale, year, meta.fa);
  const ogImage = getOgImageUrl(meta.fa, year);
  const ogImageAlt = getOgImageAlt(meta.fa, year);
  const yearsHubPath = buildYearsHubPath(locale);

  return `<!doctype html>
<html lang="${htmlLang}" dir="${htmlDir}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${escapeHtml(meta.title)}</title>
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <link rel="canonical" href="${canonical}" />
    <link rel="alternate" hreflang="x-default" href="${xDefault}" />
    <link rel="alternate" hreflang="en" href="${en}" />
    <link rel="alternate" hreflang="fa" href="${fa}" />
    ${yearNav?.previousUrl ? `<link rel="prev" href="${buildUrl(locale, yearNav.previousYear)}" />` : ''}
    ${yearNav?.nextUrl ? `<link rel="next" href="${buildUrl(locale, yearNav.nextYear)}" />` : ''}

    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:locale" content="${meta.fa ? 'fa_IR' : 'en_US'}" />
    <meta property="og:locale:alternate" content="${meta.fa ? 'en_US' : 'fa_IR'}" />
    <meta property="og:site_name" content="Nowruz Countdown" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(ogImageAlt)}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="${ogImage}" />
    <meta name="twitter:image:alt" content="${escapeHtml(ogImageAlt)}" />

    <meta name="keywords" content="Nowruz, Norouz, نوروز, Persian New Year, Iranian New Year, Spring Equinox, vernal equinox, countdown, Tahvil, سال تحویل, Haft-Sin, Haft Sin, Sizdah Bedar" />
    <meta name="author" content="Mehrzad Akhavein" />
    <meta name="theme-color" content="#fefdf8" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#1a1612" media="(prefers-color-scheme: dark)" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/manifest.json" />

    <script>
      (function() {
        var pathname = window.location.pathname;
        var forcedLocale = pathname === '/en/' || pathname.startsWith('/en/') ? 'en' : pathname === '/fa/' || pathname.startsWith('/fa/') ? 'fa' : null;
        var savedLocale = localStorage.getItem('locale');
        if (!forcedLocale && savedLocale === 'en') {
          window.location.replace('/en' + pathname + window.location.search + window.location.hash);
          return;
        }
        var locale = forcedLocale || savedLocale;
        if (locale !== 'en' && locale !== 'fa') locale = 'fa';
        document.documentElement.lang = locale;
        document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr';
        localStorage.setItem('locale', locale);

        var t = localStorage.getItem('theme');
        if (t === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      })();
    </script>

    <style>
      .seo-fallback {
        max-width: 56rem;
        margin: 0 auto;
        padding: 4rem 1.25rem 2rem;
        color: #2b2118;
        font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        line-height: 1.65;
      }
      .seo-fallback h1,
      .seo-fallback h2,
      .seo-fallback h3 { line-height: 1.25; }
      .seo-fallback .fa { font-family: Vazirmatn, Inter, system-ui, sans-serif; }
      @media (prefers-color-scheme: dark) {
        .seo-fallback { color: #f4ecde; background: #1a1612; }
      }
    </style>

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Vazirmatn:wght@400;700&display=swap" rel="stylesheet" />
    <script type="application/ld+json">${escapeHtml(structuredData)}</script>
  </head>
  <body>
    <div id="root">
      <main class="seo-fallback">
        <h1 style="font-size:2rem;margin:0 0 1rem;">${escapeHtml(meta.heading)}</h1>
        <p${meta.fa ? ' class="fa"' : ''} style="font-size:1.05rem;margin:0 0 1rem;">${escapeHtml(meta.intro)}</p>

        <section style="margin:0 0 1.5rem;">
          <h2 style="font-size:1.25rem;margin:0 0 .75rem;">${meta.fa ? 'نوروز چیست؟' : 'What is Nowruz?'}</h2>
          <p${meta.fa ? ' class="fa"' : ''} style="margin:0;">${escapeHtml(meta.what)}</p>
        </section>

        <section>
          <h2 style="font-size:1.25rem;margin:0 0 .75rem;">${meta.fa ? 'جستجوهای رایج' : 'Popular searches'}</h2>
          <ul${meta.fa ? ' class="fa"' : ''} style="margin:0;padding-inline-start:1.25rem;">
            ${meta.searches.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
          </ul>
        </section>

        ${!year ? `
        <section style="margin-top:1.5rem;">
          <h2 style="font-size:1.25rem;margin:0 0 .75rem;">${meta.fa ? 'مرور سال‌های نوروز' : 'Browse Nowruz by year'}</h2>
          <p${meta.fa ? ' class="fa"' : ''} style="margin:0 0 1rem;line-height:1.7;">${escapeHtml(meta.fa
            ? 'اگر به دنبال پاسخ سریع برای «نوروز چه زمانی است؟» یا «تحویل سال ۲۰۲۸ و ۲۰۳۰» هستید، می‌توانید وارد صفحهٔ سال‌ها شوید و زمان دقیق هر سال را به وقت تهران و UTC ببینید.'
            : 'If you are searching for quick answers like “When is Nowruz?” or exact Tahvil times for 2028 and 2030, you can open the years hub and compare each year in Tehran time and UTC.')}</p>
          <div style="display:flex;flex-wrap:wrap;gap:.6rem;${meta.fa ? 'direction:rtl;' : ''}">
            <a href="${yearsHubPath}"${meta.fa ? ' class="fa"' : ''} style="padding:.45rem .85rem;border-radius:999px;border:1px solid rgba(176,133,48,.28);text-decoration:none;color:#b08530;font-weight:700;background:rgba(176,133,48,.06);">${escapeHtml(meta.fa ? 'همهٔ سال‌ها' : 'All years')}</a>
            ${years.map((itemYear) => `<a href="${buildPath(locale, itemYear)}"${meta.fa ? ' class="fa"' : ''} style="padding:.45rem .85rem;border-radius:999px;border:1px solid rgba(176,133,48,.18);text-decoration:none;color:#2b2118;">${escapeHtml(meta.fa ? `نوروز ${itemYear}` : `Nowruz ${itemYear}`)}</a>`).join('')}
          </div>
        </section>` : ''}

        ${timeInfo ? `
        <section style="margin-top:1.5rem;">
          <h2 style="font-size:1.25rem;margin:0 0 .75rem;">${meta.fa ? `زمان دقیق نوروز ${year}` : `Exact time for Nowruz ${year}`}</h2>
          <div style="display:grid;grid-template-columns:minmax(9rem,14rem) 1fr;gap:.5rem 1rem;${meta.fa ? 'direction:rtl;' : ''}">
            <div${meta.fa ? ' class="fa"' : ''} style="font-weight:600;">${meta.fa ? 'تاریخ میلادی' : 'Gregorian date'}</div>
            <div${meta.fa ? ' class="fa"' : ''}>${escapeHtml(timeInfo.dateOnly)}</div>
            <div${meta.fa ? ' class="fa"' : ''} style="font-weight:600;">UTC</div>
            <div><time dateTime="${timeInfo.iso}">${escapeHtml(timeInfo.utc)}</time></div>
            <div${meta.fa ? ' class="fa"' : ''} style="font-weight:600;">${meta.fa ? 'زمان تهران' : 'Tehran time'}</div>
            <div><time dateTime="${timeInfo.iso}">${escapeHtml(timeInfo.tehran)}</time></div>
            <div${meta.fa ? ' class="fa"' : ''} style="font-weight:600;">${meta.fa ? 'سال خورشیدی' : 'Solar Hijri year'}</div>
            <div${meta.fa ? ' class="fa"' : ''}>${escapeHtml(String(shamsiYear))}</div>
          </div>
        </section>` : ''}

        ${yearNav ? `
        <section style="margin-top:1.5rem;">
          <h2 style="font-size:1.25rem;margin:0 0 .75rem;">${meta.fa ? 'جابه‌جایی بین سال‌های نوروز' : 'Browse other Nowruz years'}</h2>
          <div style="display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;margin:0 0 1rem;${meta.fa ? 'direction:rtl;' : ''}">
            ${yearNav.previousUrl ? `<a href="${yearNav.previousUrl}"${meta.fa ? ' class="fa"' : ''} style="color:#b08530;text-decoration:none;font-weight:600;">${escapeHtml(meta.fa ? `← نوروز ${yearNav.previousYear}` : `← Nowruz ${yearNav.previousYear}`)}</a>` : ''}
            ${yearNav.nextUrl ? `<a href="${yearNav.nextUrl}"${meta.fa ? ' class="fa"' : ''} style="color:#b08530;text-decoration:none;font-weight:600;">${escapeHtml(meta.fa ? `نوروز ${yearNav.nextYear} →` : `Nowruz ${yearNav.nextYear} →`)}</a>` : ''}
            <a href="${yearNav.hubUrl}"${meta.fa ? ' class="fa"' : ''} style="color:#b08530;text-decoration:none;font-weight:600;">${escapeHtml(meta.fa ? 'همهٔ سال‌ها' : 'All years')}</a>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:.5rem;${meta.fa ? 'direction:rtl;' : ''}">
            ${yearNav.allYears.map((item) => item.current
              ? `<span${meta.fa ? ' class="fa"' : ''} style="padding:.4rem .75rem;border-radius:999px;background:rgba(176,133,48,.14);border:1px solid rgba(176,133,48,.22);font-weight:600;">${escapeHtml(item.label)}</span>`
              : `<a href="${item.url}"${meta.fa ? ' class="fa"' : ''} style="padding:.4rem .75rem;border-radius:999px;border:1px solid rgba(176,133,48,.22);text-decoration:none;color:#2b2118;background:transparent;">${escapeHtml(item.label)}</a>`).join('')}
          </div>
        </section>` : ''}

        <section style="margin-top:1.5rem;">
          <h2 style="font-size:1.25rem;margin:0 0 .75rem;">${meta.fa ? 'سوال‌های رایج دربارهٔ نوروز' : 'Frequently asked questions about Nowruz'}</h2>
          ${faqs.map((faq) => `
          <details style="margin:0 0 .75rem;padding:.75rem 1rem;border:1px solid rgba(176,133,48,.18);border-radius:1rem;">
            <summary${meta.fa ? ' class="fa"' : ''} style="cursor:pointer;font-weight:600;color:#b08530;">${escapeHtml(faq.question)}</summary>
            <p${meta.fa ? ' class="fa"' : ''} style="margin:.75rem 0 0;">${escapeHtml(faq.answer)}</p>
          </details>`).join('')}
        </section>
      </main>
    </div>
    <script type="module" src="/src/main.tsx"></script>
    <script data-goatcounter="https://norouz.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
  </body>
</html>
`;
}

async function writePage(filePath, content) {
  const targetPath = fileURLToPath(filePath);
  await fs.mkdir(path.dirname(targetPath), { recursive: true });

  try {
    const existing = await fs.readFile(targetPath, 'utf8');
    if (existing === content) return;
  } catch {
    // File does not exist yet, fall through to write it.
  }

  await fs.writeFile(targetPath, content);
}

async function main() {
  const pages = [
    { locale: null, year: null, file: 'index.html' },
    { locale: 'en', year: null, file: 'en/index.html' },
    { locale: 'fa', year: null, file: 'fa/index.html' },
    { locale: null, year: 'years', file: 'years/index.html' },
    { locale: 'en', year: 'years', file: 'en/years/index.html' },
    { locale: 'fa', year: 'years', file: 'fa/years/index.html' },
    ...years.flatMap((year) => [
      { locale: null, year, file: `${year}/index.html` },
      { locale: 'en', year, file: `en/${year}/index.html` },
      { locale: 'fa', year, file: `fa/${year}/index.html` },
    ]),
  ];

  for (const page of pages) {
    const filePath = new URL(page.file, root);
    if (page.year === 'years') {
      await writePage(filePath, renderYearsHubPage(page.locale));
    } else {
      await writePage(filePath, renderPage(page.locale, page.year));
    }
  }

  const sitemapEntries = pages.map((page) => {
    const url = page.year === 'years' ? buildYearsHubUrl(page.locale) : buildUrl(page.locale, page.year);
    const alternates = [
      { href: page.year === 'years' ? buildYearsHubUrl(null) : buildUrl(null, page.year), hreflang: 'x-default' },
      { href: page.year === 'years' ? buildYearsHubUrl('en') : buildUrl('en', page.year), hreflang: 'en' },
      { href: page.year === 'years' ? buildYearsHubUrl('fa') : buildUrl('fa', page.year), hreflang: 'fa' },
    ].map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`).join('\n');
    return `  <url>\n    <loc>${url}</loc>\n${alternates}\n    <changefreq>${page.year && page.year !== 'years' ? 'monthly' : 'weekly'}</changefreq>\n    <priority>${page.locale === null && page.year === null ? '1.0' : page.year && page.year !== 'years' ? '0.9' : '0.8'}</priority>\n  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries}\n</urlset>\n`;
  await writePage(new URL('../public/sitemap.xml', import.meta.url), sitemap);

  await generateOgImages();
}

await main();
