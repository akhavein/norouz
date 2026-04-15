import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);

const years = [2026, 2027, 2028, 2029, 2030];
const baseUrl = 'https://norouz.akhave.in';
const buildTimestamp = new Date().toISOString();
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
  const graph = [
    {
      '@type': 'WebPage',
      url: canonical,
      inLanguage: fa ? 'fa' : 'en',
      name: fa
        ? year ? `نوروز ${year} | زمان دقیق تحویل سال` : 'نوروز | شمارش معکوس و زمان دقیق تحویل سال'
        : year ? `Nowruz ${year} | Exact date and time` : 'Nowruz | Countdown and exact equinox time',
      dateModified: buildTimestamp,
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

  if (year && equinoxIsoByYear[year]) {
    graph.push({
      '@type': 'Event',
      name: `Nowruz ${year} — Persian New Year`,
      alternateName: [`Norouz ${year}`, `نوروز ${getShamsiYear(year)}`],
      startDate: equinoxIsoByYear[year],
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      inLanguage: fa ? 'fa' : 'en',
      image: 'https://norouz.akhave.in/og-image.png',
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
        dateModified: buildTimestamp,
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

    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:locale" content="${meta.fa ? 'fa_IR' : 'en_US'}" />
    <meta property="og:locale:alternate" content="${meta.fa ? 'en_US' : 'fa_IR'}" />
    <meta property="og:site_name" content="Nowruz Countdown" />
    <meta property="og:image" content="https://norouz.akhave.in/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Nowruz countdown artwork with Persian spring motifs" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="https://norouz.akhave.in/og-image.png" />
    <meta name="twitter:image:alt" content="Nowruz countdown artwork with Persian spring motifs" />

    <meta name="keywords" content="Nowruz, Norouz, نوروز, Persian New Year, Iranian New Year, Spring Equinox, vernal equinox, countdown, Tahvil, سال تحویل, Haft-Sin, Haft Sin, Sizdah Bedar" />
    <meta name="author" content="Mehrzad Akhavein" />
    <meta name="theme-color" content="#fefdf8" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#1a1612" media="(prefers-color-scheme: dark)" />
    <meta property="article:modified_time" content="${buildTimestamp}" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="manifest" href="/manifest.json" />

    <script>
      (function() {
        var pathname = window.location.pathname;
        var forcedLocale = pathname === '/en/' || pathname.startsWith('/en/') ? 'en' : pathname === '/fa/' || pathname.startsWith('/fa/') ? 'fa' : null;
        var locale = forcedLocale || localStorage.getItem('locale');
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
  await fs.writeFile(targetPath, content);
}

async function main() {
  const pages = [
    { locale: null, year: null, file: 'index.html' },
    { locale: 'en', year: null, file: 'en/index.html' },
    { locale: 'fa', year: null, file: 'fa/index.html' },
    ...years.flatMap((year) => [
      { locale: null, year, file: `${year}/index.html` },
      { locale: 'en', year, file: `en/${year}/index.html` },
      { locale: 'fa', year, file: `fa/${year}/index.html` },
    ]),
  ];

  for (const page of pages) {
    const filePath = new URL(page.file, root);
    await writePage(filePath, renderPage(page.locale, page.year));
  }

  const sitemapEntries = pages.map((page) => {
    const url = buildUrl(page.locale, page.year);
    const alternates = [
      { href: buildUrl(null, page.year), hreflang: 'x-default' },
      { href: buildUrl('en', page.year), hreflang: 'en' },
      { href: buildUrl('fa', page.year), hreflang: 'fa' },
    ].map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />`).join('\n');
    return `  <url>\n    <loc>${url}</loc>\n${alternates}\n    <lastmod>${buildTimestamp}</lastmod>\n    <changefreq>${page.year ? 'monthly' : 'weekly'}</changefreq>\n    <priority>${page.locale === null && page.year === null ? '1.0' : page.year ? '0.9' : '0.8'}</priority>\n  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries}\n</urlset>\n`;
  await fs.writeFile(fileURLToPath(new URL('../public/sitemap.xml', import.meta.url)), sitemap);
}

await main();
