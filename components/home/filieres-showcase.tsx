"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { fadeUp, stagger, inViewProps } from "@/lib/motion";
import { ArrowUpRight, Sprout } from "lucide-react";

type Tile = {
  name: string;
  q: string;
  img: string;
  span: string;
  tone: "orange" | "green";
};

const FILIERES: Tile[] = [
  {
    name: "Céréales & légumineuses",
    q: "céréales",
    img: "/images/produits/mil.jpg",
    span: "md:col-span-3 md:row-span-2",
    tone: "green",
  },
  {
    name: "Cacao & Café",
    q: "cacao",
    img: "/images/produits/cacao.jpg",
    span: "md:col-span-3",
    tone: "orange",
  },
  {
    name: "Maraîchage",
    q: "tomate",
    img: "/images/produits/tomate.jpg",
    span: "md:col-span-3",
    tone: "green",
  },
  {
    name: "Élevage",
    q: "mouton",
    img: "/images/produits/mouton.jpg",
    span: "md:col-span-2",
    tone: "orange",
  },
  {
    name: "Racines & tubercules",
    q: "igname",
    img: "/images/produits/igname.jpg",
    span: "md:col-span-2",
    tone: "green",
  },
  {
    name: "Condiments",
    q: "oignons",
    img: "/images/produits/oignons.jpg",
    span: "md:col-span-2",
    tone: "orange",
  },
];

const toneOverlay = {
  orange:
    "from-brand-900/85 via-brand-800/30 to-transparent group-hover:from-brand-800/80",
  green:
    "from-harvest-900/85 via-harvest-800/30 to-transparent group-hover:from-harvest-800/80",
};

export function FilieresShowcase() {
  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.header
          variants={fadeUp}
          {...inViewProps}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="eyebrow inline-flex items-center gap-2 text-harvest-700">
              <Sprout className="h-4 w-4" strokeWidth={2.5} />
              Explorer par filière
            </span>
            <h2 className="font-display mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
              Tout l&apos;agricole,{" "}
              <em className="text-gradient-brand not-italic font-normal italic">
                d&apos;un seul geste.
              </em>
            </h2>
          </div>
          <Link
            href="/filieres"
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
          >
            Toutes les filières
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.header>

        <motion.div
          variants={stagger}
          {...inViewProps}
          className="grid auto-rows-[168px] grid-cols-2 gap-3 md:grid-cols-6 md:gap-4"
        >
          {FILIERES.map((t) => (
            <motion.div key={t.name} variants={fadeUp} className={t.span}>
              <Link
                href={`/annonces?q=${encodeURIComponent(t.q)}`}
                className="group relative flex h-full w-full overflow-hidden rounded-3xl ring-1 ring-black/5"
              >
                <Image
                  src={t.img}
                  alt={t.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t transition-colors duration-300 ${toneOverlay[t.tone]}`}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <h3 className="font-display text-lg font-semibold leading-tight text-white drop-shadow-sm sm:text-xl">
                    {t.name}
                  </h3>
                  <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-sand-900">
                    Découvrir
                    <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
