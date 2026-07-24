"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { Search, Star, Layers, Globe, SlidersHorizontal } from "lucide-react";
import type { Category } from "@/lib/api";

interface HeroProps {
  stats: {
    producteurs: number;
    pays_africains: number;
    filieres: number;
    annonces_actives: number;
  };
  categories?: Category[];
  /** { "BJ": 12, "SN": 4, ... } — pays ayant de l'activité */
  countries?: Record<string, number>;
}

const CHIPS = [
  { label: "Céréales", q: "céréales" },
  { label: "Cacao & Café", q: "cacao" },
  { label: "Élevage", q: "mouton" },
  { label: "Maraîchage", q: "tomate" },
  { label: "Tubercules", q: "igname" },
];

// Rangées d'images qui défilent horizontalement (sens alternés)
const ROWS: { dir: "left" | "right"; imgs: string[] }[] = [
  {
    dir: "left",
    imgs: ["tomate.jpg", "cacao.jpg", "mil.jpg", "mouton.jpg", "oignons.jpg", "igname.jpg"],
  },
  {
    dir: "right",
    imgs: ["cafe.jpg", "piments.jpg", "Riz.jpg", "Dindons.jpg", "fleurs.jpg", "tomate.jpg"],
  },
  {
    dir: "left",
    imgs: ["cacao.jpg", "mil.jpg", "oignons.jpg", "mouton.jpg", "igname.jpg", "piments.jpg"],
  },
];

const DURATIONS = ["55s", "65s", "60s"];

export function Hero({ stats, categories = [], countries = {} }: HeroProps) {
  // Liste de pays triée par volume d'annonces, avec nom lisible en français.
  const countryOptions = useMemo(() => {
    let naming: Intl.DisplayNames | null = null;
    try {
      naming = new Intl.DisplayNames(["fr"], { type: "region" });
    } catch {
      naming = null;
    }
    return Object.entries(countries)
      .filter(([code]) => code && code.length === 2)
      .sort((a, b) => b[1] - a[1])
      .map(([code]) => ({
        code,
        name: (naming?.of(code.toUpperCase()) ?? code) as string,
      }));
  }, [countries]);

  return (
    <section className="relative h-[660px] overflow-hidden bg-sand-900 text-white lg:h-[740px]">
      {/* Mur d'images qui défilent horizontalement */}
      <div className="marquee-pause absolute inset-0 flex flex-col gap-3 p-3">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex-1 overflow-hidden">
            <div
              className={`flex h-full w-max gap-3 ${row.dir === "left" ? "animate-marquee" : "animate-marquee-rev"}`}
              style={{ "--marquee-duration": DURATIONS[ri] } as CSSProperties}
            >
              {[...row.imgs, ...row.imgs].map((img, i) => (
                <div
                  key={i}
                  className="relative h-full w-52 shrink-0 overflow-hidden rounded-2xl sm:w-60"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/images/produits/${img}`}
                    alt=""
                    loading={ri === 0 && i < 3 ? "eager" : "lazy"}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Scrim pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-b from-sand-900/70 via-sand-900/45 to-sand-900/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(28,25,23,0.6)_0%,_rgba(28,25,23,0.2)_45%,_transparent_75%)]" />
      <div className="pointer-events-none absolute -left-24 top-1/3 h-96 w-96 rounded-full bg-brand-600 opacity-25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-96 w-96 rounded-full bg-harvest-600 opacity-20 blur-[130px]" />

      {/* Contenu centré */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          {/* Badge live */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-sand-900/55 px-5 py-2.5 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-harvest-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-harvest-500" />
            </span>
            <Star className="h-4 w-4 text-gold" strokeWidth={2.5} />
            <span className="text-sm font-bold text-white sm:text-base">
              {stats.annonces_actives} annonces en direct
            </span>
          </div>

          {/* Titre — pleine largeur, taille fluide.
              Une seule ligne dès 640px ; wrap uniquement sur très petit mobile
              pour rester lisible. */}
          <h1 className="font-display text-[clamp(1.6rem,3.7vw,5rem)] font-medium leading-[1.1] tracking-tight drop-shadow-xl sm:whitespace-nowrap">
            L&apos;agriculture africaine{" "}
            <em className="font-normal italic">
              <span className="bg-gradient-to-r from-brand-300 via-brand-200 to-harvest-300 bg-clip-text text-transparent">
                à portée de main.
              </span>
            </em>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm text-white/70 sm:text-base">
            {stats.producteurs.toLocaleString("fr-FR")} producteurs · {stats.filieres} filières ·
            54 pays. Sans commission, sans intermédiaire.
          </p>

          {/* Recherche avancée : mot-clé + filière + pays */}
          <form
            action="/annonces"
            method="GET"
            className="mx-auto mt-8 w-full max-w-3xl rounded-3xl bg-white/97 p-2.5 shadow-2xl shadow-black/40 backdrop-blur supports-[backdrop-filter]:bg-white/95"
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center">
              {/* Mot-clé */}
              <div className="flex flex-1 items-center gap-2.5 rounded-2xl px-3.5 md:px-3">
                <Search className="h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.5} />
                <input
                  type="search"
                  name="q"
                  placeholder="Cacao, mil, bovins, tracteur…"
                  aria-label="Rechercher un produit"
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-sand-900 placeholder-sand-400 outline-none"
                />
              </div>

              <span className="hidden h-7 w-px shrink-0 bg-sand-200 md:block" />

              {/* Filière */}
              <div className="flex items-center gap-2 rounded-2xl bg-sand-50 px-3.5 md:bg-transparent md:px-2">
                <Layers className="h-4 w-4 shrink-0 text-harvest-600" strokeWidth={2.5} />
                <select
                  name="category"
                  aria-label="Filtrer par filière"
                  defaultValue=""
                  className="w-full min-w-0 cursor-pointer bg-transparent py-3 text-sm text-sand-900 outline-none md:w-36"
                >
                  <option value="">Toutes filières</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <span className="hidden h-7 w-px shrink-0 bg-sand-200 md:block" />

              {/* Pays */}
              <div className="flex items-center gap-2 rounded-2xl bg-sand-50 px-3.5 md:bg-transparent md:px-2">
                <Globe className="h-4 w-4 shrink-0 text-brand-600" strokeWidth={2.5} />
                <select
                  name="country"
                  aria-label="Filtrer par pays"
                  defaultValue=""
                  className="w-full min-w-0 cursor-pointer bg-transparent py-3 text-sm text-sand-900 outline-none md:w-32"
                >
                  <option value="">Tous pays</option>
                  {countryOptions.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:-translate-y-0.5 hover:shadow-brand-600/50 md:py-3"
              >
                <SlidersHorizontal className="h-4 w-4 md:hidden" strokeWidth={2.5} />
                Rechercher
              </button>
            </div>
          </form>

          {/* Chips */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {CHIPS.map((c) => (
              <Link
                key={c.label}
                href={`/annonces?q=${encodeURIComponent(c.q)}`}
                className="rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm transition hover:border-harvest-300 hover:bg-white/20"
              >
                {c.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
