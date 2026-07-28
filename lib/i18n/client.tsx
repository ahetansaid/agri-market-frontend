"use client";

import { createContext, useContext, type ReactNode } from "react";
import { translate, DEFAULT_LOCALE, type Locale } from "./messages";

interface Ctx {
  locale: Locale;
  t: (key: string) => string;
}

const LocaleContext = createContext<Ctx>({
  locale: DEFAULT_LOCALE,
  t: (k) => translate(DEFAULT_LOCALE, k),
});

/** Fournit la locale aux composants client (semé par le layout serveur). */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const value: Ctx = { locale, t: (key: string) => translate(locale, key) };
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

/** Hook de traduction pour composants client. */
export function useT(): Ctx {
  return useContext(LocaleContext);
}
