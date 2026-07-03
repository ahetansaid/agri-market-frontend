"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

interface HeroProps {
  stats: {
    producteurs: number;
    pays_africains: number;
    filieres: number;
    annonces_actives: number;
  };
}

export function Hero({ stats }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-sand-900 text-white">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute -left-24 top-10 h-[560px] w-[560px] rounded-full bg-brand-600"
          style={{ filter: "blur(120px)", opacity: 0.35 }}
          animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 top-40 h-[440px] w-[440px] rounded-full bg-brand-400"
          style={{ filter: "blur(120px)", opacity: 0.25 }}
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 bottom-0 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-harvest-600"
          style={{ filter: "blur(120px)", opacity: 0.15 }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Adinkra pattern subtle */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><defs><pattern id='a' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'><path d='M30 6 L54 30 L30 54 L6 30 Z' fill='none' stroke='%23ffffff' stroke-width='1.2'/><circle cx='30' cy='30' r='3' fill='%23ffffff'/></pattern></defs><rect width='120' height='120' fill='url(%23a)'/></svg>")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:py-40">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/90">
            La marketplace de référence en Afrique
          </span>
        </motion.div>

        {/* Titre */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl font-medium leading-[0.98] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
        >
          L&apos;agriculture africaine,
          <br />
          <em className="italic font-normal bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
            connectée au monde.
          </em>
        </motion.h1>

        {/* Lead */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-white/70"
        >
          Producteurs, coopératives, acheteurs — la première marketplace
          panafricaine multilingue. Sans intermédiaire, sans commission,
          vérifiée par notre équipe.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 px-7 py-3.5 font-semibold text-white shadow-lg shadow-brand-700/40 transition-all hover:shadow-brand-700/60 hover:-translate-y-0.5"
          >
            Commencer gratuitement
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/annonces"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:-translate-y-0.5"
          >
            <Compass className="h-4 w-4" />
            Explorer le marché
          </Link>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 md:grid-cols-4"
        >
          {[
            { num: stats.producteurs, label: "Producteurs inscrits" },
            { num: 54, label: "Pays africains" },
            { num: stats.filieres, label: "Filières & sous-filières" },
            { num: "0%", label: "Commission sur ventes" },
          ].map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <span className="bg-gradient-to-br from-white via-brand-200 to-brand-400 bg-clip-text text-transparent">
                  {stat.num}
                </span>
              </div>
              <div className="mt-2 text-xs uppercase tracking-widest text-white/50 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
