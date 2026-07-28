import { cookies } from "next/headers";
import {
  LOCALES,
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  translate,
  type Locale,
} from "./messages";

/** Locale courante côté serveur (lue depuis le cookie). */
export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const v = store.get(LOCALE_COOKIE)?.value as Locale | undefined;
  return v && LOCALES.includes(v) ? v : DEFAULT_LOCALE;
}

/** Fonction de traduction pour composants serveur. */
export async function getT(): Promise<{
  locale: Locale;
  t: (key: string) => string;
}> {
  const locale = await getLocale();
  return { locale, t: (key: string) => translate(locale, key) };
}
