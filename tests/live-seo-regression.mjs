import vm from 'node:vm';

const baseUrl = process.env.NOROUZ_BASE_URL || 'https://norouz.akhave.in';

function assertIncludes(text, needle, label) {
  if (!text.includes(needle)) {
    throw new Error(`Missing ${label}: ${needle}`);
  }
}

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, got ${actual}`);
  }
}

function extractBootstrapScript(html, label) {
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
  const script = scripts.find((item) => item.includes('forcedLocale') && item.includes('localStorage'));
  if (!script) {
    throw new Error(`Missing bootstrap script in ${label}`);
  }
  return script;
}

function runBootstrapScript(script, { pathname, search = '', hash = '', storage = {} }) {
  const store = new Map(Object.entries(storage));
  const classes = new Set();
  let replaced = null;

  const sandbox = {
    window: {
      location: {
        pathname,
        search,
        hash,
        replace: (url) => {
          replaced = url;
        },
      },
    },
    localStorage: {
      getItem: (key) => (store.has(key) ? store.get(key) : null),
      setItem: (key, value) => {
        store.set(key, String(value));
      },
    },
    document: {
      documentElement: {
        lang: '',
        dir: '',
        classList: {
          add: (name) => classes.add(name),
          remove: (name) => classes.delete(name),
          toggle: (name, force) => {
            if (force === undefined) {
              if (classes.has(name)) classes.delete(name);
              else classes.add(name);
              return;
            }
            if (force) classes.add(name);
            else classes.delete(name);
          },
        },
      },
    },
  };

  vm.runInNewContext(script, sandbox);

  return {
    replaced,
    lang: sandbox.document.documentElement.lang,
    dir: sandbox.document.documentElement.dir,
    storage: Object.fromEntries(store),
    classes: [...classes],
  };
}

async function getHtml(pathname) {
  const response = await fetch(`${baseUrl}${pathname}`, {
    redirect: 'follow',
    headers: {
      'user-agent': 'norouz-live-seo-regression/1.0',
      'cache-control': 'no-cache',
    },
  });

  if (!response.ok) {
    throw new Error(`Fetch failed for ${pathname}: ${response.status}`);
  }

  return response.text();
}

async function main() {
  const checks = [];

  const rootHome = await getHtml('/');
  assertIncludes(rootHome, 'href="https://norouz.akhave.in/"', 'root home canonical');
  assertIncludes(rootHome, 'https://norouz.akhave.in/og/fa-home.png', 'root home fa OG');
  const rootHomeBootstrap = extractBootstrapScript(rootHome, 'root home');
  const rootHomeEn = runBootstrapScript(rootHomeBootstrap, { pathname: '/', storage: { locale: 'en' } });
  assertEqual(rootHomeEn.replaced, '/en/', 'root home English upgrade');
  const rootHomeFa = runBootstrapScript(rootHomeBootstrap, { pathname: '/', storage: { locale: 'fa' } });
  assertEqual(rootHomeFa.replaced, null, 'root home Farsi stays put');
  assertEqual(rootHomeFa.lang, 'fa', 'root home Farsi lang');
  assertEqual(rootHomeFa.dir, 'rtl', 'root home Farsi dir');
  checks.push('root home upgrade behavior');

  const rootYear = await getHtml('/2028/');
  assertIncludes(rootYear, 'href="https://norouz.akhave.in/2028/"', 'root year canonical');
  assertIncludes(rootYear, 'https://norouz.akhave.in/og/fa-2028.png', 'root year fa OG');
  const rootYearBootstrap = extractBootstrapScript(rootYear, 'root year');
  const rootYearEn = runBootstrapScript(rootYearBootstrap, { pathname: '/2028/', storage: { locale: 'en' } });
  assertEqual(rootYearEn.replaced, '/en/2028/', 'root year English upgrade');
  checks.push('root year upgrade behavior');

  const rootYearsHub = await getHtml('/years/');
  assertIncludes(rootYearsHub, 'href="https://norouz.akhave.in/years/"', 'root years hub canonical');
  assertIncludes(rootYearsHub, 'https://norouz.akhave.in/og/fa-years.png', 'root years hub fa OG');
  const rootYearsBootstrap = extractBootstrapScript(rootYearsHub, 'root years hub');
  const rootYearsEn = runBootstrapScript(rootYearsBootstrap, { pathname: '/years/', storage: { locale: 'en' } });
  assertEqual(rootYearsEn.replaced, '/en/years/', 'root years hub English upgrade');
  checks.push('root years hub upgrade behavior');

  const enYear = await getHtml('/en/2028/');
  assertIncludes(enYear, 'href="https://norouz.akhave.in/en/2028/"', 'localized English year canonical');
  assertIncludes(enYear, 'https://norouz.akhave.in/og/en-2028.png', 'localized English year OG');
  const enYearBootstrap = extractBootstrapScript(enYear, 'localized English year');
  const enYearFaSaved = runBootstrapScript(enYearBootstrap, { pathname: '/en/2028/', storage: { locale: 'fa' } });
  assertEqual(enYearFaSaved.replaced, null, 'localized English year stays put');
  assertEqual(enYearFaSaved.lang, 'en', 'localized English year lang');
  assertEqual(enYearFaSaved.dir, 'ltr', 'localized English year dir');
  assertEqual(enYearFaSaved.storage.locale, 'en', 'localized English year persists English locale');
  checks.push('localized English year behavior');

  const enYearsHub = await getHtml('/en/years/');
  assertIncludes(enYearsHub, 'href="https://norouz.akhave.in/en/years/"', 'localized English years hub canonical');
  assertIncludes(enYearsHub, 'https://norouz.akhave.in/og/en-years.png', 'localized English years hub OG');
  checks.push('localized English years hub metadata');

  console.log('Live SEO regression passed:');
  for (const check of checks) {
    console.log(`- ${check}`);
  }
}

await main();
