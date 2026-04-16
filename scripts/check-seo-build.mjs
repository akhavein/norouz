import fs from 'node:fs/promises';
import path from 'node:path';
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

async function main() {
  const checks = [];

  const enHome = await read('en/index.html');
  assertIncludes(enHome, 'Browse Nowruz by year', 'English homepage year section');
  assertIncludes(enHome, '/en/years/', 'English homepage years hub link');
  checks.push('en homepage copy + hub link');

  const faHome = await read('index.html');
  assertIncludes(faHome, 'مرور سال', 'Farsi homepage year section');
  assertIncludes(faHome, '/years/', 'Farsi homepage years hub link');
  checks.push('fa homepage copy + hub link');

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

  const yearsHub = await read('en/years/index.html');
  assertIncludes(yearsHub, 'CollectionPage', 'years hub CollectionPage schema');
  assertIncludes(yearsHub, 'ItemList', 'years hub ItemList schema');
  assertIncludes(yearsHub, 'https://norouz.akhave.in/en/2028/', 'years hub 2028 link');
  assertIncludes(yearsHub, 'https://norouz.akhave.in/og/en-years.png', 'years hub OG image');
  checks.push('years hub schema + links + OG');

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

  console.log('SEO smoke check passed:');
  for (const check of checks) {
    console.log(`- ${check}`);
  }
}

await main();
