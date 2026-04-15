import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);

const years = [2026, 2027];
const baseUrl = 'https://norouz.akhave.in';

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

function getPageMeta(locale, year, explicitFaPath = false) {
  const fa = locale === 'fa' || (locale === null && !explicitFaPath);
  const isYearPage = year !== null;
  const yearLabel = year ? String(year) : '';

  const title = fa
    ? isYearPage
      ? `نوروز ${yearLabel} | شمارش معکوس Nowruz و Norouz`
      : 'Nowruz Countdown | Norouz, نوروز, Persian New Year & Spring Equinox'
    : isYearPage
      ? `Nowruz ${yearLabel} Countdown | Norouz, نوروز, Persian New Year`
      : 'Nowruz Countdown | Norouz, نوروز, Persian New Year & Spring Equinox';

  const description = fa
    ? isYearPage
      ? `زمان دقیق تحویل سال و اطلاعات نوروز ${yearLabel}، با ساعت تهران، UTC، و توضیحاتی دربارهٔ هفت‌سین و رسم‌های نوروزی.`
      : 'شمارش معکوس زنده تا لحظهٔ دقیق نوروز، با زمان تحویل سال در ساعت محلی شما، تهران و UTC، به همراه هفت‌سین و رسم‌های نوروزی.'
    : isYearPage
      ? `Find the exact time of Nowruz ${yearLabel}, with Tahvil time in Tehran time, UTC, and your local time, plus Haft-Sin and Persian New Year traditions.`
      : 'Live countdown to the exact moment of Nowruz (Norouz, نوروز), the Persian New Year and spring equinox. See the precise Tahvil time in your local time, Tehran time, and UTC, plus Haft-Sin and Nowruz traditions.';

  const heading = fa
    ? isYearPage ? `نوروز ${yearLabel}` : 'Nowruz Countdown | Norouz | نوروز'
    : isYearPage ? `Nowruz ${yearLabel}` : 'Nowruz Countdown | Norouz | نوروز';

  const intro = fa
    ? isYearPage
      ? `در این صفحه زمان و اطلاعات سئویی مربوط به نوروز ${yearLabel} را می‌بینید، از جمله تحویل سال، Nowruz، Norouz و توضیحی کوتاه دربارهٔ رسم‌های سال نوی ایرانی.`
      : 'نوروز جشن سال نو ایرانی و آغاز بهار است که در لحظهٔ دقیق اعتدال بهاری، یا همان لحظهٔ تحویل سال، جشن گرفته می‌شود.'
    : isYearPage
      ? `This page is focused on Nowruz ${yearLabel}, including the exact Tahvil timing, common spellings like Norouz and نوروز, and key Persian New Year traditions.`
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
  const routePath = buildPath(locale, year);
  const canonical = buildUrl(locale, year);
  const xDefault = buildUrl(null, year);
  const en = buildUrl('en', year);
  const fa = buildUrl('fa', year);
  const meta = getPageMeta(locale, year, locale === 'fa');
  const htmlLang = meta.fa ? 'fa' : 'en';
  const htmlDir = meta.fa ? 'rtl' : 'ltr';

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
    return `  <url>\n    <loc>${url}</loc>\n    <changefreq>${page.year ? 'monthly' : 'weekly'}</changefreq>\n    <priority>${page.locale === null && page.year === null ? '1.0' : page.year ? '0.9' : '0.8'}</priority>\n  </url>`;
  }).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`;
  await fs.writeFile(fileURLToPath(new URL('../public/sitemap.xml', import.meta.url)), sitemap);
}

await main();
