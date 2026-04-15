# SEO Checklist

## Search Console

- Verify `https://norouz.akhave.in/` in Google Search Console
- Submit sitemap: `https://norouz.akhave.in/sitemap.xml`
- Request indexing in this order:
  - **Priority 1**
    - `/`
    - `/en/`
    - `/fa/`
    - `/years/`
    - `/en/years/`
    - `/fa/years/`
  - **Priority 2**
    - `/2028/`
    - `/en/2028/`
    - `/fa/2028/`
    - `/2029/`
    - `/en/2029/`
    - `/fa/2029/`
    - `/2030/`
    - `/en/2030/`
    - `/fa/2030/`
  - **Priority 3**
    - `/2026/`
    - `/en/2026/`
    - `/fa/2026/`
    - `/2027/`
    - `/en/2027/`
    - `/fa/2027/`
- If time is tight, submit Priority 1 first, then Priority 2. Priority 3 can follow once the hub and newer year pages are picked up.
- Check the Indexing > Pages report for duplicates, alternate-canonical issues, and excluded pages
- Monitor Performance for query variants like `nowruz`, `norouz`, `نوروز`, `persian new year`, `tahvil`, and `haft-sin`
- Use URL Inspection on `/years/` and `/en/years/` first if Google is slow to discover the new hub pages naturally

## Bing Webmaster Tools

- Verify `https://norouz.akhave.in/` in Bing Webmaster Tools
- Submit sitemap: `https://norouz.akhave.in/sitemap.xml`
- Inspect the same landing pages for crawl/index status, especially `/years/`, `/en/years/`, and `/fa/years/`

## Content and snippet review

- Confirm titles/descriptions render correctly on `/`, `/en/`, `/fa/`, hub pages, and year pages
- Confirm `hreflang` alternates are present and correct
- Confirm canonical URLs match each page’s intended URL
- Confirm FAQ and Event JSON-LD are present in rendered HTML, including static fallback pages
- Re-check social previews for the homepage, one hub page, and at least one year page

## Follow-up ideas

- Add more year pages as the site evolves
- Expand FAQ coverage using real Search Console queries
- Consider separate locale-specific OG images later
