import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { pathToFileURL } from 'node:url';

const execFileAsync = promisify(execFile);
const root = new URL('../', import.meta.url);

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, got ${actual}`);
  }
}

async function main() {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'norouz-route-check-'));

  try {
    const outDir = path.join(tempDir, 'compiled');
    const source = path.join(new URL('../src/utils/siteRoutes.ts', import.meta.url).pathname);

    await execFileAsync(
      process.platform === 'win32' ? 'npx.cmd' : 'npx',
      [
        'tsc',
        source,
        '--target', 'es2022',
        '--module', 'nodenext',
        '--moduleResolution', 'nodenext',
        '--outDir', outDir,
      ],
      { cwd: path.join(new URL('../', import.meta.url).pathname) }
    );

    const compiledPath = path.join(outDir, 'siteRoutes.js');
    const mod = await import(pathToFileURL(compiledPath).href);

    const enHub = mod.getSiteRouteInfo('/en/years/');
    assertEqual(enHub.locale, 'en', 'en hub locale');
    assertEqual(enHub.year, null, 'en hub year');
    assertEqual(enHub.pageKind, 'yearsHub', 'en hub page kind');

    const faHub = mod.getSiteRouteInfo('/fa/years/');
    assertEqual(faHub.locale, 'fa', 'fa hub locale');
    assertEqual(faHub.year, null, 'fa hub year');
    assertEqual(faHub.pageKind, 'yearsHub', 'fa hub page kind');

    const rootHub = mod.getSiteRouteInfo('/years/');
    assertEqual(rootHub.locale, null, 'root hub locale');
    assertEqual(rootHub.year, null, 'root hub year');
    assertEqual(rootHub.pageKind, 'yearsHub', 'root hub page kind');

    const yearRoute = mod.getSiteRouteInfo('/en/2028/');
    assertEqual(yearRoute.locale, 'en', 'year route locale');
    assertEqual(yearRoute.year, 2028, 'year route year');
    assertEqual(yearRoute.pageKind, 'year', 'year route page kind');

    const homeRoute = mod.getSiteRouteInfo('/fa/');
    assertEqual(homeRoute.locale, 'fa', 'home route locale');
    assertEqual(homeRoute.year, null, 'home route year');
    assertEqual(homeRoute.pageKind, 'home', 'home route page kind');

    assertEqual(mod.buildSitePath('en', null, 'yearsHub'), '/en/years/', 'buildSitePath en hub');
    assertEqual(mod.buildSitePath('fa', null, 'yearsHub'), '/fa/years/', 'buildSitePath fa hub');
    assertEqual(mod.buildSitePath(null, null, 'yearsHub'), '/years/', 'buildSitePath root hub');
    assertEqual(mod.buildSitePath('en', 2028, 'year'), '/en/2028/', 'buildSitePath year');
    assertEqual(mod.buildSitePath('fa', null, 'home'), '/fa/', 'buildSitePath home');
    assertEqual(mod.buildYearsHubPath('en'), '/en/years/', 'buildYearsHubPath en');
    assertEqual(mod.buildAbsoluteYearsHubUrl('fa'), 'https://norouz.akhave.in/fa/years/', 'buildAbsoluteYearsHubUrl fa');
    assertEqual(mod.resolveContentRouteLocale(null, 'fa'), null, 'x-default Farsi content links stay x-default');
    assertEqual(mod.resolveContentRouteLocale(null, 'en'), 'en', 'x-default English content links localize to en');
    assertEqual(mod.resolveContentRouteLocale('fa', 'fa'), 'fa', 'localized Farsi route stays fa');
    assertEqual(mod.resolveContentRouteLocale('en', 'en'), 'en', 'localized English route stays en');

    console.log('Route model check passed:');
    console.log('- years hub routes are classified correctly');
    console.log('- home/year/years-hub paths build correctly');
    console.log('- locale switching targets for years hubs stay on years hubs');
    console.log('- x-default content links preserve x-default for Farsi and localize for English');
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

await main();
