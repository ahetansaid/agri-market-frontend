"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { Search, Star } from "lucide-react";

interface HeroProps {
  stats: {
    producteurs: number;
    pays_africains: number;
    filieres: number;
    annonces_actives: number;
  };
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

export function Hero({ stats }: HeroProps) {
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl"
        >
          {/* Badge live */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-sand-900/55 px-6 py-3 backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-harvest-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-harvest-500" />
            </span>
            <Star className="h-5 w-5 text-gold" strokeWidth={2.5} />
            <span className="text-base font-bold text-white sm:text-lg">
              {stats.annonces_actives} annonces en direct
            </span>
          </div>

          {/* Titre */}
          <h1 className="font-display text-6xl font-medium leading-[0.95] tracking-tight drop-shadow-xl sm:text-7xl md:text-8xl lg:text-[6.75rem]">
            Le marché vivant de
            <br />
            <em className="font-normal italic">
              <span className="bg-gradient-to-r from-brand-300 via-brand-200 to-harvest-300 bg-clip-text text-transparent">
                l&apos;Afrique agricole.
              </span>
            </em>
          </h1>

          {/* Recherche */}
          <form
            action="/annonces"
            method="GET"
            className="mx-auto mt-8 flex max-w-xl flex-wrap items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-black/40"
          >
            <div className="flex flex-1 items-center gap-2 px-3">
              <Search className="h-5 w-5 shrink-0 text-brand-600" strokeWidth={2.5} />
              <input
                type="search"
                name="q"
                placeholder="Cacao, mil, bovins, tracteur…"
                className="min-w-[140px] flex-1 bg-transparent py-3 text-sm text-sand-900 placeholder-sand-400 outline-none"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:shadow-brand-600/50"
            >
              Rechercher
            </button>
          </form>

          {/* Chips */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
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
