// Vernal Equinox UTC timestamps (2025-2040)
// Sources: USNO, timeanddate.com, AstroPixels (cross-referenced)
export const EQUINOX_UTC: Record<number, number> = {
  2025: Date.UTC(2025, 2, 20,  9,  1, 25),
  2026: Date.UTC(2026, 2, 20, 14, 45, 53),
  2027: Date.UTC(2027, 2, 20, 20, 24, 18),
  2028: Date.UTC(2028, 2, 20,  2, 16, 32),
  2029: Date.UTC(2029, 2, 20,  8,  1,  3),
  2030: Date.UTC(2030, 2, 20, 13, 51, 15),
  2031: Date.UTC(2031, 2, 20, 19, 40, 26),
  2032: Date.UTC(2032, 2, 20,  1, 21, 30),
  2033: Date.UTC(2033, 2, 20,  7, 22, 18),
  2034: Date.UTC(2034, 2, 20, 13, 16, 53),
  2035: Date.UTC(2035, 2, 20, 19,  2, 42),
  2036: Date.UTC(2036, 2, 20,  1,  1, 59),
  2037: Date.UTC(2037, 2, 20,  6, 49,  1),
  2038: Date.UTC(2038, 2, 20, 12, 39, 47),
  2039: Date.UTC(2039, 2, 20, 18, 31, 20),
  2040: Date.UTC(2040, 2, 20,  0, 10, 51),
};

// Fallback for years outside the table
export async function getEquinoxFallback(year: number): Promise<Date> {
  const { Seasons } = await import('astronomy-engine');
  return Seasons(year).mar_equinox.date;
}

// IRST = UTC+3:30
const IRST_OFFSET_MS = 3.5 * 60 * 60 * 1000;
// Solar noon in Tehran ≈ 12:14 IRST = 08:44 UTC
const SOLAR_NOON_UTC_MS = (8 * 60 + 44) * 60 * 1000;
const MS_PER_DAY = 86_400_000;

/**
 * Get the UTC timestamp for end of the Norouz celebration period.
 * Correctly applies the solar noon rule to determine 1 Farvardin,
 * then returns midnight IRST on (1 Farvardin + days).
 */
export function getCelebrationEndMs(equinoxMs: number, days: number): number {
  const isAfterSolarNoon = (equinoxMs % MS_PER_DAY) >= SOLAR_NOON_UTC_MS;
  const eqIRST = new Date(equinoxMs + IRST_OFFSET_MS);
  let day = eqIRST.getUTCDate();
  if (isAfterSolarNoon) day += 1;
  return Date.UTC(eqIRST.getUTCFullYear(), eqIRST.getUTCMonth(), day + days) - IRST_OFFSET_MS;
}
