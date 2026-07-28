// Socle i18n maison (FR / EN / IT) — sans dépendance externe.
// Clés à plat "section.cle". Fallback : locale -> fr -> clé.

export const LOCALES = ["fr", "en", "it"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";
export const LOCALE_COOKIE = "amk-locale";

export const LOCALE_META: Record<Locale, { label: string; short: string }> = {
  fr: { label: "Français", short: "FR" },
  en: { label: "English", short: "EN" },
  it: { label: "Italiano", short: "IT" },
};

type Dict = Record<string, string>;

const fr: Dict = {
  // Navigation
  "nav.home": "Accueil",
  "nav.marketplace": "Marketplace",
  "nav.filieres": "Filières",
  "nav.pays": "Pays",
  "nav.evenements": "Événements",
  "nav.apropos": "À propos",
  "nav.publish": "Publier une annonce",
  // Header actions
  "action.search": "Rechercher un produit, une filière, un pays…",
  "action.publish": "Publier",
  "action.login": "Se connecter",
  "action.register": "S'inscrire",
  "action.logout": "Se déconnecter",
  "action.myspace": "Mon espace",
  "action.messages": "Mes messages",
  "action.createAccount": "Créer mon compte gratuit",
  "action.menu": "Menu",
  // Langue
  "lang.choose": "Choisir la langue",
  // Footer
  "footer.join": "Rejoignez-nous",
  "footer.rights": "Tous droits réservés.",
};

const en: Dict = {
  "nav.home": "Home",
  "nav.marketplace": "Marketplace",
  "nav.filieres": "Sectors",
  "nav.pays": "Countries",
  "nav.evenements": "Events",
  "nav.apropos": "About",
  "nav.publish": "Post a listing",
  "action.search": "Search a product, a sector, a country…",
  "action.publish": "Post",
  "action.login": "Sign in",
  "action.register": "Sign up",
  "action.logout": "Sign out",
  "action.myspace": "My space",
  "action.messages": "My messages",
  "action.createAccount": "Create my free account",
  "action.menu": "Menu",
  "lang.choose": "Choose language",
  "footer.join": "Join us",
  "footer.rights": "All rights reserved.",
};

const it: Dict = {
  "nav.home": "Home",
  "nav.marketplace": "Marketplace",
  "nav.filieres": "Filiere",
  "nav.pays": "Paesi",
  "nav.evenements": "Eventi",
  "nav.apropos": "Chi siamo",
  "nav.publish": "Pubblica un annuncio",
  "action.search": "Cerca un prodotto, una filiera, un paese…",
  "action.publish": "Pubblica",
  "action.login": "Accedi",
  "action.register": "Registrati",
  "action.logout": "Esci",
  "action.myspace": "Il mio spazio",
  "action.messages": "I miei messaggi",
  "action.createAccount": "Crea il mio account gratuito",
  "action.menu": "Menu",
  "lang.choose": "Scegli la lingua",
  "footer.join": "Unisciti a noi",
  "footer.rights": "Tutti i diritti riservati.",
};

export const MESSAGES: Record<Locale, Dict> = { fr, en, it };

export function getDict(locale: Locale): Dict {
  return MESSAGES[locale] ?? MESSAGES.fr;
}

/** Traduit une clé pour une locale, avec fallback fr puis clé brute. */
export function translate(locale: Locale, key: string): string {
  return MESSAGES[locale]?.[key] ?? MESSAGES.fr[key] ?? key;
}
