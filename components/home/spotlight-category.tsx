"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Flame, ArrowRight, CheckCircle2, Leaf } from "lucide-react";
import type { SpotlightCategory as Category } from "@/lib/api";

export function SpotlightCategorySection({ category }: { category: Category }) {
  return (
    <section className="bg-gradient-to-br from-sand-50 via-brand-50/30 to-sand-100 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="group grid overflow-hidden rounded-3xl bg-card shadow-2xl shadow-black/[0.08] ring-1 ring-border md:grid-cols-2"
        >
          {/* MEDIA */}
          <div className="relative aspect-[4/3] overflow-hidden bg-sand-200 md:aspect-auto md:min-h-[560px]">
            {category.cover_image ? (
              <Image
                src={category.cover_image}
                alt={category.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-harvest-500 to-harvest-800 text-white">
                <Leaf className="h-32 w-32 opacity-40" strokeWidth={1} />
              </div>
            )}
            {/* Diagonal gradient overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/25 via-transparent to-brand-500/10" />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-16">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 self-start rounded-full bg-brand-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-700 ring-1 ring-brand-200">
              <Flame className="h-3 w-3" strokeWidth={2.5} />
              Filière en vedette
            </div>

            {/* Title */}
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {category.name}
            </h2>

            {/* Lead */}
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground">
              <strong className="text-foreground font-semibold">
                {category.annonces_count}
              </strong>{" "}
              annonce{category.annonces_count > 1 ? "s" : ""} active
              {category.annonces_count > 1 ? "s" : ""} sur la filière{" "}
              <em className="font-display italic text-brand-700">
                {category.name}
              </em>
              . Découvrez l&apos;offre la plus complète d&apos;Afrique en
              direct des producteurs.
            </p>

            {/* Bullets sous-filières */}
            {category.subcategories.length > 0 && (
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {category.subcategories.map((sub) => (
                  <li
                    key={sub.id}
                    className="flex items-center gap-2 text-sm text-foreground/90"
                  >
                    <CheckCircle2
                      className="h-4 w-4 shrink-0 text-brand-500"
                      strokeWidth={2.5}
                    />
                    <span>{sub.name}</span>
                  </li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div>
              <Link
                href={`/annonces?category=${category.id}`}
                className="group/cta inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-brand-600/50"
              >
                Explorer la filière
                <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
