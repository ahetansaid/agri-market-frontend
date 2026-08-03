"use client";

import { useMemo, useState } from "react";
import { Search, ChevronDown, MessageSquareText, X } from "lucide-react";
import { FAQ_CATEGORIES } from "@/lib/content/faq";

/** Normalise (minuscules + sans accents) pour une recherche tolérante. */
function norm(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

const TOTAL = FAQ_CATEGORIES.reduce((n, c) => n + c.items.length, 0);

export function FaqView() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [open, setOpen] = useState<string | null>(null);

  const q = norm(query.trim());

  const filtered = useMemo(() => {
    return FAQ_CATEGORIES.filter((c) => cat === "all" || c.id === cat)
      .map((c) => ({
        ...c,
        items: c.items.filter(
          (it) => !q || norm(it.q).includes(q) || norm(it.a).includes(q),
        ),
      }))
      .filter((c) => c.items.length > 0);
  }, [q, cat]);

  const count = filtered.reduce((n, c) => n + c.items.length, 0);
  const hasResults = count > 0;

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
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Effacer"
            className="shrink-0 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Filtres par catégorie */}
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        <Chip active={cat === "all"} onClick={() => setCat("all")} label="Toutes" n={TOTAL} />
        {FAQ_CATEGORIES.map((c) => (
          <Chip
            key={c.id}
            active={cat === c.id}
            onClick={() => setCat(c.id)}
            label={c.label}
            n={c.items.length}
          />
        ))}
      </div>

      {/* Compteur */}
      <p className="mt-5 text-center text-xs font-medium text-muted-foreground">
        {count} question{count > 1 ? "s" : ""}
        {q && " correspondant à votre recherche"}
      </p>

      {/* Résultats */}
      {hasResults ? (
        <div className="mt-6 space-y-10">
          {filtered.map((c) => (
            <section key={c.id}>
              {cat === "all" && (
                <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-foreground">
                  <span className="h-4 w-1 rounded bg-gradient-to-b from-brand-500 to-harvest-500" />
                  {c.label}
                </h2>
              )}
              <ul className="space-y-3">
                {c.items.map((it) => {
                  const id = `${c.id}::${it.q}`;
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
            Aucune réponse ne correspond. Essayez d'autres mots-clés ou changez de
            catégorie.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCat("all");
            }}
            className="mt-4 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Réinitialiser
          </button>
        </div>
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  label,
  n,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  n: number;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
        active
          ? "border-brand-600 bg-brand-600 text-white shadow-sm"
          : "border-border bg-card text-foreground/70 hover:border-brand-300 hover:text-brand-700"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 text-xs font-bold ${
          active ? "bg-white/20 text-white" : "bg-secondary text-muted-foreground"
        }`}
      >
        {n}
      </span>
    </button>
  );
}
