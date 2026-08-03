"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, MessageSquareText } from "lucide-react";
import { FAQ_CATEGORIES } from "@/lib/content/faq";

/** Normalise (minuscules + sans accents) pour une recherche tolérante. */
function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function FaqView() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const q = norm(query.trim());

  const filtered = useMemo(() => {
    if (!q) return FAQ_CATEGORIES;
    return FAQ_CATEGORIES.map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (it) => norm(it.q).includes(q) || norm(it.a).includes(q),
      ),
    })).filter((cat) => cat.items.length > 0);
  }, [q]);

  const hasResults = filtered.length > 0;

  return (
    <div>
      {/* Recherche */}
      <div className="mx-auto flex max-w-xl items-center gap-2 rounded-2xl border border-border bg-card px-4 py-2.5 shadow-sm focus-within:border-brand-400">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher une question (ex : comment publier ?)"
          className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
        />
      </div>

      {/* Résultats */}
      {hasResults ? (
        <div className="mt-10 space-y-10">
          {filtered.map((cat) => (
            <section key={cat.id}>
              <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground">
                <span className="h-4 w-1 rounded bg-gradient-to-b from-brand-500 to-harvest-500" />
                {cat.label}
              </h2>
              <ul className="space-y-3">
                {cat.items.map((it) => {
                  const id = `${cat.id}::${it.q}`;
                  const isOpen = open === id;
                  return (
                    <li
                      key={id}
                      className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:border-brand-200"
                    >
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : id)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="font-medium text-foreground">{it.q}</span>
                        <ChevronDown
                          className={`h-5 w-5 shrink-0 text-brand-600 transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          strokeWidth={2}
                        />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="whitespace-pre-line px-5 pb-5 text-sm leading-relaxed text-foreground/75">
                            {it.a}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="mx-auto mt-12 max-w-md rounded-2xl border border-border bg-card px-6 py-10 text-center shadow-sm">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-secondary text-brand-600">
            <MessageSquareText className="h-6 w-6" strokeWidth={2} />
          </div>
          <h3 className="mt-4 font-display text-lg font-semibold">Pas de résultat</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Aucune réponse ne correspond à votre recherche. Essayez d'autres
            mots-clés ou contactez-nous directement.
          </p>
        </div>
      )}
    </div>
  );
}
