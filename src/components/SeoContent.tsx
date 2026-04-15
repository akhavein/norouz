import { useLanguage } from '../i18n/LanguageContext';
import { formatIRST, formatLocal, formatUTC } from '../utils/dateHelpers';
import { toPersianNumerals } from '../utils/persian';
import { buildSitePath } from '../utils/siteRoutes';

interface SeoContentProps {
  target: Date | null;
  year: number | null;
  shamsiYear: number | null;
  focusedYear: number | null;
}

export function SeoContent({ target, year, shamsiYear, focusedYear }: SeoContentProps) {
  const { locale } = useLanguage();

  const fa = locale === 'fa';
  const effectiveYear = focusedYear ?? year;
  const gregorianYearLabel = effectiveYear ? (fa ? toPersianNumerals(effectiveYear) : String(effectiveYear)) : '';
  const shamsiYearLabel = shamsiYear ? (fa ? toPersianNumerals(shamsiYear) : String(shamsiYear)) : '';
  const years = [2026, 2027, 2028, 2029, 2030];

  const faqs = fa
    ? [
        {
          q: 'نوروز چیست؟',
          a: 'نوروز سال نوی ایرانی و آغاز بهار است که در لحظهٔ دقیق اعتدال بهاری آغاز می‌شود. به همین دلیل زمان تحویل سال از نظر فرهنگی و نجومی اهمیت زیادی دارد.',
        },
        {
          q: year ? `نوروز ${gregorianYearLabel} چه زمانی است؟` : 'نوروز چه زمانی است؟',
          a: target
            ? `در این صفحه زمان دقیق تحویل سال را در ساعت محلی شما، تهران و UTC می‌بینید. لحظهٔ نوروز ${gregorianYearLabel} برابر است با ${formatIRST(target)}.`
            : 'در این صفحه زمان دقیق نوروز به‌صورت زنده نمایش داده می‌شود.',
        },
        {
          q: 'هفت‌سین چیست؟',
          a: 'هفت‌سین سفرهٔ سنتی نوروزی است که با هفت نماد آغازشونده با حرف سین چیده می‌شود و مفاهیمی مثل نوزایی، تندرستی، فراوانی، عشق و شکیبایی را بازتاب می‌دهد.',
        },
        {
          q: 'چرا لحظهٔ دقیق تحویل سال مهم است؟',
          a: 'نوروز بر اساس تقویم خورشیدی و لحظهٔ واقعی اعتدال بهاری تعیین می‌شود، نه صرفاً تغییر یک تاریخ قراردادی. به همین دلیل ساعت دقیق تحویل سال در فرهنگ ایرانی جایگاه ویژه‌ای دارد.',
        },
      ]
    : [
        {
          q: 'What is Nowruz?',
          a: 'Nowruz is the Persian New Year and the start of spring, celebrated at the exact astronomical moment of the vernal equinox.',
        },
        {
          q: year ? `When is Nowruz ${gregorianYearLabel}?` : 'When is Nowruz?',
          a: target
            ? `This page shows the exact Tahvil time for Nowruz ${gregorianYearLabel} in your local time, Tehran time, and UTC. The Tehran-time reference is ${formatIRST(target)}.`
            : 'This page shows the exact Tahvil time for the next Nowruz as a live countdown.',
        },
        {
          q: 'What is Haft-Sin?',
          a: 'Haft-Sin is the traditional Nowruz table arranged with seven symbolic items whose Persian names begin with the letter sin, representing renewal, health, abundance, love, and patience.',
        },
        {
          q: 'Why does the exact equinox matter?',
          a: 'Nowruz is tied to the solar calendar and begins at the real astronomical equinox, not simply at midnight on a fixed date. That exact moment is the Tahvil of the year.',
        },
      ];

  return (
    <section
      className="w-full max-w-3xl rounded-3xl border border-persian-gold/15 bg-cream/70 dark:bg-dark-surface/60 px-5 py-6 sm:px-8 sm:py-8 text-warm-charcoal/80 dark:text-cream/80 shadow-sm"
      dir={fa ? 'rtl' : 'ltr'}
    >
      <div className="space-y-6">
        <header className="space-y-3 text-center">
          <h2 className={`text-2xl sm:text-3xl font-bold text-warm-charcoal dark:text-cream ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
            {fa ? 'نوروز، Nowruz و Norouz' : 'Nowruz, Norouz, and نوروز'}
          </h2>
          <p className={`text-sm sm:text-base leading-7 ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
            {fa
              ? `نوروز ${shamsiYearLabel ? `${shamsiYearLabel} ` : ''}آغاز سال نوی ایرانی و جشن اعتدال بهاری است. این صفحه زمان دقیق تحویل سال را نشان می‌دهد و در کنار آن توضیحی کوتاه دربارهٔ هفت‌سین، تحویل سال، Nowruz، Norouz و رسم‌های نوروزی ارائه می‌کند.`
              : `Nowruz, also spelled Norouz and written نوروز in Persian, is the Persian New Year celebrated at the exact moment of the spring equinox. This page explains the exact Tahvil timing, common spellings, and core traditions like Haft-Sin and Sizdah Bedar.`}
          </p>
          <p className={`text-sm sm:text-base leading-7 ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
            {fa
              ? 'اگر به دنبال این هستید که نوروز چه زمانی است، تحویل سال به وقت تهران چه ساعتی است، یا تفاوت سال‌های مختلف نوروز را ببینید، از اینجا می‌توانید هم لحظهٔ دقیق اعتدال بهاری را ببینید و هم وارد صفحهٔ سال‌های مختلف شوید.'
              : 'If you are searching for when Nowruz is, what time Tahvil happens in Tehran, or how different Nowruz years compare, this page gives you the exact equinox timing and quick paths into year-specific pages.'}
          </p>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-persian-gold/15 bg-persian-gold/5 px-4 py-4">
            <h3 className={`text-base font-semibold text-persian-gold mb-2 ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
              {fa ? `زمان تحویل سال ${gregorianYearLabel}` : `When is Nowruz ${gregorianYearLabel}`}
            </h3>
            {target ? (
              <div className="space-y-2 text-sm leading-6">
                <p><strong>{fa ? 'تهران:' : 'Tehran:'}</strong> {formatIRST(target)}</p>
                <p><strong>{fa ? 'محلی شما:' : 'Your local time:'}</strong> {formatLocal(target)}</p>
                <p><strong>UTC:</strong> {formatUTC(target)}</p>
              </div>
            ) : (
              <p className="text-sm">{fa ? 'زمان دقیق به‌زودی بارگذاری می‌شود.' : 'The exact time will load shortly.'}</p>
            )}
          </section>

          <section className="rounded-2xl border border-persian-gold/15 bg-persian-gold/5 px-4 py-4">
            <h3 className={`text-base font-semibold text-persian-gold mb-2 ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
              {fa ? 'هفت‌سین و رسم‌های نوروزی' : 'Haft-Sin and Nowruz traditions'}
            </h3>
            <p className={`text-sm leading-6 ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
              {fa
                ? 'هفت‌سین با هفت نماد اصلی چیده می‌شود و در کنار آن آیینه، شمع، ماهی، تخم‌مرغ رنگی و موسیقی تحویل سال، فضای نوروز را کامل می‌کنند. سیزده‌بدر نیز پایان آیین‌های نوروزی در دامان طبیعت است.'
                : 'The Haft-Sin table is arranged with seven symbolic items. Mirrors, candles, painted eggs, goldfish, Tahvil music, family visits, and Sizdah Bedar in nature all help shape the Nowruz season.'}
            </p>
          </section>
        </div>

        <section className="rounded-2xl border border-persian-gold/15 bg-white/60 dark:bg-dark-bg/35 px-4 py-4 space-y-3">
          <h3 className={`text-xl font-semibold text-warm-charcoal dark:text-cream ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
            {fa ? 'مرور سال‌های نوروز' : 'Browse Nowruz by year'}
          </h3>
          <p className={`text-sm leading-7 ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
            {fa
              ? 'برای جستجوهایی مثل «نوروز ۲۰۲۸ چه زمانی است؟» یا «تحویل سال ۲۰۳۰»، می‌توانید وارد صفحهٔ هر سال شوید یا همهٔ سال‌ها را یکجا در مرکز سال‌ها ببینید.'
              : 'For searches like “When is Nowruz 2028?” or “Tahvil time 2030,” you can jump into each year page directly or open the full years hub.'}
          </p>
          <div className={`flex flex-wrap gap-2 ${fa ? 'justify-end' : ''}`}>
            <a
              href={buildSitePath(fa ? 'fa' : 'en', null).replace(/\/$/, '') + '/years/'}
              className={`inline-flex items-center rounded-full border border-persian-gold/30 px-3 py-1.5 text-sm font-semibold text-persian-gold hover:bg-persian-gold/10 transition-colors ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}
            >
              {fa ? 'همهٔ سال‌ها' : 'All years'}
            </a>
            {years.map((itemYear) => (
              <a
                key={itemYear}
                href={buildSitePath(fa ? 'fa' : 'en', itemYear)}
                className={`inline-flex items-center rounded-full border border-persian-gold/20 px-3 py-1.5 text-sm text-warm-charcoal/80 dark:text-cream/80 hover:bg-persian-gold/10 transition-colors ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}
              >
                {fa ? `نوروز ${toPersianNumerals(itemYear)}` : `Nowruz ${itemYear}`}
              </a>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className={`text-xl font-semibold text-warm-charcoal dark:text-cream ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
            {fa ? 'سوال‌های رایج دربارهٔ نوروز' : 'Frequently asked questions about Nowruz'}
          </h3>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="rounded-2xl border border-persian-gold/15 bg-white/60 dark:bg-dark-bg/35 px-4 py-3">
                <summary className={`cursor-pointer text-sm sm:text-base font-semibold text-persian-gold ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
                  {faq.q}
                </summary>
                <p className={`mt-3 text-sm leading-7 ${fa ? "font-['Vazirmatn',sans-serif]" : ''}`}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
