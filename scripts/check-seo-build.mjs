import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');

async function read(file) {
  return fs.readFile(path.join(dist, file), 'utf8');
}

async function exists(file) {
  try {
    await fs.access(path.join(dist, file));
    return true;
  } catch {
    return false;
  }
}

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
  const match = html.match(/<script>([\s\S]*?)<\/script>/i);
  if (!match) {
    throw new Error(`Missing bootstrap script in ${label}`);
  }
  return match[1];
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

async function main() {
  const checks = [];

  const enHome = await read('en/index.html');
  assertIncludes(enHome, 'Browse Nowruz by year', 'English homepage year section');
  assertIncludes(enHome, '/en/years/', 'English homepage years hub link');
  checks.push('en homepage copy + hub link');

  const faHome = await read('index.html');
  assertIncludes(faHome, 'مرور سال', 'Farsi homepage year section');
  assertIncludes(faHome, '/years/', 'Farsi homepage years hub link');
  assertIncludes(faHome, "if (!forcedLocale && savedLocale === 'en')", 'x-default English upgrade guard');
  assertIncludes(faHome, "window.location.replace('/en' + pathname + window.location.search + window.location.hash);", 'x-default English redirect');
  checks.push('fa homepage copy + hub link + x-default redirect');

  const homeBootstrap = extractBootstrapScript(faHome, 'root homepage');
  const rootHomeEn = runBootstrapScript(homeBootstrap, { pathname: '/', storage: { locale: 'en' } });
  assertEqual(rootHomeEn.replaced, '/en/', 'root homepage English upgrade');
  const rootHomeFa = runBootstrapScript(homeBootstrap, { pathname: '/', storage: { locale: 'fa' } });
  assertEqual(rootHomeFa.replaced, null, 'root homepage Farsi no redirect');
  assertEqual(rootHomeFa.lang, 'fa', 'root homepage Farsi lang');
  assertEqual(rootHomeFa.dir, 'rtl', 'root homepage Farsi dir');

  const enYear = await read('en/2028/index.html');
  assertIncludes(enYear, 'Exact time for Nowruz 2028', 'English year exact-time section');
  assertIncludes(enYear, 'rel="prev" href="https://norouz.akhave.in/en/2027/"', 'English prev link');
  assertIncludes(enYear, 'rel="next" href="https://norouz.akhave.in/en/2029/"', 'English next link');
  assertIncludes(enYear, 'https://norouz.akhave.in/og/en-2028.png', 'English year OG image');
  assertIncludes(enYear, '&quot;image&quot;:&quot;https://norouz.akhave.in/og/en-2028.png&quot;', 'English year structured-data image');
  if (enYear.includes('https://norouz.akhave.in/og-image.png')) {
    throw new Error('Found stale generic og-image.png reference in English year page');
  }
  checks.push('en year page nav + OG + structured data image');

  const enYearBootstrap = extractBootstrapScript(enYear, 'localized English year page');
  const localizedYear = runBootstrapScript(enYearBootstrap, { pathname: '/en/2028/', storage: { locale: 'fa' } });
  assertEqual(localizedYear.replaced, null, 'localized English year stays put');
  assertEqual(localizedYear.lang, 'en', 'localized English year lang');
  assertEqual(localizedYear.dir, 'ltr', 'localized English year dir');
  assertEqual(localizedYear.storage.locale, 'en', 'localized English year persists locale');

  const rootYear = await read('2028/index.html');
  assertIncludes(rootYear, "if (!forcedLocale && savedLocale === 'en')", 'x-default year English upgrade guard');
  assertIncludes(rootYear, "window.location.replace('/en' + pathname + window.location.search + window.location.hash);", 'x-default year English redirect');
  const rootYearBootstrap = extractBootstrapScript(rootYear, 'root year page');
  const upgradedYear = runBootstrapScript(rootYearBootstrap, { pathname: '/2028/', storage: { locale: 'en' } });
  assertEqual(upgradedYear.replaced, '/en/2028/', 'root year English upgrade');
  checks.push('x-default year redirect');

  const yearsHub = await read('en/years/index.html');
  assertIncludes(yearsHub, 'CollectionPage', 'years hub CollectionPage schema');
  assertIncludes(yearsHub, 'ItemList', 'years hub ItemList schema');
  assertIncludes(yearsHub, 'https://norouz.akhave.in/en/2028/', 'years hub 2028 link');
  assertIncludes(yearsHub, 'https://norouz.akhave.in/og/en-years.png', 'years hub OG image');
  checks.push('years hub schema + links + OG');

  const rootYearsHub = await read('years/index.html');
  assertIncludes(rootYearsHub, "if (!forcedLocale && savedLocale === 'en')", 'x-default years hub English upgrade guard');
  assertIncludes(rootYearsHub, "window.location.replace('/en/years/' + window.location.search + window.location.hash);", 'x-default years hub English redirect');
  const yearsHubBootstrap = extractBootstrapScript(rootYearsHub, 'root years hub');
  const upgradedYearsHub = runBootstrapScript(yearsHubBootstrap, { pathname: '/years/', storage: { locale: 'en' } });
  assertEqual(upgradedYearsHub.replaced, '/en/years/', 'root years hub English upgrade');
  checks.push('x-default years hub redirect');

  const sitemap = await read('sitemap.xml');
  assertIncludes(sitemap, 'xmlns:xhtml=', 'sitemap xhtml namespace');
  assertIncludes(sitemap, 'https://norouz.akhave.in/years/', 'sitemap years hub');
  assertIncludes(sitemap, 'https://norouz.akhave.in/en/years/', 'sitemap english years hub');
  assertIncludes(sitemap, 'https://norouz.akhave.in/fa/years/', 'sitemap farsi years hub');
  checks.push('sitemap hub entries + alternates');

  for (const asset of ['og/en-home.png', 'og/fa-home.png', 'og/en-years.png', 'og/fa-years.png', 'og/en-2028.png', 'og/fa-2028.png']) {
    if (!(await exists(asset))) {
      throw new Error(`Missing built OG asset: ${asset}`);
    }
  }
  for (const staleAsset of ['og-image.png', 'og-image.svg']) {
    if (await exists(staleAsset)) {
      throw new Error(`Found stale legacy OG asset still present: ${staleAsset}`);
    }
  }
  checks.push('OG assets');

  checks.push('bootstrap locale redirect behavior');

  console.log('SEO smoke check passed:');
  for (const check of checks) {
    console.log(`- ${check}`);
  }
}

await main();
