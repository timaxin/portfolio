/**
 * Where `src/proxy.ts` leaves the locale it resolved for the request.
 *
 * Pages read the locale from their route params. `not-found.tsx` cannot: it
 * renders in place of a route that never matched, so it is handed no params at
 * all — and a 404 that guesses the language wrong is a worse 404.
 */
export const LOCALE_HEADER = "x-locale";
